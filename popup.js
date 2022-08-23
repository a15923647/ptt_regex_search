//send user input to content script
//window.onload(() => document.getElementById("submiti_btn").addListener('click', search));
/*
chrome.runtime.onInstalled.addListener((tab) => {
  //Error in event handler: ReferenceError: document is not defined
  document.getElementById("submiti_btn").addListener('click', search);
});
*/
async function search() {
  console.log("call search in popup.js");
  let queryOptions = {active: true, currentWindow: true};
  let pattern_str = document.getElementById("pattern").value;
  let keywords = document.getElementById("kw").value;
  let page_cnt = document.getElementById("page_cnt").value;
  if (!page_cnt) page_cnt = "10";
  page_cnt = parseInt(page_cnt);
  let tabs = await chrome.tabs.query(queryOptions);
  chrome.tabs.sendMessage(tabs[0].id, {pattern_str: pattern_str, keywords: keywords, page_cnt: page_cnt}, console.log);
  /*
  chrome.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
    console.log(tabs[0]);
    console.log(pattern_str, keywords);
    chrome.tabs.sendMessage(tabs[0].id, {pattern_str: pattern_str, keywords: keywords}, console.log);
  });
  */
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("submit_btn").addEventListener('click', search);
});

