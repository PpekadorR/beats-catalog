const audio = document.getElementById("audio")

const tracks = [
{
src: "beats/beat1.mp3",
title: "Dark Drill Beat",
meta: "140 BPM • C Minor • Drill"
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

// CAMBIO CLAVE: asignar directo
audio.src = track.src

document.getElementById("title").innerText = track.title
document.getElementById("meta").innerText = track.meta

audio.play().catch(()=>{})

}

// cargar el primero al iniciar
window.onload = ()=>{
loadTrack(0)
}
