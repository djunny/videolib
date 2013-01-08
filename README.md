

Update
========

	2013.1.8
	
	1. add m3u8 parser function.
	2. add v.qq.com rule
	3. fix tudou rule problem.

	2013.1.5

		1. [tudou]auto replace client ip in download url.

Useage
========

	1. open manifest.json and add "permissions" in your wandoujia plugin's manifest;
	2. include this script : http://img.wdjimg.com/webstore/resource/videolib/release-1.0.js
	3. call *videoLib.parseDownloadUrl(url, function(fromUrl, downUrl){}); *


Example
========

	[example 1](https://github.com/djunny/videolib/blob/master/examples/1/index.htm)
