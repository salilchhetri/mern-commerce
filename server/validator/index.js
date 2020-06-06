//const { check, validationResult } = require('express-validator');


// exports.userSignupValidator = (req, res, next) => {
//     req.check('name', 'Name is required').notEmpty();
//     req.check('email', 'Email must be between 3 to 32 characters')
//         .matches(/.+\@.+\..+/)
//         .withMessage('Email must contain @')
//         .isLength({
//             min: 4,
//             max: 32
//         });
//     req.check('password', 'Password is required').notEmpty();
//     req.check('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must contain at least 6 characters')
//         .matches(/\d/)
//         .withMessage('Password must contain a number');
//     const errors = req.validationErrors();
//     if (errors) {
//         const firstError = errors.map(error => error.msg)[0];
//         return res.status(400).json({ error: firstError });
//     }
//     next();
// };


const { check, validationResult } = require('express-validator')
const userValidationRules = () => {
    return [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Email is invalid'),
        check('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })

    //     if (errors) {
    //         const firstError = errors.map(error => error.msg)[0];
    //         return res.status(400).json({ error: firstError });
    //     }

}

module.exports = {
    userValidationRules,
    validate
}