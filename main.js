const addText = document.getElementById("add-text");
const addBtn = document.getElementById("add-btn");
const tasks = document.getElementsByClassName("tasks")[0];
const resetBtn = document.getElementById("rest-btn");
const saveBtn = document.getElementById("save-btn");

const quote = document.getElementById("quote");
const quoteBtn = document.getElementById("quote-btn");
const quotes = [
  "تجري الرياح كما تجري سفينتنا ~ نحن الرياح ونحن البحر والسفن",
  "The Way Get Started Is To Quit Talking And Begin Doing.",

  "It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.",

  "Live as if you were to die tomorrow. Learn as if you were to live forever",

  "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",

  "We become what we think about.",
  "Life is 10% what happens to me and 90% of how I react to it.",

  "The mind is everything. What you think you become.",

  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Eighty percent of success is showing up.",

  "Your time is limited, so don’t waste it living someone else’s life.",

  "Winning isn’t everything but wanting to win is.",

  "I am not a product of my circumstances. I am a product of my decisions. ",

  "You can never cross the ocean until you have the courage to lose sight of the shore.",

  "Either you run the day, or the day runs you.",
  "Whether you think you can or you think you can’t, you’re right.",
  "The best revenge is massive success.",
  "People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.",

  "There is only one way to avoid criticism do nothing, say nothing, and be nothing",

  "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.",

  "The only person you are destined to become is the person you decide to be.",

  "Go confidently in the direction of your dreams.  Live the life you have imagined.",
];


let arr = [];

addBtn.onclick = function () {
  if (addText.value !== "") {
    addarr(addText.value);
    addText.value = "";
  }
};

function addarr(text) {
  const task = {
    id: Date.now(),
    title: text,
    check: false,
  };

  arr.push(task);
  tasks.innerHTML = "";
  create(arr);
}

function create(arr) {
  arr.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("task");
    div.appendChild(document.createTextNode(e.title));
    let button = document.createElement("button");
    button.classList.add("del");
    button.appendChild(document.createTextNode("Delete"));
    // button.innerHTML = `<i class="fa-regular fa-trash-can" style="color: #ff0000;"></i>`;
    div.appendChild(button);
    div.setAttribute("data-id", e.id);
    tasks.appendChild(div);
  });
}

function setLo(arr) {
  window.localStorage.setItem("tasks", JSON.stringify(arr));
}

function getLo() {
  JSON.parse(window.localStorage.getItem("tasks"));
  create(arr);
}

if (localStorage.getItem("tasks")) {
  arr = JSON.parse(localStorage.getItem("tasks"));
  getLo();
  arr.forEach((a) => {
    if (a.check) {
      document.querySelector(`[data-id="${a.id}"]`).className = "task done";
    }
  });
}

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    arr.forEach((a) => {
      if (a.id == e.target.getAttribute("data-id")) {
        a.check === false ? (a.check = true) : (a.check = false);
      }
    });
    setLo(arr);
  }

  if (e.target.classList.contains("del")) {
    arr = arr.filter(
      (a) => a.id != e.target.parentElement.getAttribute("data-id")
    );
    setLo(arr);
    e.target.parentElement.remove();
  }
});

resetBtn.addEventListener("click", function () {
  localStorage.clear();
  tasks.innerHTML = "";
});

quoteBtn.addEventListener("click", function () {
  let index = Math.floor(Math.random() * quotes.length);
  quote.innerText = quotes[index];
});


