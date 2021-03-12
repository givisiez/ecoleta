import React, {useEffect, useRef, useState} from 'react';
import './Map.scss';

interface IMap {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
}

interface IMarker {
    address: string;
    latitude: number;
    longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Map: React.FC<IMap> = ({mapType, mapTypeControl = false}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();

    const startMap = ():void => {
        if (!map) {
            defaultMapStart();
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(startMap, [map]);

    const defaultMapStart = ():void => {
        const defaultMapAddress = new google.maps.LatLng(-22.8734331,-43.4163019);
        initMap(5, defaultMapAddress);
    };

    const initEventListener = ():void => {
        if (map) {
            google.maps.event.addListener(map, 'click', function(e){
                coordinateToAddress(e.latLng);
            });
        }
    };

    useEffect(initEventListener, [map]);

    const coordinateToAddress = async (coordinate: GoogleLatLng) => {    
        const geocoder = new google.maps.Geocoder();
        await geocoder.geocode({ location: coordinate}, function (results, status) {
            if (status === 'OK') {                
                setMarker({
                    address: results[0].formatted_address,
                    latitude: coordinate.lat(),
                    longitude: coordinate.lng()
                });
            }
        })
    };

    const addSingleMarker = ():void => {
        if (marker) {
            addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(addSingleMarker, [marker]);

    const addMarker = (location: GoogleLatLng): void => {       
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const marker:GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: getIconAttributes('#000000')
        });        
    };

    const getIconAttributes = (iconColor: string) => {
        return {
            path:'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
            fillColor: 'blue',
            fillOpacity: 0.8,            
            strokeWeight: 1,
            scale: 2,
            anchor: new google.maps.Point(12, 21)
        };
    };

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl: mapTypeControl,
                    streetViewControl: true,
                    rotateControl: false,
                    fullscreenControl: true,
                    panControl: false,                    
                    zoomControl: true,
                    gestureHandling: 'cooperative',                    
                    mapTypeId: mapType,
                    draggableCursor: 'pointer',
                })
            );

        }
    };

    return (
        <div className="map-container">
            <div ref={ref} className="map-container__map"></div>
        </div>
    )
};

export default Map;