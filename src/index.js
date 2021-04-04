import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
    const [row, setRow] = useState('');
    const [col, setCol] = useState('');
    const [bomb, setBomb] = useState('');
    const lines = rangeArray(0, row);
    const columns = rangeArray(0, col);
    let bombFree = 0;
    
    let board = rangeArray(0, col * row);
    let copyBom = bomb;
    for (let i = 0; i < board.length; i++) {
        if (copyBom) {
            board[i] = '*';
            --copyBom;
        }
        else {
            board[i] = 0;
        }
    };

    board = shuffleArray(board).slice();
    let bidimensionalArray = new Array(row && col ? row : 100);
    for (let i = 0; i < row; i++) {
        bidimensionalArray[i] = new Array(col && row ? col: 100);
    }

    if (row && col) {
        let k = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                bidimensionalArray[i][j] = board[k];
                ++k;
            }
        }
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (!bidimensionalArray[i][j]) {
                    let numberOfBombs = 0;
                    if (i > 0 && j > 0 && bidimensionalArray[i - 1][j - 1] === "*") {
                        ++numberOfBombs;
                    }
                    if (i > 0 && bidimensionalArray[i - 1][j] === "*") {
                        ++numberOfBombs;
                    }
                    if (i > 0 && j + 1 < col && bidimensionalArray[i - 1][j + 1] === "*") {
                        ++numberOfBombs;
                    }
                    if (j > 0 && bidimensionalArray[i][j - 1] === "*") {
                        ++numberOfBombs;
                    }
                    if (j + 1 < col && bidimensionalArray[i][j + 1] === "*") {
                        ++numberOfBombs;
                    }
                    if (i + 1 < row && j > 0 && bidimensionalArray[i + 1][j - 1] === "*") {
                        ++numberOfBombs;
                    }
                    if (i + 1 < row && bidimensionalArray[i + 1][j] === "*") {
                        ++numberOfBombs;
                    }
                    if (i + 1 < row && j + 1 < col && bidimensionalArray[i + 1][j + 1] === "*") {
                        ++numberOfBombs;
                    }
                    bidimensionalArray[i][j] = numberOfBombs;
                }

            }
        }
    }
   
    function displayBoard(e) {
        e.preventDefault();
        setRow(document.getElementById("1").value);
        setCol(document.getElementById("2").value);
        setBomb(document.getElementById("3").value);
    }

    function isZero(id) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let newId = "#" + (parseInt(id[1]) + i) + (parseInt(id[2]) + j);
                if(document.getElementById(newId) && document.getElementById(newId).style.color !== "black") {
                    document.getElementById(newId).style.color = "black";
                    ++bombFree;
                    if(document.getElementById(newId).value === "0") {
                        isZero(newId);
                    }
                }
            }
        }
    }

    function sowValue(e) {
        e.preventDefault();
        let id = e.target.id;
        if (e.target.value === "0") {
            isZero(id);
        }
        if(e.target.value === "*") {
            alert("Game Over");
        }
        if(e.target.style.color !== 'black') {
            ++bombFree;
        }
        e.target.style.color = 'black';
        if(bombFree === col * row - bomb) {
            alert("Winner!")
        }
    }
    
    return (
        <div>
            <form onSubmit={displayBoard}>
                <input type="number" placeholder="row nr." id="1" />
                <input type="number" placeholder="col nr." id="2" />
                <input type="number" placeholder="bomb nr." id="3" />
                <button>Play</button>
                <button onClick={() => window.location.reload()}>Reset Game</button>
            </form>
            <div>
                {
                    lines.map(line => {
                        return <div key={line} className="board-row">
                            {
                                columns.map(col => {
                                    return <input key={col} className='square' id={"#" + line + col} onClick={sowValue} value={bidimensionalArray[line][col]} readOnly />
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