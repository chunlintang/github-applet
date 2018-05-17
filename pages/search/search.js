import {
    Github
} from '../../service/utils'
const app = getApp();

Page({
    maxFeeds: 30,
    userUrl: 'search/users',
    repoUrl: 'search/repositories',
    data: {
        userPage: 1,
        repoPage: 1,
        err: null,
        userResults: [],
        repoResults: [],
        userHasData: true,
        repoHasData: true,
        selected: true,
        value: ""
    },
    onLoad: function () {
        this.github = new Github();
        this.getRepo(this.repoUrl);
    },
    onReachBottom: function () {
        if (this.data.selected) {
            this.data.repoHasData && this.getRepo(this.repoUrl);
        }
        else {
            this.data.userHasData && this.getRepo(this.userUrl);
        }
    },
    input: function (e) {
        this.data.value = e.detail.value;
    },
    repoSear: function () {
        this.setData({
            repoPage: 1,
            selected: true,
            repoResults: []
        });
        this.getRepo(this.repoUrl);
    },
    userSearch: function () {
        this.setData({
            userPage: 1,
            selected: false,
            userResults: []
        });
        this.getRepo(this.userUrl);
    },
    search: function () {
        if (this.data.selected) {
            this.repoSear();
        }
        else {
            this.userSearch();
        }
    },
    getRepo: function (url) {
        let self = this;
        if (!self.data.value) {
            return;
        }
        wx.showLoading();
        self.github.getRepo({
            url: url,
            params: {
                page: self.data.selected ? self.data.repoPage : self.data.userPage,
                q: self.data.value
            }
        }, (err, data) => {
            if (err) {
                self.setData({
                    err: err
                });
            }
            else {
                let result = [];
                if (self.data.selected) {
                    result = self.data.repoResults.concat(data.items);
                    self.setData({
                        repoResults: result,
                        repoPage: self.data.repoPage++
                    });
                }
                else {
                    result = self.data.userResults.concat(data.items);
                    self.setData({
                        userResults: result,
                        userPage: self.data.userPage++
                    });
                }
                if (data.items.length < self.maxFeeds) {
                    if (self.data.selected) {
                        self.data.repoHasData = false;
                    }
                    else {
                        self.data.userHasData = false;
                    }
                }
            }
            wx.hideLoading();
        });
    },

});
