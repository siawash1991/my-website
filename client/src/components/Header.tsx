import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, dir } = useLanguage();
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConsultationClick = () => {
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        const element = document.getElementById("consultation");
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById("consultation");
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t.nav.home, path: "/", type: "link" as const },
    { label: t.nav.news, path: "/news", type: "link" as const },
    { label: t.nav.podcasts, path: "/podcasts", type: "link" as const },
    { label: t.nav.startups, path: "/startups", type: "link" as const }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl md:text-2xl font-bold hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 transition-colors" data-testid="button-logo">
            Siavash
          </Link>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} asChild>
                <Button
                  variant={location === item.path ? "default" : "ghost"}
                  data-testid={`button-nav-${item.path.slice(1) || "home"}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={handleConsultationClick}
              data-testid="button-nav-consultation"
            >
              {t.nav.consultation}
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "en" ? "fa" : "en")}
              data-testid="button-language-toggle"
            >
              <Globe className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t" data-testid="nav-mobile">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} asChild>
                <Button
                  variant={location === item.path ? "default" : "ghost"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full justify-${dir === "rtl" ? "end" : "start"}`}
                  data-testid={`button-mobile-nav-${item.path.slice(1) || "home"}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={handleConsultationClick}
              className={`w-full justify-${dir === "rtl" ? "end" : "start"}`}
              data-testid="button-mobile-nav-consultation"
            >
              {t.nav.consultation}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
