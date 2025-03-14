// **** IMPORT ****
import { defineStore } from 'pinia';

// **** STORE SETUP ****

// Pinia store that handle user state (loggedin state, loggedout state, server authentification, user data...)
export const useUserStore = defineStore('userAuth', {
   state: () => {
      return {
         isUserLoggedIn: false,
         userData: {
            id: null,
            username: null,
            email: null,
         },
         userFavGames: ['Split Fiction'],
      };
   },
   getters: {},
   actions: {
      //***===== GET =====***//

      // Use to get protected ressource on server
      async getProtectedRessource(ressourceUrl, ressourceName) {
         try {
            const r = await fetch(ressourceUrl, {
               method: 'GET',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
               },
            });

            const data = await r.json();
            const status = r.status;

            if (status === 200) {
               console.log('getProtectedRessource: Succesfuly received ', ressourceName);
               return data;
            } else if (status === 401) {
               // Get new access token
               await this.getNewAccessToken();

               // Retry to get the ressource
               const r2 = await fetch(ressourceUrl, {
                  method: 'GET',
                  credentials: 'include',
                  headers: {
                     'Content-Type': 'application/json',
                  },
               });
               const rdata = await r2.json();
               const status = r2.status;

               if (status === 200) {
                  console.log('getProtectedRessource: Succesfuly received ', ressourceName);
                  return rdata;
               } else if (status === 500) {
                  console.log('getProtectedRessource: User is not logged in or unexpected error');
                  return false;
               } else {
                  console.log('getProtectedRessource: Failed to get ', ressourceName);
                  return false;
               }
            } else if (status === 500) {
               console.log('getProtectedRessource: User is not logged in or unexpected error');
               return false;
            } else {
               console.log('getProtectedRessource: Failed to get ', ressourceName);
               return false;
            }
         } catch (error) {
            console.error(
               'getProtectedRessource: Fetch error while getting ',
               ressourceName + ' :' + error,
            );
         }
      },

      // Use getProtectedRessource to get user data
      async getUserData() {
         try {
            const userData = await this.getProtectedRessource(
               'https://gameverse.local/api/users/me',
               'User Data',
            );
            if (userData) {
               this.isUserLoggedIn = true;
               Object.assign(this.userData, userData);
            } else {
               this.isUserLoggedIn = false;
               console.log('getUserData: Unexpected error');
               return false;
            }
         } catch (error) {
            console.log('getUserData: Unexpected error', error);
         }
      },

      // Use getProtectedRessource to get user favorite games
      async getFavGames() {
         try {
            const favGames = await this.getProtectedRessource(
               'https://gameverse.local/api/users/favorite-games',
               'Favorite Games',
            );
            if (favGames) {
               console.log('getFavGames: succesfully received data');
               this.userFavGames = favGames;
            } else {
               console.log('getFavGames: no users found');
               this.userFavGames = favGames;
            }
         } catch (error) {
            console.log('getFavGames: Unexpected error', error);
         }
      },

      // Use getProtectedRessource to get user favorite games details
      async getFavGamesDetails() {
         try {
            const favGames = await this.getProtectedRessource(
               'https://gameverse.local/api/users/favorite-games?details=true',
               'Favorite Games',
            );
            if (favGames) {
               console.log('getFavGamesDetails: succesfully received data');
               return favGames.data;
            } else {
               console.log('getFavGamesDetails: no users found');
               return favGames.data;
            }
         } catch (error) {
            console.log('getFavGamesDetails: Unexpected error', error);
            return false;
         }
      },

      // Use getProtectedRessource to get user favorite games settings
      async getFavGamesSettings() {
         try {
            const favGamesSettings = await this.getProtectedRessource(
               'https://gameverse.local/api/users/favorite-games-settings',
               'Favorite Games Settings',
            );
            if (favGamesSettings) {
               console.log('getFavGamesDetails: succesfully received data');
               return favGamesSettings.data;
            } else {
               console.log('getFavGamesDetails: no users found');
               return favGamesSettings.data;
            }
         } catch (error) {
            console.log('getFavGamesDetails: Unexpected error', error);
            return false;
         }
      },

      // Get new access token when last one expired
      async getNewAccessToken() {
         try {
            const response = await fetch('https://gameverse.local/api/users/refresh-token', {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({}),
            });

            if (response.status === 200) {
               this.isUserLoggedIn = true;
               console.log('getNewAccessToken: Refresh key validated, new access token provided');
               return true;
            } else if (response.status === 401) {
               console.log('getNewAccessToken:', response.error);
               return false;
            } else {
               console.log('getNewAccessToken: ', response.error);
               return false;
            }
         } catch (error) {
            console.error('getNewAccessToken: Unexpected Fetch Error', error);
            return false;
         }
      },

      //***===== POST =====***//

      // Use to post to server
      async postToProtectedEndpoint(endpointUrl, actionName, data) {
         try {
            const r = await fetch(endpointUrl, {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
            });

            if (r.status === 200) {
               return true;
            } else if (r.status === 401) {
               await this.getNewAccessToken();

               const r2 = await fetch(endpointUrl, {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
               });
               if (r2.status === 200) {
                  return true;
               } else {
                  console.log(actionName + ': ', r2.error);
                  return false;
               }
            } else {
               console.log(actionName + ': ', r.error);
               return false;
            }
         } catch (error) {
            console.error(actionName + ': Unexpected Fetch Error', error);
            return false;
         }
      },

      // Call ressource to logout user with post request
      async logoutUser() {
         try {
            const r = await fetch('https://gameverse.local/api/users/logout', {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({}),
            });

            if (r.status === 200) {
               this.isUserLoggedIn = false;

               console.log('logoutUser: User has been logged out');
            } else if (r.status === 401) {
               await this.getNewAccessToken();

               const r2 = await fetch('https://gameverse.local/api/users/logout', {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({}),
               });
               if (r2.status === 200) {
                  this.isUserLoggedIn = false;

                  console.log('logoutUser: User has been logged out');
               } else {
                  console.log('logoutUser: ', r2.error);
               }
            } else {
               console.log('logoutUser: ', r.error);
            }
         } catch (error) {
            console.error('logoutUser: Unexpected Fetch Error', error);
         }
      },

      // Use to update isUserLoggedIn boolean by making post request to a ressource that validate access token
      async checkLoginStatus() {
         try {
            const r = await fetch('https://gameverse.local/api/users/access-token', {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({}),
            });

            if (r.status === 200) {
               this.isUserLoggedIn = true;

               console.log('checkLoginStatus: User is logged in !');
            } else if (r.status === 401) {
               await this.getNewAccessToken();

               const r2 = await fetch('https://gameverse.local/api/users/access-token', {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({}),
               });
               if (r2.status === 200) {
                  this.isUserLoggedIn = true;

                  console.log('checkLoginStatus: User is logged in');
               } else {
                  this.isUserLoggedIn = false;

                  console.log('checkLoginStatus: User is not logged in');
               }
            } else {
               this.isUserLoggedIn = false;

               console.log('checkLoginStatus: User is not logged in');
            }
         } catch (error) {
            this.isUserLoggedIn = false;

            console.error('getNewAccessToken: Unexpected Fetch Error', error);
         }
      },

      // Use to post data to end point which add favorite game to user
      async addFavoriteGame(gameId, gameName) {
         const r = this.postToProtectedEndpoint(
            'https://gameverse.local/api/users/add-favorite-game',
            'addFavoriteGame',
            { gameId: gameId },
         );

         if (r) {
            this.userFavGames.push(gameName);
            return true;
         } else {
            console.log('addFavoriteGame: Failed to add favorite game');
            return false;
         }
      },

      // Use to post data to end point which add favorite game details to user
      async addFavoriteGameDetails(gameId, fieldName, fieldValue) {
         const r = this.postToProtectedEndpoint(
            'https://gameverse.local/api/users/add-favorite-game',
            'addFavoriteGame',
            { gameId: gameId },
         );

         if (r) {
            this.userFavGames.push(gameName);
            return true;
         } else {
            console.log('addFavoriteGame: Failed to add favorite game');
            return false;
         }
      },
   },
});
