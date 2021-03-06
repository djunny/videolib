(function(window, document, undefined){
	//string utils
	var strCut = function(html, start, over){
		var tmpStr = html.split(start);
		tmpStr = tmpStr[1] || '';
		tmpStr = tmpStr.split(over)[0];
		return tmpStr;
	}
    var match = function (reg, html){
       var res = reg.exec(html);
       return (res && res.length>1) ? res[1] : '';
    }
	
	var videoLibClass = function(){
		var self = this, ruleList = [];
		self.strCut = strCut;
		self.match = match;
		self.clientIp = '';
		//match rule urls
		function matchRules(url, matches){
			var index = matches.length;
			while(index--){
				//is regexp match
				if(url.search(matches[index]) > -1){
					return true;
				}
			}
		}
		//add Rule
		self.addRule = function(options){
			/*
				//default options
				
				successCallback = function(downUrl){
					//downUrl is ture download url
				}
				
				options = {
					matches  : ['http://123asdf.com', /http\:\/\/youku\.com\//ig],
					infoPattern : {title:""}
					download : false,
					requestHeader : {"User-Agent":"", "Referer":""},  
					callback : function(url, response, successCallback){
						//only "donwload" set true have response
					}
				}
				
			*/
			if(options['matches']){
				ruleList.push(options);
			}else{
				for(var i in options){
					ruleList.push(options);
				}
			}
			
		}
		
		
		self.matchUrls = function(url){
			var index = ruleList.length, rule;
			while(index--){
				rule = ruleList[index];
				if(matchRules(url, rule['matches'])){
					return true;
				}
			}
		}
		
		//parse download true url
		/*
		return : can parse url
		callback = function(fromUrl, downUrls){
			//downUrls is array
		}
		*/
		
		self.parseDownloadUrl = function(url, callback){
			var index = ruleList.length, rule;
			if(!url){
				return;
			}
			url = url.replace(/#.+$/ig, '');
			while(index--){
				rule = ruleList[index];
				if(matchRules(url, rule['matches'])){
					//dont exception
					if(typeof rule['download'] == undefined){
						rule['download'] = true;
					}
					//get http body
					if(rule['download']){
						window.http(url, rule['requestHeader'], function(response, succ){
							if(succ){
								rule['callback'](url, response.responseText, function(trueUrl){
									if(!trueUrl || trueUrl.length == 0){
										self.tryFlvcd(url, callback);
									}else{
										callback(url, trueUrl);
									}
								});
							}
						});
					}else{
						//callback
						rule['callback'](url, null, function(trueUrl){
							if(!trueUrl || trueUrl.length == 0){
								self.tryFlvcd(url, callback);
							}else{
								callback(url, trueUrl);
							}
						});
					}
					return true;
					break;
				}
			}
			
			self.tryFlvcd(url, callback);
			
			return false;
		}
		
		
		//try flvcd source
		self.tryFlvcd = function(url, callback){
			var parseUrl = 'http://www.flvcd.com/parse.php?format=&sbt=提交&kw='+encodeURIComponent(url);
			http(parseUrl, {}, function(response, success){
				var html = response.responseText;
				var urlHtml  = videoLib.strCut(html, '下载地址：', '</td>'), arr, aHrefRe = /<a href=\"([^"]*?)\"/ig, urlList = [];
				
				if(urlHtml.length>0){
					while((arr = aHrefRe.exec(urlHtml)) !=null){
						var tmpUrl = arr[1].replace(/\&amp;/ig, '&');
						//replace ip
						tmpUrl = tmpUrl.replace(/d{1,3}\.d{1,3}\.d{1,3}\.d{1,3}/ig, self.getIp());
						urlList.push(tmpUrl);
					}
				}
				callback(url, urlList);
			});
		}
		
		//get ip from ip138 
		self.getIp = function(){
			if(self.clientIp == ''){
				http('http://iframe.ip138.com/ic.asp', {}, function(response, success){
					if(success){
						self.clientIp = self.strCut(response.responseText, '您的IP是：[', ']');
					}
				});
			}
			return self.clientIp;
		}
		
		//get timestamp
		self.timestamp = function(){
			return parseInt((new Date).getTime() / 1E3)
		}
		
		self.splitM3U8List = function(data, filterCallback){
			var urls = data.split(/\n/ig), sUrl, urlList=[], urlExists=[];
			for(var i = 0, l = urls.length, url; i < l; i++){
				if(urls[i] && urls[i].search(/https?\:\/\//ig)==-1)continue;
				if(filterCallback){
					urls[i] = filterCallback(urls[i]);
				}
				url = urls[i];
				if(url){
					if(!urlExists[url]){
						urlList.push(url);
						urlExists[url] = 1;
					}
				}
			}
			return urlList;
		}
		
		return self;
	}
	
	window['videoLib'] = new videoLibClass();
	
})(window, document);