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
import { HoleWrapper, StartWrapper, StartText, EndWrapper, EndText, EndImage } from './style/style';

import { LOSE_CONDITION } from '../constants/constants.js';

export default class HoleComponent extends React.Component {
	constructor(props) {
		super();
		this.props = props;
	}

	handelClick = (key) => {
		this.props.clickOnBlock(key);
	}

	handelStart = () => {
		this.props.clickToStart();
	}

	render() {
		let content;
		if(this.props.gameStatus.startState) {
			content = (
				<View >
					<TouchableWithoutFeedback onPress={() => {this.handelStart()}}>
						<View style={{...StartWrapper}}>
							<Text style={{...StartText}}>PRESS TO START</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		} else {
			content = Object.entries(this.props.blocks).map((i, index) => {
			 	let { style, key } = i[1];
			 	let imgpath;
			 	if(i[1].status == "Activ") {
			 		imgpath = require('../assets/1.png');
			 	} else {
			 		imgpath = require('../assets/2.png');
			 	}
			 	return (
			 		<View style={{...style, borderWidth:2, borderRadius: 10}}  key={key} >
		 				<TouchableWithoutFeedback onPress={() => {this.handelClick(key)}}>
			 				<View>
			 					<Image style={{
			 						height: 100, 
			 						width: 100
	       							}}
        						source={imgpath} />
			 				</View>
		 				</TouchableWithoutFeedback>
			 		</View>
			 	);
			});
		}
		if(this.props.gameStatus.win) {
			content =
				<View >
					<Text style={{...StartText}}>You start a mass genocide of moles</Text>
				</View>
		}
		if(this.props.gameStatus.failed >= LOSE_CONDITION) {
			content = (
				<View >
					<TouchableWithoutFeedback onPress={() => {this.handelStart()}}>
						<View style={{...EndWrapper}}>
							<Text style={{...EndText}}>WASTED</Text>
							<Text style={{...StartText}}>PRESS TO RESTART</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		}
		
		return (
			<View style={{...HoleWrapper}}>
				{content}
			</View>
		)
	}
}