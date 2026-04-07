import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Syllabus from "./pages/Syllabus";
import Assessment from "./pages/Assessment";
import KeyTerms from "./pages/KeyTerms";
import ExamPrepVideos from "./pages/ExamPrepVideos";
import LearnModules from "./pages/LearnModules";
import Pricing from "./pages/Pricing";
import Troubleshooting from "./pages/Troubleshooting";
import ExamScenarios from "./pages/ExamScenarios";
import DecisionFramework from "./pages/DecisionFramework";
import YouTubePlaylists from "./pages/YouTubePlaylists";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import PracticeSets from "./pages/PracticeSets";
import Badges from "./pages/Badges";

const queryClient = new QueryClient();

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <Layout>{children}</Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/Dashboard" element={<LayoutWrapper><Dashboard /></LayoutWrapper>} />
            <Route path="/Syllabus" element={<LayoutWrapper><Syllabus /></LayoutWrapper>} />
            <Route path="/Assessment" element={<LayoutWrapper><Assessment /></LayoutWrapper>} />
            <Route path="/KeyTerms" element={<LayoutWrapper><KeyTerms /></LayoutWrapper>} />
            <Route path="/ExamPrepVideos" element={<LayoutWrapper><ExamPrepVideos /></LayoutWrapper>} />
            <Route path="/LearnModules" element={<LayoutWrapper><LearnModules /></LayoutWrapper>} />
            <Route path="/Pricing" element={<LayoutWrapper><Pricing /></LayoutWrapper>} />
            <Route path="/Troubleshooting" element={<LayoutWrapper><Troubleshooting /></LayoutWrapper>} />
            <Route path="/ExamScenarios" element={<LayoutWrapper><ExamScenarios /></LayoutWrapper>} />
            <Route path="/DecisionFramework" element={<LayoutWrapper><DecisionFramework /></LayoutWrapper>} />
            <Route path="/YouTubePlaylists" element={<LayoutWrapper><YouTubePlaylists /></LayoutWrapper>} />
            <Route path="/PracticeSets" element={<LayoutWrapper><PracticeSets /></LayoutWrapper>} />
            <Route path="/Badges" element={<LayoutWrapper><Badges /></LayoutWrapper>} />
            <Route path="/Admin" element={<LayoutWrapper><Admin /></LayoutWrapper>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
