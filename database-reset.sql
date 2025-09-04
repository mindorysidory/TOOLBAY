-- TOOLBAY Database Reset for Clean Launch
-- This script resets all vote counts and opinions for a fresh start

-- 1. Clear all existing votes
DELETE FROM votes;

-- 2. Reset all opinion vote scores to sample values
UPDATE opinions SET 
  vote_score = CASE 
    WHEN id = 'sample-1' THEN 12
    WHEN id = 'sample-2' THEN 8
    ELSE 0
  END,
  total_votes = CASE 
    WHEN id = 'sample-1' THEN 12
    WHEN id = 'sample-2' THEN 8
    ELSE 0
  END;

-- 3. Reset user statistics
UPDATE users SET 
  total_votes = 0,
  last_active = NOW();

-- 4. Reset sequences (if using auto-increment)
-- ALTER SEQUENCE votes_id_seq RESTART WITH 1;

-- 5. Verify reset
SELECT 
  'votes' as table_name, 
  COUNT(*) as record_count 
FROM votes
UNION ALL
SELECT 
  'opinions', 
  COUNT(*) 
FROM opinions WHERE vote_score > 0
UNION ALL
SELECT 
  'users_with_votes', 
  COUNT(*) 
FROM users WHERE total_votes > 0;

-- Expected result: 
-- votes: 0
-- opinions: 2 (sample opinions only)
-- users_with_votes: 0