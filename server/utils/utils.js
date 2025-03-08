// **** IMPORTS ****

// Import Dependencies
import jwt from 'jsonwebtoken';

// **** FUNCTIONS ****

// *** Authentifications ***

// Check if email syntax is valid
export function isValidEmailFormat(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (email) {
      return emailRegex.test(email);
   } else {
      return false;
   }
}

// Check if all items in an object are true
export function areAllObjectsItemsTrue(obj) {
   Object.values(obj).every((item) => item === true);
}

// Generate a an json web token for a new user
export async function generateUserJWT(userData) {
   // To replace with env
   const secretKey = process.env.JWT_SECRET;

   const token = jwt.sign(
      {
         id: userData.id,
         username: userData.username,
         email: userData.email,
         role: 'user',
      },
      secretKey,
      {
         expiresIn: '1h',
      },
   );
   return token;
}
