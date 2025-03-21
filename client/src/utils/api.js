const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);

//***===== Functions =====***//

// Reusable function to call unprotected api endpoints
export async function callApi(
   endpoint,
   data = null,
   method = 'GET',
   credentials = 'include',
   caller,
   headers = { 'Content-Type': 'application/json' },
) {
   const options = {
      method: method,
      credentials: credentials,
      headers: headers,
      body: null,
   };

   const url = apiUrl + endpoint;

   if (data && method !== 'GET') {
      if (options.body && typeof options.body === 'object') {
         options.body = JSON.stringify(options.body);
      }
   }

   try {
      const response = await fetch(url, options);

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
