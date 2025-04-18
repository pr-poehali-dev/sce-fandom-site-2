import { useState } from 'react';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Временные данные для постов
const POSTS_DATA = [
  {
    id: 1,
    title: 'Новый протокол сдерживания SCE-789 успешно внедрен',
    excerpt: 'Благодаря усилиям отдела исследований был разработан усовершенствованный протокол сдерживания для объекта класса Евклид.',
    date: '2024-10-14',
    author: 'Д-р Маркин',
    category: 'Исследования',
    imageUrl: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Экспедиция в зону №14 завершилась успешно',
    excerpt: 'Группа разведки вернулась с ценными данными и образцами из ранее необследованной зоны проявления аномальной активности.',
    date: '2024-10-10',
    author: 'Агент Семенов',
    category: 'Операции',
    imageUrl: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Фонд SCE объявляет о международном сотрудничестве',
    excerpt: 'Подписано соглашение о взаимодействии с иностранными организациями в области контроля аномальных явлений.',
    date: '2024-10-05',
    author: 'Администрация',
    category: 'Объявления',
    imageUrl: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Результаты исследования объекта SCE-432',
    excerpt: 'Продолжительное исследование выявило новые свойства объекта, требующие пересмотра класса опасности.',
    date: '2024-09-29',
    author: 'Д-р Володина',
    category: 'Исследования',
    imageUrl: '/placeholder.svg'
  },
  {
    id: 5,
    title: 'Ежегодная конференция Фонда SCE',
    excerpt: 'В октябре состоится закрытая конференция с участием ведущих специалистов Фонда по вопросам сдерживания объектов класса Кетер.',
    date: '2024-09-20',
    author: 'Администрация',
    category: 'События',
    imageUrl: '/placeholder.svg'
  },
  {
    id: 6,
    title: 'Нарушение протокола в Секторе-12',
    excerpt: 'Вследствие технической неисправности произошло кратковременное нарушение протокола сдерживания. Ситуация стабилизирована.',
    date: '2024-09-15',
    author: 'Служба безопасности',
    category: 'Происшествия',
    imageUrl: '/placeholder.svg'
  }
];

// Категории для фильтрации
const CATEGORIES = ['Все', 'Исследования', 'Операции', 'Объявления', 'События', 'Происшествия'];

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  // Фильтрация постов по поисковому запросу и категории
  const filteredPosts = POSTS_DATA.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Публикации Фонда SCE</h1>
        <Separator className="mb-8" />

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Поиск публикаций..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <Tabs defaultValue="Все" value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="w-full overflow-x-auto justify-start flex-wrap">
                {CATEGORIES.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Публикации не найдены</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Все');
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostsPage;
