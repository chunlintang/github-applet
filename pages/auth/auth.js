import {
    Github
} from '../../service/utils'

const app = getApp();

Page({
    data: {
        token: '',
        user: ''
    },
    onLoad: function () {
    },
    inputToken: function (e) {
        this.setData({token: e.detail.value});
    },
    inputUser: function (e) {
        this.setData({user: e.detail.value});
    },
    search: function () {
        if (!this.data.token) {
            wx.showToast({
                title: 'Token can\'t be null!',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if (!this.data.user) {
            wx.showToast({
                title: 'User name can\'t be null!',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        app.globalData.token = this.data.token;
        app.globalData.user = this.data.user;
        wx.switchTab({
            url: '/pages/repositories/repositories'
        });
    }
});
