ALTER TABLE users
RENAME COLUMN username TO firstname;
ADD COLUMN lastname varchar(60);
ALTER COLUMN firstname TYPE varchar(60);




