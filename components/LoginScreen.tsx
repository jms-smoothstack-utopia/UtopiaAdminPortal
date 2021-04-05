import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthService } from "../services/AuthService";



//Need to do MediaQuery
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

const LoginScreen = ({ navigation }: any) => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const [showErrorMsg, setShowErrorMsg ] = React.useState(false);
    const authService = new AuthService();

    const login = () => {
        if (!validateLoginInfo()) {
            setShowErrorMsg(true);
            return;
        }
        let authResponse = authService.login(email, password);
        authResponse.then(() => {
            console.debug("Successfully logged in");
            navigation.replace("Home");
        }).catch((error) => {
            console.log("There was an error: " + error);
            setErrorMsg("Invalid email/password");
            setShowErrorMsg(true);
        })
    }

    //Simple validation to check if email or password is blanked
    const validateLoginInfo = () => {
        setShowErrorMsg(false);
        setErrorMsg("");
        if (email == "" || password == ""){
            setErrorMsg("Fields cannot be empty");
            return false;
        }
        return true;
    }

    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)"
    });

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1508AF', '#8E2AE3']} style={styles.background}>
                <Text style={styles.titleText}>UTOPIA ADMIN</Text>
                {showErrorMsg ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{errorMsg}</Text></View> : null}
                <View style= {isTabletOrMobileDevice? styles.inputView : styles.desktopView}>
                    <TextInput
                    autoCapitalize="none"
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    onChangeText={setEmail}
                    />
                </View>
                <View style= {isTabletOrMobileDevice? styles.inputView : styles.desktopView}>
                    <TextInput 
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity 
                style={isTabletOrMobileDevice? styles.loginButton : styles.desktopViewLoginButton}
                onPress={login}
                >
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    errorBox: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "80%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
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
    inputView: {
        width: "80%",
        backgroundColor: "#FFFFFF",
        borderRadius:10,
        marginBottom: 20,
        justifyContent: "center",
        padding: 5,
        paddingLeft:20,
        paddingRight: 20
    },
    inputText:{
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 15,
        height:50,
        color:"black"
    },
    titleText: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFFFFF",
        marginBottom: 20
    },
    loginButton: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    loginButtonText: {
        fontSize: 20,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "black"
    },
    desktopView: {
        width: "30%",
        backgroundColor: "#FFFFFF",
        borderRadius:10,
        marginBottom: 20,
        justifyContent: "center",
        padding: 5,
        paddingLeft:20,
        paddingRight: 20
    }, 
    desktopViewLoginButton:{
        width: "30%",
        backgroundColor: "white",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    desktopViewError: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "30%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 3,
    }

});