const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

const app = express();
const port = 3000;

// Not allowed to pass JSON in body by default; must setup middleware.
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello from Node API Server");
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({message: "Product not found"});
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.delete('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({message: "Product not found"});
    }
    res.status(200).json({message: "Product deleted successfully"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

mongoose.connect("mongodb+srv://nathan0713:IAVHNsyoMyvaH7Nb@cluster0.v5gvadm.mongodb.net/Node-Express-API")
.then(() => {
  console.log("Connected to database!");
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  });
})
.catch(() => {
  console.log("Connection failed");
});
