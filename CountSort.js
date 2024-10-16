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
    array[i] = Math.floor(Math.random() * n); // Generate random integers from 0 to n-1
  }
  // Sort the array in descending order
  array.sort((a, b) => b - a);
  showBars();
}

function play() {
  const moves = countSort([...array]); // Use a copy of the array for sorting
  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [index, value] = move;
  array[index] = value; // Set the sorted value at the correct index
  playNote(200 + (value * 500) / n);
  showBars();

  setTimeout(function () {
    animate(moves);
  }, 50);
}

function countSort(arr) {
  const moves = [];
  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  const output = new Array(arr.length); // Output array for sorted results

  // Count the occurrences of each number
  for (const num of arr) {
    count[num]++;
  }

  // Calculate the cumulative counts
  for (let i = 1; i <= maxVal; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const index = count[num] - 1; // Find the correct index in the output array
    output[index] = num; // Place the number in the output array
    moves.push([index, num]); // Capture the move for visualization
    count[num]--;
  }

  // Copy the sorted numbers back into the original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }

  return moves;
}

function showBars() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = (array[i] * 100) / n + "%"; // Normalize bar height
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}
