import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const Popup = props => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.modalVisible}
			onRequestClose={() => {
				props.onClearGrid(true);
				Alert.alert("Modal has been closed.");
				props.setModalVisible(!props.modalVisible);
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={{color: "#17D56B", fontWeight: "bold", letterSpacing: 4}}>{props.selectedWord}</Text>
					<Text style={styles.modalText}>{props.text}</Text>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => {
							props.onClearGrid(true);
							props.setModalVisible(!props.modalVisible)
						}}
					>
						<Text style={styles.textStyle}>Play Again</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		width: "100%",
		maxWidth: 250,
		backgroundColor: "#2B322E",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		width: "100%",
        padding: 15,
        backgroundColor: "#17D56B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginVertical: 20,
		textAlign: "center",
		fontSize: 18,
		color: "white"
	}
});

export default Popup;