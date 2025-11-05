import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Podcast } from "@shared/schema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, Loader2 } from "lucide-react";

export default function PodcastsPage() {
  const { t, language } = useLanguage();
  
  const { data: podcasts = [], isLoading } = useQuery<Podcast[]>({
    queryKey: ["/api/podcasts"],
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-podcasts-title">
            {t.podcasts.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4" data-testid="text-podcasts-subtitle">
            {t.podcasts.subtitle}
          </p>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto" data-testid="text-podcasts-invitation">
            {t.podcasts.collaborationInvite}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {podcasts.map((episode) => {
            const title = language === "en" ? episode.titleEn : episode.titleFa;
            const description = language === "en" ? episode.descriptionEn : episode.descriptionFa;
            
            return (
            <Card key={episode.id} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-podcast-${episode.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-xl font-semibold flex-1" data-testid={`text-podcast-title-${episode.id}`}>
                    {title}
                  </h3>
                  <Button variant="default" size="icon" data-testid={`button-play-${episode.id}`}>
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4" data-testid={`text-podcast-description-${episode.id}`}>
                  {description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1" data-testid={`text-podcast-date-${episode.id}`}>
                    <Calendar className="h-4 w-4" />
                    {episode.date}
                  </span>
                  <span className="flex items-center gap-1" data-testid={`text-podcast-duration-${episode.id}`}>
                    <Clock className="h-4 w-4" />
                    {episode.duration}
                  </span>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>

        {podcasts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">More episodes coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
