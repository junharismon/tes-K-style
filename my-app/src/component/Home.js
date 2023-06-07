import { useCallback, useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllWeather } from "../store/Actions/Action";
import { useNavigation } from "@react-navigation/native";
import { formatDate, kelvinToCelcius } from "../helpers/helper";

function Home() {
    const weather = useSelector((state) => state.ReducerWeather.weather)
    const loading = useSelector((state) => state.ReducerWeather.loading)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        dispatch(getAllWeather())
    }, [])

    const renderItem = useCallback(({ item }) => {
        const weathers = item.weather[0].main
        const image = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        const kelvin = item.main.temp;
        const celcius = kelvinToCelcius(kelvin)
        const date = item.dt_txt;
        const formattedDate = formatDate(date, 'home');
        return (
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Detail', { data: item })}>
                <View style={styles.boxImage}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.viewText}>
                    <Text style={{ fontWeight: 'bold', }}>
                        {formattedDate}
                    </Text>
                    <Text style={styles.text}>
                        {weathers}
                    </Text>
                    <Text style={styles.text}>
                        Temp: {celcius}°C
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }, []);

    const renderEmpty = () => {
        return (

            <View style={styles.containerEmpty}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxDaIpCk0PtCgW_d2xJuEZj0vBHxYhESvCJw' }} style={styles.imageEmpty} />
            </View>
        )
    }
    return (
        <>
            <View style={styles.container} >
                {loading ? (
                    <View>
                        <ActivityIndicator size="large" color='blue' />
                    </View>
                ) : (
                    <FlatList
                        data={weather.list}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.dt.toString()}
                        ListEmptyComponent={renderEmpty}
                    />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    box: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
    },
    boxImage: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 70,
        height: 70,
    },
    viewText: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        color: 'grey'
    },
    containerEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageEmpty: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.9,
        resizeMode: 'cover',
    },
})
export default Home