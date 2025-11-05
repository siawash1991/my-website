import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Coffee } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ConsultationSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section id="consultation" className="py-20 md:py-24 lg:py-32 fade-in-section" ref={sectionRef as React.RefObject<HTMLElement>} data-testid="section-consultation">
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-consultation-title">
            {t.consultation.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground" data-testid="text-consultation-subtitle">
            {t.consultation.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg leading-relaxed mb-8" data-testid="text-consultation-description">
              {t.consultation.description}
            </p>
            <div className="space-y-3">
              {t.consultation.services.map((service, index) => (
                <div key={index} className="flex items-start gap-3" data-testid={`item-service-${index}`}>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-base">{service}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold mb-2" data-testid="text-cta-title">
                {t.consultation.ctaTitle}
              </h3>
              <p className="text-muted-foreground" data-testid="text-cta-description">
                {t.consultation.ctaDescription}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  console.log("Buy me a coffee clicked");
                  window.open("https://buymeacoffee.com", "_blank");
                }}
                data-testid="button-buy-coffee"
              >
                <Coffee className="h-5 w-5 mr-2" />
                {t.consultation.ctaButton}
              </Button>
              <p className="text-sm text-center text-muted-foreground" data-testid="text-alt-contact">
                {t.consultation.altContact} <a href="mailto:siavash@example.com" className="text-primary hover:underline">siavash@example.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
