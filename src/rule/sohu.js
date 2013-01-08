(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/(m\.)?tv\.sohu\.com\/\d+\/n\d+\.shtml/ig],
				download : false,
				requestHeader : {"User-Agent":"ipad"},  
				callback : function(url, response, successCallback){
					var mobileUrl = url.search(/\/\/\m\./ig) > -1 ? url : url.replace('tv.sohu.com', 'm.tv.sohu.com');
					
					function getIpadM3U8(vid){
						return 'http://hot.vrs.sohu.com/ipad'+vid+'_'+(vid+Math.round(vid*Math.random()))+'_'+(90000+Math.round(9999*Math.random()))+'.m3u8'
					}
					
					//get ipad http response
					http(mobileUrl, {"User-Agent":"ipad"}, function(response, success){
						if(success){
							var vid = videoLib.strCut(response.responseText, 'vid = "', '";'),
								playUrl = 'http://app.tv.sohu.com/360_app/play.jsp?cid=1&vid='+vid;
							//console.log(m3u8Url);
							http(playUrl, {"User-Agent":"ipad"}, function(response, success){
								if(success){
									var data = response.responseText;
									//check fail
									if(data.search('<body>')==-1){
										http(getIpadM3U8(vid), {}, function(response, success){
											if(success){
												var list = videoLib.splitM3U8List(response.responseText, function(url){
													if(url){
														url = url.replace(/\&start=\d+\&end=\d+/ig, '');
													}
													return url;
												});
												successCallback(list);
											}else{
												successCallback();
											}
										});
									} else {
										var urlList = [];
										urlList.push(videoLib.strCut(data, 'onclick="getUrl(\'', '\',\''));
										successCallback(urlList);
									}
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