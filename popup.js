//send user input to content script
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
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("submit_btn").addEventListener('click', search);
});

