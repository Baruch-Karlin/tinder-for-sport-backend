// for adding a post to chat
const S = require('fluent-json-schema').default;

const postValidateSchema = S.object()
    .prop("creator", S.string().minLength(2).required())
    .prop("postBody", S.string().minLength(10).required())
    .valueOf();
exports.postValidateSchema = postValidateSchema