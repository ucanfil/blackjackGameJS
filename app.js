var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']

function createSuit(numbers, suit) {
    var cards = []
    numbers.map(function (number) {
        val = ''
        card = suit + ' of ' + number;
        switch (number) {
            case ('J'):
            case ('Q'):
            case ('K'):
                val = 10
                break
            case ('A'):
                val = 11
                break
            default:
                val = number
        }
        cards.push([card, val])
    })
    return cards;
}

var hearts = createSuit(numbers, 'hearts')
var spades = createSuit(numbers, 'spades')
var diamonds = createSuit(numbers, 'diamonds')
var clubs = createSuit(numbers, 'clubs')

var deck = hearts.concat(spades).concat(diamonds).concat(clubs)
var shuffledDeck = shuffle(deck)

// Knuth Shuffle Algorithm function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, randomIndex, temporaryValue

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

function pickCard(deck) {
    return deck.pop()
}

var p1card1 = pickCard(shuffledDeck)
var p1card2 = pickCard(shuffledDeck)
var p2card1 = pickCard(shuffledDeck)
var p2card2 = pickCard(shuffledDeck)
var p1score = p1card1[1] + p1card2[1]
var p2score = p2card1[1] + p2card2[1]
var p1card1Content = document.querySelector('.p1card1')
var p1card2Content = document.querySelector('.p1card2')
var p2card1Content = document.querySelector('.p2card1')
var p2card2Content = document.querySelector('.p2card2')

function winner(p1score, p2score) {
    var winner = null
    switch (true) {
        case (p1score > 21 && p2score < 21):
            winner = 'P1 Score: ' + p1score + ' P2 Score: ' + p2score + ' Player 1 Busted!'
            break
        case (p2score > 21 && p1score < 21):
            winner = 'P1 Score: ' + p1score + ' P2 Score: ' + p2score + ' Player 2 Busted!!'
            break
        case (p1score < p2score):
            winner = 'P1 Score: ' + p1score + ' P2 Score: ' + p2score + ' Player 2 has Won!'
            break
        case (p1score > p2score):
            winner = 'P1 Score: ' + p1score + ' P2 Score: ' + p2score + ' Player 1 has Won!'
    }
    return winner
}

/////////////////////////
p1card1Content.textContent = p1card1[0];
p1card2Content.textContent = p1card2[0];
p2card1Content.textContent = p2card1[0];
p2card2Content.textContent = p2card2[0];

document.querySelector('.score').textContent = winner(p1score, p2score)


function drawExtra(pickCard, shuffledDeck) {
    var extra = pickCard(shuffledDeck)
    return extra
}

document.querySelector('.p1Extra').addEventListener('click', function() {
    console.log(p1score, p2score)
    var extra = drawExtra(pickCard, shuffledDeck)
    document.querySelector('.p1card3').textContent = extra[0];
    p1score = p1score + extra[1]
    console.log(p1score, p2score)
    document.querySelector('.score').textContent = winner(p1score, p2score)
})

document.querySelector('.p2Extra').addEventListener('click', function() {
    console.log(p1score, p2score)
    var extra = drawExtra(pickCard, shuffledDeck)
    document.querySelector('.p2card3').textContent = extra[0];
    p2score = p2score + extra[1]
    console.log(p1score, p2score)
    document.querySelector('.score').textContent = winner(p1score, p2score)
})