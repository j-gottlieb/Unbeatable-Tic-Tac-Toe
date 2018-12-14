
// function emptySquares () {
//   const availMoves = []
//   for (const key in moves) {
//     if (moves[key] === null) {
//       availMoves.push(key)
//     }
//   }
//   return availMoves.sort()
// }
//
// function bestSpot () {
//   return minimax(originalBoard, aiPlayer).index
// }
//
// function minimax(newBoard, player) {
// 	var availSpots = emptySquares();
//
// 	if (checkWin(newBoard, huPlayer)) {
// 		return {score: -10};
// 	} else if (checkWin(newBoard, aiPlayer)) {
// 		return {score: 10};
// 	} else if (availSpots.length === 0) {
// 		return {score: 0};
// 	}
// 	var moves = [];
// 	for (var i = 0; i < availSpots.length; i++) {
// 		var move = {};
// 		move.index = newBoard[availSpots[i]];
// 		newBoard[availSpots[i]] = player;
//
// 		if (player == aiPlayer) {
// 			var result = minimax(newBoard, huPlayer);
// 			move.score = result.score;
// 		} else {
// 			var result = minimax(newBoard, aiPlayer);
// 			move.score = result.score;
// 		}
//
// 		newBoard[availSpots[i]] = move.index;
//
// 		moves.push(move);
// 	}
//
// 	var bestMove;
// 	if(player === aiPlayer) {
// 		var bestScore = -10000;
// 		for(var i = 0; i < moves.length; i++) {
// 			if (moves[i].score > bestScore) {
// 				bestScore = moves[i].score;
// 				bestMove = i;
// 			}
// 		}
// 	} else {
// 		var bestScore = 10000;
// 		for(var i = 0; i < moves.length; i++) {
// 			if (moves[i].score < bestScore) {
// 				bestScore = moves[i].score;
// 				bestMove = i;
// 			}
// 		}
// 	}
//
// 	return moves[bestMove];
// }
//
// }

// function checkWin(board, player) {
//   // plays is a string of all the spaces the current player has moved
// 	let plays = board.reduce((a, e, i) =>
// 		(e === player) ? a.concat(i) : a, []);
// 	let gameWon = null;
//
// 	for (let [index, win] of winCombos.entries()) {
// 		if (win.every(elem => plays.indexOf(elem) > -1)) {
// 			gameWon = {index: index, player: player};
// 			break;
// 		}
// 	}
// 	// return gameWon = {index: 2, player: 'x'}
// 	return gameWon;
// }
