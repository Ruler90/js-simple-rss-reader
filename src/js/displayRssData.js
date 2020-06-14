const loadingAnimation = `
<style>
  svg path {
    fill: #1f3db5;
}
</style>

<div class="loader loader--style1" title="0">
  <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="60px" height="60px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.5s"
      repeatCount="indefinite"/>
    </path>
  </svg>
</div>`;

// const rssURL = 'https://naekranie.pl/feed/all.xml';
const rssURL = 'https://cors-anywhere.herokuapp.com/https://naekranie.pl/feed/all.xml';
const displayRssData = async () => {
  const rssContainer = document.querySelector('.rss-feed-container');
  rssContainer.innerHTML = loadingAnimation;
  try {
    const rssData = await fetch(rssURL);
    const rssTextData = await rssData.text();
    const parsedRss = new window.DOMParser().parseFromString(rssTextData, 'text/xml');

    const rssItems = parsedRss.querySelectorAll('item');
    let htmlItems = '';
    rssItems.forEach(el => {
      const descriptionHtml = el.querySelector('description').textContent;
      const parsedDescriptionHtml = new window.DOMParser().parseFromString(descriptionHtml, 'text/xml');
      const thumbnailImg = parsedDescriptionHtml.querySelector('img').getAttribute('src');
      const finalThumbnailImg = thumbnailImg.replace(/\s/g, '%20');
      htmlItems += `
    <a href="${el.querySelector('link').innerHTML}" class="rss-feed-item" target="_blank">
      <article>
        <p class="rss-title">${el.querySelector('title').innerHTML}</p>
        <img class="rss-img" src=${finalThumbnailImg}>
      </article>
    </a>`;
    });

    rssContainer.innerHTML = htmlItems;
  } catch (err) {
    rssContainer.innerHTML = `
    <style>
      .rss-feed-container {
        text-align: center;
        color: red;
        font-weight: 700;
      }
    </style>
    
    <div>
      <p>Couldn't load RSS Feed - possibly fetch blocked by CORS policy.</p>
      <p>Open devtools and check the console.</p>
    </div>`;
  }
};

const rssBtn = document.querySelector('.rss-btn');
rssBtn.addEventListener('click', displayRssData);
