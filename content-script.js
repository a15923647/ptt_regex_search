//this is content script
/*
 * popup.html send regex string to function start
*/
//chrome.runtime.onInstalled.addListener((tab) => {
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  sendResponse({content: 'receiption from content script'});
  search(message);
});
//});

async function search(msg) {
  //let pattern_str = event.target.value;
  //let kwArr = document.getElementById("kw").value.split(' ');
  let pattern_str = msg.pattern_str;
  let kwArr = msg.keywords.split(' ');
  let page_cnt = msg.page_cnt;
  let patterns = [];
  if (!pattern_str) {
    //pattern_str = '|'.join(kwArr);//search for "foo bar", find entries with "foo" or "bar"
    Array.prototype.push.apply(patterns, kwArr.map(kw => new RegExp(kw)));
  } else {
    patterns.push(new RegExp(pattern_str))
  }
  let search_url = window.location.href.replace(new RegExp('/[^/]*$'), '/search?q=');
  //fetch data
  
  //fetch(search_url+kw).then(res => res.text()).then(console.log);
  let ents = [];
  let occurred = new Set();
  let promises = kwArr.map(function(kw) {
    let kw_promises = [];
    for (let page = 1; page <= page_cnt; page++) {
      kw_promises.push(
        fetch(search_url+kw+"&page="+page).then(res => res.text()).then(function(res) {
          let parser = new DOMParser();
          const doc = parser.parseFromString(res, 'text/html');
          //Array.prototype.push.apply(ents, doc.getElementsByClassName('r-ent'));
          let single_search = [];
          Array.prototype.push.apply(single_search, doc.getElementsByClassName('r-ent'));
          single_search.forEach(function(ent) {
            let title = ent.querySelector('a').text;
            if (!pattern_str) title = title.toLowerCase();
            let match = true;
            patterns.forEach(pat => match = match && title.match(pat));
            if (match && !occurred.has(title)) {
              console.log(ents.push(ent));
              occurred.add(title);
              console.log("find match entry: ", ent);
            }
          });
        })
      );
    }
    return Promise.all(kw_promises);
  });
  console.log(promises);
  await Promise.all(promises);
  ents.sort(function(a, b) {
    let a_date = a.getElementsByClassName('date')[0].textContent;
    let b_date = b.getElementsByClassName('date')[0].textContent;
    //in decreasing order
    if (a_date < b_date) return 1;
    if (a_date > b_date) return -1;
    return 0;
  });
  console.log("ents: ", ents);
  //remove current elements
  let cur_eles = [];
  Array.prototype.push.apply(cur_eles, document.getElementsByClassName('r-ent'));
  cur_eles.map(e => e.remove());
  let container = document.getElementsByClassName('r-list-container')[0];
  ents.map(e => container.appendChild(e));
}
