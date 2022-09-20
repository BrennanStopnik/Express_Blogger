var express = require('express');
var router = express.Router();

var { validateBlogData } = require('../validation/blogs')



/* GET blogs default */
router.get('/', (req, res) => {
    res.json({
        success: true,
        route: "blogs",
        message: "hello from the blogs default route"
    });
});

router.get('/all', (req, res) => {

    const fields = req.query.fields
    const limit = Number(req.query.limit)
    const start = Number(req.query.page)

    let blogs = sampleBlogs;

    if (limit !== undefined &&  start !== undefined){
        const end = start + limit
        blogs = sampleBlogs.slice(start, end)
    }
    
    if (fields) {
        const fields = req.query.fields

        const fieldsArray = fields.split(",")

        const mappedBlogs = sampleBlogs.map((blog) => {

            const blogWithFields = {}

            fieldsArray.forEach((field) => {
                blogWithFields[field] = blog[field]
            })

            return blogWithFields

            
        })
        blogs = mappedBlogs
    }
    
    
    res.json({
        success: true,
        blogs: blogs
    });
});

router.get('/single/:blogTitleToGet', (req, res) => {
    const blogToFind = req.params.blogTitleToGet;

    // const blogIndex = sampleBlogs.findIndex((blog) => {
    //     if (blog.title === blogToFind){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // })

    // const foundBlog = sampleBlogs[blogIndex];

    const foundBlog = sampleBlogs.find((blog) => {
        if (blog.title === blogToFind){
            return true;
        } else {
            return false;
        }
    });
    
    res.json({
        success: true,
        blog: foundBlog
    });
});

router.post('/create-one', (req, res) => {

    const title = req.body.title
    const text = req.body.text
    const author = req.body.author
    const category = req.body.category

    const newBlog = {
        title,
        text,
        author,
        category,
        createdAt: new Date(),
        lastModified: new Date()
    }

    const blogDataCheck = validateBlogData(newBlog)

    console.log(blogDataCheck);

    if (blogDataCheck.isValid === false) {
        res.json({
            success: false,
            message: blogDataCheck.message
        })
        return;
    }


    sampleBlogs.push(newBlog)

    res.json({
        success: true
    })
})


router.put('/update-one/:blogTitle', (req, res) => { 

    const title = req.params.blogTitle

    const text = req.body.text
    const author = req.body.author
    const category = req.body.category
    
    const ogBlogIndex = sampleBlogs.findIndex((blog) => {
        return blog.title === title
    })

    const ogBlog = sampleBlogs[ogBlogIndex]

    const blogData = {
        title: ogBlog.title,
        text,
        author,
        category,
        createdAt: ogBlog.createdAt,
        lastModified: new Date()
    }

    const blogDataCheck = validateBlogData(blogData)
    
    if (blogDataCheck.isValid === false){
        res.json({
            success: false,
            message: blogDataCheck.message
        })
        return;
    }
    
    sampleBlogs[ogBlogIndex] = blogData

    res.json({
        success: true
    })
})


router.delete('/delete-single/:blogTitleToDelete', (req, res) => {
    const blogToDelete = req.params.blogTitleToDelete;

    const blogIndex = sampleBlogs.findIndex((blog) => {
        if (blog.title === blogToDelete){
            return true;
        } else {
            return false;
        }
    });

    if (blogIndex < 0){
        res.json({
            hasBeenDeleted: false
        })
        return;
    }
    
    sampleBlogs.splice(blogIndex, 1);
    
    res.json({
        hasBeenDeleted: true
    });
});



module.exports = router;