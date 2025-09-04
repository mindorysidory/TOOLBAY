-- Reset all votes and vote scores to clean state
DELETE FROM votes;
UPDATE opinions SET vote_score = 0, total_votes = 0;

-- Reset sample opinion vote scores to default values
UPDATE opinions SET vote_score = 12 WHERE content LIKE '%Great tool for productivity%';
UPDATE opinions SET vote_score = 8 WHERE content LIKE '%Solid features but could use%';
