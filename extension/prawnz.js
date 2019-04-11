element = document.getElementsByClassName("qtb4sn-2 iOpWuy")[0]
// element2 = document.getElementsByClassName("rhbaa2-2 ggsIRT")[0]
viz = '<div class="s17ivpdx-0 jAbabm" style="margin-bottom:20px"><div class="_ZhON3a3vplThB8NFwuJn"><div class="_2sggAEfRQLyoAl4J__5twU">Commenters\' Thoughts</div></div><canvas id="stackedBar"></canvas><div class="qcxaFzxDBtnkGs5hS18OZ" style="text-align:right; color:rgb(124, 124, 124); margin:10px;">Powered by PRAWn</div></div>'
element.insertAdjacentHTML('afterbegin',viz);

dataStacked = {
    labels: ["Target"],
    datasets: [{
        type: 'horizontalBar',
        label: 'In Favor',
        data: [250],
        backgroundColor: 'rgba(54, 162, 235, 1)'
    }, {
        type: 'horizontalBar',
        label: 'Against',
        data: [200],
        backgroundColor: 'rgba(255, 99, 132, 1)'
    }, {
        type: 'horizontalBar',
        label: 'None',
        data: [50],
        backgroundColor: 'rgba(255, 205, 86, 1)'
    }]
};

var ctx = document.getElementById('stackedBar').getContext('2d');

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
