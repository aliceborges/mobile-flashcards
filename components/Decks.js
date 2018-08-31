import React, { Component} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Card, CardButton, CardAction, CardTitle } from 'react-native-cards'
import { fuchsia } from '../utils/colors'
import * as QuizApi from '../utils/api'
import { toArray } from '../utils/helpers'
import { saveDeckTitle, saveCardDeck } from '../actions'
import { connect } from 'react-redux'

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
  	 QuizApi.getDecks().then((resul) => {
  			if(resul){
  				resul.map((deck) => {
  					this.props.saveDeckTitle(deck.id, deck.title);
  					if (deck.questions) {
  						deck.questions.map((question) => {
  							this.props.saveCardDeck(deck.id, question);
  						});
  					}
  				});
  			}
  		});
  	}

  render(){
    return(
      <View>
        <ScrollView>
          {this.props.decks.map((deck) => (
            <Card key = { deck.id }>
              <CardAction
                separator={true}
                inColumn={true}>
                <CardTitle
                  title = { deck.title }
                  subtitle = { deck.questions ? deck.questions.length : 0 }
                  color = { fuchsia }
                />
                <CardButton
                  title = 'Jogar'
                />
              </CardAction>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
