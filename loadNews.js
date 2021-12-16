let newsList = [];
let showNewsList = []
let searchQuery = "";
function fetchNews(keyword) {

  firebase
    .database()
    .ref(`news/${keyword}`)
    .once("value", function (snap) {
      const news = snap.val();
      newsList = newsList.concat(news);
      //updateUi(getUiContent());
      getUiContent();
    });
}

function getUiContent() {
  document.getElementById("news").innerHTML = ""
  newsList.filter((value,_index)=>{
    if(!searchQuery) {
      return true
    }

    //console.log(value)


return      value.title.toLowerCase().includes(searchQuery) ||
      value.description.toLowerCase().includes(searchQuery) ||
      value.content    .toLowerCase().includes(searchQuery)

  }).forEach((n) => {


    const html = `
<div>
  <h2>${n.title}</h2>
  <a href="${n.url}">Click to go to site.</a>
  <img src="${n.urlToImage}">
</div>
    `;

    document.getElementById("news").innerHTML += html;

  });
}
function search() {
     searchQuery = document.getElementById("searchInput").value.toLowerCase()
    getUiContent()
}
