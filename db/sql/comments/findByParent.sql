select comments.*, users.name, users.photo from comments
join users
on comments.uid = users.uid
where parent_id = ${parent_id}