const Product = require('./Model')

module.exports.getProducts = function(req: any, res: any) {
    res.send(Product);
};

module.exports.getSpecific = function (req: any, res: any) {
  res.send("specific");
};

module.exports.addNewProduct = function (req: any, res: any) {
  res.send("deleted");
};

module.exports.deleteProduct = function (req: any, res: any) {
  res.send("deleted");
};

module.exports.editProduct = function (req: any, res: any) {
  res.send("edit");
};