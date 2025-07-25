import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TrialSignup from "./pages/TrialSignup";
import DietPlan from "./pages/DietPlan";
import WhatsAppFloat from "./components/WhatsAppFloat";
import AIChat from "./components/AIChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trial-signup" element={<TrialSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diet-plan" element={<DietPlan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloat />
        <AIChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
