console.log('Lets write JavaScript');
let currentSong = new Audio();


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch("http://192.168.0.105:3000/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let  songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}


const playMusic = (track) => {
    //let audio = new Audio ("/songs/" + track)
    currentSong.src = "/songs/" + track
     // audio.play()
    currentSong.play()
      play.src = "plybarimg/pause.png"
  
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    
}


async function main (){
    // get the list of song
      let songs = await getSongs()
     // Show all the songs in the playlist
     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
     for (const song of songs) {
         songUL.innerHTML = songUL.innerHTML + `<li>
               <img src="plybarimg/music.png" height="30px" class="invert ">
               <div class="info">
                 <div>${song.replaceAll("%20", " ")}</div>
                 <div>Neel Singh</div>
               </div>
               <div class="playnow  side-plybtn">
                 <img src="plybarimg/play-button.png" height="30px" class="invert">
               </div>
             </li>`;
     }

     // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
           console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })

     // Attach an event listener to play, next and previous
     play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "plybarimg/pause.png"
        }
        else {
            currentSong.pause()
            play.src = "plybarimg/play.png"
        }
    })
   
     // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

}

main();