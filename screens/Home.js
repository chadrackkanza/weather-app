import {useState} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { theme } from '../theme';
import Page from "../components/Page"
import axios from 'axios';
export default function Home({ navigation }){
    const [location, setLocation] = useState({
        name : "Bruxelles",
        country : "Belgique"
    })
    const [condition, setCondition] = useState({
        icon : "//img01.ztat.net/article/spp-media-p1/2f5c80d548e54fa7a759d10fcd59f0ac/e4ea2db3faa34ec1a544ead3de27b8df.jpg?imwidth=762",
        text : "Null"
    })

    const [degree, setDegree] = useState(0)
    function weatherApi(){
        axios.get("https://api.weatherapi.com/v1/current.json?key=8cb282df0173473a8c7121808230408&q=Brazzaville&aqi=no")
            .then(response => {
                setLocation(response.data.location)
                setCondition(response.data.current.condition)
                setDegree(response.data.current.temp_c)
            })

    }

    return (
        <Page>
                {/* Search button */}
                <View className="flex-row justify-end">
                    <Pressable onPress={() => weatherApi()} className=" p-3 m-1 rounded-full" style={{backgroundColor : theme.bgWhite(0.2)}}>
                        <MagnifyingGlassIcon size="25" color="white" />
                    </Pressable>
                </View>

                {/* Location */}
                <View className="flex mt-8">
                    <Text className="text-white text-center text-4xl font-bold">
                        {location.name}, 
                        <Text className="text-2xl font-semibold text-gray-300"> { location.country}</Text>
                    </Text>
                </View>

                {/* Weather icon */}
                <View className="flex-row justify-center mt-8">
                    <Image source={{ uri : 'https:' + condition.icon }}
                        className="w-52 h-52"
                    />
                </View>

                {/* Degree celcius */}
                <View className="mt-16">
                    <Text className="text-white font-bold text-6xl text-center">
                        {degree}&#176;
                    </Text>
                    <Text className="text-white text-center text-xl tracking-widest">
                        {condition.text}
                    </Text>
                </View>

                {/* Other statistiques */}
                <View className="flex-row justify-between mx-4 mt-16">
                    <View className="flex-row space-x-2">
                        <Image source={require('../assets/icons/wind.png')} className="w-6 h-6" />
                        <Text className="text-white font-semibold text-base">1.2 Km</Text>
                    </View>
                    <View className="flex-row space-x-2">
                        <Image source={require('../assets/icons/drop.png')} className="w-6 h-6" />
                        <Text className="text-white font-semibold text-base">93%</Text>
                    </View>
                    <View className="flex-row space-x-2">
                        <Image source={require('../assets/icons/sun.png')} className="w-6 h-6" />
                        <Text className="text-white font-semibold text-base">08:00 AM</Text>
                    </View>
                </View>
        </Page>
    )
}


