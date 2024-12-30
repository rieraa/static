function callNative(action) {
    window.webkit.messageHandlers.nativeMethod.postMessage({
        'action': action,
        'message': 'Message from JavaScript!',
        'timestamp': new Date().getTime()
    });
}

function nativeCallJs(message) {
    try {
        // 尝试解析JSON
        const data = typeof message === 'string' ? JSON.parse(message) : message;
        
        if (data.type === 'image') {
            // 显示拍照结果
            document.getElementById('result').innerHTML = `
                <div>拍照结果：</div>
                <img src="${data.data}" style="max-width: 100%; margin-top: 10px; border-radius: 8px;">
                <div class="timestamp">时间：${new Date().toLocaleString()}</div>
            `;
        } else if (data.name) {
            document.getElementById('result').innerHTML = `
                <div>设备信息：</div>
                <div class="device-info">
                    <div>设备名称：</div><div>${data.name}</div>
                    <div>设备型号：</div><div>${data.model}</div>
                    <div>系统名称：</div><div>${data.systemName}</div>
                    <div>系统版本：</div><div>${data.systemVersion}</div>
                </div>
                <div class="timestamp">时间：${new Date().toLocaleString()}</div>
            `;
        }
    } catch (e) {
        // 普通消息
        document.getElementById('result').innerHTML = `
            <div>收到原生消息：${message}</div>
            <div class="timestamp">时间：${new Date().toLocaleString()}</div>
        `;
    }
}
