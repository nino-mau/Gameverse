// **** IMPORT ****
import { defineStore } from 'pinia';

// Functions
import { getRessource } from '@/assets/js/utils';

// **** STORE SETUP ****

// Pinia store that handle user state (loggedin state, loggedout state, server authentification, user data...)
export const useUserAuthStore = defineStore('userAuth', {
   state: () => {
      const userTokenKeyLocal = 'userToken';

      return {
         isUserLoggedIn: false,
         // short term JWT token
         userTokenKey: userTokenKeyLocal,
         userToken: localStorage.getItem(userTokenKeyLocal) || null,
         userData: {
            id: null,
            username: null,
            email: null,
         },
      };
   },
   getters: {
      // Return bool based on value of userToken;
      isUserAuthenticated() {
         if (this.userToken) {
            return true;
         } else if (!this.userToken) {
            return false;
         } else {
            return false;
         }
      },
   },
   actions: {
      // Use to set token
      setToken(token) {
         this.userToken = token;
         localStorage.setItem(this.userTokenKey, token);
         this.isUserLoggedIn = true;
      },

      // Use to disconnect user
      clearToken() {
         this.userToken = null;
         localStorage.removeItem(this.userTokenKey);
         this.isUserLoggedIn = false;
         this.userData = { id: null, username: null, email: null };
      },

      // Used to update isUserLoggedIn
      setLoginStatus(boolean) {
         this.isUserLoggedIn = boolean;
      },

      // Use clearToken to disconect user and create popup
      logoutUser() {
         this.clearToken();
         console.log('logoutUser: User disconnected');
      },

      // Private function used to check with the server if the locally stored token is valid
      async _validateUserToken() {
         try {
            const response = await fetch('http://gameverse.local/api/users/token-auth', {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${this.userToken}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({}),
            });

            if (response.ok) {
               console.log('validateUserToken: Validated user token.');
               return true;
            } else {
               if (response.status === 401 || response.status === 403) {
                  console.log(
                     'validateUserToken: JWT is invalid (status:',
                     response.status,
                     ' - POST request).',
                  );
               } else {
                  console.error(
                     `validateUserToken: JWT Check failed, unexpected error (POST): ${response.status}`,
                  );
               }
               return false;
            }
         } catch (error) {
            console.error(
               'validateUserToken: JWT Check failed, fetch request failed (POST):',
               error,
            );
            return false;
         }
      },

      // Use _validateUserToken to determine if user is logged in
      async verifyUserLoggin() {
         if (this.userToken) {
            this.isUserLoggedIn = true;
            const r = await this._validateUserToken();

            if (r === true) {
               this.isUserLoggedIn = true;
               console.log('checkLoginStatus: User logged in');
               return true;
            } else {
               localStorage.removeItem(this.userTokenKey);
               this.isUserLoggedIn = false;
               console.error('checkLoginStatus: Invalid user token, disonnecting user');
               return false;
            }
         } else {
            this.isUserLoggedIn = false;
            console.log('checkLoginStatus: No user logged in');
         }
      },

      // Make request to the server to get user data corresponding to locally stored token
      async getUserData() {
         if (this.userToken) {
            try {
               const result = await getRessource(
                  'http://gameverse.local/api/users/me',
                  this.userToken,
               );
               console.log('getUserData: Received user data :', result);
               console.log('getUserData: local this.userData :', this.userData);
               // Put the received user info in the reactive userData object
               Object.assign(this.userData, result);
               console.log('getUserData: Processed user data (after assign):', this.userData); // <--- COMPLETE LOG HERE
               console.log('getUserData: Received user data :', result); // Keep original log too
            } catch (error) {
               console.error('getUserData: Unexpected fetch error:', error);
            }
         } else {
            console.log('getUserData: No user is logged in');
         }
      },
   },
});
