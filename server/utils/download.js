import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'url';

// When using ES modules, __dirname is not available, so we create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Take an array of image url and download them in the specified folder
export function downloadImages(urlArray, folderPath) {
   // Make relative paths absolute based on current script location
   const absoluteFolderPath = path.isAbsolute(folderPath)
      ? folderPath
      : path.join(__dirname, folderPath);

   // Create the folder if it doesn't exist
   if (!fs.existsSync(absoluteFolderPath)) {
      fs.mkdirSync(absoluteFolderPath, { recursive: true });
   }

   console.log(`Downloading ${urlArray.length} images to ${absoluteFolderPath}...`);

   // Process each URL in the array
   urlArray.forEach((imageUrl, index) => {
      // Generate a unique filename
      const parsedUrl = parse(imageUrl);
      let originalFilename = path.basename(parsedUrl.pathname) || `image.jpg`;

      // Split the filename to get the name and extension
      const fileExt = path.extname(originalFilename) || '.jpg';
      const baseName = path.basename(originalFilename, fileExt);

      // Create a unique filename with timestamp and index
      const timestamp = Date.now();
      let uniqueFilename = `${baseName}-${index}-${timestamp}${fileExt}`;
      const filePath = path.join(absoluteFolderPath, uniqueFilename);

      // Create a write stream
      const file = fs.createWriteStream(filePath);

      // Choose http or https based on the URL
      const requestLib = imageUrl.startsWith('https') ? https : http;

      // Download the image
      requestLib
         .get(imageUrl, (response) => {
            // Handle redirects
            if (
               response.statusCode >= 300 &&
               response.statusCode < 400 &&
               response.headers.location
            ) {
               console.log(`Redirecting from ${imageUrl} to ${response.headers.location}`);
               // Close the current file stream
               file.close();
               // Delete the file as we're not using it
               fs.unlink(filePath, () => {});
               // Add the redirect URL to the array
               downloadImages([response.headers.location], absoluteFolderPath);
               return;
            }

            // Check if we got a valid response
            if (response.statusCode !== 200) {
               console.error(`Failed to download ${imageUrl}, status code: ${response.statusCode}`);
               file.close();
               fs.unlink(filePath, () => {});
               return;
            }

            // Try to get content type from headers to determine file extension if missing
            if (fileExt === '') {
               const contentType = response.headers['content-type'];
               if (contentType) {
                  if (contentType.includes('jpeg') || contentType.includes('jpg')) {
                     uniqueFilename += '.jpg';
                  } else if (contentType.includes('png')) {
                     uniqueFilename += '.png';
                  } else if (contentType.includes('gif')) {
                     uniqueFilename += '.gif';
                  } else if (contentType.includes('webp')) {
                     uniqueFilename += '.webp';
                  } else if (contentType.includes('svg')) {
                     uniqueFilename += '.svg';
                  } else if (contentType.includes('image')) {
                     uniqueFilename += '.img';
                  }
               }
            }

            response.pipe(file);

            file.on('finish', () => {
               file.close();
               console.log(`Downloaded: ${uniqueFilename}`);
            });
         })
         .on('error', (err) => {
            fs.unlink(filePath, () => {});
            console.error(`Error downloading ${imageUrl}: ${err.message}`);
         });
   });
}
