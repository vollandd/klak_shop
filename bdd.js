const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.vriyyo4.mongodb.net/?retryWrites=true&w=majority');

const Product = mongoose.model('Product', { name: String }, { price: Number }, { description: String });

const shoe = new Product({ name: 'nike' }, { price: '99.99' }, { description: '' });
shoe.save().then(() => console.log('meow'));