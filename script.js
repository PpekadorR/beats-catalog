const audio = document.getElementById("audio")

const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")

const progress = document.getElementById("progress")
const volume = document.getElementById("volume")

const title = document.getElementById("title")
const meta = document.getElementById("meta")

const current = document.getElementById("current")
const duration = document.getElementById("duration")

const tracklistDiv = document.getElementById("tracklist")
const search = document.getElementById("search")

let playing = false
let currentIndex = 0

const tracks = [
{
title:"Akwid Type",
meta:"94 BPM • G Minor • Boom Bap",
src:"beats/beat1.mp3"
},
{
title:"Silent Pain",
meta:"90 BPM • B Minor • Boom Bap",
src:"beats/beat2.mp3"
},
{
title:"The Low End Swamp",
meta:"86 BPM • F# Minor • Boom Bap",
src:"beats/beat3.mp3"
},
{
title:"Flow 2000",
meta:"95 BPM • F Minor • Reggaeton",
src:"beats/beat4.mp3"
}
]

function renderTracks(filter=""){

tracklistDiv.innerHTML=""

tracks.forEach((track,index)=>{

if(!track.title.toLowerCase().includes(filter.toLowerCase())) return

const div=document.createElement("div")
div.classList.add("track")

if(index===currentIndex) div.classList.add("active")

div.innerHTML=`
<strong>${track.title}</strong>
<span>${track.meta}</span>
`

div.onclick=()=>loadTrack(index)

tracklistDiv.appendChild(div)

})

}

function loadTrack(index){

const track=tracks[index]

currentIndex=index

audio.src=track.src

title.innerText=track.title
meta.innerText=track.meta

audio.play().catch(()=>{})

playing=true
playBtn.innerText="⏸"

renderTracks(search.value)

}

playBtn.onclick=()=>{

if(!audio.src) return

if(playing){
audio.pause()
playBtn.innerText="▶"
}else{
audio.play()
playBtn.innerText="⏸"
}

playing=!playing

}

nextBtn.onclick=()=>{
loadTrack((currentIndex+1)%tracks.length)
}

prevBtn.onclick=()=>{
loadTrack((currentIndex-1+tracks.length)%tracks.length)
}

audio.addEventListener("timeupdate",()=>{

let cur=audio.currentTime
let dur=audio.duration

if(!isNaN(dur)){

progress.value=(cur/dur)*100

let cm=Math.floor(cur/60)
let cs=Math.floor(cur%60)
let dm=Math.floor(dur/60)
let ds=Math.floor(dur%60)

if(cs<10) cs="0"+cs
if(ds<10) ds="0"+ds

current.innerText=cm+":"+cs
duration.innerText=dm+":"+ds

}

})

progress.addEventListener("input",()=>{
audio.currentTime=(progress.value/100)*audio.duration
})

volume.addEventListener("input",()=>{
audio.volume=volume.value
})

audio.addEventListener("ended",()=>{
nextBtn.click()
})

search.addEventListener("input",(e)=>{
renderTracks(e.target.value)
})

window.onload=()=>{
volume.value=0.7
audio.volume=0.7
renderTracks()
loadTrack(0)
}
