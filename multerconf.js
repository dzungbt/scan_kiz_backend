import multer from 'multer';
import mime from 'mime';
import us from 'microtime';

module.exports.uploads = function (dir) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${dir}`);
        },
        filename: (req, file, cb) => {
            // const extension = mime.getExtension(file.mimetype);
            const filename = `${file.fieldname}-${us.now()}.jpg`;
            cb(null, filename);
        },
    });
    return multer({ storage: storage });
};

module.exports.uploadsExcel = function (dir) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${dir}`);
        },
        filename: (req, file, cb) => {
            // const extension = mime.getExtension(file.mimetype);
            const filename = `BG${us.now()}.xlsx`;
            cb(null, filename);
        },
    });
    return multer({ storage: storage });
};



