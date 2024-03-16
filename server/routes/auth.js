import { Router } from "express";
import bcrypt from "bcrypt";
import {
  addUserValidator,
  authUserValidator,
} from "../validators/userValidator.js";
import { addUser, getUser } from "../model/db_tables.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});
router.post("/login", async (req, res, next) => {
  try {
    if (req.session.email && req.session.email.length > 0) {
      res.redirect("/");
      return;
    }
    const { error } = await authUserValidator(req.body);
    if (!!error) {
      res.render("login", {
        error: error.details[0].message
          ? error.details[0].message
          : "Someting went wrong",
      });
      // throw new res.error(400, error.details[0].message);
      return;
    }

    const user = await getUser(null, null, req.body.email);
    if (!user || user?.length == 0) {
      res.render("login", { error: "username or password incorrect" });
      //   throw new res.error(404, "username or password incorrect");
      return;
    }
    const isValidPwt = await bcrypt.compare(req.body.password, user[0].password);
    if (!isValidPwt){
      res.render("login", { error: "username or password incorrect" });
      // throw new res.error(404, "username or password incorrect");
      return;
    } 
    // req.session.userId=user[0].id;
    // res.redirect('/');
    
    let newSession = req.session;
    newSession.email = req.body.email;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/regis", (req, res) => {
  res.render("regis", { error: null });
});
router.post("/regis", async (req, res, next) => {
  try {
    const { error } = await addUserValidator(req.body);
    // console.log(!!error)
    if (!!error) {
      res.render("regis", {
        error: error.details[0].message
          ? error.details[0].message
          : "Someting went wrong",
      });
      // throw new res.error(400, error.details[0].message);
      return;
    }

    let user = await getUser(null, null, req.body.email);
    if (user || user?.length > 0) {
      res.render("regis", { error: "This email was previously registered" });
      //   throw new res.error(400, "This email was previously registered");
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log(req.body.name, req.body.email, hashPassword);
    await addUser(req.body.name, req.body.email, hashPassword);
    //   role: req.body.role ? req.body.role : "user",
    let newSession = req.session;
    newSession.email = req.body.email;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/logout', (req, res, next)=>{
  try {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/')
  } catch (error) {
    next()
  }
})

export default router;
