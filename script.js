
class MineSweeper {
  constructor (mines = 0, height = 4, width = 6) {
    this.mines = mines;
    this.squaresLeft = height * width - mines;
    this.time = 0;
    this.gameClock = null;
    this.gameover = false;
    this.size = 'small';
    this.width = width;
    this.height = height;
    this.values = [];
    this.clicked = [];
    this.board = [];
  }

  createValues() {
    let potentialMines = [];
    let minesLeft = this.mines;

    for (var y = 0; y < this.height * this.width; y++) {
      potentialMines.push(y);
      this.values.push(0);
    }

    while (minesLeft > 0) {
      let selection = Math.floor(Math.random() * potentialMines.length);
      this.values[potentialMines[selection]] = true;
      console.log('mine =', potentialMines[selection]);
      if (potentialMines[selection] === 0) {
        // console.log('upper left')
        this.setClues(potentialMines[selection], false, false, false, false, true, false, true, true);
      } else if (potentialMines[selection] === this.width - 1) {
        // console.log('upper right')
        this.setClues(potentialMines[selection], false, false, false, true, false, true, true, false);
      } else if (potentialMines[selection] === this.width * (this.height - 1)) {
        // console.log('lower left')
        this.setClues(potentialMines[selection], false, true, true, false, true, false, false, false);
      } else if (potentialMines[selection] === (this.width * this.height) - 1) {
        // console.log('lower right')
        this.setClues(potentialMines[selection], true, true, false, true, false, false, false, false);
      } else if (potentialMines[selection] < this.width) {
        // console.log('top')
        this.setClues(potentialMines[selection], false, false, false, true, true, true, true, true);
      } else if (potentialMines[selection] > this.width * (this.height - 1)) {
        // console.log('bottom')
        this.setClues(potentialMines[selection], true, true, true, true, true, false, false, false);
      } else if (potentialMines[selection] % this.width === 0) {
        // console.log('left')
        this.setClues(potentialMines[selection], false, true, true, false, true, false, true, true);
      } else if ((potentialMines[selection] + 1) % this.width === 0) {
        // console.log('right')
        this.setClues(potentialMines[selection], true, true, false, true, false, true, true, false);
      } else {
        //console.log('middle');
        this.setClues(potentialMines[selection], true, true, true, true, true, true, true, true);
      }
      // console.log(potentialMines[selection], this.values);
      this.displayValues();
      potentialMines.splice(selection, 1);
      minesLeft--;         
    }
    return this.values;
  }

  setClues(current, ul, uc, ur, l, r, dl, dc, dr) {

    if(ul === true && this.values[current - this.width - 1] !== true) {
      this.values[current - this.width - 1] += 1;    
    }

    if(uc === true && this.values[current - this.width] !== true) {
      this.values[current - this.width] += 1;    
    }

    if(ur === true && this.values[current - this.width + 1] !== true) {
      this.values[current - this.width + 1] += 1;    
    }

    if(l === true && this.values[current - 1] !== true) {
      this.values[current - 1] += 1;    
    }

    if(r === true && this.values[current + 1] !== true) {
      this.values[current + 1] += 1;    
    }

    if(dl === true && this.values[current + this.width - 1] !== true) {
      this.values[current + this.width - 1] += 1;    
    }

    if(dc === true && this.values[current + this.width] !== true) {
      this.values[current + this.width] += 1;    
    }

    if(dr === true && this.values[current + this.width + 1] !== true) {
      this.values[current + this.width + 1] += 1;    
    }

  }

  createBoard() {
    for (var x = 0; x < this.height * this.width; x++) {
      this.clicked.push(false);
    }
  }

  displayValues () {
    console.log('--------------------------------')
    console.log('|', this.values[0], '|', this.values[1], '|', this.values[2], '|', this.values[3], '|')
    console.log('|', this.values[4], '|', this.values[5], '|', this.values[6], '|', this.values[7], '|',)
    console.log('|', this.values[8], '|', this.values[9], '|', this.values[10], '|', this.values[11], '|',)
    console.log('--------------------------------')
  }

  displayBoard () {
    let game = document.getElementById("minesweeper");
    let gameboard = game.children[2];
    console.log('test', game.children);
    game.style.width = this.width * 30 + 'px';
    document.getElementById("reset").style.marginLeft = (this.width * 30)/2 - 65 +'px';
    let squares = "";
    for (var x = 0; x < this.width * this.height; x++) {
      squares +='<button id="square' + x + '" class="section">&nbsp</button>';
    }
    gameboard.innerHTML = squares;
  }

  selectSquare(num) {
    let square = 'square' + num;
    let selection = document.getElementById(square);
    console.log(this.values);
    this.clicked[num] = true;
    console.log(this.clicked, num, this.clicked[num]);
    
    if (this.values[num] === true) {
      this.stopTimer();
      this.gameover = true;
      document.getElementById('reset').innerText = '😆';
      selection.innerText = '*';
      selection.style.background = 'red';
      selection.style.borderColor = 'red';
    } else {
      if (this.values[num] === 0) {
        selection.innerHTML = '&nbsp';
        this.expand(num);
      } else {
        selection.innerText = this.values[num];
      }
      this.squaresLeft--;
    }
  }

  expand(num) {
    num = Number(num);

    //up
    if (this.clicked[num - this.width] === false && this.values[num - this.width] !== true) {
      let square = 'square' + (num - this.width);
      let selection = document.getElementById(square);
      if (this.values[num - this.width] === 0) {
        selection.innerHTML = '&nbsp';
        this.expand(num - this.width);
      } else {
        selection.innerText = this.values[num - this.width];
      }
      selection.className += " clicked";
      this.squaresLeft--;          
      this.clicked[num - this.width] = true;
      // this.expand(num - this.width);
    }

    //left
    if (this.clicked[num - 1] === false && this.values[num - 1] !== true && num % this.width !== 0) {
      let square = 'square' + (num - 1);
      let selection = document.getElementById(square);
      if (this.values[num - 1] === 0) {
        selection.innerHTML = '&nbsp';
        this.expand(num - 1);
      } else {
        selection.innerText = this.values[num - 1];
      }
      selection.className += " clicked";
      this.squaresLeft--;          
      this.clicked[num - 1] = true;
      // this.expand(num - 1);
    }

    //right
    if (this.clicked[num + 1] === false && this.values[num + 1] !== true && (num + 1) % this.width !== 0) {
      let square = 'square' + (num + 1);
      let selection = document.getElementById(square);
      if (this.values[num + 1] === 0) {
        selection.innerHTML = '&nbsp';
        this.expand(num + 1);
      } else {
        selection.innerText = this.values[num + 1];
      }
      selection.className += " clicked";
      this.squaresLeft--;        
      this.clicked[num + 1] = true;
      // this.expand(num + 1);
    }

    //down
    if (this.clicked[num + this.width] === false && this.values[num + this.width] !== true) {
      let square = 'square' + (num + this.width);
      let selection = document.getElementById(square);
      if (this.values[num + this.width] === 0) {
        selection.innerHTML = '&nbsp';
        this.expand(num + this.width);
      } else {
        selection.innerText = this.values[num + this.width];
      }
      selection.className += " clicked";
      this.squaresLeft--;    
      this.clicked[num + this.width] = true;
      // this.expand(num + this.width);
    }
    console.log(this.squaresLeft);
    if (this.squaresLeft === 0) {
      document.getElementById('reset').innerText = '😎';
      this.stopTimer();
      this.gameover = true;
    }
  }

  setUp() {
    document.getElementById("minesweeper").firstElementChild.children[0].innerText = this.mines;
    document.getElementById('reset').innerText = '😁';          
    this.createValues();
    this.createBoard();
    this.displayBoard();
  }

  startTimer() {
    
    this.gameClock = setInterval(()=>{
      this.time++;
      document.getElementById("minesweeper").firstElementChild.children[2].innerText = this.time;
    },1000)

  }

  stopTimer() {
    clearInterval(this.gameClock);
  }
}

document.getElementById("minesweeper").addEventListener("click", function(item) {
  if (item.target.classList.contains('section') && item.target.classList.contains('clicked') === false
  && item.target.classList.contains('mine') === false && newGame.gameover === false) {
    if(newGame.gameClock === null) {
      newGame.startTimer();
    }
    item.target.className += " clicked";
    newGame.selectSquare(item.target.id.slice(6));   
  }
  if (item.target.id === 'reset') {
    newGame.stopTimer();
    newGame = new MineSweeper(Number(newGame.mines), Number(newGame.height), Number(newGame.width));
    document.getElementById("minesweeper").firstElementChild.children[2].innerText = 0;
    newGame.gameover = false;
    newGame.setUp();
  }
  if (item.target.textContent === 'Cancel') {
    item.target.parentElement.style.height = '20px';    
  }
  if (item.target.textContent === 'Start') {
    //item.target.parentElement.id === 'newGame' || item.target.id === 'newGame' && 
    console.log(item.target.textContent === 'Start');
    item.preventDefault();
    
    let mines = Number(this.children[1][0].value);
    isNaN(mines) ? mines = 0 : mines;
    mines < 0 ? mines = 0 : mines;

    let height = Number(this.children[1][1].value);
    isNaN(height) ? height = 1 : height;
    height < 1 ? height = 1 : height;

    let width = Number(this.children[1][2].value); 
    isNaN(width) ? width = 5 : width;
    width < 5 ? width = 5 : width;
   
    newGame.stopTimer();
    newGame = new MineSweeper(mines, height, width);
    item.target.parentElement.style.height = '20px';
    document.getElementById("minesweeper").firstElementChild.children[2].innerText = 0;
    this.gameover = false;
    newGame.setUp();
  }
  if (item.target.innerText === 'Custom') {
    item.target.parentElement.parentElement.style.height !== '150px' ? 
      item.target.parentElement.parentElement.style.height = '150px' : 
      item.target.parentElement.parentElement.style.height = '20px';
  }
})

document.getElementById("minesweeper").addEventListener( "contextmenu", function(e) {
  e.preventDefault();
  if (e.target.classList.contains('clicked') === false && e.target.classList.contains('section') && newGame.gameover === false) {
    if(e.target.classList.contains('mine')) {
      e.target.innerHTML = '&nbsp';
      e.target.classList.remove('mine');
      document.getElementById("minesweeper").firstElementChild.children[0].innerText = Number(document.getElementById("minesweeper").firstElementChild.children[0].innerText) + 1;      
    } else {
      e.target.className += ' mine';
      e.target.innerText = '!';
      document.getElementById("minesweeper").firstElementChild.children[0].innerText -= 1;      
      
    }
  }
});

var newGame = new MineSweeper(10, 4, 5);
newGame.setUp();
