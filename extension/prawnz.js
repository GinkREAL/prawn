//baseURL = "http://localhost:8080/ai/article" //dev
baseURL = "https://prawn.ml/ai/article" //prod

var pageurl = document.URL.split("/")[6];

const loadChart = (j) => {
    element = document.getElementsByClassName("RffBqG1xCvuy1r49wYhLr")[0] //regular
    if(element == null) element = document.getElementsByClassName("s1gwtmx8-2")[0] //overlay, probably doesnt work anyway
    // div list
    //s1km3tr3-2 cqEWZA
    //s1gwtmx8-2
    //RffBqG1xCvuy1r49wYhLr s1gwtmx8-2 KpCIH
    viz = '<div class="' + element.children[0].attributes.class.textContent
    viz += '" style="margin-bottom:20px"><div class="_ZhON3a3vplThB8NFwuJn"><div class="_2sggAEfRQLyoAl4J__5twU">Commenters\' Thoughts</div></div><canvas id="stackedBar"></canvas><div class="qcxaFzxDBtnkGs5hS18OZ" style="text-align:right; color:rgb(124, 124, 124); margin:10px;">Powered by PRAWn</div></div>'
    element.insertAdjacentHTML('afterbegin',viz);

    dataStacked = {
        labels: [],
        datasets: [{
            label: 'In Favor',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 1)'
        }, {
            label: 'Against',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)'
        }, {
            label: 'None',
            data: [],
            backgroundColor: 'rgba(255, 205, 86, 1)'
        }]
    };

    console.log(j.results.length)
    for (i = 0 ; i < j.results.length ; i++){
        dataStacked.labels.push(j.results[i].target)
        dataStacked.datasets[0].data.push(j.results[i].commentsFavoring)
        dataStacked.datasets[1].data.push(j.results[i].commentsAgainst)
        dataStacked.datasets[2].data.push(j.results[i].commentsNeutral)
    }

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