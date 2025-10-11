'use strict';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!';
// document.querySelector('.score').textContent = 100;
// document.querySelector('.number').textContent = 13;
// document.querySelector('.guess').value = 23;

let score = Math.trunc(Math.random() * 20) + 1;
let highscore = 0;
// document.querySelector('.number').textContent = score;
document.querySelector('.check').addEventListener(
  'click',
  function () {
    const guess = Number(document.querySelector('.guess').value);
    if (!guess) {
      document.querySelector('.message').textContent = '⛔ No number!';
    } else if (guess === score) {
      document.querySelector('.message').textContent = '🎉 Correct Number!';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    } else if (guess > score) {
      if (score > 0) {
        document.querySelector('.message').textContent = '📉 Too high!';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent =
          '💥 You lost the game!';
      }
    } else if (guess < score) {
      if (score > 0) {
        document.querySelector('.message').textContent = '📈 Too low!';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent =
          '💥 You lost the game!';
      }
    }
  },
  document.querySelector('.again').addEventListener('click', function () {
    score = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
  })
);
