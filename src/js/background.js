/**
 * 标签页面更新
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    if (tab.url.match("^https?://(www.)?instagram.com*")) {
      chrome.tabs.executeScript(tab.id, { file: "script.js" });
    }
  }
});

/**
 * 接收数据
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if (request.msg.search("DL") != -1) {
    chrome.downloads.download({
      url: request.url,
      filename: request.filename
    });
  }
});

/**
 * 右击注册事件
 */
chrome.contextMenus.create({
  title: "下载图片/视频",
  contexts: ["all"],
  documentUrlPatterns: ["http://*/*", "https://*/*"],
  onclick: download
});

function download(data) {
  console.log(data);
  chrome.tabs.getSelected(null, function(tab) {
    if (data && data.mediaType == "image" && data.srcUrl) {
      var image = {
        path: data.srcUrl,
        width: 0,
        height: 0
      };
      var url = image.path;
      var _url_param =
        url.indexOf("?") >= 0 ? url.substring(0, url.indexOf("?")) : url;
      var _filename = _url_param.substring(
        _url_param.lastIndexOf("/") + 1,
        _url_param.length
      );
      //chrome.tabs.sendMessage(tab.id , {msg:'downImage' , data:image})
      chrome.downloads.download({
        url: url,
        filename: _filename
      });
    }
  });
}
