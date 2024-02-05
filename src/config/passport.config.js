import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import HashManager from '../util/hash.js';
import passportJWT from 'passport-jwt';
import { generateToken } from '../util/jwt.js';
import { config } from './config.js';
import CartServices from '../services/cart.services.js';
import UsersServices from '../services/user.services.js';

const JWTStrategy = passportJWT.Strategy;
const CartController = new CartServices();
const HashController = new HashManager();
const usersServices = new UsersServices();

const extractCookie = (req) => {
  return req.cookies ? req.cookies['cookieJWT'] : null;
};

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await usersServices.findOneByEmail(username);
          if (user) {
            console.log('user already existst');
            return done(null, false);
          }
          const cartId = await CartController.createNewCart(req.body.products);
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: HashController.createHash(password),
            cartId: cartId._id,
          };
          const result = await usersServices.createNewUser(newUser);
          return done(null, result);
        } catch (error) {
          console.log(error);
        }
      },
    ),
  );

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
      },

      async (username, password, done) => {
        try {
          const user = await usersServices.findOneByEmail(username);
          if (!user) {
            console.log('user doesnt exist');
            return done(null, false);
          }
          if (HashController.isValidPassword(user, password) == false)
            return done(null, false);

          const token = generateToken(user);
          user.token = token;
          return done(null, user);
        } catch (err) {
          console.log(err);
          return done(null, false);
        }
      },
    ),
  );
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
      },
      async (asccesToken, refreshToken, profile, done) => {
        try {
          if (profile._json.email == null) return done(null, false);
          const user = await usersServices.findOneByEmail(profile._json.email);
          if (user) {
            const token = generateToken(user);
            user.token = token;
            return done(null, user);
          }
          const cartId = await CartController.createNewCart([]);
          const newUser = {
            first_name: profile._json.name,
            last_name: '',
            email: profile._json.email,
            age: profile._json.age,
            password: HashController.createHash(''),
            cartId: cartId._id,
          };
          console.log(newUser);
          const result = await usersServices.createNewUser(newUser);

          return done(null, result);
        } catch (error) {
          console.log('error al iniciar sesion con gituhb' + error);
        }
      },
    ),
  );

  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: config.privatekey,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          console.log(error);
          return done(null, false);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usersServices.findUserById(id);
    done(null, user);
  });
};

export default initializePassport;
