const lodash = require('lodash');
const combination = require('../../tools/combination');
var TEXASHOLDEM_RULE = {};

TEXASHOLDEM_RULE.TYPE_ROYAL_FLUSH = 10;
TEXASHOLDEM_RULE.TYPE_STRAIGHT_FLUSH = 9;
TEXASHOLDEM_RULE.TYPE_FOUR_OF_A_KIND = 8;
TEXASHOLDEM_RULE.TYPE_FULLHOUSE = 7;
TEXASHOLDEM_RULE.TYPE_FLUSH = 6;
TEXASHOLDEM_RULE.TYPE_STRAIGHT = 5;
TEXASHOLDEM_RULE.TYPE_THREE_OF_A_KIND = 4;
TEXASHOLDEM_RULE.TYPE_TWO_PAIRS = 3;
TEXASHOLDEM_RULE.TYPE_ONE_PAIR = 2;
TEXASHOLDEM_RULE.TYPE_HIGH_CARD = 1;


TEXASHOLDEM_RULE.COMPARE_WIN = "WIN";
TEXASHOLDEM_RULE.COMPARE_LOSE = "LOSE";
TEXASHOLDEM_RULE.COMPARE_EQUAL = "EQUAL";

/*
 * 计算牌型
 */
TEXASHOLDEM_RULE.calType = cards_origin => {
    //计算牌型之前先排序
    let cards = lodash.orderBy(cards_origin, ['number', 'color'], ['desc', 'desc']);
    if (TEXASHOLDEM_RULE.isRoyalFlush(cards)) {
        return TEXASHOLDEM_RULE.TYPE_ROYAL_FLUSH;
    } else if (TEXASHOLDEM_RULE.isStraightFlush(cards)) {
        return TEXASHOLDEM_RULE.TYPE_STRAIGHT_FLUSH;
    } else if (TEXASHOLDEM_RULE.isFourOfaKind(cards)) {
        return TEXASHOLDEM_RULE.TYPE_FOUR_OF_A_KIND;
    } else if (TEXASHOLDEM_RULE.isFullhouse(cards)) {
        return TEXASHOLDEM_RULE.TYPE_FULLHOUSE;
    } else if (TEXASHOLDEM_RULE.isFlush(cards)) {
        return TEXASHOLDEM_RULE.TYPE_FLUSH;
    } else if (TEXASHOLDEM_RULE.isStraight(cards)) {
        return TEXASHOLDEM_RULE.TYPE_STRAIGHT;
    } else if (TEXASHOLDEM_RULE.isThreeOfaKind(cards)) {
        return TEXASHOLDEM_RULE.TYPE_THREE_OF_A_KIND;
    } else if (TEXASHOLDEM_RULE.isTwoPairs(cards)) {
        return TEXASHOLDEM_RULE.TYPE_TWO_PAIRS;
    } else if (TEXASHOLDEM_RULE.isOnePair(cards)) {
        return TEXASHOLDEM_RULE.TYPE_ONE_PAIR;
    } else {
        return TEXASHOLDEM_RULE.TYPE_HIGH_CARD;
    }
}

TEXASHOLDEM_RULE.isOnePair = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc'])
    let minus1 = sorted_cards[0].number - sorted_cards[1].number;
    let minus2 = sorted_cards[1].number - sorted_cards[2].number;
    let minus3 = sorted_cards[2].number - sorted_cards[3].number;
    let minus4 = sorted_cards[3].number - sorted_cards[4].number;
    if (minus1 === 0 && minus2 !== 0 && minus3 !== 0 && minus4 !== 0) {
        return true;
    } else if (minus1 !== 0 && minus2 === 0 && minus3 !== 0 && minus4 !== 0) {
        return true;
    } else if (minus1 !== 0 && minus2 !== 0 && minus3 === 0 && minus4 !== 0) {
        return true;
    } else if (minus1 !== 0 && minus2 !== 0 && minus3 !== 0 && minus4 === 0) {
        return true;
    } else {
        return false;
    }
}
/**
 * 两对的牌型只有AABBC ABBCC AABCC
 */
TEXASHOLDEM_RULE.isTwoPairs = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_cards[0].number - sorted_cards[1].number;
    let minus2 = sorted_cards[1].number - sorted_cards[2].number;
    let minus3 = sorted_cards[2].number - sorted_cards[3].number;
    let minus4 = sorted_cards[3].number - sorted_cards[4].number;
    if (minus1 === 0 && minus2 !== 0 && minus3 === 0 && minus4 !== 0) {
        return true;
    } else if (minus1 !== 0 && minus2 === 0 && minus3 !== 0 && minus4 === 0) {
        return true;
    } else if (minus1 === 0 && minus2 !== 0 && minus3 !== 0 && minus4 === 0) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.isThreeOfaKind = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_cards[0].number - sorted_cards[1].number;
    let minus2 = sorted_cards[1].number - sorted_cards[2].number;
    let minus3 = sorted_cards[2].number - sorted_cards[3].number;
    let minus4 = sorted_cards[3].number - sorted_cards[4].number;
    if (minus1 === 0 && minus2 === 0 && minus3 !== 0 && minus4 !== 0) {
        return true;
    } else if (minus1 !== 0 && minus2 === 0 && minus3 === 0 && minus4 !== 0) {
        return true;
    } else if (minus1 !== 0 && minus2 !== 0 && minus3 === 0 && minus4 === 0) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.isStraight = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_cards[0].number - sorted_cards[1].number;
    let minus2 = sorted_cards[1].number - sorted_cards[2].number;
    let minus3 = sorted_cards[2].number - sorted_cards[3].number;
    let minus4 = sorted_cards[3].number - sorted_cards[4].number;
    if (minus1 === 1 && minus2 === 1 && minus3 === 1 && minus4 === 1) {
        return true;
    } else if (minus1 === 9 && minus2 === 1 && minus3 === 1 && minus4 === 1) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.isFlush = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc']);
    if (sorted_cards[0].color === sorted_cards[1].color &&
        sorted_cards[1].color === sorted_cards[2].color &&
        sorted_cards[2].color === sorted_cards[3].color &&
        sorted_cards[3].color === sorted_cards[4].color) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.isFullhouse = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_cards[0].number - sorted_cards[1].number;
    let minus2 = sorted_cards[1].number - sorted_cards[2].number;
    let minus3 = sorted_cards[2].number - sorted_cards[3].number;
    let minus4 = sorted_cards[3].number - sorted_cards[4].number;
    if (minus1 === 0 && minus2 === 0 && minus3 !== 0 && minus4 === 0) {
        return true;
    } else if (minus1 === 0 && minus2 !== 0 && minus3 === 0 && minus4 === 0) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.isFourOfaKind = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_cards[0].number - sorted_cards[1].number;
    let minus2 = sorted_cards[1].number - sorted_cards[2].number;
    let minus3 = sorted_cards[2].number - sorted_cards[3].number;
    let minus4 = sorted_cards[3].number - sorted_cards[4].number;
    if (minus1 === 0 && minus2 === 0 && minus3 === 0 && minus4 !== 0) {
        return true;
    } else if (minus1 !== 0 && minus2 === 0 && minus3 === 0 && minus4 === 0) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.isStraightFlush = cards => {
    if (TEXASHOLDEM_RULE.isStraight(cards) && TEXASHOLDEM_RULE.isFlush(cards)) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.isRoyalFlush = cards => {
    let sorted_cards = lodash.orderBy(cards, ['number', 'color'], ['desc', 'desc']);
    if (TEXASHOLDEM_RULE.isStraightFlush(cards) && sorted_cards[1].number === 13) {
        return true;
    } else {
        return false;
    }
}

TEXASHOLDEM_RULE.compareTwo = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    //首先判断所有牌大小是否一样,并且都不是同花,一样就直接相等,后续判断则不用考虑相等的比较
    if (sorted_first[0].number === sorted_second[0].number &&
        sorted_first[1].number === sorted_second[1].number &&
        sorted_first[2].number === sorted_second[2].number &&
        sorted_first[3].number === sorted_second[3].number &&
        sorted_first[4].number === sorted_second[4].number &&
        TEXASHOLDEM_RULE.calType(sorted_first) !== TEXASHOLDEM_RULE.TYPE_FLUSH &&
        TEXASHOLDEM_RULE.calType(sorted_second) !== TEXASHOLDEM_RULE.TYPE_FLUSH
    ) {
        return TEXASHOLDEM_RULE.COMPARE_EQUAL;
    }

    //后续判断不用判断相等了
    let firstType = TEXASHOLDEM_RULE.calType(sorted_first);
    let secondType = TEXASHOLDEM_RULE.calType(sorted_second);
    // 先比较牌型
    if (firstType > secondType) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (firstType < secondType) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else {
        //牌型相同再比较挂子
        switch (firstType) {
            case TEXASHOLDEM_RULE.TYPE_ROYAL_FLUSH: //皇家同花顺只能是平
                return TEXASHOLDEM_RULE.COMPARE_EQUAL;
            case TEXASHOLDEM_RULE.TYPE_STRAIGHT_FLUSH:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_STRAIGHT_FLUSH(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_FOUR_OF_A_KIND:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_TYPE_FOUR_OF_A_KIND(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_FULLHOUSE:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_FULLHOUSE(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_FLUSH:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_FLUSH(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_STRAIGHT:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_STRAIGHT(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_THREE_OF_A_KIND:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_THREE_OF_A_KIND(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_TWO_PAIRS:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_TWO_PAIRS(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_ONE_PAIR:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_ONE_PAIR(sorted_first, sorted_second);
            case TEXASHOLDEM_RULE.TYPE_HIGH_CARD:
                return TEXASHOLDEM_RULE.COMPARE_TYPE_HIGH_CARD(sorted_first, sorted_second);
            default:
                return "error";
        }
    }
}

/**
 * 同花顺大小比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_STRAIGHT_FLUSH = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    let a = sorted_first[0].number;
    let b = sorted_second[0].number;
    if (a === 14) { //有A的肯定是最小顺12345，如果是AKQJT就是皇家同花顺了
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    }
    if (b === 14) { //有A的肯定是最小顺12345，如果是AKQJT就是皇家同花顺了
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    }
    if (a > b) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    }
}

/**
 * 四条比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_TYPE_FOUR_OF_A_KIND = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    let a4 = TEXASHOLDEM_RULE.findFourFromFourOfAKind(sorted_first);
    let b4 = TEXASHOLDEM_RULE.findFourFromFourOfAKind(sorted_second);
    if (a4 > b4) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (a4 < b4) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else {
        let a = TEXASHOLDEM_RULE.findOneFromFourOfAKind(sorted_first);
        let b = TEXASHOLDEM_RULE.findOneFromFourOfAKind(sorted_second);
        if (a > b) {
            return TEXASHOLDEM_RULE.COMPARE_WIN;
        } else {
            return TEXASHOLDEM_RULE.COMPARE_LOSE;
        }
    }
}

/**
 * 找出四条的大小
 */
TEXASHOLDEM_RULE.findFourFromFourOfAKind = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    if ((sorted_hand[0].number - sorted_hand[1].number) === 0) {
        return sorted_hand[0].number;
    } else {
        return sorted_hand[4].number;
    }
}
/**
 * 找出四条挂牌的大小
 */
TEXASHOLDEM_RULE.findOneFromFourOfAKind = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    if ((sorted_hand[0].number - sorted_hand[1].number) === 0) {
        return sorted_hand[4].number;
    } else {
        return sorted_hand[0].number;
    }
}

/**
 * 葫芦比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_FULLHOUSE = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    let a2 = TEXASHOLDEM_RULE.findTwoFromFullhouse(sorted_first);
    let b2 = TEXASHOLDEM_RULE.findTwoFromFullhouse(sorted_second);
    let a3 = TEXASHOLDEM_RULE.findThreeFromFullhouse(sorted_first);
    let b3 = TEXASHOLDEM_RULE.findThreeFromFullhouse(sorted_second);
    //先比较葫芦的三张大小
    if (a3 > b3) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (a3 < b3) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else {
        //再比较葫芦的对子大小
        if (a2 > b2) {
            return TEXASHOLDEM_RULE.COMPARE_WIN;
        } else {
            return TEXASHOLDEM_RULE.COMPARE_LOSE;
        }
    }
}

/**
 * 找出葫芦中的对子
 */
TEXASHOLDEM_RULE.findTwoFromFullhouse = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    let minus2 = sorted_hand[1].number - sorted_hand[2].number;
    if (minus1 === 0 && minus2 === 0) {
        return sorted_hand[4].number
    } else {
        return sorted_hand[0].number
    }
}
/**
 * 找出葫芦中的三条
 */
TEXASHOLDEM_RULE.findThreeFromFullhouse = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    let minus2 = sorted_hand[1].number - sorted_hand[2].number;
    if (minus1 === 0 && minus2 === 0) {
        return sorted_hand[0].number
    } else {
        return sorted_hand[4].number
    }
}
/**
 * 同花比较
 * 从最大的牌依次开始比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_FLUSH = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    if (sorted_first[0].number > sorted_second[0].number) { //
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[0].number < sorted_second[0].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[1].number > sorted_second[1].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[1].number < sorted_second[1].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[2].number > sorted_second[2].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[2].number < sorted_second[2].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[3].number > sorted_second[3].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[3].number < sorted_second[3].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[4].number > sorted_second[4].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[4].number < sorted_second[4].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    }
}
/**
 * 顺子比较
 * 顺子只有可能是上顺和下顺
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_STRAIGHT = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    if (sorted_first[4].number === 2 && sorted_first[0].number === 14) { //first 为 A5432
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_second[4].number === 2 && sorted_second[0].number === 14) { //second为 A5432
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[0].number > sorted_second[0].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    }

}

/**
 * 三条比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_THREE_OF_A_KIND = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    let a3 = TEXASHOLDEM_RULE.findThreeFromThreeOfAKind(sorted_first);
    let b3 = TEXASHOLDEM_RULE.findThreeFromThreeOfAKind(sorted_second);
    let a_1 = TEXASHOLDEM_RULE.findSingleBiggerFromThreeOfAKind(sorted_first);
    let b_1 = TEXASHOLDEM_RULE.findSingleBiggerFromThreeOfAKind(sorted_second);
    let a_2 = TEXASHOLDEM_RULE.findSingleSmallerFromThreeOfAKind(sorted_first);
    let b_2 = TEXASHOLDEM_RULE.findSingleSmallerFromThreeOfAKind(sorted_second);

    //先比较三条的大小
    if (a3 > b3) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (a3 < b3) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else {
        //再比较三条高张的大小
        if (a_1 > b_1) {
            return TEXASHOLDEM_RULE.COMPARE_WIN;
        } else if (a_1 < b_1) {
            return TEXASHOLDEM_RULE.COMPARE_LOSE;
        } else {
            //再比较第二高张的大小
            if (a_2 > b_2) {
                return TEXASHOLDEM_RULE.COMPARE_WIN;
            } else if (a_2 < b_2) {
                return TEXASHOLDEM_RULE.COMPARE_LOSE;
            }
        }
    }
}

/**
 * 找出三条中的三张相同牌
 */
TEXASHOLDEM_RULE.findThreeFromThreeOfAKind = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    let minus2 = sorted_hand[1].number - sorted_hand[2].number;
    let minus3 = sorted_hand[2].number - sorted_hand[3].number;
    if (minus1 === 0 && minus2 === 0) {
        return sorted_hand[0].number;
    } else if (minus2 === 0 && minus3 === 0) {
        return sorted_hand[3].number;
    } else {
        return sorted_hand[4].number;
    }
}

/**
 * 找出三条中的第一高牌
 */
TEXASHOLDEM_RULE.findSingleBiggerFromThreeOfAKind = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    let minus2 = sorted_hand[1].number - sorted_hand[2].number;
    if (minus1 === 0 && minus2 === 0) {
        return sorted_hand[3].number;
    } else {
        return sorted_hand[0].number;
    }
}

/**
 * 找出三条中的第二高牌
 */
TEXASHOLDEM_RULE.findSingleSmallerFromThreeOfAKind = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus3 = sorted_hand[2].number - sorted_hand[3].number;
    let minus4 = sorted_hand[3].number - sorted_hand[4].number;
    if (minus3 === 0 && minus4 === 0) {
        return sorted_hand[1].number;
    } else {
        return sorted_hand[4].number;
    }
}
/**
 * 两对比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_TWO_PAIRS = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    let a_2_1 = TEXASHOLDEM_RULE.findBiggerPairFromTwoPairs(sorted_first);
    let b_2_1 = TEXASHOLDEM_RULE.findBiggerPairFromTwoPairs(sorted_second);
    let a_2_2 = TEXASHOLDEM_RULE.findSmallerPairFromTwoPairs(sorted_first);
    let b_2_2 = TEXASHOLDEM_RULE.findSmallerPairFromTwoPairs(sorted_second);
    let a_s = TEXASHOLDEM_RULE.findSingleFromTwoPairs(sorted_first);
    let b_s = TEXASHOLDEM_RULE.findSingleFromTwoPairs(sorted_second);

    if (a_2_1 > b_2_1) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (a_2_1 < b_2_1) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (a_2_2 > b_2_2) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (a_2_2 < b_2_2) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (a_s > b_s) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (a_s < b_s) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    }
}

/**
 * 取两对中的单张
 * 两对的牌型只有AABBC ABBCC AABCC
 */
TEXASHOLDEM_RULE.findSingleFromTwoPairs = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    let minus2 = sorted_hand[1].number - sorted_hand[2].number;
    let minus3 = sorted_hand[2].number - sorted_hand[3].number;
    let minus4 = sorted_hand[3].number - sorted_hand[4].number;
    if (minus1 === 0 && minus3 === 0) {
        return sorted_hand[4].number;
    } else if (minus2 === 0 && minus4 === 0) {
        return sorted_hand[0].number;
    } else {
        return sorted_hand[2].number;
    }
}

/**
 * 取底对
 * 两对的牌型只有AABBC ABBCC AABCC
 */
TEXASHOLDEM_RULE.findSmallerPairFromTwoPairs = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus4 = sorted_hand[3].number - sorted_hand[4].number;
    if (minus4 === 0) {
        return sorted_hand[4].number;
    } else {
        return sorted_hand[3].number;
    }
}

/**
 * 取高对
 * 两对的牌型只有AABBC ABBCC AABCC
 */
TEXASHOLDEM_RULE.findBiggerPairFromTwoPairs = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    if (minus1 === 0) {
        return sorted_hand[0].number;
    } else {
        return sorted_hand[1].number;
    }
}


/**
 * 一对比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_ONE_PAIR = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    let a = TEXASHOLDEM_RULE.findPairFromOnePair(sorted_first);
    let b = TEXASHOLDEM_RULE.findPairFromOnePair(sorted_second);
    let first3 = TEXASHOLDEM_RULE.removePair(sorted_first);
    let second3 = TEXASHOLDEM_RULE.removePair(sorted_second);

    if (a > b) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (a < b) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (first3[0].number > second3[0].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (first3[0].number < second3[0].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (first3[1].number > second3[1].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (first3[1].number < second3[1].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (first3[2].number > second3[2].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (first3[2].number < second3[2].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    }
}
/**
 * 取对子的大小
 * AABCD ABBCD ABCCD ABCDD
 */
TEXASHOLDEM_RULE.findPairFromOnePair = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    let minus2 = sorted_hand[1].number - sorted_hand[2].number;
    let minus3 = sorted_hand[2].number - sorted_hand[3].number;
    if (minus1 === 0) {
        return sorted_hand[0].number;
    } else if (minus2 === 0) {
        return sorted_hand[1].number;
    } else if (minus3 === 0) {
        return sorted_hand[2].number;
    } else {
        return sorted_hand[3].number;
    }
}

/**
 * 从五张牌中移除对子
 * AABCD ABBCD ABCCD ABCDD
 */
TEXASHOLDEM_RULE.removePair = hand => {
    let sorted_hand = lodash.orderBy(hand, ['number', 'color'], ['desc', 'desc']);
    let back = [];
    let minus1 = sorted_hand[0].number - sorted_hand[1].number;
    let minus2 = sorted_hand[1].number - sorted_hand[2].number;
    let minus3 = sorted_hand[2].number - sorted_hand[3].number;
    if (minus1 === 0) {
        back.push(hand[2]);
        back.push(hand[3]);
        back.push(hand[4]);
    } else if (minus2 === 0) {
        back.push(hand[0]);
        back.push(hand[3]);
        back.push(hand[4]);
    } else if (minus3 === 0) {
        back.push(hand[0]);
        back.push(hand[1]);
        back.push(hand[4]);
    } else {
        back.push(hand[0]);
        back.push(hand[1]);
        back.push(hand[2]);
    }
    return back;
}
/**
 * High 牌比较
 */
TEXASHOLDEM_RULE.COMPARE_TYPE_HIGH_CARD = (first, second) => {
    let sorted_first = lodash.orderBy(first, ['number', 'color'], ['desc', 'desc']);
    let sorted_second = lodash.orderBy(second, ['number', 'color'], ['desc', 'desc']);
    if (sorted_first[0].number > sorted_second[0].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[0].number < sorted_second[0].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[1].number > sorted_second[1].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[1].number < sorted_second[1].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[2].number > sorted_second[2].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[2].number < sorted_second[2].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[3].number > sorted_second[3].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else if (sorted_first[3].number < sorted_second[3].number) {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    } else if (sorted_first[4].number > sorted_second[4].number) {
        return TEXASHOLDEM_RULE.COMPARE_WIN;
    } else {
        return TEXASHOLDEM_RULE.COMPARE_LOSE;
    }
}

/**
 * 7张牌中找出组合最大牌型的5张牌
 */
TEXASHOLDEM_RULE.findBiggestHandFromSevenCards = serverCards => {
    let combination_arr = combination.make(serverCards, 5, 1); //获取所有的组合
    // console.log(combination_arr)
    let compare = (first, second) => {
        // let typefirst = TEXASHOLDEM_RULE.calType(first);
        // let typesecond = TEXASHOLDEM_RULE.calType(second);
        // console.log(first)
        // console.log(second)
        // console.log(getTypeByNumber(typefirst)+"--VS--"+getTypeByNumber(typesecond))
        if (TEXASHOLDEM_RULE.compareTwo(first, second) === TEXASHOLDEM_RULE.COMPARE_WIN) {
            return -1;
        } else if (TEXASHOLDEM_RULE.compareTwo(first, second) === TEXASHOLDEM_RULE.COMPARE_LOSE) {
            return 1;
        } else {
            return 0;
        }
    }

    let sort_arr = combination_arr.sort(compare);
    return lodash.orderBy(sort_arr[0], ['number', 'color'], ['desc', 'desc']);
}
/**
 * 牌型名称转换
 */
TEXASHOLDEM_RULE.getTypeByNumber = n => {
    if (n === TEXASHOLDEM_RULE.TYPE_ROYAL_FLUSH) {
        return "皇家同花顺"
    } else if(n === TEXASHOLDEM_RULE.TYPE_STRAIGHT_FLUSH){
        return "同花顺";
    }else if(n === TEXASHOLDEM_RULE.TYPE_FOUR_OF_A_KIND){
        return "四条";
    }else if(n === TEXASHOLDEM_RULE.TYPE_FULLHOUSE){
        return "葫芦";
    }else if(n === TEXASHOLDEM_RULE.TYPE_FLUSH){
        return "同花";
    }else if(n === TEXASHOLDEM_RULE.TYPE_STRAIGHT){
        return "顺子";
    }else if(n === TEXASHOLDEM_RULE.TYPE_THREE_OF_A_KIND){
        return "三条";
    }else if(n === TEXASHOLDEM_RULE.TYPE_TWO_PAIRS){
        return "两对";
    }else if(n === TEXASHOLDEM_RULE.TYPE_ONE_PAIR){
        return "一对";
    }else if(n === TEXASHOLDEM_RULE.TYPE_HIGH_CARD){
        return "高牌";
    }
}
module.exports = TEXASHOLDEM_RULE;
