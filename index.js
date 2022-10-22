var content = [ "danau.webp", 
                "gunung-batur.jpg", 
                "gunung.jpg", 
                "hutan.jpg", 
                "lembah.webp", 
                "pantai-sunset.webp", 
                "pantai.jpg", 
                "sungai.jpg"]
var contents = content.concat(content)

var right = document.querySelectorAll(".right")[0]

function random(){
    for(i = 0; i < 16; i++){
        var temp = contents[0]
        var randomNum = Math.floor(Math.random()*16)
        contents[0] = contents[randomNum]
        contents[randomNum] = temp
    }
}

random()

// membuat kelas
for(i = 0; i < 16; i++){
    var newBox = document.createElement("div")
    newBox.className = "box"
    right.appendChild(newBox)

    var newFront = document.createElement("div")
    newFront.className = "front"
    newBox.appendChild(newFront)

    var newText = document.createElement("div")
    newText.className = "text"
    newFront.appendChild(newText)

    var newText2 = document.createElement("div")
    newText2.className = "text2"
    newFront.appendChild(newText2)
}

var box = document.getElementsByClassName("box")
var text = document.getElementsByClassName("text")
var text2 = document.getElementsByClassName("text2")

// memasukkan tulisan ke box
for(i = 0; i < 16; i++){
    text2[i].innerHTML = i
}

var front = document.getElementsByClassName("front")

var abc = 0
var lastTextContent1 = 0
var lastTextContent2 = 0

function turn(){

    var x = right.innerHTML.search("flip")
    if(x > -1 && abc == 0){
        return false
    }

    var textContent = this.innerHTML
    if(abc == 0){

        if(text[textContent].innerHTML == "true"){
            return false
        }

        front[textContent].style.transform = "rotateY(180deg)"
        front[textContent].style.backgroundImage = "url('game-picture/" + contents[textContent] +"')"
        front[textContent].style.backgroundSize = "cover"        
        front[textContent].classList.add("flip")
        abc++
        lastTextContent1 = textContent

    } else if(abc == 1){

        if(textContent == lastTextContent1){
            return false
        }

        front[textContent].style.transform = "rotateY(180deg)"
        front[textContent].style.backgroundImage = "url('game-picture/" + contents[textContent] +"')"
        front[textContent].style.backgroundSize = "cover"        
        front[textContent].classList.add("flip")
        lastTextContent2 = textContent
        abc = 0

        if (contents[lastTextContent1] == contents[lastTextContent2]){

            function truecard(){
                document.querySelectorAll(".flip")[0].style.transform = "rotateY(0deg)"
                document.querySelectorAll(".flip")[1].style.transform = "rotateY(0deg)"
                front[lastTextContent1].style.backgroundImage = "url(kayu1.jpg)"
                front[lastTextContent1].style.backgroundSize = "auto"
                front[lastTextContent2].style.backgroundImage = "url(kayu1.jpg)"
                front[lastTextContent2].style.backgroundSize = "auto"
                document.querySelectorAll(".flip")[1].classList.add("true")
                document.querySelectorAll(".flip")[0].classList.add("true")
                document.querySelectorAll(".flip")[1].classList.remove("flip")
                document.querySelectorAll(".flip")[0].classList.remove("flip")
                text[lastTextContent1].innerHTML = "true"
                text[lastTextContent2].innerHTML = "true"
            }
        
            setTimeout(truecard,1000)

        } else {

            function turnback(){
                document.querySelectorAll(".flip")[0].style.transform = "rotateY(0deg)"
                document.querySelectorAll(".flip")[1].style.transform = "rotateY(0deg)"
                front[lastTextContent1].style.backgroundImage = "url(kayu1.jpg)"
                front[lastTextContent1].style.backgroundSize = "auto"
                front[lastTextContent2].style.backgroundImage = "url(kayu1.jpg)"
                front[lastTextContent2].style.backgroundSize = "auto"
                document.querySelectorAll(".flip")[1].classList.remove("flip")
                document.querySelectorAll(".flip")[0].classList.remove("flip")
            }
            
            setTimeout(turnback,1000)
        }

    }

}



// timer
var timer = document.querySelectorAll(".timer")[0]

var menit = 0
var detik = 1
var stopcheck = 0

function time(){

    stopcheck = 0
    for(i = 0; i < 16; i++){
        if(text[i].innerHTML == "true"){
            stopcheck++
        }
    }

    if(stopcheck > 15){

        right.style.display = "none"
        document.querySelectorAll(".left")[0].style.width = "100%"
        timer.style.height = "100%"
        
        var test = true
        setInterval(function blink(){
         if (test === true){
            timer.style.color = "rgb(85, 42, 0)"
            test = false
         } else{
            timer.style.color = "rgb(209, 0, 0)"
            test = true
         }
        },500)
        
    } else {

        var strMenit = menit.toString()
        var strDetik = detik.toString()

        if(strMenit.length == 1){
            strMenit = "0" + strMenit
        }
        
        if(strDetik.length == 1){
            strDetik = "0" + strDetik
        }
        
        timer.innerHTML = strMenit + " : " + strDetik
        detik++

        if(detik == 60){
            menit++
            detik = 0
        }

    }
    
}

function restart(){
    window.location.reload()
}

function start(){
    var myInterval = setInterval(time,1000)

    for(i = 0; i < 16; i++){
        box[i].style.opacity = "100%"
    }

    document.querySelectorAll(".block")[0].style.display = "none"

    button.innerHTML = "Restart"
    button.style.backgroundColor = "rgb(209, 0, 0)"
    button.onclick = restart

}

var button = document.querySelectorAll(".button")[0]

button.onclick = start


// fungsi saat klik gambar
for(i = 0; i < 16; i++){
    text2[i].onclick = turn
}

