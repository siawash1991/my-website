import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Startup } from "@shared/schema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Users, Loader2 } from "lucide-react";

const iconMap = {
  "sparkles": Sparkles,
  "trending-up": TrendingUp,
  "users": Users,
  "default": Sparkles
};

export default function StartupsPage() {
  const { t, language } = useLanguage();
  
  const { data: startups = [], isLoading } = useQuery<Startup[]>({
    queryKey: ["/api/startups"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-startups-title">
            {t.ideas.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-startups-subtitle">
            {t.ideas.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {startups.map((concept) => {
            const Icon = iconMap[concept.thumbnail as keyof typeof iconMap] || iconMap.default;
            const name = language === "en" ? concept.nameEn : concept.nameFa;
            const description = language === "en" ? concept.descriptionEn : concept.descriptionFa;
            const status = language === "en" ? concept.statusEn : concept.statusFa;
            const category = language === "en" ? concept.categoryEn : concept.categoryFa;
            
            return (
              <Card key={concept.id} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-startup-${concept.id}`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" data-testid={`badge-status-${concept.id}`}>
                      {status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-startup-title-${concept.id}`}>
                    {name}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid={`text-startup-description-${concept.id}`}>
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center bg-muted/30 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t.ideas.collaborationTitle || "Let's Build Together"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t.ideas.collaborationDescription || "I'm looking for passionate investors and developers to help bring these ideas to life. If you're interested in AI innovation and entrepreneurship, let's connect."}
          </p>
          <Button size="lg" data-testid="button-contact-collaboration">
            {t.ideas.collaborationCTA || "Get in Touch"}
          </Button>
        </div>
      </div>
    </div>
  );
}
