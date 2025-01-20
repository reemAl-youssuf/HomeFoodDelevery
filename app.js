const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const authRouter = require("./routes/auth.route");
const kitchenRouter = require("./routes/kitchenroute");
const dishesRouter = require("./routes/dishesroute");
const favoriteRouter = require("./routes/favoriteroute");
const cartRouter = require("./routes/cartroute");
const app = express();
app.use(express.static(path.join(__dirname + "/public/")));

// Connect to MongoDB
app.use(flash());
const STORE = new SessionStore({
  uri: "mongodb://127.0.0.1/homefooddelivery",
  collection: "sessions",
});

app.use(
  session({
    resave: true,
    secret: "this is my secret secret to hash express sessions ......",
    saveUninitialized: false,
    store: STORE,
  })
);


// Set up EJS as the view engine
app.set("view engine", "ejs");

// // Serve static files from the "public" directory
app.use(express.static(path.join(__dirname + "/public/")));
// Define routes
app.get('/',(req,res,next)=>{
  res.render('home',{
    isUser: req.session.userId
  })
})
app.get('/about',(req,res,next)=>{
  res.render('about',{
    isUser: req.session.userId
  })
})
app.get('/cotactUs',(req,res,next)=>{
  res.render('cotactUs',{
    isUser: req.session.userId
  })
})
app.use("/kitchens", dishesRouter);
app.use("/kitchens", kitchenRouter);
app.use("/", authRouter);
app.use("/", favoriteRouter);
app.use("/cart", cartRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
