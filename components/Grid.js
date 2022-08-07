import React from 'react';
import { StyleSheet, ScrollView , Dimensions} from 'react-native';
import Row from './Row';

export default function Grid(props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Row 
                passRowData={rowData => props.passRowData(rowData)} 
                rowIndex={0} 
                wordPallete={props.wordPalletes[0] ? props.wordPalletes[0] : null}
                active={props.wordNumber == 0 ? true : false}
            />
            <Row 
                passRowData={rowData => props.passRowData(rowData)} 
                rowIndex={1} 
                wordPallete={props.wordPalletes[1] ? props.wordPalletes[1] : null}
                active={props.wordNumber == 1 ? true : false}
            />
            <Row 
                passRowData={rowData => props.passRowData(rowData)} 
                rowIndex={2} 
                wordPallete={props.wordPalletes[2] ? props.wordPalletes[2] : null}
                active={props.wordNumber == 2 ? true : false}
            />
            <Row 
                passRowData={rowData => props.passRowData(rowData)} 
                rowIndex={3} 
                wordPallete={props.wordPalletes[3] ? props.wordPalletes[3] : null}
                active={props.wordNumber == 3 ? true : false}
            />
            <Row 
                passRowData={rowData => props.passRowData(rowData)} 
                rowIndex={4} 
                wordPallete={props.wordPalletes[4] ? props.wordPalletes[4] : null}
                active={props.wordNumber == 4 ? true : false}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
	container: {
        width: "100%",
        alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
        height: Dimensions.get('window').height / 2,
        maxHeight: 400,
        paddingVertical: 20
	}
});