loading = 0;
loaded = 0;

if(window.localStorage.getItem('url') != null) {
    spliturl = window.localStorage.getItem('url').split("/")
    titleArr = document.getElementsByClassName('s1okktje-0 eYgaub')
    title = titleArr[0]
    document.getElementById('main').innerHTML = spliturl[6]
    document.getElementById('title').innerHTML = titleArr.length
    document.getElementById('debug').innerHTML = window.localStorage.getItem('url')
}

loadz = (urlstring) => {
    console.log(urlstring)
    document.getElementById('loader').innerHTML = "<h3>Loading" + '.'.repeat(loading) + "</h3>"
    if(++loading > 3) {
        loading = 0
    }
    console.log(loaded)
    if(++loaded > 6){
        document.getElementById('loader').innerHTML= "<h3>Done Loading</h3>"
        setTimeout(()=>{
            document.getElementById('loader').innerHTML = ""
        }, 1000)
        window.localStorage.setItem('url', urlstring)
        document.getElementById('main').innerHTML = urlstring.split("/")[6]
        document.getElementById('debug').innerHTML = urlstring
    } else {
        setTimeout(loadz(urlstring), 50000)
    }
}

browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    if(window.localStorage.getItem('url') != tabs[0].url||
        window.localStorage.getItem('url') == null) {
        loadz(tabs[0].url)
    }
}, (error) => {
    document.getElementById('debug').innerHTML = '<h3 style="color:red;">Error<h3>'
})
