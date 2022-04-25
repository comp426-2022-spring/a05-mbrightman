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
        if (result.flip == 'heads') {
            document.getElementById('one-result').innerHTML = 'Heads!'
            document.getElementById('one-pic').src =`./assets/img/${result.flip}.png`
        } else {
            document.getElementById('one-result').innerHTML = 'Tails!'
            document.getElementById('one-pic').src =`./assets/img/${result.flip}.png`
        }

        
    })
}


// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
function flipCoins() {
    numFlips = document.getElementById('number-of-flips').value;

    fetch('http://localhost:5555/app/flips/coins', {
        body: JSON.stringify({
            'number': numFlips
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
        console.log(result)

        document.getElementById('heads_total').innerHTML = result.summary.heads
        document.getElementById('tails_total').innerHTML = result.summary.tails

        // populating table using raw data
        var rawDataTable = document.getElementById('raw_data')
        for (var i = 0; i < result.raw.length; i++) {
            var new_row = document.createElement('tr')

            var new_result = document.createElement('td')
            new_result.innerHTML = result.raw[i]
            new_row.appendChild(new_result)

            var row_img_box = document.createElement('td')
            var row_img = document.createElement('img')

            row_img.setAttribute('src', `assets/img/${result.raw[i]}.png`)
            // row_img.setAttribute('class', 'smallcoin')

            row_img_box.appendChild(row_img)
            new_row.appendChild(row_img_box)

            rawDataTable.appendChild(new_row)
        }

        document.getElementById('table').setAttribute('class', 'active')
    })
}


// Guess a flip by clicking either heads or tails button
function guessFlip(user_guess) {
    fetch('http://localhost:5555/app/flip/call', {
        body: JSON.stringify({
            'guess': user_guess
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

        if (result.result == 'win') {
            document.getElementById('win-or-lose').innerHTML = 'You won! Congrats.'
        } else {
            document.getElementById('win-or-lose').innerHTML = 'Wow you got it wrong... try again!'
        }

        
    })
}
