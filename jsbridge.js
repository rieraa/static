/**
 * JSBridge - iOS交互桥接实现
 */

(function() {
    console.log('JSBridge 开始初始化...');
    
    const JSBridge = {
        // 回调函数存储
        callbacks: {},
        callbackIndex: 0,

        // 初始化
        init: function() {
            console.log('JSBridge init...');
            // 注册全局回调函数
            window.nativeCallJs = (response) => {
                console.log('收到原生回调:', response);
                this.handleNativeResponse(response);
            };
        },

        // 调用原生方法
        invoke: function(action, params = {}) {
            return new Promise((resolve, reject) => {
                const callbackId = this.generateCallbackId();
                
                // 保存回调函数
                this.callbacks[callbackId] = {
                    success: resolve,
                    fail: reject
                };

                const message = {
                    action: action,
                    params: params,
                    callbackId: callbackId
                };

                console.log('调用原生方法:', message);

                // 调用iOS原生方法
                window.webkit.messageHandlers.nativeMethod.postMessage(message);
            });
        },

        // 处理原生回调
        handleNativeResponse: function(response) {
            try {
                const data = typeof response === 'string' ? JSON.parse(response) : response;
                const callback = this.callbacks[data.callbackId];
                
                if (callback) {
                    if (data.error) {
                        callback.fail(data.error);
                    } else {
                        callback.success(data.result);
                    }
                    // 清理回调
                    delete this.callbacks[data.callbackId];
                }
            } catch (e) {
                console.error('处理原生响应失败:', e);
            }
        },

        // 生成回调ID
        generateCallbackId: function() {
            return `cb_${this.callbackIndex++}_${Date.now()}`;
        }
    };

    // 初始化
    JSBridge.init();
    
    // 暴露到全局
    window.JSBridge = JSBridge;
    console.log('JSBridge 初始化完成');
})();