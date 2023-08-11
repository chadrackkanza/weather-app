import { Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box } from "native-base";
import Home from './screens/Home';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' 
        screenOptions={{
          headerShown : false
        }}
        >
       <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>


  );
}

