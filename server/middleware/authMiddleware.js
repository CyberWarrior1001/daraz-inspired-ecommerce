import jwt from "jsonwebtoken";

const protect = (req, res, next)=>{
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({
            message: "Not authorized"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.id;
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token!"
        })
        
    }
}


export default protect;