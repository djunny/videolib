@echo off
ECHO "START MERGE"
jsmin <"../src/base64.js"> ".\min\base64.js"
jsmin <"../src/http.js"> ".\min\http.js"

jsmin <"../src/videolib.js"> ".\min\videolib.js"

for %%i in (../src/rule/*.js) do jsmin <"../src/rule/%%i"> "rule\%%i.js"
jsmin <"../src/rule/sina.js"> "min\sina.js"
copy .\min\base64.js+.\min\videolib.js+.\min\http.js+.\rule\*.js ..\release-latest.js /B /Y

for /l %%a in (1, 1, 999) do (
	if not exist ..\release-%%a.0.js (
		copy ..\release-latest.js ..\release-%%a.0.js /B /Y
		goto break
	)
)

:break
ECHO "CLEAN CACHE"
del .\min\*.js
del .\rule\*.js