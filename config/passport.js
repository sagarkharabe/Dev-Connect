const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const { User } = require("../models");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JWT_SECRECT_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (!user) return done(null, false);
          return done(null, user);
        })
        .catch(error => {
          console.error("Error at Finding userbyID in passport ", error);
          done(error, false);
        });
    })
  );
};
