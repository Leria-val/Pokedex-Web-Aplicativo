import { useState } from 'react';


const PLACEHOLDER = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

interface ImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, className }: ImageProps) {
  const [error, setError] = useState(false);

  // se a imagem n carrega (e.g., 404 da API), mudamos o state
  const handleError = () => {
    setError(true);
  };

  return (
    <img
      // se o erro e true, mostramos o placeholder, ou se nao, o src real
      src={error ? PLACEHOLDER : src}
      alt={alt}
      className={`${className} ${error ? 'opacity-40 grayscale' : ''}`}
      onError={handleError}
    />
  );
}