import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import podcastCover from "@assets/generated_images/Podcast_audio_visualization_90577d09.png";

export default function PodcastsSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    console.log(`Toggle play podcast ${id}`);
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section id="podcasts" className="py-20 md:py-24 lg:py-32 fade-in-section" ref={sectionRef as React.RefObject<HTMLElement>} data-testid="section-podcasts">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-podcasts-title">
            {t.podcasts.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground" data-testid="text-podcasts-subtitle">
            {t.podcasts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.podcasts.episodes.map((episode) => (
            <Card key={episode.id} className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-podcast-${episode.id}`}>
              <CardHeader className="p-0">
                <div className="flex gap-6 p-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src={podcastCover}
                      alt={episode.title}
                      className="w-32 h-32 rounded-lg object-cover"
                      data-testid={`img-podcast-${episode.id}`}
                    />
                    <Button
                      size="icon"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      onClick={() => togglePlay(episode.id)}
                      data-testid={`button-play-${episode.id}`}
                    >
                      {playingId === episode.id ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-2" data-testid={`text-podcast-title-${episode.id}`}>
                      {episode.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1" data-testid={`text-podcast-date-${episode.id}`}>
                        <Calendar className="h-4 w-4" />
                        {episode.date}
                      </span>
                      <span className="flex items-center gap-1" data-testid={`text-podcast-duration-${episode.id}`}>
                        <Clock className="h-4 w-4" />
                        {episode.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-podcast-description-${episode.id}`}>
                  {episode.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
