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
  array.sort((a, b) => b - a); // Sort the array in descending order
  showBars(); // Display the sorted bars
}

function play() {
  const copy = [...array];
  const moves = mergeSort(copy); // Apply merge sort
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type === "overwrite") {
    array[i] = move.value;
  }
  playNote(200 + array[i] * 500);
  showBars(move);

  setTimeout(function () {
    animate(moves);
  }, 50);
}

// Merge Sort Implementation in JavaScript with moves tracking
function mergeSort(array) {
  const moves = [];
  function mergeSortRecursive(arr, start, end) {
    if (end - start <= 1) {
      return arr.slice(start, end);
    }

    const mid = Math.floor((start + end) / 2);
    const left = mergeSortRecursive(arr, start, mid);
    const right = mergeSortRecursive(arr, mid, end);

    return merge(left, right, start);
  }

  function merge(left, right, start) {
    let sorted = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        sorted.push(left[i]);
        moves.push({
          indices: [start + sorted.length - 1],
          value: left[i],
          type: "overwrite",
        });
        i++;
      } else {
        sorted.push(right[j]);
        moves.push({
          indices: [start + sorted.length - 1],
          value: right[j],
          type: "overwrite",
        });
        j++;
      }
    }

    while (i < left.length) {
      sorted.push(left[i]);
      moves.push({
        indices: [start + sorted.length - 1],
        value: left[i],
        type: "overwrite",
      });
      i++;
    }

    while (j < right.length) {
      sorted.push(right[j]);
      moves.push({
        indices: [start + sorted.length - 1],
        value: right[j],
        type: "overwrite",
      });
      j++;
    }

    return sorted;
  }

  mergeSortRecursive(array, 0, array.length);
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
      bar.style.backgroundColor = move.type === "overwrite" ? "red" : "blue";
    }

    container.appendChild(bar);
  }
}
