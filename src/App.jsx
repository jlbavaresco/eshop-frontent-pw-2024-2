import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './componentes/telas/Home';
import Sobre from './componentes/telas/Sobre';
import Categoria from './componentes/telas/categoria/Categoria';
import Produto from './componentes/telas/produto/Produto';
import Login from './componentes/telas/login/Login';
import MenuPrivado from './componentes/MenuPrivado';
import MenuPublico from './componentes/MenuPublico';

const router = createBrowserRouter([
  {
    path: "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "/sobre",
        element : <Sobre/>
      },
      {
        path : "login",
        element : <Login/>
      }       
    ]
  },
  {
    path : "/privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "categorias",
        element : <Categoria/>
      },
      {
        path : "produtos",
        element : <Produto/>
      } ,
      {
        path : "sobre",
        element : <Sobre/>
      }
    ]

  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
