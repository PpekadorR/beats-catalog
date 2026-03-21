function playBeat(src,title,meta){

const player = document.getElementById("audioPlayer")
const source = document.getElementById("audioSource")

source.src = src

player.load()
player.play()

document.getElementById("title").innerText = title
document.getElementById("meta").innerText = meta

}
