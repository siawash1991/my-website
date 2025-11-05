import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@shared/schema";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Search, Loader2 } from "lucide-react";
import aiContentImg from "@assets/generated_images/AI_content_creation_concept_9a547a22.png";
import businessAiImg from "@assets/generated_images/Business_AI_transformation_art_ad841739.png";
import mlIntroImg from "@assets/generated_images/AI_machine_learning_illustration_e02793b4.png";

const thumbnailMap = {
  "ai-content": aiContentImg,
  "business-ai": businessAiImg,
  "ml-intro": mlIntroImg
};

export default function NewsPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t.blog.categories[0]);
  
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const title = language === "en" ? post.titleEn : post.titleFa;
      const excerpt = language === "en" ? post.excerptEn : post.excerptFa;
      const category = language === "en" ? post.categoryEn : post.categoryFa;
      
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === t.blog.categories[0] || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory, language, t.blog.categories]);

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-news-title">
            {t.blog.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-news-subtitle">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="mb-12">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t.blog.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-news-search"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {t.blog.categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const title = language === "en" ? post.titleEn : post.titleFa;
            const excerpt = language === "en" ? post.excerptEn : post.excerptFa;
            const category = language === "en" ? post.categoryEn : post.categoryFa;
            
            return (
            <Card key={post.id} className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-news-${post.id}`}>
              <div className="aspect-video overflow-hidden">
                <img
                  src={thumbnailMap[post.thumbnail as keyof typeof thumbnailMap]}
                  alt={title}
                  className="w-full h-full object-cover"
                  data-testid={`img-news-${post.id}`}
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" data-testid={`badge-category-${post.id}`}>{category}</Badge>
                </div>
                <h3 className="text-xl font-semibold line-clamp-2" data-testid={`text-news-title-${post.id}`}>
                  {title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3" data-testid={`text-news-excerpt-${post.id}`}>
                  {excerpt}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1" data-testid={`text-news-date-${post.id}`}>
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1" data-testid={`text-news-time-${post.id}`}>
                    <Clock className="h-4 w-4" />
                    {post.readTime} {t.blog.readTime}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => console.log(`Read blog ${post.id}`)} data-testid={`button-read-${post.id}`}>
                  {t.blog.readMore}
                </Button>
              </CardFooter>
            </Card>
          )})}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
