const doneSettings = document.getElementsByClassName("done-settings")[0];

const exes = document.getElementsByClassName("exes");

const interv = document.getElementsByClassName("interval")[0];
const exDuration = document.getElementsByClassName("duration")[0];
console.log(interv, exDuration);

const handleSubmit = async (e) => {
  const first = exes[0].value;
  const second = exes[1].value;
  const third = exes[2].value;
  const fourth = exes[3].value;
  const fifth = exes[4].value;
  const intervValue = interv.value;
  const durationValue = duration.value;
  const exesChosen = {
    first,
    second,
    third,
    fourth,
    fifth,
    intervValue,
    durationValue,
  };

  console.log(exesChosen);
};

doneSettings.addEventListener("click", handleSubmit);
