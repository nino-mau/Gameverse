/*==============================
==========  FUNCTIONS  =========
===============================*/

// Return a dynamic image link with specified path
export function getImageUrl(imgFolder, imgName) {
   return new URL(`/src/assets/img/${imgFolder}/${imgName}`, import.meta.url).href;
}

// Variant of function that take image a folder deeper
export function getImageUrlDeep(parentFolder, imgFolder, imgName) {
   return new URL(`/src/assets/img/${parentFolder}/${imgFolder}/${imgName}`, import.meta.url).href;
}
