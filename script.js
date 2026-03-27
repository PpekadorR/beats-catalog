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
const genreFilter = document.getElementById("genreFilter")

let playing = false
let currentIndex = 0

const tracks = [
{
title:"Akwid Type",
meta:"94 BPM • G Minor • Boom Bap",
genre:"Rap",
src:"beats/beat1.mp3"
},
{
title:"Melancholiah",
meta:"87 BPM • C Minor • Boom Bap",
genre:"Rap",
src:"beats/beat8.mp3"
},
{
title:"Silent Pain",
meta:"90 BPM • B Minor • Boom Bap",
genre:"Rap",
src:"beats/beat2.mp3"
},
{
title:"The Low End Swamp",
meta:"86 BPM • F# Minor • Boom Bap",
genre:"Rap",
src:"beats/beat3.mp3"
},
{
title:"Ghost Chords",
meta:"89 BPM • F# Minor • Boom Bap",
genre:"Rap",
src:"beats/beat5.mp3"
},
{
title:"Key Pressure",
meta:"89 BPM • E Minor • Boom Bap",
genre:"Rap",
src:"beats/beat6.mp3"
},
{
title:"Flow 2000",
meta:"95 BPM • F Minor • Reggaeton",
genre:"Reggaeton",
src:"beats/beat4.mp3"
},
{
title:"Heart in 808",
meta:"143 BPM • B Major • Trap",
genre:"Trap",
src:"beats/beat7.mp3"
}
]

// 🔥 ORDEN PERSONALIZADO
const order = ["Rap", "Reggaeton", "Trap"]

function renderTracks(){

const text = search.value.toLowerCase()
const genre = genreFilter.value

tracklistDiv.innerHTML=""

const sortedTracks = [...tracks].sort((a,b)=>{

const aIndex = order.indexOf(a.genre)
const bIndex = order.indexOf(b.genre)

const aPriority = aIndex === -1 ? 999 : aIndex
const bPriority = bIndex === -1 ? 999 : bIndex

return aPriority - bPriority

})

sortedTracks.forEach((track)=>{

const index = tracks.indexOf(track)

const matchText = track.title.toLowerCase().includes(text)
const matchGenre = genre === "" || track.genre === genre

if(!matchText || !matchGenre) return

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

renderTracks()

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

search.addEventListener("input",renderTracks)
genreFilter.addEventListener("change",renderTracks)

window.onload=()=>{
volume.value=0.7
audio.volume=0.7
renderTracks()
loadTrack(0)
}
