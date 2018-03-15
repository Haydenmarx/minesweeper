
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
    // for (var x = 0; x < this.height; x++) {
    //   let row = [];
    //   for (var y = 0; y < this.width; y++) {
    //    let num = String(x * this.width + y + 1);
    //    num.length === 1 ? num = '000' + num :
    //    num.length === 2 ? num = '00' + num :
    //    num.length === 3 ? num = '0' + num : false;
    //    row.push(num);
    //   }
    //   this.board.push(row);
    // }    
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
    let gameboard = game.children[1];

    game.style.width = this.width * 30 + 'px';
    document.getElementById("reset").style.marginLeft = (this.width * 30)/2 -50 +'px';
    let squares = "";
    for (var x = 0; x < this.width * this.height; x++) {
      squares +='<button id="square' + x + '" class="section">&nbsp</button>';
    }
    gameboard.innerHTML = squares;
    // document.getElementById("mine")
    // console.log('--------------------------------')
    // for (var x = 0; x < this.board.length; x++) {
    //   console.log(JSON.stringify(this.board[x]),'\n');
    // }
    // console.log('--------------------------------')
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
      selection.innerText = '*';
      selection.style.background = 'red';
      selection.style.borderColor = 'red';
    } else {
      if (this.values[num] === 0) {
        selection.innerHTML = '&nbsp';
      } else {
        selection.innerText = this.values[num];
      }
      this.squaresLeft--;
      this.expand(num)
    }
  }

//   selectSquare(num) {
//     num +=1;
//     let row = parseInt((num - 1)/this.width);
//     let column = num - (row * this.width) - 1;
//     if (this.values[num - 1] === true) {
//       this.board[row][column] = 'BOOM'
//     } else {
//       if (this.values[num - 1] === 0) {
//         this.board[row][column] = '    ';
//       } else {
//         this.board[row][column]= '  ' + this.values[num - 1] +  ' ';
//       }
// /*
//       console.log('up', this.board[row][column]);
//       console.log('down', this.board[row + 1][column]);
//       console.log('left', this.board[row][column - 1]);
//       console.log('right', this.board[row][column + 1]);
// */
//       this.expand(row, column);
//     }
//     // console.log(this.board[row][column + 1][0])
//     this.displayBoard();
//   }

  expand(num) {
    num = Number(num);

    //up
    if (this.clicked[num - this.width] === false && this.values[num - this.width] !== true) {
      let square = 'square' + (num - this.width);
      let selection = document.getElementById(square);
      if (this.values[num - this.width] === 0) {
        selection.innerHTML = '&nbsp';
      } else {
        selection.innerText = this.values[num - this.width];
      }
      selection.className += " clicked";
      this.squaresLeft--;          
      this.clicked[num - this.width] = true;
      this.expand(num - this.width);
    }

    //left
    if (this.clicked[num - 1] === false && this.values[num - 1] !== true && num % this.width !== 0) {
      let square = 'square' + (num - 1);
      let selection = document.getElementById(square);
      if (this.values[num - 1] === 0) {
        selection.innerHTML = '&nbsp';
      } else {
        selection.innerText = this.values[num - 1];
      }
      selection.className += " clicked";
      this.squaresLeft--;          
      this.clicked[num - 1] = true;
      this.expand(num - 1);
    }

    //right
    if (this.clicked[num + 1] === false && this.values[num + 1] !== true && (num + 1) % this.width !== 0) {
      let square = 'square' + (num + 1);
      let selection = document.getElementById(square);
      if (this.values[num + 1] === 0) {
        selection.innerHTML = '&nbsp';
      } else {
        selection.innerText = this.values[num + 1];
      }
      selection.className += " clicked";
      this.squaresLeft--;        
      this.clicked[num + 1] = true;
      this.expand(num + 1);
    }

    //down
    if (this.clicked[num + this.width] === false && this.values[num + this.width] !== true) {
      let square = 'square' + (num + this.width);
      let selection = document.getElementById(square);
      if (this.values[num + this.width] === 0) {
        selection.innerHTML = '&nbsp';
      } else {
        selection.innerText = this.values[num + this.width];
      }
      selection.className += " clicked";
      this.squaresLeft--;    
      this.clicked[num + this.width] = true;
      this.expand(num + this.width);
    }
    console.log(this.squaresLeft);
    if (this.squaresLeft === 0) {
      document.getElementById('minesweeper').style.background = 'green';
    }
  }

//   expand(row, column) {

//     //up
//     if (this.board[row - 1] !== undefined) {
//       if (this.board[row - 1][column] !== undefined &&
//           this.board[row - 1][column] !== '    ' &&
//           this.board[row - 1][column][0] === '0' &&
//           this.values[(row - 1) * this.width + column] !== true)
//       {
//         //console.log('up', row, column, (row * this.width) + column)
//         if (this.values[(row - 1) * this.width + column] === 0) {
//           this.board[row - 1][column] = '    ';
//         } else {
//           this.board[row - 1][column]= '  ' + this.values[((row - 1) * this.width) + column] +  ' ';
//         }

// //	this.board[row - 1][column] = '    ';
//         this.expand(row - 1, column);
//       }
//     }

//     //left
//     if (this.board[row][column - 1] !== undefined && 
//         this.board[row][column - 1] !== '    ' &&
//         this.board[row][column - 1][0] === '0' &&
//         this.values[row * this.width + column - 1] !== true /*&&
//     this.board[row][column - 1][0] === '0' */)
//     {
//       //console.log('left', row, column, (row * this.width) + column - 1)
//         if (this.values[(row * this.width) + column - 1] === 0) {
//           this.board[row][column - 1] = '    ';
//         } else {
//           this.board[row][column -1 ]= '  ' + this.values[(row * this.width) + column - 1] +  ' ';
//         }

// //	this.board[row][column - 1] = '    ';
//         this.expand(row, column - 1);
//     }

//     //right
//     if (this.board[row][column + 1] !== undefined &&
//         this.board[row][column + 1] !== '    ' &&
//         this.board[row][column + 1][0] === '0' &&
//         this.values[row * this.width + column + 1] !== true /*&&
//     this.board[row][column - 1][0] === '0'*/)
//     {
//       //console.log('right', row, column, (row * this.width) + column)
//         if (this.values[(row * this.width) + column + 1] === 0) {
//           this.board[row][column + 1] = '    ';
//         } else {
//           this.board[row][column + 1]= '  ' + this.values[(row * this.width) + column + 1] +  ' ';
//         }

// //	this.board[row][column + 1] = '    ';
//         this.expand(row, column + 1);
//     }

//     //down
//     if (this.board[row + 1] !== undefined) {
//       if (this.board[row + 1][column] !== undefined &&
//           this.board[row + 1][column] !== '    '  &&
//           this.board[row + 1][column][0] === '0' &&
//           this.values[(row + 1) * this.width + column] !== true /*&&
//       this.board[row][column - 1][0] === '0'*/)
//       {
//         //console.log('down', row, column, (row * this.width) + column)
//         if (this.values[((row + 1) * this.width) + column] === 0) {
//           this.board[row + 1][column] = '    ';
//         } else {
//           this.board[row + 1][column]= '  ' + this.values[((row + 1) * this.width) + column] +  ' ';
//         }


// //	this.board[row + 1][column] = '    ';
//         this.expand(row + 1, column);
//       }
//     }
//   }
  
  setUp() {
    document.getElementById("minesweeper").firstElementChild.children[0].innerText = this.mines;          
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
  && item.target.classList.contains('mine') === false) {
    if(newGame.gameClock === null) {
      newGame.startTimer();
    }
    item.target.className += " clicked";
    newGame.selectSquare(item.target.id.slice(6));   
  }
  if (item.target.id === 'reset') {
    newGame.stopTimer();
    newGame = new MineSweeper(200, 20, 20);
    document.getElementById("minesweeper").firstElementChild.children[2].innerText = 0;

    this.gameover = false;
    newGame.setUp();
  }
})

document.getElementById("minesweeper").addEventListener( "contextmenu", function(e) {
  e.preventDefault();
  if (e.target.classList.contains('clicked') === false && e.target.classList.contains('section')) {
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

var newGame = new MineSweeper(13, 9, 7);
newGame.setUp();


// console.log(test.values);
// test.selectSquare(1);
// test.selectSquare(2);
// test.selectSquare(3);
// test.selectSquare(4);
// test.selectSquare(5);
// test.selectSquare(6);
// test.selectSquare(7);
// test.selectSquare(8);
// test.selectSquare(9);
// test.selectSquare(10);
// test.selectSquare(11);
// test.selectSquare(12);
// test.selectSquare(13);
// test.selectSquare(14);
// test.selectSquare(15);
// test.selectSquare(16);
// test.selectSquare(17);
// test.selectSquare(18);
// test.selectSquare(19);
// test.selectSquare(20);


//<button class="unchosen blank"></button>
//<button class="unchosen flag"></button>
//<button class="chosen"></button>


