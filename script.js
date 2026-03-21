const audio = document.getElementById("audio")

const title = document.getElementById("title")
const meta = document.getElementById("meta")

const current = document.getElementById("current")
const duration = document.getElementById("duration")

const tracks = document.querySelectorAll(".track")

let currentIndex = 0

function loadTrack(index){

const track = tracks[index]

tracks.forEach(t=>t.classList.remove("active"))
track.classList.add("active")

audio.src = track.dataset.src

title.innerText = track.dataset.title
meta.innerText = track.dataset.meta

audio.load()
audio.play()

currentIndex = index

}

tracks.forEach((track,index)=>{

track.addEventListener("click",()=>{

loadTrack(index)

})

})

audio.addEventListener("timeupdate",()=>{

let cur = audio.currentTime
let dur = audio.duration

if(!isNaN(dur)){

let cm = Math.floor(cur/60)
let cs = Math.floor(cur%60)

let dm = Math.floor(dur/60)
let ds = Math.floor(dur%60)

if(cs<10) cs="0"+cs
if(ds<10) ds="0"+ds

current.innerText = cm+":"+cs
duration.innerText = dm+":"+ds

}

})

audio.addEventListener("ended",()=>{

let next = currentIndex + 1

if(next < tracks.length){
loadTrack(next)
}

})

/* carga el primero automáticamente */
loadTrack(0)
