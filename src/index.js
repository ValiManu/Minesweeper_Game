import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = () => {
    const [row, setRow] = useState('');
    const [col, setCol] = useState('');
    const [bom, setBom] = useState('');
    const lines = rangeArray(0, row);
    const columns = rangeArray(0, col);
    let board = rangeArray(0,col * row);
    let copyBom = bom;
    for (let i = 0; i < board.length; i++) {
        if(copyBom) {
            board[i] = '*';
            --copyBom;
        }
        else {
            board[i] = 0;
        }

    };

    board = shuffleArray(board).slice();
    let bidimensionalArray = new Array(row && col ? row : 100);
    for (let i = 0; i < row; i++){
        bidimensionalArray[i] = new Array(col && row ? col : 100);
    }

    if(row && col) {
        let k = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                bidimensionalArray[i][j] = board[k];
                ++k;
            }
        }
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if(!bidimensionalArray[i][j]) {
                    let numberOfBombs = 0;
                    if(i > 0 && j > 0 && bidimensionalArray[i-1][j-1] === "*") {
                        ++numberOfBombs;
                    }
                    if(i > 0 && bidimensionalArray[i-1][j] === "*") {
                        ++numberOfBombs;
                    }
                    if(i > 0 && j + 1 < col && bidimensionalArray[i-1][j+1] === "*") {
                        ++numberOfBombs;
                    }
                    if(j > 0 && bidimensionalArray[i][j-1] === "*") {
                        ++numberOfBombs;
                    }
                    if(j + 1 < col && bidimensionalArray[i][j+1] === "*") {
                        ++numberOfBombs;
                    }
                    if(i + 1 < row && j > 0 && bidimensionalArray[i+1][j-1] === "*") {
                        ++numberOfBombs;
                    }
                    if(i + 1 < row && bidimensionalArray[i+1][j] === "*") {
                        ++numberOfBombs;
                    }
                    if(i + 1 < row && j + 1 < col && bidimensionalArray[i+1][j+1] === "*") {
                        ++numberOfBombs;
                    }
                    bidimensionalArray[i][j] = numberOfBombs;
                }
                
            }
        }
    }
    return (
        <div>
        <form>
        <input type="number" placeholder="row nr." onInput={e => setRow(e.target.value)}/>
        <input type="number" placeholder="col nr." onInput={e => setCol(e.target.value)}/>
        <input type="number" placeholder="bom nr." onInput={e => setBom(e.target.value)}/>
        <button>Play</button>
        </form>
        <div>
        {
            lines.map(line => {
                return <div key={line} className="board-row">
                {
                    columns.map(col => {
                        return <button key={col} className='square'>{bidimensionalArray[line][col]}</button>
                    })
                }
                </div>
            })
        } 
        </div>
        </div>
    )
}



ReactDOM.render(
    <div>
        <div>Minesweeper Game</div>
        <Square />
    </div>,
    document.getElementById('root'),
);



//utils
function rangeArray(start, end) {
    const line = [];
    for (let i = start; i < end; i++) {
        line[i] = i;
    }
    return line;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1));
                     
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
         
    return array;
 }