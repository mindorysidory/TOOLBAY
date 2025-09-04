export interface ToolData {
  id: string;
  name: string;
  description: string;
  url: string;
  favicon: string;
  category: string;
  pricing: string;
  averageRating: number;
  totalVotes: number;
  totalOpinions: number;
  tags: string[];
  isSponsored: boolean;
  createdAt: string;
}

export const allTools: ToolData[] = [
  // AI Tools (20 popular AI tools)
  {
    id: '1', name: 'ChatGPT', description: 'Conversational AI assistant by OpenAI. Supports Q&A, text generation, code writing, and various professional tasks.',
    url: 'https://chat.openai.com', favicon: 'https://chat.openai.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.5, totalVotes: 1234, totalOpinions: 89, tags: ['AI', 'Chatbot', 'Text Generation'], isSponsored: false, createdAt: '2024-01-15T09:30:00Z'
  },
  {
    id: '2', name: 'Claude', description: 'Safe and helpful AI assistant by Anthropic. Specialized in long-form document analysis and creative writing.',
    url: 'https://claude.ai', favicon: 'https://claude.ai/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.3, totalVotes: 987, totalOpinions: 67, tags: ['AI', 'Writing', 'Analysis'], isSponsored: false, createdAt: '2024-01-10T11:15:00Z'
  },
  {
    id: '3', name: 'Midjourney', description: 'AI image generation tool that creates stunning visuals from text prompts. Popular among artists and designers.',
    url: 'https://www.midjourney.com', favicon: 'https://www.midjourney.com/favicon.ico', category: 'ai-tools', pricing: 'subscription', averageRating: 4.7, totalVotes: 2156, totalOpinions: 134, tags: ['AI', 'Image Generation', 'Art'], isSponsored: false, createdAt: '2024-01-05T08:20:00Z'
  },
  {
    id: '4', name: 'DALL-E 3', description: 'OpenAI\'s latest AI image generator. Creates high-quality images from detailed text descriptions.',
    url: 'https://openai.com/dall-e-3', favicon: 'https://openai.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.6, totalVotes: 1543, totalOpinions: 98, tags: ['AI', 'Image Generation'], isSponsored: false, createdAt: '2025-01-03T10:20:00Z'
  },
  {
    id: '5', name: 'Stable Diffusion', description: 'Open-source AI image generation model. Capable of creating images in various styles and formats.',
    url: 'https://stablediffusionweb.com', favicon: 'https://stablediffusionweb.com/favicon.ico', category: 'ai-tools', pricing: 'free', averageRating: 4.2, totalVotes: 2341, totalOpinions: 156, tags: ['AI', 'Image Generation', 'Open Source'], isSponsored: false, createdAt: '2025-01-01T08:00:00Z'
  },
  {
    id: '6', name: 'Perplexity AI', description: 'AI-powered search engine that provides accurate answers based on real-time information and sources.',
    url: 'https://www.perplexity.ai', favicon: 'https://www.perplexity.ai/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.5, totalVotes: 2089, totalOpinions: 125, tags: ['AI', 'Search', 'Research'], isSponsored: false, createdAt: '2025-01-02T07:45:00Z'
  },
  {
    id: '7', name: 'GitHub Copilot', description: 'AI pair programming tool that provides real-time code suggestions and autocompletion.',
    url: 'https://github.com/features/copilot', favicon: 'https://github.com/favicon.ico', category: 'ai-tools', pricing: 'subscription', averageRating: 4.4, totalVotes: 1876, totalOpinions: 112, tags: ['AI', 'Coding', 'Development'], isSponsored: false, createdAt: '2025-01-08T12:00:00Z'
  },
  {
    id: '8', name: 'RunwayML', description: 'AI video editing and generation tool. Create and edit videos using text prompts and AI models.',
    url: 'https://runwayml.com', favicon: 'https://runwayml.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.4, totalVotes: 1287, totalOpinions: 93, tags: ['AI', 'Video', 'Editing'], isSponsored: false, createdAt: '2025-01-04T09:15:00Z'
  },
  {
    id: '9', name: 'Eleven Labs', description: 'AI voice synthesis technology that generates natural-sounding speech in multiple languages.',
    url: 'https://elevenlabs.io', favicon: 'https://elevenlabs.io/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.6, totalVotes: 1234, totalOpinions: 84, tags: ['AI', 'Voice', 'Audio'], isSponsored: false, createdAt: '2025-01-05T13:20:00Z'
  },
  {
    id: '10', name: 'DeepL', description: 'AI-powered translation service that provides natural and accurate translations between languages.',
    url: 'https://www.deepl.com', favicon: 'https://www.deepl.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.7, totalVotes: 2987, totalOpinions: 187, tags: ['AI', 'Translation', 'Language'], isSponsored: false, createdAt: '2023-12-20T08:30:00Z'
  },
  {
    id: '11', name: 'Jasper AI', description: 'AI writing tool specialized for marketing content. Generates blogs, ad copy, and social media posts.',
    url: 'https://www.jasper.ai', favicon: 'https://www.jasper.ai/favicon.ico', category: 'ai-tools', pricing: 'subscription', averageRating: 4.0, totalVotes: 876, totalOpinions: 54, tags: ['AI', 'Marketing', 'Content'], isSponsored: true, createdAt: '2025-01-11T13:45:00Z'
  },
  {
    id: '12', name: 'Copy.ai', description: 'AI-powered copywriting tool that automatically generates ad copy, emails, and blog posts.',
    url: 'https://www.copy.ai', favicon: 'https://www.copy.ai/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 3.9, totalVotes: 743, totalOpinions: 61, tags: ['AI', 'Copywriting', 'Marketing'], isSponsored: false, createdAt: '2025-01-09T11:20:00Z'
  },
  {
    id: '13', name: 'Synthesia', description: 'AI tool that converts text to video using AI avatars. Creates professional video content easily.',
    url: 'https://www.synthesia.io', favicon: 'https://www.synthesia.io/favicon.ico', category: 'ai-tools', pricing: 'subscription', averageRating: 4.2, totalVotes: 987, totalOpinions: 73, tags: ['AI', 'Video', 'Avatar'], isSponsored: false, createdAt: '2025-01-06T12:30:00Z'
  },
  {
    id: '14', name: 'Adobe Firefly', description: 'Adobe\'s generative AI for creating images, text effects, and vector graphics with creative control.',
    url: 'https://firefly.adobe.com', favicon: 'https://firefly.adobe.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.4, totalVotes: 2134, totalOpinions: 143, tags: ['AI', 'Design', 'Adobe'], isSponsored: false, createdAt: '2025-01-03T09:15:00Z'
  },
  {
    id: '15', name: 'Character.ai', description: 'Platform for conversing with AI characters. Chat with various AI personalities and create custom characters.',
    url: 'https://character.ai', favicon: 'https://character.ai/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.1, totalVotes: 3456, totalOpinions: 234, tags: ['AI', 'Character', 'Entertainment'], isSponsored: false, createdAt: '2023-12-30T15:00:00Z'
  },
  {
    id: '16', name: 'Writesonic', description: 'AI content creation tool for generating blogs, ads, and social media content with SEO optimization.',
    url: 'https://writesonic.com', favicon: 'https://writesonic.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 3.8, totalVotes: 987, totalOpinions: 67, tags: ['AI', 'Content', 'SEO'], isSponsored: false, createdAt: '2025-01-07T11:30:00Z'
  },
  {
    id: '17', name: 'Otter.ai', description: 'AI transcription service that converts speech to text. Useful for meeting notes and interviews.',
    url: 'https://otter.ai', favicon: 'https://otter.ai/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.1, totalVotes: 2134, totalOpinions: 156, tags: ['AI', 'Transcription', 'Productivity'], isSponsored: false, createdAt: '2023-12-28T11:45:00Z'
  },
  {
    id: '18', name: 'Grammarly', description: 'AI-powered grammar checker and writing assistant that improves the quality of English text.',
    url: 'https://www.grammarly.com', favicon: 'https://www.grammarly.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.3, totalVotes: 3456, totalOpinions: 201, tags: ['AI', 'Grammar', 'Writing'], isSponsored: false, createdAt: '2023-12-25T10:00:00Z'
  },
  {
    id: '19', name: 'Speechify', description: 'AI text-to-speech tool that reads documents aloud with natural-sounding voices.',
    url: 'https://speechify.com', favicon: 'https://speechify.com/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.0, totalVotes: 2345, totalOpinions: 156, tags: ['AI', 'Text-to-Speech', 'Accessibility'], isSponsored: false, createdAt: '2023-12-27T13:40:00Z'
  },
  {
    id: '20', name: 'Luma AI', description: 'AI tool for 3D modeling and virtual reality content creation. Generates 3D assets from images.',
    url: 'https://lumalabs.ai', favicon: 'https://lumalabs.ai/favicon.ico', category: 'ai-tools', pricing: 'freemium', averageRating: 4.1, totalVotes: 654, totalOpinions: 42, tags: ['AI', '3D', 'VR'], isSponsored: false, createdAt: '2025-01-13T16:00:00Z'
  },

  // Productivity Tools (20 popular productivity tools)
  {
    id: '21', name: 'Notion', description: 'All-in-one workspace that combines notes, databases, kanban boards, and project management.',
    url: 'https://www.notion.so', favicon: 'https://www.google.com/s2/favicons?sz=64&domain=notion.so', category: 'productivity', pricing: 'freemium', averageRating: 4.6, totalVotes: 4567, totalOpinions: 312, tags: ['Productivity', 'Notes', 'Collaboration'], isSponsored: false, createdAt: '2025-01-01T10:00:00Z'
  },
  {
    id: '22', name: 'Obsidian', description: 'Connected note-taking system that helps you manage knowledge in a graph format.',
    url: 'https://obsidian.md', favicon: 'https://obsidian.md/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.5, totalVotes: 2345, totalOpinions: 189, tags: ['Notes', 'Knowledge Management'], isSponsored: false, createdAt: '2025-01-02T11:30:00Z'
  },
  {
    id: '23', name: 'Todoist', description: 'Powerful task management tool for organizing projects and tasks systematically.',
    url: 'https://todoist.com', favicon: 'https://todoist.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.4, totalVotes: 3456, totalOpinions: 234, tags: ['Task Management', 'Productivity'], isSponsored: false, createdAt: '2025-01-03T12:15:00Z'
  },
  {
    id: '24', name: 'Trello', description: 'Kanban-style project management tool for visually tracking work and collaborating with teams.',
    url: 'https://trello.com', favicon: 'https://trello.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.3, totalVotes: 5678, totalOpinions: 456, tags: ['Project Management', 'Kanban'], isSponsored: false, createdAt: '2025-01-04T09:20:00Z'
  },
  {
    id: '25', name: 'Slack', description: 'Team communication platform with channels, direct messaging, and file sharing capabilities.',
    url: 'https://slack.com', favicon: 'https://slack.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.2, totalVotes: 6789, totalOpinions: 567, tags: ['Collaboration', 'Communication'], isSponsored: false, createdAt: '2025-01-05T14:30:00Z'
  },
  {
    id: '26', name: 'Asana', description: 'Comprehensive team project management and work tracking solution for teams.',
    url: 'https://asana.com', favicon: 'https://asana.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.1, totalVotes: 4321, totalOpinions: 298, tags: ['Project Management', 'Teamwork'], isSponsored: false, createdAt: '2025-01-06T16:45:00Z'
  },
  {
    id: '27', name: 'Evernote', description: 'Digital notebook for capturing ideas and information with synchronization across devices.',
    url: 'https://evernote.com', favicon: 'https://evernote.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.0, totalVotes: 3987, totalOpinions: 287, tags: ['Notes', 'Sync'], isSponsored: false, createdAt: '2025-01-07T08:15:00Z'
  },
  {
    id: '28', name: 'Google Workspace', description: 'Google\'s cloud office suite including Docs, Sheets, Slides, and Drive for collaboration.',
    url: 'https://workspace.google.com', favicon: 'https://workspace.google.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.5, totalVotes: 8765, totalOpinions: 623, tags: ['Office Suite', 'Cloud'], isSponsored: false, createdAt: '2025-01-08T13:20:00Z'
  },
  {
    id: '29', name: 'Microsoft 365', description: 'Microsoft\'s cloud office solution including Word, Excel, PowerPoint, and Teams.',
    url: 'https://www.microsoft.com/microsoft-365', favicon: 'https://www.microsoft.com/favicon.ico', category: 'productivity', pricing: 'subscription', averageRating: 4.4, totalVotes: 9876, totalOpinions: 734, tags: ['Office Suite', 'Microsoft'], isSponsored: false, createdAt: '2025-01-09T15:40:00Z'
  },
  {
    id: '30', name: 'Zapier', description: 'Automation platform that connects different apps and services to automate workflows.',
    url: 'https://zapier.com', favicon: 'https://zapier.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.3, totalVotes: 2456, totalOpinions: 178, tags: ['Automation', 'Integration'], isSponsored: false, createdAt: '2025-01-10T11:25:00Z'
  },
  {
    id: '31', name: 'Calendly', description: 'Scheduling automation tool that simplifies meeting booking and calendar management.',
    url: 'https://calendly.com', favicon: 'https://calendly.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.5, totalVotes: 3456, totalOpinions: 245, tags: ['Scheduling', 'Calendar'], isSponsored: false, createdAt: '2025-01-11T10:30:00Z'
  },
  {
    id: '32', name: 'RescueTime', description: 'Time tracking tool that monitors digital activities to improve productivity.',
    url: 'https://www.rescuetime.com', favicon: 'https://www.rescuetime.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.2, totalVotes: 1876, totalOpinions: 134, tags: ['Time Management', 'Tracking'], isSponsored: false, createdAt: '2025-01-12T14:15:00Z'
  },
  {
    id: '33', name: 'Forest', description: 'Focus app using Pomodoro technique. Grow virtual trees while staying focused on work.',
    url: 'https://www.forestapp.cc', favicon: 'https://www.forestapp.cc/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.6, totalVotes: 5432, totalOpinions: 398, tags: ['Focus', 'Pomodoro'], isSponsored: false, createdAt: '2025-01-13T09:45:00Z'
  },
  {
    id: '34', name: 'Toggl', description: 'Time tracking and project management tool for measuring work efficiency.',
    url: 'https://toggl.com', favicon: 'https://toggl.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.3, totalVotes: 2987, totalOpinions: 210, tags: ['Time Tracking', 'Project'], isSponsored: false, createdAt: '2025-01-14T16:20:00Z'
  },
  {
    id: '35', name: 'Airtable', description: 'Flexible data management tool combining spreadsheet and database functionality.',
    url: 'https://airtable.com', favicon: 'https://airtable.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.4, totalVotes: 4567, totalOpinions: 342, tags: ['Database', 'Spreadsheet'], isSponsored: false, createdAt: '2025-01-15T12:10:00Z'
  },
  {
    id: '36', name: 'Monday.com', description: 'Intuitive project management platform that supports team collaboration and workflow management.',
    url: 'https://monday.com', favicon: 'https://monday.com/favicon.ico', category: 'productivity', pricing: 'subscription', averageRating: 4.2, totalVotes: 3654, totalOpinions: 287, tags: ['Project Management', 'Collaboration'], isSponsored: false, createdAt: '2025-01-16T15:30:00Z'
  },
  {
    id: '37', name: 'Dropbox', description: 'Cloud storage and file synchronization service for accessing files from anywhere.',
    url: 'https://www.dropbox.com', favicon: 'https://www.dropbox.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.1, totalVotes: 6789, totalOpinions: 498, tags: ['Cloud Storage', 'File Sharing'], isSponsored: false, createdAt: '2025-01-17T11:45:00Z'
  },
  {
    id: '38', name: 'LastPass', description: 'Password manager that securely stores passwords and provides automatic form filling.',
    url: 'https://www.lastpass.com', favicon: 'https://www.lastpass.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.0, totalVotes: 4321, totalOpinions: 321, tags: ['Security', 'Password'], isSponsored: false, createdAt: '2025-01-18T13:25:00Z'
  },
  {
    id: '39', name: 'IFTTT', description: 'If This Then That - Simple automation rules for connecting different services and devices.',
    url: 'https://ifttt.com', favicon: 'https://ifttt.com/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.2, totalVotes: 2345, totalOpinions: 167, tags: ['Automation', 'Integration'], isSponsored: false, createdAt: '2025-01-19T10:15:00Z'
  },
  {
    id: '40', name: 'Zoom', description: 'Video conferencing platform for remote meetings, webinars, and virtual collaboration.',
    url: 'https://zoom.us', favicon: 'https://zoom.us/favicon.ico', category: 'productivity', pricing: 'freemium', averageRating: 4.3, totalVotes: 8765, totalOpinions: 654, tags: ['Video Call', 'Meeting'], isSponsored: false, createdAt: '2025-01-20T14:50:00Z'
  },

  // Web Services (20 popular web services)
  {
    id: '41', name: 'Gmail', description: 'Google\'s email service with powerful search functionality and spam filtering.',
    url: 'https://gmail.com', favicon: 'https://www.google.com/s2/favicons?sz=64&domain=gmail.com', category: 'web-services', pricing: 'free', averageRating: 4.4, totalVotes: 12000, totalOpinions: 890, tags: ['Email', 'Google'], isSponsored: false, createdAt: '2025-01-01T10:00:00Z'
  },
  {
    id: '42', name: 'GitHub', description: 'Version control and collaboration platform for developers and software projects.',
    url: 'https://github.com', favicon: 'https://github.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.7, totalVotes: 8900, totalOpinions: 654, tags: ['Development', 'Collaboration'], isSponsored: false, createdAt: '2025-01-02T11:15:00Z'
  },
  {
    id: '43', name: 'Stack Overflow', description: 'Developer community for programming questions, answers, and knowledge sharing.',
    url: 'https://stackoverflow.com', favicon: 'https://stackoverflow.com/favicon.ico', category: 'web-services', pricing: 'free', averageRating: 4.5, totalVotes: 7800, totalOpinions: 543, tags: ['Development', 'Q&A'], isSponsored: false, createdAt: '2025-01-03T09:30:00Z'
  },
  {
    id: '44', name: 'YouTube', description: 'World\'s largest video sharing platform for education, entertainment, and content creation.',
    url: 'https://youtube.com', favicon: 'https://youtube.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.3, totalVotes: 15000, totalOpinions: 1200, tags: ['Video', 'Education'], isSponsored: false, createdAt: '2025-01-04T14:20:00Z'
  },
  {
    id: '45', name: 'LinkedIn', description: 'Professional networking platform for career development and business connections.',
    url: 'https://linkedin.com', favicon: 'https://linkedin.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.2, totalVotes: 6700, totalOpinions: 445, tags: ['Networking', 'Career'], isSponsored: false, createdAt: '2025-01-05T16:45:00Z'
  },
  {
    id: '46', name: 'Medium', description: 'Publishing platform for high-quality articles, blogs, and thought leadership content.',
    url: 'https://medium.com', favicon: 'https://www.google.com/s2/favicons?sz=64&domain=medium.com', category: 'web-services', pricing: 'freemium', averageRating: 4.1, totalVotes: 4300, totalOpinions: 298, tags: ['Blog', 'Publishing'], isSponsored: false, createdAt: '2025-01-06T12:30:00Z'
  },
  {
    id: '47', name: 'Reddit', description: 'Social news aggregation site with diverse communities and discussion forums.',
    url: 'https://reddit.com', favicon: 'https://reddit.com/favicon.ico', category: 'web-services', pricing: 'free', averageRating: 4.0, totalVotes: 8900, totalOpinions: 623, tags: ['Community', 'News'], isSponsored: false, createdAt: '2025-01-07T15:15:00Z'
  },
  {
    id: '48', name: 'Discord', description: 'Voice, video, and text communication platform for gamers and communities.',
    url: 'https://discord.com', favicon: 'https://discord.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.4, totalVotes: 7600, totalOpinions: 567, tags: ['Communication', 'Gaming'], isSponsored: false, createdAt: '2025-01-08T10:45:00Z'
  },
  {
    id: '49', name: 'Twitch', description: 'Live streaming platform for gaming and creative content with real-time interaction.',
    url: 'https://twitch.tv', favicon: 'https://twitch.tv/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.2, totalVotes: 5400, totalOpinions: 378, tags: ['Streaming', 'Gaming'], isSponsored: false, createdAt: '2025-01-09T13:20:00Z'
  },
  {
    id: '50', name: 'Netflix', description: 'World\'s leading on-demand video streaming service for movies and TV shows.',
    url: 'https://netflix.com', favicon: 'https://netflix.com/favicon.ico', category: 'web-services', pricing: 'subscription', averageRating: 4.3, totalVotes: 11000, totalOpinions: 823, tags: ['Streaming', 'Entertainment'], isSponsored: false, createdAt: '2025-01-10T17:30:00Z'
  },
  {
    id: '51', name: 'Spotify', description: 'Music streaming service with millions of songs, podcasts, and personalized playlists.',
    url: 'https://spotify.com', favicon: 'https://spotify.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.5, totalVotes: 9800, totalOpinions: 712, tags: ['Music', 'Streaming'], isSponsored: false, createdAt: '2025-01-11T11:45:00Z'
  },
  {
    id: '52', name: 'Google Drive', description: 'Google\'s cloud storage service for secure file storage and sharing.',
    url: 'https://drive.google.com', favicon: 'https://drive.google.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.4, totalVotes: 8700, totalOpinions: 634, tags: ['Cloud Storage', 'Google'], isSponsored: false, createdAt: '2025-01-12T14:20:00Z'
  },
  {
    id: '53', name: 'WhatsApp Web', description: 'Web version of the popular messaging app for browser-based communication.',
    url: 'https://web.whatsapp.com', favicon: 'https://web.whatsapp.com/favicon.ico', category: 'web-services', pricing: 'free', averageRating: 4.2, totalVotes: 6500, totalOpinions: 445, tags: ['Messaging', 'Communication'], isSponsored: false, createdAt: '2025-01-13T09:15:00Z'
  },
  {
    id: '54', name: 'Telegram Web', description: 'Security-focused messaging app\'s web client for encrypted communication.',
    url: 'https://web.telegram.org', favicon: 'https://web.telegram.org/favicon.ico', category: 'web-services', pricing: 'free', averageRating: 4.3, totalVotes: 5600, totalOpinions: 389, tags: ['Messaging', 'Security'], isSponsored: false, createdAt: '2025-01-14T16:30:00Z'
  },
  {
    id: '55', name: 'Canva', description: 'Browser-based graphic design tool with templates and editing features for everyone.',
    url: 'https://canva.com', favicon: 'https://canva.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.6, totalVotes: 7800, totalOpinions: 567, tags: ['Design', 'Graphics'], isSponsored: false, createdAt: '2025-01-15T12:45:00Z'
  },
  {
    id: '56', name: 'Unsplash', description: 'Website providing high-quality free stock photos for personal and commercial use.',
    url: 'https://unsplash.com', favicon: 'https://unsplash.com/favicon.ico', category: 'web-services', pricing: 'free', averageRating: 4.7, totalVotes: 4500, totalOpinions: 312, tags: ['Photos', 'Stock'], isSponsored: false, createdAt: '2025-01-16T10:20:00Z'
  },
  {
    id: '57', name: 'CodePen', description: 'Online code editor and learning environment for front-end developers.',
    url: 'https://codepen.io', favicon: 'https://codepen.io/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.5, totalVotes: 3400, totalOpinions: 234, tags: ['Development', 'Code'], isSponsored: false, createdAt: '2025-01-17T15:10:00Z'
  },
  {
    id: '58', name: 'JSFiddle', description: 'Web-based IDE for testing HTML, CSS, and JavaScript code snippets online.',
    url: 'https://jsfiddle.net', favicon: 'https://jsfiddle.net/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.3, totalVotes: 2800, totalOpinions: 189, tags: ['Development', 'JavaScript'], isSponsored: false, createdAt: '2025-01-18T11:55:00Z'
  },
  {
    id: '59', name: 'Replit', description: 'Online IDE and hosting platform supporting multiple programming languages.',
    url: 'https://replit.com', favicon: 'https://replit.com/favicon.ico', category: 'web-services', pricing: 'freemium', averageRating: 4.4, totalVotes: 3600, totalOpinions: 267, tags: ['Development', 'IDE'], isSponsored: false, createdAt: '2025-01-19T13:40:00Z'
  },
  {
    id: '60', name: 'Google Translate', description: 'Free online translation service supporting over 100 languages.',
    url: 'https://translate.google.com', favicon: 'https://translate.google.com/favicon.ico', category: 'web-services', pricing: 'free', averageRating: 4.2, totalVotes: 8900, totalOpinions: 634, tags: ['Translation', 'Language'], isSponsored: false, createdAt: '2025-01-20T08:25:00Z'
  },

  // Design Tools (20 popular design tools)
  {
    id: '61', name: 'Figma', description: 'Collaborative UI/UX design tool with real-time collaboration and prototyping features.',
    url: 'https://figma.com', favicon: 'https://www.google.com/s2/favicons?sz=64&domain=figma.com', category: 'design-tools', pricing: 'freemium', averageRating: 4.8, totalVotes: 6700, totalOpinions: 456, tags: ['UI/UX', 'Collaboration'], isSponsored: false, createdAt: '2025-01-01T09:15:00Z'
  },
  {
    id: '62', name: 'Adobe Photoshop', description: 'Industry-standard image editing software for photo manipulation and digital art.',
    url: 'https://photoshop.adobe.com', favicon: 'https://photoshop.adobe.com/favicon.ico', category: 'design-tools', pricing: 'subscription', averageRating: 4.6, totalVotes: 8900, totalOpinions: 623, tags: ['Image Editing', 'Adobe'], isSponsored: false, createdAt: '2025-01-02T14:30:00Z'
  },
  {
    id: '63', name: 'Sketch', description: 'Mac-exclusive vector-based UI design tool for creating interfaces and prototypes.',
    url: 'https://sketch.com', favicon: 'https://sketch.com/favicon.ico', category: 'design-tools', pricing: 'subscription', averageRating: 4.4, totalVotes: 4500, totalOpinions: 298, tags: ['UI Design', 'Vector'], isSponsored: false, createdAt: '2025-01-03T11:45:00Z'
  },
  {
    id: '64', name: 'Adobe Illustrator', description: 'Professional vector graphics software for logos, icons, and scalable artwork.',
    url: 'https://illustrator.adobe.com', favicon: 'https://illustrator.adobe.com/favicon.ico', category: 'design-tools', pricing: 'subscription', averageRating: 4.5, totalVotes: 7800, totalOpinions: 534, tags: ['Vector', 'Adobe'], isSponsored: false, createdAt: '2025-01-04T16:20:00Z'
  },
  {
    id: '65', name: 'Framer', description: 'Advanced prototyping tool for creating high-fidelity interactive designs and animations.',
    url: 'https://framer.com', favicon: 'https://framer.com/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.3, totalVotes: 3400, totalOpinions: 234, tags: ['Prototyping', 'Animation'], isSponsored: false, createdAt: '2025-01-05T12:10:00Z'
  },
  {
    id: '66', name: 'InVision', description: 'Digital product design platform for prototyping, collaboration, and design systems.',
    url: 'https://invisionapp.com', favicon: 'https://invisionapp.com/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.2, totalVotes: 5600, totalOpinions: 378, tags: ['Prototyping', 'Collaboration'], isSponsored: false, createdAt: '2025-01-06T15:45:00Z'
  },
  {
    id: '67', name: 'Adobe XD', description: 'Adobe\'s UX/UI design and prototyping tool for creating user experiences.',
    url: 'https://xd.adobe.com', favicon: 'https://xd.adobe.com/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.1, totalVotes: 4300, totalOpinions: 289, tags: ['UI/UX', 'Adobe'], isSponsored: false, createdAt: '2025-01-07T10:30:00Z'
  },
  {
    id: '68', name: 'Blender', description: 'Free open-source 3D modeling, animation, and rendering software for creative professionals.',
    url: 'https://blender.org', favicon: 'https://blender.org/favicon.ico', category: 'design-tools', pricing: 'free', averageRating: 4.7, totalVotes: 8900, totalOpinions: 645, tags: ['3D', 'Open Source'], isSponsored: false, createdAt: '2025-01-08T13:25:00Z'
  },
  {
    id: '69', name: 'Affinity Designer', description: 'Professional vector graphic design software as an alternative to Adobe Illustrator.',
    url: 'https://affinity.serif.com/designer', favicon: 'https://affinity.serif.com/favicon.ico', category: 'design-tools', pricing: 'subscription', averageRating: 4.4, totalVotes: 3200, totalOpinions: 212, tags: ['Vector', 'Design'], isSponsored: false, createdAt: '2025-01-09T17:15:00Z'
  },
  {
    id: '70', name: 'GIMP', description: 'GNU Image Manipulation Program - free alternative to Photoshop for image editing.',
    url: 'https://gimp.org', favicon: 'https://gimp.org/favicon.ico', category: 'design-tools', pricing: 'free', averageRating: 4.0, totalVotes: 5400, totalOpinions: 367, tags: ['Image Editing', 'Free'], isSponsored: false, createdAt: '2025-01-10T09:50:00Z'
  },
  {
    id: '71', name: 'Procreate', description: 'iPad digital painting app popular among artists for illustration and creative work.',
    url: 'https://procreate.art', favicon: 'https://procreate.art/favicon.ico', category: 'design-tools', pricing: 'subscription', averageRating: 4.6, totalVotes: 6700, totalOpinions: 456, tags: ['Digital Painting', 'iPad'], isSponsored: false, createdAt: '2025-01-11T14:40:00Z'
  },
  {
    id: '72', name: 'Krita', description: 'Free open-source digital painting software designed by artists for artists.',
    url: 'https://krita.org', favicon: 'https://krita.org/favicon.ico', category: 'design-tools', pricing: 'free', averageRating: 4.3, totalVotes: 3800, totalOpinions: 267, tags: ['Digital Painting', 'Open Source'], isSponsored: false, createdAt: '2025-01-12T11:20:00Z'
  },
  {
    id: '73', name: 'Marvel', description: 'Simple prototyping and wireframing tool for creating app and web mockups.',
    url: 'https://marvelapp.com', favicon: 'https://marvelapp.com/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.2, totalVotes: 2900, totalOpinions: 189, tags: ['Prototyping', 'Wireframe'], isSponsored: false, createdAt: '2025-01-13T16:35:00Z'
  },
  {
    id: '74', name: 'Principle', description: 'Mac-exclusive tool for creating animated and interactive user interface designs.',
    url: 'https://principleformac.com', favicon: 'https://principleformac.com/favicon.ico', category: 'design-tools', pricing: 'subscription', averageRating: 4.1, totalVotes: 1800, totalOpinions: 123, tags: ['Animation', 'Interaction'], isSponsored: false, createdAt: '2025-01-14T12:15:00Z'
  },
  {
    id: '75', name: 'Zeplin', description: 'Design handoff tool that bridges the gap between designers and developers.',
    url: 'https://zeplin.io', favicon: 'https://zeplin.io/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.3, totalVotes: 4200, totalOpinions: 298, tags: ['Design Handoff', 'Collaboration'], isSponsored: false, createdAt: '2025-01-15T15:45:00Z'
  },
  {
    id: '76', name: 'Miro', description: 'Online whiteboard platform for visual collaboration, brainstorming, and design thinking.',
    url: 'https://miro.com', favicon: 'https://miro.com/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.5, totalVotes: 5600, totalOpinions: 398, tags: ['Whiteboard', 'Collaboration'], isSponsored: false, createdAt: '2025-01-16T10:25:00Z'
  },
  {
    id: '77', name: 'Pexels', description: 'Platform providing high-quality free stock photos and videos for creative projects.',
    url: 'https://pexels.com', favicon: 'https://pexels.com/favicon.ico', category: 'design-tools', pricing: 'free', averageRating: 4.4, totalVotes: 3700, totalOpinions: 245, tags: ['Stock Photos', 'Free'], isSponsored: false, createdAt: '2025-01-17T13:30:00Z'
  },
  {
    id: '78', name: 'Dribbble', description: 'Creative community for designers to showcase work and find inspiration.',
    url: 'https://dribbble.com', favicon: 'https://dribbble.com/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.2, totalVotes: 4800, totalOpinions: 356, tags: ['Portfolio', 'Inspiration'], isSponsored: false, createdAt: '2025-01-18T17:20:00Z'
  },
  {
    id: '79', name: 'Behance', description: 'Adobe\'s creative portfolio platform for showcasing and discovering creative work.',
    url: 'https://behance.net', favicon: 'https://behance.net/favicon.ico', category: 'design-tools', pricing: 'free', averageRating: 4.1, totalVotes: 5200, totalOpinions: 378, tags: ['Portfolio', 'Adobe'], isSponsored: false, createdAt: '2025-01-19T14:10:00Z'
  },
  {
    id: '80', name: 'Coolors', description: 'Color palette generation and exploration tool for designers and developers.',
    url: 'https://coolors.co', favicon: 'https://coolors.co/favicon.ico', category: 'design-tools', pricing: 'freemium', averageRating: 4.6, totalVotes: 2800, totalOpinions: 189, tags: ['Color', 'Palette'], isSponsored: false, createdAt: '2025-01-20T11:55:00Z'
  },

  // Developer Tools (20 popular developer tools)
  {
    id: '81', name: 'Visual Studio Code', description: 'Microsoft\'s free code editor with extensive customization and extension support.',
    url: 'https://code.visualstudio.com', favicon: 'https://code.visualstudio.com/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.8, totalVotes: 12000, totalOpinions: 890, tags: ['Code Editor', 'Microsoft'], isSponsored: false, createdAt: '2025-01-01T08:00:00Z'
  },
  {
    id: '82', name: 'Docker', description: 'Containerization platform that simplifies application deployment and management.',
    url: 'https://docker.com', favicon: 'https://docker.com/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.6, totalVotes: 8900, totalOpinions: 634, tags: ['Container', 'DevOps'], isSponsored: false, createdAt: '2025-01-02T10:30:00Z'
  },
  {
    id: '83', name: 'Postman', description: 'Comprehensive platform for API development, testing, and collaboration.',
    url: 'https://postman.com', favicon: 'https://postman.com/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.5, totalVotes: 7600, totalOpinions: 534, tags: ['API', 'Testing'], isSponsored: false, createdAt: '2025-01-03T14:15:00Z'
  },
  {
    id: '84', name: 'Chrome DevTools', description: 'Built-in browser development tools for debugging and optimizing web applications.',
    url: 'https://developers.google.com/web/tools/chrome-devtools', favicon: 'https://developers.google.com/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.7, totalVotes: 9800, totalOpinions: 712, tags: ['Browser', 'Debugging'], isSponsored: false, createdAt: '2025-01-04T11:45:00Z'
  },
  {
    id: '85', name: 'Node.js', description: 'JavaScript runtime environment for building server-side and networking applications.',
    url: 'https://nodejs.org', favicon: 'https://nodejs.org/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.6, totalVotes: 11000, totalOpinions: 798, tags: ['JavaScript', 'Runtime'], isSponsored: false, createdAt: '2025-01-05T16:20:00Z'
  },
  {
    id: '86', name: 'npm', description: 'Node.js package manager and world\'s largest software registry for JavaScript.',
    url: 'https://npmjs.com', favicon: 'https://npmjs.com/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.4, totalVotes: 8700, totalOpinions: 623, tags: ['Package Manager', 'JavaScript'], isSponsored: false, createdAt: '2025-01-06T12:35:00Z'
  },
  {
    id: '87', name: 'Webpack', description: 'Static module bundler for modern JavaScript applications with powerful optimization.',
    url: 'https://webpack.js.org', favicon: 'https://webpack.js.org/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.2, totalVotes: 5400, totalOpinions: 378, tags: ['Bundler', 'Build Tool'], isSponsored: false, createdAt: '2025-01-07T15:10:00Z'
  },
  {
    id: '88', name: 'Jest', description: 'JavaScript testing framework developed by Facebook with zero configuration.',
    url: 'https://jestjs.io', favicon: 'https://jestjs.io/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.5, totalVotes: 6700, totalOpinions: 456, tags: ['Testing', 'JavaScript'], isSponsored: false, createdAt: '2025-01-08T09:25:00Z'
  },
  {
    id: '89', name: 'MongoDB', description: 'NoSQL document database providing flexible and scalable data storage solutions.',
    url: 'https://mongodb.com', favicon: 'https://mongodb.com/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.3, totalVotes: 7800, totalOpinions: 567, tags: ['Database', 'NoSQL'], isSponsored: false, createdAt: '2025-01-09T13:40:00Z'
  },
  {
    id: '90', name: 'Redis', description: 'In-memory data structure store used for caching and session management.',
    url: 'https://redis.io', favicon: 'https://redis.io/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.4, totalVotes: 5600, totalOpinions: 398, tags: ['Cache', 'In-Memory'], isSponsored: false, createdAt: '2025-01-10T17:15:00Z'
  },
  {
    id: '91', name: 'Kubernetes', description: 'Container orchestration platform for automating deployment and management of applications.',
    url: 'https://kubernetes.io', favicon: 'https://kubernetes.io/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.2, totalVotes: 4300, totalOpinions: 298, tags: ['Orchestration', 'DevOps'], isSponsored: false, createdAt: '2025-01-11T11:50:00Z'
  },
  {
    id: '92', name: 'Terraform', description: 'Infrastructure as code tool for building, changing, and versioning infrastructure.',
    url: 'https://terraform.io', favicon: 'https://terraform.io/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.1, totalVotes: 3200, totalOpinions: 234, tags: ['Infrastructure', 'DevOps'], isSponsored: false, createdAt: '2025-01-12T14:30:00Z'
  },
  {
    id: '93', name: 'Jenkins', description: 'Open-source automation server for continuous integration and deployment.',
    url: 'https://jenkins.io', favicon: 'https://jenkins.io/favicon.ico', category: 'developer', pricing: 'free', averageRating: 4.0, totalVotes: 4800, totalOpinions: 356, tags: ['CI/CD', 'Automation'], isSponsored: false, createdAt: '2025-01-13T10:20:00Z'
  },
  {
    id: '94', name: 'GitLab', description: 'DevOps platform covering the entire development lifecycle from planning to deployment.',
    url: 'https://gitlab.com', favicon: 'https://gitlab.com/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.3, totalVotes: 6500, totalOpinions: 467, tags: ['DevOps', 'Git'], isSponsored: false, createdAt: '2025-01-14T16:45:00Z'
  },
  {
    id: '95', name: 'Bitbucket', description: 'Atlassian\'s Git-based source code repository hosting service for teams.',
    url: 'https://bitbucket.org', favicon: 'https://bitbucket.org/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.1, totalVotes: 3700, totalOpinions: 267, tags: ['Git', 'Atlassian'], isSponsored: false, createdAt: '2025-01-15T12:15:00Z'
  },
  {
    id: '96', name: 'Jira', description: 'Project management and issue tracking tool for agile development teams.',
    url: 'https://atlassian.com/software/jira', favicon: 'https://atlassian.com/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.2, totalVotes: 8900, totalOpinions: 634, tags: ['Project Management', 'Issue Tracking'], isSponsored: false, createdAt: '2025-01-16T15:30:00Z'
  },
  {
    id: '97', name: 'Confluence', description: 'Team collaboration wiki platform for creating and sharing knowledge.',
    url: 'https://atlassian.com/software/confluence', favicon: 'https://atlassian.com/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.0, totalVotes: 5400, totalOpinions: 389, tags: ['Wiki', 'Documentation'], isSponsored: false, createdAt: '2025-01-17T09:40:00Z'
  },
  {
    id: '98', name: 'Swagger', description: 'Open-source tools for API documentation, testing, and development.',
    url: 'https://swagger.io', favicon: 'https://swagger.io/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.4, totalVotes: 4200, totalOpinions: 298, tags: ['API', 'Documentation'], isSponsored: false, createdAt: '2025-01-18T13:25:00Z'
  },
  {
    id: '99', name: 'Insomnia', description: 'REST API client for testing and debugging APIs with powerful features.',
    url: 'https://insomnia.rest', favicon: 'https://insomnia.rest/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.3, totalVotes: 2800, totalOpinions: 189, tags: ['API', 'Testing'], isSponsored: false, createdAt: '2025-01-19T17:10:00Z'
  },
  {
    id: '100', name: 'Elasticsearch', description: 'Distributed search and analytics engine for real-time data analysis.',
    url: 'https://elastic.co', favicon: 'https://elastic.co/favicon.ico', category: 'developer', pricing: 'freemium', averageRating: 4.2, totalVotes: 3600, totalOpinions: 254, tags: ['Search', 'Analytics'], isSponsored: false, createdAt: '2025-01-20T11:35:00Z'
  }
];