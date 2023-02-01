const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const userRoutes = require('./routes/userRouter');


mongoose.connect(process.env.ID_BDD,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

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

  });

  app.use('/api/products', (req, res, next) => {
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
  });

const User = require('./models/user.js');



app.use(express.json());


app.use('/api/',userRoutes);



module.exports = app;
