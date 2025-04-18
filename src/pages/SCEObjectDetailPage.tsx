import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { SCEObject } from '@/lib/types';
import { database } from '@/lib/database';
import { authService } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';

const getClassColor = (objectClass: SCEObject['objectClass']) => {
  switch (objectClass) {
    case 'безопасный':
      return 'bg-green-600';
    case 'евклид':
      return 'bg-yellow-600';
    case 'кетер':
      return 'bg-red-600';
    case 'таумиэль':
      return 'bg-purple-600';
    case 'нейтрализованный':
      return 'bg-gray-600';
    default:
      return 'bg-blue-600';
  }
};

const SCEObjectDetailPage = () => {
  const { objectNumber } = useParams<{ objectNumber: string }>();
  const [object, setObject] = useState<SCEObject | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAdmin = authService.isAdmin();
  
  useEffect(() => {
    if (!objectNumber) return;
    
    // Загружаем объект по номеру
    const sceObject = database.getSCEObjectByNumber(objectNumber);
    
    setObject(sceObject || null);
    setLoading(false);
  }, [objectNumber]);
  
  const handleDelete = () => {
    if (!object || !confirm('Вы уверены, что хотите удалить этот объект? Это действие нельзя отменить.')) {
      return;
    }
    
    const deleted = database.deleteSCEObject(object.id);
    
    if (deleted) {
      toast({
        title: 'Объект удален',
        description: `Объект ${object.objectNumber} успешно удален.`
      });
      navigate('/objects');
    } else {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось удалить объект. Попробуйте еще раз.'
      });
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <p>Загрузка...</p>
        </div>
      </Layout>
    );
  }
  
  if (!object) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Объект не найден</h1>
          <p className="mb-6">Объект с номером {objectNumber} не существует или был удален.</p>
          <Button asChild>
            <a href="/objects">Вернуться к списку объектов</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const classColor = getClassColor(object.objectClass);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/objects')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Назад к списку
          </Button>
          
          {isAdmin && (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/admin/objects/edit/${object.id}`)}>
                <Edit className="h-4 w-4 mr-1" />
                Редактировать
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                Удалить
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{object.objectNumber}: {object.title}</h1>
            <Badge className={`${classColor} capitalize text-white`}>
              {object.objectClass}
            </Badge>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-4">Процедуры содержания</h2>
              <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                {object.containmentProcedures}
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-bold mb-4">Описание</h2>
              <div className="whitespace-pre-line">
                {object.description}
              </div>
            </section>
            
            {object.additionalInfo && (
              <>
                <Separator />
                
                <section>
                  <h2 className="text-xl font-bold mb-4">Дополнительная информация</h2>
                  <div className="whitespace-pre-line">
                    {object.additionalInfo}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SCEObjectDetailPage;
