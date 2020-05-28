// Initialize game and start.
var game = new Game();
function init(){
    if(game.init()){
        game.start();
    }
}

// Creating drawable object. This will be base oject for all drawable objects in the game.
function Drawable() {
    this.init = function(x, y, width, height)  {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    // This is our draw function
    this.draw = function(){
    }
    this.move = function(){
    }
}


// object to hold all images for the game. This function insures images are only ever created once.
var imageRepo = new function(){

    // Defining images.
    this.background = new Image();
    this.spaceship = new Image();
    this.bullet = new Image();
    
    // Ensuring all images have loaded before started the game 
    var numImages = 3;
    var numLoaded = 0;

    function imageLoaded(){
        numLoaded++;
        if(numLoaded === numImages){
            window.init();
        }
    }
    this.background.onload = function(){
        imageLoaded();
    }
    this.spaceship.onload = function(){
        imageLoaded();
    }
    this.bullet.onload = function(){
        imageLoaded();
    }
    // setting image sources
    this.background.src = "./imgages/bg.png";
    this.spaceship.src = "./imgages/ship.png";
    this.bullet.src = "./imgages/bullet.png";
}
// console.log(imageRepo);


// This creates backround object. Background is drawn on canvas, and creats illusion that it is moving.
function Background(){
    this.speed = 1;

    // Define the draw function for our background drawable.
    this.draw = function(){
        // This is where were gonna pan the background.
        this.y += this.speed;
        this.context.drawImage(imageRepo.background, this.x, this.y);
        // Draw another image at the top edge of the first image.
        this.context.drawImage(imageRepo.background, this.x, this.y - this.canvasHeight);
        // checking to see if the image scrolled off the screen, if it did, reset.
        if (this.y >= this.canvasHeight){
            this.y = 0;
        }
    }
}
Background.prototype = new Drawable();

function Pool(maxSize){
    var size = maxSize;
    var pool = []
}



// This is our game object. Will hold all data for everything in the game.
function Game(){
    
    this.init = function(){
        // Going to get canvas context to setup game objects. Will return true if browser supports canvas.
        this.backgroundCanvas = document.getElementById('background');
        // If the canvas is supported.
            if(this.backgroundCanvas.getContext){
    
                this.backgroundContext = this.backgroundCanvas.getContext('2d');
                // Going to initialize objects to contain context and the canvas information.
                Background.prototype.context = this.backgroundContext;
                Background.prototype.canvasWidth = this.backgroundCanvas.width;
                Background.prototype.canvasHeight = this.backgroundCanvas.height;
                // Initializing background objects.
                this.background = new Background();
                this.background.init(0,0);
                return true;
            }
            else{
                return false;
            }
    }
    // This will be starting animation loop.
    this.start = function(){
        animate();
    }
}
function animate() {
    requestAnimFrame( animate );
    game.background.draw();
}
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
})();