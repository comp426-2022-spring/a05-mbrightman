// Focus div based on nav button click
// home button click
document.getElementById('homenav').onclick = function() {
    document.getElementById('homenav').className = 'active'
    document.getElementById('singlenav').className = ''
    document.getElementById('multinav').className = ''
    document.getElementById('guessnav').className = ''

    document.getElementById('home').className = ''
    document.getElementById('one').className = 'hidden'
    document.getElementById('many').className = 'hidden'
    document.getElementById('guess').className = 'hidden'
}

// single flip click
document.getElementById('singlenav').onclick = function() {
    document.getElementById('homenav').className = ''
    document.getElementById('singlenav').className = 'active'
    document.getElementById('multinav').className = ''
    document.getElementById('guessnav').className = ''

    document.getElementById('home').className = 'hidden'
    document.getElementById('one').className = ''
    document.getElementById('many').className = 'hidden'
    document.getElementById('guess').className = 'hidden'
}

// many flips click
document.getElementById('multinav').onclick = function() {
    document.getElementById('homenav').className = ''
    document.getElementById('singlenav').className = ''
    document.getElementById('multinav').className = 'active'
    document.getElementById('guessnav').className = ''

    document.getElementById('home').className = 'hidden'
    document.getElementById('one').className = 'hidden'
    document.getElementById('many').className = ''
    document.getElementById('guess').className = 'hidden'
}

// guess flip click
document.getElementById('guessnav').onclick = function() {
    document.getElementById('homenav').className = ''
    document.getElementById('singlenav').className = ''
    document.getElementById('multinav').className = ''
    document.getElementById('guessnav').className = 'active'

    document.getElementById('home').className = 'hidden'
    document.getElementById('one').className = 'hidden'
    document.getElementById('many').className = 'hidden'
    document.getElementById('guess').className = ''
}


// Flip one coin and show coin image to match result when button clicked
function flipCoin() {
    fetch('http://localhost:5555/app/flip/')
    .then(function (resp) {
        return resp.json()
    })
    .then(function (result) {
        document.getElementById('one-result').innerHTML = result.flip
        document.getElementById('one-pic').src =`./assets/img/${result.flip}.png`
    })
}


// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
function flipCoins() {
    numFlips = document.getElementById('number-of-flips').value
    fetch('http://localhost:5555/app/flips/coins', {
        body: JSON({
            'numFlips': numFlips
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post'
    })
    .then(function (resp) {
        return resp.json()
    })
    .then(function (result) {
        document.getElementById('heads_total').innerHTML = result.summary.heads
        document.getElementById('tails_total').innerHTML = result.summary.tails

        document.getElementById('table-results').setAttribute('class', 'active')
    })
}


// Guess a flip by clicking either heads or tails button
function guessFlip(user_guess) {
    fetch('http://localhost:5555/app/flip/call', {
        body: JSON({
            'user_guess': user_guess
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post'
    })
    .then(function (resp) {
        return resp.json()
    })
    .then(function (result) {
        document.getElementById('persons-call').innerHTML = user_guess
        document.getElementById('persons-call-pic').setAttribute('src', `assets/img/${user_guess}.png`)

        document.getElementById('actual-flip').innerHTML = result.flip
        document.getElementById('actual-flip-pic').setAttribute('src', `assets/img/${result.flip}.png`)

        document.getElementById('win-or-lose').innerHTML = result.result
    })
}
