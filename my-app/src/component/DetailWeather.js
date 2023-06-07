import { Image, StyleSheet, Text, View } from "react-native"
import { formatDate, kelvinToCelcius } from "../helpers/helper";

function DetailWeather({ route }) {
    const data = route.params.data
    const weathers = data.weather[0]
    const image = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    const kelvin = data.main.temp;
    const celcius = kelvinToCelcius(kelvin)
    const tempMin = kelvinToCelcius(data.main.temp_min)
    const tempMax = kelvinToCelcius(data.main.temp_max)
    const date = data.dt_txt;
    const formattedDate = formatDate(date, 'detail');


    function splitDateAndTime(string) {
        var split = string.split(', ');
        var date = split[0] + ', ' + split[1] + ', ' + split[2];
        var time = split[3];

        return [date, time];
    }
    const dateResult = splitDateAndTime(formattedDate);
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={[{ fontSize: 20 }, styles.font]}>
                    {dateResult[0]}
                </Text>
                <Text style={{ fontSize: 20 }}>
                    {dateResult[1]}
                </Text>
            </View>
            <View style={styles.containerImage}>
                <Text style={[{ fontSize: 32 }, styles.font]}>
                    {celcius}°C
                </Text>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View>
                <Text style={styles.font}>
                    {weathers.main} {`(${weathers.description})`}
                </Text>
            </View>
            <View style={styles.temp}>
                <View style={{ alignItems: 'center' }}>
                    <Text>
                        Temp (Min)
                    </Text>
                    <Text style={styles.font}>
                        {tempMin}°C
                    </Text>

                </View>
                <View>
                    <Text>
                        Temp (Max)
                    </Text>
                    <Text style={styles.font}>
                        {tempMax}°C
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 5,
        paddingTop: 5
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: -10,
        marginVertical: 30,
        paddingVertical: 10,
        width: '100%',
        height: '15%',
    },
    image: {
        width: "40%",
        height: 100
    },
    temp: {
        flexDirection: 'row',
        marginVertical: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        width: '80%',
    },
    font: {
        fontWeight: '600'
    }
})

export default DetailWeather