(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/v\.youku\.com\/v_show\/id_([\w=]+).html$/ig],
				download : false,
				requestHeader : {"User-Agent":"ipad"},  
				callback : function(url, response, successCallback){
					var vid;
					vid = videoLib.strCut(url, '/id_', '.html');
					//get ipad http response
					http('http://v.youku.com/v_show/id_'+vid+'.html?x', {"User-Agent":"ipad"}, function(response, success){
						if(success){
							//get timestamp
							var timestamp = parseInt((new Date).getTime() / 1E3);
							var m3u8Url = 'http://v.youku.com/player/getM3U8/vid/' + videoLib.strCut(response.responseText, 'videoId = \'', '\'') + '/type/mp4/ts/' + timestamp + '/v.m3u8';
							/*
							successCallback(m3u8Url);
							return;
							*/
							//console.log(m3u8Url);
							http(m3u8Url, {"User-Agent":"ipad"}, function(response, success){
								if(success){
									var data = response.responseText;
									var urls = data.split(/\n/ig), sUrl, urlList=[], urlExists=[];
									for(var i = 0, l = urls.length; i < l; i++){
										if(urls[i].search('/-1/')==-1 && urls[i].search(/http\:\/\//ig)>-1){
											var url = urls[i].split('.ts')[0];
											if(!urlExists[url]){
												urlList.push(url);
												urlExists[url] = 1;
											}
										}
									}
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