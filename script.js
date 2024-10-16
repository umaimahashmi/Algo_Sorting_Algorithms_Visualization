function buttonAction1() {
  window.location.href = "a_insertionsort.html"; // Replace with the path to your new HTML page
}

function buttonAction2() {
  window.location.href = "b_bubblesort.html"; // Replace with the path to your new HTML page
}

function buttonAction3() {
  window.location.href = "c_selectionsort.html"; // Replace with the path to your new HTML page
}

function buttonAction4() {
  window.location.href = "d_mergesort.html"; // Replace with the path to your new HTML page
}

function buttonAction5() {
  window.location.href = "e_quicksort.html"; // Replace with the path to your new HTML page
}

function buttonAction6() {
  window.location.href = "f_heapsort.html"; // Replace with the path to your new HTML page
}

function buttonAction7() {
  window.location.href = "g_countsort.html"; // Replace with the path to your new HTML page
}

function buttonAction8() {
  window.location.href = "h_radixsort.html"; // Replace with the path to your new HTML page
}

function buttonAction9() {
  window.location.href = "i_bucketsort.html"; // Replace with the path to your new HTML page
}

function buttonAction10() {
  window.location.href = "visualization.html"; // Replace with the path to your new HTML page
}

// Data for each array size
const labels = ["100", "500", "1000", "5000", "10000", "50000", "100000"];

// More distinguishable colors and different line styles for each dataset
const data = {
  labels: labels,
  datasets: [
    {
      label: "Bubble Sort",
      data: [1.21, 31.27, 131.38, 3474.33, 15496.2, 378671.47, 1505330.68],
      borderColor: "#FF0000", // Red
      backgroundColor: "rgba(255, 0, 0, 0.3)",
      borderWidth: 3,
    },
    {
      label: "Selection Sort",
      data: [0.43, 10.83, 48.89, 1072.35, 4689.64, 117515.34, 476126.37],
      borderColor: "#0000FF", // Blue
      backgroundColor: "rgba(0, 0, 255, 0.3)",
      borderDash: [5, 5],
      borderWidth: 3,
    },
    {
      label: "Insertion Sort",
      data: [0.04, 0.16, 0.2, 1.05, 2.06, 18.7, 33.97],
      borderColor: "#32CD32", // Lime Green
      backgroundColor: "rgba(50, 205, 50, 0.3)",
      borderWidth: 3,
    },
    {
      label: "Merge Sort",
      data: [0.26, 1.37, 2.65, 16.18, 32.73, 177.59, 378.11],
      borderColor: "#FFA500", // Orange
      backgroundColor: "rgba(255, 165, 0, 0.3)",
      borderDash: [10, 5],
      borderWidth: 3,
    },
    {
      label: "Quick Sort",
      data: [0.14, 0.53, 0.95, 3.98, 8.43, 42.18, 77.36],
      borderColor: "#800080", // Purple
      backgroundColor: "rgba(128, 0, 128, 0.3)",
      borderWidth: 3,
    },
    {
      label: "Heap Sort",
      data: [0.36, 2.21, 4.82, 29.66, 74.84, 370.42, 817.82],
      borderColor: "#00CED1", // Dark Turquoise
      backgroundColor: "rgba(0, 206, 209, 0.3)",
      borderWidth: 3,
    },
    {
      label: "Count Sort",
      data: [0.04, 0.15, 0.3, 1.33, 2.63, 15.55, 28.17],
      borderColor: "#FFD700", // Gold
      backgroundColor: "rgba(255, 215, 0, 0.3)",
      borderDash: [2, 2],
      borderWidth: 3,
    },
    {
      label: "Bucket Sort",
      data: [0.06, 0.12, 0.19, 0.73, 1.3, 6.87, 12.23],
      borderColor: "#DC143C", // Crimson
      backgroundColor: "rgba(220, 20, 60, 0.3)",
      borderWidth: 3,
    },
    {
      label: "Radix Sort",
      data: [0.11, 0.8, 1.62, 9.73, 18.28, 85.75, 166.49],
      borderColor: "#4682B4", // Steel Blue
      backgroundColor: "rgba(70, 130, 180, 0.3)",
      borderDash: [15, 5],
      borderWidth: 3,
    },
  ],
};

// Config for the chart
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Move the legend below for better visibility
        labels: {
          font: {
            size: 14, // Increase font size
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Array Size",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time Taken (ms)",
        },
        beginAtZero: true,
        type: "logarithmic", // Logarithmic scale for better comparison of large differences
      },
    },
  },
};

// Render the chart
const sortingChart = new Chart(document.getElementById("sortingChart"), config);
