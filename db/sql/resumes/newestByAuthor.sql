select resumes.filename, resumes.date, resumes.uid, comment_count, resume_count, users.name, users.photo
    from resumes
    inner join 
    (select resumes.uid, count(comments.*) as comment_count
        from resumes
        full join
        comments
            on resumes.id = comments.parent_id
        group by resumes.uid
    ) commentct
        on commentct.uid = resumes.uid
    inner join
    ( select r.uid, count(*) as resume_count
        from resumes as r group by r.uid
    ) resumect
        on resumect.uid = resumes.uid
    inner join users
    on resumes.uid = users.uid
    where resumes.date in (select max(date) from resumes group by uid)
group by commentct.uid, resumes.id, comment_count, resumect.uid, resumect.resume_count, users.name, users.photo
order by resumes.date desc