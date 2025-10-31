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
      "Password must contain at least one letter and one number",
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

export const PostStatusEnum = z
  .enum(["draft", "published", "archived"])
  .default("draft");

export const PostSchema = z.object({
  id: id,
  authorId: id,
  title: z.string(),
  content: z.string(),
  slug: z.string(),
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
  deletedAt: true,
}).extend({
  title: z.string().min(1, "Title is required.").max(255, "Title is too long."),
  content: z.string().min(1, "Content is required."),
  slug: z.string().min(1, "Slug is required.").max(255),
  publishedAt: z.never().optional(), // Should be set separately or by a service
});

export const PostUpdateBaseSchema = PostSchema.pick({
  id: true,
  title: true,
  content: true,
  status: true,
});

export const PostUpdateSchema = PostUpdateBaseSchema.pick({
  title: true,
  content: true,
  status: true,
})
  .partial()
  .extend({
    id: z.uuid().min(1, "Post ID is required."),
  });

export const PostSoftDeleteRequestSchema = z
  .object({
    confirm: z.literal(true, {
      error: "You must confirm post deletion.",
    }),
  })
  .strict()
  .extend({
    id: z.uuid().min(1, "Post ID is required."),
  });

export const TagSchema = z.object({
  id: id,
  name: z.string().min(1, "Name is required.").max(50),
});

// --- PostTag (Many-to-Many) ---
export const PostTagSchema = z.object({
  id,
  postId: id,
  tagId: id,
});

export const ClapSchema = z.object({
  id,
  postId: id,
  userId: id,
  clapCount: z.number().int().min(1),
  createdAt: timestamp,
});

export const LikeSchema = ClapSchema.pick({
  postId: true,
  userId: true,
  createdAt: true,
  clapCount: true,
});

export const CommentSchema = z.object({
  id,
  postId: id,
  userId: id,
  parentId: id.nullable().optional(),
  content: z.string().min(1, "Content is required."),
  deletedAt: optionalTimestamp,
  createdAt: timestamp,
});

export const FollowSchema = z.object({
  id,
  followerId: id,
  followeeId: id,
  createdAt: timestamp,
});

export const BookmarkSchema = z.object({
  id,
  userId: id,
  postId: id,
  createdAt: timestamp,
});
