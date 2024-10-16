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
  const moves = heapSort(copy);
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type === "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  playNote(200 + array[i] * 500);
  playNote(200 + array[j] * 500);
  showBars(move);

  setTimeout(function () {
    animate(moves);
  }, 50);
}

// Heap Sort Implementation with move tracking
function heapSort(arr) {
  const moves = [];
  const n = arr.length;

  // Heapify process
  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // If right child is larger than the largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // If the largest is not the root
    if (largest !== i) {
      moves.push({ indices: [i, largest], type: "swap" });
      [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap

      // Recursively heapify the affected subtree
      heapify(arr, n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    moves.push({ indices: [0, i], type: "swap" });
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap

    // Call heapify on the reduced heap
    heapify(arr, i, 0);
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
      bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
    }

    container.appendChild(bar);
  }
}
