const wavesurfer = WaveSurfer.create({

container:"#waveform",
waveColor:"#444",
progressColor:"#1db954",
height:80,
responsive:true

})

const tracks = document.querySelectorAll(".track")
const playBtn = document.getElementById("playBtn")

const title = document.getElementById("title")
const meta = document.getElementById("meta")
const time = document.getElementById("time")

let loaded = false

tracks.forEach(track=>{

track.addEventListener("click",()=>{

tracks.forEach(t=>t.classList.remove("active"))
track.classList.add("active")

const src = track.dataset.src

title.innerText = track.dataset.title
meta.innerText = track.dataset.meta

loaded = false

wavesurfer.load(src)

})

})

wavesurfer.on("ready",()=>{

loaded = true
wavesurfer.play()
playBtn.innerText="⏸"

})

playBtn.addEventListener("click",()=>{

if(!loaded) return

if(wavesurfer.isPlaying()){

wavesurfer.pause()
playBtn.innerText="▶"

}else{

wavesurfer.play()
playBtn.innerText="⏸"

}

})

wavesurfer.on("audioprocess",()=>{

const current = wavesurfer.getCurrentTime()

let minutes = Math.floor(current/60)
let seconds = Math.floor(current%60)

if(seconds<10) seconds="0"+seconds

time.innerText = minutes + ":" + seconds

})
