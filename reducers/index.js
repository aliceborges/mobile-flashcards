import { searchDeck } from '../utils/helpers.js';
import { SAVE_DECK_TITLE,
         SAVE_CARD_DECK,
         ADD_POSITIVE_SCORE,
         CLEAR_POSITIVE_SCORE,
         ADD_NEGATIVE_SCORE,
         CLEAR_NEGATIVE_SCORE } from '../actions';

const initialState = {
	decks: {},
	positiveScore: 0,
  negativeScore: 0
};

const reducer = (state = initialState, action) => {
	switch(action.type){

		case SAVE_DECK_TITLE:
			return {
				...state,
				decks: {
					...state.decks,
					[action.deck.id]: action.deck
				}
			};

		case SAVE_CARD_DECK:
			const deck = searchDeck(action.idDeck, state.decks);

			if(!deck.questions){
				deck.questions = [ action.card ];
			}else{
				deck.questions = [ ...deck.questions, action.card ];
			}

			return {
				...state,
				decks: {
					...state.decks,
					[action.idDeck]: deck
				}
			};

    case ADD_POSITIVE_SCORE:
			return {
				...state,
				positiveScore: state.positiveScore + 1
			};

		case CLEAR_POSITIVE_SCORE:
			return {
				...state,
				positiveScore: 0
			};

      case ADD_NEGATIVE_SCORE:
        return {
          ...state,
          negativeScore: state.positiveScore + 1
        };

      case CLEAR_NEGATIVE_SCORE:
        return {
          ...state,
          negativeScore: 0
        };
		default:
			return state;
	}
}

export default reducer;
