

//element = document.getElementsByClassName("qtb4sn-2 iOpWuy")[0]
element = document.getElementsByClassName("RffBqG1xCvuy1r49wYhLr")[0]
// element2 = document.getElementsByClassName("rhbaa2-2 ggsIRT")[0]
viz = '<div class="s17ivpdx-0 jAbabm" style="margin-bottom:20px"><div class="_ZhON3a3vplThB8NFwuJn"><div class="_2sggAEfRQLyoAl4J__5twU">Commenters\' Thoughts</div></div><canvas id="stackedBar"></canvas><div class="qcxaFzxDBtnkGs5hS18OZ" style="text-align:right; color:rgb(124, 124, 124); margin:10px;">Powered by PRAWn</div></div>'
element.insertAdjacentHTML('afterbegin',viz);

const articlestring = "76rjtv"
console.log("ey")
fetch('http://localhost:8080/ai/article?article=76rjtv')
    .then((response) => {
        return response.json()
    }, (error) => {
        console.log(error)
    })
    .then((j) => {
        console.log(j)

        dataStacked = {
            labels: ["Target"],
            datasets: [{
                type: 'horizontalBar',
                label: 'In Favor',
                data: [j.commentsFavoring],
                backgroundColor: 'rgba(54, 162, 235, 1)'
            }, {
                type: 'horizontalBar',
                label: 'Against',
                data: [j.commentsAgainst],
                backgroundColor: 'rgba(255, 99, 132, 1)'
            }, {
                type: 'horizontalBar',
                label: 'None',
                data: [j.commentsNeutral],
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
    })