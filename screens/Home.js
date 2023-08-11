import {useState, useEffect, useCallback} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { theme } from '../theme';
import Page from "../components/Page"
import axios from 'axios';
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import * as Progress from "react-native-progress"
import { weatherImages } from '../constants';
import { getData, storeData } from '../utils/asyncStorage';
import { Button, Actionsheet, useDisclose, Box, Center } from "native-base";


export default function Home({ navigation }){

    const {
        isOpen,
        onOpen,
        onClose
      } = useDisclose();

    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)
    const [weather, setWeather] = useState([])


    useEffect(() => {
        fetchMyWeatherData()
    }, [])

    const fetchMyWeatherData = async () => {
        let myCity = await getData('city')
        let cityName = "London"

        if(myCity){
            cityName = myCity
        }
        fetchWeatherForecast({
            cityName,
            days : '7'
        }).then(data => {
            setLoading(false)
            setWeather(data)
        })
    }

    const handleSearch = (search) => {
        // console.log('value: ',search);
        if (search && search.length > 2)
          fetchLocations({ cityName: search }).then((data) => {
            // console.log('got locations: ',data);
            setLocations(data);
          });
      };
    

    const handleLocation = location => {
        setLoading(true)
        setLocations([])
        
        fetchWeatherForecast({
            cityName : location.name,
            days : '7'
        }).then(data => {
            setLoading(false)
            setWeather(data)
            storeData("city", location.name);
        })
    }
    const { location , current} = weather
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    return (
        <Page>
            {
                loading ? 
                (
                    <View className=" h-full flex-row justify-center items-center">
                        <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2"/>
                    </View>
                )
                :
                (
                    <View>
                        {/* Search button */}
                        
                        <View className="flex-row justify-end">
                            <Pressable onPress={onOpen} className=" p-3 m-1 rounded-full" style={{backgroundColor : theme.bgWhite(0.2)}}>
                                <MagnifyingGlassIcon size="25" color="white" />
                            </Pressable>
                        </View>

                        {/* Location */}
                        <View className="flex mt-4">
                            <Text className="text-white text-center text-4xl font-bold">
                                {location?.name}, 
                                <Text className="text-2xl font-semibold text-gray-300"> {location?.country}</Text>
                            </Text>
                        </View>

                        {/* Weather icon */}
                        <View className="flex-row justify-center mt-8">
                            <Image source={weatherImages[current?.condition?.text || 'other']}
                                className="w-52 h-52"
                            />
                        </View>

                        {/* Degree celcius */}
                        <View className="mt-16">
                            <Text className="text-white font-bold text-6xl text-center">
                                {current?.temp_c}&#176;
                            </Text>
                            <Text className="text-white text-center text-xl tracking-widest">
                                {current?.condition?.text}
                            </Text>
                        </View>

                        {/* Other statistiques */}
                        <View className="flex-row justify-between mx-4 mt-16">
                            <View className="flex-row space-x-2">
                                <Image source={require('../assets/icons/wind.png')} className="w-6 h-6" />
                                <Text className="text-white font-semibold text-base">{current?.wind_kph} Km</Text>
                            </View>
                            <View className="flex-row space-x-2">
                                <Image source={require('../assets/icons/drop.png')} className="w-6 h-6" />
                                <Text className="text-white font-semibold text-base">{current?.humidity}%</Text>
                            </View>
                            <View className="flex-row space-x-2">
                                <Image source={require('../assets/icons/sun.png')} className="w-6 h-6" />
                                <Text className="text-white font-semibold text-base">
                                    {
                                        weather?.forecast?.forecastday[0]?.astro?.sunrise
                                    }
                                </Text>
                            </View>
                        </View>

                        <View>
                            
                            <Actionsheet isOpen={isOpen} onClose={onClose}>
                                <Actionsheet.Content>
                                <Box w="100%" h={60} px={4} justifyContent="center">
                                    
                                    <TextInput onChangeText={handleTextDebounce} placeholder='Entrez une ville' 
                                    className="p-2 py-3 bg-gray-300 text-gray-700 rounded-xl"
                                    />
                                </Box>
                                {
                                    locations.length > 0 ? (
                                        <>
                                        {
                                            locations.map(item => (
                                                <Actionsheet.Item onPress={() =>{ onClose();  handleLocation(item)}} key={item.id}>{item.name + ', ' + item.region + ', ' + item.country}</Actionsheet.Item>
                                            ))
                                        }
                                        </>
                                    )
                                    :
                                    null
                                }
                                
                                </Actionsheet.Content>
                            </Actionsheet>
                        </View>
                    </View>
                )
            }
        </Page>
    )
}


