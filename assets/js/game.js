(() => {
	"use strict";

	const deck = [],
		dealerCards = [],
		playerCards = [],
		dealerHand = document.querySelector(".container_dealer-hand"),
		playerHand = document.querySelector(".container_player-hand"),
		hitButton = document.querySelector(".hit"),
		loseDialog = document.querySelector(".lose_dialog"),
		losetextDialog = document.querySelector(".lose_dialog > h3"),
		[btnCloseLose, btnCloseWin] =
			document.querySelectorAll(".btn-close_dialog"),
		btnStand = document.querySelector(".stand"),
		winDialog = document.querySelector(".win_dialog"),
		winTextDialog = document.querySelector(".win_dialog > h3");
	let dealerPoints = 0,
		playerPoints = 0;

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

	function shuffle() {
		for (let i = 0; i <= deck.length - 1; i++) {
			let randomPos = Math.floor(Math.random() * deck.length - 1 + 1);
			let previusCard = deck[randomPos];
			deck[randomPos] = deck[i];
			deck[i] = previusCard;
		}
	}

	function drawCard() {
		return deck.pop();
	}

	function valueOfCard(card) {
		const str = card.slice(0, card.length - 1);
		return Number(str) ? Number(str) : str === "A" ? 11 : 10;
	}

	function createCard(card, owner) {
		const cardElement = document.createElement("img");
		cardElement.src = `./assets/cartas/${card}.png`;
		cardElement.classList.add("card");
		owner === "player"
			? (playerHand.append(cardElement), (playerPoints += valueOfCard(card)))
			: (dealerHand.append(cardElement), (dealerPoints += valueOfCard(card)));
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
		if (playerPoints === 21 && playerPoints > dealerPoints) {
			openDialog("BlackJack");
		} else if (playerPoints === 21 && playerPoints === dealerPoints) {
			openDialog("tie");
		}
	}

	initialGame();
	console.log({ playerPoints, dealerPoints });

	function hitCard(owner) {
		createCard(drawCard(), owner);
		console.log({ playerPoints, dealerPoints });
		if (playerPoints > 21) {
			openDialog("lose");
		}
	}

	hitButton.addEventListener("click", () => hitCard("player"));
	btnStand.addEventListener("click", () => playAsDealer());

	function closeDialog(dialog) {
		dialog === "lose" ? loseDialog.close() : winDialog.close();
		restartGame();
		initialGame();
	}

	btnCloseLose.addEventListener("click", () => {
		closeDialog("lose");
	});

	btnCloseWin.addEventListener("click", () => {
		closeDialog("win");
	});

	function restartGame() {
		deck.length = 0;
		dealerCards.length = 0;
		playerCards.length = 0;
		dealerPoints = 0;
		playerPoints = 0;
		dealerHand.innerText = "";
		playerHand.innerText = "";
	}

	function playAsDealer() {
		while (dealerPoints < 17) {
			createCard(drawCard());
			console.log({ playerPoints, dealerPoints });
		}
		whoWins();
	}

	function whoWins() {
		console.log({ dealerPoints, playerPoints });
		if (dealerPoints > 21) {
			openDialog("win");
			return;
		}
		if (playerPoints < dealerPoints) {
			openDialog("lose");
			return;
		}
		if (playerPoints === dealerPoints) {
			openDialog("tie");
		} else {
			openDialog("win");
		}
	}

	function openDialog(dialog) {
		console.log(dialog);
		if (dialog === "BlackJack") {
			winTextDialog.innerText = `Congratulations! 🎉 You've hit a Blackjack! 🃏✨`;
			winDialog.showModal();
		} else if (dialog === "win") {
			winTextDialog.innerText = `Congratulations! 🎉 You’ve won this round.`;
			winDialog.showModal();
		} else if (dialog === "tie") {
			winTextDialog.innerText = `It's a tie! 🤝 You matched the dealer in this round of Blackjack.`;
			winDialog.showModal();
		} else {
			losetextDialog.textContent = `Sorry, you lost. You got it ${playerPoints}, the dealer has ${dealerPoints}. Better luck next time! 🍀`;
			loseDialog.showModal();
		}
	}
})();

// const figures = ["C", "D", "H", "S"];
// const especiales = ["A", "J", "Q", "K"];

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
