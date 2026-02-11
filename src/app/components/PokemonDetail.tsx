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

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        setPokemon({
          id: data.id,
          name: data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          types: data.types.map((t: any) => t.type.name),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((a: any) => a.ability.name)
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
          <button
            onClick={() => navigate('/pokedex')}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#2A303C',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ← Back to list
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left - Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
            />
          </div>

          {/* Right - Info */}
          <div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#2A303C',
              opacity: 0.6,
              marginBottom: '8px'
            }}>
              #{pokemon.id.toString().padStart(3, '0')}
            </div>

            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '48px',
              fontWeight: 700,
              color: '#2A303C',
              textTransform: 'capitalize',
              marginBottom: '32px'
            }}>
              {pokemon.name}
            </h1>

            {/* Types */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#2A303C',
                opacity: 0.6,
                marginBottom: '12px'
              }}>
                TYPE
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                {pokemon.types.map(type => (
                  <span
                    key={type}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      padding: '8px 24px',
                      backgroundColor: typeColors[type] || '#A8A878',
                      color: '#fff',
                      borderRadius: '20px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#2A303C',
                  opacity: 0.6,
                  marginBottom: '8px'
                }}>
                  HEIGHT
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  color: '#2A303C'
                }}>
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#2A303C',
                  opacity: 0.6,
                  marginBottom: '8px'
                }}>
                  WEIGHT
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  color: '#2A303C'
                }}>
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#2A303C',
                opacity: 0.6,
                marginBottom: '12px'
              }}>
                ABILITIES
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {pokemon.abilities.map(ability => (
                  <span
                    key={ability}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      padding: '8px 16px',
                      backgroundColor: '#F3F4F6',
                      color: '#2A303C',
                      borderRadius: '8px',
                      textTransform: 'capitalize'
                    }}
                  >
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
