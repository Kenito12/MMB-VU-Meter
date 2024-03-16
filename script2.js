//Particle system and sound reactive waveform are inspired by this code project
//https://editor.p5js.org/jw6497/sketches/I0l_G3Kzi


let fft;
let mic
let particles = [];
let result;// store the result of volume
let color;//store the value of color of the VU meter

//Using DOM to call page ID
let goButton = document.getElementById("goButton")
let VUMeter = document.getElementById("VUMeter")
let goBut = document.getElementById("goBut")

//Button action

//set z index of the page when the button is clicked
goBut.onclick = () => {
    VUMeter.style.zIndex = "1";
    goButton.style.zINdex = "-1";
}

// Set up environment for P5 to run
function setup() {
    let Vmeter = createCanvas(windowWidth, windowHeight);
    Vmeter.parent('VUMeter')
    Vmeter.id('Canvas')
    angleMode(DEGREES);
    mic = new p5.AudioIn()
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic)
}


// P5 draw function (run the code in this method in loop in corespond to the FPS setting of the page)
function draw(){

    let volume = mic.getLevel()
    volumeChecker(volume)

    background("#0a0b1d");
    fill("#ffffff")
    textSize(30)
    text(result, width / 2, height / 2)
    textAlign(CENTER);
    
    
    stroke(color);
    noFill();
    
    translate(width * 0.5, height * 0.5);
    
    fft.analyze();
    amp = fft.getEnergy("mid");
    console.log(amp)
    
    
    //waveform setting include the behavior and shape of the wave sound
    let wave = fft.waveform();
    for (let t = -1; t <= 1; t += 2) {
        beginShape();
        strokeWeight(4);
        for (var i = 0; i <= 180; i += 0.5) {
            var index = floor(map(i, 0, 180, 0, wave.length - 1));
            var r = map(wave[index], -1, 1, 150, 300);
            var x = r * sin(i) * t;
            var y = r * cos(i) * t;
            vertex(x, y);
        }
        endShape();
    }
    
    //create particles using the behavior from the particles class
    var p = new Particles();
    particles.push(p);
    for (var i = 0; i < particles.length; i++) {
        if (!particles[i].edge()) {
            particles[i].update(amp < 10);
            particles[i].show();
        } else {
            particles.splice(i, 1);
        }
    }

    //Automatically resize the Canvas when window resized. 
    windowResized = () => {
        resizeCanvas(windowWidth, windowHeight);
    }
}


// Class Definition for particle class includes behavior and color
class Particles {
    constructor() {
        this.pos = p5.Vector.random2D().mult(250);
        this.speed = createVector(0, 0);
        this.acc = this.pos.copy().mult(random(0.0001, 0.0001));
        this.w = random(10, 15);
        this.col = [random(200, 255), random(200, 255), random(200, 255)];
    }
    update(cond) {
        this.speed.add(this.acc);
        this.pos.add(this.speed);
        if (cond) {
            this.pos.add(this.speed);
      this.pos.add(this.speed);
      this.pos.add(this.speed);
    }
  }
  //delete the particles when they off the cavans
  edge() {
    if (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
  show() {
    noStroke();
    fill(color);
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}


// When the funciton is called, take in getlevel as parameter and put it into a condition to identify the result
let volumeChecker = (volume) => {
    if(volume > 0.08){
        // too loud
       result = "Too loud"
        color = "#930B0B"
    }
    else if(volume < 0.08 && volume >= 0.001){
        //mid loud
       result = "Exceptable"
        color = "#93610B"
    }
    else{
        //perfect
       result = "Pefect"
        color = "#1CB982"
    }
}
