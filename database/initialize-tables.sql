-- reusable function to automatically update 'updated_at' columns on row change
CREATE
OR REPLACE FUNCTION update_timestamp () RETURNS TRIGGER AS '
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
' LANGUAGE plpgsql;

--------------------------------------------------------------------------------
-- Users and Authentication Tables
--------------------------------------------------------------------------------
CREATE TABLE
  users (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    image TEXT,
    bio TEXT,
    avatar_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
  );

-- Trigger for users table
CREATE TRIGGER set_users_updated_at BEFORE
UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_timestamp ();

CREATE TABLE
  sessions (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL UNIQUE,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
  );

-- Trigger for sessions table
CREATE TRIGGER set_sessions_updated_at BEFORE
UPDATE ON sessions FOR EACH ROW EXECUTE PROCEDURE update_timestamp ();

CREATE TABLE
  accounts (
    "id" text NOT NULL PRIMARY key,
    account_id TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    provider_id TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    id_token TEXT,
    access_token_expires_at TIMESTAMPTZ,
    refresh_token_expires_at TIMESTAMPTZ,
    SCOPE TEXT,
    password TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    UNIQUE (user_id, provider_id)
  );

-- Trigger for accounts table
CREATE TRIGGER set_accounts_updated_at BEFORE
UPDATE ON accounts FOR EACH ROW EXECUTE PROCEDURE update_timestamp ();

CREATE TABLE
  verifications (
    id TEXT NOT NULL PRIMARY KEY,
    identifier TEXT NOT NULL,
    VALUE TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
  );

-- Trigger for verifications table
CREATE TRIGGER set_verifications_updated_at BEFORE
UPDATE ON verifications FOR EACH ROW EXECUTE PROCEDURE update_timestamp ();

--------------------------------------------------------------------------------
-- Content and Interaction Tables
--------------------------------------------------------------------------------
CREATE TABLE
  posts (
    post_id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    content TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE,
    status VARCHAR(10) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
  );

-- Trigger for posts table
CREATE TRIGGER set_posts_updated_at BEFORE
UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_timestamp ();

CREATE TABLE
  tags (
    tag_id TEXT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
  );

CREATE TABLE
  post_tags (
    id text PRIMARY KEY,
    post_id TEXT NOT NULL REFERENCES posts (post_id) ON DELETE CASCADE,
    tag_id TEXT NOT NULL REFERENCES tags (tag_id) ON DELETE CASCADE,
    UNIQUE (post_id, tag_id)
  );

CREATE TABLE
  claps (
    clap_id text PRIMARY KEY,
    post_id TEXT NOT NULL REFERENCES posts (post_id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    clap_count INT NOT NULL CHECK (clap_count >= 1),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (post_id, user_id)
  );

CREATE TABLE
  comments (
    comment_id text PRIMARY KEY,
    post_id TEXT NOT NULL REFERENCES posts (post_id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    parent_id TEXT REFERENCES comments (comment_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  follows (
    follow_id text PRIMARY KEY,
    follower_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    followee_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE (follower_id, followee_id),
    CHECK (follower_id != followee_id)
  );

CREATE TABLE
  bookmarks (
    bookmark_id text PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    post_id TEXT NOT NULL REFERENCES posts (post_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, post_id)
  );

--------------------------------------------------------------------------------
-- Indexes for Performance
--------------------------------------------------------------------------------
CREATE UNIQUE INDEX idx_users_email ON users (email);

CREATE INDEX idx_sessions_user_id ON sessions (user_id);

CREATE INDEX idx_accounts_user_id ON accounts (user_id);

CREATE INDEX idx_posts_author_id ON posts (author_id);

CREATE INDEX idx_comments_post_id ON comments (post_id);

CREATE INDEX idx_comments_user_id ON comments (user_id);

CREATE INDEX idx_claps_post_id ON claps (post_id);

CREATE INDEX idx_claps_user_id ON claps (user_id);

CREATE INDEX idx_follows_follower_id ON follows (follower_id);

CREATE INDEX idx_follows_followee_id ON follows (followee_id);