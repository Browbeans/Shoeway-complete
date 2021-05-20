import mongoose from 'mongoose';

interface Product{
    title: string,
    price: number,
    size: number,
    category: string,
    stock: number,
}
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function (value: any) {
        const titleRegex = /^[a-öA-Ö\s,'-]+$/;
        return titleRegex.test(value);
      },
      message: "Title must be a string",
    },
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
  size: {
    type: Number,
    required: true,
    min: [0, "Size must be a positive number"],
  },
  category: {
    type: String,
    required: true,
    validate: {
      validator: function (value: any) {
        const titleRegex = /^[a-öA-Ö\s,'-]+$/;
        return titleRegex.test(value);
      },
      message: "Category must be a string",
    },
  },
  stock: {
    type: Number,
    required: true,
    min: [1, "Stock must be a positive number"],
  },
});

module.exports = mongoose.model<Product>('Products', productSchema);