import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertPodcastSchema, insertStartupSchema } from "@shared/schema";
import { setupAuth } from "./auth";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);

  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.put("/api/posts/:id", requireAuth, async (req, res) => {
    try {
      const post = await storage.updatePost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deletePost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Podcasts routes
  app.get("/api/podcasts", async (req, res) => {
    try {
      const podcasts = await storage.getAllPodcasts();
      res.json(podcasts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch podcasts" });
    }
  });

  app.get("/api/podcasts/:id", async (req, res) => {
    try {
      const podcast = await storage.getPodcast(req.params.id);
      if (!podcast) {
        return res.status(404).json({ error: "Podcast not found" });
      }
      res.json(podcast);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch podcast" });
    }
  });

  app.post("/api/podcasts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPodcastSchema.parse(req.body);
      const podcast = await storage.createPodcast(validatedData);
      res.status(201).json(podcast);
    } catch (error) {
      res.status(400).json({ error: "Invalid podcast data" });
    }
  });

  app.put("/api/podcasts/:id", requireAuth, async (req, res) => {
    try {
      const podcast = await storage.updatePodcast(req.params.id, req.body);
      if (!podcast) {
        return res.status(404).json({ error: "Podcast not found" });
      }
      res.json(podcast);
    } catch (error) {
      res.status(500).json({ error: "Failed to update podcast" });
    }
  });

  app.delete("/api/podcasts/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deletePodcast(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Podcast not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete podcast" });
    }
  });

  // Startups routes
  app.get("/api/startups", async (req, res) => {
    try {
      const startups = await storage.getAllStartups();
      res.json(startups);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch startups" });
    }
  });

  app.get("/api/startups/:id", async (req, res) => {
    try {
      const startup = await storage.getStartup(req.params.id);
      if (!startup) {
        return res.status(404).json({ error: "Startup not found" });
      }
      res.json(startup);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch startup" });
    }
  });

  app.post("/api/startups", requireAuth, async (req, res) => {
    try {
      const validatedData = insertStartupSchema.parse(req.body);
      const startup = await storage.createStartup(validatedData);
      res.status(201).json(startup);
    } catch (error) {
      res.status(400).json({ error: "Invalid startup data" });
    }
  });

  app.put("/api/startups/:id", requireAuth, async (req, res) => {
    try {
      const startup = await storage.updateStartup(req.params.id, req.body);
      if (!startup) {
        return res.status(404).json({ error: "Startup not found" });
      }
      res.json(startup);
    } catch (error) {
      res.status(500).json({ error: "Failed to update startup" });
    }
  });

  app.delete("/api/startups/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteStartup(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Startup not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete startup" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
