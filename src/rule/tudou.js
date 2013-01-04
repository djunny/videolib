(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/www\.tudou\.com\/programs\/view\/([\w=]+)\/?/ig],
				download : false,
				requestHeader : {},  
				callback : function(url, response, successCallback){
					var vid = videoLib.strCut(url, 'view/', '/');
					http('http://www.tudou.com/programs/view/'+vid+'/', {}, function(url, response, successCallback){
						var html = data.responseText;
						var timestamp = Math.round(Date.parse(new Date())/1000);
						var m3u8Url = 'http://v.youku.com/player/getM3U8/vid/'+videoLib.match(html, /iid: (\d+)/ig)+'/type/mp4/ts/'+timestamp+'/v.m3u8';
						var title = videoLib.match(html, /<title>(.*?)—在线播放—/ig);
						http(m3u8Url, {}, function(response, success){
											if(success){
												var urls = response.responseText.split(/\n/ig), urlList = [], urlExists = [];
												for(var i =0, l = urls.length; i < l; i++){
													if(urls[i].search(/http\:\/\//ig)>-1){
														console.log(urls[i]);
													}
												}
											}
										});
										
					});
				}
			}
	videoLib.addRule(opt);
})(window['videoLib']);