import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export default function Row(props) {
	const [keyboardActive, setKeyboard] = useState(true);
	const [activeIndex, setActiveIndex] = useState(null);
	const [word, setWord] = useState([]);
	const textField = useRef();

	return (
		<View style={styles.row}>
			<TextInput ref={textField} onChangeText={text => {
				setWord(text.split(""));
				setActiveIndex(activeIndex + 1);
			}} style={styles.input} blurOnSubmit={false} keyboardAppearance='dark' autoCapitalize="characters" returnKeyType="next" maxLength={5}/>
			<View style={styles.row}>
				<TouchableOpacity onPress={() => { 
					textField.current.focus();
					setActiveIndex(0);
				}} style={[styles.box, activeIndex == 0 ? styles.active : {}]}>
					<Text style={styles.text}>{word[0] ? word[0] : ""}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.box, activeIndex == 1 ? styles.active : {}]}>
					<Text style={styles.text}>{word[1] ? word[1] : ""}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.box, activeIndex == 2 ? styles.active : {}]}>
					<Text style={styles.text}>{word[2] ? word[2] : ""}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.box, activeIndex == 3 ? styles.active : {}]}>
					<Text style={styles.text}>{word[3] ? word[3] : ""}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.box, activeIndex == 4 ? styles.active : {}]}>
					<Text style={styles.text}>{word[4] ? word[4] : ""}</Text>
				</TouchableOpacity>
			</View>
		</View>
	)	
}

const styles = StyleSheet.create({
    row: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row"
	},
	input: {
		width: 0,
		height: 0,
		opacity: 0
	},
	box: {
		flex: 1,
		borderColor: "grey",
		borderWidth: 2,
		margin: 5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5
	},
	active: {
		borderColor: "#17D56B"
	},
	text: {
		padding: 10,
		color: "white",
		fontSize: 24,
		fontWeight: "bold"
	}
});