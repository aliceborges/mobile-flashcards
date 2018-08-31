import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import t from 'tcomb-form-native'
import { teal } from '../utils/colors'
import * as QuizApi from '../utils/api'
import { saveDeckTitle } from '../actions'
import { connect } from 'react-redux'
import uuidv1 from 'uuid'

const mapDispatchToProps = dispatch => {
	return {
		saveDeckTitle: (id, title) => dispatch(saveDeckTitle(id, title))
	};
};

const Form = t.form.Form;

const User = t.struct({
  'Qual é o título de seu novo deck?': t.String,
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
    'Qual é o título de seu novo deck?': {
      error: 'Você deve informar o título para prosseguir.'
    },
  },
  stylesheet: formStyles,
};

class addDecks extends React.Component {

  state = {
    title: ''
  };

  handleSubmit = () => {
    //const value = this._form.getValue();
    //console.log('value: ', value);
    const id = uuidv1();

    QuizApi.saveDeckTitle(id, this.state.title)
		  .then(() => {
  			this.props.saveDeckTitle(id, this.state.title);
  			this.props.navigation.navigate('Decks');
		});
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
          onChangeText = { (title) => { this.setState({title}); } }
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

export default connect(null, mapDispatchToProps)(addDecks);
