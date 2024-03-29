const passport = require("passport");

const jwt = require('passport-jwt');

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secreto'
        },

        async(jwt_playload, done) =>{
            try {
                return done(null, jwt_playload);
            } catch (error) {
                return done(error);
            }
        }
    ))
}

module.exports = initializePassport;