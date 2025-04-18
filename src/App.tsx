import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import LogoutPage from '@/pages/LogoutPage';
import NotFound from '@/pages/NotFound';
import AdminPanel from '@/pages/AdminPanel';
import SCEObjectsPage from '@/pages/SCEObjectsPage';
import SCEObjectDetailPage from '@/pages/SCEObjectDetailPage';
import AdminSCEObjectForm from '@/pages/AdminSCEObjectForm';
import PrivacyPage from '@/pages/PrivacyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/objects/new" element={<AdminSCEObjectForm />} />
        <Route path="/admin/objects/:id/edit" element={<AdminSCEObjectForm />} />
        <Route path="/objects" element={<SCEObjectsPage />} />
        <Route path="/objects/:id" element={<SCEObjectDetailPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
