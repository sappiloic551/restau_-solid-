const multer = require ('multer');
const path = require ('path');

//storage configuration

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // where the files are stored 
    },
    filename: function (req, file, cb){
        //rename the uploaded file
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, 'plat-' + uniqueSuffix);
    }
});

//file filter to allow only image files (jpeg,png,jpg)

function fileFilter (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test (path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb (new Error ('only .png, .jpg and jpeg format allowed!'));
    }
} 

//upload middleware

const upload = multer ({
    storage : storage,
    limits : {filesize: 5* 1024 * 1024}, 
    fileFilter: fileFilter });

    module.exports = upload;