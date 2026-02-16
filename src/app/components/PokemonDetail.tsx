import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
}

const typeColors: Record<string, string> = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC'
};

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    
    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        // erro 404 quando a api falha/n carrega os personagens
        if (!res.ok) throw new Error("Pokemon not found");

        const data = await res.json();
        
        setPokemon({
          id: data.id,
          name: data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          types: data.types.map((t: any) => t.type.name),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((a: any) => a.ability.name)
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        Carregando...
      </div>
    );
  }

  // mostra msg se a API falha
  if (error || !pokemon) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <p>Não conseguimos encontrar esse Pokémon.</p>
        <button onClick={() => navigate('/pokedex')} style={{ color: '#FF5A5F', cursor: 'pointer', border: 'none', background: 'none', textDecoration: 'underline' }}>
          Voltar para a lista
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* Header - Kept your exact styles */}
      <div style={{ borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
          <button
            onClick={() => navigate('/pokedex')}
            style={{ fontSize: '14px', fontWeight: 500, color: '#2A303C', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Voltar
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} />
          </div>

          <div>
            <div style={{ fontSize: '14px', color: '#2A303C', opacity: 0.6, marginBottom: '8px' }}>
              #{String(pokemon.id).padStart(3, '0')}
            </div>

            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#2A303C', textTransform: 'capitalize', marginBottom: '32px' }}>
              {pokemon.name}
            </h1>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#2A303C', opacity: 0.6, marginBottom: '12px', letterSpacing: '1px' }}>
                TIPO
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                {pokemon.types.map(type => (
                  <span key={type} style={{ fontSize: '14px', fontWeight: 600, padding: '8px 24px', backgroundColor: typeColors[type] || '#A8A878', color: '#fff', borderRadius: '20px', textTransform: 'capitalize' }}>
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#2A303C', opacity: 0.6, marginBottom: '8px' }}>ALTURA</h3>
                <p style={{ fontSize: '18px', color: '#2A303C' }}>{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#2A303C', opacity: 0.6, marginBottom: '8px' }}>PESO</h3>
                <p style={{ fontSize: '18px', color: '#2A303C' }}>{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#2A303C', opacity: 0.6, marginBottom: '12px' }}>HABILIDADES</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {pokemon.abilities.map(ability => (
                  <span key={ability} style={{ fontSize: '14px', padding: '8px 16px', backgroundColor: '#F3F4F6', color: '#2A303C', borderRadius: '8px', textTransform: 'capitalize' }}>
                    {ability.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}