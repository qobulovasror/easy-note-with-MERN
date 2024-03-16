class CustomError extends Error {
    constructor(message, code){
        super(message)
        this.code = code;
    }
}

const customMiddleware = (req, res, next) => {
    res.error = CustomError;
    next()
}

const customErrorMiddleware = function(error, req, res, next){
    res.render("error", {errorCode: error.code || 500, message: error.message || "Internal server error"})
    // res.status(error.code || 500).json({
    //     ok: false,
    //     message: error.message || "Internal server error"
    // })
}

export {
    customMiddleware,
    customErrorMiddleware
}