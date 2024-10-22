import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../auth/Login";
import Register from "../auth//Register";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default Auth;
