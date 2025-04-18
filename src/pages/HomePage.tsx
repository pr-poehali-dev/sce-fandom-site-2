import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { database } from '@/lib/database';
import { SCEObject, Post } from '@/lib/types';
import SCEObjectCard from '@/components/SCEObjectCard';
import PostCard from '@/components/PostCard';

const HomePage = () => {
  const [recentObjects, setRecentObjects] = useState<SCEObject[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Получаем последние объекты SCE и посты
    const objects = database.getSCEObjects().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 3);
    
    const posts = database.getPosts().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 3);
    
    setRecentObjects(objects);
    setRecentPosts(posts);
  }, []);
  
  return (
    <Layout>
      <div className="space-y-10">
        {/* Героический баннер */}
        <section className="bg-sce-primary text-white rounded-md p-6 md:p-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">SCE Foundation</h1>
            <p className="text-lg mb-6">
              Фонд SCE — организация, созданная для обнаружения, задержания и изучения аномальных объектов и явлений, 
              которые представляют серьезную угрозу для безопасности человечества.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-sce-primary hover:bg-gray-100">
                <Link to="/objects">Объекты SCE</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/about">О Фонде</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Секция: Что такое SCE Foundation */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Что такое SCE Foundation?</h2>
            <div className="w-20 h-1 bg-sce-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <span className="text-2xl">🔒</span> Secure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Мы обеспечиваем безопасное содержание аномальных объектов, предотвращая их воздействие на мир.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <span className="text-2xl">🔍</span> Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Контроль над аномалиями позволяет нам минимизировать риски и предотвращать катастрофы.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <span className="text-2xl">🔬</span> Explore
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Исследование аномалий расширяет наши знания о мире и возможности человечества.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Последние объекты SCE */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Последние объекты SCE</h2>
            <Button asChild variant="outline">
              <Link to="/objects">Все объекты</Link>
            </Button>
          </div>
          
          {recentObjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentObjects.map(object => (
                <SCEObjectCard key={object.id} object={object} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="mb-4">Пока нет объектов SCE в базе данных.</p>
                <Button asChild>
                  <Link to="/admin/objects/new">Создать первый объект</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
        
        {/* Последние материалы */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Последние материалы</h2>
            <Button asChild variant="outline">
              <Link to="/posts">Все материалы</Link>
            </Button>
          </div>
          
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="mb-4">Пока нет материалов в базе данных.</p>
                <Button asChild>
                  <Link to="/admin/posts/new">Создать первый материал</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
