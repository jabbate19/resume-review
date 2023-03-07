insert into comments
values(${parent_id}, ${id}, ${uid}, ${body}, ${date})
returning *