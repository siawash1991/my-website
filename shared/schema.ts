import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleFa: text("title_fa").notNull(),
  excerptEn: text("excerpt_en").notNull(),
  excerptFa: text("excerpt_fa").notNull(),
  contentEn: text("content_en").notNull(),
  contentFa: text("content_fa").notNull(),
  categoryEn: text("category_en").notNull(),
  categoryFa: text("category_fa").notNull(),
  readTime: integer("read_time").notNull(),
  date: text("date").notNull(),
  thumbnail: text("thumbnail").notNull(),
  articleUrl: text("article_url"), // لینک به مقاله کامل
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const podcasts = pgTable("podcasts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleFa: text("title_fa").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionFa: text("description_fa").notNull(),
  duration: text("duration").notNull(),
  date: text("date").notNull(),
  audioUrl: text("audio_url"), // لینک پادکست صوتی
  youtubeUrl: text("youtube_url"), // لینک ویدیو یوتوب
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const startups = pgTable("startups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameEn: text("name_en").notNull(),
  nameFa: text("name_fa").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionFa: text("description_fa").notNull(),
  statusEn: text("status_en").notNull(),
  statusFa: text("status_fa").notNull(),
  categoryEn: text("category_en").notNull(),
  categoryFa: text("category_fa").notNull(),
  thumbnail: text("thumbnail").notNull(),
  websiteUrl: text("website_url"), // لینک وبسایت استارتاپ
  articleUrl: text("article_url"), // لینک مقاله درباره استارتاپ
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  articleUrl: z.string().url().optional().or(z.literal("")).transform(val => val === "" ? null : val),
});

export const insertPodcastSchema = createInsertSchema(podcasts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  audioUrl: z.string().url().optional().or(z.literal("")).transform(val => val === "" ? null : val),
  youtubeUrl: z.string().url().optional().or(z.literal("")).transform(val => val === "" ? null : val),
});

export const insertStartupSchema = createInsertSchema(startups).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  websiteUrl: z.string().url().optional().or(z.literal("")).transform(val => val === "" ? null : val),
  articleUrl: z.string().url().optional().or(z.literal("")).transform(val => val === "" ? null : val),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertPodcast = z.infer<typeof insertPodcastSchema>;
export type Podcast = typeof podcasts.$inferSelect;
export type InsertStartup = z.infer<typeof insertStartupSchema>;
export type Startup = typeof startups.$inferSelect;
