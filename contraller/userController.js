import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv, { config } from "dotenv"
dotenv.config()


export async function createUser (req , res){

    console.log(req.body)

    /*mulinma api balanna ona adala email eken auser kenek innawada kiyla el=kata apita pallaha thiyena 
    try{}catch() eka user karanna puluwan 
            try{

            apita mee try catch eka mada code karanna puluwan

            }catch(err){}*/
    try{

        const user = await User.findOne({email : req.body.email})
        if (user != null){
            res.json({message : "User alredy exits"})
            return 
        }

        /*create user 
            const newUser = new User(res, req) api mulin karapu vidiyata hada ganne na mokda meke 
            admin wage privlages thiyena nisa api ewana req eken apita ona ewa tika witharak filter karla gannawa (email, firstName.....) */

        const passwordHash = bcrypt.hashSync(req.body.password, 10)

        const newUser = new User({
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : passwordHash
        })

        await newUser.save()
        res.json({message : "User saved successfully"})


    }catch(err){
        res.json({message : err.message})
    }

}


export async function loginUser(req, res) {
    try{

        /* 
        <> user kenek login wenawnm mulinma ewanne passsword ekai email ekai ne api 
        <> mulinma ee deka ganna ona req eke body eke ena 
        <> ita passe api check karla balanna ona email ela hari password eka noda ewalada kiyla 
           email eka null da password eka null da kiyla check karanawa  deken ekak null unoth wade nawaththnawa (login wena eka)
           (|| = or ) deken ekawath waradinnda ba ne or dapuawama
        <> ita passe api ee email ekat dala user wa hoyagga ona (line 66) ekema user kenek nathnm api res ekak
           yawana "user not found " kiyala ethanin wade nawathnawa return ekk dala 
        <> dan api chceck karanna ona password eka walid da kiyala    
           password eka Valid num login sucsessful kiyla denwa Valid nathnm api yawanaw invalid password kiyala
          */

        const email = req.body.email
        const password = req.body.password

        if (email == null || password == null){
            res.status(400).json({message : "Email and password required"})
            return
        } 

        const user = await User.findOne({email : email})

        if(user == null){
            res.status(404).json({messaage : "User not found"})
            return
        }

        const ispasswordValid = bcrypt.compareSync(password , user.password)

        if (ispasswordValid){

            const token = jwt.sign(
                {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    isAdmin : user.isAdmin,
                    isBlocked : user.isBlocked,
                    isEmailverified : user.isEmailverified,
                    Image : user.image
                },
                process.env.JWT_SECRET_KEY
            )

            res.json({messaage : "Login Successful", token : token})

        }else{
            res.status(401).json({messaage : "Invalid Password"})
        }

    }catch(err){
        res.json({message : err.message})
    }
    
}
