
import JwtPassport from "passport-jwt";

import { UserModel } from "../models/userModel.js";

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "CodeSlayer"
}

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async(jwt__payload, done) => {
            try {
                const doesUserExists = await UserModel.findById(jwt__payload.user);
                if (!doesUserExists) {
                    return done(null, false);
                }

                return done(null, doesUserExists);
            } catch (error) {
                throw new Error(error);
            }
        })
    )
}