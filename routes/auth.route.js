const router = require("express").Router();
const bodyParser = require("body-parser");
const authController = require("../controllers/auth.controller");
const check = require("express-validator").check;
const authGaurd = require("./guard/auth.guard");

router.get("/signup", authGaurd.notAuth, authController.getSignup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty().withMessage("الاسم مطلوب"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("الايميل مطلوب")
    .isEmail()
    .withMessage("التنسيق غير صالح"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("كلمة المرور مطلوبة")
    .isLength({ min: 6 })
    .withMessage("كلمةالمرور يجب أن تكون من 6 احرف على الاقل"),
  check("confirm password").custom((value, { req }) => {
    if (value === req.body.password) return true;
    else throw "كلمة المرور غير متطابقة";
  }),
  authController.postSignup
);

router.get("/login", authGaurd.notAuth, authController.getLogin);
router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("الايميل مطلوب")
    .isEmail()
    .withMessage("تنسيق غير صالح"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("كلمة المرور مطلوبة")
    .isLength({ min: 6 })
    .withMessage("كلمة المرور يجب أن تكون من 6 احرف على الاقل"),
  authController.postLogin
);
router.all("/logout", authGaurd.isAuth, authController.logout);

module.exports = router;
