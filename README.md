# chrome extension for ptt search
# 載入方法
1. 下載code
```
git clone https://github.com/a15923647/ptt_regex_search.git
```
或[下載](https://github.com/a15923647/ptt_regex_search/archive/refs/heads/master.zip)下來解壓縮

2. 根據[google官方說明](https://support.google.com/chrome/a/answer/2714278?hl=zh-Hant)中第4到6步來載入
**記得選取包含manifest.json這個檔案的資料夾**
# 使用說明
打開擴充功能的圖標繪有三個輸入攔和一個按鈕
![img](https://github.com/a15923647/ptt_regex_search/blob/master/demo/popup_view.jpg?raw=true)
* 關鍵字: 必填，關鍵字間以空格隔開
* pattern: 填入regular expression pattern。如果沒填預設會搜尋包含所有關鍵字(無視大小寫)的標題
* page cnt: 每個關鍵字搜尋幾頁 (預設為10)
