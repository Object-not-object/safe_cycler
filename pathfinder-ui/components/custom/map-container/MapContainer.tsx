'use client'

import 'leaflet/dist/leaflet.css'
import { Icon, LatLngExpression } from 'leaflet'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    Polyline,
} from 'react-leaflet'
import styles from './MapContainer.module.css'
import { useEffect, useState } from 'react'
import Search from '../search/Search'

const customIcon = new Icon({
    iconUrl: 'icons/current_location_marker.png',
    iconSize: [36, 36],
})

const startEndIcon = new Icon({
    iconUrl: 'icons/map-marker-icon.png',
    iconSize: [36, 36],
})

const MAP_CENTER: LatLngExpression = [50.06438993609793, 19.925162065678766]
const MAP_ZOOM = 13

const pos: LatLngExpression[] = [
    [19.9456085, 50.0567922],
    [19.9455264, 50.0567743],
    [19.9454705, 50.0567701],
    [19.9453991, 50.0567653],
    [19.9453631, 50.056765],
    [19.9453585, 50.0567591],
    [19.9453494, 50.0567475],
    [19.9453156, 50.0567036],
    [19.9453117, 50.0566985],
    [19.945301, 50.0566854],
    [19.9452896, 50.0566714],
    [19.9452834, 50.0566634],
    [19.9452209, 50.0565839],
    [19.9451288, 50.0564707],
    [19.9451151, 50.0564545],
    [19.9448197, 50.0561068],
    [19.9447784, 50.0560565],
    [19.9445258, 50.0557328],
    [19.9442617, 50.055404],
    [19.9442119, 50.0553402],
    [19.9440684, 50.0553894],
    [19.9436895, 50.0554262],
    [19.9434277, 50.0554516],
    [19.9431971, 50.0554737],
    [19.9423212, 50.0555592],
    [19.9419689, 50.0555936],
    [19.9419404, 50.0555961],
    [19.9410267, 50.0556848],
    [19.9403069, 50.0557546],
    [19.9402023, 50.0557648],
    [19.9401805, 50.0557669],
    [19.9401071, 50.0554697],
    [19.9399911, 50.0549994],
    [19.939967, 50.054902],
    [19.9399294, 50.0547712],
    [19.9398604, 50.0546681],
    [19.9397778, 50.0546016],
    [19.9396039, 50.0544615],
    [19.93931, 50.0542453],
    [19.9392784, 50.0542151],
    [19.939226, 50.0540981],
    [19.939212, 50.0541019],
    [19.9391406, 50.0541216],
    [19.9389975, 50.0541609],
    [19.9386035, 50.054397],
    [19.9383639, 50.0545596],
    [19.9381933, 50.0546675],
    [19.9380119, 50.0548159],
    [19.9379045, 50.0548991],
    [19.9378196, 50.0549822],
    [19.937693, 50.0551204],
    [19.9375724, 50.0552411],
    [19.9374784, 50.0552981],
    [19.9373836, 50.0553287],
    [19.9372822, 50.0553525],
    [19.9370356, 50.0553878],
    [19.9368011, 50.0554177],
    [19.9366899, 50.0554329],
    [19.9365361, 50.0554543],
    [19.9362646, 50.0554907],
    [19.9360684, 50.055505],
    [19.9358792, 50.0555084],
    [19.9357694, 50.0554987],
    [19.9356567, 50.0554813],
    [19.9348386, 50.0553014],
    [19.9346877, 50.0552693],
    [19.9335036, 50.055013],
    [19.9334617, 50.0550074],
    [19.9334132, 50.0550056],
    [19.9333593, 50.0550107],
    [19.9332968, 50.0550212],
    [19.9326157, 50.0551868],
    [19.9322597, 50.055271],
    [19.9321086, 50.0553069],
    [19.9320049, 50.0553058],
    [19.9318664, 50.0553389],
    [19.931573, 50.0554099],
    [19.9314322, 50.0554443],
    [19.9304155, 50.0556876],
    [19.9303683, 50.0556226],
    [19.9303021, 50.055529],
    [19.9302392, 50.0555079],
    [19.9301567, 50.0555016],
    [19.9299426, 50.0555451],
    [19.9297644, 50.0555796],
    [19.9295881, 50.0556178],
    [19.9295293, 50.0556554],
    [19.9294993, 50.0557177],
    [19.9294968, 50.0558123],
    [19.9295004, 50.0558461],
    [19.9295159, 50.0559095],
    [19.929069, 50.0560256],
    [19.9289356, 50.0560602],
    [19.9288987, 50.0560757],
    [19.9288653, 50.0560897],
    [19.928821, 50.0561118],
    [19.9287791, 50.0560784],
    [19.928399, 50.0557766],
    [19.928387, 50.0557665],
    [19.9283719, 50.0557545],
].map((loc) => [loc[1], loc[0]])

const MapComponent = () => {
    const [coord, setCoord] = useState<LatLngExpression>(MAP_CENTER)

    useEffect(() => {
        if (navigator.geolocation) {
            console.log('test')

            navigator.geolocation.getCurrentPosition((position) => {
                const currentUserLocation: LatLngExpression = [
                    position.coords.latitude,
                    position.coords.longitude,
                ]

                setCoord(currentUserLocation)
            })
        }
    }, [])

    const ResetMapCenter = () => {
        const map = useMap()

        useEffect(() => {
            map.setView(coord, map.getZoom(), {
                animate: true,
            })
        }, [coord])

        return null
    }

    return (
        <div>
            <Search onChange={setCoord} />
            <MapContainer
                className={styles['leaflet-container']}
                center={coord}
                zoom={MAP_ZOOM}
            >
                <TileLayer
                    attribution='Google Maps'
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    maxZoom={20}
                    url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
                />
                <Marker position={coord} icon={customIcon}>
                    <Popup>{"You're here 👋"}</Popup>
                </Marker>
                {pos &&
                    pos.length &&
                    [pos[0], pos[pos.length - 1]].map((loc, index) => (
                        <Marker position={loc} icon={startEndIcon} key={index}>
                            <Popup>{"You're here 👋"}</Popup>
                        </Marker>
                    ))}
                <Polyline positions={pos} color='red' />
                <ResetMapCenter />
            </MapContainer>
        </div>
    )
}

export default MapComponent
