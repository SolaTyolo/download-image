/**
 * 右击注册事件
 */
chrome.contextMenus.create({
  title: "下载图片",
  contexts: ["all"],
  documentUrlPatterns: ["http://*/*", "https://*/*"],
  onclick: download
});

function download(data) {
  console.log(data);
  if (data && data.mediaType == "image" && data.srcUrl) {
    var image = {
      path: data.srcUrl,
      width: 0,
      height: 0
    };
    var url = image.path;
    var _filename = new Date().getTime().toString() + getType(url);
    chrome.downloads.download({
      url: url,
      filename: _filename
    });
  } else {
    console.error("this is not a picture");
  }
}

function getType(file) {
  var filename = file;
  let fileType = '';
  [ '.jpg' , '.png' , '.jpeg' ].forEach(type => {
    if( filename.lastIndexOf( type ) > -1 ){
      fileType =  type;
    }
  });
  return fileType;
}
