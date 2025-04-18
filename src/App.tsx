
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SCEObjectsPage from "./pages/SCEObjectsPage";
import SCEObjectDetailPage from "./pages/SCEObjectDetailPage";
import AdminPanel from "./pages/AdminPanel";
import AdminSCEObjectForm from "./pages/AdminSCEObjectForm";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/objects" element={<SCEObjectsPage />} />
          <Route path="/objects/:objectNumber" element={<SCEObjectDetailPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/objects/new" element={<AdminSCEObjectForm />} />
          <Route path="/admin/objects/edit/:id" element={<AdminSCEObjectForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
