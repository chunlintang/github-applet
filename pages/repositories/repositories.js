import {
    Github
} from '../../service/utils'

Page({
    page: 1,
    maxFeeds: 30,
    data: {
        err: null,
        repos: [],
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
            url: 'users/wupengFEX/repos',
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
                let result = self.data.repos.concat(data);
                self.setData({
                    repos: result,
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
