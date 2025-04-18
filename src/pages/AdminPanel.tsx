import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/lib/auth';
import { database } from '@/lib/database';
import { FileText, FileOutput, User, ShieldAlert } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Получаем статистику
  const objectsCount = database.getSCEObjects().length;
  const postsCount = database.getPosts().length;
  
  useEffect(() => {
    // Проверяем, является ли пользователь администратором
    if (!authService.isAdmin()) {
      toast({
        variant: 'destructive',
        title: 'Доступ запрещен',
        description: 'У вас нет прав для доступа к панели администратора.'
      });
      navigate('/');
    }
  }, [navigate, toast]);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Панель администратора</h1>
          <p className="text-muted-foreground">
            Управление объектами SCE, материалами и пользователями фонда.
          </p>
        </div>
        
        {/* Карточки статистики */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-medium">Объекты SCE</CardTitle>
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{objectsCount}</div>
              <CardDescription>Аномальных объектов в базе данных</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-medium">Материалы</CardTitle>
              <FileText className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{postsCount}</div>
              <CardDescription>Опубликованных материалов</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-medium">Пользователи</CardTitle>
              <User className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1</div>
              <CardDescription>Зарегистрированный администратор</CardDescription>
            </CardContent>
          </Card>
        </div>
        
        {/* Управление объектами */}
        <Card>
          <CardHeader>
            <CardTitle>Управление объектами SCE</CardTitle>
            <CardDescription>Создание, редактирование и удаление объектов SCE</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/admin/objects/new">Создать новый объект</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/objects">Просмотреть все объекты</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Управление материалами */}
        <Card>
          <CardHeader>
            <CardTitle>Управление материалами</CardTitle>
            <CardDescription>Создание, редактирование и удаление материалов</CardDescription>
          </CardHeader>
          <Car
dContent className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/admin/posts/new">Создать новый материал</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/posts">Просмотреть все материалы</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminPanel;
