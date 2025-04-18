import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="sce-footer">
      <div className="sce-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6">
          <div>
            <h3 className="text-lg font-bold mb-3">SCE Foundation</h3>
            <p className="text-sm text-gray-300">
              Фонд SCE — организация, занимающаяся обнаружением, задержанием и изучением аномальных объектов и явлений.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Главная</Link></li>
              <li><Link to="/objects" className="hover:underline">Объекты SCE</Link></li>
              <li><Link to="/posts" className="hover:underline">Материалы</Link></li>
              <li><Link to="/about" className="hover:underline">О Фонде</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Правовая информация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:underline">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="hover:underline">Условия использования</Link></li>
              <li><Link to="/disclaimer" className="hover:underline">Отказ от ответственности</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-sm text-center">
          <p>© {currentYear} SCE Foundation. Все материалы являются вымышленными.</p>
          <p className="mt-2 text-gray-400">
            Secure. Control. Explore.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
