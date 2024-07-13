const apiKey = `6c9ebc66510b40e3b8f76a56e9af9fb2`;
let newsList = [];
const menu = document.querySelectorAll("#menu-list button");
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

menu.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("검색어와 일치하는 결과가 없습니다");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
  );
  await getNews();
};
// 카테고리 조회
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  await getNews();
};
// 키워드로 검색하기
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  await getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage} 
  </div>`;
  document.getElementById("news_board").innerHTML = errorHTML;
};

const paginationRender = () => {
  //totalpages
  const totalPages = Math.ceil(totalResults / pageSize);
  //pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage
  let lastPage = pageGroup * groupSize;

  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  //firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item" onclick="pageClick(1)">
                        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                      </li>
<li class="page-item" onclick="moveToPage(${
    page - 1
  })"> <a class="page-link" href='#js-bottom'>&lt;</a></li>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += ` <li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})">
        <a class="page-link"  >
         ${i}
        </a>
      </li>`;
  }
  paginationHTML += ` <li class="page-item" onclick="moveToPage(${
    page + 1
  })"><a class="page-link" href='#js-bottom'>&gt;</a></li>
  <li class="page-item" onclick="pageClick(${totalPages})">
                        <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                       </li>`;

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum; // 페이지값 유동적으로
  getNews();
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
