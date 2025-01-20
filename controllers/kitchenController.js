const Kitchen = require("../models/kitchen");

// GET /kitchens - Display featured kitchens

exports.getkitchen = (req, res, next) => {
  Kitchen.getAllkitchens().then(([kitchens, categories]) => {
    res.render("kitchen", {
      kitchens: kitchens,
      categories: categories,
      isUser: req.session.userId,
      validationError: req.flash("validationErrors")[0],
    });
  });
  //     .catch((err) => res.redirect("/error"));
};
