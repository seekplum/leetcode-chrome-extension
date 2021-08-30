import './style.scss';

// 注册 window 变量到 dom 中
// const tempScript = document.createElement('script');
// tempScript.setAttribute('type', 'text/javascript');
// // 获取变量有延时，通过 setTimeout 处理
// tempScript.innerHTML =
//     "setTimeout(function() {document.body.setAttribute('data-vds', window.vds && JSON.stringify(window.vds));}, 1000)";
// document.head?.appendChild(tempScript);
// document.head?.removeChild(tempScript);

// chrome.runtime.onMessage.addListener((request, _sender, sendResp) => {
//     if (request.from === 'popup' && request.action === 'vds') {
//         sendResp(document.body.getAttribute('data-vds'));
//     }
// });
