const express = require('express');

const app = express();

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.ID_BDD,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/shoes', (req, res, next) => {
    const shoes = [
      {
        _id: 'oeihfzeoi',
        title: 'Geox',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Kechua',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2016/12/10/16/57/shoes-1897708_960_720.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeoghth',
        title: 'Abidas',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_960_720.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeoghth',
        title: 'Rmax',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2014/01/22/19/38/boot-250012_960_720.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];

    res.status(200).json(shoes);
    next();
  });

  app.use('/api/clothing', (req, res, next) => {
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
        _id: 'jldlfkggd',
        title: 'jeans',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_960_720.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeoghth',
        title: 'doudoune',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2018/03/01/14/57/portrait-3190849_960_720.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];

    res.status(200).json(clothing);
    next();
  });

  const Product = require('./models/product');

  app.use('/api/add', (req, res, next) => {
    const product = new Product({
        title: 'doudoune',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2018/03/01/14/57/portrait-3190849_960_720.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      });
    product.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
      next();
  });

  app.use('/api/products', (req, res, next) => {
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
      next();
  });

  app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

//module.exports = app;
