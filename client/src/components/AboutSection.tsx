import { Card } from "@/components/ui/card";
import { Brain, Pen, Briefcase, Cpu, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import profileImage from "@assets/1762116988901_1762165702304.png";

const iconMap = {
  brain: Brain,
  pen: Pen,
  briefcase: Briefcase,
  cpu: Cpu,
  "trending-up": TrendingUp,
  users: Users,
};

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-24 lg:py-32 fade-in-section" ref={sectionRef as React.RefObject<HTMLElement>} data-testid="section-about">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-about-title">
            {t.about.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground" data-testid="text-about-subtitle">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          <div className="order-2 lg:order-1">
            <p className="text-lg leading-relaxed mb-6" data-testid="text-about-bio">
              {t.about.bio}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground" data-testid="text-about-experience">
              {t.about.experience}
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src={profileImage}
              alt="Siavash"
              className="w-full max-w-sm rounded-2xl shadow-lg"
              data-testid="img-profile"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center" data-testid="text-skills-title">
            {t.about.skillsTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {t.about.skills.map((skill, index) => {
              const Icon = iconMap[skill.icon as keyof typeof iconMap];
              return (
                <Card
                  key={index}
                  className="p-6 hover-elevate active-elevate-2 transition-all duration-300 cursor-default"
                  data-testid={`card-skill-${index}`}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">{skill.name}</h4>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
