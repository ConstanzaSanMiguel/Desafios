import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { verifyHash } from "../utils/hash.util.js"
import { createToken } from "../utils/token.util.js"
import repository from "../repositories/users.rep.js";
const { GOOGLE_ID, GOOGLE_SECRET, SECRET } = process.env

passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let one = await repository.readByEmail(email)
                if (one) return done(null, false)
                let data = req.body
                let user = await repository.create(data)
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)
passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let user = await repository.readByEmail(email)
                const verify = verifyHash(password, user.password)
                if (user?.verified && verify) {
                    const token = createToken({ email, role: user.role, uid: user.id })
                    req.token = token
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )
)
passport.use(
    "google",
    new GoogleStrategy(
        {
            passReqToCallback: true,
            clientID: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            callbackURL: "http://localhost:8080/api/sessions/google/callback",
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await repository.readByEmail(profile.id + "@gmail.com")
                if (!user) {
                    user = {
                        email: profile.id + "@gmail.com",
                        name: profile.name.givenName,
                        //lastname: profile.name.familyName,
                        photo: profile.coverPhoto,
                        password: createHash(profile.id),
                    }
                    user = await repository.create(user)
                }
                req.session.email = user.email
                req.session.role = user.role
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.use(
    "jwt",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
            secretOrKey: SECRET,
        },
        async (payload, done) => {
            try {
                const user = await repository.readByEmail(payload.email)
                if (user) {
                    user.password = null
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )
)

export default passport