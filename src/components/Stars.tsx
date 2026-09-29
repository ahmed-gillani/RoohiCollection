interface StarsProps {
  rating: number;
  className?: string;
}

export default function Stars({ rating, className = '' }: StarsProps) {
  const filled = Math.round(rating);
  const str = '★★★★★☆☆☆☆☆'.slice(5 - filled, 10 - filled);
  return <span className={className}>{str}</span>;
}
