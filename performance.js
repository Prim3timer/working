import { myUrl } from "./myUrl.js";
console.log(myUrl);
const userId = localStorage.getItem("workoutUserId");
// location.href = location.href;
console.log(userId);
let globalData = [];
let globalUser = {};

const timeClocking = (lamda) => {
  // defining duration this way is simply for experiment where i will change the value of the variable and it will
  // reflect all over its instances.
  const duration = lamda + 0;
  return duration > 3600
    ? `${Math.floor(duration / 3600)}:${Math.floor((duration % 3600) / 60)}:${Math.floor((duration % 3600) % 60)} `
    : duration < 10
      ? `0:0${duration % 60}`
      : duration < 60
        ? `0:${duration % 60}`
        : duration % 60 >= 10
          ? `${Math.floor(duration / 60)}:${duration % 60}`
          : duration < 10
            ? 0`${duration % 60}`
            : `${Math.floor(duration / 60)}:0${duration % 60}`;
};

const userAnchor = document.getElementsByClassName("users-anchor")[0];

const logoutLink = document.getElementsByClassName("logout-link")[0];

logoutLink.addEventListener("click", () => {
  localStorage.removeItem("workoutUserId");
});

// console.log("Came from:", window.history.state?.prevPath);
const performance = document.getElementsByClassName("performance")[0];
console.log(window.location.href);
performance.style.display = "flex";
// performance.style.rowGap = "2rem";
const entryCount = document.getElementsByClassName("entry-count")[0];

let verifyWindow = document.createElement("div");
let question = document.createElement("p");
question.innerHTML = "Are you sure you want to delete this entry?";

let verifyWindowButtonCont = document.createElement("article");
let alertWindow = document.createElement("p");
verifyWindow.className = "no-verify-window";
verifyWindow.style.padding = ".5rem";
verifyWindow.style.display = "flex";
verifyWindow.style.flexDirection = "column";
verifyWindow.style.rowGap = "1rem";
verifyWindow.style.alignItems = "center";
verifyWindow.style.backgroundColor = "lavender";
verifyWindow.style.position = "fixed";
verifyWindow.style.top = "40%";

alertWindow.className = "no-verify-window";
alertWindow.style.padding = "1rem";
alertWindow.style.fontSize = "1.5rem";
alertWindow.style.display = "flex";
alertWindow.style.flexDirection = "column";
alertWindow.style.rowGap = "1rem";
alertWindow.style.alignItems = "center";
alertWindow.style.color = "darkslateblues";
alertWindow.style.backgroundColor = "gainsboro";
alertWindow.style.position = "fixed";
alertWindow.style.top = "40%";

// verifyWindow.append(verifyWindowButtonCont);
let itemId = "";
// verifyWindowButtonCont.className = "verify-button-cont";
let noButton = document.createElement("button");
noButton.innerHTML = "No";
let yesButton = document.createElement("button");
yesButton.innerHTML = `Yes <i class="fa-solid fa-trash"></i>`;
verifyWindowButtonCont.append(noButton, yesButton);
verifyWindow.append(question, verifyWindowButtonCont);

performance.appendChild(verifyWindow);
performance.appendChild(alertWindow);

const table = document.createElement("table");
const tableBody = document.createElement("tbody");
const headerRow = document.createElement("tr");
const dHeader = document.createElement("th");
const rHeader = document.createElement("th");
const exHeader = document.createElement("th");
const exDetsHeader = document.createElement("th");
const markHeader = document.createElement("th");
const dateHeader = document.createElement("th");
const deleteHeader = document.createElement("th");
// const delet = document.createElement("th");

dHeader.innerHTML = "duraton (hr:min:s)";
rHeader.innerHTML = "rounds completed";
exHeader.innerHTML = "completed (%)";
exDetsHeader.innerHTML = "exercises/set";
// markHeader.innerHTML = "mark (%)";
dateHeader.innerHTML = "date";
table.appendChild(tableBody);
// tableBody.appendChild(headerRow);
headerRow.append(
  dHeader,
  rHeader,
  exHeader,
  exDetsHeader,
  // markHeader,
  dateHeader,
  deleteHeader,
);
const greeting = document.getElementsByClassName("greeting")[0];

noButton.addEventListener("click", () => {
  verifyWindow.className = "no-verify-window";
});

verifyWindowButtonCont.className = "verify-window-cont";

const deleteEntry = async () => {
  try {
    const response = await fetch(`${myUrl}/performance/${itemId}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response) {
      const reply = await response.json();
      const filterate = globalData.filter((data) => data.userId === userId);
      const entryFilterate = filterate.filter((entry) => entry._id != itemId);
      globalData = entryFilterate;
      console.log(reply);

      tableBody.replaceChildren();
      tableBody.appendChild(headerRow);
      alertWindow.innerHTML = reply;
      alertWindow.className = "verify-window";
      entryCount.innerHTML = `(${entryFilterate.length} entries)`;
      for (let i = 0; i < entryFilterate.length; i++) {
        const dets = document.createElement("tr");
        dets.style.backgroundColor = `${i % 2 === 0 ? "white" : "khaki"}`;
        tableBody.appendChild(dets);
        const perfy = entryFilterate[i];
        console.log(tableBody.children);
        const { workSettings } = globalUser;
        const roundCount = document.createElement("td");
        const { duration } = perfy.exerciseTimings[0];
        roundCount.innerHTML = timeClocking(duration);
        const endurance = document.createElement("td");
        console.log(perfy.exerciseTimings[3]);
        endurance.innerHTML = `${perfy.exerciseTimings[3].numberOfRounds}`;
        const exCount = document.createElement("td");
        const exDet = document.createElement("td");
        exCount.innerHTML = `${parseInt(perfy.mark.toFixed(2))}`;
        exDet.innerHTML = `${globalUser.workSettings?.exercise.length}`;

        const date = document.createElement("td");
        const del = document.createElement("td");
        date.innerHTML = new Date(perfy.date).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          // hour: "numeric",
          // minute: "numeric",
          // second: "numeric",
        });
        del.style.fontSize = "1.5rem";

        const removeVerifier = () => {
          verifyWindow.className = "no-veriy-window";
        };
        del.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        const getId = async (id) => {
          itemId = id;
          console.log(itemId);
          verifyWindow.className = "verify-window";
          verifyWindowButtonCont.className = "verify-button-cont";
        };

        del.addEventListener("click", () => getId(perfy._id));
        dets.append(roundCount, endurance, exCount, exDet, date, del);
        userId && performance.append(table);
      }

      verifyWindow.className = "no-verify-window";
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      alertWindow.className = "no-verify-window";
    }, 3000);
  }
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
  const user = users.find((user) => user._id == userId);
  console.log(user);
  globalUser = user;
  console.log(user.workSettings);
  const foundUserRoles = Object.keys(user.roles);
  if (!foundUserRoles.includes("Admin")) {
    userAnchor.href = "";
  } else {
    userAnchor.href = "users.html";
  }
  greeting.innerHTML = `welcome, ${user.username}`;
  yesButton.addEventListener("click", deleteEntry);
  let perfData = await response.json();
  console.log(perfData);
  globalData = perfData;
  const filteredData = perfData.filter((data) => data.userId === userId);
  entryCount.innerHTML = `(${filteredData.length} entries)`;

  const showDetWindow = () => {
    let detsWindow = document.createElement("div");
    detsWindow.style.padding = ".5rem";
    let detsExHeader = document.createElement("h4");
    let detsExList = document.createElement("ol");
    let closure = document.createElement("p");
    closure.style.position = "absolute";
    closure.style.top = "0px";
    closure.style.right = "0px";
    closure.addEventListener("click", () => {
      detsWindow.className = "no-verify-window";
    });
    closure.style.position = "abolute";
    closure.innerHTML = `<i class="fa-solid fa-x"></i>`;

    detsWindow.className = "dets-verify-window";
    detsWindow.appendChild(closure);
    detsWindow.appendChild(detsExHeader);
    detsWindow.appendChild(detsExList);
    let detNumberOfRounds = document.createElement("p");
    let detExDuration = document.createElement("p");
    let detsInterval = document.createElement("p");
    detsExList.replaceChildren();
    detNumberOfRounds.innerHTML = `number of rounds: ${perfy.exerciseTimings[3].numberOfRounds}`;
    detsInterval.innerHTML = `interval b/w exercises: ${perfy.exerciseTimings[2].interval}`;
    detExDuration.innerHTML = `duration of each exercise: ${perfy.exerciseTimings[1].exercisesDuration}`;
    detsExHeader.innerHTML = `Exercises Done`;
    performance.appendChild(detsWindow);
    detsWindow.append(detNumberOfRounds, detsInterval, detExDuration);
    perfy.exerciseDets.map((exercise) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = exercise;
      detsExList.append(listItem);
    });
    // console.log(perfy);
  };

  for (let i = 0; i < filteredData.length; i++) {
    const dets = document.createElement("tr");
    dets.style.backgroundColor = `${i % 2 === 0 ? "white" : "khaki"}`;
    tableBody.appendChild(dets);
    const perfy = filteredData[i];
    console.log(perfy);
    const { duration } = perfy.exerciseTimings[0];
    const showDetWindow = () => {
      let detsWindow = document.createElement("div");
      detsWindow.style.padding = ".5rem";
      let detsDuration = document.createElement("p");
      let detsExHeader = document.createElement("h4");
      let detsExList = document.createElement("ol");
      let closure = document.createElement("p");
      closure.style.position = "absolute";
      closure.style.top = "0px";
      closure.style.right = "0px";
      closure.addEventListener("click", () => {
        detsWindow.className = "no-verify-window";
      });
      closure.style.position = "abolute";
      closure.innerHTML = `<i class="fa-solid fa-x"></i>`;

      detsWindow.className = "dets-verify-window";
      detsWindow.appendChild(detsDuration);
      detsWindow.appendChild(closure);
      detsWindow.appendChild(detsExHeader);
      detsWindow.appendChild(detsExList);
      let detNumberOfRounds = document.createElement("p");
      let detExDuration = document.createElement("p");
      let detsInterval = document.createElement("p");
      detsExList.replaceChildren();
      detNumberOfRounds.innerHTML = `number of rounds: ${perfy.exerciseTimings[3].numberOfRounds}`;
      detsInterval.innerHTML = `interval b/w exercises: ${perfy.exerciseTimings[2].interval}`;
      detExDuration.innerHTML = `duration of each exercise: ${perfy.exerciseTimings[1].exercisesDuration}`;
      detsDuration.innerHTML = `duration: ${timeClocking(duration)}`;
      detsExHeader.innerHTML = `exercises done:`;
      performance.appendChild(detsWindow);
      detsWindow.append(detNumberOfRounds, detsInterval, detExDuration);
      perfy.exerciseDets.map((exercise) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = exercise;
        detsExList.append(listItem);
      });
      // console.log(perfy);
    };

    const { workSettings } = user;
    const roundCount = document.createElement("td");
    console.log(5 % 2);

    roundCount.innerHTML = timeClocking(duration);
    roundCount.addEventListener("click", showDetWindow);
    const endurance = document.createElement("td");
    endurance.addEventListener("click", showDetWindow);
    console.log(perfy);
    endurance.innerHTML = `${perfy.exerciseTimings[3].numberOfRounds}`;
    const exCount = document.createElement("td");
    exCount.addEventListener("click", showDetWindow);
    const exDet = document.createElement("td");
    exDet.addEventListener("click", showDetWindow);
    exCount.innerHTML = `${parseInt(perfy.mark)}`;
    exDet.innerHTML = `${perfy.exerciseDets.length}`;
    const date = document.createElement("td");
    date.addEventListener("click", showDetWindow);
    const del = document.createElement("td");
    date.innerHTML = new Date(perfy.date).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
    });

    const removeVerifier = () => {
      verifyWindow.className("veriy-window");
    };
    // const icon = document.createElement("i");
    // icon.classList.add("fa-solid", "fa-trash");

    // del.appendChild(icon);
    del.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    del.style.fontSize = "1.5rem";

    const getId = async (id) => {
      itemId = id;
      console.log(itemId);
      verifyWindowButtonCont.className = "verify-button-cont";
      verifyWindow.className = "verify-window ";
    };

    del.addEventListener("click", () => getId(perfy._id));
    dets.append(roundCount, endurance, exCount, exDet, date, del);
    // detsWindow.className = "no-verify-window";

    userId && performance.append(table);
  }

  const navbar = document.getElementsByClassName("navbar")[0];
  const getDatas = document.getElementsByClassName("get-data")[0];
  const perfContainer = document.createElement("section");
};
getData();
