const validateBlogData = (blogData) => {
    if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 40) {
        return {
            isValid: false,
            message: "Title is a required field, must be a string and less than 40 char."
        }
    }

    if (blogData.text === undefined || typeof(blogData.text) !== "string") {
        return {
            isValid: false,
            message: "Text is a required field and must be a string."
        }
    }

    if (blogData.author === undefined || typeof(blogData.author) !== "string" || blogData.author.length > 40) {
        return {
            isValid: false,
            message: "Author is a required field, must be a string and less than 40 char."
        }
    }

    if (blogData.category === undefined || blogData.category.length < 1 || !Array.isArray(blogData.category)) {
        return {
            isValid: false,
            message: "Category must exist, must be an array and have items in it"
        }
    }

    if (blogData.category.length > 10) {
        return {
            isValid: false,
            message: "Category can not have more than 10 items."
        }
    }

    const nonStringArray = blogData.category.filter((blogCategory) => {
        if (typeof(blogCategory) !== 'string') {
            return true
        } else {
            return false
        }
    }) 

    if (nonStringArray.length > 0) {
        return { 
            isValid: false,
            message: "Category must only contain string values."
        }
    }

    // const validCategories = [
    //  "lorem",
	// 	"ipsum",
	// 	"dolor", 
	// 	"sit",
	// 	"amet"
    // ]

    let isArrayValid = true

    blogData.category.forEach(blogCategory => {
        
        if (validCategories.includes(blogCategory) === false) {
            isArrayValid = false;
        }
        
    });
    
    if (isArrayValid === false) {
        return {
            isValid: false,
            message: "Category values must be on of the following: lorem, ipsum, dolor, sit or amet"
        }
    }

    return {
        isValid: true
    }
}

module.exports = {
    validateBlogData
}