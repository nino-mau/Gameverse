// **** IMPORT ****

// **** FUNCTIONS ****

// Respond to request on users/me by providing users data of user identified by token
export async function userInfo(req, res) {
   res.status(200).json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
   });
   console.log('User info provided succesfuly');
}
