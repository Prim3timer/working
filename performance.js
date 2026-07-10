const performance = document.getElementsByClassName("performance")[0];
performance.style.display = "flex";
performance.style.rowGap = "2rem";

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
rHeader.innerHTML = "rounds";
exHeader.innerHTML = "exercises";
markHeader.innerHTML = "mark (%)";
dateHeader.innerHTML = "date";
table.appendChild(tableBody);
tableBody.appendChild(headerRow);
headerRow.append(dHeader, rHeader, exHeader, markHeader, dateHeader);

const deleteEntry = async (id) => {
  console.log("wdvsaasf");
  console.log(id);
  // const response = await fetch("http://localhost:5000/workout", {
  //   method: "DELETE",
  // });
};

const getData = async () => {
  const response = await fetch("http://localhost:5000/workout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let perfData = await response.json();
  for (let i = 0; i < perfData.length; i++) {
    const dets = document.createElement("tr");
    tableBody.appendChild(dets);
    const perfy = perfData[i];

    const roundCount = document.createElement("td");
    roundCount.innerHTML = `${
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
    console.log(roundCount);
    const endurance = document.createElement("td");
    endurance.innerHTML = `${perfy.round}`;
    const exCount = document.createElement("td");
    exCount.innerHTML = `${perfy.oneExercise}`;
    const marker = document.createElement("td");
    marker.innerHTML = `${(perfy.oneExercise / 25) * 100}`;
    const date = document.createElement("td");
    const del = document.createElement("td");
    exCount.innerHTML = `${perfy.oneExercise}`;
    date.innerHTML = new Date(perfy.date).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    // const del = document.createElement("td");
    // const trash = <i class="fa-solid fa-trash" />;
    del.innerHTML = "delete";
    del.addEventListener("click", async () => {
      // const response = await fetch(
      //   `http://localhost:5000/workout/${perfy._id}`,
      //   {
      //     method: "DELETE",
      //   },
      // );
      const response2 = await fetch("http://localhost:5000/workout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      perfData = await response2.json();
    });
    dets.append(roundCount, endurance, exCount, marker, date, del);
    console.log(dets);

    performance.append(table);
    console.log(del);
  }

  const navbar = document.getElementsByClassName("navbar")[0];
  console.log(navbar);
  const getDatas = document.getElementsByClassName("get-data")[0];
  // console.log(getDatas);
  console.log(perfData);
  const perfContainer = document.createElement("section");
};

// getDatas.addEventListener("click", getData);
getData();
