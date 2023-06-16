import JWT from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  // get token from header
  const token = req.headers["authorization"].split(" ")[1];

  JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
   try {
     if (err) {
       return res.status(200).send({
         success: false,
         message: "Auth Failed",
       });
     } else {
       req.body.userId = decode.id;
       next();
     }
   } catch (error) {
    console.log(error);
        return res.status(401).send({
            success: false,
            message: "Auth Failed",
        })
   }
  });
};
