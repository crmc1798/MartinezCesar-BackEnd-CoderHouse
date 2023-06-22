require('dotenv').config();
const passport = require('passport');
const local = require('passport-local');
const GitHubStrategy = require('passport-github2');
const GoogleStrategy = require('passport-google-oauth20');
const jwt = require('passport-jwt');
const { clientID_github, clientSecret_github } = require('./githubAuth.config');
const { clientID_google, clientSecret_google } = require('./googleAuth.config');
const { UserManager } = require('../dao/mongoClassManagers/userClass/userMongoManager');
const { createHash, isValidPasswordMethod } = require('../utils/cryptPassword');
const userError = require("../utils/errors/user/user.error");
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const userManager = new UserManager();
const UserDTO = require("../DTOs/User.dto");
const { MongoCartManager } = require('../dao/mongoClassManagers/cartsClass/cartMongoManager');
const cartsMongo = new MongoCartManager();

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secreto'
      },

      async (jwt_playload, done) => {
        try {
          return done(null, jwt_playload);
        } catch (error) {
          return done(error);
        }
      }
    ))

  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const userInfo = req.body;
        try {
          const user = await userManager.findUser(username);

          if (!userInfo.first_name || !userInfo.last_name || !userInfo.email || !userInfo.age) {
            userError(userInfo);
          }

          if (user) {
            req.logger.error("Usuario ya existente")
            return done(null, false);
          }

          const newCart = await cartsMongo.addCart();

          userInfo.cart = newCart.result._id
          const newUserInfo = new UserDTO(userInfo);

          const newUser = await userManager.createUser(newUserInfo);
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userManager.findByID(id)
    done(null, user);
  });

  passport.use('login', new LocalStrategy({ usernameField: 'user' },
    async (username, password, done) => {
      try {
        const user = await userManager.findUser(username);


        if (!user) {
          return done(null, false);
        }

        if (!isValidPasswordMethod(password, user)) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
  );

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: clientID_github,
        clientSecret: clientSecret_github,
        callbackURL: 'http://localhost:8081/api/auth/githubcallback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userManager.findUser(profile._json.email);
          if (!user) {
            const newUserInfo = {
              first_name: profile._json.name,
              last_name: '',
              email: profile._json.email,
              age: '',
              role: 'USER',
              password: ' ',
            };

            const newUser = await userManager.createUser(newUserInfo);

            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: clientID_google,
        clientSecret: clientSecret_google,
        callbackURL: 'http://localhost:8081/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userManager.findUser(profile._json.sub);

          if (!user) {
            const newUserInfo = {
              //googleId: profile._json.sub,
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              email: profile._json.email,
              age: '',
              role: 'USER',
              password: '',
            };

            const newUser = await userManager.createUser(newUserInfo);

            return done(null, newUser);
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
