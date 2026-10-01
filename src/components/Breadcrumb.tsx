import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: string;
}

// "Home" is always prepended; the last item is the current page and is never a link
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: 'Home', to: '/' }, ...items];
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${c.label}-${i}`}>
              {last || !c.to ? (
                <span aria-current={last ? 'page' : undefined}>{c.label}</span>
              ) : (
                <Link to={c.to}>{c.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
