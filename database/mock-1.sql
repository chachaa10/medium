-- QUERY TRUNCATED
-- The following script inserts sample data into the provided database schema.
-- It ensures foreign key relationships and unique constraints are respected.
-- ==============================================================================
-- 1. USERS and AUTHENTICATION DATA (10 Users)
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
-- 2. CONTENT DATA (15 Posts)
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
  );

-- ==============================================================================
-- 3. TAGS AND POST_TAGS
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
  ('tag_7', 'Art');

INSERT INTO
  post_tags (id, post_id, tag_id)
VALUES
  ('pt_1', 'post_1', 'tag_1'),
  ('pt_2', 'post_1', 'tag_2'), -- Serverless: Tech, Progra