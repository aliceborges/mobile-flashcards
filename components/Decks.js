import React, { Component} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Card, CardButton, CardAction, CardTitle } from 'react-native-cards'
import { fuchsia } from '../utils/colors'
import * as QuizApi from '../utils/api'
import { toArray } from '../utils/helpers'
import { saveDeckTitle, saveCardDeck } from '../actions'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import Emoji from 'react-native-emoji'

const mapStateToProps = state => {
	return {
		decks: toArray(state.decks)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		saveDeckTitle: (id, title) => dispatch(saveDeckTitle(id, title)),
		saveCardDeck: (id, card) => dispatch(saveCardDeck(id, card))
	};
};

class Decks extends React.Component {

  componentDidMount(){
  	 QuizApi.getDecks().then((decks) => {
  			if(decks){
  				decks.map((deck) => {
						if (typeof(deck.title) == String){
  					this.props.saveDeckTitle(deck.id, deck.title);
  					if (deck.questions) {
  						deck.questions.map((question) => {
  							this.props.saveCardDeck(deck.id, question);
  						});
  					}
					}
  				});
  			}
  		});
  	}

  render(){
    
    return(
      this.props.decks != '' ?
      <View>
        <ScrollView>
          { this.props.decks.map((deck) => (
            <Card key = { deck.id }>
              <CardAction
                separator={true}
                inColumn={true}>
                <CardTitle
                  title = { deck.title }
                  subtitle = { (deck.questions ? deck.questions.length : 0) + ' card(s)'}
                  color = { fuchsia }
                />
                <CardButton
                  title = 'Acessar'
                  onPress={() => { this.props.navigation.navigate('DeckDetails',{ 
                    id: deck.id,
                    title: deck.title,
                    qtdCards: deck.questions ? deck.questions.length : 0,
                    })
                  }}
                />
              </CardAction>
            </Card>
          ))}
            </ScrollView>
            </View>
          : 
            <View style = { styles.container }>
             <Text style = { styles.title }>Não há decks cadastrados <Emoji name="cry" /></Text>
              <Text style = { styles.title }>Vem cadastrar! É só arrastar pro lado <Emoji name="arrow_right" /></Text>
            </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
      fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
