const header = document.querySelector('.header');

document.onscroll = function () {
  const scroll = document.documentElement.scrollTop;

  if (scroll) {
    header.dataset.scrolled = 'true';
  } else {
    header.dataset.scrolled = 'false';
  }
};

const musicsDiv = document.querySelector('#musics');

const apiUrl = 'http://localhost:5000';

const musicCard = (title, posterUrl) => `
<div class="music">
  <img src="${posterUrl}" class="music-poster" />
  <div>
    <span class="music-title">${title}</span>
    <!--<span>Song • <a>Ami Mishra</a><span>-->
  </div>
</div>
`;

async function main() {
  const musics = await fetch(`${apiUrl}/songs`).then((res) => res.json());
  console.log(musics);

  musicsDiv.innerHTML = musics
    .map((music) => musicCard(music.title, `${apiUrl}${music.posterUrl}`))
    .join('');
}

main();
