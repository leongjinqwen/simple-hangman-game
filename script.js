const WORDS = ['banana', 'apple', 'watermelon', 'honeydew', 'orange', 'pineapple']
let answer;
let wordState;
let num;

const createButton = () => {
    const start = 'a'
    const end = 'z'
    for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++){
        let btn = document.createElement('button')
        $(btn).addClass('btn btn-primary m-1')
        $(btn).one('click',selectedButton) // only call function once
        $(btn).text(String.fromCharCode(i)) // convert from charcode to letter, then insert into button
        $('#button-container').append(btn)
    }
}

const selectedButton = (e) => {
    $(e.target).addClass('btn-secondary') // change the button background color to gray 
    let guessLetter = $(e.target).text() // get the text of button selected
    // loop through each letter in answer
    for (let i = 0; i < answer.length; i++){
        // if the selected letter is correct
        if ( guessLetter === answer[i] ){
            let correctEle = $('#word-container .btn-warning')[i] // get the correct letter button element with index
            $(correctEle).text(guessLetter) // replace the '_' with correct letter
            wordState[i] = guessLetter
        }
    }
    num--
    $('#guesses').text(num) // update number of guess in html
    
    if (checkWin()) {
        setTimeout(()=>{
            alert(`Awesome! You're correct!`)
            endGame()
        },100)
    } else if(num === 0) {
        setTimeout(()=>{
            alert('Game over!')
            endGame()
        },100)
    }
}

const endGame = () => {
    // create a restart button to reset the game without reload
    let restartButton = document.createElement('button')
    $(restartButton).addClass('btn btn-danger')
    $(restartButton).text('Play again')
    $(restartButton).one('click',() => {
        startGame()
        $(restartButton).remove() // remove the button once clicked
    })
    $('#board').append(restartButton)
}

const checkWin = () => {
    let win = false
    // if "_" not exist in wordState => the word is completed
    if (!wordState.includes('_')){
        win = true
    }
    return win
}
const showWordState = () => {
    for (let letter of answer){
        // create button for each letter of answer
        let btn = document.createElement('button')
        $(btn).addClass('btn btn-warning m-1')
        $(btn).text('_')
        $('#word-container').append(btn)
        wordState.push('_') // create an array to check the word state
    }
}

const startGame = () => {
    // set the initial state of variables
    answer = WORDS[ Math.floor(Math.random() * WORDS.length) ]
    wordState = []
    num = 10
    $('#guesses').text(num)
    $('#button-container').html('')
    $('#word-container').html('')
    createButton()
    showWordState()
}

startGame()