(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/www\.tudou\.com\/programs\/view\/([\w=]+)\/?/ig,/^http\:\/\/www\.tudou\.com\/albumplay\/([\w-=]+\/)?\w+\.html/ig],
				download : false,
				requestHeader : {},  
				callback : function(url, response, successCallback){
					var vid = videoLib.strCut(url, 'view/', '/');
					http('http://www.tudou.com/programs/view/'+vid+'/', {}, function(url, response, successCallback){
						var html = response.responseText;
						var timestamp = Math.round(Date.parse(new Date())/1000);
						var m3u8Url = 'http://v.youku.com/player/getM3U8/vid/'+videoLib.match(html, /iid: (\d+)/ig)+'/type/mp4/ts/'+timestamp+'/v.m3u8';
						var title = videoLib.match(html, /<title>(.*?)—在线播放—/ig);
						http(m3u8Url, {}, function(response, success){
											if(success){
												var list = videoLib.splitM3U8List(data, function(url){
													return url;
												});
												successCallback(list);
											}
										});
										
					});
				}
			}
	videoLib.addRule(opt);
})(window['videoLib']);