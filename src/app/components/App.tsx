import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './Home';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/pokedex', element: <PokemonList /> },
  { path: '/pokemon/:id', element: <PokemonDetail /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
