import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBackground from "@assets/generated_images/AI_tech_hero_background_c35d8c76.png";

export default function HeroSection() {
  const { t } = useLanguage();

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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 z-0 animate-pulse-slow"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-0" />
      <div className="absolute inset-0 z-0 bg-gradient-radial from-primary/5 via-transparent to-transparent animate-pulse-slow" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center py-32">
        <p className="text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in" data-testid="text-greeting">
          {t.hero.greeting}
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up" data-testid="text-hero-title">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => scrollToSection("consultation")}
            className="w-full sm:w-auto"
            data-testid="button-cta-primary"
          >
            {t.hero.cta1}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("about")}
            className="w-full sm:w-auto backdrop-blur-md"
            data-testid="button-cta-secondary"
          >
            {t.hero.cta2}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-scroll-hint"
        >
          <span className="text-sm">{t.hero.scrollHint}</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
