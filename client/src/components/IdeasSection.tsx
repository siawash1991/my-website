import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Sparkles, BarChart, Palette, Workflow } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const iconMap = [Lightbulb, TrendingUp, Sparkles, BarChart, Palette, Workflow];

export default function IdeasSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section id="ideas" className="py-20 md:py-24 lg:py-32 bg-muted/30 fade-in-section" ref={sectionRef as React.RefObject<HTMLElement>} data-testid="section-ideas">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-ideas-title">
            {t.ideas.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground" data-testid="text-ideas-subtitle">
            {t.ideas.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.ideas.concepts.map((concept, index) => {
            const Icon = iconMap[index];
            return (
              <Card
                key={concept.id}
                className="hover-elevate active-elevate-2 transition-all duration-300 cursor-default"
                data-testid={`card-idea-${concept.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="flex-shrink-0" data-testid={`badge-impact-${concept.id}`}>
                      {t.ideas.impact}: {concept.impact}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold" data-testid={`text-idea-title-${concept.id}`}>
                    {concept.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-idea-description-${concept.id}`}>
                    {concept.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
