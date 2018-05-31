console.log("js file is loading....");
document.getElementById("search-input").addEventListener('keypress', (e)=> {
    let key = e.keyCode;
    let str = document.getElementById("search-input").value;
    let regex = /(www.)?(\w+\.\w+)(\/\w+)*/;
    console.log("this junk is working!");
    if (key === 13){
        if (regex.test(str) ==! null){
            console.log('not null');
            window.location.href = `/new/${str}`;
        }
        else {
            console.log('its null')
        }
    }
})

function submit(){
    let str = document.getElementById("search-input").value;
    
}

function shorten(str){
    //go use MongoDB to shorten the webpage!
}

