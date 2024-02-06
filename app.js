const express = require('express');
const app = express();
var csrf = require('tiny-csrf');
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
const { request } = require("http");
const flash = require("connect-flash");

const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

let agent,server;

const saltRounds = 10;

app.use(
  session({
    secret: "my-super-secret-key-21728172615261562",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  }),
);

//Set view Engine as EJS
app.set("view engine", "ejs");

localStorage = new LocalStrategy(){
  
}

app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shhh! Some Secret String"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));

app.use(function (request, response, next) {
  response.locals.messages = request.flash();
  next();
});


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      User.findOne({
        where: {
          email: username,
        },
      })
        .then(async (user) => {
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid Password !" });
          }
        })
        .catch((error) => {
          return done(error);
        });
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log("Serializing user in session", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

app.post('/courses',(req,res) => {
  
})


app.get("/login", (request, response) => {
    response.render("login", { title: "LMS Login", csrfToken: request.csrfToken() });
  });
  
  app.get("/signout", (request, response) => {
    //Signout
    request.logout((err) => {
      if (err) {
        return next(err);
      }
      response.redirect("/");
    });
  });
  
  app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect("/todos");
    }
    if (req.accepts("html")) {
      return res.render("index", {
        csrfToken: req.csrfToken(),
      });
    }
});

app.post(
    "/session",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (request, response) => {
      console.log(request.user);
      request.flash("error");
      response.redirect("/todos");
    },
);

passport.serializeUser((user, done) => {
    console.log("Serializing user in session", user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
});

app.get("/", async (request, response) => {
    response.render("index", {
      title: "LMS",
      csrfToken: request.csrfToken(),
    });
});

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect("/todos");
    }
    if (req.accepts("html")) {
      return res.render("index", {
        csrfToken: req.csrfToken(),
      });
    }
});

app.get('/login',(req,res) => {
    if(request.accepts('html')){
        response.render('login',{title:'LMS'});
    }
});

app.get('/signout',(req,res) => {
  response.render("signin", {
    title: "Sign In",
    csrfToken: request.csrfToken(),
  });
});

app.get("/signup", (request, response) => {
  response.render("signup", {
    title: "Sign Up",
    csrfToken: request.csrfToken(),
  });
});