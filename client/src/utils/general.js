// vue
import { isRef } from 'vue';

// librairies
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

//***===== Functions =====***//

// Use Gsap to detect when element is in viewport and trigger a css animation.
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

// Denormalize the raw data extracted from a junction/associative table, result in an array of arrays where each array correspond to a unique key
export function denormalizeAssociativeTable(array) {
   const resultArray = [];
   let subArray = [];

   array.forEach((obj) => {
      // index correspond to the array index and id correspond to the item id (primary key of the table)
      const index = array.indexOf(obj);
      const len = array.length;
      const lastId = array[len - 1].game_id;
      const currentId = obj.game_id;

      // Execute for all rows expect the one who of the last item to avoid lastId to go out of bound
      if (currentId !== lastId) {
         const nextId = array[index + 1].game_id;
         subArray.push(obj.genre);

         // On the last row of an item push the subarray to the main array and reset it
         if (currentId !== nextId) {
            resultArray.push(subArray);
            subArray = [];
         }
         // Custom behavior for the rows that correspond to the last item
      } else {
         subArray.push(obj.genre);
         if (array.indexOf(obj) === len - 1) {
            resultArray.push(subArray);
         }
      }
   });

   return resultArray;
}

// Remove an item from array based on it's value
export function removeFromArray(itemValue, arrayName) {
   const indexToRemove = arrayName.findIndex((item) => item === itemValue);

   // Check if the item was found
   if (indexToRemove !== -1) {
      // Remove the item at that index
      arrayName.splice(indexToRemove, 1);
      return true;
   } else {
      console.log('removeFromArray: Item to del was not found');
      return false;
   }
}

// Overide array with new content using splice
export function overideArray(targetArray, dataArray) {
   if (isRef(targetArray) && isRef(dataArray)) {
      targetArray.value.splice(0, targetArray.value.length, ...dataArray.value);
   } else if (isRef(targetArray)) {
      targetArray.value.splice(0, targetArray.value.length, ...dataArray);
   } else if (isRef(dataArray)) {
      targetArray.splice(0, targetArray.length, ...dataArray.value);
   } else {
      targetArray.splice(0, targetArray.length, ...dataArray);
   }
}
