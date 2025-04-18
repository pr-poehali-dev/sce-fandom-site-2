import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/lib/auth';

const LogoutPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Выполняем выход
    authService.logout();
    
    // Показываем уведомление
    toast({
      title: 'Выход выполнен',
      description: 'Вы успешно вышли из системы'
    });
  }, [toast]);
  
  // Перенаправляем на главную страницу
  return <Navigate to="/" replace />;
};

export default LogoutPage;
