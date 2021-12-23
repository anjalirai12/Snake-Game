let direction = {
  x: 0,
  y: 0
};

const background = new Audio("background-music.mp3");
const foodsound = new Audio("eat.mp3");
const move = new Audio("move.mp3");
const over = new Audio("game-over.mp3");

let lastPaintTime = 0;
let speed = 5;
let score = 0;
let snakearr = [{
  x: 13,
  y: 15
}];

let food = {
  x: 7,
  y: 8
};

function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameStart();
}

function isCollide(snake) {
  // if snake bump into himself

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if snake bump into the wall
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    return true;
  }

}

function gameStart() {
  // Updating the snake array and food
  background.play();
  if (isCollide(snakearr)) {
    over.play();
    background.pause();
    direction = {
      x: 0,
      y: 0
    };
    alert("Game Over.Press any key to play again!");
    snakearr = [{
      x: 13,
      y: 15
    }];
    background.play();
    score = 0;
    document.querySelector("#score").innerHTML = "Score : " + score;

  }
  // if snake has eaten food then increament snake and regenerate food
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
      document.querySelector("#Highscore").innerHTML = "HighScore: " + highscoreval;
    }
    document.querySelector("#score").innerHTML = "Score : " + score;
    snakearr.unshift({
      x: snakearr[0].x + direction.x,
      y: snakearr[0].y + direction.y
    });
    food = {
      x: Math.floor(Math.random() * 16) + 2,
      y: Math.floor(Math.random() * 16) + 2
    };
  }
  // Moving the snake
  for (var i = snakearr.length - 2; i >= 0; i--) {

    snakearr[i + 1] = {
      ...snakearr[i]
    };
  }
  snakearr[0].x += direction.x;
  snakearr[0].y += direction.y;

  // display the snake and food
  document.querySelector("#board").innerHTML = " ";
  snakearr.forEach((item, i) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = item.y;
    snakeElement.style.gridColumnStart = item.x;
    if (i === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    document.querySelector("#board").appendChild(snakeElement);

  })

  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  document.querySelector("#board").appendChild(foodElement);



}
// Main Logic

let highscore = localStorage.getItem("highscore");
if (highscore === null) {
  highscoreval = 0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  document.querySelector("#Highscore").innerHTML = "HighScore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", function(event) {
  direction = {
    x: 0,
    y: -1
  };
  move.play();
  switch (event.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;

    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;

    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;

      break;

    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;

      break;
    default:

  }
});
