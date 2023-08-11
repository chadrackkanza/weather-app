import { StatusBar } from "expo-status-bar"
import { Text, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
export default function Page({children}){
    return(
        <View className="flex-1 relative">
            <StatusBar style="light" />

            <Image source={require('../assets/images/bg.png')} 
                blurRadius={70}
                className="absolute w-full h-full"
            />
            <SafeAreaView className="mx-4">
                { children }
            </SafeAreaView>
        </View>
    )
}