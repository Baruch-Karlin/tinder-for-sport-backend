const S = require('fluent-json-schema').default;

const userLogInValidateSchema = S.object()
    .prop("email", S.string().required())
    .prop('password', S.string().minLength(6).required())
    .valueOf();
exports.userLogInValidateSchema = userLogInValidateSchema
