// **** IMPORTS ****

// Import Frameworks/Libs
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// **** FUNCTIONS ****

// *** GENERAL ***

// Use Gsap to detect when element is in viewport and trigger a css animation.
// The first parameter take the ref of an dom element, second parameter is a string that take the class name of the animation,
// third is an int that correspond to duration of animation, fourth an int that correspond to delay before animation start.

export function animateElementOnScroll(element, animation, duration, delay) {
   // Get dom element from ref
   const domElement = element.value.$el || element.value;
   gsap.to(domElement, {
      scrollTrigger: {
         trigger: domElement,
         once: true,
         start: 'top 100%',
         onEnter: () => {
            gsap.delayedCall(delay, () => {
               domElement.classList.add('animate__animated', animation, duration);
               domElement.classList.remove('invisible');
            });
         },
         onLeaveBack: () => {
            gsap.delayedCall(delay, () => {
               domElement.classList.remove(
                  'animate__animated',
                  animation,
                  'animate_duration-' + duration + 's',
               );
            });
         },
      },
   });
}

// Clear all propreties of a constant object
export function emptyObject(obj) {
   for (const key in obj) {
      if (obj.hasOwn(key)) {
         delete obj[key];
      }
   }
}

// *** FETCH API ***

// Reusable fetch function for all post requests to the server that do not require JWT token
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

      const responseData = await response.json();

      if (!response.ok) {
         console.error('See server response: ', responseData);
      }

      return responseData;
   } catch (error) {
      console.error('Fetch error:', error);
      throw error;
   }
}

// Reusable fetch function to get a ressource from the server, takes url and current JWT token
export async function getRessource(url) {
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
         console.error('Get request failed: ', response.status);
         console.error('See server response: ', responseData);
         return false;
      }

      return responseData;
   } catch (error) {
      console.error('Fetch error:', error);
      throw error;
   }
}

// Reusable fetch function that verify if JWT token passed in parameter is valid using post request
export async function checkUserTokenValidity(token) {
   if (!token) {
      console.error('JWT not found');
      return false; // No token to check
   }

   try {
      const response = await fetch('https://gameverse.local/api/users/token-auth', {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         credentials: true,
         body: JSON.stringify({}),
      });

      if (response.ok) {
         console.log('JWT is valid');
         return true; // Backend confirmed JWT is valid
      } else {
         if (response.status === 401 || response.status === 403) {
            console.log('JWT is invalid (status:', response.status, ' - POST request).');
         } else {
            console.error(`JWT Check failed, unexpected error (POST): ${response.status}`);
         }
         return false;
      }
   } catch (error) {
      console.error('JWT Check failed, fetch request failed (POST):', error);
      return false;
   }
}
