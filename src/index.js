import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = (props) => {
    return (
        <button
            className='square'
            id={props.id}
            readOnly
            onClick={props.onClick}
            value={props.value}
            line={props.line}
            row={props.row}
        > {props.value}
        </button>
    )
}

const Board = (props) => {
    const bombsArray = bombsArr(props.line, props.row, props.bomb);
    let bombFree = 0;
    function handleClick(e) {
        e.preventDefault();
        if (e.target.value === "0") {
            isZero(e.target.getAttribute('line'), e.target.getAttribute('row'));
        }
        if (e.target.value === "*") {
            alert("Game Over");
        }
        if (e.target.style.color !== 'black') {
            ++bombFree
        }
        e.target.style.color = 'black';
        if (bombFree === props.line * props.row - props.bomb) {
            alert("Winner!")
        }
    }
    function isZero(line, row) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let newLine = parseInt(line) + i;
                let newRow = parseInt(row) + j;
                let id = newLine + "#" + newRow;
                if (document.getElementById(id) && document.getElementById(id).style.color !== "black") {
                    document.getElementById(id).style.color = "black";
                    ++bombFree;
                    if (document.getElementById(id).value === "0") {
                        isZero(newLine, newRow, bombFree);
                    }
                }
            }
        }
    }
    return (
        range(props.line).map(i => {
            return (
                <div key={i} className="board-row">
                    {
                        range(props.row).map(j => <Square key={j} value={bombsArray[i][j]} id={i + "#" + j} onClick={handleClick} line={i} row={j} />)
                    }
                </div>
            )
        })
    )
}

const InputForm = (props) => {
    const [lines, setLine] = useState();
    const [rows, setRow] = useState();
    const [bombs, setBombs] = useState();
    function handleSubmit(e) {
        e.preventDefault();
        setLine(parseInt(document.getElementById('#1').value));
        setRow(parseInt(document.getElementById('#2').value));
        setBombs(parseInt(document.getElementById('#3').value));

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Height" value={props.lines} id='#1' />
                <input type="number" placeholder="Width" value={props.rows} id='#2' />
                <input type="number" placeholder="Mines" value={props.bombs} id="#3" />
                <button>Play</button>
                <button onClick={() => window.location.reload()}>Reset Game</button>
            </form>
            <Board line={lines} row={rows} bomb={bombs} />
        </>
    );
}

const App = (props) => {
    return (
        <div>
            <h3>Minesweeper Game</h3>
            <InputForm />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);

// ***UTILS***
function range(max) {
    const arr = [];
    for (let i = 0; i < max; i++) {
        arr[i] = i;
    };
    return arr;
};

function bombsArr(lines, rows, bombs) {
    let arr = range(lines * rows);
    for (let i = 0; i < arr.length; i++) {
        if (bombs) {
            arr[i] = '*';
            --bombs;
        } else {
            arr[i] = 0;
        }
    }
    arr = shuffleArray(arr).slice();
    arr = gameBoard(lines, rows, arr).slice();
    countBombs(lines, rows, arr);
    return arr;
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

function gameBoard(lines, rows, bombsArr) {
    let boardGame = [[]];
    let k = 0;
    for (let i = 0; i < lines; i++) {
        boardGame[i] = range(rows);
        for (let j = 0; j < rows; j++) {
            boardGame[i][j] = bombsArr[k];
            ++k;
        }
    }
    return boardGame;
}

function countBombs(lines, rows, arr) {
    for (let i = 0; i < lines; i++) {
        for (let j = 0; j < rows; j++) {
            if (!arr[i][j]) {
                let numberOfBombs = 0;
                if (i > 0 && j > 0 && arr[i - 1][j - 1] === "*") {
                    ++numberOfBombs;
                }
                if (i > 0 && arr[i - 1][j] === "*") {
                    ++numberOfBombs;
                }
                if (i > 0 && j + 1 < rows && arr[i - 1][j + 1] === "*") {
                    ++numberOfBombs;
                }
                if (j > 0 && arr[i][j - 1] === "*") {
                    ++numberOfBombs;
                }
                if (j + 1 < rows && arr[i][j + 1] === "*") {
                    ++numberOfBombs;
                }
                if (i + 1 < lines && j > 0 && arr[i + 1][j - 1] === "*") {
                    ++numberOfBombs;
                }
                if (i + 1 < lines && arr[i + 1][j] === "*") {
                    ++numberOfBombs;
                }
                if (i + 1 < lines && j + 1 < rows && arr[i + 1][j + 1] === "*") {
                    ++numberOfBombs;
                }
                arr[i][j] = numberOfBombs;
            }
        }
    }
}

