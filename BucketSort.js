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
    array[i] = Math.random(); // Generate random numbers between 0 and 1
  }
  array.sort((a, b) => b - a); // Sort array in descending order
  showBars(); // Display initial bars
}

function play() {
  const copy = [...array];
  const moves = bucketSort(copy); // Use bucket sort
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    showBars(); // Show final sorted state
    return;
  }

  const move = moves.shift();
  const { index, value } = move;

  // Update the array at the correct index with the value
  array[index] = value; // Insert the value at the specified index
  playNote(200 + value * 500); // Play the note for the inserted value
  showBars(); // Show bars with the current state

  setTimeout(function () {
    animate(moves);
  }, 150); // Adjust timing as needed
}

function bucketSort(arr) {
  const moves = [];
  const maxVal = Math.max(...arr);

  // Create buckets based on the range of elements in the input array
  const numBuckets = Math.floor(maxVal * n) + 1; // Scale to the number of buckets
  const buckets = Array.from({ length: numBuckets }, () => []); // Create empty buckets

  // Place elements into buckets
  for (const num of arr) {
    const index = Math.floor(num * n); // Scale to index for the bucket
    buckets[index].push(num);
  }

  // Sort each bucket and capture the moves
  for (let i = 0; i < buckets.length; i++) {
    const sortedBucket = buckets[i].sort((a, b) => a - b); // Sort the current bucket
    for (const value of sortedBucket) {
      // Capture the index for insertion
      const insertIndex = moves.length; // Use current moves length as the insertion index
      moves.push({ index: insertIndex, value }); // Capture insertion for visualization
    }
  }

  return moves;
}

function showBars() {
  const container = document.getElementById("container");
  container.innerHTML = ""; // Clear previous bars
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%"; // Bar height based on the value
    bar.classList.add("bar");
    //bar.style.backgroundColor = "blue"; // Normal bars
    container.appendChild(bar);
  }
}
