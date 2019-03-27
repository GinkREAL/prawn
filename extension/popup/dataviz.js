target = "Target"

data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)'
        ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Against',
        'In Favor',
        'None'
    ]
};


var ctx1 = document.getElementById('freq').getContext('2d');
var ctx2 = document.getElementById('count').getContext('2d');
var ctx3 = document.getElementById('binary').getContext('2d');
var ctx4 = document.getElementById('tfidf').getContext('2d');

var freq = new Chart(ctx1, {
    type: 'doughnut',
    data: data,
    options: {
        title: {
            display: true,
            text: 'Frequency',
            position: 'bottom'
        },

        legend: {
            display: true,
            position: 'left',
            labels: {
                boxWidth: 15
            }
        }
    }
});

var count = new Chart(ctx2, {
    type: 'doughnut',
    data: data,
    options: {
        title: {
            display: true,
            text: 'Count',
            position: 'bottom'
        },

        legend: {
            display: true,
            position: 'left',
            labels: {
                boxWidth: 15
            }
        }
    }
});

var binary = new Chart(ctx3, {
    type: 'doughnut',
    data: data,
    options: {
        title: {
            display: true,
            text: 'Binary',
            position: 'bottom'
        },

        legend: {
            display: true,
            position: 'left',
            labels: {
                boxWidth: 15
            }
        }
    }
});

var tfidf = new Chart(ctx4, {
    type: 'doughnut',
    data: data,
    options: {
        title: {
            display: true,
            text: 'TFIDF',
            position: 'bottom'
        },

        legend: {
            display: true,
            position: 'left',
            labels: {
                boxWidth: 15
            }
        }
    }
});

