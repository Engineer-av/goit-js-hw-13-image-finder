import "./css/common.css";
import refs from "./refs/index.js";
import renderImages from "./js/render/index.js";
import ImagesApiService from "./js/api/apiService.js";

const { listCards, searchForm, btnMore, modal, modalImg } = refs;

const apiData = new ImagesApiService();

searchForm.addEventListener("submit", e => {
  e.preventDefault();

  listCards.innerHTML = "";
  btnMore.classList.add("is-hidden");
  apiData.query = e.target.query.value;
  apiData.resetPage();
  e.currentTarget.reset();

  try {
    apiData.fetchImages().then(data => {
      renderImages(data);
      if (data.length > 11) {
        btnMore.classList.remove("is-hidden");
      }

      listCards.addEventListener("click", e => {
        const linkLargeImage = e.target.closest("li.photo-card").dataset
          .largeimage;

        modal.style.display = "block";
        modalImg.src = linkLargeImage;
      });
    });
  } catch (error) {
    alert(error.message);
  }
});

btnMore.addEventListener("click", () => {
  const viewportHeightScroll = listCards.offsetHeight;
  apiData
    .fetchImages()
    .then(renderImages)
    .then(() => {
      window.scrollTo(0, viewportHeightScroll);
    });
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});
