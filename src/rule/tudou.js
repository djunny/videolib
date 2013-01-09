(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/www\.tudou\.com\/programs\/view\/([\w=]+)\/?/ig,/^http\:\/\/www\.tudou\.com\/albumplay\/([\w-=]+\/)?\w+\.html/ig],
				download : false,
				requestHeader : {},  
				callback : function(url, response, successCallback){
					var vid = videoLib.strCut(url, 'view/', '/');
					http('http://www.tudou.com/programs/view/'+vid+'/', {}, function(response, success){
						if(success){
							var html = response.responseText;
							var m3u8Url = 'http://v.youku.com/player/getM3U8/vid/'+videoLib.match(/iid: (\d+)/ig, html)+'/type/mp4/ts/'+videoLib.timestamp()+'/v.m3u8';
							var title = videoLib.match(/<title>(.*?)—在线播放—/ig, html);
							http(m3u8Url, {}, function(response, success){
												if(success){
													var list = videoLib.splitM3U8List(response.responseText, function(url){
														return url;
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