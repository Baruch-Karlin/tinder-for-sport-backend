const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: "baruch-karlin",
    api_key: "991848536162794",
    api_secret: "RGDtQ-mWR1Uf8M6_DHWMPrYAQug"
})

function uploadToCloudinary(filePath) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath,  (error, result) => {
            if (error) reject(error);
            else resolve(result)
        });
    })
}
exports.uploadToCloudinary = uploadToCloudinary;
