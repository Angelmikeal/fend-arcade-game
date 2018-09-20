let sprite;
let clock;
let sfx = true;
let greenGemAvailable = false;
let hour = $('.hour');
let minutes = $('.minutes');
let seconds = $('.seconds');
let sec = 0;
let mins = 0;
let hours = 0;

let starSfx = new Audio('./sfx/star-pick-up.mp3');
let move = new Audio('./sfx/move.wav');
let hit = new Audio('./sfx/player-hit.wav');
let powerUp = new Audio('./sfx/power-up.wav');
let levelUp = new Audio('./sfx/level-up.wav');
let crush = new Audio('./sfx/bug-kill.wav');


// SPRITE SELECTION SYSTEM
$('.character').click(function (e) {
    if ($(this).hasClass('alien-boy') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-boy.png';
    }
    else if ($(this).hasClass('cat-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-cat-girl.png';
    }
    else if ($(this).hasClass('horn-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-horn-girl.png';
    }
    else if ($(this).hasClass('pink-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-pink-girl.png';
    }
    else if ($(this).hasClass('princess-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-princess-girl.png';
    }
})

// START GAME BUTTON
$('#start').click(function (e) {
    e.preventDefault();
    if (sprite === undefined) {
        $('.tip').text('please pick a character by clicking or tapping it');
    }else {
        $('.modal-begin').addClass('close');
        window.gameInit();
    }
})


class Enemy {
    constructor(x, y) {
        this.x = x,
            this.y = y,
            this.character = 'images/enemy-bug.png';
        this.speed = Math.random() * 500;
    }

    update(dt) {
        if (player.hasOrangeGem === true) {
            this.speed = 30;
        } else {
            this.speed = Math.random() * 400 + (10 * tracker.level);
        }


        if (this.x > 500) {
            this.x = Math.random() * -800;
            this.speed = (Math.random() * 400) + (10 * tracker.level);;

        }

        // You should multiply any movement by the dt parameter
         // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        //handling collision with the Player
        if ((this.x + 50) >= player.x && (this.x - 50) <= player.x && player.hasBlueGem === false) {
            if (player.y === this.y) {
                if (player.hasRock === true) {
                    crush.play();
                    this.x = 3000;
                    player.hasRock = false;
                    player.hasItem = false;
                } else {
                    hit.play();
                    player.life--
                    player.x = 200;
                    player.y = 393.5;
                }
            }
        }
    };

    render() {
        if (player.hasGreenGem === true) {
            this.x = 3000;
            ctx.drawImage(Resources.get(this.character), this.x, this.y);
        } else {
            ctx.drawImage(Resources.get(this.character), this.x, this.y);
        }

    };

}

//PLAYER CONSTRUCTOR

class PlayerFunction {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.hasItem = false;
        this.hasBlueGem = false;
        this.hasOrangeGem = false;
        this.hasGreenGem = false;
        this.hasRock = false;
        this.life = 4;
    }
    update(dt) {
        // You should multiply any movement by the dt paramete
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.y <= 0) {
            if (tracker.starToPick === 0) {
                levelUp.play();
                tracker.starPresent = false;
                tracker.level += 1;
                tracker.starToPick = 3;
                tracker.itemAvailable = 3;
                tracker.starPicked = 0;

            }
            setTimeout(() => {
                this.y = 393.5;
                this.x = 200;
            }, 200);
        }

        $('.life').text(player.life);

        if (player.life === 0) {
            gameOver()
            //reset();
        }
    };

    render() {
        if (player.hasRock === true) {
            ctx.drawImage(Resources.get(rock.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else if (player.hasBlueGem === true) {
            ctx.drawImage(Resources.get(blueGem.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else if (player.hasOrangeGem === true) {
            ctx.drawImage(Resources.get(orangeGem.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else if (player.hasGreenGem === true) {
            ctx.drawImage(Resources.get(greenGem.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else{
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
    };


    handleInput(direction) {
        if (direction === 'left' && sfx === true) {
            move.play();
            if (this.x > 50) {
                this.x -= 101;
            }
        }

        if (direction === 'right' && sfx === true) {
            move.play();
            if (this.x < 350) {
                this.x += 101;
            }
        }

        if (direction === 'up' && sfx === true) {
            move.play();
            if (this.y <= 400) {
                this.y -= 83;
            }
        }

        if (direction === 'down' && sfx === true) {
            move.play();
            if (this.y < 390) {
                this.y += 83;
            }
        }
    }


}
// Now instantiate your objects.

let enemy1 = new Enemy(Math.random() * -700, 61.5);
let enemy2 = new Enemy(Math.random() * -700, 144.5);
let enemy3 = new Enemy(Math.random() * -700, 227.5);
let enemy4 = new Enemy(Math.random() * -700, 310.5);
let enemy5 = new Enemy(Math.random() * -700, 61.5);
let enemy6 = new Enemy(Math.random() * -700, 144.5);
let enemy7 = new Enemy(Math.random() * -700, 227.5);
let enemy8 = new Enemy(Math.random() * -700, 310.5);



// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];

// Place the player object in a variable called player

let player = new PlayerFunction(200, 393.5);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// GEM CONSTRUCTOR

class itemConstructor {
    constructor(x, y, sprite) {
        this.x = x,
            this.y = y,
            this.character = sprite;
    }

    update() {
        // ITEM COLLECTION SYSTEM
            if ((this.x + 50) >= player.x && (this.x - 50) <= player.x) {
                if ((player.y === 310.5 && this.y === 373.5) || (player.y === 227.5 && this.y === 290.5) || (player.y === 144.5 && this.y === 207.5) || (player.y === 61.5 && this.y === 124.5)) {
                    // CHECK ITEM AND GIVE POWER UP
                    if (this === blueGem) {
                        powerUp.play();
                        player.hasBlueGem = true;
                        tracker.itempresent = false;
                        player.hasItem = true;
                        tracker.itemAvailable -= 1
                        setTimeout(() => {
                            player.hasBlueGem = false;
                            player.hasItem = false;
                        }, 10000);
                    }

                    if (this === orangeGem) {
                        powerUp.play();
                        player.hasOrangeGem = true;
                        tracker.itempresent = false;
                        player.hasItem = true;
                        tracker.itemAvailable -= 1;
                        setTimeout(() => {
                            player.hasOrangeGem = false;
                            player.hasItem = false;
                        }, 10000);
                    }

                    if (this === greenGem) {
                        powerUp.play();
                        player.hasGreenGem = true;
                        tracker.itempresent = false;
                        tracker.itemAvailable -= 1;
                        player.hasItem = true;
                        setTimeout(() => {
                            player.hasGreenGem = false;
                            player.hasItem = false;
                        }, 5000);
                    }

                    if (this === rock) {
                        powerUp.play();
                        player.hasRock = true;
                        tracker.itempresent = false;
                        player.hasItem = true;
                        tracker.itemAvailable -= 1;
                        setTimeout(() => {
                            player.hasRock = false;
                            player.hasItem = false;
                        }, 20000);
                    }

                    if (this === heart) {
                        powerUp.play();
                        tracker.itemAvailable -= 1;
                        tracker.itempresent = false;
                        player.life += 1;
                    }

                    if (this === star) {
                        starSfx.play();
                        if (tracker.starToPick > 0.5) {
                            tracker.starPresent = false;
                            tracker.starToPick -= 1;
                            tracker.starPicked += 1;
                            tracker.totalStar += 1;
                        }
                    }
                }
            };
    };

    render() {
        ctx.drawImage(Resources.get(this.character), this.x, this.y);
    };

}

// ITEM OBJECTS

let blueGem = new itemConstructor(0, 0, 'images/gem-blue.png');

let greenGem = new itemConstructor(0, 0, 'images/gem-green.png');

let orangeGem = new itemConstructor(0, 0, 'images/gem-orange.png');

let heart = new itemConstructor(0, 0, 'images/Heart.png');

let rock = new itemConstructor(0, 0, 'images/Rock.png');

let star = new itemConstructor(0, 0, 'images/Star.png');

// GEM ARRAY 

var allItems = [blueGem, orangeGem, heart, rock];

// ITEM TRACKING OBJECT 

var tracker = {
    itempresent: false,
    itemAvailable: 3,
    starPresent: false,
    starToPick: 3,
    starPicked: 0,
    level: 1,
    totalStar: 0,
    update: function () {
        $('.level').text(`${this.level}`);
        $('.star-count').text(`${this.starPicked}`);
        $('.total-star-count').text(`${this.totalStar}`);

        if (this.level >= 15 && greenGemAvailable === false) {
            greenGemAvailable = true;
            allItems.push(greenGem);
        }
    }
}

// mobile view controls

var up = document.getElementById('up'),
    down = document.getElementById('down'),
    left = document.getElementById('left'),
    right = document.getElementById('right');


// CONTROLS FOR MOBILE PLAYERS
up.addEventListener('click', function (e) {
    player.handleInput('up');
});

down.addEventListener('click', function (e) {
    player.handleInput('down');
});

left.addEventListener('click', function (e) {
    player.handleInput('left');
});

right.addEventListener('click', function (e) {
    player.handleInput('right');
});



// TIMER FUNCTION
function timer() {
    sec++;

    if (sec === 60) {
        sec = 0;
        mins++;
        if (mins === 60) {
            mins = 0;
            hours++;
        }
    }

    // update seconds
    seconds.text(function () {
        if (sec > 9) {
            return sec;
        } else {
            return `0${sec}`;
        }
    })

    // update minutes
    minutes.text(function () {
        if (mins > 9) {
            return `${mins}`;
        } else {
            return `0${mins}`;
        }
    })

    // update hour
    hour.text(function () {
        if (hours > 9) {
            return `${hours}`;
        } else {
            return `0${hours}`;
        }
    })

    count();
}

function count() {
    // start timer
    clock = setTimeout(timer, 1000);
}


// RESET FUNCTION THAT JUST RELOADS THE PAGE
function reset() {
    location = location;
}

// GAME OVER FUNCTION THAT THROWS A RENCH INTO THE ENGINE I DONT KNOW WHY IT WORKS
function gameOver () {
    sfx = false;
    clearInterval(clock);
    $('.modal-end').addClass('open');
    tracker.totalStar = 0;
    window.gameInit();
}

//PLAY AGAIN OPTION
$('.yes-play').click(function (e) {
    reset()
});

// PLAY AGAIN OPTION
$('.no-play').click(function (e) {
    reset()
});