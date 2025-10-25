import { z } from "zod";

const id = z.uuid("Invalid UUID format.");
const timestamp = z.date();
const optionalTimestamp = z.union([timestamp, z.null()]).optional();

// --- User Schemas ---
export const UserSchema = z.object({
  id: id,
  name: z.string(),
  email: z.email(),
  password: z.string(),
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
}).extend({
  name: z.string().min(1, "Name is required.").max(100, "Name is too long."),
  email: z.email().min(1, "Email is required."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number"
    )
    .max(100, "Password must be at most 100 characters long"),
});

export const UserSigninSchema = UserSchema.pick({
  email: true,
  password: true,
}).extend({
  email: z.email().min(1, "Invalid email address."),
  password: z.string().min(1, "Invalid password."),
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

// --- Post Schemas ---
export const PostStatusEnum = z
  .enum(["draft", "published", "archived"])
  .default("draft");

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

// --- Tag Schemas ---
export const TagSchema = z.object({
  id: id,
  name: z.string().min(1, "Name is required.").max(50),
});

// --- PostTag Schemas (Many-to-Many) ---
export const PostTagSchema = z.object({
  id,
  postId: id,
  tagId: id,
});

// --- Clap Schemas ---
export const ClapSchema = z.object({
  id,
  postId: id,
  userId: id,
  clapCount: z.number().int().min(1),
  createdAt: timestamp,
});

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

// --- Follow Schemas ---
export const FollowSchema = z.object({
  id,
  followerId: id,
  followeeId: id,
  createdAt: timestamp,
});

// --- Bookmark Schemas ---
export const BookmarkSchema = z.object({
  id,
  userId: id,
  postId: id,
  createdAt: timestamp,
});
