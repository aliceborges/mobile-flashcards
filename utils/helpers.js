import { AsyncStorage } from 'react-native'

export function toArray(obj){
	let array = [];
	const keys = Object.keys(obj);

	keys.map(key => {
		array = [ ...array, obj[key] ];
	});

	return array;
}

export function searchDeck(id, obj){
	const listDeck = toArray(obj);
	let deck = null;

	listDeck.map(obj => {
		if(obj.id === id){
			deck = obj;
		}
	});

	return deck;
}
