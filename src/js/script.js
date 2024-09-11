const cardId = document.querySelector(".js-card-id");
const cardAdvice = document.querySelector(".js-card-advice");
const cardBtn = document.querySelector(".js-card-button");
const url = "https://api.adviceslip.com/advice";

const getAdvice = (url) => {
  cardBtn.disabled = true;
  cardBtn.classList.add("disabled");
  fetch(url, { cache: "no-cache" })
    .then(response => response.json())
    .then(data => {
      cardId.textContent = data.slip.id;
      cardAdvice.textContent = data.slip.advice;
    })
    .catch(error => console.error("Fetch error: " + error))
    .finally(() => {
      cardBtn.disabled = false;
      cardBtn.classList.remove("disabled");
    });
}

cardBtn.addEventListener("click", () => getAdvice(url));