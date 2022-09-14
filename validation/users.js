const validateUserData = (userData) => {
    console.log(userData)
    if (userData.email === undefined || typeof(userData.email) !== "string") {
        return {
            isValid: false,
            message: "Email is required and must be a string"
        }
    } 
    
    if (userData.firstName === undefined || typeof(userData.firstName) !== "string") {
        return {
            isValid: false,
            message: "First name is required and must be a string"
        }
    }
    
    if (userData.lastName === undefined || typeof(userData.lastName) !== "string") {
        return {
            isValid: false,
            message: "Last name is required and must be a string"
        }
    }
    
    if (userData.age !== undefined && typeof(userData.age) !== "number") {
        return {
            isValid: false,
            message: "Age must be a number"
        }
    }
    
    if (userData.favoriteFoods !== undefined || !Array.isArray(userData.favoriteFoods) || userData.favoriteFoods.length > 0) {
        let isFavoriteFoodsString = true

        for (let i = 0; i < userData.favoriteFoods.length; i++){
            if (typeof(userData.favoriteFoods[i]) !== 'string') {
                isFavoriteFoodsString = false
            }
        }

        if (isFavoriteFoodsString === false) {
            return {
                isValid: false,
                message: "All entrues in isFavoriteFoods must be strings"
            }
        }
    } 

    return {
        isValid: true
        }
}

module.exports = {
    validateUserData
}