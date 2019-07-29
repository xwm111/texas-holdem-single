var lodash = require('lodash');
var Poker = {};
var POKER_COLORS = {
    4: '♠', 	// spade
    3: '♥', 	// heart
    2: '♣', 	// club
    1: '♦' 		// diamond
};

var POKER_NUMBERS = {
    14: 'A',
    13: 'K',
    12: 'Q',
    11: 'J',
    10: '10',
    9: '9',
    8: '8',
    7: '7',
    6: '6',
    5: '5',
    4: '4',
    3: '3',
    2: '2',
};

var POKER_CARDS_ORIGIN = [];
for (var color = 1; color <= 4; color++) {
    for (var number = 2; number <= 14; number++) {
        var card = {};
        card.color = color;
        card.number = number;
        card.view = POKER_NUMBERS[number] + '' + POKER_COLORS[color];
        POKER_CARDS_ORIGIN.push(card);
    }
}

Poker.SPADE = 4;
Poker.HEART = 3;
Poker.CLUB = 2;
Poker.DIAMOND = 1;
Poker.COLORS = POKER_COLORS;
Poker.NUMBERS = POKER_NUMBERS;
Poker.CARDS = POKER_CARDS_ORIGIN;
Poker.shuffle = ()=>{ 
   return lodash.shuffle(POKER_CARDS_ORIGIN);
}

module.exports = Poker;
