const apiKey = `6c9ebc66510b40e3b8f76a56e9af9fb2`;
let newsList = [];
const menu = document.querySelectorAll("#menu-list button");

menu.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  let url = ` https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`;
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log(newsList);
};
// 카테고리 조회
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("ddd", data);
  newsList = data.articles;
  render();
};
// 키워드로 검색하기
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

// 엔터키로 검색
document.getElementById("search-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getNewsByKeyword();
  }
});

// 화면 렌더링
const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
      <div class="col-lg-4">
        <img
          class="news-img-size"
            src="${news.urlToImage}" 
            onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';" />
      </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
                   <p>${
                     news.description == null || news.description == ""
                       ? "내용없음"
                       : news.description.length > 200
                       ? news.description.substring(0, 200) + "..."
                       : news.description
                   }</p>

         <div>${news.source.name || "no source"}  ${moment(
        news.publishedAt
      ).fromNow()}</div>
          </div>  
      </div>`
    )
    .join("");

  document.getElementById(`news_board`).innerHTML = newsHTML;
};

getLatestNews();
// 뉴스를 보여주기

//사이드메뉴
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

//검색창 보이고 숨기기
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
