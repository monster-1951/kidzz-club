import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  media: z.string().optional(), // Base64 encoded string
});
