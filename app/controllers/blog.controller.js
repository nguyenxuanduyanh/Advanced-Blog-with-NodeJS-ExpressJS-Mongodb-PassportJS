const bodyParser = require('body-parser')
    // create application/x-www-form-urlencoded parser
const Blog = require("../models/blog.model");


module.exports.home = async(req, res) => {
    const page = req.query.page || 1;
    const limit = 5;
    try {
        const blogs = await Blog.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
        const count = await Blog.countDocuments()
        res.render("pages/home", {
            blogs: blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.log(err.message)
    }
}
module.exports.viewblog = (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => { res.render("pages/blog", { blog: blog }) })
        .catch(err => { message: err });

}
module.exports.about = (req, res) => {
    res.render("pages/about")
}


module.exports.create = (req, res) => {
    res.render("pages/createpost")
}

module.exports.postcreate = (req, res) => {
    if ((!req.body.title) || (!req.body.description) || (!req.body.content)) {
        return res.status(400).send({
            message: "All fields cannot be empty"
        });
    }
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        content: req.body.content
    })
    blog.save()


    res.redirect("/home")
}
module.exports.address = (req, res) => {
    res.render("pages/address")

}

module.exports.signin = (req, res) => {
    res.render('pages/signin')
}