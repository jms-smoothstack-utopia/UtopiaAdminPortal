import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Need to do MediaQuery
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

//TODO: Change the type of this to a more appropriate type
const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = () => console.log("hello");

    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)"
    });

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1508AF', '#8E2AE3']} style={styles.background}>
                <Text style={styles.titleText}>UTOPIA ADMIN</Text>
                <View style= {isTabletOrMobileDevice? styles.inputView : styles.desktopView}>
                    <TextInput 
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    onChangeText = {text => setEmail(text)}
                    />
                </View>
                <View style= {isTabletOrMobileDevice? styles.inputView : styles.desktopView}>
                    <TextInput 
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    onChangeText = {text => setPassword(text)}
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
        marginBottom: 40
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
    }
});