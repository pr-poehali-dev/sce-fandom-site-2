import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { authService } from '@/lib/auth';

// Схема валидации формы входа
const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(1, 'Введите пароль')
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onSubmit = (values: LoginFormValues) => {
    try {
      const user = authService.login(values.email, values.password);
      
      if (user) {
        toast({
          title: 'Успешный вход',
          description: `Добро пожаловать, ${user.username}!`
        });
        
        // Перенаправляем на главную страницу
        navigate('/');
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка входа',
          description: 'Неверный email или пароль. Пожалуйста, проверьте данные и попробуйте снова.'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка входа',
        description: 'Произошла ошибка при попытке входа. Пожалуйста, попробуйте позже.'
      });
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Вход в систему</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">Войти</Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default LoginPage;
