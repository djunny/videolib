(function(videoLib){
	var opt = {
				matches  : [/^http\:\/\/(?:\w+\.)?video\.sina\.com\.cn\/.*?/ig],
				download : true,
				requestHeader : {"User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"},  
				callback : function(url, response, successCallback){
					if(response){
						var html = response;
						var vid = videoLib.strCut(html, 'vid :\'', '\',');
						var swf = videoLib.strCut(html, 'swfOutsideUrl:\'', '\'');
						console.log(vid+':'+swf);
						var title = videoLib.strCut(html, '<title>', '_新浪');
						http('http://video.sina.com.cn/interface/video_ids/video_ids.php?v='+vid+'&callback=html5', {}, function(data, status){
							var ipadId = videoLib.strCut(data.responseText, 'ipad_vid":', '}');
							if(ipadId != ''){
								successCallback(['http://v.iask.com/v_play_ipad.php?vid='+ipadId]);
							}else{
								successCallback();
							}
						});
					}else{
						successCallback();
					}
				}
			}
	videoLib.addRule(opt);
})(window['videoLib']);