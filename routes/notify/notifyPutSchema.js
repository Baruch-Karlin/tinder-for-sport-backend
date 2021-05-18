const S = require("fluent-json-schema").default;

const notifyPutSchema = S.object()
  .prop("title", S.string().required())
  .prop(
    "running",
    S.object()
      .prop("speed", S.string().required())
      .prop("distance", S.string().required())
      .prop("location", S.string().required())
      .prop("date", S.string().required())
  )
  .valueOf();

exports.notifyPutSchema = notifyPutSchema;
