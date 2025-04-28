import { Link } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link className="text-primary h-6 w-6" />
          <h1 className="text-2xl font-bold text-foreground">ChainLink</h1>
        </div>
        {/* Add navigation links here if needed */}
      </div>
    </header>
  );
}
