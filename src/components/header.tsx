import { Link } from 'lucide-react'; // Assuming Link is an icon component

export function Header() {
  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Replace with an appropriate logo or icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <h1 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">ChainLink</h1>
        </div>
        {/* Placeholder for potential future navigation or user profile */}
        <div>
            {/* <UserNav /> */}
        </div>
      </div>
    </header>
  );
}
