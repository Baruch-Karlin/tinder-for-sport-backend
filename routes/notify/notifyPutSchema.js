const S = require('fluent-json-schema').default;


const notifyPutSchema = S.object()
    .prop('speed', S.string())
    .prop('distance', S.number())
    .prop('location', S.string())
    .prop('time', S.string())
    .valueOf();

exports.notifyPutSchema = notifyPutSchema;