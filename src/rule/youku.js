(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/v\.youku\.com\/v_show\/id_([\w=]+).html/ig],
				
				download : false,
				requestHeader : {"User-Agent":"ipad"},  
				callback : function(url, response, successCallback){
					var vid;
					vid = videoLib.strCut(url, '/id_', '.html');
					//get ipad http response
					http('http://v.youku.com/v_show/id_'+vid+'.html?x', {"User-Agent":"ipad"}, function(response, success){
						if(success){
							//get timestamp
							var m3u8Url = 'http://v.youku.com/player/getM3U8/vid/' + videoLib.strCut(response.responseText, 'videoId = \'', '\'') + '/type/mp4/ts/' + videoLib.timestamp() + '/v.m3u8';
							/*
							successCallback(m3u8Url);
							return;
							*/
							//console.log(m3u8Url);
							http(m3u8Url, {"User-Agent":"ipad"}, function(response, success){
								if(success){
									var data = response.responseText;
									
									var list = videoLib.splitM3U8List(data, function(url){
													if(url.search(/-1/)==-1 && url.search(/http\:\/\//ig)>-1){
														return url.split('.ts')[0];
													}else{
														return false;
													}
												});
									successCallback(list);
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