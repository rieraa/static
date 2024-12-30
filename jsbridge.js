/**
 * JSBridge - iOS交互方法封装
 */

const JSBridgeAPI = {
    // 设备相关
    device: {
        // 获取设备信息
        getInfo: function() {
            return JSBridge.invoke('GetDeviceInfo');
        },
        // 获取网络状态
        getNetworkType: function() {
            return JSBridge.invoke('GetNetworkType');
        }
    },

    // 媒体相关
    media: {
        // 打开相机
        openCamera: function() {
            return JSBridge.invoke('OpenCamera');
        },
        // 选择图片
        chooseImage: function(options = { count: 1 }) {
            return JSBridge.invoke('ChooseImage', options);
        }
    },

    // 扫码相关
    scanner: {
        // 扫描二维码
        scanQRCode: function() {
            return JSBridge.invoke('ScanQRCode');
        }
    },

    // 位置相关
    location: {
        // 获取当前位置
        getCurrentPosition: function() {
            return JSBridge.invoke('GetLocation');
        }
    },

    // 分享相关
    share: {
        // 分享文本
        text: function(text) {
            return JSBridge.invoke('ShareText', { text });
        },
        // 分享链接
        link: function(options) {
            return JSBridge.invoke('ShareLink', options);
        }
    },

    // 存储相关
    storage: {
        // 设置数据
        set: function(key, value) {
            return JSBridge.invoke('SetStorage', { key, data: value });
        },
        // 获取数据
        get: function(key) {
            return JSBridge.invoke('GetStorage', { key });
        },
        // 删除数据
        remove: function(key) {
            return JSBridge.invoke('RemoveStorage', { key });
        }
    },

    // UI相关
    ui: {
        // 显示提示
        showToast: function(options) {
            return JSBridge.invoke('ShowToast', options);
        },
        // 显示加载
        showLoading: function(options) {
            return JSBridge.invoke('ShowLoading', options);
        },
        // 隐藏加载
        hideLoading: function() {
            return JSBridge.invoke('HideLoading');
        }
    }
};