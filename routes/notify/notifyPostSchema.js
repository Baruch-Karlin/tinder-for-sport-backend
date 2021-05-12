const S = require('fluent-json-schema').default;

const notifyPostSchema = S.object()
    .prop('speed', S.string().required())
    .prop('distance', S.string().required())
    .prop('location', S.string().required())
    .prop('time', S.string().required()) 
    .prop('title', S.string().required())
    .valueOf();

exports.notifyPostSchema = notifyPostSchema;