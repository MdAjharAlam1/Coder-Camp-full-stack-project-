import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token ||
                        req.body.token ||
                        req.header('Authorization').replace("Bearer",'')
        
        if(!token){
            return res.status(400).json({
                message:'Token invailid',
                success:false
            })
        }
        try {
            const decode = await jwt.verify(token, process.env.SECRET_KEY)
            console.log(decode)
            req.user = decode
        } catch (error) {
            console.log('verify token issuse',error.message)
            return res.status(401).json({
                message:"token invailid",
                success:false
            })
        }
        next()
    } catch (error) {
        console.log('auth middleware',error.message)
        return res.status(401).json({
            message:'invalid authenticate',
            success:false
        })
    }
}

export const isStudent = async(req,res,next)=>{
    try {
        if(req.user.role !== "Student"){
            return res.status(400).json({
                message:'this is protected route for student only ',
                success:false
            })
        }
        next()
    } catch (error) {
        console.log('isStudent middleware',error.message)
        return res.status(500).json({
            message:'isStudent role check issue',
            success:false
        })
        
    }
}

export const isInstructor = async(req,res,next)=>{
    try {
        if(req.user.role !== "Instructor"){
            return res.status(400).json({
                message:'This is protected routr for instructor only',
                success:false
            })
        }
        next()
    } catch (error) {
        console.log('isInstructor middleware', error.message)
        return res.status(500).json({
            message:'isInstructor role check issue',
            success:false
        })
    }
}

export const isAdmin = async(req,res,next)=>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(400).json({
                message:"This is protected route for Admin Only",
                success:false
            })
        }
        next()
    } catch (error) {
        console.log('isAdmin middleware',error.message)
        return res.status(500).json({
            message:"isAdmin role check issuse",
            success:false
        })
        
    }
}