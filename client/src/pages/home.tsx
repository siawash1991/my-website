import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Post, Podcast, Startup } from "@shared/schema";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ConsultationSection from "@/components/ConsultationSection";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Play, ArrowRight, Sparkles, TrendingUp, Users, Loader2 } from "lucide-react";
import aiContentImg from "@assets/generated_images/AI_content_creation_concept_9a547a22.png";
import businessAiImg from "@assets/generated_images/Business_AI_transformation_art_ad841739.png";
import mlIntroImg from "@assets/generated_images/AI_machine_learning_illustration_e02793b4.png";

const thumbnailMap = {
  "ai-content": aiContentImg,
  "business-ai": businessAiImg,
  "ml-intro": mlIntroImg
};

const iconMap = {
  "sparkles": Sparkles,
  "trending-up": TrendingUp,
  "users": Users,
  "default": Sparkles
};

export default function Home() {
  const { t, language } = useLanguage();
  
  const { data: posts = [] } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });
  
  const { data: podcasts = [] } = useQuery<Podcast[]>({
    queryKey: ["/api/podcasts"],
  });
  
  const { data: startups = [] } = useQuery<Startup[]>({
    queryKey: ["/api/startups"],
  });
  
  const latestPosts = posts.slice(0, 3);
  const latestPodcasts = podcasts.slice(0, 2);
  const latestStartups = startups.slice(0, 3);

  return (
    <>
      <HeroSection />
      <AboutSection />
        
        {/* Latest News Preview */}
        <section className="py-20 md:py-24 lg:py-32 bg-muted/30" data-testid="section-news-preview">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2" data-testid="text-latest-news-title">
                  {t.blog.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.blog.subtitle}
                </p>
              </div>
              <Link href="/news">
                <Button variant="outline" size="lg" className="hidden md:flex items-center gap-2" data-testid="button-view-all-news">
                  {t.common.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => {
                const title = language === "en" ? post.titleEn : post.titleFa;
                const excerpt = language === "en" ? post.excerptEn : post.excerptFa;
                const category = language === "en" ? post.categoryEn : post.categoryFa;
                
                return (
                <Card key={post.id} className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-news-preview-${post.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={thumbnailMap[post.thumbnail as keyof typeof thumbnailMap]}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{category}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold line-clamp-2">
                      {title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime} {t.blog.readTime}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              )})}
            
            </div>
            
            <div className="text-center mt-8 md:hidden">
              <Link href="/news">
                <Button variant="outline" size="lg" className="items-center gap-2" data-testid="button-view-all-news-mobile">
                  {t.common.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Podcasts Preview */}
        <section className="py-20 md:py-24 lg:py-32" data-testid="section-podcasts-preview">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2" data-testid="text-latest-podcasts-title">
                  {t.podcasts.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.podcasts.subtitle}
                </p>
              </div>
              <Link href="/podcasts">
                <Button variant="outline" size="lg" className="hidden md:flex items-center gap-2" data-testid="button-view-all-podcasts">
                  {t.common.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {latestPodcasts.map((episode) => {
                const title = language === "en" ? episode.titleEn : episode.titleFa;
                const description = language === "en" ? episode.descriptionEn : episode.descriptionFa;
                
                return (
                <Card key={episode.id} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-podcast-preview-${episode.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold flex-1">
                        {title}
                      </h3>
                      <Button variant="default" size="icon">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {episode.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {episode.duration}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )})}
            
            </div>
            
            <div className="text-center mt-8 md:hidden">
              <Link href="/podcasts">
                <Button variant="outline" size="lg" className="items-center gap-2" data-testid="button-view-all-podcasts-mobile">
                  {t.common.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Startups Preview */}
        <section className="py-20 md:py-24 lg:py-32 bg-muted/30" data-testid="section-startups-preview">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2" data-testid="text-latest-startups-title">
                  {t.ideas.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.ideas.subtitle}
                </p>
              </div>
              <Link href="/startups">
                <Button variant="outline" size="lg" className="hidden md:flex items-center gap-2" data-testid="button-view-all-startups">
                  {t.common.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestStartups.map((concept) => {
                const Icon = iconMap[concept.thumbnail as keyof typeof iconMap] || iconMap.default;
                const name = language === "en" ? concept.nameEn : concept.nameFa;
                const description = language === "en" ? concept.descriptionEn : concept.descriptionFa;
                const status = language === "en" ? concept.statusEn : concept.statusFa;
                
                return (
                  <Card key={concept.id} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-startup-preview-${concept.id}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary">
                          {status}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {name}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="text-center mt-8 md:hidden">
              <Link href="/startups">
                <Button variant="outline" size="lg" className="items-center gap-2" data-testid="button-view-all-startups-mobile">
                  {t.common.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ConsultationSection />
      <Footer />
    </>
  );
}
