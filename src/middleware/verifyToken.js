import jwt from "jsonwebtoken";

export const generateToken=async(user)=>{
    const payload={
        role:user.role
    };
    const decode= jwt.sign(payload,process.env.SECRET_TOKEN,{algorithm:'HS256'});
    return decode;
}

export const verifyToken=async(req,res)=>{
   const authHeader = req.headers.authorization;
   const token = authHeader?.split(' ')[1];
   const deviceToken = jwt.verify(token,process.env.SECRET_TOKEN,{algorithms:"HS256"});
   return deviceToken;
};