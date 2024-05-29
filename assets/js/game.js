const deck = [];
const dealerCards = [];
const playerCards = [];
let dealerPoints = 0;
let playerPoints = 0;
const dealerHand = document.querySelector(".container_dealer-hand");
const playerHand = document.querySelector(".container_player-hand");
const hitButton = document.querySelector(".hit");
// const figures = ["C", "D", "H", "S"];
// const especiales = ["A", "J", "Q", "K"];

function createDeck() {
	for (let i = 1; i <= 13; i++) {
		switch (i) {
			case 1:
				deck.push("AC");
				deck.push("AD");
				deck.push("AH");
				deck.push("AS");
				break;
			case 11:
				deck.push("JC");
				deck.push("JD");
				deck.push("JH");
				deck.push("JS");
				break;
			case 12:
				deck.push("QC");
				deck.push("QD");
				deck.push("QH");
				deck.push("QS");
				break;
			case 13:
				deck.push("KC");
				deck.push("KD");
				deck.push("KH");
				deck.push("KS");
				break;
			default:
				deck.push(i + "C");
				deck.push(i + "D");
				deck.push(i + "H");
				deck.push(i + "S");
				break;
		}
	}
}
// function createDeck() {
// 	for (let i = 2; i <= 10; i++) {
// 		for (let figure of figures) {
// 			deck.push(figure + i);
// 		}
// 	}
// 	for (let figure of figures) {
// 		for (let especial of especiales) {
// 			deck.push(figure + especial);
// 		}
// 	}
// }
// console.time("deck");
// createDeck();
// console.timeEnd("deck");

function shuffle() {
	for (let i = 0; i <= deck.length - 1; i++) {
		let randomPos = Math.floor(Math.random() * deck.length - 1 + 1);
		let previusCard = deck[randomPos];
		deck[randomPos] = deck[i];
		deck[i] = previusCard;
	}
}

// console.log(deck);
// shuffle();
// console.log(deck);

// let cCards = deck.filter(e => e.includes("C"));
// let dCards = deck.filter(e => e.includes("D"));
// let hCards = deck.filter(e => e.includes("H"));
// let sCards = deck.filter(e => e.includes("S"));
// console.table({ cards: cCards, size: cCards.length });
// console.table({ cards: dCards, size: dCards.length });
// console.table({ cards: hCards, size: hCards.length });
// console.table({ cards: sCards, size: sCards.length });

// function dealCards() {}

function drawCard() {
	let card = deck.pop();
	return card;
}

// mi funcion value card
// function valueOfCard(card) {
// 	const valuesCard = {
// 		A: [1, 10],
// 		2: 2,
// 		3: 3,
// 		4: 4,
// 		5: 5,
// 		6: 6,
// 		7: 7,
// 		8: 8,
// 		9: 9,
// 		10: 10,
// 	};
// 	return card.includes("A")
// 		? valuesCard["A"]
// 		: card.match(/[J,Q,K,10]/)
// 		? 10
// 		: card.match(/([2-9])/g)
// 		? valuesCard[card.match(/([2-9]|10)/g)]
// 		: "";
// }

function valueOfCard(card) {
	const str = card.slice(0, card.length - 1);
	return Number(str) ? Number(str) : str === "A" ? 11 : 10;
}

function createCard(card, owner) {
	const cardElement = document.createElement("img");
	cardElement.src = `./assets/cartas/${card}.png`;
	cardElement.classList.add("card");
	owner === "player"
		? (playerHand.append(cardElement), playerCards.push(card))
		: (dealerHand.append(cardElement), dealerCards.push(card));
}

function calculatePoints(owner) {
	owner === "player"
		? playerPoints > 0
			? (playerPoints += valueOfCard(playerCards[playerCards.length - 1]))
			: playerCards.map(card => (playerPoints += valueOfCard(card)))
		: dealerPoints > 0
		? (dealerPoints += valueOfCard(dealerCards[dealerCards.length - 1]))
		: dealerCards.map(card => (dealerPoints += valueOfCard(card)));
}

function initialGame() {
	createDeck();
	shuffle();
	console.log(deck);
	createCard(drawCard(), "player");
	createCard(drawCard());
	createCard(drawCard(), "player");
	createCard(drawCard());
	console.log(playerCards, dealerCards, deck);
	calculatePoints("player");
	calculatePoints();
}

initialGame();
console.log({ playerPoints, dealerPoints });

function hitCard(owner) {
	createCard(drawCard(), owner);
	calculatePoints(owner);
	if (playerPoints > 21) {
		const dialog = document.querySelector(".lose_dialog");
		dialog.innerText = `Sorry, you lost. This round you got it ${playerPoints}. Better luck next time!`;
		dialog.setAttribute("open", "true");
	}
}

hitButton.addEventListener("click", () => hitCard("player"));
