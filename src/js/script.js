const cardId = document.querySelector(".js-card-id");
const cardAdvice = document.querySelector(".js-card-advice");
const cardBtn = document.querySelector(".js-card-button");
const url = "https://api.adviceslip.com/advice";

const toggleActiveState = (element) => {
  element.classList.toggle("disabled");
  element.disabled = !element.disabled;
}

const fetchAdvice = async () => {
  try {
    const response = await fetch(url, { cache: "no-cache" });
    if(!response.ok) {
      const statusCode = response.status;
      if(statusCode === 404) {
        throw Error("Advice not found [404].");
      } else if(statusCode === 500) {
        throw Error("Internal Server Error [500].");
      } else {
        throw Error(`Network response was not ok [${statusCode}].`);
      }
    }
    const data = await response.json();
    cardId.textContent = data.slip.id;
    cardAdvice.textContent = data.slip.advice;
  } catch (error) {
    cardAdvice.innerHTML = `<span class="error">${error.message}</span>`;
    console.error("Fetch error: " + error.message);
  }
}

const handleClick = () => {
  toggleActiveState(cardBtn);
  fetchAdvice()
    .finally(() => {
      toggleActiveState(cardBtn);
    });
}

handleClick();
cardBtn.addEventListener("click", handleClick);

// == Old fetch function that uses .then() ==
// const fetchAdvice = () => {
//   return fetch(url, { cache: "no-cache" })
//   .then(response => {
//     if(!response.ok) {
//       if(response.status === 404) {
//         throw Error("Advice not found [404].");
//       } else {
//         throw Error(`Response was not ok [${response.status}].`);
//       }
//     }
//     return response.json();
//   })
//   .then(data => {
//     cardId.textContent = data.slip.id;
//     cardAdvice.textContent = data.slip.advice;
//   })
//   .catch(error => {
//     cardAdvice.innerHTML = `<span class="error">${error.message}</span>`;
//     console.error("Fetch error: " + error.message);
//   })
// }