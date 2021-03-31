import React from 'react';
import useCachedResources from "./hooks/useCachedResources";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete){
    return null;
  } else {
    return (
    <LoginScreen></LoginScreen>
    );
  }
}