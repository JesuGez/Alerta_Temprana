import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Mapa = () => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 11.000731140980559,
        longitude: -74.8019864782691,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permiso de ubicación denegado');
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        setmapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        console.log(location.coords.latitude, location.coords.longitude)
    }
    useEffect(() => {
        userLocation();
    }, [])

    return (
        <View>
            <MapView zoomControlEnabled={true} style={styles.map}
                region={mapRegion}
                onPress={this.handleMapPress}
            >
                <Marker coordinate={mapRegion} />
            </MapView>
            <Button title='Get Location' onPress={userLocation}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '40%'
    }
})


export default Mapa;