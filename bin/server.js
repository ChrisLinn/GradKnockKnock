const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const port = config.server_port

var fs = require('fs');
var os = require('os');
var date = new Date();
const { execSync,exec } = require('child_process');
var ifaces = os.networkInterfaces();
var ip_package = require("ip");

let using_pulic_addr = 0;
var ip = "0.0.0.0"
if (using_pulic_addr) {
    ip = ip_package.address()
}
else {
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (iface.address.substr(0,3) == "10.") {
                ip = iface.address
            }
        });
    });
}


let md_file = "index.md"

let content =   "# GradKnockKnock\n" +
                "邮件订阅 UniMelb Careers Online __IT__ 相关 __Graduate Program__  资讯\n\n" +
                "因为现在是挂在校园网内，请使用学校 VPN 访问\n\n" +
                "如果还不能访问说明我没有开机...\n\n" +
                "访问地址: [" + ip + ":" + port + "](http:\/\/" + ip + ":" + port+")\n\n" + 
                "IP updated at: " + date + "\n\n\n" +
                "源码地址: [https://github.com/ChrisLinn/GradKnockKnock](https://github.com/ChrisLinn/GradKnockKnock)\n\n" +
                "兄弟项目地址: [py-UnimelbCareerAutoBookin](https://github.com/ChrisLinn/py-UnimelbCareerAutoBookin), " +
                "Careers Online 抢位软件\n\n\n" +
                "您的打赏是我长胖的动力\n\n" +
                "打赏二维码\n\n" +
                "![QR](public\/QR.png)"

fs.writeFileSync(md_file, content)

execSync('git add index.md');
execSync('git commit -m \"IP updated at ' + date + '\"');
execSync('git push');

exec('node server/worker.js', (err, stdout, stderr) => {
    if (err) {
        return;
    }
    // console.log(`${stdout}`);
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
});

server.listen(port)
debug(`Server is now running at http://localhost:${port}.`)