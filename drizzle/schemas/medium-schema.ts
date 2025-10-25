// db/schema.ts
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Helper: create a fresh UUID PK column for each table
 */
export const id = (name = "id") =>
  uuid(name).defaultRandom().notNull().primaryKey();

/**
 * Shared timestamps (timestamptz)
 */
export const createdAt = timestamp("created_at", { withTimezone: true })
  .defaultNow()
  .notNull();
export const deletedAt = timestamp("deleted_at", { withTimezone: true });
export const updatedAt = timestamp("updated_at", { withTimezone: true })
  .defaultNow()
  .$onUpdate(() => /* @__PURE__ */ new Date())
  .notNull();

export const users = pgTable(
  "users",
  {
    id: id(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    isAuthor: boolean("is_author").default(false).notNull(),
    deletedAt,
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("idx_users_email").on(table.email),
    };
  }
);

export const sessions = pgTable("sessions", {
  id: id(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt,
  updatedAt,
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

/**
 * Accounts (OAuth / credentials)
 */
export const accounts = pgTable(
  "accounts",
  {
    id: id(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      withTimezone: true,
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      providerAccountUnique: unique("uq_accounts_provider_account").on(
        table.providerId,
        table.accountId
      ),
      userIdIdx: index("idx_accounts_user_id").on(table.userId),
    };
  }
);

/**
 * Verifications (email/sms codes, etc)
 */
export const verifications = pgTable("verifications", {
  id: id(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt,
  updatedAt,
});

export const postStatus = pgEnum("post_status", [
  "draft",
  "published",
  "archived",
]);

export const posts = pgTable(
  "posts",
  {
    id: id(),
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    subtitle: varchar("subtitle", { length: 255 }),
    content: text("content").notNull(),
    slug: varchar("slug", { length: 255 }).unique(),
    status: postStatus("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    deletedAt,
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      authorIdIdx: index("idx_posts_author_id").on(table.authorId),
      publishedAtIdx: index("idx_posts_published_at").on(table.publishedAt),
    };
  }
);

export const tags = pgTable("tags", {
  id: id(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

/**
 * PostTags (many-to-many)
 */
export const postTags = pgTable(
  "post_tags",
  {
    id: id(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      uniquePostTag: unique("unique_post_tag").on(table.postId, table.tagId),
      postIdIdx: index("idx_post_tags_post_id").on(table.postId),
      tagIdIdx: index("idx_post_tags_tag_id").on(table.tagId),
    };
  }
);

/**
 * Claps (likes)
 */
export const claps = pgTable(
  "claps",
  {
    id: id(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    clapCount: integer("clap_count").notNull().default(1),
    createdAt,
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

/**
 * Comments (adjacency list)
 */
export const comments = pgTable(
  "comments",
  {
    id: id(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references((): any => comments.id, {
      onDelete: "cascade",
    }),
    content: text("content").notNull(),
    deletedAt,
    createdAt,
  },
  (table) => {
    return {
      postIdIdx: index("idx_comments_post_id").on(table.postId),
      userIdIdx: index("idx_comments_user_id").on(table.userId),
      parentIdIdx: index("idx_comments_parent_id").on(table.parentId),
    };
  }
);

/**
 * Follows (follower -> followee)
 */
export const follows = pgTable(
  "follows",
  {
    id: id(),
    followerId: uuid("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followeeId: uuid("followee_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt,
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

/**
 * Bookmarks
 */
export const bookmarks = pgTable(
  "bookmarks",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    createdAt,
  },
  (table) => {
    return {
      uniqueBookmark: unique("unique_bookmark_user_post").on(
        table.userId,
        table.postId
      ),
      userIdIdx: index("idx_bookmarks_user_id").on(table.userId),
      postIdIdx: index("idx_bookmarks_post_id").on(table.postId),
    };
  }
);
