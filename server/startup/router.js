import Express from "express";
import session from "express-session";

import {
  customErrorMiddleware,
  customMiddleware,
} from "../middleware/errorHandler.js";
import home from "../routes/home.js";
import user from "../routes/user.js";
import auth from "../routes/auth.js";
// import note from '../routes/note.js'

export default async function (app) {
  //default middleware
  app.use(
    session({
      secret: "randomstringsessionsecret",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  app.set("view engine", "ejs");

  //custom middleware
  app.use(customMiddleware);
  app.use(Express.static("public"));

  //routes
  app.use("/auth", auth);
  app.use("/", home);
  app.use("/api/home", user);
  // app.use("/api/note", note);

  //custom error middleware
  app.use(customErrorMiddleware);
  app.use("*", function (req, res) {
    res.render("error", {
      errorCode: 404,
      message: "page not found",
    });
  });
}
