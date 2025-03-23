// dependencies
import { useUserStore } from '@/stores/userStore';

const apiUrl = import.meta.env.VITE_API_URL;

//***===== Functions =====***//

// Reusable function to call unprotected api endpoints
export async function callApi(
   endpoint,
   {
      data = null,
      method = 'GET',
      credentials = 'include',
      caller = '',
      isProtected = false,
      headers = { 'Content-Type': 'application/json' },
   } = {},
) {
   const options = {
      method: method,
      credentials: credentials,
      headers: headers,
   };

   const url = apiUrl + endpoint;

   if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
   }

   try {
      let response = await fetch(url, options);

      // When endpoint is protected retry request after getting new token
      if (isProtected && response.status === 401) {
         const userStore = useUserStore();
         const refreshedResponse = await userStore.getNewAccessToken(); // get new access token
         if (refreshedResponse) {
            response = await fetch(url, options); // Retry request
         } else {
            console.log('callApi: failed to get new access token on request by ', caller);
         }
      }

      const parsedResponse = await response.json();

      if (parsedResponse.success !== true) {
         console.error(
            caller + ': Call to endpoint ' + endpoint + ' failed with status:' + response.status,
         );
         console.error(parsedResponse.error);
         return false;
      }

      return parsedResponse;
   } catch (err) {
      console.error('Call to endpoint ' + endpoint + 'failed with error:' + err);
      return false;
   }
}

// Reusable fetch function for all post requests to the server
export async function postData(url, data) {
   try {
      const response = await fetch(url, {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
            Origin: window.location.origin,
         },
         body: JSON.stringify(data),
      });

      return {
         status: response.status,
         ...(await response.json()),
      };
   } catch (error) {
      console.error('postData: Fetch error:', error);
      throw error;
   }
}

// Reusable fetch function for all get requests to server
export async function getData(url) {
   try {
      const response = await fetch(url, {
         method: 'GET',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      const responseData = await response.json();

      if (!response.ok) {
         console.error('getData: Server error:', response.error);
         return false;
      }

      return responseData;
   } catch (error) {
      console.error('getData: Fetch error:', error);
      throw error;
   }
}
