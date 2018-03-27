
class MineSweeper {
  constructor (mines = 0, height = 4, width = 6) {
    this.mines = mines;
    this.squaresLeft = height * width - mines;
    this.time = 0;
    this.gameClock = null;
    this.gameover = false;
    this.width = width;
    this.height = height;
    this.values = [];
    this.clicked = [];
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

  displayBoard () {
    let game = document.getElementById('minesweeper');
    let gameboard = game.children[2];
    game.style.width = this.width * 30 + 'px';
    document.getElementById('reset').style.marginLeft = (this.width * 30)/2 - 65 +'px';
    let squares = '';
    for (var x = 0; x < this.width * this.height; x++) {
      squares +='<button id="square' + x + '" class="section">&nbsp</button>';
    }
    gameboard.innerHTML = squares;
  }

  selectSquare(num) {
    let square = 'square' + num;
    let selection = document.getElementById(square);
    this.clicked[num] = true;
    
    if (this.values[num] === true) {
      this.stopTimer();
      this.gameover = true;
      document.getElementById('reset').innerText = '😆';
      selection.innerText = '*';
      selection.style.background = 'red';
      selection.style.borderColor = 'red';
      this.displayMines();
    } else {
      if (this.values[num] === 0) {
        selection.innerHTML = '&nbsp';
        this.Omniexpand(num);
      } else {
        selection.innerText = this.values[num];
      }
      this.squaresLeft--;
      if (this.squaresLeft === 0) {
        document.getElementById('reset').innerText = '😎';
        this.stopTimer();
        this.gameover = true;
      }
    }
  }
  
  Omniexpand(num) {
    num = Number(num);
    if (num % this.width !== 0) {
      if (this.clicked[num - this.width - 1] === false) {
        this.expand(num - this.width - 1);
      }
      if (this.clicked[num - 1] === false) {
        this.expand(num - 1);
      }
      if (this.clicked[num + this.width - 1] === false) {
        this.expand(num + this.width - 1);
      }
    }
    if (this.clicked[num - this.width] === false) {
      this.expand(num - this.width);
    }
    if (this.clicked[num + this.width] === false) {
      this.expand(num + this.width);
    }

    if ((num + 1) % this.width !== 0) {
      if (this.clicked[num - this.width + 1] === false) {
        this.expand(num - this.width + 1);
      }
      if (this.clicked[num + 1] === false) {
        this.expand(num + 1);
      }
      if (this.clicked[num + this.width + 1] === false) {
        this.expand(num + this.width + 1); 
      }
    }
       
  }


  expand(num) {
    let square = 'square' + (num);
    let selection = document.getElementById(square);
    if (!selection.classList.contains('mine')) {
      if (this.values[num] === 0) {
        selection.innerHTML = '&nbsp';
      } else if (
        this.values[num] !== true &&
        this.values[num] !== undefined
      ) {
        selection.innerText = this.values[num];
      } else {
        return false;
      }
      selection.className += ' clicked';
      this.squaresLeft--;          
      this.clicked[num] = true;
      if (this.values[num] === 0) {
        this.Omniexpand(num);
      }
    }
  }

  displayMines() {
    this.values.forEach((mine, index) => {
      let selection = document.getElementById('square' + index);
      if (selection.innerText !== '*' && mine === true) {
        if (selection.innerText === '!') {
          selection.style.background = 'lightgreen';
          selection.style.borderColor = 'rgba(00,00,00,.0)';
        } else {
          selection.style.background = 'lightsalmon';
          selection.style.borderColor = 'rgba(00,00,00,.0)';
        }
        selection.innerText = '*';
      } 
    })
  }

  setUp() {
    document.getElementById('minesweeper').firstElementChild.children[0].innerText = this.mines;
    document.getElementById('reset').innerText = '😁';          
    this.createValues();
    this.createBoard();
    this.displayBoard();
  }

  startTimer() {
    
    this.gameClock = setInterval(()=>{
      this.time++;
      document.getElementById('minesweeper').firstElementChild.children[2].innerText = this.time;
    },1000)

  }

  stopTimer() {
    clearInterval(this.gameClock);
  }
}

document.getElementById('minesweeper').addEventListener('click', function(item) {
  if (item.target.classList.contains('section') && item.target.classList.contains('clicked') === false
  && item.target.classList.contains('mine') === false && newGame.gameover === false) {
    if(newGame.gameClock === null) {
      newGame.startTimer();
    }
    item.target.className += ' clicked';
    newGame.selectSquare(item.target.id.slice(6));   
  }
  if (item.target.id === 'reset') {
    newGame.stopTimer();
    newGame = new MineSweeper(Number(newGame.mines), Number(newGame.height), Number(newGame.width));
    document.getElementById('minesweeper').firstElementChild.children[2].innerText = 0;
    newGame.gameover = false;
    newGame.setUp();
  }
  if (item.target.textContent === 'Cancel') {
    item.target.parentElement.style.height = '20px';    
  }
  if (item.target.textContent === 'Start') {
    item.preventDefault();
    
    let mines = Number(this.children[1][5].value);
    isNaN(mines) ? mines = 0 : mines;
    mines < 0 ? mines = 0 : mines;

    let height = Number(this.children[1][6].value);
    isNaN(height) ? height = 1 : height;
    height < 1 ? height = 1 : height;

    let width = Number(this.children[1][7].value); 
    isNaN(width) ? width = 6 : width;
    width < 6 ? width = 6 : width;
   
    newGame.stopTimer();
    newGame = new MineSweeper(mines, height, width);
    item.target.parentElement.style.height = '20px';
    document.getElementById('minesweeper').firstElementChild.children[2].innerText = 0;
    this.gameover = false;
    newGame.setUp();
  }
  if (item.target.name === 'size') {
    let selection = item.target.id[4];
    console.log();
    switch (selection) {
      case '1':
        this.children[1][5].disabled = false;
        this.children[1][6].disabled = false;
        this.children[1][7].disabled = false;
        break;
      case '2':
        this.children[1][5].value = 10;
        this.children[1][6].value = 8;
        this.children[1][7].value = 8;
        this.children[1][5].disabled = true;
        this.children[1][6].disabled = true;
        this.children[1][7].disabled = true;
        break;
      case '3':
        this.children[1][5].value = 40;
        this.children[1][6].value = 16;
        this.children[1][7].value = 16;
        this.children[1][5].disabled = true;
        this.children[1][6].disabled = true;
        this.children[1][7].disabled = true;
        break;
      case '4':
        this.children[1][5].value = 99;
        this.children[1][6].value = 16;
        this.children[1][7].value = 30;
        this.children[1][5].disabled = true;
        this.children[1][6].disabled = true;
        this.children[1][7].disabled = true;
        break;        
      default:
        break;
    } 
  }
  if (item.target.innerText === 'Custom') {
    item.target.parentElement.parentElement.style.height !== '175px' ? 
      item.target.parentElement.parentElement.style.height = '175px' : 
      item.target.parentElement.parentElement.style.height = '20px';
  }
})

document.getElementById('minesweeper').addEventListener( 'contextmenu', function(e) {
  e.preventDefault();
  if (e.target.classList.contains('clicked') === false && e.target.classList.contains('section') && newGame.gameover === false) {
    if(e.target.classList.contains('mine')) {
      e.target.innerHTML = '&nbsp';
      e.target.classList.remove('mine');
      document.getElementById('minesweeper').firstElementChild.children[0].innerText = Number(document.getElementById('minesweeper').firstElementChild.children[0].innerText) + 1;      
    } else {
      e.target.className += ' mine';
      e.target.innerText = '!';
      document.getElementById('minesweeper').firstElementChild.children[0].innerText -= 1;      
      
    }
  }
});

var newGame = new MineSweeper(10, 8, 8);
newGame.setUp();
