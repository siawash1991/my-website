import { db } from "./db";
import { posts, podcasts, startups } from "@shared/schema";
import { content } from "@shared/content";

async function seed() {
  console.log("Seeding database with initial content...");

  // Seed posts
  const postsEn = content.en.blog.posts;
  const postsFa = content.fa.blog.posts;

  for (let i = 0; i < postsEn.length; i++) {
    const postEn = postsEn[i];
    const postFa = postsFa[i];

    await db.insert(posts).values({
      titleEn: postEn.title,
      titleFa: postFa.title,
      excerptEn: postEn.excerpt,
      excerptFa: postFa.excerpt,
      contentEn: postEn.excerpt, // Using excerpt as content for now
      contentFa: postFa.excerpt,
      categoryEn: postEn.category,
      categoryFa: postFa.category,
      readTime: postEn.readTime,
      date: postEn.date,
      thumbnail: postEn.thumbnail,
    });
  }

  console.log(`✓ Seeded ${postsEn.length} posts`);

  // Seed podcasts
  const podcastsEn = content.en.podcasts.episodes;
  const podcastsFa = content.fa.podcasts.episodes;

  for (let i = 0; i < podcastsEn.length; i++) {
    const podcastEn = podcastsEn[i];
    const podcastFa = podcastsFa[i];

    await db.insert(podcasts).values({
      titleEn: podcastEn.title,
      titleFa: podcastFa.title,
      descriptionEn: podcastEn.description,
      descriptionFa: podcastFa.description,
      duration: podcastEn.duration,
      date: podcastEn.date,
    });
  }

  console.log(`✓ Seeded ${podcastsEn.length} podcasts`);

  // Seed startups
  const startupsEn = content.en.ideas.concepts;
  const startupsFa = content.fa.ideas.concepts;

  for (let i = 0; i < startupsEn.length; i++) {
    const startupEn = startupsEn[i];
    const startupFa = startupsFa[i];

    await db.insert(startups).values({
      nameEn: startupEn.title,
      nameFa: startupFa.title,
      descriptionEn: startupEn.description,
      descriptionFa: startupFa.description,
      statusEn: startupEn.impact,
      statusFa: startupFa.impact,
      categoryEn: startupEn.tags?.[0] || "AI",
      categoryFa: startupFa.tags?.[0] || "هوش مصنوعی",
      thumbnail: startupEn.icon || "default",
    });
  }

  console.log(`✓ Seeded ${startupsEn.length} startups`);
  console.log("Database seeding completed successfully!");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
