// for adding a post to chat
const S = require('fluent-json-schema').default;

const postValidateSchema = S.object()
  
exports.postValidateSchema = postValidateSchema