import z from "zod";
import { PrimaryKey, Timestamp } from "./definitions";

export const PostStatusEnum = z.enum(["draft", "published"]);

export const PostSchema = z.object({
  postId: PrimaryKey,
  authorId: PrimaryKey,
  title: z.string().min(1, "Title is required").max(255),
  subtitle: z.string().max(255).nullable(),
  content: z.string().min(1, "Content is required"),
  slug: z.string().max(255).nullable(),
  status: PostStatusEnum,
  publishedAt: Timestamp.nullable(),
  createdAt: Timestamp,
  updatedAt: Timestamp,
});

// Used for creating a new post.
export const PostCreateSchema = PostSchema.omit({
  postId: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
}).extend({
  status: PostStatusEnum.default("draft"),
  tagIds: z.array(PrimaryKey).optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
