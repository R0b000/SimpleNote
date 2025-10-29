const validation = (rule) => {
    return async (req, res, next) => {
    try{
        const data = req.body;
    // Joi option name is `abortEarly` (not `earlyAbort`). Set false so all errors are returned.
    await rule.validateAsync(data, { abortEarly: false });
        next();
    } catch (error) {
        let errorBag = {};

        error.details.forEach(items => 
            errorBag[items.path[0]] = items.message  
        )

        console.log(errorBag)

        next({
            data: errorBag,
            message: "Validation error has occured.",
            code: 404,
            status: "Validation Error"
        })
    }
}}

module.exports = validation;