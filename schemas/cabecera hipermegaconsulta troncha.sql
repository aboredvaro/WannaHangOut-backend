Select 	ac.id_activity, ac.title, ac.description, ac.seats,
        ac.seats - (SELECT COUNT(*)
					FROM entitytoactivity
                    WHERE id_activity = ac.id_activity) as seatsAvailable, 
		ROUND(1-((ac.seats - (SELECT COUNT(*) 
							  FROM entitytoactivity 
                              WHERE id_activity = ac.id_activity)) / 100),2) as ocupation, 
		ac.price, ac.dateAct, ac.min_duration,
        (SELECT i.urlPath 
		 FROM images i, img_act im
		 WHERE im.id_image = i.id_image 
			AND im.deleted = 0
			AND id_activity = ac.id_activity
		 ORDER BY i.id_image ASC
		 LIMIT 1) as urlPath,
        en.id_entity as id_entity_creator, en.name, 
        (SELECT COUNT(a.id_activity)
		 FROM review r, activity a 
		 WHERE a.id_activity = r.id_activity 
			AND r.deleted = 0 
            AND a.deleted = 0
            AND a.id_entity_creator = en.id_entity) as totalReviewsOfEntity,
        (SELECT ROUND(AVG(r.points),2)
		 FROM review r, activity a 
		 WHERE a.id_activity = r.id_activity 
			AND r.deleted = 0 
            AND a.deleted = 0
            AND a.id_entity_creator = en.id_entity) as avgScoreOfEntity,
		en.avatar, 
        ad.id_address, ad.direction, ad.codPos, ad.location, pr.province, ad.latitude, ad.longitude 
from activity ac, entity en, address ad, provinces pr
where ac.id_entity_creator = en.id_entity
    and ac.deleted = 0
    and ad.id_address = ac.id_address
    and ad.id_province = pr.id_province
    and ac.dateAct >= now();
    
    
    
