import { useState } from 'react';
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

// Схема валидации формы регистрации
const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  username: z.string().min(3, 'Имя пользователя должно содержать не менее 3 символов'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword']
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [registrationData, setRegistrationData] = useState<RegisterFormValues | null>(null);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });
  
  const onSubmit = (values: RegisterFormValues) => {
    try {
      // Сохраняем данные формы для последующего использования
      setRegistrationData(values);
      
      // Имитируем отправку кода подтверждения
      const code = authService.register(values.email, values.username, values.password);
      
      // Показываем форму ввода кода подтверждения
      setVerificationSent(true);
      
      toast({
        title: 'Код подтверждения отправлен',
        description: 'Проверьте электронную почту для подтверждения регистрации.',
      });
      
      // В реальном приложении здесь была бы отправка email
      // Для демонстрации выводим код в консоль
      console.log(`Verification code: ${code}`);
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка регистрации',
        description: 'Не удалось зарегистрировать пользователя. Попробуйте еще раз.',
      });
    }
  };
  
  const verifyCode = () => {
    if (!registrationData) return;
    
    try {
      // Подтверждаем регистрацию с кодом
      const user = authService.verify(verificationCode);
      
      if (user) {
        toast({
          title: 'Регистрация успешна',
          description: `Добро пожаловать, ${user.username}!`
        });
        
        if (user.role === 'admin') {
          toast({
            title: 'Вы администратор',
            description: 'Вам были предоставлены права администратора как первому зарегистрированному пользователю.'
          });
        }
        
        // Перенаправляем на главную страницу
        navigate('/');
      } else {
        toast({
          variant: 'destructive',
          title: 'Неверный код',
          description: 'Введен неверный код подтверждения. Пожалуйста, проверьте и попробуйте снова.'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка подтверждения',
        description: 'Не удалось подтвердить регистрацию. Попробуйте еще раз.'
      });
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
        
        {!verificationSent ? (
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя пользователя</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подтверждение пароля</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Зарегистрироваться</Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              Мы отправили код подтверждения на адрес {registrationData?.email}. 
              Пожалуйста, введите полученный код ниже для завершения регистрации.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="verification-code" className="block text-sm font-medium mb-1">
                  Код подтверждения
                </label>
                <Input
                  id="verification-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                  placeholder="Введите код"
                  className="uppercase"
                  maxLength={6}
                />
              </div>
              
              <Button onClick={verifyCode} className="w-full" disabled={!verificationCode}>
                Подтвердить
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegisterPage;
