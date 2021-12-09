-- BD Producción
-- USE heroku_8710917fecf1cf0;

-- BD Beta
 USE heroku_314befdd836197e;

SELECT * FROM tags_act;
SELECT * FROM entityToActivity;
SELECT * FROM img_review;
SELECT * FROM review;
SELECT * FROM img_act;

SELECT * FROM tags_ent;
SELECT * FROM entity;
SELECT * FROM address;

SELECT * FROM activity;
SELECT * FROM review;

SELECT * FROM provinces;
SELECT * FROM images;
SELECT * FROM tags;
SELECT * FROM rol;

-- DELETE FROM entity WHERE id_entity = 85;
-- DELETE FROM address WHERE id_address = 275;
-- UPDATE `heroku_314befdd836197e`.`review` SET `title` = 'Ni tan mal', `description` = 'Para un rato no estuvo mal', `points` = '5' WHERE (`id_review` = '4');
-- UPDATE activity SET deleted = 0 WHERE id_activity = 1

