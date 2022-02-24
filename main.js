let Total_time = 60;

let dummy_text = [
  "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. ",
  "To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type.",
];

let current_time = document.querySelector(".current_time");
let current_accuracy = document.querySelector(".current_accuracy");
let current_error = document.querySelector(".current_error");
let current_cpm = document.querySelector(".current_cpm");
let current_speed = document.querySelector(".current_speed");
let start_text = document.querySelector("#start");
let text_Area = document.querySelector(".text_Area");
let btn = document.querySelector(".btn");
let char2 = document.querySelector(".char");
let speed = document.querySelector(".speed");
let accuracy_group = document.querySelector(".accuracy");
let error2 = document.querySelector(".error");

let time_remain = Total_time;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_start = "";
let startcount = 0;
let timer = null;

function updatingstart() {
  start_text.textContent = null;
  current_start = dummy_text[startcount];

  current_start.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    start_text.appendChild(charSpan);
  });
  if (startcount < dummy_text.length - 1) startcount++;
  else startcount = 0;
}

function processing() {
  document.querySelector(".start").style.display='none';
    start_text.style.display='block';
    start_text.style.width='70%';
    start_text.style.height='20%';

  curr_input = text_Area.value;
  curr_input_array = curr_input.split('');

  characterTyped++;
  errors = 0;
  startSpanArray = start_text.querySelectorAll("span");
  startSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    if (typedChar == null) {
      char.classList.remove('right_char');
      char.classList.remove('wrong_char');
    } else if (typedChar === char.innerText) {
      char.classList.add('right_char');
      char.classList.remove('wrong_char');
    } else {
      char.classList.remove('right_char');
      char.classList.add('wrong_char');
      errors += 1;
    }
  });
  current_error.textContent = total_errors + errors;

  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyValue = ((correctCharacters / characterTyped) * 100);
  current_accuracy.textContent = Math.round(accuracyValue) + "%";

  if (curr_input.length == current_start.length) {
    updatingstart();

    total_errors += errors;
    text_Area.value = "";
  }
}

function startGame() {
  reset();
  updatingstart();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function reset() {
  time_remain = Total_time;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  startcount = 0;
  text_Area.disabled = false;

  text_Area.value = "";
  // start_text.textContent = "Click here to start";
  current_accuracy.textContent = 100 + '%';
  current_time.textContent = time_remain + "s";
  current_error.textContent = 0;
  btn.style.display = "none";
  speed.style.display = "none";
  char2.style.display = "none";
}

function updateTimer() {
  if (time_remain > 0) {
    time_remain--;
    timeElapsed++;
    current_time.textContent = time_remain + "s";
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  text_Area.disabled = true;
  // start_text.textContent = "Click on restart";
  btn.style.display = "block";
  x1 = Math.round((characterTyped / timeElapsed) * 60);
  x2 = Math.round((characterTyped / 5 / timeElapsed) * 60);
  current_cpm.textContent = x1;
  current_speed.textContent = x2;
//   char2.style.display = "block";
  speed.style.display = "block";
}