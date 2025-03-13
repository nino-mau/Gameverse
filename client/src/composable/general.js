/*==============================
==========  FUNCTIONS  =========
===============================*/

// Return a dynamic image link with specified path
export function getImageUrl(imageFolder, imageName) {
   return new URL(`/src/assets/img/${imageFolder}/${imageName}`, import.meta.url).href;
}
