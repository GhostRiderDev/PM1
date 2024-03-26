class Activity {
  static #id = 0;
  #title = null;
  #description = null;
  #imageUrl = null;
  #cardHtml = null;

  constructor({ title, description, imageUrl, cardHtml }) {
    this.#title = title;
    this.#description = description;
    this.#imageUrl = imageUrl;
    this.#cardHtml = cardHtml;
    this.setId();
  }
  static getId() {
    return this.#id;
  }
  getTitle() {
    return this.#title;
  }
  getDescription() {
    return this.#description;
  }
  getImageUrl() {
    return this.#imageUrl;
  }
  getCardHtml() {
    return this.#cardHtml;
  }
  setId() {
    Activity.#id++;
  }
}

class Repository {
  #activities = [];
  constructor(activities = []) {
    this.#activities = activities;
  }

  getAllActivities = () => {
    return this.#activities;
  };

  createActivity = (activityToAdd) => {
    this.#activities = [...this.#activities, activityToAdd];
  };
  // I don't use this method

  // deleteActivity = (id) => {
  //   this.#activities = this.#activities.filter(
  //     (activity) => activity.getId() !== id
  //   );
  // };
  deleteCardHtml = (addressInMememory) => {
    this.#activities = this.#activities.filter(
      (activity) => activity.getCardHtml() !== addressInMememory
    );
  };
}

const repo = new Repository();

const containerCards = document.getElementById("containerCards");
const btnAddActivity = document.getElementById("btnAddActivity");
const txtArDescription = document.getElementById("txtArDescription");
const inputTitle = document.getElementById("inputTitle");
const inputImgUrl = document.getElementById("inputImgUrl");

btnAddActivity.addEventListener("click", function (event) {
  event.preventDefault();
  if (validateEntries(inputImgUrl, inputTitle, txtArDescription)) {
    const cardActivity = document.createElement("article");
    cardActivity.className = "cardAct";
    const imgActivity = document.createElement("img");
    const titleActivity = document.createElement("h4");
    const descriptionActivity = document.createElement("p");

    imgActivity.src = inputImgUrl.value;
    titleActivity.innerText = inputTitle.value;
    descriptionActivity.innerText = txtArDescription.value;
    const activity = new Activity({
      title: inputTitle.value,
      description: txtArDescription.value,
      imageUrl: inputImgUrl.value,
      cardHtml: cardActivity,
    });
    repo.createActivity(activity);
    console.log(repo.getAllActivities());
    cardActivity.appendChild(imgActivity);
    cardActivity.appendChild(titleActivity);
    cardActivity.appendChild(descriptionActivity);
    containerCards.appendChild(cardActivity);
  } else {
    alert("incorrect data");
  }

  inputImgUrl.value = "";
  inputTitle.value = "";
  txtArDescription.value = "";
  document
    .getElementById("formAddActivity")
    .style.setProperty("display", "none");
  document
    .getElementById("containerCards")
    .style.setProperty("display", "grid");
  btnToAddAct.style.setProperty("display", "block");
});

containerCards.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".cardAct");

  if (clickedCard && containerCards.contains(clickedCard)) {
    repo.deleteCardHtml(clickedCard);
    clickedCard.remove();
  }
});

const allCardActivities = document.getElementsByClassName("cardAct");

function validateEntries(image, title, description) {
  return image.value === "" || title.value === "" || description.value === ""
    ? false
    : true;
}

const btnTheme = document.querySelector("#btnTheme");

btnTheme.addEventListener("click", () => {
  const root = document.documentElement;
  const dark =
    "radial-gradient(circle at top, #202030 0%, #202030 10%, #0a0a0a 90%)";
  const currentTheme =
    getComputedStyle(root).getPropertyValue("--background-color");

  const light =
    "radial-gradient(circle at top, #e1f4ff 0%, #e1f4ff 10%, #f6fdff 90%)";

  root.style.setProperty(
    "--background-color",
    currentTheme === light ? dark : light
  );
  root.style.setProperty("--color", currentTheme === light ? "white" : "black");
  root.style.setProperty(
    "--color-contrast",
    currentTheme === light ? "black" : "white"
  );
  root.style.setProperty(
    "--icon-theme",
    currentTheme === light
      ? `url("../public/images/lightTheme.png")`
      : `url("../public/images/darkTheme.png")`
  );

  // Forzar una reevaluación del estilo
  root.style.display = "none";
  root.style.display = "block";
});

const btnToAddAct = document.querySelector("#btnToAddAct");

btnToAddAct.addEventListener("click", () => {
  document
    .getElementById("formAddActivity")
    .style.setProperty("display", "block");
  document
    .getElementById("containerCards")
    .style.setProperty("display", "none");
  btnToAddAct.style.setProperty("display", "none");
});

const btnCancelToAddActivity = document.querySelector("#btnCancelToAddActivy");

btnCancelToAddActivity.addEventListener("click", () => {
  document
    .getElementById("formAddActivity")
    .style.setProperty("display", "none");
  document
    .getElementById("containerCards")
    .style.setProperty("display", "grid");
  btnToAddAct.style.setProperty("display", "block");
});

document.addEventListener("DOMContentLoaded", function () {
  var sections = document.querySelectorAll("section");
  var navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - sectionHeight / 2) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (navLink) {
      navLink.classList.remove("active");
      if (navLink.getAttribute("href").includes(currentSection)) {
        navLink.classList.add("active");
      }
    });
  });
});
