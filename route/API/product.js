import express from "express";
import { uploads, uploadsExcel } from "../../multerconf";

const router = express.Router({ mergeParams: true });
router.use(express.json());
import productController from "../../controllers/productController";
router.post('/create-product', uploads("products").array("fileSelected"), productController.createNewProduct);
router.post('/create-product-category', productController.createNewCategory);
router.put('/update-product-category', productController.updateCategory);
router.put('/update-product', uploads("products").array("fileSelected"), productController.updateProduct);
router.delete('/delete-category/:id', productController.deleteCategory);
router.delete('/delete-product/:id', productController.deleteProduct);
router.get('/get-all-products', productController.getAllProducts);
router.get('/get-all-categories', productController.getAllCategories);
router.get('/get-products-pagination', productController.getAllProductsPagination);
router.post('/test', uploadsExcel("requests").array("fileSelected"), function (req, res) {
    console.log(uploadsTest("requests").array("fileSelected"));
    console.log('===>CHECK : ', req.body);
    console.log('===>CHECK name: ', req.files);


});


module.exports = router;
