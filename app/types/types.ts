import type z from "zod";

import type * as t from "./schemas";

export type User = z.infer<typeof t.UserSchema>;
export type UserSignup = z.infer<typeof t.UserSignupSchema>;
export type UserSignin = z.infer<typeof t.UserSigninSchema>;
export type UserUpdate = z.infer<typeof t.UserUpdateSchema>;
export type UserSoftDeleteRequest = z.infer<
  typeof t.UserSoftDeleteRequestSchema
>;
export type PostStatus = z.infer<typeof t.PostStatusEnum>;
export type Post = z.infer<typeof t.PostSchema>;
export type PostCreate = z.infer<typeof t.PostCreateSchema>;
export type PostUpdate = z.infer<typeof t.PostUpdateSchema>;
export type PostSoftDeleteRequest = z.infer<
  typeof t.PostSoftDeleteRequestSchema
>;
export type Tag = z.infer<typeof t.TagSchema>;
export type PostTag = z.infer<typeof t.PostTagSchema>;
export type Clap = z.infer<typeof t.ClapSchema>;
export type Comment = z.infer<typeof t.CommentSchema>;
export type Follow = z.infer<typeof t.FollowSchema>;
export type Bookmark = z.infer<typeof t.BookmarkSchema>;
