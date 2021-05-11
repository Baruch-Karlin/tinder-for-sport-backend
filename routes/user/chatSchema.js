{
    "chat": [
        {
            "posts": [
                {
                    "name": "baruch",
                    "body": "this is the first post"
                }
            ]
        }
    ]
}

const S = require('fluent-json-schema').default;

const postValidateSchema = S.object()
    .prop("posts", S.array().items(

        ).required())
    
    .valueOf();
exports.postValidateSchema = postValidateSchema