const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "postit",
};
// using passport jwt
passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (error, user) {
      if (error) {
        console.log("Error in finding user Using JWT");
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(error,null);
      }
    });
  })
);
// serialize the user
passport.serializeUser(function (user, done) {
  done(null, user);
});
//deserialize the user from the key in the cookie
passport.deserializeUser(function (id, done) {
  User.findById(id, function (error, user) {
    if (error) {
      console.log("Error in finding user -->> passpoer");
      return done(error);
    }
    return done(null, user);
  });
});

// check user authentication
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  return res.json(401,{
    message:"Unautherized"
  });
};
// set authentication
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;