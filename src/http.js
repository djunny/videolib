(function(window, document, undefined){
	window.http = function (url, options, callback){
		//default options
		this.options = {
			'User-Agent' : 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
			'Referer' : url
		};
		//set options
		if(options){
			for(var s in this.options){
				if(options[s]){
					this.options[s] = options[s];
				}
			}
			//overload user agent
			if(options['User-Agent'] == 'ipad'){
				this.options['User-Agent'] = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3';
			}else if(options['User-Agent'] == 'chrome'){
				this.options['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11';
			}
		}
		//new xmlhttprequest 
		var req = new XMLHttpRequest();
		//must open before
		req.open("GET", url, true);
		//state change event
		req.onreadystatechange = function () {
			if (req.readyState === 4) {
				try{
					if(callback){
						callback(req, req.status === 200);
					}
				}finally{
					delete req;
				}
			}
		};
		//set request header
		req.setRequestHeader("User-Agent", this.options['User-Agent']);
		req.setRequestHeader("Referer", this.options['Referer']);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		//send now
		req.send( null );
		return this;
	}
})(window, document);