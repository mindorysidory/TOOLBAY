-- TOOLBAY Database Seed Script
-- Populate database with existing mock tools data

-- First, create some sample users (IP-based)
INSERT INTO users (ip_fingerprint, trust_score, total_contributions) VALUES
('ip_192_168_1_100', 85, 12),
('ip_10_0_0_50', 72, 8),
('ip_203_0_113_25', 91, 15),
('ip_198_51_100_10', 45, 3),
('ip_172_16_0_1', 68, 7);

-- Get user IDs for reference
WITH sample_users AS (
    SELECT id, trust_score FROM users ORDER BY created_at LIMIT 5
)

-- Insert tools from mock data
INSERT INTO tools (
    name, description, url, favicon, category_id, pricing, 
    average_rating, total_votes, total_opinions, meta_title, 
    meta_description, tags, is_sponsored, submitted_by
) VALUES
-- AI Tools
('ChatGPT', 'Conversational AI assistant by OpenAI. Supports Q&A, text generation, code writing, and various professional tasks.', 'https://chat.openai.com', 'https://chat.openai.com/favicon.ico', 'ai-tools', 'freemium', 4.5, 1234, 89, 'ChatGPT', 'Conversational AI assistant by OpenAI', ARRAY['AI', 'Chatbot', 'Text Generation'], false, (SELECT id FROM users ORDER BY created_at LIMIT 1)),

('Claude', 'Safe and helpful AI assistant by Anthropic. Specialized in long-form document analysis and creative writing.', 'https://claude.ai', 'https://claude.ai/favicon.ico', 'ai-tools', 'freemium', 4.3, 987, 67, 'Claude', 'Safe and helpful AI assistant by Anthropic', ARRAY['AI', 'Writing', 'Analysis'], false, (SELECT id FROM users ORDER BY created_at LIMIT 1)),

('Midjourney', 'AI image generation tool that creates stunning visuals from text prompts. Popular among artists and designers.', 'https://www.midjourney.com', 'https://www.midjourney.com/favicon.ico', 'ai-tools', 'subscription', 4.7, 2156, 134, 'Midjourney', 'AI image generation tool', ARRAY['AI', 'Image Generation', 'Art'], false, (SELECT id FROM users ORDER BY created_at OFFSET 1 LIMIT 1)),

('DALL-E 3', 'OpenAI''s latest AI image generator. Creates high-quality images from detailed text descriptions.', 'https://openai.com/dall-e-3', 'https://openai.com/favicon.ico', 'ai-tools', 'freemium', 4.6, 1543, 98, 'DALL-E 3', 'OpenAI''s latest AI image generator', ARRAY['AI', 'Image Generation'], false, (SELECT id FROM users ORDER BY created_at OFFSET 2 LIMIT 1)),

('Stable Diffusion', 'Open-source AI image generation model. Capable of creating images in various styles and formats.', 'https://stablediffusionweb.com', 'https://stablediffusionweb.com/favicon.ico', 'ai-tools', 'free', 4.2, 2341, 156, 'Stable Diffusion', 'Open-source AI image generation model', ARRAY['AI', 'Image Generation', 'Open Source'], false, (SELECT id FROM users ORDER BY created_at OFFSET 3 LIMIT 1)),

('Perplexity AI', 'AI-powered search engine that provides accurate answers based on real-time information and sources.', 'https://www.perplexity.ai', 'https://www.perplexity.ai/favicon.ico', 'ai-tools', 'freemium', 4.5, 2089, 125, 'Perplexity AI', 'AI-powered search engine', ARRAY['AI', 'Search', 'Research'], false, (SELECT id FROM users ORDER BY created_at OFFSET 4 LIMIT 1)),

('GitHub Copilot', 'AI pair programming tool that provides real-time code suggestions and autocompletion.', 'https://github.com/features/copilot', 'https://github.com/favicon.ico', 'ai-tools', 'subscription', 4.4, 1876, 112, 'GitHub Copilot', 'AI pair programming tool', ARRAY['AI', 'Coding', 'Development'], false, (SELECT id FROM users ORDER BY created_at LIMIT 1)),

('RunwayML', 'AI video editing and generation tool. Create and edit videos using text prompts and AI models.', 'https://runwayml.com', 'https://runwayml.com/favicon.ico', 'ai-tools', 'freemium', 4.4, 1287, 93, 'RunwayML', 'AI video editing and generation tool', ARRAY['AI', 'Video', 'Editing'], false, (SELECT id FROM users ORDER BY created_at OFFSET 1 LIMIT 1)),

('Luma AI', 'AI tool for creating 3D models and videos from simple inputs. Revolutionizing 3D content creation.', 'https://lumalabs.ai', 'https://lumalabs.ai/favicon.ico', 'ai-tools', 'freemium', 4.1, 743, 52, 'Luma AI', 'AI tool for creating 3D models and videos', ARRAY['AI', '3D', 'Video'], false, (SELECT id FROM users ORDER BY created_at OFFSET 2 LIMIT 1)),

('DeepL', 'AI-powered translation service that provides natural and accurate translations between languages.', 'https://www.deepl.com', 'https://www.deepl.com/favicon.ico', 'ai-tools', 'freemium', 4.7, 2987, 187, 'DeepL', 'AI-powered translation service', ARRAY['AI', 'Translation', 'Language'], false, (SELECT id FROM users ORDER BY created_at OFFSET 3 LIMIT 1)),

('Jasper AI', 'AI writing tool specialized for marketing content. Generates blogs, ad copy, and social media posts.', 'https://www.jasper.ai', 'https://www.jasper.ai/favicon.ico', 'ai-tools', 'subscription', 4.0, 876, 54, 'Jasper AI', 'AI writing tool specialized for marketing content', ARRAY['AI', 'Marketing', 'Content'], true, (SELECT id FROM users ORDER BY created_at OFFSET 4 LIMIT 1)),

-- Productivity Tools
('Notion', 'All-in-one workspace that combines notes, databases, kanban boards, and project management.', 'https://www.notion.so', 'https://www.google.com/s2/favicons?sz=64&domain=notion.so', 'productivity', 'freemium', 4.6, 4567, 312, 'Notion', 'All-in-one workspace', ARRAY['Productivity', 'Notes', 'Collaboration'], false, (SELECT id FROM users ORDER BY created_at LIMIT 1)),

('Trello', 'Visual project management tool using boards, lists, and cards for organizing tasks and workflows.', 'https://trello.com', 'https://trello.com/favicon.ico', 'productivity', 'freemium', 4.3, 5432, 389, 'Trello', 'Visual project management tool', ARRAY['Project Management', 'Kanban'], false, (SELECT id FROM users ORDER BY created_at OFFSET 1 LIMIT 1)),

('Slack', 'Business communication platform that brings team conversations into one place with channels and integrations.', 'https://slack.com', 'https://slack.com/favicon.ico', 'productivity', 'freemium', 4.2, 6789, 567, 'Slack', 'Business communication platform', ARRAY['Collaboration', 'Communication'], false, (SELECT id FROM users ORDER BY created_at OFFSET 2 LIMIT 1)),

('Asana', 'Work management platform that helps teams organize, track, and manage their projects and tasks.', 'https://asana.com', 'https://asana.com/favicon.ico', 'productivity', 'freemium', 4.4, 4321, 298, 'Asana', 'Work management platform', ARRAY['Project Management', 'Tasks'], false, (SELECT id FROM users ORDER BY created_at OFFSET 3 LIMIT 1)),

('Google Workspace', 'Suite of cloud computing, productivity and collaboration tools developed by Google.', 'https://workspace.google.com', 'https://workspace.google.com/favicon.ico', 'productivity', 'freemium', 4.5, 8765, 623, 'Google Workspace', 'Suite of cloud computing and productivity tools', ARRAY['Office Suite', 'Cloud'], false, (SELECT id FROM users ORDER BY created_at OFFSET 4 LIMIT 1)),

-- Web Services
('GitHub', 'Web-based version control and collaboration platform for software developers using Git.', 'https://github.com', 'https://github.com/favicon.ico', 'web-services', 'freemium', 4.7, 8900, 654, 'GitHub', 'Web-based version control and collaboration platform', ARRAY['Development', 'Collaboration'], false, (SELECT id FROM users ORDER BY created_at LIMIT 1)),

('Discord', 'Digital communication platform designed for creating communities and real-time messaging.', 'https://discord.com', 'https://discord.com/favicon.ico', 'web-services', 'freemium', 4.4, 7600, 567, 'Discord', 'Digital communication platform', ARRAY['Communication', 'Gaming'], false, (SELECT id FROM users ORDER BY created_at OFFSET 1 LIMIT 1)),

('Spotify', 'Digital music streaming service that gives access to millions of songs and podcasts.', 'https://spotify.com', 'https://spotify.com/favicon.ico', 'web-services', 'freemium', 4.5, 9800, 712, 'Spotify', 'Digital music streaming service', ARRAY['Music', 'Streaming'], false, (SELECT id FROM users ORDER BY created_at OFFSET 2 LIMIT 1)),

-- Design Tools
('Figma', 'Collaborative web application for interface design with real-time collaboration features.', 'https://figma.com', 'https://www.google.com/s2/favicons?sz=64&domain=figma.com', 'design-tools', 'freemium', 4.8, 6700, 456, 'Figma', 'Collaborative web application for interface design', ARRAY['UI/UX', 'Collaboration'], false, (SELECT id FROM users ORDER BY created_at LIMIT 1)),

('Adobe Photoshop', 'Industry-standard raster graphics editor for photo editing and digital art creation.', 'https://photoshop.adobe.com', 'https://photoshop.adobe.com/favicon.ico', 'design-tools', 'subscription', 4.6, 8900, 623, 'Adobe Photoshop', 'Industry-standard raster graphics editor', ARRAY['Image Editing', 'Adobe'], false, (SELECT id FROM users ORDER BY created_at OFFSET 1 LIMIT 1)),

-- Developer Tools
('Visual Studio Code', 'Lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js.', 'https://code.visualstudio.com', 'https://code.visualstudio.com/favicon.ico', 'developer', 'free', 4.8, 12000, 890, 'Visual Studio Code', 'Lightweight but powerful source code editor', ARRAY['Code Editor', 'Microsoft'], false, (SELECT id FROM users ORDER BY created_at LIMIT 1)),

('Chrome DevTools', 'Set of web developer tools built directly into the Google Chrome browser for debugging and optimization.', 'https://developers.google.com/web/tools/chrome-devtools', 'https://developers.google.com/favicon.ico', 'developer', 'free', 4.7, 9800, 712, 'Chrome DevTools', 'Web developer tools built into Chrome browser', ARRAY['Browser', 'Debugging'], false, (SELECT id FROM users ORDER BY created_at OFFSET 1 LIMIT 1)),

('Postman', 'Collaboration platform for API development that simplifies building and using APIs.', 'https://postman.com', 'https://postman.com/favicon.ico', 'developer', 'freemium', 4.4, 8700, 634, 'Postman', 'Collaboration platform for API development', ARRAY['API', 'Testing'], false, (SELECT id FROM users ORDER BY created_at OFFSET 2 LIMIT 1));

-- Insert sample opinions
INSERT INTO opinions (tool_id, user_id, content, rating, vote_score, total_votes, trust_score) 
VALUES
((SELECT id FROM tools WHERE name = 'ChatGPT'), (SELECT id FROM users ORDER BY created_at LIMIT 1), 'ChatGPT is truly an innovative tool. It has been incredibly helpful for code reviews and debugging in development work. Especially when asking for complex algorithm explanations, it explains things in an easy-to-understand way.', 5, 23, 28, 85),

((SELECT id FROM tools WHERE name = 'ChatGPT'), (SELECT id FROM users ORDER BY created_at OFFSET 1 LIMIT 1), 'It helps a lot with creative activities, but sometimes provides inaccurate information, so fact-checking is essential. Still, it''s really useful for idea generation and drafting!', 4, 15, 20, 72),

((SELECT id FROM tools WHERE name = 'Figma'), (SELECT id FROM users ORDER BY created_at OFFSET 2 LIMIT 1), 'The quality of collaborative design work is excellent, and it supports real-time editing. However, performance can be slow with very large files.', 4, 8, 12, 91),

((SELECT id FROM tools WHERE name = 'Notion'), (SELECT id FROM users ORDER BY created_at OFFSET 3 LIMIT 1), 'It really helps a lot when organizing projects and documentation. But I think the learning curve is steep. It''s better to start with simple templates.', 4, -2, 8, 45),

((SELECT id FROM tools WHERE name = 'GitHub'), (SELECT id FROM users ORDER BY created_at OFFSET 4 LIMIT 1), 'I''m using it for all my development projects and collaboration. It''s excellent for version control, but the UI could be more intuitive for beginners.', 5, 12, 15, 68);

-- Insert sample votes
INSERT INTO votes (opinion_id, user_id, vote_type) 
SELECT 
    o.id,
    (SELECT id FROM users WHERE id != o.user_id ORDER BY RANDOM() LIMIT 1),
    (ARRAY['up', 'down'])[floor(random() * 2) + 1]
FROM opinions o
LIMIT 20;

-- Insert sample tool ratings
INSERT INTO tool_ratings (tool_id, user_id, rating)
SELECT 
    t.id,
    u.id,
    floor(random() * 5) + 1
FROM tools t
CROSS JOIN users u
WHERE random() < 0.3  -- Only rate 30% of tool-user combinations
LIMIT 50;

-- Update tool statistics (this will be handled by triggers, but let's ensure it's correct)
UPDATE tools SET 
    average_rating = (
        SELECT COALESCE(AVG(rating::DECIMAL), 0)
        FROM tool_ratings 
        WHERE tool_id = tools.id
    ),
    total_votes = (
        SELECT COUNT(*)
        FROM tool_ratings 
        WHERE tool_id = tools.id
    ),
    total_opinions = (
        SELECT COUNT(*)
        FROM opinions 
        WHERE tool_id = tools.id AND is_approved = TRUE
    );

-- Insert activity log entries
INSERT INTO activity_log (user_id, action, entity_type, entity_id, metadata, ip_address)
SELECT 
    submitted_by,
    'tool_added',
    'tool',
    id,
    json_build_object('tool_name', name, 'category', category_id),
    '192.168.1.100'::inet
FROM tools
WHERE submitted_by IS NOT NULL;

INSERT INTO activity_log (user_id, action, entity_type, entity_id, metadata, ip_address)
SELECT 
    user_id,
    'opinion_posted',
    'opinion',
    id,
    json_build_object('rating', rating, 'content_length', length(content)),
    '192.168.1.100'::inet
FROM opinions;

-- Verify the data
SELECT 'Tools inserted: ' || COUNT(*) FROM tools;
SELECT 'Opinions inserted: ' || COUNT(*) FROM opinions;
SELECT 'Votes inserted: ' || COUNT(*) FROM votes;
SELECT 'Ratings inserted: ' || COUNT(*) FROM tool_ratings;
SELECT 'Users created: ' || COUNT(*) FROM users;
SELECT 'Activity logs: ' || COUNT(*) FROM activity_log;