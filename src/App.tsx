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
import MyList from "./pages/MyList";
import Account from "./pages/Account";
import Flashcards from "./pages/Flashcards";
import Cheatsheets from "./pages/Cheatsheets";
import DosAndDonts from "./pages/DosAndDonts";
import ExamChecklist from "./pages/ExamChecklist";
import DAXTemplates from "./pages/DAXTemplates";
import Reviews from "./pages/Reviews";
import StudyPlan from "./pages/StudyPlan";
import InteractiveLessons from "./pages/InteractiveLessons";
import SyllabusAudit from "./pages/SyllabusAudit";

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
            <Route path="/MyList" element={<LayoutWrapper><MyList /></LayoutWrapper>} />
            <Route path="/Account" element={<LayoutWrapper><Account /></LayoutWrapper>} />
            <Route path="/Flashcards" element={<LayoutWrapper><Flashcards /></LayoutWrapper>} />
            <Route path="/Cheatsheets" element={<LayoutWrapper><Cheatsheets /></LayoutWrapper>} />
            <Route path="/DosAndDonts" element={<LayoutWrapper><DosAndDonts /></LayoutWrapper>} />
            <Route path="/ExamChecklist" element={<LayoutWrapper><ExamChecklist /></LayoutWrapper>} />
            <Route path="/DAXTemplates" element={<LayoutWrapper><DAXTemplates /></LayoutWrapper>} />
            <Route path="/Reviews" element={<LayoutWrapper><Reviews /></LayoutWrapper>} />
            <Route path="/StudyPlan" element={<LayoutWrapper><StudyPlan /></LayoutWrapper>} />
            <Route path="/InteractiveLessons" element={<LayoutWrapper><InteractiveLessons /></LayoutWrapper>} />
            <Route path="/Admin" element={<LayoutWrapper><Admin /></LayoutWrapper>} />
            <Route path="/SyllabusAudit" element={<LayoutWrapper><SyllabusAudit /></LayoutWrapper>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
