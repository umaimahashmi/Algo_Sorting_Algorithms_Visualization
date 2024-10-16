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
    array[i] = Math.floor(Math.random() * 100); // Random numbers between 0 and 99
  }
  // Arrange randomly generated array in descending order
  array.sort((a, b) => b - a);
  showBars();
}

function play() {
  const copy = [...array];
  const moves = radixSort(copy); // Use radix sort
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const { index, value } = move;

  // Update the array at the specified index
  array[index] = value;
  playNote(200 + value * 500);
  showBars(move);

  setTimeout(function () {
    animate(moves);
  }, 50);
}

function countingSort(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  // Count occurrences of each digit
  for (let i = 0; i < n; i++) {
    const index = Math.floor(arr[i] / exp);
    count[index % 10]++;
  }

  // Update count[i] to be the actual position of this digit in output
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(arr[i] / exp);
    output[count[index % 10] - 1] = arr[i];
    count[index % 10]--;
  }

  // Copy the output array back to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

function radixSort(arr) {
  const maxVal = Math.max(...arr);
  let moves = [];

  // Apply counting sort to sort elements based on significant digits
  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
      const index = Math.floor(arr[i] / exp);
      count[index % 10]++;
    }

    // Update count[i] to be the actual position of this digit in output
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array and record moves
    for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp);
      output[count[index % 10] - 1] = arr[i];
      count[index % 10]--;

      // Capture move for visualization
      moves.push({
        index: count[index % 10],
        value: output[count[index % 10]],
      });
    }

    // Copy the output array back to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }
  }

  return moves; // Return the moves for visualization
}

function showBars(move) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] + "%"; // Scale bar height to fit
    bar.classList.add("bar");

    // Highlight the current operation
    if (move && move.index === i) {
      bar.style.backgroundColor = "red"; // Highlight moved bars
    } else {
      //bar.style.backgroundColor = "blue"; // Normal bars
    }

    container.appendChild(bar);
  }
}
