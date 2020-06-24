const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
// Old code here
/*
router.get("/home", blogController.home)
router.get("/about", blogController.about)
router.get("/createpost", blogController.create)
router.post("/createpost", blogController.postcreate)
router.get("/:id", blogController.viewblog)
router.get("/", blogController.address)
*/

// New code
router.get('/home', blogController.home);
router.get('/about', blogController.about);
router.get('/address', blogController.address);

router
    .route('/createpost')
    .get(blogController.create)
    .post(blogController.postcreate);

router.route('/:id').get(blogController.viewblog);

module.exports = router;