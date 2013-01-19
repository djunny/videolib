(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/www\.letv\.com\/ptv\/vplay\/\d+.html/ig],
				download : true,
				requestHeader : {},  
				callback : function(url, response, successCallback){
					var vurl = videoLib.strCut(response, '},{v:["', '"],p:"')
					if(vurl){
						var minBit = 999999, url = '';
						vurl = vurl.split(/","/);
						for(var i in vurl){
							var base64Url = base64Decode(vurl[i]);
							var bit = parseInt(videoLib.strCut(base64Url, '?b=', '&tag='), 10);
							if(bit < minBit){
								minBit = bit;
								url = base64Url;
							}
						}
						
						if(url){
							url = url.replace(/=ios/ig, '=mp4');
							successCallback([url]);
						}else{
							successCallback();
						}
					}
					/*
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
					*/
				}
			}
	videoLib.addRule(opt);
})(window['videoLib']);