import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/lib/protected-route";
import Header from "@/components/Header";
import AdminLayout from "@/components/admin-layout";
import Home from "@/pages/home";
import NewsPage from "@/pages/news";
import PodcastsPage from "@/pages/podcasts";
import StartupsPage from "@/pages/startups";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminPosts from "@/pages/admin/posts";
import AdminPodcasts from "@/pages/admin/podcasts";
import AdminStartups from "@/pages/admin/startups";
import NotFound from "@/pages/not-found";

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/posts" component={AdminPosts} />
        <Route path="/admin/podcasts" component={AdminPodcasts} />
        <Route path="/admin/startups" component={AdminStartups} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/admin/:rest*" component={AdminRoutes} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/">
        {() => (
          <PublicLayout>
            <Home />
          </PublicLayout>
        )}
      </Route>
      <Route path="/news">
        {() => (
          <PublicLayout>
            <NewsPage />
          </PublicLayout>
        )}
      </Route>
      <Route path="/podcasts">
        {() => (
          <PublicLayout>
            <PodcastsPage />
          </PublicLayout>
        )}
      </Route>
      <Route path="/startups">
        {() => (
          <PublicLayout>
            <StartupsPage />
          </PublicLayout>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Toaster />
              <Router />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
