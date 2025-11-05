import { 
  type User, 
  type InsertUser,
  type Post,
  type InsertPost,
  type Podcast,
  type InsertPodcast,
  type Startup,
  type InsertStartup,
  users,
  posts,
  podcasts,
  startups
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Session store
  sessionStore: session.Store;
  
  // Posts
  getAllPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;
  
  // Podcasts
  getAllPodcasts(): Promise<Podcast[]>;
  getPodcast(id: string): Promise<Podcast | undefined>;
  createPodcast(podcast: InsertPodcast): Promise<Podcast>;
  updatePodcast(id: string, podcast: Partial<InsertPodcast>): Promise<Podcast | undefined>;
  deletePodcast(id: string): Promise<boolean>;
  
  // Startups
  getAllStartups(): Promise<Startup[]>;
  getStartup(id: string): Promise<Startup | undefined>;
  createStartup(startup: InsertStartup): Promise<Startup>;
  updateStartup(id: string, startup: Partial<InsertStartup>): Promise<Startup | undefined>;
  deleteStartup(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Posts
  async getAllPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(posts.date);
  }

  async getPost(id: string): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0];
  }

  async createPost(post: InsertPost): Promise<Post> {
    const result = await db.insert(posts).values(post).returning();
    return result[0];
  }

  async updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined> {
    const result = await db.update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return result[0];
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result.length > 0;
  }

  // Podcasts
  async getAllPodcasts(): Promise<Podcast[]> {
    return await db.select().from(podcasts).orderBy(podcasts.date);
  }

  async getPodcast(id: string): Promise<Podcast | undefined> {
    const result = await db.select().from(podcasts).where(eq(podcasts.id, id));
    return result[0];
  }

  async createPodcast(podcast: InsertPodcast): Promise<Podcast> {
    const result = await db.insert(podcasts).values(podcast).returning();
    return result[0];
  }

  async updatePodcast(id: string, podcast: Partial<InsertPodcast>): Promise<Podcast | undefined> {
    const result = await db.update(podcasts)
      .set({ ...podcast, updatedAt: new Date() })
      .where(eq(podcasts.id, id))
      .returning();
    return result[0];
  }

  async deletePodcast(id: string): Promise<boolean> {
    const result = await db.delete(podcasts).where(eq(podcasts.id, id)).returning();
    return result.length > 0;
  }

  // Startups
  async getAllStartups(): Promise<Startup[]> {
    return await db.select().from(startups).orderBy(startups.createdAt);
  }

  async getStartup(id: string): Promise<Startup | undefined> {
    const result = await db.select().from(startups).where(eq(startups.id, id));
    return result[0];
  }

  async createStartup(startup: InsertStartup): Promise<Startup> {
    const result = await db.insert(startups).values(startup).returning();
    return result[0];
  }

  async updateStartup(id: string, startup: Partial<InsertStartup>): Promise<Startup | undefined> {
    const result = await db.update(startups)
      .set({ ...startup, updatedAt: new Date() })
      .where(eq(startups.id, id))
      .returning();
    return result[0];
  }

  async deleteStartup(id: string): Promise<boolean> {
    const result = await db.delete(startups).where(eq(startups.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DbStorage();
