import { useState, useEffect } from "react";
import CategoriaContext from "./CategoriaContext";
import {
    getCategoriasAPI, getCategoriaPorCodigoAPI, deleteCategoriaPorCodigoAPI,
    cadastraCategoriaAPI
} from "../../../servicos/CategoriaServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Categoria() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        })
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getCategoriaPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log("Erro: " + err);
            navigate("/login", { replace: true });
        }
        recuperaCategorias();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaCategorias = async () => {
        try {
            setCarregando(true);

            setListaObjetos(await getCategoriasAPI());
            /*        
            // Para testar o componente carregando sendo exibido
             setTimeout(()=> {
                        console.log('atraso de 3 segundos');
                        setCarregando(false);
                    }, 3000); */
            setCarregando(false);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteCategoriaPorCodigoAPI(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaCategorias();
            } catch (err) {
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={{
            alerta, listaObjetos, remover, objeto, editarObjeto,
            novoObjeto, acaoCadastrar, handleChange, exibirForm, setExibirForm
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </CategoriaContext.Provider>
    )
}

export default WithAuth(Categoria);
