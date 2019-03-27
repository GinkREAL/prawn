articleid = '';

browser.tabs.executeScript({
    code: 'window.location.href'
}).then((url) => {
    articleid = url[0].split("/")[6]
    console.log(articleid)
    viz = false
    showViz = document.getElementById("show-viz")
    showBt  = document.getElementById("show-button")
    showViz.style.display = "none"
})

browser.tabs.executeScript({
    code: 'document.getElementsByClassName("s1okktje-0 eYgaub")[0].innerText'
}).then((title) => {
    console.log(title[0])
    document.getElementById('header_title').innerText = title[0]
})


async function requestData(){
    const booty = new FormData()
    booty.append("article", articleid)
    const data = await fetch('http://localhost:8080/ai/article',{
        method:'POST',
        mode: 'cors',
        body: booty
    })
    console.log(data)
    viz = true

    if (viz == false) {
        showBt.style.display = "block"
        showViz.style.display = "none"
    } 
    else {
        showBt.style.display = "none"
        showViz.style.display = "block"
    }
}

async function getData(){
}

document.addEventListener('DOMContentLoaded', function() {
    var bt = document.getElementById('request_bt')
    bt.addEventListener('click', requestData)
});
