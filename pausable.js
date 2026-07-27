let clicker = document.getElementById("halter");
let pauser = document.getElementById("halter");
let rewind = document.getElementById("backer");
let foward = document.getElementById("foward");
let roundUp = document.getElementById("round-up");
const greeting = document.getElementsByClassName("greeting")[0];

const userId = localStorage.getItem("workoutUserId");
let jogUp = document.getElementById("jog-up");
const excercises = document.getElementsByClassName("exercise");

let first = excercises[0];
let second = excercises[1];
let third = excercises[2];
let fourth = excercises[3];
let fifth = excercises[4];

let rounder = document.getElementsByClassName("indicator")[1];
// const getAuser = async () => {
// const userId = localStorage.getItem("workoutUserId");
let round = 1;
const response = await fetch("http://localhost:5000/workout-users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
const users = await response.json();
const user = users.find((user) => user._id === userId);
console.log(user);
greeting.innerHTML = `welcome, ${user.username}`;
const { exercise, interval, exercisesDuration, numberOfRounds } =
  user.workSettings;
// first.innerHTML = exercise[0];
// second.innerHTML = exercise[1];
// third.innerHTML = exercise[2];
// fourth.innerHTML = exercise[3];
// fifth.innerHTML = exercise[4];
rounder.innerHTML = `R ${round} of ${numberOfRounds}`;
console.log(numberOfRounds);
console.log(exercise);
let exCont = document.getElementById("exercise-cont");
const elements = exercise.map((element, i) => {
  const newP = document.createElement("p");
  newP.className = "exercise";
  newP.innerHTML = element;
  exCont.appendChild(newP);
  return newP;
});
const noExAlertElement = document.createElement("p");
noExAlertElement.style.minWidth = "80%";
noExAlertElement.innerHTML =
  "you have not chosen any exercises yet. Head to Settings to make entry";
if (exCont.children.length === 0) {
  exCont.appendChild(noExAlertElement);
}

console.log(elements);

let workerSettings = user.workSettings;
// };

// getAuser();

const signature = document.getElementsByClassName("copy-right")[0];
const dashboard = document.getElementsByClassName("indicator-container")[0];
console.log(dashboard);
const copyWritght = "&copy;";
const current = new Date().getFullYear();
signature.innerText = ` ${current} Amalu Productions`;
console.log(signature);

const body = document.getElementById("mat");

const saver = document.getElementsByClassName("saver")[0];

const threeBars = document.getElementsByClassName("navbar")[0];
const links = document.getElementsByClassName("nav-links")[0];
const doneSettings = document.getElementsByClassName("done-settings")[0];
let begin;

const go = document.getElementById("go");
// the element that contains the  the element that contains the timer  (seconds)
// let cycleSteady = document.createElement("div");

let cycle = document.getElementsByClassName("indicator")[0];

// cycle.style.width = '4rem'
// cycle.style.borderRight = '5px solid goldenrod'
// let rounder = document.getElementsByClassName('indicator')
// cycle.style.borderRight = '5px solid goldenrod'

let ID;
let planks;
let warning = 0;

// the contianer for all the excercise types
// let all = document.createElement("div");

{
  /* insert all the various excersises into the div element */
}

const saveWork = async () => {
  const end = Date.now();
  let duration = Math.floor((end - begin) / 1000);
  console.log(begin);
  console.log(duration);

  const { exercise, numberOfRounds } = user.workSettings;
  const workDets = {
    duration,
    round,
    oneExercise: anExercise,
    date: new Date(),
    userId,
    mark: (anExercise / (exercise.length * numberOfRounds)) * 100,
  };
  console.log(workDets);
  const response = await fetch("http://localhost:5000/performance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workDets),
  });
  const content = await response.json();
  console.log(content);
};

saver.addEventListener("click", saveWork);

let i = 0;
let sec = 0;
cycle.innerHTML = sec;
// occassional content of the the set element

let anExercise = 0;

let ready = false;
let pIndex = 0;

let controls = {
  pause: false,
  rewind: false,
  complete: "no",
  runFunc: true,
};

jogUp.style.transitionDuration = "500ms";
for (let i = 0; i < excercises.length; i++) {
  excercises[i].style.transitionDuration = "500ms";
}
let RoundInspector = 3000;
function general(currentItem, formerItem, nextItem) {
  let { complete } = controls;
  complete = "no";
  return new Promise((resolve, reject) => {
    // the previous excersice is formerItem
    formerItem.style.transform = "scale(1 )";
    formerItem.style.backgroundColor = "darkorange";
    formerItem.style.color = "yellow";
    formerItem.style.boxShadow = "0em 0em 0em";

    jogUp.style.transform = "scale(1.5)";
    jogUp.style.color = "yellow";
    jogUp.style.backgroundColor = "green";
    jogUp.style.border = "2px solid green";
    jogUp.style.boxShadow = "0.2em 0.3em 0.4em gray";

    // change the content of the set element back to  the 'round' variable
    // after 3 seconds
    setTimeout(() => {
      go.style.transitionProperty = "font-size width height";
      go.style.transitionDuration = "400ms";
      go.style.fontSize = "4rem";
      go.style.height = "4rem";
      go.style.whiteSpace = "no-wrap";
      go.style.margin = "1rem 0";
      go.innerHTML = `Let's Work!`;
    }, RoundInspector);
    // transfrorm the current excercise element after interval elapses
    // an interval to check for when sec exceeds interval

    ID = window.setInterval(() => {
      if (sec > workerSettings.interval) {
        // the current excercise is currentItem
        currentItem.style.position = "relative";
        // It is used to make the current excersise appear above
        //  previous and next excercises
        currentItem.style.zIndex = pIndex;

        currentItem.style.transform = "scale(1.5)";
        currentItem.style.color = "yellow";
        currentItem.style.backgroundColor = "green";
        currentItem.style.boxShadow = "0.2em 0.3em 0.4em gray";
        jogUp.style.transform = "scale(1)";
        jogUp.style.color = "sandybrown";
        jogUp.style.backgroundColor = "maroon";
        jogUp.style.border = "2px solid maroon";
        jogUp.style.boxShadow = "0em 0em 0em";

        formerItem.style.color = "sandybrown";
        formerItem.style.backgroundColor = "maroon";

        // the variable for the z-index.
        pIndex++;
        let round = 1;
        //clearInterval(planks);
      }

      // pausing the app.
      cycle.innerHTML = sec;
      if (controls.pause === true) {
        return;
      } else {
        sec++;
      }

      // giving the athlete notice to start preparing for the next excercise
      if (
        (sec > workerSettings.interval - 3 && sec <= workerSettings.interval) ||
        (sec > workerSettings.exercisesDuration + workerSettings.interval - 3 &&
          sec <= workerSettings.exercisesDuration + workerSettings.interval - 3)
      ) {
        cycle.style.color = "darkorange";
        //cycle element's color goes back to normal after warning.
      } else cycle.style.color = "purple";

      // if sec = 35 and controls.complete = 'yes', resolve the promise
      if (sec > workerSettings.exercisesDuration + workerSettings.interval) {
        complete = "yes";
        if (complete === "yes") {
          resolve(console.log("resolved"));
          anExercise++;
          clearInterval(ID);
        } else reject("not resolved");
        sec = 0;
      }
      // rate of sec change
      if (sec > 4) {
        cycle.style.transitionProperty =
          "font-size, height, border, grid-template-columns";
        cycle.style.transitionDuration = "1s";
        cycle.style.fontSize = "5.5rem";
        cycle.style.height = "6rem";
        cycle.style.border = "2px solid brown";
        cycle.style.gridTemplateColumns = "5.5rem";
        cycle.transitTimingFunction = "ease-in";
        // cycle.style.transitionDelay = '.5s'

        rounder.style.transitionProperty =
          "font-size, height, border-right, border-top, border-bottom, flex";
        rounder.style.transitionDuration = ".9s, .6s, .6s, .6s, .6s, .8s";
        // rounder.style.transitionDuration = '.5s'
        rounder.style.transitTimingFunction = "ease-in";

        rounder.style.fontSize = "3rem";
        rounder.style.height = "5rem";
        rounder.style.borderRight = "2px solid brown";
        rounder.style.borderTop = "2px solid brown";
        rounder.style.borderBottom = "2px solid brown";
        rounder.style.flex = "0 1 55%";
        // rounder.style.transitionDelay = '.1s'

        dashboard.style.transitionProperty = "flex";
        dashboard.style.transitionDuration = "1.2s";
        // dashboard.transitTimingFunction = 'ease-in'
        dashboard.style.flex = "0 1 60%";
        // dashboard.style.transitionDelay = '.2s'
      }
    }, 1000);
  });
}

pauser.addEventListener("click", () => {
  //the unique condition is desinged to let this event
  //handler invoke the reality function just once
  let { runFunc, pause } = controls;
  if (runFunc === true) {
    begin = Date.now();
    console.log(begin);
    console.log(pause);
    console.log(runFunc);
    pauser.innerHTML = `<i class="fa-solid fa-pause"/>`;
    reality();
  } else if (controls.pause === false) {
    //console.log(runFunc)
    controls.pause = true;
    cycle.innerHTML = sec;
    pauser.innerHTML = `<i class="fa-solid fa-play"></i>`;
  } else {
    controls.pause = false;
    pauser.innerHTML = `<i class="fa-solid fa-pause"/>`;
  }
});

roundUp.addEventListener("click", () => {
  if (round > 4) {
    round = 0;
    rounder.innerHTML = `R ${round} of ${workerSettings.numberOfRounds}`;
  }
  if (round < 6) {
    round++;
    rounder.innerHTML = `R ${round} of ${workerSettings.numberOfRounds}`;
  }
});

let reducer;
let upInter = (e) => {
  controls.rewind == false;
  clearInterval(reducer);
};

let downInter = (e) => {
  controls.rewind = true;
  reducer = setInterval(() => {
    cycle.innerHTML = sec;
    sec -= 1;
    if (sec < 1) sec = 0;
  }, 300);
  //My laptop screen does not notice when I remove my finger.
  // As a reslut, it doesn't fire the pointerUp event handler which
  // leads me to create this setTimeout function to end after 3 seconds
  // the interval that is fired during the pointerdown event.
  setTimeout(() => {
    if (controls.rewind === true) {
      controls.rewind = false;
      clearInterval(reducer);
    }
  }, 1000);
};

let decreaser = (e) => {
  sec -= 1;
  setInterval(() => {
    if (sec < 1) sec = 0;
    cycle.innerHTML = sec;
  }, 10);
};

let increaser = (e) => {
  sec += 1;
  setInterval(() => {
    if (sec > 34) sec = 35;
    cycle.innerHTML = sec;
  }, 10);
};

rewind.addEventListener("pointerdown", () => downInter());

rewind.addEventListener("click", decreaser);

rewind.addEventListener("pointerup", upInter);

foward.addEventListener("click", increaser);

let reality = async () => {
  console.log(elements);
  controls.runFunc = false;
  try {
    for (let i = 0; i < elements.length; i++) {
      console.log(i);
      // looping through the elements in the elements array
      await general(
        elements[i],
        // if i = 0 subtract array length from index else subtract 1 from index``
        elements[i == 0 ? i + elements.length - 1 : i - 1],
        elements[i + 1],
      );
    }
  } catch (error) {
    console.log(error + " at all");
  } finally {
    // increase the value of round after a set is complete
    round++;
    // temporarily change the content of the set element to 'well done'

    if (round == workerSettings.numberOfRounds - 1) {
      go.innerHTML = `the home stretch!`;
      RoundInspector = 10000;
    } else if (round === 5) {
      RoundInspector = 15000;

      go.innerHTML = "one more round!";
    } else {
      RoundInspector = 3000;
      go.innerHTML = `Well Done!`;
    }
    // if five sets have not been completed, keep repeating the sets
    //by invoking the reality function
    console.log(workerSettings);
    if (round <= workerSettings.numberOfRounds) {
      rounder.innerHTML = `R ${round} of ${workerSettings.numberOfRounds}`;
      reality();
      // round++
    } else {
      // otherwise change the content of the set element to 'congrats'
      // and shutdown the programm
      go.innerHTML = "Congrats!";
      round = workerSettings.numberOfRounds;
      rounder.innerHTML = `R ${round} of ${workerSettings.numberOfRounds}`;
      sec = 0;
      cycle.innerHTML = sec;
      pauser.innerHTML = `<i class="fa-solid fa-play"></i>`;
      controls.runFunc = true;
      saveWork();
    }
  }
};
