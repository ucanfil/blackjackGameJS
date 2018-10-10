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
                break;
            case ('A'):
                val = 11
                break;
            default:
                val = number;
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

console.log(deck)
