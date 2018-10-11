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

function renderCard(cardContent, card) {
    cardContent.textContent = card[0]
    if (card[1] == 11) {
        cardContent.insertAdjacentHTML('beforeend', ' <button class="switchValues">Switch Values</button>')
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
            cancelEventListeners()
            break
        case (p2score > 21):
            winner = 'P2 Busted'
            cancelEventListeners()
            break
        case (p1score < p2score):
            winner = 'P2 is ahead!'
            // cancelEventListeners()
            break
        case (p1score > p2score):
            winner = 'P1 is ahead!'
            // cancelEventListeners()
            break
    }
    return winner
}

function drawExtra(pickCard, shuffledDeck, playerCards) {
    playerCards.push(pickCard(shuffledDeck))
}

/////////////////////////

p1scoreContent.textContent = p1score
p2scoreContent.textContent = p2score
winnerContent.textContent = winner(p1score, p2score)


document.querySelector('.p1Extra').addEventListener('click', hit1)
document.querySelector('.p2Extra').addEventListener('click', hit2)

function hit1() {
    drawExtra(pickCard, shuffledDeck, p1cards)
    var p1card3 = p1cards[p1cards.length - 1]
    p1card2Content.insertAdjacentHTML
    ('afterend', '<p>Card ' + p1cards.length + ': <span class="card p1card3">' + p1card3[0] + '</span></p>')
    var p1card3Content = document.querySelector('.p1card3')
    renderCard(p1card3Content, p1card3)
    p1score = calcScore(p1cards)
    p1scoreContent.textContent = p1score
    console.log(p1score, p2score)
    winnerContent.textContent = winner(p1score, p2score)
}

function hit2() {
    drawExtra(pickCard, shuffledDeck, p2cards)
    var p2card3 = p2cards[p2cards.length - 1]
    p2card2Content.insertAdjacentHTML
    ('afterend', '<p>Card ' + p2cards.length + ': <span class="card p2card3">' + p2card3[0] + '</span></p>')
    var p2card3Content = document.querySelector('.p2card3')
    renderCard(p2card3Content, p2card3)
    p2score = calcScore(p2cards)
    p2scoreContent.textContent = p2score
    console.log(p1score, p2score)
    winnerContent.textContent = winner(p1score, p2score)
}

function cancelEventListeners() {
    document.querySelector('.p1Extra').removeEventListener('click', hit1)
    document.querySelector('.p2Extra').removeEventListener('click', hit2)
}