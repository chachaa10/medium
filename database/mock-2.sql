-- The following script inserts sample data into the provided database schema.
-- It ensures foreign key relationships and unique constraints are respected.
-- ==============================================================================
-- 0. CLEANUP (Ensure idempotence for re-running the script)
-- Note: Dependent tables must be cleared before the parent tables.
-- ==============================================================================
DELETE FROM verifications;

DELETE FROM accounts;

DELETE FROM sessions;

DELETE FROM bookmarks;

DELETE FROM claps;

DELETE FROM comments;

DELETE FROM post_tags;

DELETE FROM posts;

DELETE FROM tags;

DELETE FROM follows;

DELETE FROM users;

-- ==============================================================================
-- 1. USERS and AUTHENTICATION DATA (13 Users total)
-- ==============================================================================
INSERT INTO
  users (id, name, email, email_verified, avatar_url, bio)
VALUES
  (
    'user_1',
    'John Doe',
    'john.doe@example.com',
    TRUE,
    'https://placehold.co/150x150/0000FF/FFFFFF?text=JD',
    'A software engineer and tech enthusiast writing about the future of code.'
  ),
  (
    'user_2',
    'Jane Smith',
    'jane.smith@example.com',
    TRUE,
    'https://placehold.co/150x150/FF0077/FFFFFF?text=JS',
    'Passionate about travel, food, and sustainable living.'
  ),
  (
    'user_3',
    'Alex Johnson',
    'alex.johnson@example.com',
    TRUE,
    'https://placehold.co/150x150/009900/FFFFFF?text=AJ',
    'Science writer focused on physics and cosmology.'
  ),
  (
    'user_4',
    'Maria Garcia',
    'maria.garcia@example.com',
    TRUE,
    'https://placehold.co/150x150/FF8800/FFFFFF?text=MG',
    'Sharing beautiful stories and photos from around the world.'
  ),
  (
    'user_5',
    'Kenji Tanaka',
    'kenji.tanaka@example.com',
    TRUE,
    'https://placehold.co/150x150/8800CC/FFFFFF?text=KT',
    'Full-stack developer specializing in modern JavaScript frameworks.'
  ),
  (
    'user_6',
    'Chloe Brown',
    'chloe.brown@example.com',
    FALSE,
    'https://placehold.co/150x150/AAAAAA/000000?text=CB',
    'New to blogging. Interested in productivity and minimalist design.'
  ),
  (
    'user_7',
    'David Wilson',
    'david.wilson@example.com',
    TRUE,
    'https://placehold.co/150x150/00CCFF/000000?text=DW',
    'Finance analyst providing tips on personal investment.'
  ),
  (
    'user_8',
    'Sofia Lee',
    'sofia.lee@example.com',
    TRUE,
    'https://placehold.co/150x150/FF00FF/FFFFFF?text=SL',
    'Artist and graphic designer exploring digital mediums.'
  ),
  (
    'user_9',
    'Mike Chen',
    'mike.chen@example.com',
    TRUE,
    'https://placehold.co/150x150/CCFF00/000000?text=MC',
    'Early adopter of new technology and gadgets.'
  ),
  (
    'user_10',
    'Emily Davis',
    'emily.davis@example.com',
    TRUE,
    'https://placehold.co/150x150/003366/FFFFFF?text=ED',
    'Home cook sharing easy and delicious recipe guides.'
  ),
  (
    'user_11',
    'Sarah Connor',
    'sarah.connor@example.com',
    TRUE,
    'https://placehold.co/150x150/A0522D/FFFFFF?text=SC',
    'Historian and writer, focusing on late antiquity and medieval periods.'
  ),
  (
    'user_12',
    'Robert Green',
    'robert.green@example.com',
    TRUE,
    'https://placehold.co/150x150/228B22/FFFFFF?text=RG',
    'Certified fitness coach and nutritional expert.'
  ),
  (
    'user_13',
    'Lisa Wong',
    'lisa.wong@example.com',
    TRUE,
    'https://placehold.co/150x150/800080/FFFFFF?text=LW',
    'UX designer passionate about accessibility and clear communication.'
  );

-- Minimal data for authentication tables (Using random base64 strings for unique IDs)
INSERT INTO
  sessions (id, user_id, expires_at, token)
VALUES
  (
    'session_1',
    'user_1',
    NOW () + INTERVAL '1 hour',
    'tok_johndoe_123456'
  );

INSERT INTO
  accounts (id, user_id, provider_id, account_id)
VALUES
  ('acc_1', 'user_1', 'google', 'google_id_12345');

INSERT INTO
  verifications (id, identifier, VALUE, expires_at)
VALUES
  (
    'verif_1',
    'email_token',
    'token_for_chloe',
    NOW () + INTERVAL '30 minutes'
  );

-- ==============================================================================
-- 2. CONTENT DATA (20 Posts total)
-- ==============================================================================
INSERT INTO
  posts (
    post_id,
    author_id,
    title,
    subtitle,
    content,
    slug,
    status,
    published_at
  )
VALUES
  -- Published Posts
  (
    'post_1',
    'user_1',
    'The Rise of Serverless Computing',
    'Why the event-driven architecture is changing the cloud landscape.',
    'Serverless computing is a cloud-native development model that allows developers to build and run applications without having to manage servers. Despite its name, serverless computing still runs on servers, but all the server management is done by the cloud provider.',
    'serverless-computing-rise',
    'published',
    NOW () - INTERVAL '5 days'
  ),
  (
    'post_2',
    'user_2',
    'Ten Dishes You Must Try in Tokyo',
    'A culinary journey through the capital of Japan.',
    'Tokyo''s food scene is a vibrant blend of traditional and modern. From perfect ramen to delicate sushi, every neighborhood offers a new taste experience. Don''t forget to try the street food!',
    'tokyo-culinary-journey',
    'published',
    NOW () - INTERVAL '4 days'
  ),
  (
    'post_3',
    'user_3',
    'Quantum Entanglement Explained',
    'Understanding "spooky action at a distance" for beginners.',
    'Quantum entanglement is a phenomenon where two or more particles become linked in such a way that measuring a property of one instantaneously determines the corresponding property of the other, regardless of the distance between them.',
    'quantum-entanglement-explained',
    'published',
    NOW () - INTERVAL '3 days'
  ),
  (
    'post_4',
    'user_4',
    'Backpacking Through Southeast Asia',
    'Tips and budget guides for a 6-month adventure.',
    'Southeast Asia is a backpacker''s paradise: affordable, beautiful, and rich in culture. Planning your route is essential, but remember to leave room for spontaneous changes.',
    'backpacking-southeast-asia-guide',
    'published',
    NOW () - INTERVAL '2 days'
  ),
  (
    'post_5',
    'user_5',
    'Advanced CSS Grid Layouts',
    'Mastering the power of the grid for responsive design.',
    'CSS Grid provides a two-dimensional layout system for the web. It is a powerful tool for designing complex, responsive layouts more easily and consistently across different browsers.',
    'advanced-css-grid-layouts',
    'published',
    NOW () - INTERVAL '1 day'
  ),
  (
    'post_6',
    'user_7',
    'The Basics of Index Fund Investing',
    'A simple strategy for long-term wealth building.',
    'Index funds offer a low-cost, low-effort way to invest in the stock market. They track a market index, providing broad diversification and consistent returns over time.',
    'basics-of-index-fund-investing',
    'published',
    NOW () - INTERVAL '12 hours'
  ),
  (
    'post_7',
    'user_8',
    'Oil Painting Techniques for Beginners',
    'Starting your journey with traditional mediums.',
    'Oil painting can be intimidating, but a few basic techniques—like layering and blending—can get you started. Focus on composition and light first.',
    'oil-painting-techniques-beginners',
    'published',
    NOW () - INTERVAL '8 hours'
  ),
  (
    'post_8',
    'user_9',
    'Review: The Latest Smartphone Camera',
    'Is the new flagship worth the upgrade just for the lens?',
    'We put the new smartphone camera through its paces. While the hardware is impressive, the software post-processing still leaves room for improvement, especially in low light.',
    'latest-smartphone-camera-review',
    'published',
    NOW () - INTERVAL '6 hours'
  ),
  (
    'post_9',
    'user_10',
    'My Secret to Fluffy Pancakes',
    'A simple ingredient tweak that changes everything.',
    'Forget buttermilk! The secret to truly fluffy pancakes lies in gently folding in whipped egg whites. It adds airiness without sacrificing flavor.',
    'secret-fluffy-pancakes',
    'published',
    NOW () - INTERVAL '4 hours'
  ),
  (
    'post_10',
    'user_5',
    '10 Essential VS Code Extensions',
    'Boost your productivity as a JavaScript developer.',
    'From better syntax highlighting to integrated Git control, these extensions are mandatory for any serious coding setup.',
    'essential-vscode-extensions',
    'published',
    NOW () - INTERVAL '2 hours'
  ),
  (
    'post_11',
    'user_1',
    'Rust vs. Go: Which Should You Learn?',
    'Comparing performance, concurrency, and community support.',
    'Both Rust and Go offer compelling modern features, but they target different use cases. Go excels at simple, fast backend services, while Rust is perfect for performance-critical systems.',
    'rust-vs-go-comparison',
    'published',
    NOW () - INTERVAL '1 hour'
  ),
  (
    'post_16',
    'user_11',
    'The Forgotten Roman Emperors',
    'A look at the often-overlooked figures of the 3rd century crisis.',
    'The 3rd Century Crisis was a period of immense turmoil in the Roman Empire. Many emperors reigned for only a short time, often dying violently. Their reigns, though brief, were pivotal in shaping the later Roman world.',
    'forgotten-roman-emperorS',
    'published',
    NOW () - INTERVAL '1 day 4 hours'
  ),
  (
    'post_17',
    'user_12',
    'Intermittent Fasting: Is It Right For You?',
    'Breaking down the science, benefits, and common pitfalls of IF.',
    'Intermittent fasting (IF) is an eating pattern that cycles between periods of eating and fasting. It is often touted for weight loss, but it has other potential benefits like improved metabolic health. Consult a doctor before starting.',
    'intermittent-fasting-guide',
    'published',
    NOW () - INTERVAL '1 day 3 hours'
  ),
  (
    'post_18',
    'user_13',
    'Principles of Good UX Writing',
    'Making your product speak clearly and humanly.',
    'UX writing focuses on all the words users see when interacting with a product—from button labels to error messages. Clarity, brevity, and consistency are the three pillars of effective UX writing.',
    'principles-of-ux-writing',
    'published',
    NOW () - INTERVAL '18 hours'
  ),
  (
    'post_19',
    'user_4',
    'Review: The New Lightweight Travel Camera',
    'The perfect companion for the nomadic photographer.',
    'This new mirrorless camera is a game-changer for travelers. It offers professional-grade quality in a body that won''t weigh down your backpack. Battery life is also significantly improved.',
    'lightweight-travel-camera-review',
    'published',
    NOW () - INTERVAL '10 hours'
  ),
  -- Archived Post
  (
    'post_12',
    'user_6',
    'My First Attempt at Journaling',
    'Initial thoughts on developing a daily habit.',
    'The first few days were tough, but I managed to stick with it. I focused on morning pages to clear my mind. I might try different prompts next week.',
    'my-first-journaling-attempt',
    'archived',
    NOW () - INTERVAL '2 months'
  ),
  -- Draft Posts
  (
    'post_13',
    'user_1',
    'Future of AI in Web Development',
    'Drafting an article on how LLMs will change front-end workflows.',
    'Initial draft: LLMs are moving beyond simple code generation. We are seeing models that can interpret wireframes and produce functional components.',
    'future-ai-web-dev',
    'draft',
    NULL
  ),
  (
    'post_14',
    'user_3',
    'The Search for Exoplanets',
    'A review of the James Webb Space Telescope''s recent findings.',
    'A detailed look at the new data from JWST regarding atmospheric compositions of distant worlds.',
    'search-for-exoplanets-jwst',
    'draft',
    NULL
  ),
  (
    'post_15',
    'user_4',
    'Exploring Iceland''s Ring Road',
    'A photo essay and guide for the ultimate road trip.',
    'Starting the Ring Road journey next month. Need to finalize the packing list and accommodation details for the northern section.',
    'exploring-iceland-ring-road',
    'draft',
    NULL
  ),
  (
    'post_20',
    'user_1',
    'Deep Dive into WebAssembly',
    'How WASM is pushing the boundaries of browser performance.',
    'WebAssembly (WASM) is a binary instruction format for a stack-based virtual machine. It is designed as a portable compilation target for high-level languages like C/C++/Rust, enabling client-side web execution at near-native speed.',
    'webassembly-deep-dive',
    'draft',
    NULL
  );

-- ==============================================================================
-- 3. TAGS AND POST_TAGS (9 Tags total)
-- ==============================================================================
INSERT INTO
  tags (tag_id, name)
VALUES
  ('tag_1', 'Technology'),
  ('tag_2', 'Programming'),
  ('tag_3', 'Science'),
  ('tag_4', 'Food & Drink'),
  ('tag_5', 'Travel'),
  ('tag_6', 'Finance'),
  ('tag_7', 'Art'),
  ('tag_8', 'History'),
  ('tag_9', 'Health');

INSERT INTO
  post_tags (id, post_id, tag_id)
VALUES
  ('pt_1', 'post_1', 'tag_1'),
  ('pt_2', 'post_1', 'tag_2'), -- Serverless: Tech, Programming
  ('pt_3', 'post_2', 'tag_4'),
  ('pt_4', 'post_2', 'tag_5'), -- Tokyo: Food, Travel
  ('pt_5', 'post_3', 'tag_3'), -- Entanglement: Science
  ('pt_6', 'post_4', 'tag_5'), -- Backpacking: Travel
  ('pt_7', 'post_5', 'tag_2'), -- CSS Grid: Programming
  ('pt_8', 'post_6', 'tag_6'), -- Index Fund: Finance
  ('pt_9', 'post_7', 'tag_7'), -- Oil Painting: Art
  ('pt_10', 'post_8', 'tag_1'), -- Smartphone Review: Technology
  ('pt_11', 'post_9', 'tag_4'), -- Pancakes: Food & Drink
  ('pt_12', 'post_10', 'tag_2'),
  ('pt_13', 'post_10', 'tag_1'), -- VS Code: Programming, Tech
  ('pt_14', 'post_11', 'tag_2'), -- Rust vs Go: Programming
  ('pt_15', 'post_12', 'tag_7'), -- Journaling (Archived post tagged Art/Lifestyle)
  ('pt_16', 'post_16', 'tag_8'), -- Roman Emperors: History
  ('pt_17', 'post_17', 'tag_9'), -- Intermittent Fasting: Health
  ('pt_18', 'post_18', 'tag_1'),
  ('pt_19', 'post_18', 'tag_2'), -- UX Writing: Tech, Programming (Design context)
  ('pt_20', 'post_19', 'tag_5'),
  ('pt_21', 'post_19', 'tag_1'), -- Camera Review: Travel, Tech
  ('pt_22', 'post_20', 'tag_2'),
  ('pt_23', 'post_20', 'tag_1');

-- WebAssembly: Programming, Tech
-- ==============================================================================
-- 4. CLAPS (11 Clap records total)
-- ==============================================================================
INSERT INTO
  claps (clap_id, post_id, user_id, clap_count, created_at)
VALUES
  -- High engagement post (post_1)
  (
    'clap_1',
    'post_1',
    'user_2',
    50,
    NOW () - INTERVAL '4 days'
  ),
  (
    'clap_2',
    'post_1',
    'user_3',
    30,
    NOW () - INTERVAL '3 days'
  ),
  (
    'clap_3',
    'post_1',
    'user_4',
    50,
    NOW () - INTERVAL '2 days'
  ),
  -- Medium engagement post (post_5)
  (
    'clap_4',
    'post_5',
    'user_1',
    25,
    NOW () - INTERVAL '12 hours'
  ),
  (
    'clap_5',
    'post_5',
    'user_10',
    50,
    NOW () - INTERVAL '10 hours'
  ),
  -- Low engagement post (post_7)
  (
    'clap_6',
    'post_7',
    'user_6',
    15,
    NOW () - INTERVAL '7 hours'
  ),
  -- Post 11 clapped by author 10 (user_10)
  (
    'clap_7',
    'post_11',
    'user_10',
    42,
    NOW () - INTERVAL '30 minutes'
  ),
  -- New Claps
  (
    'clap_8',
    'post_17',
    'user_5',
    50,
    NOW () - INTERVAL '1 day'
  ),
  (
    'clap_9',
    'post_17',
    'user_1',
    30,
    NOW () - INTERVAL '1 day'
  ),
  (
    'clap_10',
    'post_18',
    'user_9',
    45,
    NOW () - INTERVAL '15 hours'
  ),
  (
    'clap_11',
    'post_16',
    'user_2',
    20,
    NOW () - INTERVAL '1 day 2 hours'
  );

-- ==============================================================================
-- 5. COMMENTS (9 Comment records total, including replies)
-- ==============================================================================
INSERT INTO
  comments (
    comment_id,
    post_id,
    user_id,
    parent_id,
    content,
    created_at
  )
VALUES
  -- Comment on post_1 (Serverless)
  (
    'com_1',
    'post_1',
    'user_2',
    NULL,
    'Great summary! I''ve been wondering about the cost implications for large-scale applications.',
    NOW () - INTERVAL '3 days'
  ),
  -- Reply to com_1
  (
    'com_2',
    'post_1',
    'user_1',
    'com_1',
    'That''s a fair point. It definitely depends on your usage patterns and cold start sensitivity.',
    NOW () - INTERVAL '3 days' + INTERVAL '1 hour'
  ),
  -- Another top-level comment on post_1
  (
    'com_3',
    'post_1',
    'user_5',
    NULL,
    'Do you have a preferred cloud provider for starting a serverless project?',
    NOW () - INTERVAL '2 days'
  ),
  -- Comment on post_3 (Quantum Entanglement)
  (
    'com_4',
    'post_3',
    'user_7',
    NULL,
    'Fascinating, but is it possible for us to harness this technology yet?',
    NOW () - INTERVAL '1 day'
  ),
  -- Comment on post_9 (Pancakes)
  (
    'com_5',
    'post_9',
    'user_2',
    NULL,
    'Whipped egg whites! I''m trying this for breakfast tomorrow, thank you!',
    NOW () - INTERVAL '3 hours'
  ),
  -- Reply to com_5
  (
    'com_6',
    'post_9',
    'user_10',
    'com_5',
    'You won''t regret it, Jane! The difference is night and day.',
    NOW () - INTERVAL '2 hours'
  ),
  -- New Comments
  -- Comment on post_17 (Fasting)
  (
    'com_7',
    'post_17',
    'user_4',
    NULL,
    'This was really helpful. I always wondered about the difference between 16/8 and 5:2.',
    NOW () - INTERVAL '1 day 1 hour'
  ),
  -- Reply to com_7
  (
    'com_8',
    'post_17',
    'user_12',
    'com_7',
    'Glad you found it useful! The 16/8 is generally easier for beginners.',
    NOW () - INTERVAL '23 hours'
  ),
  -- Comment on post_18 (UX Writing)
  (
    'com_9',
    'post_18',
    'user_1',
    NULL,
    'I agree, clarity is everything. Have you written anything about microcopy?',
    NOW () - INTERVAL '10 hours'
  );

-- ==============================================================================
-- 6. FOLLOWS (11 Follow relationships total)
-- ==============================================================================
INSERT INTO
  follows (follow_id, follower_id, followee_id)
VALUES
  ('fol_1', 'user_2', 'user_1'), -- Jane follows John
  ('fol_2', 'user_3', 'user_1'), -- Alex follows John
  ('fol_3', 'user_1', 'user_2'), -- John follows Jane (mutual)
  ('fol_4', 'user_5', 'user_2'), -- Kenji follows Jane
  ('fol_5', 'user_9', 'user_5'), -- Mike follows Kenji (for programming tips)
  ('fol_6', 'user_7', 'user_6'), -- David follows Chloe
  ('fol_7', 'user_8', 'user_3'), -- Sofia follows Alex (for science)
  ('fol_8', 'user_10', 'user_7'), -- Emily follows David (for finance)
  -- New Follows
  ('fol_9', 'user_13', 'user_5'), -- Lisa follows Kenji (Tech/Programming)
  ('fol_10', 'user_11', 'user_4'), -- Sarah follows Maria (Travel)
  ('fol_11', 'user_12', 'user_13');

-- Robert follows Lisa
-- ==============================================================================
-- 7. BOOKMARKS (7 Bookmark records total)
-- ==============================================================================
INSERT INTO
  bookmarks (bookmark_id, user_id, post_id, created_at)
VALUES
  (
    'book_1',
    'user_1',
    'post_6',
    NOW () - INTERVAL '1 day'
  ), -- John bookmarks Finance
  (
    'book_2',
    'user_2',
    'post_4',
    NOW () - INTERVAL '2 days'
  ), -- Jane bookmarks Travel
  (
    'book_3',
    'user_5',
    'post_1',
    NOW () - INTERVAL '6 hours'
  ), -- Kenji bookmarks Serverless
  (
    'book_4',
    'user_7',
    'post_3',
    NOW () - INTERVAL '1 hour'
  ), -- David bookmarks Quantum
  (
    'book_5',
    'user_10',
    'post_10',
    NOW () - INTERVAL '30 minutes'
  ), -- Emily bookmarks VS Code
  -- New Bookmarks
  (
    'book_6',
    'user_3',
    'post_17',
    NOW () - INTERVAL '5 hours'
  ), -- Alex bookmarks Health
  (
    'book_7',
    'user_13',
    'post_5',
    NOW () - INTERVAL '4 hours'
  );

-- Lisa bookmarks CSS Grid