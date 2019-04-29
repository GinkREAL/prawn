baseURL = "http://localhost:8080/ai/article" //dev
//baseURL = "https://prawn.ml/ai/article" //prod

var pageurl = document.URL.split("/")[6];

const loadChart = (j) => {
    element = document.getElementsByClassName("RffBqG1xCvuy1r49wYhLr")[0] //regular
    if(element == null) element = document.getElementsByClassName("s1gwtmx8-2")[0] //overlay
    // div list
    //s1km3tr3-2 cqEWZA
    //s1gwtmx8-2
    //RffBqG1xCvuy1r49wYhLr s1gwtmx8-2 KpCIH
    viz = '<div class="s17ivpdx-0 jAbabm" style="margin-bottom:20px"><div class="_ZhON3a3vplThB8NFwuJn"><div class="_2sggAEfRQLyoAl4J__5twU">Commenters\' Thoughts</div></div><canvas id="stackedBar"></canvas><div class="qcxaFzxDBtnkGs5hS18OZ" style="text-align:right; color:rgb(124, 124, 124); margin:10px;">Powered by PRAWn</div></div>'
    element.insertAdjacentHTML('afterbegin',viz);

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
}

async function main() {
    console.log("PRAWN Starting")
    var response = await fetch(baseURL + "?article=" + pageurl)
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })

    console.log(response.status)
    if(response.status == 200){
        console.log("Status:200")
        loadChart(await response.json())
    } else if (response.status == 404){
        console.log("Status:404")
        var bd = new FormData()
        bd.append('article', pageurl)
        fetch(baseURL, {
            method: "POST",
            body: bd
        })
        .then((response) => {
            console.log("Request")
            console.log(JSON.stringify(bd))
            console.log(response)
        })
        .catch((error) => {
            console.log("Request error")
        })
        setTimeout(main, 7000)
    } else if (response.status == 208){
        console.log("Status:208")
        setTimeout(main, 7000)
    }
}

main()