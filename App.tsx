import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const App = () => {
  const [isCross,setIsCross]=useState(false)
  const [grid, setGrid] = useState(new Array(9).fill("empty",0,9))
  const [gameWinner, setGameWinner] = useState<string>("")


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
      // if(grid[0] != "empty" && grid[1]==grid[2]){

      // }
  }
 
  const Selected=(position:number)=>{

    if(grid[position]=="empty"){
      grid[position] = isCross ? "X" : "O";
      setIsCross(!isCross);
    }

    WinningLogic();

  }
  return (
    <View>
      
      <FlatList
      numColumns={3}
      data={grid}
      renderItem={({item,index})=>(
        <Pressable key={index} onPress={()=>Selected(index)}>
          <Text style={styles.gridItem}>{item}</Text>
        </Pressable>
      )}
      />
      {gameWinner?<Text>{gameWinner}</Text>:<Text>Hi</Text>}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  gridItem:{
    width:50,
    height:50,
    margin:20
  }
})