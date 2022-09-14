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
    return {
        isValid: true
    }
}

module.exports = {
    validateBlogData
}