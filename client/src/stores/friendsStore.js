// libs
import { defineStore } from 'pinia';

// functions
import { callApi } from '@/utils/api';

//***===== STORE =====***//

// Pinia store that handle user state (loggedin state, loggedout state, server authentification, user data...)
export const useFriendsStore = defineStore('friendsStore', {
   state: () => {
      return {
         friends: [],
      };
   },
   getters: {},
   actions: {
      /** Call api to get all friends of user and update state */
      async getUserFriends() {
         const options = {
            data: {},
            method: 'GET',
            credentials: 'include',
            caller: 'getUserFriends',
            isProtected: true,
         };
         try {
            const r = await callApi('/users/friends', options);

            if (!r) {
               return false;
            }
            this.friends = r.data;
         } catch (err) {
            console.error('getUserFriends: unexpected error:', err);
         }
      },

      /** Call api to get all friends request sent to user */
      async getUserFriendRequests() {
         const options = {
            data: {},
            method: 'GET',
            credentials: 'include',
            caller: 'getUserFriendRequests',
            isProtected: true,
         };
         try {
            const r = await callApi('/users/friends/requests', options);

            if (!r) {
               return false;
            }
            return r;
         } catch (err) {
            console.error('getUserFriendRequests: unexpected error:', err);
         }
      },

      /** Call api to send a friend request */
      async addFriend(friendId) {
         const options = {
            data: { friendId: friendId },
            method: 'POST',
            credentials: 'include',
            caller: 'addFriends',
            isProtected: true,
         };
         try {
            const r = await callApi('/users/friends/add', options);

            if (!r) {
               return false;
            }
            return true;
         } catch (err) {
            console.error('addFriends: unexpected error:', err);
         }
      },

      /** Call api to accept a friend request */
      async acceptFriendRequest(friendId) {
         const options = {
            data: { friendId: friendId },
            method: 'POST',
            credentials: 'include',
            caller: 'acceptFriendRequest',
            isProtected: true,
         };
         try {
            const r = await callApi('/users/friends/accept', options);

            if (!r) {
               return false;
            }
            await this.getUserFriends(); // Update friends data
            return true;
         } catch (err) {
            console.error('acceptFriendRequest: unexpected error:', err);
         }
      },

      /** Call api to accept a friend request */
      async deleteFriendRequest(friendId) {
         const options = {
            data: { friendId: friendId },
            method: 'POST',
            credentials: 'include',
            caller: 'deleteFriendRequest',
            isProtected: true,
         };
         try {
            const r = await callApi('/users/friends/delete', options);

            if (!r) {
               return false;
            }
            return true;
         } catch (err) {
            console.error('deleteFriendRequest: unexpected error:', err);
         }
      },
   },
});
