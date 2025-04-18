import { User } from './types';

// Имитация хранилища пользователей
const usersStorage = {
  users: [] as User[],
  pendingVerifications: {} as Record<string, { email: string; username: string; password: string }>,
  
  // Проверка первого пользователя
  isFirstUser() {
    return this.users.length === 0;
  },
  
  // Регистрация пользователя
  registerUser(email: string, username: string, password: string): string {
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.pendingVerifications[verificationCode] = { email, username, password };
    
    // В реальном приложении здесь был бы код для отправки email
    console.log(`Verification code for ${email}: ${verificationCode}`);
    
    return verificationCode;
  },
  
  // Подтверждение регистрации
  verifyRegistration(code: string): User | null {
    if (!this.pendingVerifications[code]) {
      return null;
    }
    
    const { email, username, password } = this.pendingVerifications[code];
    delete this.pendingVerifications[code];
    
    const isFirstUser = this.isFirstUser();
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      role: isFirstUser ? 'admin' : 'reader',
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    
    // В реальном приложении сохраняли бы хешированный пароль
    localStorage.setItem(`user_password_${newUser.id}`, password);
    
    return newUser;
  },
  
  // Вход пользователя
  loginUser(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email);
    if (!user) return null;
    
    const storedPassword = localStorage.getItem(`user_password_${user.id}`);
    if (storedPassword !== password) return null;
    
    return user;
  },
  
  // Получение текущего пользователя из local storage
  getCurrentUser(): User | null {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) return null;
    
    return this.users.find(u => u.id === userId) || null;
  },
  
  // Установка текущего пользователя
  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem('currentUserId', user.id);
    } else {
      localStorage.removeItem('currentUserId');
    }
  }
};

// Экспорт сервиса аутентификации
export const authService = {
  register: (email: string, username: string, password: string) => 
    usersStorage.registerUser(email, username, password),
    
  verify: (code: string) => {
    const user = usersStorage.verifyRegistration(code);
    if (user) {
      usersStorage.setCurrentUser(user);
    }
    return user;
  },
  
  login: (email: string, password: string) => {
    const user = usersStorage.loginUser(email, password);
    if (user) {
      usersStorage.setCurrentUser(user);
    }
    return user;
  },
  
  logout: () => {
    usersStorage.setCurrentUser(null);
  },
  
  getCurrentUser: () => usersStorage.getCurrentUser(),
  
  isAdmin: () => {
    const user = usersStorage.getCurrentUser();
    return user?.role === 'admin';
  },
  
  isFirstUser: () => usersStorage.isFirstUser()
};
