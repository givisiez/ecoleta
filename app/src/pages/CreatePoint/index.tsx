import  { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import './styles.css';
import "leaflet/dist/leaflet.css";

import logo from '../../assets/logo.svg';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';

interface Item {
    id: string;
    title: string;
    image_url: string;
}

interface IbgeStateInitial {
    sigla: string;
    nome: string;
}

interface IbgeCityResponse {
    nome: string;
}

const CreatePoint = () => {
    
    const [items, setItems] = useState<Item[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    // const [initials, setInitials] = useState<string[]>([]);

    const [selectedState, setSelectedState] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IbgeStateInitial[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/?orderBy=nome')
        .then(response => {
            const state = response.data.map(state => state.sigla);
            // const initial = response.data.map(name => name.nome);

            setStates(state);
           //  setInitials(initial);
        });
    }, []);  
    
    useEffect(() => {

        if (selectedState === '0') {
            return;
        }

        axios.get<IbgeCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ selectedState }/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome);
            // const initial = response.data.map(name => name.nome);

            setCities(cityNames);
           //  setInitials(initial);
        });

    }, [selectedState]);

    function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
        const state = event.target.value;

        setSelectedState(state);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);
    }

   /* function handleMapClick( event: LeafletMouseEvent ){      
        event.latlng;
    }*/

    return (
        <div id="page-create-point">
            <header>
                <img src={ logo } alt="Ecoleta" />

                <Link to ="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form action="">
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div> 
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="text"
                                name="email"
                                id="email"
                            />
                        </div>                    
                        <div className="field">
                            <label htmlFor="phone">Telefone</label>
                            <input 
                                type="text"
                                name="phone"
                                id="phone"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <div className="field-group"> 
                        <div className="field">
                            <label htmlFor="street">Logradouro <small>(Rua, Av., etc.)</small></label>
                            <input 
                                type="text"
                                name="street"
                                id="street"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="number">Número</label>
                            <input 
                                type="text"
                                name="number"
                                id="number"
                            />
                        </div>
                    </div>
                    <div className="field-group">                        
                        <div className="field">
                            <label htmlFor="state">Estado (UF)</label>
                            <select 
                                name="state" 
                                id="state" 
                                value={ selectedState } 
                                onChange={ handleSelectState }
                            >
                                <option value="0">Selecione uma UF</option>                              
                                { states.map( state => (                                    
                                    <option key={ state } value={ state }>{ state }</option>
                                )) }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city"
                                value={ selectedCity }
                                onChange={ handleSelectCity }
                            >
                                <option value="0">Selecione uma cidade</option>
                                { cities.map( city => (                                    
                                    <option key={ city } value={ city }>{ city }</option>
                                )) }
                            </select>
                        </div>
                    </div> 
                    <MapContainer center={[-22.8734331, -43.4163019]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-22.8734331, -43.4163019]}  icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>                        
                    </MapContainer>                 
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        { items.map(item => (
                            <li key={ item.id }>
                                <img src={ item.image_url } alt={ item.title }/>
                                <span>{ item.title }</span>
                            </li>   
                        )) }
                                            
                    </ul>                    
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;