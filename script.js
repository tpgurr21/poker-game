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
		//<img src="./cards/4-c.png">
		let cardImg = document.createElement("img");
		let card = deck.pop();
		cardImg.src = "./cards/" + card + ".png";
		dealerSum += getValue(card);
		dealerAceCount += checkAce(card);
		document.getElementById("dealer-cards").append(cardImg);
	}
	console.log(dealerSum);

	for (let i = 0; i < 2; i++) {
		let cardImg = document.createElement("img");
		let card = deck.pop();
		cardImg.src = "./cards/" + card + ".png";
		yourSum += getValue(card);
		yourAceCount += checkAce(card);
		document.getElementById("your-cards").append(cardImg);
	}
	console.log(yourSum);
	document.getElementById("hit").addEventListener("click", hit);
	document.getElementById("stay").addEventListener("click", stay);

    /////////// CHECK IF THIS WORKS
    if(yourSum == 21 && dealerSum < 21) {
        canHit = false;
        stay()
    }
};

function hit() {
	if (!canHit) {
		return;
	}

	let cardImg = document.createElement("img");
	let card = deck.pop();
	cardImg.src = "./cards/" + card + ".png";
	yourSum += getValue(card);
	yourAceCount += checkAce(card);
	document.getElementById("your-cards").append(cardImg);

	if (reduceAce(yourSum, yourAceCount) > 21) {
		//A, J, K -> 11 + 10 + 10
		canHit = false;
		//     stay()
		// } else (yourSum <= 21)
	}

	//     if (yourSum > 21) {
	//         return stay();
	//     } else (yourSum <= 21)
}

const stay = function () {
	dealerSum = reduceAce(dealerSum, dealerAceCount);
	yourSum = reduceAce(yourSum, yourAceCount);

	canHit = false;
	document.getElementById("hidden").src = "./cards/" + hidden + ".png";

	let message = "";
	if (yourSum > 21) {
		message = "You Lose!";
	} else if (dealerSum > 21) {
		message = "You Win!";
	}
	//both you and dealer <= 21
	else if (yourSum == dealerSum) {
		message = "Tie!";
	} else if (yourSum > dealerSum) {
		message = "You Win!";
	} else if (yourSum < dealerSum) {
		message = "You Lose!";
	}

	document.getElementById("dealer-sum").innerText = dealerSum;
	document.getElementById("your-sum").innerText = yourSum;
	document.getElementById("results").innerText = message;
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

const checkAce = (card) => {
	card[0] == "A" ? 1 : 0;
};

const reduceAce = function (playerSum, playerAceCount) {
	while (playerSum > 21 && playerAceCount > 0) {
		playerSum -= 10;
		playerAceCount -= 1;
	}
	return playerSum;
};
