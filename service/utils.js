const USER = 'wupengFEX';
const HOST = 'https://api.github.com/';
const TOKEN = '6e6fb9d6d1f377665ef68f2b3001c75429e45767';

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
