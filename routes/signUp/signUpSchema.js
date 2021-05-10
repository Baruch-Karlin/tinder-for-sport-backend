const S = require('fluent-json-schema').default;


const userSignUpValidateSchema = S.object()
    .prop('email', S.string().required())
    .prop('password', S.string().minLength(6).required())
    .prop('confirmPassword', S.string().minLength(6).required())
    .prop('firstName', S.string())
    .prop('lastName', S.string())
    .valueOf();

exports.userSignUpValidateSchema = userSignUpValidateSchema;