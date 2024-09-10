const cardId = document.querySelector(".js-card-id");
const cardAdvice = document.querySelector(".js-card-advice");
const cardBtn = document.querySelector(".js-card-button");
const url = "https://api.adviceslip.com/advice";

const getAdvice = (url) => {
  fetch(url, { cache: "no-cache" })
    .then(response => response.json())
    .then(data => {
      cardId.textContent = data.slip.id;
      cardAdvice.textContent = data.slip.advice;
    })
    .catch(error => console.error("Fetch error: " + error));
}

cardBtn.addEventListener("click", () => getAdvice(url));