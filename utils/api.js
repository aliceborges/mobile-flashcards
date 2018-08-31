import { AsyncStorage } from 'react-native';
import uuidv1 from "uuid";
import { toArray, searchDeck } from './helpers';

export const KEY = 'react:flashcard';

export function saveDeckTitle(key, title){
	return AsyncStorage.mergeItem(KEY, JSON.stringify({
		[key]: { id: key, title }
	}));
}

export function getDecks(){
	return AsyncStorage.getItem(KEY)
	.then((resul) => {
		return toArray(JSON.parse(resul));
	});
}

export function getDeck(id){
	return AsyncStorage.getItem(KEY)
	.then((resul) => {
		return searchDeck(id, JSON.parse(resul));
	});
}

export function addCardToDeck(idDeck, card){
	return getDeck(idDeck)
	.then((deck) => {
		if(!deck.questions){
			deck.questions = [ card ];
		}else{
			deck.questions = [ ...deck.questions, card ];
		}

		return AsyncStorage.mergeItem(KEY, JSON.stringify({
			[idDeck]: deck
		}));
	});
}
