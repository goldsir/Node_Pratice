const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {

    if (req.url === '/favicon.ico' && req.method === 'GET'){
        return 
    };

    if (req.url === '/' && req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
        fs.readFile('./post.html','utf8',(err,data)=>{
            if (err){
                res.end('網頁讀取失敗');
            }else{
                res.end(data);
            }
        });

    }
    else if (req.url === '/POST' && req.method === 'POST'){
        res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});

        let buffer = []

        req.on('data',function(data){
            buffer.push(data);
            //res.write(data);
        });
        
        req.on('end',function(){
            let dataStr = Buffer.concat(buffer).toString();
            
            let inputStr = formURLDecodeComponent(dataStr).split("&");
            let object = {};

            for (var i=0;i<inputStr.length;i++){
                let data = inputStr[i].split('=')

                object[data[0]]=data[1];

            }

            console.log(object);

            res.end(JSON.stringify(object));
        });

        function formURLDecodeComponent(s) {
            return decodeURIComponent((s + '').replace(/\+/g, ' '));
        }
    }
    else {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end('這裡沒有東西');
    }

});

server.listen(3000,() => {
    console.log('server啟動');
});

