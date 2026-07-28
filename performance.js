import { myUrl } from "/myUrl.js";
console.log(myUrl);
const userId = localStorage.getItem("workoutUserId");
// location.href = location.href;
console.log(userId);

const userAnchor = document.getElementsByClassName("users-anchor")[0];

const logoutLink = document.getElementsByClassName("logout-link")[0];

logoutLink.addEventListener("click", () => {
  localStorage.removeItem("workoutUserId");
});

// console.log("Came from:", window.history.state?.prevPath);
const performance = document.getElementsByClassName("performance")[0];
console.log(window.location.href);
performance.style.display = "flex";
performance.style.rowGap = "2rem";
const entryCount = document.getElementsByClassName("entry-count")[0];

let verifyWindow = document.createElement("div");
verifyWindow.className = "no-verify-window";
verifyWindow.style.padding = ".5rem";
verifyWindow.style.display = "flex";
verifyWindow.style.flexDirection = "column";
verifyWindow.style.rowGap = "1rem";
verifyWindow.style.alignItems = "center";
verifyWindow.style.backgroundColor = "lavender";
verifyWindow.style.position = "fixed";
verifyWindow.style.top = "40%";
let question = document.createElement("p");
question.innerHTML = "Are you sure you want to delete this entry?";

let verifyWindowButtonCont = document.createElement("article");
// verifyWindow.append(verifyWindowButtonCont);
let itemId = "";
// verifyWindowButtonCont.className = "verify-button-cont";
let noButton = document.createElement("button");
noButton.innerHTML = "No";
let yesButton = document.createElement("button");
yesButton.innerHTML = "Yes";
verifyWindowButtonCont.append(noButton, yesButton);
verifyWindow.append(question, verifyWindowButtonCont);

performance.appendChild(verifyWindow);

const table = document.createElement("table");
const tableBody = document.createElement("tbody");
const headerRow = document.createElement("tr");
const dHeader = document.createElement("th");
const rHeader = document.createElement("th");
const exHeader = document.createElement("th");
const markHeader = document.createElement("th");
const dateHeader = document.createElement("th");
// const delet = document.createElement("th");

dHeader.innerHTML = "duraton (min:sec)";
rHeader.innerHTML = "rounds completed";
exHeader.innerHTML = "exercises completed";
markHeader.innerHTML = "mark (%)";
dateHeader.innerHTML = "date";
table.appendChild(tableBody);
// tableBody.appendChild(headerRow);
headerRow.append(dHeader, rHeader, exHeader, markHeader, dateHeader);
const greeting = document.getElementsByClassName("greeting")[0];

noButton.addEventListener("click", () => {
  verifyWindow.className = "no-verify-window";
});

verifyWindowButtonCont.className = "verify-window-cont";

const deleteEntry = async (id) => {
  console.log(id);
  try {
    const response = await fetch(`${myUrl}/performance/${id}`, {
      method: "DELETE",
    });
    if (response) {
      tableBody.textContent = "";
      getData();
      verifyWindow.className = "no-verify-window";
    }
  } catch (error) {}
};

const getData = async () => {
  tableBody.appendChild(headerRow);
  const response = await fetch(`${myUrl}/performance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response2 = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response2.json();
  const user = users.find((user) => user._id === userId);
  console.log(user?.roles);
  const foundUserRoles = Object.keys(user?.roles);
  if (!foundUserRoles.includes("Admin")) {
    userAnchor.href = "";
  } else {
    userAnchor.href = "users.html";
  }
  greeting.innerHTML = `welcome, ${user.username}`;
  yesButton.addEventListener("click", () => deleteEntry(itemId));
  let perfData = await response.json();
  const filteredData = perfData.filter((data) => data.userId === userId);
  entryCount.innerHTML = `(${filteredData.length} entries)`;
  for (let i = 0; i < filteredData.length; i++) {
    const dets = document.createElement("tr");
    dets.style.backgroundColor = `${i % 2 === 0 ? "white" : "khaki"}`;
    tableBody.appendChild(dets);
    const perfy = filteredData[i];
    console.log(tableBody.children);
    const { workSettings } = user;
    const roundCount = document.createElement("td");
    roundCount.innerHTML = ` ${
      perfy.duration < 10
        ? `0:0${perfy.duration % 60}`
        : perfy.duration < 60
          ? `0:${perfy.duration % 60}`
          : perfy.duration % 60 >= 10
            ? `${Math.floor(perfy.duration / 60)}:${perfy.duration % 60}`
            : perfy.duration < 10
              ? 0`${perfy.duration % 60}`
              : `${Math.floor(perfy.duration / 60)}:0${perfy.duration % 60}`
    }`;
    const endurance = document.createElement("td");
    endurance.innerHTML = `${perfy.oneExercise / 5}`;
    const exCount = document.createElement("td");
    exCount.innerHTML = `${perfy.oneExercise}`;
    const marker = document.createElement("td");
    marker.innerHTML = `${parseFloat(perfy.mark).toFixed(2)}`;
    const date = document.createElement("td");
    const del = document.createElement("td");
    date.innerHTML = new Date(perfy.date).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const removeVerifier = () => {
      verifyWindow.className("veriy-window");
    };
    // const icon = document.createElement("i");
    // icon.classList.add("fa-solid", "fa-trash");

    // del.appendChild(icon);
    del.innerHTML = "delete";

    const getId = async (id) => {
      itemId = id;
      console.log(itemId);
      verifyWindow.className = "verify-window";
      verifyWindowButtonCont.className = "verify-button-cont";
    };

    del.addEventListener("click", () => getId(perfy._id));
    dets.append(roundCount, endurance, exCount, marker, date, del);
    userId && performance.append(table);
  }

  const navbar = document.getElementsByClassName("navbar")[0];
  console.log(navbar);
  const getDatas = document.getElementsByClassName("get-data")[0];
  // console.log(getDatas);
  console.log(filteredData);
  const perfContainer = document.createElement("section");
};

// getDatas.addEventListener("click", getData);
getData();
