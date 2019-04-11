target = "Target"

dataStacked = {
    labels: ["Stance"],
    datasets: [{
        type: 'horizontalBar',
        label: 'In Favor',
        data: [10],
        backgroundColor: 'rgba(54, 162, 235, 1)'
    }, {
        type: 'horizontalBar',
        label: 'Against',
        data: [20],
        backgroundColor: 'rgba(255, 99, 132, 1)'
    }, {
        type: 'horizontalBar',
        label: 'None',
        data: [30],
        backgroundColor: 'rgba(255, 205, 86, 1)'
    }]
}

dataFreq = [10, 20, 30]
dataCount = [40, 10, 10]
dataBin = [25, 30, 5]
dataTFIDF = [18, 22, 20]

var ctx = document.getElementById('stackedBar').getContext('2d');
var ctx1 = document.getElementById('freq').getContext('2d');
var ctx2 = document.getElementById('count').getContext('2d');
var ctx3 = document.getElementById('binary').getContext('2d');
var ctx4 = document.getElementById('tfidf').getContext('2d');

var stackedBar = new Chart(ctx, {
    type: 'horizontalBar',
    data: dataStacked,
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});

var freq = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: dataFreq,
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
    },
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
    data: {
        datasets: [{
            data: dataCount,
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
    },
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
    data: {
        datasets: [{
            data: dataBin,
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
    },
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
    data: {
        datasets: [{
            data: dataTFIDF,
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
    },
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

