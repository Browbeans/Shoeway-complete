import mongoose from 'mongoose';

interface Product{
    title: string,
    price: number,
    size: number,
    quantity: number,
    category: string,
    stock: number,
    image: string, 
}

const ProductVariant = new mongoose.Schema({
  size: Number, 
  stock: Number,
  quantity: Number
})


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
  // size: {
  //   type: Number,
  //   required: true,
  //   min: [0, "Size must be a positive number"],
  // },
  // quantity: {
  //   type: Number,
  //   required: true,
  //   min: [1, "Quantity must be a positive number"],
  // },
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
  // stock: {
  //   type: Number,
  //   required: true,
  //   min: [1, "Stock must be a positive number"],
  // },
  image: {
    type: String,
  },
  variants: [ProductVariant]
});

module.exports = mongoose.model<Product>('Products', productSchema);