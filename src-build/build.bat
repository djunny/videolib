@echo off
jsmin <"../src/http.js"> ".\min\http.js"
jsmin <"../src/videolib.js"> ".\min\videolib.js"

for %%i in (../src/rule/*.js) do jsmin <"../src/rule/%%i"> "rule\%%i.js"
jsmin <"../src/rule/sina.js"> "min\sina.js"
copy .\min\videolib.js+.\min\http.js+.\rule\*.js ..\videolib-release.js /B /Y
del .\min\*.js
del .\rule\*.js