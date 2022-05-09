const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('web'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//-------------------------------------------------------------------------------------
const multer = require('multer');
const dir = path.resolve(__dirname, 'web', 'uploads');
const storage = multer.diskStorage({
    // 指定文件路径
    destination: function (req, file, cb) {
        fs.mkdirSync(path.join(dir, req.body.userName), { recursive: true });
        cb(null, path.join(dir, req.body.userName));
    },
    // 指定文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
//-------------------------------------------------------------------------------------

app.post('/upload', upload.array('imgs', 12), function (req, res) {

    if (req.files === undefined) {
        return res.json(resultMessage(1, '沒檔案呀'));
    }

    let files = req.files;
    const SIZELIMIT = 500000;

    for (file of files) {

        const { size, mimetype, filename } = file;
        const types = ['jpg', 'jpeg', 'png', 'gif'];
        const tmpTypes = mimetype.split('/')[1];

        // 檢查檔案大小
        if (size >= SIZELIMIT) {
            return res.json(resultMessage(1, '檔案太大惹', file.originalname));
        }
        else if (types.indexOf(tmpTypes) < 0) {
            return res.json(resultMessage(1, '只允許 jpg, jpeg, png, gif'));
        }
    }

    res.redirect(`/gallery.html?userName=${req.body.userName}`);
});

app.get('/gallery', async function (req, res) {

    let userName = req.query.userName;
    let userDir = path.join(dir, req.query.userName);
    let files = fs.readdirSync(userDir);

    files = files.filter(file => {

        return /\.(jpg|jpeg|png|gif)$/.test(file);
    });

    files = files.map(file => {

        return `/uploads/${userName}/${file}`
    });

    res.json(resultMessage(0, '', files));


})


function resultMessage(resultCode, resultMessage, result) {
    return {
        resultCode
        , resultMessage
        , result
    }
}


app.listen(3000);
