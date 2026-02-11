import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export default function PokemonList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => {
        const results = data.results.map((p: any, index: number) => ({
          id: index + 1,
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
        }));
        setPokemon(results);
        setLoading(false);
      });
  }, []);

  const filtered = pokemon.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#2A303C',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            ← Home
          </button>

          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '40px',
            fontWeight: 700,
            color: '#2A303C',
            marginBottom: '24px'
          }}>
            Pokédex
          </h1>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokémon..."
            style={{
              maxWidth: '500px',
              width: '100%',
              padding: '12px 16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              border: '2px solid #E5E7EB',
              borderRadius: '12px',
              outline: 'none'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#FF5A5F'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
          />
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', color: '#2A303C' }}>
            Carregando...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {filtered.map(p => (
              <div
                key={p.id}
                style={{
                  backgroundColor: '#F3F4F6',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ 
                  aspectRatio: '1',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#2A303C',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  marginBottom: '16px'
                }}>
                  {p.name}
                </h3>

                <button
                  onClick={() => navigate(`/pokemon/${p.id}`)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    backgroundColor: '#FF5A5F',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Detalhes
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', color: '#2A303C' }}>
            Pokemon não encontrado
          </div>
        )}
      </div>
    </div>
  );
}
