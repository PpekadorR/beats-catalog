const player = new Plyr('#player')

const tracks = document.querySelectorAll(".track")

const title = document.getElementById("title")
const meta = document.getElementById("meta")

tracks.forEach(track=>{

track.addEventListener("click",()=>{

const src = track.dataset.src

player.source = {
type: 'audio',
sources: [
{
src: src,
type: 'audio/mp3',
},
],
}

title.innerText = track.dataset.title
meta.innerText = track.dataset.meta

player.play()

})

})
