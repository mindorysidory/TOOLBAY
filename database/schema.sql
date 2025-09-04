-- TOOLBAY Database Schema for Supabase
-- Collective Intelligence Platform for AI Tools

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE (Anonymous IP-based system)
-- =============================================
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ip_fingerprint VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    trust_score INTEGER DEFAULT 50, -- 0-100 scale
    total_contributions INTEGER DEFAULT 0,
    total_votes INTEGER DEFAULT 0,
    is_banned BOOLEAN DEFAULT FALSE,
    ban_reason TEXT,
    metadata JSONB DEFAULT '{}' -- Store additional user data
);

-- =============================================
-- CATEGORIES TABLE
-- =============================================
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100), -- Icon name or URL
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (id, name, description, sort_order) VALUES
('ai-tools', 'AI Tools', 'Artificial Intelligence and Machine Learning tools', 1),
('productivity', 'Productivity Tools', 'Tools to enhance work efficiency and productivity', 2),
('web-services', 'Web Services', 'Online web services and platforms', 3),
('design-tools', 'Design Tools', 'Creative and design tools', 4),
('developer', 'Developer Tools', 'Development and programming tools', 5);

-- =============================================
-- TOOLS TABLE (Main entity)
-- =============================================
CREATE TABLE tools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    url VARCHAR(500) NOT NULL,
    favicon VARCHAR(500),
    category_id VARCHAR(50) REFERENCES categories(id),
    pricing VARCHAR(50) NOT NULL CHECK (pricing IN ('free', 'freemium', 'subscription', 'one-time', 'unknown')),
    
    -- Ratings & Statistics
    average_rating DECIMAL(3,2) DEFAULT 0.0,
    total_votes INTEGER DEFAULT 0,
    total_opinions INTEGER DEFAULT 0,
    
    -- Metadata
    meta_title VARCHAR(300),
    meta_description TEXT,
    tags TEXT[] DEFAULT '{}',
    
    -- Status & Moderation
    is_sponsored BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    submitted_by UUID REFERENCES users(id),
    
    -- Search vector will be created with triggers instead of generated column
    search_vector tsvector
);

-- =============================================
-- OPINIONS TABLE (User reviews/comments)
-- =============================================
CREATE TABLE opinions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Content
    content TEXT NOT NULL CHECK (length(content) >= 10 AND length(content) <= 2000),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- Optional individual rating
    
    -- Voting & Trust
    vote_score INTEGER DEFAULT 0, -- Net votes (upvotes - downvotes)
    total_votes INTEGER DEFAULT 0,
    trust_score INTEGER DEFAULT 50, -- Calculated trust score for this opinion
    
    -- Status
    is_flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT,
    is_approved BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent duplicate opinions from same user
    UNIQUE(tool_id, user_id)
);

-- =============================================
-- VOTES TABLE (Opinion voting system)
-- =============================================
CREATE TABLE votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    opinion_id UUID NOT NULL REFERENCES opinions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent duplicate votes
    UNIQUE(opinion_id, user_id)
);

-- =============================================
-- TOOL_RATINGS TABLE (Direct tool ratings)
-- =============================================
CREATE TABLE tool_ratings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent duplicate ratings from same user
    UNIQUE(tool_id, user_id)
);

-- =============================================
-- ACTIVITY_LOG TABLE (Track user actions)
-- =============================================
CREATE TABLE activity_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, -- 'tool_added', 'opinion_posted', 'vote_cast', etc.
    entity_type VARCHAR(50) NOT NULL, -- 'tool', 'opinion', 'vote'
    entity_id UUID NOT NULL,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES for Performance
-- =============================================
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_rating ON tools(average_rating DESC);
CREATE INDEX idx_tools_created ON tools(created_at DESC);
CREATE INDEX idx_tools_search ON tools USING GIN(search_vector);
CREATE INDEX idx_tools_active ON tools(is_active, is_approved);

CREATE INDEX idx_opinions_tool ON opinions(tool_id);
CREATE INDEX idx_opinions_user ON opinions(user_id);
CREATE INDEX idx_opinions_created ON opinions(created_at DESC);
CREATE INDEX idx_opinions_vote_score ON opinions(vote_score DESC);

CREATE INDEX idx_votes_opinion ON votes(opinion_id);
CREATE INDEX idx_votes_user ON votes(user_id);

CREATE INDEX idx_ratings_tool ON tool_ratings(tool_id);
CREATE INDEX idx_ratings_user ON tool_ratings(user_id);

CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_created ON activity_log(created_at DESC);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', array_to_string(NEW.tags, ' ')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update tool statistics
CREATE OR REPLACE FUNCTION update_tool_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update opinion count
    UPDATE tools 
    SET total_opinions = (
        SELECT COUNT(*) 
        FROM opinions 
        WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id) 
        AND is_approved = TRUE
    )
    WHERE id = COALESCE(NEW.tool_id, OLD.tool_id);
    
    -- Update average rating
    UPDATE tools 
    SET average_rating = (
        SELECT COALESCE(AVG(rating::DECIMAL), 0)
        FROM tool_ratings 
        WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)
    ),
    total_votes = (
        SELECT COUNT(*)
        FROM tool_ratings 
        WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)
    )
    WHERE id = COALESCE(NEW.tool_id, OLD.tool_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Function to update opinion vote scores
CREATE OR REPLACE FUNCTION update_opinion_votes()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE opinions 
    SET vote_score = (
        SELECT COALESCE(
            SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE -1 END), 0
        )
        FROM votes 
        WHERE opinion_id = COALESCE(NEW.opinion_id, OLD.opinion_id)
    ),
    total_votes = (
        SELECT COUNT(*)
        FROM votes 
        WHERE opinion_id = COALESCE(NEW.opinion_id, OLD.opinion_id)
    )
    WHERE id = COALESCE(NEW.opinion_id, OLD.opinion_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Function to update user stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET total_contributions = (
        SELECT COUNT(*) 
        FROM opinions 
        WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
    ) + (
        SELECT COUNT(*) 
        FROM tools 
        WHERE submitted_by = COALESCE(NEW.user_id, OLD.user_id)
    ),
    total_votes = (
        SELECT COUNT(*) 
        FROM votes 
        WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
    ),
    last_active = NOW()
    WHERE id = COALESCE(NEW.user_id, OLD.user_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGERS
-- =============================================

-- Search vector trigger
CREATE TRIGGER trigger_update_search_vector
    BEFORE INSERT OR UPDATE ON tools
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER trigger_update_tool_stats_on_opinion
    AFTER INSERT OR UPDATE OR DELETE ON opinions
    FOR EACH ROW EXECUTE FUNCTION update_tool_stats();

CREATE TRIGGER trigger_update_tool_stats_on_rating
    AFTER INSERT OR UPDATE OR DELETE ON tool_ratings
    FOR EACH ROW EXECUTE FUNCTION update_tool_stats();

CREATE TRIGGER trigger_update_opinion_votes
    AFTER INSERT OR UPDATE OR DELETE ON votes
    FOR EACH ROW EXECUTE FUNCTION update_opinion_votes();

CREATE TRIGGER trigger_update_user_stats_on_opinion
    AFTER INSERT OR UPDATE OR DELETE ON opinions
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

CREATE TRIGGER trigger_update_user_stats_on_vote
    AFTER INSERT OR UPDATE OR DELETE ON votes
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_tools_updated_at
    BEFORE UPDATE ON tools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_opinions_updated_at
    BEFORE UPDATE ON opinions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE opinions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_ratings ENABLE ROW LEVEL SECURITY;

-- Public read access for approved content
CREATE POLICY "Public read access for tools" ON tools
    FOR SELECT USING (is_active = TRUE AND is_approved = TRUE);

CREATE POLICY "Public read access for opinions" ON opinions
    FOR SELECT USING (is_approved = TRUE);

-- Users can manage their own data
CREATE POLICY "Users can manage their own data" ON users
    FOR ALL USING (auth.uid()::text = id::text);

-- More policies can be added based on specific requirements

-- =============================================
-- SAMPLE DATA INSERT
-- =============================================

-- Create a sample user
INSERT INTO users (ip_fingerprint, trust_score, total_contributions) 
VALUES ('sample_ip_fingerprint_1', 85, 5);

-- You can populate tools from your existing mock data here
-- This will be done programmatically when connecting the frontend

-- =============================================
-- VIEWS for Common Queries
-- =============================================

-- Popular tools view
CREATE VIEW popular_tools AS
SELECT 
    t.*,
    c.name as category_name,
    ROW_NUMBER() OVER (PARTITION BY t.category_id ORDER BY t.average_rating DESC, t.total_votes DESC) as rank_in_category
FROM tools t
JOIN categories c ON t.category_id = c.id
WHERE t.is_active = TRUE AND t.is_approved = TRUE;

-- Recent activity view
CREATE VIEW recent_activity AS
SELECT 
    'tool_added' as activity_type,
    t.name as title,
    t.description,
    t.created_at,
    u.trust_score as user_trust
FROM tools t
JOIN users u ON t.submitted_by = u.id
WHERE t.created_at >= NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
    'opinion_posted' as activity_type,
    CONCAT('Review for ', t.name) as title,
    LEFT(o.content, 100) as description,
    o.created_at,
    u.trust_score as user_trust
FROM opinions o
JOIN tools t ON o.tool_id = t.id
JOIN users u ON o.user_id = u.id
WHERE o.created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Tool stats view
CREATE VIEW tool_stats AS
SELECT 
    category_id,
    COUNT(*) as total_tools,
    AVG(average_rating) as avg_rating,
    SUM(total_opinions) as total_reviews
FROM tools 
WHERE is_active = TRUE AND is_approved = TRUE
GROUP BY category_id;

COMMENT ON DATABASE postgres IS 'TOOLBAY - Collective Intelligence Platform for AI Tools';