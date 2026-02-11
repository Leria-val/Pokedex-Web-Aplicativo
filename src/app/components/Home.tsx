import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(search ? `/pokedex?search=${search}` : '/pokedex');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '60px',
          fontWeight: 700,
          color: '#2A303C',
          marginBottom: '16px'
        }}>
          Catch Them All
        </h1>
        
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '20px',
          color: '#2A303C',
          opacity: 0.7,
          marginBottom: '48px'
        }}>
          Explora o mundo Pokemon
        </p>

        <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokémon..."
            style={{
              width: '100%',
              padding: '16px 20px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              border: '2px solid #E5E7EB',
              borderRadius: '12px',
              outline: 'none'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#FF5A5F'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
          />
        </form>

        <button
          onClick={() => navigate('/pokedex')}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            padding: '16px 48px',
            backgroundColor: '#FF5A5F',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Ver Pokédex
        </button>
      </div>
    </div>
  );
}
