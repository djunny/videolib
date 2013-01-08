(function(videoLib){
	var opt = {
				matches  : [/^http:\/\/v\.qq\.com\/cover\/w\/\w+\/\w+\.html/ig],
				download : false,
				requestHeader : {"User-Agent":"ipad"},  
				callback : function(url, response, successCallback){
					var vid;
					vid = url.replace(/^http.*\/(\w+)\.html.*?$/ig, '$1');
					//get ipad http response
					http('http://vv.video.qq.com/geturl?otype=json&vid='+vid+'&charge=0&callback=cb_9b6f8c9f2096c'+Math.round(Math.random()*999), {"User-Agent":"ipad"}, function(response, success){
						if(success){
							var data = response.responseText;
							var trueUrl = videoLib.strCut(data, ',"url":"', '"');
							successCallback([trueUrl]);
						}else{
							successCallback();
						}
					});
				}
			}
	
	videoLib.addRule(opt);
})(window['videoLib']);