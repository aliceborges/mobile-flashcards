export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const SAVE_CARD_DECK = 'SAVE_CARD_DECK';

export const saveDeckTitle = (id, title) => ({ type: SAVE_DECK_TITLE, deck: {id, title} });
export const saveCardDeck = (idDeck, card) => ({ type: SAVE_CARD_DECK, idDeck, card });
