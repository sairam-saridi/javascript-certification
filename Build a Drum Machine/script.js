const display = document.getElementById("display");
const pads = document.querySelectorAll(".drum-pad");

const playPad = pad =>{
  const audio = pad.querySelector(".clip");
  audio.currentTime = 0;
  audio.play();
  display.textContent = pad.dataset.sound;
  pad.classList.add("active");
  setTimeout(()=> {
    pad.classList.remove("active");
  },100);
}

pads.forEach((pad)=>{
  pad.addEventListener("click",()=>{
    playPad(pad);
  });
});


document.addEventListener("keydown",(event)=>{
 const key = event.key.toUpperCase();
 const audio = document.getElementById(key);
 if (!audio || !audio.classList.contains("clip")) {
    return;
  }
  const pad = audio.parentElement;
  playPad(pad);
});
