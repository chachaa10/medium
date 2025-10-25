import { z } from "zod";

const id = z.uuid("Invalid UUID format.");
const timestamp = z.date();
const optionalTimestamp = z.union([timestamp, z.null()]).optional();

// --- User Schemas ---
export const UserSchema = z.object({
  id: id,
  name: z.string().min(1, "Name is required.").max(100, "Name is too long."),
  email: z.email().min(1, "Email is required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number"
    )
    .max(100, "Password must be at most 100 characters long"),
  emailVerified: z.boolean().default(false),
  image: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  createdAt: timestamp,
  updatedAt: timestamp,
  deletedAt: optionalTimestamp,
});

export const UserSignupSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const UserSigninSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const UserUpdateBaseSchema = UserSchema.pick({
  name: true,
  email: true,
  image: true,
  bio: true,
  avatarUrl: true,
});

export const UserUpdateSchema = UserUpdateBaseSchema.partial();

export const UserSoftDeleteRequestSchema = z
  .object({
    confirm: z.literal(true, {
      error: "You must confirm account deletion.",
    }),
  })
  .strict();

export type UserSchema = z.infer<typeof UserSchema>;

export type UserSignup = z.infer<typeof UserSignupSchema>;
export type UserSignin = z.infer<typeof UserSigninSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export type UserSoftDeleteRequest = z.infer<typeof UserSoftDeleteRequestSchema>;

// --- Post Schemas ---
export const PostStatusEnum = z
  .enum(["draft", "published", "archived"])
  .default("draft");
export type PostStatus = z.infer<typeof PostStatusEnum>;

export const PostSchema = z.object({
  id: id,
  authorId: id,
  title: z.string().min(1, "Title is required.").max(255, "Title is too long."),
  subtitle: z.string().max(255).nullable().optional(),
  content: z.string().min(1, "Content is required."),
  slug: z.string().max(255).nullable().optional(),
  status: PostStatusEnum,
  publishedAt: optionalTimestamp,
  deletedAt: optionalTimestamp,
  createdAt: timestamp,
  updatedAt: timestamp,
});

export const PostCreateSchema = PostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true, // Has a default in schema
}).extend({
  subtitle: z.string().max(255).optional().nullable(),
  slug: z.string().max(255).optional().nullable(),
  publishedAt: z.never().optional(), // Should be set separately or by a service
  deletedAt: z.never().optional(), // Prevent setting deletedAt on creation
});

export const PostUpdateBaseSchema = PostSchema.pick({
  title: true,
  subtitle: true,
  content: true,
  slug: true,
});

export const PostUpdateSchema = PostUpdateBaseSchema.partial();

export const PostSoftDeleteRequestSchema = z
  .object({
    confirm: z.literal(true, {
      error: "You must confirm post deletion.",
    }),
  })
  .strict();

export type Post = z.infer<typeof PostSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
export type PostUpdate = z.infer<typeof PostUpdateSchema>;
export type PostSoftDeleteRequest = z.infer<typeof PostSoftDeleteRequestSchema>;

// --- Tag Schemas ---
export const TagSchema = z.object({
  id: id,
  name: z.string().min(1, "Name is required.").max(50),
});

export type Tag = z.infer<typeof TagSchema>;

// --- PostTag Schemas (Many-to-Many) ---
export const PostTagSchema = z.object({
  id,
  postId: id,
  tagId: id,
});

export type PostTag = z.infer<typeof PostTagSchema>;

// --- Clap Schemas ---
export const ClapSchema = z.object({
  id,
  postId: id,
  userId: id,
  clapCount: z.number().int().min(1),
  createdAt: timestamp,
});

export type Clap = z.infer<typeof ClapSchema>;

// --- Comment Schemas (Adjacency List) ---
export const CommentSchema = z.object({
  id,
  postId: id,
  userId: id,
  parentId: id.nullable().optional(),
  content: z.string().min(1, "Content is required."),
  deletedAt: optionalTimestamp,
  createdAt: timestamp,
});

export type Comment = z.infer<typeof CommentSchema>;

// --- Follow Schemas ---
export const FollowSchema = z.object({
  id,
  followerId: id,
  followeeId: id,
  createdAt: timestamp,
});

export type Follow = z.infer<typeof FollowSchema>;

// --- Bookmark Schemas ---
export const BookmarkSchema = z.object({
  id,
  userId: id,
  postId: id,
  createdAt: timestamp,
});

export type Bookmark = z.infer<typeof BookmarkSchema>;
