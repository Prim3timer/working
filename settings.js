const doneSettings = document.getElementsByClassName("done-settings")[0];
const doneSettings2 = document.getElementsByClassName("done-settings")[1];
console.log(doneSettings2);

const exes = document.getElementsByClassName("exes");
exes[1].value = "heeee";
const greeting = document.getElementsByClassName("greeting")[0];

const userId = localStorage.getItem("workoutUserId");

const interv = document.getElementsByClassName("interval")[0];
const exDuration = document.getElementsByClassName("duration")[0];
console.log(interv, exDuration);

const setLogout = document.getElementsByClassName("set-logout");
const rounds = document.getElementsByClassName("rounds")[0];

console.log(setLogout);
// const handleSubmit = async (e) => {
//   const first = exes[0].value;
//   const second = exes[1].value;
//   const third = exes[2].value;
//   const fourth = exes[3].value;
//   const fifth = exes[4].value;
//   const intervValue = interv.value;
//   const durationValue = exDuration.value;
//   const numberOfRounds = Number(rounds.value);
// };

const populate = async () => {
  const userId = localStorage.getItem("workoutUserId");
  console.log(userId);
  const response = await fetch(`http://localhost:5000/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();

  const user = users.find((user) => user._id === userId);
  const { workSettings } = user;
  console.log(workSettings);
  exes[0].value = workSettings.exercise[0] || "";
  exes[1].value = workSettings.exercise[1] || "";
  exes[2].value = workSettings.exercise[2] || "";
  exes[3].value = workSettings.exercise[3] || "";
  exes[4].value = workSettings.exercise[4] || "";
  interv.value = workSettings.interval || "";
  exDuration.value = workSettings.exercisesDuration || "";
  rounds.value = workSettings.numberOfRounds || "";
};

populate();

const editUser = async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem("workoutUserId");
  console.log(userId);
  const response = await fetch(`http://localhost:5000/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();
  const rawExercise = [
    exes[0].value,
    exes[1].value,
    exes[2].value,
    exes[3].value,
    exes[4].value,
  ];
  const filteredExercise = rawExercise.filter(
    (item) => item !== "undefined" && item !== "",
  );
  console.log(filteredExercise);
  if (users) {
    const workerSettings = {
      exercise: filteredExercise,
      interval: interv.value,
      exercisesDuration: exDuration.value,
      numberOfRounds: rounds.value,
    };
    const user = users.find((user) => user._id === userId);
    if (filteredExercise.length < 3) {
      console.log("exercise list is too short. make it at least 2");
    } else {
      const respone2 = await fetch(
        `http://localhost:5000/workout-users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workerSettings),
        },
      );
      const reply = await respone2.json();
      console.log(reply);
    }
  }
};

doneSettings.addEventListener("click", editUser);
