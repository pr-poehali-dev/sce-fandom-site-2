import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { database } from '@/lib/database';
import { authService } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';

// Схема валидации формы объекта SCE
const sceObjectSchema = z.object({
  title: z.string().min(1, 'Требуется название объекта'),
  objectNumber: z.string().min(1, 'Требуется номер объекта').regex(/^SCE-\d{3,4}$/, 'Номер должен быть в формате SCE-XXX или SCE-XXXX'),
  objectClass: z.enum(['безопасный', 'евклид', 'кетер', 'таумиэль', 'нейтрализованный']),
  containmentProcedures: z.string().min(10, 'Процедуры содержания должны содержать не менее 10 символов'),
  description: z.string().min(10, 'Описание должно содержать не менее 10 символов'),
  additionalInfo: z.string().optional()
});

type SCEObjectFormValues = z.infer<typeof sceObjectSchema>;

const AdminSCEObjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  const form = useForm<SCEObjectFormValues>({
    resolver: zodResolver(sceObjectSchema),
    defaultValues: {
      title: '',
      objectNumber: 'SCE-',
      objectClass: 'безопасный',
      containmentProcedures: '',
      description: '',
      additionalInfo: ''
    }
  });
  
  useEffect(() => {
    // Проверяем, является ли пользователь администратором
    if (!authService.isAdmin()) {
      toast({
        variant: 'destructive',
        title: 'Доступ запрещен',
        description: 'У вас нет прав для доступа к этой странице.'
      });
      navigate('/');
      return;
    }
    
    // Если режим редактирования, загружаем данные объекта
    if (isEditMode && id) {
      const object = database.getSCEObjectById(id);
      
      if (object) {
        form.reset({
          title: object.title,
          objectNumber: object.objectNumber,
          objectClass: object.objectClass,
          containmentProcedures: object.containmentProcedures,
          description: object.description,
          additionalInfo: object.additionalInfo || ''
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Объект не найден',
          description: 'Запрашиваемый объект не существует или был удален.'
        });
        navigate('/admin');
      }
    }
    
    setLoading(false);
  }, [id, isEditMode, navigate, form, toast]);
  
  const onSubmit = (values: SCEObjectFormValues) => {
    try {
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        toast({
          variant: 'destructive',
          title: 'Ошибка аутентификации',
          description: 'Необходимо войти в систему для выполнения этой операции.'
        });
        return;
      }
      
      if (isEditMode && id) {
        // Обновляем существующий объект
        const updated = database.updateSCEObject(id, values);
        
        if (updated) {
          toast({
            title: 'Объект обновлен',
            description: `Объект ${values.objectNumber} успешно обновлен.`
          });
          navigate(`/objects/${values.objectNumber}`);
        } else {
          toast({
            variant: 'destructive',
            title: 'Ошибка',
            description: 'Не удалось обновить объект. Попробуйте еще раз.'
          });
        }
      } else {
        // Проверяем, существует ли объект с таким номером
        const existingObject = database.getSCEObjectByNumber(values.objectNumber);
        
        if (existingObject) {
          toast({
            variant: 'destructive',
            title: 'Номер занят',
            description: `Объект с номером ${values.objectNumber} уже существует.`
          });
          return;
        }
        
        // Создаем новый объект
        const newObject = database.createSCEObject({
          ...values,
          createdBy: currentUser.id
        });
        
        toast({
          title: 'Объект создан',
          description: `Объект ${newObject.objectNumber} успешно создан.`
        });
        
        navigate(`/objects/${newObject.objectNumber}`);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Произошла ошибка при сохранении объекта. Попробуйте еще раз.'
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
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
          
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Редактирование объекта SCE' : 'Создание нового объекта SCE'}
          </h1>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="objectNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер объекта</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="SCE-XXX" 
                        disabled={isEditMode} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="objectClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Класс объекта</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите класс объекта" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="безопасный">Безопасный</SelectItem>
                        <SelectItem value="евклид">Евклид</SelectItem>
                        <SelectItem value="кетер">Кетер</SelectItem>
                        <SelectItem value="таумиэль">Таумиэль</SelectItem>
                        <SelectItem value="нейтрализованный">Нейтрализованный</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название объекта</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите название объекта" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="containmentProcedures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Процедуры содержания</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Опишите процедуры содержания объекта" 
                      className="min-h-[150px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Опишите объект" 
                      className="min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дополнительная информация (необязательно)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Введите дополнительную информацию об объекте" 
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit">
                {isEditMode ? 'Сохранить изменения' : 'Создать объект'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default AdminSCEObjectForm;
