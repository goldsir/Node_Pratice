rem 記得備份線上 json 檔到本地dist中

xcopy "dist\json" "src\json" /Y

rd dist /S /Q

md "dist\json"
md "dist\public"

xcopy "src\json" "dist\json" /Y /S
xcopy "src\public" "dist\public" /Y /S

nest build