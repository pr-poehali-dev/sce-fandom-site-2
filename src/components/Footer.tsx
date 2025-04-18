import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-sce-secondary text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О фонде SCE</h3>
            <p className="text-sm text-gray-300">
              Фонд по сдерживанию, содержанию и исследованию аномальных объектов, представляющих угрозу человечеству.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/objects" className="hover:text-white transition-colors">Объекты</Link></li>
              <li><Link to="/posts" className="hover:text-white transition-colors">Публикации</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">О нас</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Телефон: [ДАННЫЕ УДАЛЕНЫ]</li>
              <li>Email: info@sce-foundation.org</li>
              <li>Адрес: [ДАННЫЕ УДАЛЕНЫ]</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Условия использования</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>© {year} Фонд SCE. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
