const User = require("../models/user");
const jwt = require("jsonwebtoken");
// register a new user
module.exports.register = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log(`Error in creating user:${error}`);
          return res.json(409, {
            message: "Error in creating user",
          });
        } else {
          return res.json(200, {
            message: "Registration Successful",
            details: {
              name: user.name,
              email: user.email,
              location: user.location,
            },
          });
        }
      });
    } else {
      return res.json(409, {
        message: "User already exists",
        details: {
          name: user.name,
          email: user.email,
        },
      });
    }
  });
};
// create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.email != req.body.email) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    return res.json(200, {
      message: "Sign in successful,here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "postit", { expiresIn: "7000000" }),
      },
    });
  } catch (error) {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server error",
    });
  }
};

// adding image

module.exports.addPost = async function (req, res) {
  let user = await User.findById(req.params.id);
  if (user.email != req.body.email) {
    return res.json(422, {
      message: "Invalid user",
    });
  }
  if (user) {
    image = req.body.image;
    user.images.push(image);
    user.save();
    return res.json(200, {
      message: "Image added Successfully!",
    });
  }
};

// function to get all images for a given user
module.exports.getAllUserImage = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      let all_image = user.images;
      res.json(200, {
        name: user.name,
        location: user.location,
        images: all_image,
      });
    }
  } catch (error) {
    return res.json(422, {
      message: "Internal Server Error",
    });
  }
};
// getting all the images
module.exports.getAll = function (req, res) {
  User.find({}, function (err, users) {
    var list = [];
    for (user of users) {
      list.push(user.images);
    }
    return res.json(200, {
      user: list,
    });
  });
};
