//controllers productController.js
const Product = require('../models/productModel');

exports.createProduct = (req, res, next) => {
  
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.auth.userId
  });
  product.save().then(
    () => {
      res.status(201).json({
        message: 'Product added !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({_id: req.params.id}).then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyProduct = (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Product.updateOne({_id: req.params.id}, product).then(
    () => {
      res.status(201).json({
        message: 'Product updated!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteProduct = (req, res, next) => {
  Product.findOne({_id: req.params.id}).then(
    (product) => {
      if (!product) {
        res.status(404).json({
          message: 'Objet non trouvé !'
        });
      }
      if (product.userId !== req.auth.userId) {
        res.status(401).json({
          message: 'Requête non autorisée !'
        });
      }
      Product.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  );
};

exports.getAllProduct = (req, res, next) => {
  Product.find().then(
    (products) => {
      res.status(200).json(products);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};