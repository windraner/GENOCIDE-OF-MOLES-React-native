import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import React, {Component} from 'react';
import { connect } from 'react-redux';

import HoleContainer from './HoleContainer';
import StatusContainer from './StatusContainer';

import { 
  PRE_LVL_PAUSE,
  ON_CLICK_PAUSE,
  WIN_CONDITION,
  LOSE_CONDITION,
  GAME_LOOP_SETTINGS,
  GAME_SETTINGS
} from '../constants/constants.js';

let loop;
let pauseCounter = 0;
let gameCounter = 60;
let preLvlPause = false;

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  
  looping = () => {
    clearInterval(loop);
    loop = setInterval(function() {
      if(pauseCounter === 0) {
        this.playLvl();

      } else {
        pauseCounter--;
      }

    }.bind(this),GAME_LOOP_SETTINGS);
  }

  clickToStart = () => {
    
    if(this.props.gameStatus.failed >= LOSE_CONDITION) {
      this.props.restartGame();
      this.restartGame();
    } else {
      this.startGame();
    }
  }

  startGame = () => {
    if(this.props.gameStatus.startState === true) {
      this.props.startGame();
      this.preLvlState();
      this.looping();
    }
  }

  restartGame = () => {
      this.preLvlState();
      this.looping();
  }

  playLvl = () => {
    if(preLvlPause === false) {
      this.preLvlState();
      preLvlPause = true;
      return;
    }
    if(gameCounter === this.props.gameStatus.timer) {
      this.generateLvl();
      this.props.pauseStatus(false);
    }

    gameCounter--;

    if(gameCounter === 0) {
      this.props.addFailedPoint();
      this.resetLvl();
    }
  }

  generateLvl = () => {
    let random = Math.floor(Math.random() * (6));
    this.props.generateLvl(random);
  }

  preLvlState = () => {
    this.setPause(PRE_LVL_PAUSE);
    this.props.generateBasicBlock();
  }

  setPause(value) {
    pauseCounter = value;
    this.props.pauseStatus(true);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.gameStatus.points !== nextProps.gameStatus.points) {
        for(let key in GAME_SETTINGS) {
          if(nextProps.gameStatus.points === +key) {
            this.props.updateTimer(GAME_SETTINGS[key]);
          }
          if(nextProps.gameStatus.points === WIN_CONDITION) {
            this.endGames();
          }
        }
    }
    this.ifFail();
    gameCounter = nextProps.gameStatus.timer;
  }

  resetLvl = () => {
    preLvlPause = false;
  }

  ifFail = () => {
    if(this.props.gameStatus.failed === LOSE_CONDITION) {
      clearInterval(loop);
    } 
  }

  endGames = () => {
    this.props.endGame();
    clearInterval(loop);
  }

  clickOnBlock = (value) => {
    if(pauseCounter > 0) {
      return;
    }
    this.setPause(ON_CLICK_PAUSE);
    this.props.pauseStatus(true);
    if(this.props.blocks[value].status === 'Activ') {
      this.props.addPoint();
      this.props.clickOnTrueBlock(value);
      this.resetLvl();
    } else {
      this.props.addFailedPoint();
      this.resetLvl();
      this.props.clickOnFalseBlock(value);
      if(this.props.gameStatus.gameDifficult >= 6) {
        clearInterval(loop);
        this.props.gameFailed();
      }
    }
  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusContainer />
        <HoleContainer 
          clickOnBlock={this.clickOnBlock}
          clickToStart={this.clickToStart}
        />
        <View style={{flex: 1}}></View>     
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderWidth: 1,
  }
})


function mapStateToProps(state) {
  return {
      blocks: state.holeReducer,
      gameStatus: state.statusReducer
  };
}

function mapDispatchToProps(dispatch) {
    return {
        startGame: () => {
          dispatch({ type: 'START_GAME', payload: false });
        },
        restartGame: () => {
          dispatch({ type: 'RESTART_GAME', payload: '' });
        },
        generateBasicBlock: () => {
          dispatch({ type: 'GENERATE_BASIC_BLOCK', payload: '' });
        },
        generateLvl: (value) => {
          dispatch({ type: 'GENERATE_LVL', payload: value });
        },
        updateTimer: (value) => {
          dispatch({ type: 'UPDATE_TIMER', payload: value });
        },
        endGame: () => {
          dispatch({ type: 'END_GAME', payload: '' });
        },
        addPoint: () => {
          dispatch({ type: 'ADD_POINT', payload: '' });
        },
        addFailedPoint: () => {
          dispatch({ type: 'ADD_FAILED_POINT', payload: '' });
        },
        gameFailed: () => {
          dispatch({ type: 'LOSE_GAME', payload: '' });
        },
        clickOnTrueBlock: (value) => {
            dispatch({ type: 'CLICK_ON_TRUE_BLOCK', payload: value});
        },
        clickOnFalseBlock: (value) => {
            dispatch({ type: 'CLICK_ON_FALSE_BLOCK', payload: value});
        },
        pauseStatus: (value) => {
            dispatch({ type: 'PAUSE_STATUS', payload: value});
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);




