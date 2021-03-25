import refs from "../../refs/index.js";
import cardTmpl from "../../templates/imageTmpl.hbs";
const { listCards } = refs;

export default function renderImages(data) {
  const markup = cardTmpl(data);
  listCards.insertAdjacentHTML("beforeend", markup);
}
