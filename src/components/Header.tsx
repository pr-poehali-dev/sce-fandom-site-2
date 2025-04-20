import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-sce-secondary text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo-b.svg" alt="SCE Foundation" className="h-8 w-auto mr-2" />
            <span className="font-bold text-xl">SCE Foundation</span>
          </Link>

          {isMobile ? (
            <>
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-sce-primary">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              
              {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-sce-secondary py-4 px-4 shadow-md">
                  <nav className="flex flex-col space-y-2">
                    <Link to="/" className="px-3 py-2 hover:bg-sce-primary rounded-md" onClick={toggleMenu}>Главная</Link>
                    <Link to="/objects" className="px-3 py-2 hover:bg-sce-primary rounded-md" onClick={toggleMenu}>Объекты</Link>
                    <Link to="/posts" className="px-3 py-2 hover:bg-sce-primary rounded-md" onClick={toggleMenu}>Публикации</Link>
                    <Link to="/about" className="px-3 py-2 hover:bg-sce-primary rounded-md" onClick={toggleMenu}>О нас</Link>
                    <Link to="/login" className="px-3 py-2 bg-sce-primary hover:bg-opacity-80 rounded-md text-center" onClick={toggleMenu}>Войти</Link>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6">
                <Link to="/" className="hover:text-sce-accent transition-colors">Главная</Link>
                <Link to="/objects" className="hover:text-sce-accent transition-colors">Объекты</Link>
                <Link to="/posts" className="hover:text-sce-accent transition-colors">Публикации</Link>
                <Link to="/about" className="hover:text-sce-accent transition-colors">О нас</Link>
              </nav>
              <Link to="/login">
                <Button variant="primary" className="bg-sce-primary hover:bg-opacity-80">Войти</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
