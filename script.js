const wavesurfer = WaveSurfer.create({

container:"#waveform",
waveColor:"#444",
progressColor:"#1db954",
height:80

})

const tracks = document.querySelectorAll(".track")
const playBtn = document.getElementById("playBtn")

const title = document.getElementById("title")
const meta = document.getElementById("meta")
const time = document.getElementById("time")

let playing=false

tracks.forEach(track=>{

track.addEventListener("click",()=>{

tracks.forEach(t=>t.classList.remove("active"))
track.classList.add("active")

const src = track.dataset.src

wavesurfer.load(src)

title.innerText = track.dataset.title
meta.innerText = track.dataset.meta

})

})

playBtn.addEventListener("click",()=>{

if(!wavesurfer.isPlaying()){

wavesurfer.play()
playBtn.innerText="⏸"

}else{

wavesurfer.pause()
playBtn.innerText="▶"

}

})

wavesurfer.on("audioprocess",()=>{

let current = wavesurfer.getCurrentTime()

let minutes = Math.floor(current/60)
let seconds = Math.floor(current%60)

if(seconds<10)seconds="0"+seconds

time.innerText=minutes+":"+seconds

})
