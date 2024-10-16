const n = 50;
const array = [];
let audioCtx = null;

init();

function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random(); // Generate random values
  }
  array.sort((a, b) => b - a); // Sort array in descending order
  showBars();
}

function play() {
  const copy = [...array];
  const moves = insertionSort(copy); // Use insertionSort instead of bubbleSort
  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  } else if (move.type == "overwrite") {
    array[i] = move.value;
  }
  playNote(200 + array[i] * 500);
  showBars(move);

  setTimeout(function () {
    animate(moves);
  }, 40);
}

// Insertion Sort Implementation in JavaScript
function insertionSort(array) {
  const moves = [];
  const size = array.length;
  for (let i = 1; i < size; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      moves.push({ indices: [j + 1, j], type: "swap" });
      array[j + 1] = array[j];
      moves.push({ indices: [j + 1], value: array[j], type: "overwrite" });
      j = j - 1;
    }
    array[j + 1] = key;
    moves.push({ indices: [j + 1], value: key, type: "overwrite" });
  }
  return moves;
}

function showBars(move) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
      if (move.type == "swap") {
        bar.classList.add("swap");
      } else if (move.type == "overwrite") {
        bar.classList.add("overwrite");
      }
    }

    container.appendChild(bar);
  }
}
