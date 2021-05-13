// for adding a post to chat
const S = require('fluent-json-schema').default;

const postValidateSchema = S.object()
    .prop("content", S.string().required())
    .valueOf();
exports.postValidateSchema = postValidateSchema