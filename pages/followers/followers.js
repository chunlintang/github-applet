import {
    Github
} from '../../service/utils'
const app = getApp();

Page({
    page: 1,
    maxFeeds: 30,
    count: 0,
    data: {
        err: null,
        followers: [],
        hasData: true
    },
    onLoad: function () {
        this.github = new Github();
        this.getRepo();
    },
    onReachBottom: function () {
        this.data.hasData && this.getRepo();
    },
    getRepo: function () {
        let self = this;
        wx.showLoading();
        self.github.getRepo({
            url: 'users/' + app.globalData.user + '/followers',
            params: {
                page: self.page
            }
        }, (err, data) => {
            if (err) {
                self.setData({
                    err: err
                });
            }
            else {
                let result = self.data.followers.concat(data);
                self.count += data.length;
                self.setData({
                    followers: result,
                    page: self.page++
                })
                if (data.length < self.maxFeeds) {
                    self.data.hasData = false;
                }
            }
            wx.hideLoading();
        });
    },

});
