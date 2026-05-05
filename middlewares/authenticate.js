import jwt from "jsonwebtoken"

export default function authenticate(req, res, next){
        const header = req.header("Authorization") // meken wenne ena req eka athule thiyena header eka aran dena eka
        

        if (header == null) {
            next()
        }else{    /*header eka athule thiyena "bearer " kiyana eka ain karala ee wenuwata api empty denawa ("") */
            const token = header.replace("Bearer " , "")  

            jwt.verify(token, "secretkey99!!!!!",

                (err, decoded)=> {
                    
                    if (decoded == null){
                        res.status(401).json({message: " Invalid token pleace login again"})
                    }else{
                        
                        req.user = decoded //valid user kenek innawanm userge visthra tikath req ekata dala yawanwa 
                        next()
                    }
                    

                }

            )

            
        }
        
    }
