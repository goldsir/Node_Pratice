let fs = require('fs');
let path = require('path');

function fsExists(_path): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.exists(_path, (exists) => {
            resolve(exists);
        });
    });
}

function fsReadDir(_path): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        fs.readdir(_path, (err, files) => {
            resolve(files);
        });
    });
}

function fsMKDir(_path) {

    return new Promise((resolve, reject) => {
        fs.mkdir(_path, (err) => {
            if (err) {
                return reject(false);
            }
            resolve(true);
        });
    });
}

function fsStats(file): Promise<any> {

    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) {
                return reject(err);
            }
            resolve(stats);
        });
    });
}

export async function jCopy(src, dist) {

    let isDistExists = await fsExists(dist);
    if (!isDistExists) {
        await fsMKDir(dist);
    }

    let files = await fsReadDir(src);

    files.forEach(async (file) => {

        let srcFile = path.join(src, file);
        let distFile = path.join(dist, file);

        try {
            let fileStats = await fsStats(srcFile);
            if (fileStats.isFile()) {
                //console.log(srcFile, ' 是個檔案');
                let readable = fs.createReadStream(srcFile);
                let writable = fs.createWriteStream(distFile, { encoding: "utf8" });
                readable.pipe(writable);
            }
            else if (fileStats.isDirectory()) {
                //console.log(srcFile, ' 是個資料夾');
                jCopy(srcFile, distFile);

            }
        } catch (err) {
            console.log('*******', err);
        }
    });
}