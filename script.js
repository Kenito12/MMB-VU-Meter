//Inspired by https://editor.p5js.org/manno/sketches/aqwj6Y9qW VU meter 

// size of the rect representing volume
let meterSize = 0;
// the max level registered
let maxVol = 0;
let mic;
let VU;
let meterColor;
let txtAlert;
function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    cnv.id('meter')
}


function draw() {
    background(220);
    
    frameRate(120)

    let volume = mic.getLevel(0);
    
    // set width of rect representing volume equal to: 
    // the current volume * width OR previous width -1 (whichever is larger)
    meterSize = max(volume * height, meterSize -5);
    VU = rect(0, height, windowWidth, -meterSize * 3);
    if(volume > 0.220){
        meterColor = "red"
        txtAlert = "Too Loud"
    }
    else if(volume <= 0.220 && volume >= 0.150){
        meterColor = "yellow"
        txtAlert = "Loud"
    }
    else{
        meterColor = 'green'
        txtAlert = "OK"
    }
    fill(meterColor)
    noStroke()
  
    // output numerical value of highest reading
    maxVol = max(maxVol, volume);
    text(volume, 10, 10);
    text(txtAlert, 20,20);


  //resize Canvas when window change
    windowResized = () => {
    resizeCanvas(windowWidth, windowHeight)
}
}