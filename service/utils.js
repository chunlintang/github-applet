const HOST = 'https://api.github.com/';
const app = getApp();

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
            Authorization: 'token ' + app.globalData.token
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
