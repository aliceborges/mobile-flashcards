import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import t from 'tcomb-form-native'
import { teal } from '../utils/colors'
import * as QuizApi from '../utils/api'
import { saveCardDeck } from '../actions'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'

const mapDispatchToProps = dispatch => {
	return {
		saveCardDeck: (id, card) => dispatch(saveCardDeck(id, card))
	};
};

const Form = t.form.Form;

const User = t.struct({
  Pergunta: t.String,
  Resposta: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
      padding: 20,
    },
    error: {
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
    }
  },
  controlLabel: {
    normal: {
      fontSize: 35,
      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,
      textAlign: 'center',
    },
    error: {
      fontSize: 35,
      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,
      textAlign: 'center',
      color: 'red',
    }
  }
}

const options = {
  fields: {
    Pergunta: {
      error: 'Você deve inserir uma pergunta para prosseguir.'
    },
    Resposta: {
      error: 'Você deve inserir uma resposta para prosseguir.'
    },
  },
  stylesheet: formStyles,
};

class addCards extends React.Component {

  state = {  };

  onChange(value) {
    this.setState({ value });
  }

  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }


  handleSubmit = () => {

    let card = [];

    const value = JSON.parse(JSON.stringify(this.refs.form.getValue()), function(k, v){
      if (typeof(v) != 'object' && k === 'Pergunta') { card.push(v); }
      if (typeof(v) != 'object' && k === 'Resposta') { card.push(v); }
    });

    if (card != '' && card != null){
      const id = this.props.navigation.getParam('id', null);
      const title = this.props.navigation.getParam('title', null);
      const qtdCards = this.props.navigation.getParam('qtdCards', null);

      QuizApi.addCardToDeck(id, card)
        .then(() => {
          this.props.saveCardDeck(id, card);
      });

      this.clearForm();
        this.props.navigation.navigate('DeckDetails',{ 
            id: id,
            title: title,
            qtdCards: parseInt(qtdCards) + parseInt(1),
        });
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref='form'
          type= { User }
          value = { this.state.value }
          onChange={ this.onChange.bind(this) }
          options= { options }
        />
        <Button
          color = { teal }
          title = 'Cadastrar'
          onPress = { this.handleSubmit }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  		flex: 1,
  		justifyContent: 'center',
  		alignItems: 'center',
      backgroundColor: 'white'
  	},
  button: {
    fontSize: 30
  }
});

export default connect(null, mapDispatchToProps)(addCards);
