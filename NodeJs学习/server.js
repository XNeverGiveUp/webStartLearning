const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const urlLib = require('url')

var users = {}

var server = http.createServer((req, res) => {
    console.log("有人进入服务器了")
    var str = "";
    req.on("data", (data) => {
        str += data;
    })
    req.on("end", () => {
        var obj = urlLib.parse(req.url, true);
        var url = obj.pathname;
        var GET = obj.query;
        var POST = querystring.parse(str);
        if (url == "/user") {
            switch (GET.act) {
                case 'reg':
                    if (users[GET.user]) {
                        res.write('{"ok": false, "msg": "用户名已存在!"}');
                    } else {
                        users[GET.user] = GET.pass;
                        res.write('{"ok": true, "msg": "注册成功!"}');
                    }
                    break;
                case 'login':
                    if (!users[GET.user]) {
                        res.write('{"ok": false, "msg": "用户名不存在!"}');
                    } else if (users[GET.user] !== GET.pass) {
                        res.write('{"ok": false, "msg": "用户名或密码错误"}');
                    } else {
                        res.write('{"ok": true, "msg": "登录成功"}');
                    }
                    break;
                default:
                    res.write('{"ok": false, "msg": "未知的act"}');

            }
            res.end();
        } else {
            var file_name = `./www${url}`;
            fs.readFile(file_name, (err, data) => {
                if (err) {
                    res.write('404')
                } else {
                    res.write(data)
                }
                res.end();
            })
        }
    })

})

server.listen(80)
