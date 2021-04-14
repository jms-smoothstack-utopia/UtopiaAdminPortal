import React from 'react'
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useMediaQuery } from 'react-responsive'; 
import * as DocumentPicker from 'expo-document-picker';
import { FlightService } from "../services/FlightService";


const CreateFlightThroughCSV = () => {

    const [userAddedDocument, setUserAddedDocument] = React.useState({} as any);
    const [userError, setUserError] = React.useState("");
    const [showUserError, setShowUserError] = React.useState(false);
    const [uploadSuccess, setUploadSuccess] = React.useState(false);
    const [databaseSuccess, setDatabaseSuccess] = React.useState(false);
    const flightService = new FlightService();

    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)"
    });

    const validateFileFromUser = (file: DocumentPicker.DocumentResult) => {
        if (file.type == "success"){
            const fileName = file.name;
            return /\.csv$/.test(fileName);
        }
        return false;
    }

    const resetErrors = () => {
        setUserError("");
        setShowUserError(false);
    }

    const uploadFileToDatabase = () => {
        resetErrors();
        setUploadSuccess(false);
    }

    const getFileFromUser = () => {
        resetErrors();
        console.debug("Attempting to retreive file from user platform.");
        const userDocument = DocumentPicker.getDocumentAsync()
        userDocument.then((file) => {
            const valid = validateFileFromUser(file);
            if (valid){
                setUserAddedDocument(file);
                setUploadSuccess(true);
            } else{
                console.error("File is not valid");
                setUserError("File is not valid. Try again!");
                setShowUserError(true);
            }
        }).catch((error) => {
            console.error(error);
            setUserError("There was an error when trying to add document");
            setShowUserError(true);
        })
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            {databaseSuccess ? <View style= {isTabletOrMobileDevice? styles.successBox : styles.desktopViewSuccess}><Text style={styles.successText}>Flights successfully added to the database!</Text></View> : null}
            {uploadSuccess ? <View style= {isTabletOrMobileDevice? styles.successBox : styles.desktopViewSuccess}><Text style={styles.successText}>File successfully uploaded! Click on submit to add flights to database!</Text></View> : null}
            {showUserError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{userError}</Text></View> : null}
            <Text style={styles.titleText}>Upload CSV</Text>
            <TouchableOpacity style={styles.addFileButton} onPress={getFileFromUser}>
                        <Text style={styles.addFileButtonText}>GET FILE</Text>
            </TouchableOpacity>
            {uploadSuccess && 
                <TouchableOpacity style={styles.submitButton} onPress={uploadFileToDatabase}>
                            <Text style={styles.buttonText}>Submit File</Text>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems: "center",
    },
    titleText: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 25,
        color: "black",
        marginBottom: 20,
    },
    successText: {
        fontFamily: "Lato-Bold",
        color:"green",
        fontWeight: "bold",
        fontSize: 18,
    },
    successBox: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "80%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "green",
        borderStyle: "solid",
        borderWidth: 3,
    },
    desktopViewSuccess: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "30%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "green",
        borderStyle: "solid",
        borderWidth: 3,
    },
    addFileButton: {
        width: "80%",
        backgroundColor: "white",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "grey",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    addFileButtonText:{
        fontSize: 20,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "grey"
    },
    buttonText:{
        fontSize: 20,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "white"
    },
    errorText:{
        fontFamily: "Lato-Bold",
        color:"red",
        fontWeight: "bold",
        fontSize: 18,
    },
    desktopViewError: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "30%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 3,
    },
    submitButton: {
        width: "80%",
        backgroundColor: "#13d634",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    errorBox: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "80%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 3,
    },
})

export default CreateFlightThroughCSV
