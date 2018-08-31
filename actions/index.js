export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const SAVE_CARD_DECK = 'SAVE_CARD_DECK';
export const ADD_POSITIVE_SCORE = 'ADD_SCORE';
export const CLEAR_POSITIVE_SCORE = 'CLEAR_SCORE';
export const ADD_NEGATIVE_SCORE = 'ADD_NEGATIVE_SCORE';
export const CLEAR_NEGATIVE_SCORE = 'CLEAR_NEGATIVE_SCORE';


export const saveDeckTitle = (id, title) => ({ type: SAVE_DECK_TITLE, deck: {id, title} });
export const saveCardDeck = (idDeck, card) => ({ type: SAVE_CARD_DECK, idDeck, card });
export const addPositiveScore = () => ({ type: ADD_POSITIVE_SCORE });
export const clearPositiveScore = () => ({ type: CLEAR_POSITIVE_SCORE });
export const addNegativeScore = () => ({ type: ADD_NEGATIVE_SCORE });
export const clearNegativeScore = () => ({ type: CLEAR_NEGATIVE_SCORE });
