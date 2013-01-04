(function(videoLib){
	var opt = {
				matches  : [/^http\:\/(m\.)?\/tv\.sohu\.com\/\d+\/n\d+\.shtml$/ig],
				download : false,
				requestHeader : {"User-Agent":"ipad"},  
				callback : function(url, response, successCallback){
					var mobileUrl = url.search(/\/\/\m\./ig) > -1 ? url : url.replace('tv.sohu.com', 'm.tv.sohu.com'); 
					//get ipad http response
					http(mobileUrl, {"User-Agent":"ipad"}, function(response, success){
						if(success){
							var vid = videoLib.strCut(response.responseText, 'vid = "', '";'),
								playUrl = 'http://app.tv.sohu.com/360_app/play.jsp?cid=1&vid='+vid;
							
							//console.log(m3u8Url);
							http(playUrl, {"User-Agent":"ipad"}, function(response, success){
								if(success){
									var data = response.responseText;
									var urlList = [];
									urlList.push(videoLib.strCut(data, 'onclick="getUrl(\'', '\',\''));
									successCallback(urlList);
								}else{
									successCallback();
								}
							});
						}else{
							successCallback();
						}
					});
				}
			}
	
	videoLib.addRule(opt);
})(window['videoLib']);