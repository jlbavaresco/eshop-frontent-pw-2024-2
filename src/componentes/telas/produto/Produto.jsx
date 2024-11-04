import { useState, useEffect } from "react";
import ProdutoContext from "./ProdutoContext";
import { getCategoriasAPI } from "../../../servicos/CategoriaServico";
import { getProdutoPorCodigoAPI, getProdutosAPI, cadastraProdutoAPI, 
    deleteProdutoPorCodigoAPI
 } from "../../../servicos/ProdutoServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";

function Produto() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: 0,
        nome: "",
        descricao : "",
        quantidade_estoque : "",
        valor : "",
        ativo : "",
        data_cadastro : new Date().toISOString().slice(0,10),
        categoria : "" });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao : "",
            quantidade_estoque : "",
            valor : "",
            ativo : "",
            data_cadastro : new Date().toISOString().slice(0,10),
            categoria : ""
        })
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(await getProdutoPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
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
            console.log("Erro: " + err);
        }
        recuperaProdutos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaCategorias = async () => {
        setListaCategorias(await getCategoriasAPI());
    }

    const recuperaProdutos = async () => {
        setCarregando(true);
        setListaObjetos(await getProdutosAPI());
        setCarregando(false);
    }    

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteProdutoPorCodigoAPI(codigo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            recuperaProdutos();
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

export default Produto;