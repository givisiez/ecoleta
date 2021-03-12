import dotenv from 'dotenv';
dotenv.config();

const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export const loadMapApi = () => {
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&language=pt&region=br&v=quarterly`;
    const scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }

    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = mapsURL;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.document.body.appendChild(googleMapsScript);

    return googleMapsScript;

};