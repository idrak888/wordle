import React from 'react';
import { DevSettings, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Grid from './components/Grid';
import Popup from './components/Popup';
import randomWords from 'random-words';
import axios from 'axios';

//https://www.npmjs.com/package/random-words <-- to choose a random 5 letter word
//https://api.dictionaryapi.dev/api/v2/entries/en/word <-- to check if the entered word exists

export default function App() {
	const [wordNumber, setWordNumber] = React.useState(0);
	const [wordPalletes, setWordPalletes] = React.useState([]);
	const [rowData, setRowData] = React.useState(null);
	const [message, setMessage] = React.useState("");
	const [selectedWord, setSelectedWord] = React.useState("");
	const [modalVisible, setModalVisible] = React.useState(false);
	const [modalText, setModalText] = React.useState("");

	React.useEffect(() => {
		const list = randomWords({exactly: 10, maxLength: 5});

		for (let x of list) {
			if (x.length == 5) {
				setSelectedWord(x.toUpperCase());
				break;
			}
		}
	}, []);

	const handleEnter = () => {
		console.log(`Selected word: ${selectedWord}`);
		console.log(`Word guessed: ${rowData.word}`);
		axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${rowData.word}`).then(doc => {
			handleChecks();
		}).catch(e => {
			setMessage("Word not recognised by the standard dictionary");
			setRowData(null);
			setTimeout(() => {
				setMessage("");
			}, 2000);
		});
	}

	const handleChecks = () => {
		const userGuess = rowData.word;
		setRowData(null);
		const wordPallete = [];

		for (let i=0;i<5;i++) {
			if (userGuess[i] == selectedWord[i]) {
				wordPallete.push("#639952");
			} else if (selectedWord.includes(userGuess[i])) {
				wordPallete.push("#BFAA49");
			} else {
				wordPallete.push("#B2BABB");
			}
		}

		if (userGuess === selectedWord) {
			setWordPalletes([...wordPalletes, wordPallete]);
			setWordNumber(wordNumber + 1);

			setModalText("You win!");
			setModalVisible(true);
			Keyboard.dismiss();
		} else {
			setWordPalletes([...wordPalletes, wordPallete]);
			setWordNumber(wordNumber + 1);
			if (wordNumber >= 4) {
				setModalText("Out of guesses");
				setModalVisible(true);
				Keyboard.dismiss();
			}
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<>
			<StatusBar barStyle={"light-content"} backgroundColor={"#1C2420"}/>
				<View style={styles.container}>
					<View style={{flex: 1, width: "100%", padding: 20, justifyContent: "center", alignItems: "center"}}>
						<Text style={{color: "#17D56B", fontWeight: "bold", fontSize: 24, alignSelf: "flex-start"}}>Wordle</Text>
						<Grid wordNumber={wordNumber} wordPalletes={wordPalletes} passRowData={rowData => {
							if (rowData) {
								setRowData(rowData);
							} else {
								setRowData(null);
							}
						}}/>
						<View style={{width: "100%", marginBottom: Platform.OS == "android" ? 15 : "70%"}}>
							<TouchableOpacity onPress={handleEnter} disabled={rowData ? false : true} activeOpacity={0.8} style={rowData ? styles.button : {...styles.button, opacity: 0.5}}>
								<Text style={{fontWeight: "bold", fontSize: 18, color: "white"}}>Enter</Text>
							</TouchableOpacity>
							<Text style={{color: "#EBF03B", fontSize: 18, textAlign: "center", marginVertical: 10}}>{message}</Text>
						</View>
					</View>
				</View>
				{modalVisible ? <View style={{width: "100%", height: "100%", backgroundColor: 'rgba(0, 0, 0, 0.5)', position: "absolute"}}></View> : null}
				<Popup onClearGrid={() => DevSettings.reload()} modalVisible={modalVisible} setModalVisible={setModalVisible} selectedWord={selectedWord} text={modalText}/>
			</>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1C2420',
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 60,
		paddingHorizontal: 25
	},
    button: {
        width: "100%",
        padding: 20,
        backgroundColor: "#17D56B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    }
});