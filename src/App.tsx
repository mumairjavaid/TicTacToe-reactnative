
import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App(): JSX.Element {

  const [isCross,setIsCross]=useState(false)
  const [grid, setGrid] = useState(new Array(9).fill("empty",0,9))
  const [gameWinner, setGameWinner] = useState<string>("")


  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGrid(new Array(9).fill('empty', 0, 9))
  }

  const WinningLogic = () => {
        if (
          grid[0] === grid[1] &&
          grid[0] === grid[2] &&
          grid[0] !== 'empty'
        ) {
          setGameWinner(`${grid[0]} won the game! 🥳`);
        } else if (
          grid[3] !== 'empty' &&
          grid[3] === grid[4] &&
          grid[4] === grid[5]
        ) {
          setGameWinner(`${grid[3]} won the game! 🥳`);
        } else if (
          grid[6] !== 'empty' &&
          grid[6] === grid[7] &&
          grid[7] === grid[8]
        ) {
          setGameWinner(`${grid[6]} won the game! 🥳`);
        } else if (
          grid[0] !== 'empty' &&
          grid[0] === grid[3] &&
          grid[3] === grid[6]
        ) {
          setGameWinner(`${grid[0]} won the game! 🥳`);
        } else if (
          grid[1] !== 'empty' &&
          grid[1] === grid[4] &&
          grid[4] === grid[7]
        ) {
          setGameWinner(`${grid[1]} won the game! 🥳`);
        } else if (
          grid[2] !== 'empty' &&
          grid[2] === grid[5] &&
          grid[5] === grid[8]
        ) {
          setGameWinner(`${grid[2]} won the game! 🥳`);
        } else if (
          grid[0] !== 'empty' &&
          grid[0] === grid[4] &&
          grid[4] === grid[8]
        ) {
          setGameWinner(`${grid[0]} won the game! 🥳`);
        } else if (
          grid[2] !== 'empty' &&
          grid[2] === grid[4] &&
          grid[4] === grid[6]
        ) {
          setGameWinner(`${grid[2]} won the game! 🥳`);
        } else if (!grid.includes('empty', 0)) {
          setGameWinner('Draw game... ⌛️');
        }
  }
  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: "#FFFFFF"
      })
    }

    if (grid[itemNumber] === 'empty') {
      grid[itemNumber] = isCross ? 'cross': 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      })
    }

    WinningLogic();
  }

  return (
    <SafeAreaView >
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
        style={[
          styles.playerInfo,
          isCross ? styles.playerX : styles.playerO
        ]}
        >
          <Text style={styles.gameTurnTxt}>
            Player {isCross? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
      numColumns={3}
      data={grid}
      style={styles.grid}
      renderItem={({item, index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
        >
          <Icons name={item} />
        </Pressable>
      )}
      />
      {/* game action */}
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    marginTop:15,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#3498db',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;