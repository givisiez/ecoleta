import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';

const CreatePoint = () => {
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
                            <label htmlFor="state">Estado (UF)</label>
                            <select name="state" id="state">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>                   
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        <li className="selected">
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Baterias"/>
                            <span>Baterias</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/eletronicos.svg" alt="Eletrônicos"/>
                            <span>Eletrônicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
                            <span>Lâmpadas</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/organicos.svg" alt="Orgânicos"/>
                            <span>Orgânicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/papeis-papelao.svg" alt="Papéis"/>
                            <span>Papéis</span>
                        </li>
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