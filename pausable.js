let clicker = document.getElementById("halter");
let pauser = document.getElementById("halter");
let rewind = document.getElementById("backer");
let foward = document.getElementById('foward')

let subject = document.createElement("h2");
// subject.style.color = 'rebeccapurple'
let jogUp = document.createElement("p");
jogUp.innerHTML = "Jog Up!";

let pressUp = document.createElement("p");
pressUp.innerHTML = "Press Up";

let squat = document.createElement("p");
squat.innerHTML = "Squat";
let running = document.createElement("p");
running.innerHTML = "Mt. Climb";

let plank = document.createElement("p");
plank.innerHTML = "Plank";

let jackKnife = document.createElement("p");
jackKnife.innerHTML = "High Knee";
// the element that contains the  the element that contains the timer  (seconds)
let cycleSteady = document.createElement("div");

// the element that containse the sec variable
let cycle = document.createElement("h1");
// the element that contains the round variable. The word round is  its
// content for most of the time. It however does change
// from time to time.
let set = document.getElementById("set");
let ID;
let planks;
let warning = 0;

cycleSteady.appendChild(cycle);

cycle.style.color = "purple";
// the contianer for all the excercise types
let all = document.createElement("div");

{
  /* insert all the various excersises into the div element */
}
all.appendChild(pressUp);
all.appendChild(squat);
all.appendChild(running);
all.appendChild(plank);
all.appendChild(jackKnife);
for (let i = 0; i < all.childNodes.length; i++) {
  //all.style.marginLeft = "3%";
  all.style.marginTop = "5%";
  jogUp.style.marginTop = "10%";
  jogUp.style.width = "15%";
  jogUp.style.marginLeft = "42%";
  jogUp.style.borderRadius = "4px";
  jogUp.style.padding = ".5em";
  jogUp.style.textAlign = "center";
  jogUp.style.transitionDuration = "500ms";
  // give all the different excersises styling
  all.children[0].style.marginLeft = "2.5%";
  all.children[i].style.marginLeft = "1%";
  all.children[i].style.padding = ".5em";
  all.children[i].style.borderRadius = "4px";
  all.children[i].style.width = "15%";
  all.children[i].style.textAlign = "center";
  all.children[i].style.float = "left";
  all.children[i].style.transitionDuration = "500ms";
  all.children[i].style.fontSize = "150%";
  all.children[i].style.color = "sandybrown";
  all.children[i].style.backgroundColor = "maroon";
  set.style.transitionDuration = "500ms";
}

let i = 0;
console.log(i)
let sec = 0;
cycle.innerHTML = sec;
let duration = 0;
// occassional content of the the set element
let round = 1;

set.innerHTML = `Round ${round}`;

// the body element
let main = document.getElementById("mat");
main.appendChild(jogUp);
main.appendChild(set);
set.style.marginLeft = "1em";
main.appendChild(cycleSteady);
main.appendChild(all);

cycleSteady.style.marginBottom = "   2%";
cycleSteady.style.marginLeft = "23%";
cycleSteady.style.marginTop = "5%";
let ready = false;
let pIndex = 0;

let controls = {
  pause: false,
  rewind: false,
  complete: "no",
  runFunc: true,
};

function general(currentItem, formerItem, nextItem) {
  let { complete } = controls;
  complete = "no";
  return new Promise((resolve, reject) => {
    // the previous excersice is formerItem
    formerItem.style.transform = "scale(1)";
    formerItem.style.backgroundColor = "darkorange";
    formerItem.style.color = "yellow";

    jogUp.style.transform = "scale(1.5)";
    jogUp.style.color = "yellow";
    jogUp.style.backgroundColor = "green";
    // change the content of the set element back to  the 'round' variable
    // after 3 seconds
    setTimeout(() => {
      set.innerHTML = "Round " + round;
    }, 3000);
    // transfrorm the current excercise element after 16 seconds
    // an interval to check for when sec exceeds 14
   // planks = setInterval(() => {}, 1000);

    ID = window.setInterval(() => {
      if (sec > 14) {
        // the current excercise is currentItem
        currentItem.style.position = "relative";
        // It is used to make the current excersise appear above
        //  previous and next excercises
        currentItem.style.zIndex = pIndex;

        currentItem.style.transform = "scale(1.5)";
        currentItem.style.color = "yellow";
        currentItem.style.backgroundColor = "green";
        jogUp.style.transform = "scale(1)";
        jogUp.style.color = "sandybrown";
        jogUp.style.backgroundColor = "maroon";

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
      return
      }
       else sec++;

      // giving the athlete notice to start preparing for the next excercise
      if ((sec > 12 && sec <= 15) || (sec > 32 && sec <= 35)) {
        cycle.style.color = "darkorange";
        //cycle element's color goes back to normal after warning.
      } else cycle.style.color = "purple";

      // if sec = 35 and controls.complete = 'yes', resolve the promise
      if (sec > 35) {
        controls.complete = "yes";
        if (controls.complete === "yes") {
          resolve(console.log("resolved"));
          clearInterval(ID);
        } else reject("not resolved");
        sec = 0;
      }
    }, 1000);
  });
}

pauser.addEventListener("click", () => {
  //the unique condition is desinged to let this event
  //handler invoke the reality function just once
  let { runFunc, pause } = controls;
  if (runFunc === true) {
    console.log(pause)
    reality();
    pauser.innerHTML = "Pause";
  } else if (controls.pause === false) {
    //console.log(runFunc)
    controls.pause = true;
    pauser.innerHTML = "Resume";
    cycle.innerHTML = sec;
  } else {
    controls.pause = false;
    pauser.innerHTML = "Pause";
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
  // As a reslut, it doesn't fire the pointerup event handler which
  // leads me to create this setTimeout function to end after 3 seconds
  // the interval that is fired during the pointerdown event.
  setTimeout(() => {
    if (controls.rewind === true) {
      controls.rewind = false;
      clearInterval(reducer);
    }
  }, 3000);
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

foward.addEventListener('click', increaser)

let reality = async () => {
  controls.runFunc = false;
  try {
    await general(pressUp, jackKnife, squat);

    await general(squat, pressUp, running);

    await general(running, squat, plank);

    await general(plank, running, jackKnife);

    await general(jackKnife, plank, pressUp);
  } catch (error) {
    console.log(error + " at all");
  } finally {
    // increase the value of round after a set is complete
    round++;
    // temporarily change the content of the set element to 'well done'
    set.innerHTML = `Well Done!`;
    // if five sets have not been completed, keep repeating the sets
    //by invoking the reality function
    if (round <= 5) {
      reality();
    } else {
      // otherwise change the content of the set element to 'congrats'
      // and shutdown the programm
      set.innerHTML = "Congrats!";
      round = 1;
      pauser.innerHTML = "Start";
      controls.runFunc = true;
    }
  }
};