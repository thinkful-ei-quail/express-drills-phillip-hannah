const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


//sum handler function
app.get('/sum', (req, res) => {
    const {a, b} = req.query;
    const num1 = parseInt(a);
    const num2 = parseInt(b);
    const sum = num1 + num2;
    res.send(`the sum of ${num1} and ${num2} is ${sum}`)
})


//cipher handler function
app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;
    const shiftNum = parseInt(shift);
    const base = 'A'.charCodeAt(0);

    const cipher = text.toUpperCase().split('').map(char => {
        const code = char.charCodeAt(0);

        if(code > (base + 26) || code < base) {
           return char; 
        }

        let difference = code - base;
        difference = difference + shiftNum;
        difference = difference % 26;

        shiftChar = String.fromCharCode(base + difference);
        return shiftChar;

    }).join('');

    res.send(cipher);
})

app.get('/lotto', (req, res) => {
    const { numbers } = req.query;
    console.log(numbers);
    
    const guesses = numbers.map(num => {
        parseInt(num)
    }) 

    if(!numbers) {
        res.send('requires numbers')
    }

    const winningNums = [];
    for(let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * 20) + 1;
        winningNums.push(random);
    }

    let difference = winningNums.filter(num => !guesses.includes(num));
    
    if (difference < 4) {
        res.send('Sorry, you lose')
    } else if(difference = 4) {
        res.send('Congratulations, you win a free ticket!')
    } else if(difference = 5) {
        res.send('Congratulations! You win $100!')
    } else {
        res.send('Wow! Unbelievable! You could have won the mega millions!')
    }
})




app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});
