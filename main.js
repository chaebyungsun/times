const apiKey = `6c9ebc66510b40e3b8f76a56e9af9fb2`;
let news = [];

const getLatestNews = async () => {
  let url = `https://times-sun.netlify.app/top-headlines`;
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log(data);
};
getLatestNews();
