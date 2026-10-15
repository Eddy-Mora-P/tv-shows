import { getShowData, getEpisodeList } from "./services/tvmaze.js";

const ID = "130"; 

const show = await getShowData(ID);         
const seasons = await getEpisodeList(ID);  

const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

$header.setHTMLUnsafe(`
  <img class="poster" src="${show.image}" alt="${show.name}">
  <h1>${show.name}</h1>
`);

const createEpisodeHTML = (episode) => {
  const ratingValue = episode.rating ? Math.floor(episode.rating) : 0;
  return `<div class="episode episode-${episode.number} rating-${ratingValue}">${episode.number}</div>`;
};

const createSeasonHTML = (data, number) => {
  const episodesHTML = data.map(episode => createEpisodeHTML(episode)).join("");
  
  return `
    <article class="season">
      <header class="season-header">T${number}</header>
      ${episodesHTML}
    </article>
  `;
};

const list = Object.values(seasons).map((season, index) => createSeasonHTML(season, index + 1));
$episodes.setHTMLUnsafe(list.join(""));