import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <Layout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-4">О Фонде SCE</h1>
          <Separator className="my-4" />
          <p className="text-lg">
            Фонд SCE (Secure, Control, Explore) — секретная организация, занимающаяся обнаружением, 
            задержанием и изучением аномальных объектов и явлений, которые представляют угрозу для человечества.
          </p>
        </div>
        
        <section>
          <h2 className="text-2xl font-bold mb-2">Миссия фонда</h2>
          <p className="mb-4">
            Миссия Фонда SCE состоит из трех основных принципов:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Secure (Охранять)</strong> — Обеспечение безопасного хранения и содержания аномальных объектов, 
              предотвращение их воздействия на обычный мир и защита человечества от потенциальных угроз.
            </li>
            <li>
              <strong>Control (Контролировать)</strong> — Контроль за аномальными явлениями, их мониторинг и управление,
              ограничение распространения информации об их существовании для предотвращения массовой паники.
            </li>
            <li>
              <strong>Explore (Исследовать)</strong> — Изучение аномальных объектов и явлений для расширения 
              научных знаний, понимания их происхождения, свойств и потенциального применения во благо человечества.
            </li>
          </ul>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-bold mb-2">Структура фонда</h2>
          <p className="mb-4">
            Фонд SCE имеет сложную иерархическую структуру, включающую различные департаменты и уровни доступа:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Совет O5</strong> — Высший руководящий орган, осуществляющий общее управление деятельностью Фонда.
            </li>
            <li>
              <strong>Администрация</strong> — Занимается повседневным управлением объектами и персоналом.
            </li>
            <li>
              <strong>Научный департамент</strong> — Ответственен за изучение аномальных объектов и разработку технологий.
            </li>
            <li>
              <strong>Отдел безопасности</strong> — Обеспечивает защиту объектов и персонала, предотвращает утечки данных.
            </li>
            <li>
              <strong>Полевые агенты</strong> — Обнаруживают новые аномалии и осуществляют их первичное сдерживание.
            </li>
            <li>
              <strong>Класс D</strong> — Персонал для опасных экспериментов и взаимодействия с особо опасными аномалиями.
            </li>
          </ul>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-bold mb-2">Классификация объектов</h2>
          <p className="mb-4">
            Фонд SCE классифицирует аномальные объекты по уровням опасности и сложности содержания:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Безопасный</strong> — Объекты, которые могут быть надежно и безопасно содержаться без особых 
              мер предосторожности, при соблюдении стандартных процедур.
            </li>
            <li>
              <strong>Евклид</strong> — Объекты, требующие специальных мер содержания и представляющие умеренную угрозу. 
              Их поведение не всегда предсказуемо.
            </li>
            <li>
              <strong>Кетер</strong> — Крайне опасные объекты, трудные для содержания или почти не поддающиеся 
              содержанию, представляющие высокую угрозу для человечества.
            </li>
            <li>
              <strong>Таумиэль</strong> — Редкие объекты, используемые Фондом для содержания или противодействия 
              другим опасным аномалиям. Информация о них строго засекречена.
            </li>
            <li>
              <strong>Нейтрализованный</strong> — Объекты, которые больше не проявляют аномальных свойств или были уничтожены.
            </li>
          </ul>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-bold mb-2">Правила доступа к информации</h2>
          <p className="mb-4">
            Доступ к информации о деятельности Фонда SCE и аномальных объектах строго регламентирован:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              Вся информация распределяется по уровням допуска, от 1 (базовая информация) до 5 (сверхсекретная).
            </li>
            <li>
              Доступ к информации об объектах предоставляется только по принципу "необходимо знать".
            </li>
            <li>
              Несанкционированное распространение информации о деятельности Фонда или аномальных объектах 
              строго запрещено и преследуется.
            </li>
            <li>
              Ознакомление с содержимым этого сайта означает ваше согласие с правилами Фонда и принятие 
              ответственности за сохранение секретности.
            </li>
          </ul>
        </section>
        
        <div className="mt-8 p-6 bg-red-100 border-l-4 border-red-600 rounded-sm dark:bg-red-950 dark:border-red-800">
          <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">ПРЕДУПРЕЖДЕНИЕ</h3>
          <p className="text-red-700 dark:text-red-300">
            Все материалы на этом сайте представляют собой вымышленные сценарии и объекты в рамках фандома SCE Foundation. 
            Любое сходство с реальными людьми, организациями, событиями или явлениями является случайным.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
