--Fetches users that posted a resume in the past 24 hours
SELECT t.author
FROM resumes t
INNER JOIN (
	SELECT uid, max(date) as MaxDate
	FROM resumes
	WHERE date > now() - interval '24 hours'
	GROUP BY uid
) rm ON t.uid = t.uid AND t.date = rm.MaxDate
