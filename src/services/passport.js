const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4005/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let customer = await Customer.findOne({ googleId: profile.id });
        
        // Create a new customer if not found
        if (!customer) {
          customer = await Customer.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile._json.email,
            profilePhoto: profile.photos[0].value,
          });
        }

        // Pass the customer to the callback
        return done(null, customer);
      } catch (error) {
        console.error("Error during Google strategy authentication:", error);
        return done(error, null);
      }
    }
  )
);

// JWT Strategy
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const customer = await Customer.findById(payload.sub);
        if (customer) {
          return done(null, customer);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error("Error during JWT strategy authentication:", error);
        return done(error, false);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((customer, done) => {
  done(null, customer.id); // Use customer ID for serialization
});

passport.deserializeUser(async (id, done) => {
  try {
    const customer = await Customer.findById(id);
    done(null, customer); // Pass the customer object to complete deserialization
  } catch (error) {
    done(error, false);
  }
});

module.exports = passport;
