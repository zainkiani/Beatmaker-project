class DrumKit{
    constructor(){
        this.pads= document.querySelectorAll(".pad")
        this.playBtn= document.querySelector(".play");
        this.kickAudio=document.querySelector(".kick-sound")
        this.snareAudio=document.querySelector(".snare-sound")
        this.hihatAudio=document.querySelector(".hihat-sound")
        this.currentKick = "./sounds/kick-808.wav"
        this.currentSnare = "./sounds/snare-808.wav"
        this.currentHihat = "./sounds/hihat-808.wav"
        this.index = 0;
        this.bpm = 250;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");

    }
    activePad(){
        this.classList.toggle("active");
        this.classList.toggle("animate");
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        
        //loop over the pads
        activeBars.forEach((bar) => {
            bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
        
        //check if pads are active
        if(bar.classList.contains("active")){
            //check which pad is active
            if(bar.classList.contains("kick-pad")){
                this.kickAudio.play();
                this.kickAudio.currentTime = 0;
            }
            if(bar.classList.contains("snare-pad")){
                this.snareAudio.play();
                this.snareAudio.currentTime = 0;
            }
            if(bar.classList.contains("hihat-pad")){
                this.hihatAudio.play();
                this.hihatAudio.currentTime = 0;
            }
        }
    });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        // check if its playing
        if(!this.isPlaying){
       this.isPlaying =  setInterval(()=>{
            this.repeat();
        },interval);}
        else{
            //clear interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }
        else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
       
    }

    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        // console.log(selectionValue);
        switch(selectionName){
            case "kick-select":
            this.kickAudio.src = selectionValue;
            break;

            case "snare-select":
            this.snareAudio.src = selectionValue;
            break;

            case "hihat-select":
            this.hihatAudio.src = selectionValue;
            break;
        }
    }

    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        
        
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                
                case "1":
                    this.snareAudio.volume = 0;
                    break;

                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                
                case "1":
                    this.snareAudio.volume = 1;
                    break;

                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText  = document.querySelector(".tempo-number");
        tempoText.innerText = e.target.value;  
    }
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
          this.start();
        }
      }

}

const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach(pad=>{
    pad.addEventListener("click", drumKit.activePad)
    pad.addEventListener("animationend", function(){
        this.style.animation  = "";
        this.classList.remove("animate");
    })
})

drumKit.playBtn.addEventListener("click",function(){
    drumKit.updateBtn();
    drumKit.start();
})

drumKit.selects.forEach(select =>{
    select.addEventListener("change",function(e){
        drumKit.changeSound(e);
    })
})

drumKit.muteBtns.forEach(btn =>{
    btn.addEventListener("click",(e)=>{
        drumKit.mute(e);
    })
})

drumKit.tempoSlider.addEventListener("input", (e)=>{
    drumKit.changeTempo(e);
})
drumKit.tempoSlider.addEventListener("change", function(e) {
    drumKit.updateTempo(e);
  });