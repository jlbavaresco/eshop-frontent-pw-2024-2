import { useState, useEffect } from "react";
import ProdutoContext from "./ProdutoContext";
import { getCategoriasAPI } from "../../../servicos/CategoriaServico";
import {
    getProdutoPorCodigoAPI, getProdutosAPI, cadastraProdutoAPI,
    deleteProdutoPorCodigoAPI
} from "../../../servicos/ProdutoServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Produto() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: 0,
        nome: "",
        descricao: "",
        quantidade_estoque: "",
        valor: "",
        ativo: "",
        data_cadastro: new Date().toISOString().slice(0, 10),
        categoria: ""
    });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: "",
            valor: "",
            ativo: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: ""
        })
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try {

            setObjeto(await getProdutoPorCodigoAPI(codigo));
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
            let retornoAPI = await cadastraProdutoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            navigate("/login", { replace: true });
        }
        recuperaProdutos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaCategorias = async () => {
        try {
            setListaCategorias(await getCategoriasAPI());
        } catch (err) {
            navigate("/login", { replace: true });
        }
    }

    const recuperaProdutos = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getProdutosAPI());
            setCarregando(false);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteProdutoPorCodigoAPI(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaProdutos();
            } catch (err) {
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaCategorias();
        recuperaProdutos();
    }, []);

    return (
        <ProdutoContext.Provider value={{
            alerta, listaObjetos, remover, objeto, editarObjeto,
            novoObjeto, acaoCadastrar, handleChange, exibirForm, setExibirForm,
            listaCategorias
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </ProdutoContext.Provider>
    )
}

export default WithAuth(Produto);
