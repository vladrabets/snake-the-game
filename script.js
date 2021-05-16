const select = document.querySelector('select');
document.querySelector('main button').addEventListener('click', changeStyle);

let color1 = "#eab048";
let color2 = "#6ebaa0";

function changeStyle() {
    switch (select.value) {
        case 'Select your preferred snake style:':
            color1 = "#eab048";
            color2 = "#6ebaa0";
            break;
        case 'ABOBA':
            color1 = "#000";
            color2 = "#484848";
            break;
        case 'Blue Vibe':
            color1 = "#3a75c4";
            color2 = "#00bfff";
            break;
        case 'Orange Gray':
            color1 = "#ff8b31";
            color2 = "#5d5d5d";
            break;
        case 'Gucci':
            color1 = "#ff0000";
            color2 = "#000000";
            break;
    }
}

document.querySelector('.game > button').addEventListener('click', Restart);
const record = document.querySelector('.record');
record.innerHTML += localStorage.getItem('record') === null ? 0 : localStorage.getItem('record');

function Restart() {
    clearInterval(game);
    box = 32;
    score = 0;
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
    };
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box,
    };
    dir = '';
    game = setInterval(drawGame, 120);
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'assets/ground.png';

const foodImg = new Image();
foodImg.src = 'assets/food.png';

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

function eatTale(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game);
        }
    }
}

function drawGame() {
    //отрисовка фона
    ctx.drawImage(ground, 0, 0);
    //отрисовка пищи
    ctx.drawImage(foodImg, food.x, food.y);

    //отрисовка тела змейки
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i % 2 === 0 ? color1 : color2;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    //отрисовка текущего счета игрока
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 3, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //проверка, съела ли змейка пищу
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        //отслеживание и фиксация рекордного счета игрока
        if (score > localStorage.getItem('record')) {
            localStorage.setItem('record', score);
            record.innerHTML = `Record: ${localStorage.getItem('record')}`;
        }
        //задание нового расположения пищи
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else {
        snake.pop();
    }

    //отслеживание положения змейки внутри игрового поля
    if (snakeX < box || snakeX > box * 17 ||
        snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game);
    }

    if(dir === "left") snakeX -= box;
    if(dir === "right") snakeX += box;
    if(dir === "up") snakeY -= box;
    if(dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTale(newHead, snake);

    snake.unshift(newHead);
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
}

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if((event.keyCode === 37 || event.keyCode === 65) && dir !== "right")
        dir = "left";
    else if((event.keyCode === 38 || event.keyCode === 87) && dir !== "down")
        dir = "up";
    else if((event.keyCode === 39 || event.keyCode === 68) && dir !== "left")
        dir = "right";
    else if((event.keyCode === 40 || event.keyCode === 83) && dir !== "up")
        dir = "down";
}

let game = setInterval(drawGame, 120);