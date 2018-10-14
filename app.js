var model = {
    suits: ['hearts', 'diamonds', 'spades', 'clubs'],
    cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    deck: null,
    playerCount: 2,
    dealer: {
        cards: [],
        score: null
    },
    players: [{
        name: 'Burak',
        cards: [],
        score: null,
        currentPlayer: true,
        bet: null
    },
    {
        name: 'Ahu',
        cards: [],
        score: null,
        currentPlayer: false,
        bet: null
    }]
}

var octopus = {
    init: function() {
        model.deck = this.shuffleDeck(this.createDeck(model.suits, model.cards))
        this.drawCards()
        this.calcScore()
        viewDealer.init()
    },

    getModel : function() {
        return model
    },

    createDeck: function(suits, cards) {
        var deck = []
        for (var i = 0; i < suits.length; i++) {
            for (var j = 0; j < cards.length; j++) {
                var card = {}
                card['suit'] = suits[i]
                card['face'] = 'up'
                switch (true) {
                    case (cards[j] == 'J'):
                    case (cards[j] == 'Q'):
                    case (cards[j] == 'K'):
                        card['value'] = 10
                        break
                    case (cards[j] == 'A'):
                        card['value'] = 11
                        break
                    default:
                        card['value'] = cards[j]
                        break
                }
                card['card'] = cards[j]
                deck.push(card)
            }
        }
        return deck
    },
    // Knuth Shuffle Algorithm function from http://stackoverflow.com/a/2450976
    shuffleDeck: function(array) {
        var currentIndex = array.length, randomIndex, temporaryValue
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    },

    pickCard: function (deck) {
        return deck.pop()
    },

    drawCards: function() {
        for (var i = 0; i < 2; i++) {
            model.dealer.cards.push(this.pickCard(model.deck))
            model.players.forEach((player) => // due to closure ES6 syntax is handy in here
                player.cards.push(this.pickCard(model.deck))
            )
        }
    },

    calcScore: function() {
        model.dealer.score = model.dealer.cards.reduce(function(total, amount) {
            return total.value + amount.value
        })
        model.players.forEach(function(player) {
            player.score = player.cards.reduce(function(total, amount) {
                return total.value + amount.value
            })
        })
    }

}

var viewDealer = {
    init: function() {
        this.dealerCards = document.querySelector('.dealer_cards')
        this.dealerScore = document.querySelector('.dealer_score')

        this.render()
    },

    render: function() {
        var dealer = octopus.getModel().dealer
        this.dealerScore.innerText = dealer.score
        this.dealerCards.innerHTML = ''
        dealer.cards.forEach((card, i) => {
            this.dealerCards.innerHTML += '<li class="card card-' + card.card + ' card' + (i + 1) + ' ' + card.suit + ' ' + card.face + '"><span></span></li>'
        })
    }
}



octopus.init()

console.log(model.dealer.score, model.players[0].score, model.players[1].score)