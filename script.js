// size of the rect representing volume
let meterSize = 0;
// the max level registered
let maxVol = 0;
let mic;
let VU;
let meterColor;
function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    cnv.id('meter')
}


function draw() {
    background(220);
    
    // contrary to online documentation, this returns values way above 1.0 in Safari
    // (with or without the smoothing parameter)
    let volume = mic.getLevel();
    
    // set width of rect representing volume equal to: 
    // the current volume * width OR previous width -1 (whichever is larger)
    meterSize = max(volume * height, meterSize -5);
    VU = rect(0, height, windowWidth, -meterSize * 3);
    if(volume > 0.220){
        meterColor = "red"
    }
    else if(volume <= 0.220 && volume >= 0.150){
        meterColor = "yellow"
    }
    else{
        meterColor = 'green'
    }
    fill(meterColor)
    noStroke()
  
    // output numerical value of highest reading
    maxVol = max(maxVol, volume);
    text(volume, 10, 10);


  //resize Canvas when window change
    windowResized = () => {
    resizeCanvas(windowWidth, windowHeight)
}
}