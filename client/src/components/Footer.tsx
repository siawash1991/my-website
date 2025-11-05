import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiX, SiLinkedin, SiGithub } from "react-icons/si";

export default function Footer() {
  const { t, dir } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { label: t.nav.home, id: "hero" },
    { label: t.nav.news, id: "news" },
    { label: t.nav.podcasts, id: "podcasts" },
    { label: t.nav.startups, id: "startups" },
  ];

  return (
    <footer className="bg-muted/30 border-t" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4" data-testid="text-footer-brand">Siavash</h3>
            <p className="text-muted-foreground" data-testid="text-footer-tagline">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-links-title">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block text-muted-foreground hover:text-foreground transition-colors text-${dir === "rtl" ? "right" : "left"}`}
                  data-testid={`link-footer-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-connect-title">{t.footer.connect}</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-twitter"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-github"
              >
                <SiGithub className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2" data-testid="text-newsletter-title">{t.footer.newsletter}</h5>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t.footer.newsletterPlaceholder}
                  data-testid="input-newsletter"
                />
                <Button
                  onClick={() => console.log("Newsletter subscription")}
                  data-testid="button-subscribe"
                >
                  {t.footer.subscribe}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            © {new Date().getFullYear()} Siavash. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <button className="hover:text-foreground transition-colors" data-testid="link-privacy">
              {t.footer.privacy}
            </button>
            <button className="hover:text-foreground transition-colors" data-testid="link-terms">
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
