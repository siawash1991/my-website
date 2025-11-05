import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import aiContentImg from "@assets/generated_images/AI_machine_learning_illustration_e02793b4.png";
import businessAiImg from "@assets/generated_images/Business_AI_transformation_art_ad841739.png";
import mlIntroImg from "@assets/generated_images/AI_content_creation_concept_9a547a22.png";

const thumbnailMap = {
  "ai-content": aiContentImg,
  "business-ai": businessAiImg,
  "ml-intro": mlIntroImg,
};

export default function BlogSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = t.blog.posts.filter((post) => {
    const categoryMatch = selectedCategory === "All" || selectedCategory === t.blog.categories[0] || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <section id="blog" className="py-20 md:py-24 lg:py-32 bg-muted/30 fade-in-section" ref={sectionRef as React.RefObject<HTMLElement>} data-testid="section-blog">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-blog-title">
            {t.blog.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground" data-testid="text-blog-subtitle">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t.blog.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-blog-search"
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
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-blog-${post.id}`}>
              <div className="aspect-video overflow-hidden">
                <img
                  src={thumbnailMap[post.thumbnail as keyof typeof thumbnailMap]}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  data-testid={`img-blog-${post.id}`}
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" data-testid={`badge-category-${post.id}`}>{post.category}</Badge>
                </div>
                <h3 className="text-xl font-semibold line-clamp-2" data-testid={`text-blog-title-${post.id}`}>
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3" data-testid={`text-blog-excerpt-${post.id}`}>
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1" data-testid={`text-blog-date-${post.id}`}>
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1" data-testid={`text-blog-time-${post.id}`}>
                    <Clock className="h-4 w-4" />
                    {post.readTime} {t.blog.readTime}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => console.log(`Read blog ${post.id}`)} data-testid={`button-read-${post.id}`}>
                  {t.blog.readMore}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
