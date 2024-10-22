const Product = require(`${process.cwd()}/models/productModel`);
const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`);
const AppError = require(`${process.cwd()}/handlers/AppError`);

const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();
const mongoose = require("mongoose");

const productImageLimit = 9;

const multerFilter = (req, file, cb) => {
  // No matther what image type it is, mimetype of images always starts with image
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only an image", 401), false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

exports.uploadImgToBuffer = upload.array("images", productImageLimit);

exports.resizeAndUploadImg = (req, res, next) => {
  if (!req.files)
    return new AppError(
      "Please provide atleast one image for this product",
      401
    );

  req.body.images = [];
  // Promise.all is used here to make sure that all files are being uploaded before going next
  Promise.all(
    req.files.map(async (file, i) => {
      const filename = `${req.user._id}${Date.now()}${i++}.jpeg`;

      sharp(file.buffer)
        .resize(190, 150)
        .jpeg({
          quality: 90,
        })
        .toFile(`public/img/products/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
};

exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const { category_id } = req.params;
  const products = await Product.find({ category_id });

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  return res.status(200).json({
    status: "success",
    message: "Product created successfully",
    data: {
      newProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });

  return res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: {
      product,
    },
  });
});
