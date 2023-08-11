import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native';
import Page from '../components/Page'
export default function Search({ navigation}){
    return(
        <Page>
            <View>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text className="text-white text-lg">Back</Text>
                    </Pressable>
                    <Text className="text-white  text-4xl font-bold">
                            Recherche 
                    </Text>
                </View>
        </Page>
    )
}