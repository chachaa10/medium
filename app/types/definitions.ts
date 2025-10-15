import { z } from "zod";

export const PrimaryKey = z.string();
export const Timestamp = z.date();

export const TagSchema = z.object({
  tagId: PrimaryKey,
  name: z.string().min(1).max(50),
});

export const PostTagSchema = z.object({
  postTagId: PrimaryKey,
  postId: PrimaryKey,
  tagId: PrimaryKey,
});

export const ClapSchema = z.object({
  clapId: PrimaryKey,
  postId: PrimaryKey,
  userId: PrimaryKey,
  count: z.number().int().min(1),
  createdAt: Timestamp,
});

export const CommentSchema = z.object({
  commentId: PrimaryKey,
  postId: PrimaryKey,
  userId: PrimaryKey,
  parentCommentId: PrimaryKey.nullable(),
  content: z.string().min(1),
  createdAt: Timestamp,
});

export const FollowSchema = z.object({
  followId: PrimaryKey,
  followerId: PrimaryKey, // (The person doing the following)
  followeeId: PrimaryKey, // (The person being followed)
});

export const BookmarkSchema = z.object({
  bookmarkId: PrimaryKey,
  userId: PrimaryKey,
  postId: PrimaryKey,
  createdAt: Timestamp,
});

export type Tag = z.infer<typeof TagSchema>;
export type PostTag = z.infer<typeof PostTagSchema>;
export type Clap = z.infer<typeof ClapSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Follow = z.infer<typeof FollowSchema>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
