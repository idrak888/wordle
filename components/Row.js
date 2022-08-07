import React from 'react';
import { View, StyleSheet } from 'react-native';
import Box from './Box';

export default function Row(props) {
	const [charIndex, setCharIndex] = React.useState(0);
	const [nextChar, setNextChar] = React.useState({index: null, nextChar: null});
	const [word, setWord] = React.useState([]);

	return (
		<View style={styles.row}>
			<Box 
				color={props.wordPallete ? props.wordPallete[0] : null}
				previousInput={() => {
					setCharIndex(0);
					setWord([]);
				}} 
				nextInput={char => {
					setCharIndex(1);
					setWord([...word, char]);
				}} 
				passNextChar={char => {
					setNextChar({index: 1, char});
					setCharIndex(1);
					setWord([...word, char]);
				}}
				isActive={charIndex == 0 && props.active ? true : false}
				receiveNextChar={nextChar.index == 0 ? nextChar : null}
			/>
			<Box 
				color={props.wordPallete ? props.wordPallete[1] : null}
				previousInput={() => {
					setCharIndex(0);
					setWord([...word].slice(0, word.length - 1));
				}} 
				nextInput={char => {
					setCharIndex(2);
					setWord([...word, char]);
				}} 
				passNextChar={char => {
					setNextChar({index: 2, char});
					setCharIndex(2);
					setWord([...word, char]);
				}}
				isActive={charIndex == 1 && props.active ? true : false}
				receiveNextChar={nextChar.index == 1 ? nextChar : null}
			/>
			<Box 
				color={props.wordPallete ? props.wordPallete[2] : null}
				previousInput={() => {
					setCharIndex(1);
					setWord([...word].slice(0, word.length - 1));
				}} 
				nextInput={char => {
					setCharIndex(3);
					setWord([...word, char]);
				}} 
				passNextChar={char => {
					setNextChar({index: 3, char});
					setCharIndex(3);
					setWord([...word, char]);
				}}
				isActive={charIndex == 2 && props.active ? true : false}
				receiveNextChar={nextChar.index == 2 ? nextChar : null}
			/>
			<Box 
				color={props.wordPallete ? props.wordPallete[3] : null}
				previousInput={() => {
					setCharIndex(2);
					setWord([...word].slice(0, word.length - 1));
				}} 
				nextInput={char => {
					setCharIndex(4);
					setWord([...word, char]);
				}} 
				passNextChar={char => {
					setNextChar({index: 4, char});
					setCharIndex(4);
					setWord([...word, char]);
				}}
				isActive={charIndex == 3 && props.active ? true : false}
				receiveNextChar={nextChar.index == 3 ? nextChar : null}
			/>
			<Box  
				color={props.wordPallete ? props.wordPallete[4] : null}
				previousInput={() => {
					setCharIndex(3);
					setWord([...word].slice(0, word.length - 1));
					props.passRowData({rowIndex: props.rowIndex, word: [...word].slice(0, word.length - 1).join("")});
				}} 
				nextInput={char => {
					setWord([...word, char]);
					props.passRowData({rowIndex: props.rowIndex, word: [...word, char].join("")});
				}}
				passNextChar={char => {}}
				isActive={charIndex == 4 && props.active ? true : false}
				receiveNextChar={nextChar.index == 4 ? nextChar : null}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
    row: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row"
	}
});