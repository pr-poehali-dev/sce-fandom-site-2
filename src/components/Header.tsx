import { Link } from 'react-router-dom';
import { User, LockKeyhole, Book, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/lib/auth';
import { useState } from 'react';

const Header = () => {
  const currentUser = authService.getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <header>
      <div className="sce-header">
        <div className="sce-container">
          <h1 className="sce-logo">SCE FOUNDATION</h1>
          <p className="text-sm md:text-base mt-1">Secure. Control. Explore.</p>
        </div>
      </div>
      
      <nav className="sce-nav">
        <div className="sce-container">
          <div className="sce-nav-container">
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-medium hover:underline">Главная</Link>
              <Link to="/objects" className="font-medium hover:underline">Объекты SCE</Link>
              <Link to="/posts" className="font-medium hover:underline">Материалы</Link>
              <Link to="/about" className="font-medium hover:underline">О Фонде</Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <span className="text-sm">{currentUser.username}</span>
                  {currentUser.role === 'admin' && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="bg-amber-700 hover:bg-amber-800 border-none text-white">
                        <LockKeyhole className="h-4 w-4 mr-1" />
                        Управление
                      </Button>
                    </Link>
                  )}
                  <Link to="/profile">
                    <Button variant="outline" size="sm" className="border-white hover:bg-white/20">
                      <User className="h-4 w-4 mr-1" />
                      Профиль
                    </Button>
                  </Link>
                  <Link to="/logout">
                    <Button variant="outline" size="sm" className="border-white hover:bg-white/20">
                      Выйти
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="border-white hover:bg-white/20">
                      Вход
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="sm" className="border-white hover:bg-white/20">
                      Регистрация
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Мобильное меню */}
            <div className="md:hidden flex justify-end w-full">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                className="text-white"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          
          {/* Мобильная навигация */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-700 py-2">
              <div className="flex flex-col space-y-2 px-4 py-2">
                <Link to="/" className="py-2 hover:underline" onClick={toggleMenu}>Главная</Link>
                <Link to="/objects" className="py-2 hover:underline" onClick={toggleMenu}>Объекты SCE</Link>
                <Link to="/posts" className="py-2 hover:underline" onClick={toggleMenu}>Материалы</Link>
                <Link to="/about" className="py-2 hover:underline" onClick={toggleMenu}>О Фонде</Link>
                
                <div className="border-t border-gray-700 pt-2 mt-2">
                  {currentUser ? (
                    <>
                      <div className="text-sm py-1">{currentUser.username}</div>
                      {currentUser.role === 'admin' && (
                        <Link to="/admin" onClick={toggleMenu}>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-amber-700 hover:bg-amber-800 border-none text-white my-1">
                            <LockKeyhole className="h-4 w-4 mr-2" />
                            Управление
                          </Button>
                        </Link>
                      )}
                      <Link to="/profile" onClick={toggleMenu}>
                        <Button variant="outline" size="sm" className="w-full justify-start border-white hover:bg-white/20 my-1">
                          <User className="h-4 w-4 mr-2" />
                          Профиль
                        </Button>
                      </Link>
                      <Link to="/logout" onClick={toggleMenu}>
                        <Button variant="outline" size="sm" className="w-full justify-start border-white hover:bg-white/20 my-1">
                          Выйти
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={toggleMenu}>
                        <Button variant="outline" size="sm" className="w-full justify-start border-white hover:bg-white/20 my-1">
                          Вход
                        </Button>
                      </Link>
                      <Link to="/register" onClick={toggleMenu}>
                        <Button variant="outline" size="sm" className="w-full justify-start border-white hover:bg-white/20 my-1">
                          Регистрация
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
