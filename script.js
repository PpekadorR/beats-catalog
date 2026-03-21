const audio = document.getElementById("audio")
const playBtn = document.getElementById("playBtn")

let playing = false

const tracks = [
{
src: "beats/beat1.mp3",
title: "Akwid Type",
meta: "94 BPM • C Minor • Boombap"
},
{
src: "beats/beat2.mp3",
title: "Boom Bap Classic",
meta: "92 BPM • G Minor • Boom Bap"
},
{
src: "beats/beat3.mp3",
title: "Trap Night",
meta: "150 BPM • D# Minor • Trap"
}
]

function loadTrack(index){

const track = tracks[index]

audio.src = track.src

document.getElementById("title").innerText = track.title
document.getElementById("meta").innerText = track.meta

audio.play().catch(()=>{})
playing = true
playBtn.innerText = "⏸ Pause"

}

playBtn.addEventListener("click",()=>{

if(!audio.src) return

if(playing){
audio.pause()
playBtn.innerText="▶ Play"
}else{
audio.play()
playBtn.innerText="⏸ Pause"
}

playing = !playing

})

window.onload = ()=>{
loadTrack(0)
}
