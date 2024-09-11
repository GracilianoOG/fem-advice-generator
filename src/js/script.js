const cardId = document.querySelector(".js-card-id");
const cardAdvice = document.querySelector(".js-card-advice");
const cardBtn = document.querySelector(".js-card-button");
const url = "https://api.adviceslip.com/advice";

const toggleActiveState = (element) => {
  element.classList.toggle("disabled");
  element.disabled = !element.disabled;
}

const getAdvice = (url) => {
  toggleActiveState(cardBtn);
  fetch(url, { cache: "no-cache" })
    .then(response => response.json())
    .then(data => {
      cardId.textContent = data.slip.id;
      cardAdvice.textContent = data.slip.advice;
    })
    .catch(error => console.error("Fetch error: " + error))
    .finally(() => {
      toggleActiveState(cardBtn);
    });
}

cardBtn.addEventListener("click", () => getAdvice(url));