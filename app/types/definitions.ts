import { z } from "zod";

const PrimaryKey = z.number().int().positive();

const Timestamp = z.date();

export const UserSchema = z.object({
  userId: PrimaryKey,
  username: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().max(255),
  bio: z.string().max(1000).nullable(),
  avatarURL: z.url().max(255).nullable(),
  created_at: Timestamp,
});

export const PostStatusEnum = z.enum(["draft", "published"]);

export const PostSchema = z.object({
  postId: PrimaryKey,
  authorId: PrimaryKey,
  title: z.string().min(1).max(255),
  subtitle: z.string().max(255).nullable(),
  content: z.string().min(1),
  slug: z.string().max(255).nullable(),
  status: PostStatusEnum,
  publishedAt: Timestamp.nullable(),
  createdAt: Timestamp,
  updatedAt: Timestamp,
});

export const TagSchema = z.object({
  tagID: PrimaryKey,
  name: z.string().min(1).max(50),
});

export const PostTagSchema = z.object({
  postTagID: PrimaryKey,
  postID: PrimaryKey,
  tagID: PrimaryKey,
});

export const ClapSchema = z.object({
  clapID: PrimaryKey,
  postID: PrimaryKey,
  userID: PrimaryKey,
  count: z.number().int().min(1),
  createdAt: Timestamp,
});

export const CommentSchema = z.object({
  commentID: PrimaryKey,
  postID: PrimaryKey,
  userID: PrimaryKey,
  parentCommentID: PrimaryKey.nullable(),
  content: z.string().min(1),
  createdAt: Timestamp,
});

export const FollowSchema = z.object({
  followID: PrimaryKey,
  followerID: PrimaryKey, // (The person doing the following)
  followeeID: PrimaryKey, // (The person being followed)
});

export const BookmarkSchema = z.object({
  bookmarkID: PrimaryKey,
  userID: PrimaryKey,
  postID: PrimaryKey,
  createdAT: Timestamp,
});

// Used for validating a new user registration input.
export const UserCreateSchema = UserSchema.pick({
  username: true,
  email: true,
}).extend({
  password: z.string().min(8).max(100),
});

export const UserLoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const UserUpdateSchema = UserSchema.pick({
  username: true,
  email: true,
  bio: true,
  avatarURL: true,
});

// Used for creating a new post.
export const PostCreateSchema = PostSchema.omit({
  postID: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
}).extend({
  status: PostStatusEnum.default("draft"),
  tagIDs: z.array(PrimaryKey).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type PostTag = z.infer<typeof PostTagSchema>;
export type Clap = z.infer<typeof ClapSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Follow = z.infer<typeof FollowSchema>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
