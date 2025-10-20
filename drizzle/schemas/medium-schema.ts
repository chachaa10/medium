import { PostStatusEnum } from "@/app/types/post";
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./auth-schema";

const createdAt = timestamp("created_at").defaultNow().notNull();
const updatedAt = timestamp("updated_at")
  .defaultNow()
  .$onUpdate(() => /* @__PURE__ */ new Date())
  .notNull();

export type PostStatus = "draft" | "published" | "archived";

export const posts = pgTable(
  "posts",
  {
    postId: text("post_id").notNull().primaryKey(),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    subtitle: varchar("subtitle", { length: 255 }),
    content: text("content").notNull(),
    slug: varchar("slug", { length: 255 }).unique(),
    status: varchar("status", { length: 10 })
      .$type<PostStatus>()
      .notNull()
      .default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: createdAt,
    updatedAt: updatedAt,
  },
  (table) => {
    return {
      authorIdIdx: index("idx_posts_author_id").on(table.authorId),
    };
  }
);

export const tags = pgTable("tags", {
  tagId: text("tag_id").notNull().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

export const postTags = pgTable(
  "post_tags",
  {
    id: text("id").notNull().primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.postId, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.tagId, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      uniquePostTag: unique("unique_post_tag").on(table.postId, table.tagId),
    };
  }
);

export const claps = pgTable(
  "claps",
  {
    clapId: text("clap_id").notNull().primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.postId, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    clapCount: integer("clap_count").notNull(),
    createdAt: createdAt,
  },
  (table) => {
    return {
      uniquePostUser: unique("unique_clap_post_user").on(
        table.postId,
        table.userId
      ),
      postIdIdx: index("idx_claps_post_id").on(table.postId),
      userIdIdx: index("idx_claps_user_id").on(table.userId),
    };
  }
);

export const comments = pgTable(
  "comments",
  {
    commentId: text("comment_id").notNull().primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.postId, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    parentId: text("parent_id").references((): any => comments.commentId, {
      onDelete: "cascade",
    }),
    content: text("content").notNull(),
    createdAt: createdAt,
  },
  (table) => {
    return {
      postIdIdx: index("idx_comments_post_id").on(table.postId),
      userIdIdx: index("idx_comments_user_id").on(table.userId),
    };
  }
);

export const follows = pgTable(
  "follows",
  {
    followId: text("follow_id").notNull().primaryKey(),
    followerId: text("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followeeId: text("followee_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      uniqueFollow: unique("unique_follower_followee").on(
        table.followerId,
        table.followeeId
      ),
      followerIdIdx: index("idx_follows_follower_id").on(table.followerId),
      followeeIdIdx: index("idx_follows_followee_id").on(table.followeeId),
    };
  }
);

export const bookmarks = pgTable(
  "bookmarks",
  {
    bookmarkId: text("bookmark_id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: text("post_id")
      .notNull()
      .references(() => posts.postId, { onDelete: "cascade" }),
    createdAt: createdAt,
  },
  (table) => {
    return {
      uniqueBookmark: unique("unique_bookmark_user_post").on(
        table.userId,
        table.postId
      ),
    };
  }
);
