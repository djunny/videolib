
(function(window,document,undefined){var strCut=function(html,start,over){var tmpStr=html.split(start);tmpStr=tmpStr[1]||'';tmpStr=tmpStr.split(over)[0];return tmpStr;}
var match=function(reg,html){var res=reg.exec(html);return res.length>1?res[1]:'';}
var videoLibClass=function(){var self=this,ruleList=[];self.strCut=strCut;self.match=match;self.clientIp='';function matchRules(url,matches){var index=matches.length;while(index--){if(url.search(matches[index])>-1){return true;}}}
self.addRule=function(options){if(options['matches']){ruleList.push(options);}else{for(var i in options){ruleList.push(options);}}}
self.matchUrls=function(url){var index=ruleList.length,rule;while(index--){rule=ruleList[index];if(matchRules(url,rule['matches'])){return true;}}}
self.parseDownloadUrl=function(url,callback){var index=ruleList.length,rule;while(index--){rule=ruleList[index];if(matchRules(url,rule['matches'])){if(typeof rule['download']==undefined){rule['download']=true;}
if(rule['download']){window.http(url,rule['requestHeader'],function(response,succ){if(succ){rule['callback'](url,response.responseText,function(trueUrl){if(!trueUrl){self.tryFlvcd(url,callback);}else{callback(url,trueUrl);}});}});}else{rule['callback'](url,null,function(trueUrl){if(!trueUrl){self.tryFlvcd(url,callback);}else{callback(url,trueUrl);}});}
return true;break;}}
self.tryFlvcd(url,callback);return false;}
self.tryFlvcd=function(url,callback){var parseUrl='http://www.flvcd.com/parse.php?format=&sbt=提交&kw='+encodeURIComponent(url);http(parseUrl,{},function(response,success){var html=response.responseText;var urlHtml=videoLib.strCut(html,'下载地址：','</td>'),arr,aHrefRe=/<a href=\"([^"]*?)\"/ig,urlList=[];if(urlHtml.length>0){while((arr=aHrefRe.exec(urlHtml))!=null){var tmpUrl=arr[1].replace(/\&amp;/ig,'&');tmpUrl=tmpUrl.replace(/d{1,3}\.d{1,3}\.d{1,3}\.d{1,3}/ig,self.getIp());urlList.push(tmpUrl);}}
callback(url,urlList);});}
self.getIp=function(){if(self.clientIp==''){http('http://iframe.ip138.com/ic.asp',{},function(response,success){if(success){self.clientIp=self.strCut(response.responseText,'您的IP是：[',']');}});}
return self.clientIp;}
return self;}
window['videoLib']=new videoLibClass();})(window,document);;(function(window,document,undefined){window['http']=function(url,options,callback){this.options={'User-Agent':'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3','Referer':url};if(options){for(var s in this.options){if(options[s]){this.options[s]=options[s];}}
if(options['User-Agent']=='ipad'){this.options['User-Agent']='Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3';}else if(options['User-Agent']=='chrome'){this.options['User-Agent']='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11';}}
var req=new XMLHttpRequest();req.open("GET",url,true);req.onreadystatechange=function(){if(req.readyState===4){try{if(callback){callback(req,req.status===200);}}finally{delete req;}}};req.setRequestHeader("User-Agent",this.options['User-Agent']);req.setRequestHeader("Referer",this.options['Referer']);req.setRequestHeader("Content-type","application/x-www-form-urlencoded");req.send(null);return this;}})(window,document);
(function(videoLib){var opt={matches:[/^http\:\/\/(?:\w+\.)?video\.sina\.com\.cn\/.*?/ig],download:true,requestHeader:{"User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"},callback:function(url,response,successCallback){if(response){var html=response;var vid=videoLib.strCut(html,'vid :\'','\',');var swf=videoLib.strCut(html,'swfOutsideUrl:\'','\'');console.log(vid+':'+swf);var title=videoLib.strCut(html,'<title>','_新浪');http('http://video.sina.com.cn/interface/video_ids/video_ids.php?v='+vid+'&callback=html5',{},function(data,status){var ipadId=videoLib.strCut(data.responseText,'ipad_vid":','}');if(ipadId!=''){successCallback(['http://v.iask.com/v_play_ipad.php?vid='+ipadId]);}else{successCallback();}});}else{successCallback();}}}
videoLib.addRule(opt);})(window['videoLib']);
(function(videoLib){var opt={matches:[/^http\:\/(m\.)?\/tv\.sohu\.com\/\d+\/n\d+\.shtml$/ig],download:false,requestHeader:{"User-Agent":"ipad"},callback:function(url,response,successCallback){var mobileUrl=url.search(/\/\/\m\./ig)>-1?url:url.replace('tv.sohu.com','m.tv.sohu.com');http(mobileUrl,{"User-Agent":"ipad"},function(response,success){if(success){var vid=videoLib.strCut(response.responseText,'vid = "','";'),playUrl='http://app.tv.sohu.com/360_app/play.jsp?cid=1&vid='+vid;http(playUrl,{"User-Agent":"ipad"},function(response,success){if(success){var data=response.responseText;var urlList=[];urlList.push(videoLib.strCut(data,'onclick="getUrl(\'','\',\''));successCallback(urlList);}else{successCallback();}});}else{successCallback();}});}}
videoLib.addRule(opt);})(window['videoLib']);
(function(videoLib){var opt={matches:[/^http\:\/\/www\.tudou\.com\/programs\/view\/([\w=]+)\/?/ig],download:false,requestHeader:{},callback:function(url,response,successCallback){var vid=videoLib.strCut(url,'view/','/');http('http://www.tudou.com/programs/view/'+vid+'/',{},function(url,response,successCallback){var html=data.responseText;var timestamp=Math.round(Date.parse(new Date())/1000);var m3u8Url='http://v.youku.com/player/getM3U8/vid/'+videoLib.match(html,/iid: (\d+)/ig)+'/type/mp4/ts/'+timestamp+'/v.m3u8';var title=videoLib.match(html,/<title>(.*?)—在线播放—/ig);http(m3u8Url,{},function(response,success){if(success){var urls=response.responseText.split(/\n/ig),urlList=[],urlExists=[];for(var i=0,l=urls.length;i<l;i++){if(urls[i].search(/http\:\/\//ig)>-1){console.log(urls[i]);}}}});});}}
videoLib.addRule(opt);})(window['videoLib']);
(function(videoLib){var opt={matches:[/^http\:\/\/v\.youku\.com\/v_show\/id_([\w=]+).html$/ig],download:false,requestHeader:{"User-Agent":"ipad"},callback:function(url,response,successCallback){var vid;vid=videoLib.strCut(url,'/id_','.html');http('http://v.youku.com/v_show/id_'+vid+'.html?x',{"User-Agent":"ipad"},function(response,success){if(success){var timestamp=parseInt((new Date).getTime()/1E3);var m3u8Url='http://v.youku.com/player/getM3U8/vid/'+videoLib.strCut(response.responseText,'videoId = \'','\'')+'/type/mp4/ts/'+timestamp+'/v.m3u8';http(m3u8Url,{"User-Agent":"ipad"},function(response,success){if(success){var data=response.responseText;var urls=data.split(/\n/ig),sUrl,urlList=[],urlExists=[];for(var i=0,l=urls.length;i<l;i++){if(urls[i].search('/-1/')==-1&&urls[i].search(/http\:\/\//ig)>-1){var url=urls[i].split('.ts')[0];if(!urlExists[url]){urlList.push(url);urlExists[url]=1;}}}
successCallback(urlList);}else{successCallback();}});}else{successCallback();}});}}
videoLib.addRule(opt);})(window['videoLib']);