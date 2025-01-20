const cartModel = require( "../models/cart" );
const orderModel = require("../models/order");
const validationResult = require("express-validator").validationResult;

exports.getCart = (req, res, next) => {
  cartModel
    .getItemsByUser(req.session.userId)
    .then((items) => { 
      res.render("cart", {
        items: items,
        isUser: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .addNewItem({
        title: req.body.title,
        oldprice: req.body.oldprice,
        newprice: req.body.newprice,
        amount: req.body.amount,
        disheId: req.body.disheId,
        userId: req.session.userId,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect(req.body.ref);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};
exports.postDelete = (req, res, next) => {
  cartModel
    .deleteItem(req.params.id)
    .then(() => res.redirect("/cart"))
    .catch((err) => res.redirect("/error"));
};

exports.updateQuantity = (req, res, next) => {
  console.log("Updating quantity...");
  const itemId = req.body.itemId;
  const newAmount = parseInt(req.body.newamount, 10);

  // Call the cart model function to update the amount
  cartModel
    .updateItemQuantity(itemId, newAmount)
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page after successful update
    })
    .catch((err) => {
      console.error("Error updating quantity in the cart:", err);
      res.redirect("/error"); // Redirect to an error page if there's an error
    });
};

exports.checkout = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const deliveryAddress = req.body.deliveryAddress;
    const cartItems = await cartModel.getItemsByUser( userId );
console.log(cartItems)
    if (cartItems.length === 0) {  res.redirect("/cart");
     return  req.flash("error", "لا يوجد طلبات لإتمام الشراء.");   
    }
    // Calculate the total price
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.newprice * item.amount;
    }
    // Create the order
    const order = new orderModel({
      userId: userId,
      deliveryAddress: deliveryAddress,
      items: cartItems,
      totalAmount: totalPrice,
    });

    await order.save();
    

    // Clear the cart after the order is created
    await cartModel.clearCart(userId);

    // Redirect to the order page and pass the order details
    res.render("order", { order: order, items: cartItems, isUser: true });
  } catch (err) {
    console.error("Error during checkout:", err);
    req.flash(
      "error",
      "حدث خطأ أثناء إتمام عملية الشراء. يرجى المحاولة مرة أخرى."
    );
    res.redirect("/cart");
  }
};

