const USER = 'wupengFEX';
const HOST = 'https://api.github.com/';
const TOKEN = 'd7aa1b9c06b4e411e2f49dafcd68cc0bae883a9e';

export function Github(obj) {
}

Github.prototype.getRepo = function (p, cb) {
    if (!p.url) {
        cb('No request url!');
        return;
    }
    wx.request({
        url: HOST + p.url,
        method: p.method || 'get',
        header: {
            Authorization: 'token ' + TOKEN
        },
        data: p.params,
        success: res => {
            const result = res.data
            if (res.statusCode === 200) {
                return cb(null, result);
            }
            cb('Request Fail!');
        },
        fail: error => {
            callback(error.errMsg);
        }
    });
}
