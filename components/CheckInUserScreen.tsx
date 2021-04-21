import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMediaQuery } from 'react-responsive';
import { TicketService } from "../services/TicketService";

const CheckInUserScreen = () => {

    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)"
    });
    
    const [userInput, setUserInput] = React.useState("");
    const [userError, setUserError] = React.useState("");
    const [showUserError, setShowUserError] = React.useState(false);
    const [showSuccessMsg, setSuccessMsg] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const ticketService = new TicketService();

    const resetError = () => {
        setUserError("");
        setShowUserError(false);
    }

    const validateTicketNumber = () => {
        if (userInput == ""){
            setUserError("Need to include a ticket id")
            setShowUserError(true);
            return false;
        }
        if (!isDigit(userInput)){
            setUserError("Ticket id is a number which does not include strings")
            setShowUserError(true);
            return false;
        }
        return true;
    }

    const isDigit = (value:string) => {
        const val = Number(value) ? true : false;
        return val;
    }
    
    const checkInTicket = () => {
        resetError();
        setIsLoading(true);
        const valid = validateTicketNumber();
        if (valid){
            const ticketId = parseInt(userInput);
            const ticketPromise = ticketService.checkInTicket(ticketId);
            ticketPromise.then((res) => {
                console.debug("Thanks for checking in your ticket!");
                setIsLoading(false);
                setSuccessMsg(true);
                setTimeout(() => {
                    setSuccessMsg(false);
                }, 2500)
            }).catch((error) => {
                setIsLoading(false);
                const statusCode = error.response.status;
                if (statusCode == 404){
                    setUserError("Could not find record in database");
                    setShowUserError(true);
                }else{
                    setUserError("There was a problem on our end. Please try again!");
                    setShowUserError(true);
                }
            })
        } else{
            setIsLoading(false);
        }
    }

    return (
        <LinearGradient colors={['#1508AF', '#8E2AE3']} style={styles.background}>
            <Text style={styles.titleText}>
                Check-In
            </Text>
            {showSuccessMsg ? <View style= {isTabletOrMobileDevice? styles.successBox : styles.desktopViewSuccess}><Text style={styles.successText}>Checked in!</Text></View> : null}
            {showUserError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{userError}</Text></View> : null}
            {isLoading && 
                <ActivityIndicator size="large" color="#00ff00" />
            }
            {!isLoading && 
            <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputNumber}
                        placeholder="Ticket ID"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setUserInput(text)}
                    />
                <TouchableOpacity style={styles.checkInButton} onPress={() => checkInTicket()}>
                    <Text style={styles.checkInButtonText}>CHECK IN</Text>
                </TouchableOpacity>
            </View>
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputNumber:{
        width: "80%",
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 15,
        height: 40,
        color: "black",
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "black", 
        marginBottom: 30     
    },
    inputContainer:{
        width:"80%",
        height: 225,
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 20
    }, 
    titleText: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFFFFF",
        marginBottom: 20
    },
    checkInButton: {
        width: "80%",
        backgroundColor: "#13d634",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    checkInButtonText: {
        fontSize: 20,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "white"
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
    errorText:{
        fontFamily: "Lato-Bold",
        color:"red",
        fontWeight: "bold",
        fontSize: 18,
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
    successText: {
        fontFamily: "Lato-Bold",
        color:"green",
        fontWeight: "bold",
        fontSize: 18,
    },
})

export default CheckInUserScreen;
