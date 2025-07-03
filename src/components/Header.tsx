interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "🌍 City Explorer" }) => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Cities
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
