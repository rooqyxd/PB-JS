const colors = ["Hearts", "Diamonds", "Clubs", "Spades"];
const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

const deck = colors.flatMap((color) => numbers.map((number) => [color, number])); // tablica z 52 kartami

// pod quantity ilosc randowmoych kart do wziecia
const getRandomCards = (quantity) => {
    let randomCards = [];
    let tempDeck = [...deck];
    for (let i = 0; i < quantity; i++) {
        let indexOfRandomCard = Math.floor(Math.random() * tempDeck.length);
        let randomCard = tempDeck.splice(indexOfRandomCard, 1)[0];
        randomCards.push(randomCard);
    }
    return randomCards;
};

const getCardValue = (card) => {
    const value = card[1];
    if (value === "Ace") return 14;
    if (value === "King") return 13;
    if (value === "Queen") return 12;
    if (value === "Jack") return 11; // przypisanie wartosci numerycznej dla jopka-asa
    return parseInt(value);
};
function analyzeHand(hand) {
    const values = hand.map(getCardValue).sort((a, b) => a - b); //numery i sortowanie od najmniejszej do najwiekszej
    const suits = hand.map((card) => card[0]); // kolory
    const valueCounts = values.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1; //tworzy zbior values i podlicza ich ilosc, jesli wystepuje po raz pierwszy daje jej licznik na 1, jak sie potwarza to dodaje 1
        return acc;
    }, {});

    const isFlush = new Set(suits).size === 1; //znaleziona funkcja, jesli wszystkie kolory sa takie same
    const isStraight = values.every((v, i) => i === 0 || values[i - 1] === v - 1); // za pomocy metody every sprwadza sie czy kazda karta jest wieksza od poprzedniej o 1
    const isRoyal = values[0] === 10 && isStraight && isFlush; // sprawdza czy najmniejsza wartosc (pierwsza) jest rowna 10
    const pairs = Object.values(valueCounts).filter((count) => count === 2).length; // zamiana obiektu na array i filtorwanie czy wystepuja dwie takei same wartosci
    const threeOfAKind = Object.values(valueCounts).includes(3); // sprwadza czy sa 3 takie same wystepinia
    const fourOfAKind = Object.values(valueCounts).includes(4); // sprwadza czy sa 4 takie wystepaniea

    if (isRoyal) return "Royal Flush";
    if (isStraight && isFlush) return "Straight Flush";
    if (fourOfAKind) return "Four of a Kind";
    if (threeOfAKind && pairs === 1) return "Full House";
    if (isFlush) return "Flush";
    if (isStraight) return "Straight";
    if (threeOfAKind) return "Three of a Kind";
    if (pairs === 2) return "Two Pair";
    if (pairs === 1) return "One Pair";
    return "High Card";
}



const xd = [
    ["Diamonds", "6"],
    ["Hearts", "6"],
    ["Diamonds", "6"],
    ["Diamonds", "3"],
    ["Diamonds", "3"],
];
// const hand = tryxd;
const hand = getRandomCards(5);
console.log("Your cards:", hand);
console.log("Poker hand:", analyzeHand(hand));
