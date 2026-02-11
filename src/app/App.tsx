import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './components/Home';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/pokedex', element: <PokemonList /> },
  { path: '/pokemon/:id', element: <PokemonDetail /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
