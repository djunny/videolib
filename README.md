lastest inlcude url:

http://img.wdjimg.com/webstore/resource/videolib/release-3.0.js

or

https://raw.github.com/djunny/videolib/master/release-3.0.js


Update
========
	2013.1.29
	1. example add show url list.

	2013.1.19
	1. add base64 lib
	2. fix letv rule


	2013.1.9
	1. update qq video rule

	2013.1.8
	
	1. add m3u8 parser function.
	2. add v.qq.com rule
	3. fix tudou rule problem.
	
	2013.1.5

	1. [tudou]auto replace client ip in download url.

Useage
========

	1. open manifest.json and add "permissions" in your wandoujia plugin's manifest;
	2. include this lastest script library.
	3. call *videoLib.parseDownloadUrl(url, function(fromUrl, downUrl){}); *


Example
========

	[example 1](https://github.com/djunny/videolib/blob/master/examples/1/index.htm)



old version
========
https://raw.github.com/djunny/videolib/master/release-1.0.js
