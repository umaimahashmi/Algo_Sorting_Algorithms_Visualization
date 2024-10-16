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
    array[i] = Math.random();
  }
  // arrange randomly generated array in descending order
  array.sort((a, b) => b - a);
  showBars();
}

function play() {
  const copy = [...array];
  const moves = quickSort(copy, 0, copy.length - 1); // Apply quicksort
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
  }
  playNote(200 + array[i] * 500);
  playNote(200 + array[j] * 500);
  showBars(move);

  setTimeout(function () {
    animate(moves);
  }, 50);
}

// QuickSort Implementation with move tracking
function quickSort(arr, left, right) {
  const moves = [];
  function partition(arr, left, right) {
    const pivotIndex = Math.floor((left + right) / 2);
    const pivot = arr[pivotIndex];
    let i = left;
    let j = right;

    while (i <= j) {
      while (arr[i] < pivot) {
        i++;
      }
      while (arr[j] > pivot) {
        j--;
      }
      if (i <= j) {
        moves.push({ indices: [i, j], type: "swap" });
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    return i;
  }

  function quickSortRecursive(arr, left, right) {
    if (left < right) {
      const index = partition(arr, left, right);
      quickSortRecursive(arr, left, index - 1);
      quickSortRecursive(arr, index, right);
    }
  }

  quickSortRecursive(arr, left, right);
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
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }

    container.appendChild(bar);
  }
}
