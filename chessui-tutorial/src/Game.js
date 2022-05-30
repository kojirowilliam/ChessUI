import {Chess} from 'chess.js'
import {BehaviorSubject} from 'rxjs'

const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export function initGame() {
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
        chess.load(savedGame)
    }
    updateGame()
}

export function resetGame() {
    chess.reset()
    updateGame()
}

export function handleMove(from, to) {
    const promotions = chess.moves({verbose: true}).filter(m => m.promotion)
    if (promotions.some(p=> `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = {from, to, color: promotions[0].color}
        updateGame(pendingPromotion)
    }
    const {pendingPromotion} = gameSubject.getValue()
    if (!pendingPromotion) {
        move(from, to)
    }
}

export function move(from, to, promotion) {
    let tempMove = {from, to}
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)
    if (legalMove) {
        updateGame()
    }
}

export function getPossMoves(from) {
    return chess.moves({square: from}).to
}

function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() == "w" ? "BLACK" : "WHITE"
        return `CHECKMATE - WINNER - ${winner}`
    }
    else if (chess.in_draw()) {
        let reason = "50 - MOVES - RULE"
        if (chess.in_stalemate()) {
            reason = "STALEMATE"
        }
        else if (chess.in_threefold_repetition()) {
            reason = "REPEITION"
        }
        else if (chess.insufficient_material()) {
            reason = "INSUFFICIENT"
        }
        return `DRAW - ${reason}`
    }
    else {
        return 'UNKNOWN REASON'
    }
}

export function setPendingMove(pendingPromotion, pendingMove) {
    const currentPossMoves = gameSubject.getValue().possMoves
    const nextMove = currentPossMoves ? currentPossMoves.find((m) => m.to.includes(pendingMove)) : null
    if (nextMove) {
        chess.move(nextMove)
        updateGame(pendingPromotion, null)
    }
    else {
        const possMoves = chess.moves({square: pendingMove, verbose: true})
        let pendingMoves = []
        for (let i = 0; i < possMoves.length; i++) {
            pendingMoves.push(possMoves[i].to)
        }
        console.log("pendingMoves(" + pendingMoves + ")")
        updateGame(pendingPromotion, possMoves, pendingMoves)
    }
}

function updateGame(pendingPromotion, possMoves, pendingMoves) {
    const isGameOver = chess.game_over()
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        possMoves,
        pendingMoves,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult : null
    }
    localStorage.setItem('savedGame', chess.fen())
    gameSubject.next(newGame)
}