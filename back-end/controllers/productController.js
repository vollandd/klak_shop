//controllers productController.js

const Product = require('../models/productModel');

exports.createProduct = (req, res, next) => {
  /*req.body.title = 'hola';
  req.body.description = 'hello';

  req.body.imageUrl = 'url';
  req.body.price = 1234;
  req.body.userId = 'dimitri';*/
    console.log(req.body);

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
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
  Product.findOne({
    _id: req.params.id
  }).then(
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

exports.getClothing = (req, res, next) => {

  const clothing = [
    {
      _id: 'jjjjjjjj',
      title: 'cravatte',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2013/11/14/12/34/neckties-210347_960_720.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'gtthghgddf',
      title: 'hiver',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/11/23/03/17/christmas-2971961_960_720.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },

    {
      _id: 'Leboudepin',
      title: 'doudoune',
      description: 'hello world ! how are you there !',
      imageUrl: 'https://cdn.pixabay.com/photo/2018/03/01/14/57/portrait-3190849_960_720.jpg',
      price: 7700,
      userId: 'nacim',
    },
  ];

  res.status(200).json(clothing);
  next();

};
