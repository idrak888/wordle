import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function Box(props) {
	const [char, onChangeChar] = React.useState("");

	React.useEffect(() => {
		if (props.receiveNextChar) {
			onChangeChar(props.receiveNextChar.char);
			props.nextInput(char);
		}
	}, [props.receiveNextChar]);

	const handleChange = char => {
		if (char.length > 0) {
			if (char.length == 2) {
				onChangeChar(char[0]);
				props.passNextChar(char[1]);
			} else {
				onChangeChar(char);
				props.nextInput(char);
			}
		}
	}

	return (
		<View style={(props.isActive || char !== "") ? !props.color ? styles.active : {...styles.active, backgroundColor: props.color, borderColor: props.color} : styles.box}>
			{
			 	props.isActive ? 
				<TextInput onKeyPress={({ nativeEvent }) => {
					if (nativeEvent.key === 'Backspace') {
						onChangeChar("");
						props.previousInput();
					}	
				}} blurOnSubmit={false} autoFocus={true} onChangeText={char => handleChange(char)} value={char} keyboardAppearance='dark' autoCapitalize="characters" returnKeyType="next" maxLength={2} style={styles.input}/>
				: char !== "" ?
				<Text style={!props.color ? styles.input : {...styles.input, backgroundColor: props.color}}>{char}</Text>
				: null
			}
		</View>
	)
}

const styles = StyleSheet.create({
    active: {
		flex: 1,
		borderColor: "white",
		borderWidth: 2,
		margin: 5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5
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
    input: {
		padding: 10,
		color: "white",
		fontSize: 24,
		fontWeight: "bold"
	}
});