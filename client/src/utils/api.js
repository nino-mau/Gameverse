// **** IMPORT ****

// **** FUNCTIONS ****

// *** General ***

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
