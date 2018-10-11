var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
var p1cards = []
var p2cards = []

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
p1cards.push(p1card1)
var p1card2 = pickCard(shuffledDeck)
p1cards.push(p1card2)
var p2card1 = pickCard(shuffledDeck)
p2cards.push(p2card1)
var p2card2 = pickCard(shuffledDeck)
p2cards.push(p2card2)

var p1score = calcScore(p1cards)
var p2score = calcScore(p2cards)


function calcScore(playerCards) {
    return playerCards.reduce(function(total, amount) {
        return total + amount[1]
    }, 0)
}

var p1card1Content = document.querySelector('.p1card1')
var p1card2Content = document.querySelector('.p1card2')
var p2card1Content = document.querySelector('.p2card1')
var p2card2Content = document.querySelector('.p2card2')
var p1scoreContent = document.querySelector('.p1score')
var p2scoreContent = document.querySelector('.p2score')
var winnerContent = document.querySelector('.winner')

/////////////////////////

p1scoreContent.textContent = p1score
p2scoreContent.textContent = p2score
winnerContent.textContent = winner(p1score, p2score)


function renderCard(cardContent, card) {
    cardContent.textContent = card[0]
    if (card[1] == 11) {
        cardContent.insertAdjacentHTML('afterend', ' <button class="switchValues">Switch Values</button>')
    }
}

renderCard(p1card1Content, p1card1)
renderCard(p1card2Content, p1card2)
renderCard(p2card1Content, p2card1)
renderCard(p2card2Content, p2card2)

function winner(p1score, p2score) {
    var winner = null
    switch (true) {
        case (p1score > 21):
            winner = 'P1 Busted'
            break
        case (p2score > 21):
            winner = 'P2 Busted'
            break
        case (p1score < p2score):
            winner = 'P2 has Won!'
            break
        case (p1score > p2score):
            winner = 'P1 has Won!'
    }
    return winner
}

function drawExtra(pickCard, shuffledDeck) {
    var extra = pickCard(shuffledDeck)
    return extra
}




document.querySelector('.p1Extra').addEventListener('click', function() {
    console.log(p1score, p2score)
    var p1card3 = drawExtra(pickCard, shuffledDeck)
    p1card2Content.insertAdjacentHTML
    ('afterend', '<p>Card ' + counter + ': <span class="card p1card3">' + p1card3[0] + '</span></p>')
    var p1card3Content = document.querySelector('.p1card3')
    renderCard(p1card3Content, p1card3)
    p1score = p1score + p1card3[1]
    console.log(p1score, p2score)
    winnerContent.textContent = winner(p1score, p2score)
})