// **** IMPORTS ****

// Dependencies
import bcrypt from 'bcrypt';

// Functions
import { isValidEmailFormat } from '../utils/utils.js';
import { getAuthData } from '../db/mysql.js';
import { getUserData } from '../db/mysql.js';
import { registerUserDb } from '../db/mysql.js';
import { generateUserJWT } from '../utils/utils.js';

// **** REGISTER ****

// Handle receiving posted register data, validating it and registering user in db
export async function userRegistration(req, res) {
   try {
      const userData = {
         id: null,
         username: req.body.username,
         email: req.body.email,
         pwd: req.body.password,
         confirmPwd: req.body.confirmPassword,
      };

      // Error object to send back to frontend if data isn't valid
      const errors = {
         syntax: undefined,
         duplicate: undefined,
      };

      // Check if user data syntax is valid and if user data doesn't already exist in db
      const syntaxErr = _isSyntaxValid(userData);
      const duplicateErr = await _isUserInfoValid(userData);

      // When check do not return errors register user, else send back errors object
      if (syntaxErr === null && duplicateErr === null) {
         const r = await registerUserDb(userData);

         if (r.success === true) {
            // Create short term JWT token for user
            userData.id = r.id;
            const token = await generateUserJWT(userData);

            res.status(200).json({
               status: 'success',
               data: {
                  id: r.id,
                  username: userData.username,
                  email: userData.email,
                  token: token,
               },
               message: 'User registration successful',
            });
            console.log('User registration successful');
         } else {
            res.status(500).json({
               status: 'failure',
               message: 'User registration unsuccessful',
               error: errors,
            });
            console.error('User registration process unsucessful');
         }
      } else {
         errors.syntax = syntaxErr;
         errors.duplicate = duplicateErr;
         const statusCode = duplicateErr.status || syntaxErr.status || 400;
         res.status(statusCode).json({ errors });
         console.error('User registration unsucessful', errors);
      }
   } catch (error) {
      console.error('Register process failed:', error);
      res.status(500).json({ error: 'Register process failed', details: error.message });
   }
}

// Private function to check if submited user data syntax is valid
function _isSyntaxValid(data) {
   const validations = {
      username: data.username.length >= 3,
      password: data.pwd.length >= 5,
      email: isValidEmailFormat(data.email),
      passwordsMatch: data.confirmPwd === data.pwd,
   };

   if (Object.values(validations).includes(false)) {
      return { error: 'Syntax error', status: 400 };
   }
   return null;
}

// Private function to check if submited user data does not already exist  in db
async function _isUserInfoValid(data) {
   let isUsernameAvailable = true;
   let isEmailAvailable = true;

   // Get relevant auth data from database
   try {
      const authData = await getAuthData();
      authData.forEach((userDb) => {
         if (data.username === userDb.user_name) {
            isUsernameAvailable = false;
         }
         if (data.email === userDb.user_email) {
            isEmailAvailable = false;
         }
      });
   } catch (error) {
      console.error('getAuthData Failed', error);
   }

   if (!isUsernameAvailable && !isEmailAvailable) {
      return {
         type: 'both',
         errorUsername: "Username isn't available",
         errorEmail: "Email isn't available",
         emailValue: data.email,
         usernameValue: data.username,
         status: 422,
      };
   } else if (!isEmailAvailable) {
      return {
         type: 'email',
         errorEmail: "Email isn't available",
         emailValue: data.email,
         status: 422,
      };
   } else if (!isUsernameAvailable) {
      return {
         type: 'username',
         errorUsername: "Username isn't available",
         usernameValue: data.username,
         status: 422,
      };
   } else {
      return null;
   }
}

// **** LOGIN ****

// Handle receiving posted login data, validate it and send a short term JWT token
export async function userLogin(req, res) {
   try {
      const userData = {
         id: null,
         username: req.body.username,
         email: null,
         pwd: req.body.password,
      };

      const r = await _verifyLoginInfo(userData.username, userData.pwd);

      if (r) {
         userData.id = r.user_id;
         userData.email = r.user_email;

         // Create a JWT token with users infos
         const token = await generateUserJWT(userData);

         // Send response with JWT token and location of user ressource
         res.location(`/api/users/${r.id}`)
            .status(201)
            .json({
               status: 'success',
               data: {
                  id: userData.id,
                  username: userData.username,
                  email: userData.email,
                  token: token,
               },
               message: 'User login successful',
            });
         console.log('userLogin: User login successful');
      } else {
         res.status(422).json({
            status: 'failure',
            error: 'Username or password invalid',
         });
         console.error('userLogin: Login failed, username or Password invalid');
      }
   } catch (error) {
      console.error('userLogin: Unexpected error caused login process to fail:', error);
      res.status(500).json({
         error: 'Unexpected error caused login process to fail:',
         details: error.message,
      });
   }
}

// Verify if username exist and if password match the one in the db
async function _verifyLoginInfo(username, password) {
   try {
      const dbUser = await getUserData(username);

      if (!dbUser.length) {
         console.log('_verifyLoginInfo: User not found in database');
         return false;
      } else {
         // Wrap bcrypt.compare in a Promise to use with await
         return new Promise((resolve, reject) => {
            bcrypt.compare(password, dbUser[0].user_password, (err, result) => {
               if (err) {
                  console.error('_verifyLoginInfo: Error comparing passwords:', err);
                  reject(err); // Reject the Promise on bcrypt error
                  return;
               } else if (result) {
                  resolve(dbUser[0]);
               }
            });
         });
      }
   } catch (error) {
      console.error('_verifyLoginInfo: Unexpected error during login info verification', error);
      return false;
   }
}
