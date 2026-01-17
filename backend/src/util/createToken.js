const jwt= require("jsonwebtoken");
const secret= process.env.JWT_SECRET;

function createTokenForUser(user) {
  const payload={
    id:user.id,
    name:user.name,
    email:user.email,
  }
  const token= jwt.sign(payload, secret);
  return token;
}
function validateToken(token) {
  if(!token) return null;
  const payLoad= jwt.verify(token, secret);
  return payLoad;
}


module.exports={
  createTokenForUser,
  validateToken
}