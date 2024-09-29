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
import { useCallback, useEffect, useMemo, useState } from 'react'
import Search from '../search/Search'
import Image from 'next/image'

const customIcon = new Icon({
    iconUrl: 'icons/current_location_marker.png',
    iconSize: [36, 36],
})

const startEndIcon = new Icon({
    iconUrl: 'icons/map-marker-icon.png',
    iconSize: [36, 36],
})

// const MAP_CENTER: LatLngExpression = [50.06438993609793, 19.925162065678766]
const MAP_CENTER: LatLngExpression = [50.062106, 19.9515026]
const MAP_ZOOM = 13

const pos: LatLngExpression[] = [].map((loc) => [loc[1], loc[0]])

const MapComponent = () => {
    const [path, setPath] = useState<LatLngExpression[]>([])
    const [coord, setCoord] = useState<LatLngExpression>(MAP_CENTER)
    const [destination, setDestination] = useState<LatLngExpression | null>(
        null
    )
    const [isSelected, setIsSelected] = useState(false)

    const getBrowserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentUserLocation: LatLngExpression = [
                        position.coords.latitude,
                        position.coords.longitude,
                    ]

                    setCoord(currentUserLocation)
                },
                () => {
                    setCoord(MAP_CENTER)
                }
            )
        }
    }

    useEffect(() => {
        getBrowserLocation()
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

    const handleSelectedLocation = (newValue: LatLngExpression | null) => {
        if (newValue) {
            setIsSelected(true)
            setDestination(newValue)
        } else {
            setIsSelected(false)
            setDestination(null)
        }
    }

    const searchRoad = () => {
        const url = `http://127.0.0.1:5000/api`
        if (
            url &&
            Array.isArray(coord) &&
            Array.isArray(destination) &&
            coord.length &&
            destination.length
        ) {
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    startLat: Number(coord[0]),
                    startLon: Number(coord[1]),
                    endLat: Number(destination[0]),
                    endLon: Number(destination[1]),
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setPath(res)
                })
        }
    }

    const RoadPolyline = useCallback(() => {
        console.log(path)
        return <Polyline positions={path} color='red' />
    }, [path])

    return (
        <div className={styles['map-container']}>
            <MapContainer
                className={styles['leaflet-container']}
                center={coord}
                zoom={MAP_ZOOM}
            >
                <TileLayer
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    maxZoom={20}
                    url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
                />
                <Marker position={coord} icon={customIcon}>
                    <Popup>{"You're here 👋"}</Popup>
                </Marker>
                {isSelected && destination && (
                    <Marker position={destination} icon={startEndIcon}>
                        <Popup>{'Your destination 👇'}</Popup>
                    </Marker>
                )}
                <RoadPolyline />
                <ResetMapCenter />
            </MapContainer>
            <div className={styles['search-panel']}>
                <Search
                    onChange={handleSelectedLocation}
                    onClick={getBrowserLocation}
                />
                <div className={styles['search-button']} onClick={searchRoad}>
                    Search road
                    <Image
                        alt='Search location icon'
                        src='/icons/arrow-icon.png'
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </div>
    )
}

export default MapComponent
