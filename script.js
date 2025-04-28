// Pre-defined survey data and categories
const sleepCategories = ['0-4 hours', '4-6 hours', '6-8 hours', '8+ hours'];
// Counts from the uploaded survey PDF (parsed): current sleep vs at-home sleep
const currentCounts = [14, 29, 10, 2];
const homeCounts =    [ 1,  5, 15, 26];

// Update displayed sleep hours when slider moves
function updateSleepHours(val) {
  document.getElementById('sleepValue').textContent = val;
}

// Calculate and display the user's risk profile based on input hours
function calculateRisk() {
  const hours = parseFloat(document.getElementById('sleepHours').value);
  const riskDiv = document.getElementById('riskProfile');
  riskDiv.innerHTML = ''; // clear previous results

  // Prepare messages using the given real-world statistics
  let riskMsg = '';
  let memoryMsg = '';
  let cognitiveMsg = '';
  let emotionalMsg = '';

  // Anxiety/Depression risk
  if (hours < 6) {
    riskMsg = '<p class="high-alert">Your risk of anxiety and depression may be <strong>300% higher</strong> than optimal (per Matthew Walker, <em>Why We Sleep</em>).</p>';
  } else {
    riskMsg = '<p>Your anxiety/depression risk is closer to baseline (optimal at 8+ hours).</p>';
  }

  // Memory retention
  if (hours >= 8) {
    memoryMsg = '<p class="highlight">Memory retention is at peak (~<strong>+40%</strong> boost with 8+ hours of sleep).</p>';
  } else {
    memoryMsg = '<p>Sleep is below optimal; memory retention could improve with more rest.</p>';
  }

  // Cognitive performance
  if (hours < 7) {
    cognitiveMsg = '<p class="caution">Cognitive performance can drop by up to 25% with less than 7 hours of sleep.</p>';
  } else {
    cognitiveMsg = '<p>Cognitive performance remains near normal (not significantly impaired at 7+ hours).</p>';
  }

  // Emotional reactivity
  if (hours < 5) {
    emotionalMsg = '<p class="high-alert">Emotional reactivity may increase by ~60% after severe sleep deprivation.</p>';
  } else {
    emotionalMsg = '<p>Emotional stability is relatively better (risk spikes if sleep <5 hrs).</p>';
  }

  // Display the combined risk profile messages
  riskDiv.innerHTML = riskMsg + memoryMsg + cognitiveMsg + emotionalMsg;
}

// Setup charts once the page has loaded
window.onload = function() {
  // 1. Bar Chart: Student sleep patterns (current vs at-home)
  const ctx1 = document.getElementById('sleepChart').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: sleepCategories,
      datasets: [
        {
          label: 'Current Sleep (hours)',
          data: currentCounts,
          backgroundColor: '#1976d2'
        },
        {
          label: 'At-Home Sleep (hours)',
          data: homeCounts,
          backgroundColor: '#64b5f6'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Students' }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Survey: Current vs. At-Home Sleep Hours'
        }
      }
    }
  });

  // 2. Line Chart: Mental health risk vs sleep hours (illustrative curve)
  const ctx2 = document.getElementById('riskChart').getContext('2d');
  // Define hours and compute an illustrative risk value (0h -> very high risk)
  const hoursData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const riskData = hoursData.map(h => {
    if (h <= 8) {
      return (8 - h) * 50;  // example scaling: 8h=0%, 6h=100%, 4h=200%, etc.
    } else {
      return 0;
    }
  });
  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: hoursData.map(h => h + 'h'),
      datasets: [{
        label: 'Relative Risk of Mental Health Issues (%)',
        data: riskData,
        borderColor: '#d32f2f',
        backgroundColor: '#ffcdd2',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Relative Risk (%)' }
        },
        x: {
          title: { display: true, text: 'Sleep Hours' }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Mental Health Risk vs Sleep Hours'
        }
      }
    }
  });
};
