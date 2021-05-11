const S = require('fluent-json-schema').default;


const userSignUpValidateSchema = S.object()
    .prop('email', S.string().required())
    .prop('password', S.string().minLength(6).required())
    .prop('confirmPassword', S.string().minLength(6).required())
    .prop('first_name', S.string())
    .prop('last_name', S.string())
    .prop('picture', S.string())
    .prop('sports', S.array().items(
        S.object().prop('running', S.object()
            .prop('speed', S.string())
            .prop('distance', S.number())
            .prop('location', S.string())
    )))
    .valueOf();

exports.userSignUpValidateSchema = userSignUpValidateSchema;