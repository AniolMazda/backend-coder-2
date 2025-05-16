import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { userManager } from "../data/managers/manager.mongo.js"
import { createHash,compareHash } from "../helpers/hash.helper.js"
import { createToken } from "../helpers/token.helper.js"

const callbackURL = "http://localhost:8080/api/auth/google/redirect"

passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback:true, usernameField:"email" },
        async (req,email,password,done) => {
            try {
                if(!req.body.city){
                    done(null,null,{message:"Invalid Data",statusCode:400})
                }
                let user = await userManager.readBy({email})
                if (user){
                    done(null,null,{message:"Invalid Credentials",statusCode:401})
                }
                req.body.password = createHash(password)
                user = await userManager.createOne(req.body)
                done(null,user)
            } catch (error) {
                done(error)
            }
        }
    )
)
passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback:true, usernameField:"email" },
        async (req,email,password,done) => {
            try{
                let user = await userManager.readBy({email})
                if (!user){
                    done(null,null,{message:"Invalid Credentials",statusCode:401})
                }
                const verifyPass = compareHash(password, user.password)
                if (!verifyPass){
                    done(null,null,{message:"Invalid Credentials",statusCode:401})
                }
                const data = {
                    user_id: user._id,
                    email:user.email,
                    role:user.role
                }
                const token = createToken(data)
                user.token = token
                done(null,user)
            } catch (error){
                done(error)
            }
        }
    )
)
passport.use(
    "user",
    new JwtStrategy(
        { jwtFromRequest: ExtractJwt.fromExtractors([(req)=>req?.cookies?.token]),
            secretOrKey:process.env.SECRET
        },
        async (data,done) => {
            try{
                const {user_id,email,role} = data
                const user = await userManager.readBy({_id:user_id,email,role})
                if(!user){
                    done(null,null,{message:"Forbidden",statusCode:403})
                }
                
                done(null,user)
            } catch (error){
                done(error)
            }
        }
    )
)
passport.use(
    "admin",
    new JwtStrategy(
        { jwtFromRequest: ExtractJwt.fromExtractors([(req)=>req?.cookies?.token]),
            secretOrKey:process.env.SECRET
        },
        async (data,done) => {
            try{
                const {user_id,email,role} = data
                const user = await userManager.readBy({_id:user_id,email,role})
                if(!user || user.role !== "ADMIN"){
                    done(null,null,{message:"Forbidden",statusCode:403})
                }
                
                done(null,user)
            } catch (error){
                done(error)
            }
        }
    )
)
passport.use(
    "google",
    new GoogleStrategy(
        {clientID:process.env.GOOGLE_ID,clientSecret:process.env.GOOGLE_SECRET, callbackURL},
        async(accessToken, refreshToken, profile, done) => {
            try {
                const {email,name,picture,id} = profile
                let user = await userManager.readBy({email:id})
                if(!user){
                    user = {
                        email:id,
                        name:name.givenName,
                        avatar:picture,
                        password:createHash(email),
                        city:"Google"
                    }
                    user = await userManager.createOne(user)
                }
                const data = {
                    user_id: user._id,
                    email:user.email,
                    role:user.role
                }
                const token = createToken(data)
                user.token = token
                done(null,user)
            } catch (error) {
                done(error)
            }
        }
    )
)

export default passport