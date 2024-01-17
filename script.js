let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true; // allows the player to draw while your total is <= 21

window.onload = function () {
	buildDeck();
	shuffleDeck();
	startGame();
};

const buildDeck = () => {
	let values = [
		"A",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"J",
		"Q",
		"K",
	];
	let types = ["C", "D", "H", "S"];
	deck = [];

	for (let i = 0; i < types.length; i++) {
		for (let j = 0; j < values.length; j++) {
			deck.push(values[j] + "-" + types[i]);
		}
	}
	// console.log(deck);
};

const shuffleDeck = () => {
	for (let i = 0; i < deck.length; i++) {
		let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
		let temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
	console.log(deck);
};

const startGame = () => {
	hidden = deck.pop();
	dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img>
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

};

const getValue = (card) => {
	let data = card.split("-"); // "4-C" -> ["4", "C"]
	let value = data[0];

	if (isNaN(value)) {
		if (value == "A") {
			return 11;
		}
		return 10;
	}

	return parseInt(value);
};

const checkAce = card => {
    card[0] == "A" ? 1 : 0
}