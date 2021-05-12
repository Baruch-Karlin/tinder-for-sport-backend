const S = require('fluent-json-schema').default;

const chatValidateSchema = S.array().items(
    S.object().prop('posts', S.array().items(
        S.object()
        .prop('name', S.string())
        .prop('body', S.string())
    ))
)
.valueOf();
exports.chatValidateSchema = chatValidateSchema