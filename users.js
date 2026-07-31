import { myUrl } from "./myUrl.js";
const entryCount = document.getElementsByClassName("entry-count")[0];
const getUsers = async () => {
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const users = await response.json();
  entryCount.innerHTML = `(${users.length})`;
  const main = document.getElementsByClassName("users")[0];
  main.style.marginTop = "3rem";
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  const nameHeader = document.createElement("th");
  const emailHeader = document.createElement("th");
  const joinedHeader = document.createElement("th");
  const settingsHeader = document.createElement("th");
  nameHeader.innerHTML = "name";
  emailHeader.innerHTML = "roles";
  joinedHeader.innerHTML = "joined";
  settingsHeader.innerHTML = "settings";
  headerRow.append(nameHeader, emailHeader, joinedHeader, settingsHeader);
  tableBody.appendChild(headerRow);
  table.appendChild(tableBody);
  main.appendChild(table);

  //   entryCount.innerHTML = `(${users.length})`;

  for (let i = 0; i < users.length; i++) {
    const usersList = document.createElement("tr");
    usersList.style.backgroundColor = `${i % 2 === 0 ? "white" : "palegreen"}`;
    const nameElement = document.createElement("td");
    const joined = document.createElement("td");
    const rolesElement = document.createElement("td");
    const settingsElement = document.createElement("td");
    const settingsAnchor = document.createElement("a");

    settingsElement.addEventListener("click", () => {
      localStorage.setItem("userSettingsId", users[i]._id);
    });
    settingsElement.appendChild(settingsAnchor);
    for (let j = 0; j < 4; j++) {
      nameElement.innerHTML = users[i].username;
      rolesElement.innerHTML = Object.keys(users[i].roles).join(", ");
      joined.innerHTML = new Date(users[i].joined).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }
    settingsAnchor.innerHTML = "settings";
    settingsAnchor.href = "userSetting.html";
    usersList.append(nameElement, rolesElement, joined, settingsElement);
    table.append(usersList);
  }
  console.log(await users);
};

getUsers();
