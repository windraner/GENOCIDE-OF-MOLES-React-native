import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import React from 'react';
import { StatusWrapper, H2, P, LvlUP } from './style/style';

import { GAME_LOOP_SETTINGS, LVL_UP_BUNNER_TIME, WIN_CONDITION } from '../constants/constants.js';

let loop;
let gameCounter;
let bunnerCounter;

export default class StatusComponent extends React.Component {
	constructor(props) {
		super();
		this.props = props;
		this.state = {
			timer: props.status.timer,
			counter: props.status.timer*1000/60,
			infoBanner: ''
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.state.timer !== nextProps.status.timer) {
			this.setState({ timer: nextProps.status.timer });
			gameCounter = nextProps.status.timer*1000/60;
		}
	}
	
	componentWillReceiveProps(nextProps) {
		gameCounter = nextProps.status.timer*1000/60;
		if(this.state.infoBanner === '' && nextProps.status.LvlUp === true) {
			this.setState({ infoBanner: <div style={LvlUP}>LVL UP!</div> }) ;
			bunnerCounter = LVL_UP_BUNNER_TIME;
		} 
	}

	looping = () => {
    clearInterval(loop);
    loop = setInterval(function() {
      
    if(gameCounter > 0 && this.props.status.onPause === false && this.props.status.failed < 3) {
    	
    	this.setState({ counter: gameCounter });
    	gameCounter = gameCounter-20;
   		
     }
     if(gameCounter === 0) {
     	this.setState({ counter: gameCounter });
     }

     if(bunnerCounter > 0) {
     	bunnerCounter--;
     	if(bunnerCounter%7 === 6) {
     		this.setState({ infoBanner: '' });
     	} 
     	if(bunnerCounter%7 === 3) {
     		this.setState({ infoBanner: <div style={LvlUP}>LVL UP!</div> });
     	}
     }

     if(bunnerCounter === 0 && this.props.status.LvlUp === true) {
		this.props.lvlUpEnd();
		this.setState({ infoBanner: '' });
     }

    }.bind(this),GAME_LOOP_SETTINGS);
  }

  componentDidMount() {
  	this.looping();
  }

  render() {
  	return (
  		<View style={{...StatusWrapper}}>
  			<View>
  				<Text style={{...H2}}>STATUS BAR</Text>
			</View>
  			<View >
  				<Text style={{...P}}>Game difficult: {this.props.status.gameDifficult}</Text>
			</View>
  			<View >
  				<Text style={{...P}}>Score: {this.props.status.points} / {WIN_CONDITION} point(s)</Text>
			</View>
  			<View >
  				<Text style={{...P}}>You failed: {this.props.status.failed} time(s)</Text>
  			</View>
  			<View >
  				<Text style={{...P}}>Time: {this.state.counter} ms</Text>
  			</View>	
  		</View>
  	)
  }
}