USE heroku_314befdd836197e;

INSERT INTO rol VALUES
    (1, "Shop"),
    (2, "User");

INSERT INTO tags VALUES
    (1, "Aire libre"),
    (2, "Deportes"),
    (3, "Gastronomía"),
    (4, "Hacer Deporte"),
    (5, "Playa"),
    (6, "Senderismo"),
    (7, "Salir de fiesta"),
    (8, "Pasear"),
    (9, "Ir de compras");

INSERT INTO entity VALUES
    (1, 2, "Dracarys", "Daenerys", "Targaryen","Lorem ipsum dolor sit amet,... ", "ddt@got.com", 999555111, "Braavos", "1234", "urlFoto"),
    (2, 2, "Bastardo", "Jon", "Snow","Lorem ipsum dolor sit amet,... ", "bjs@got.com", 999555222, "Invernalia", "1234", "urlFoto"),
    (3, 1, "Tasquilla", "100 Montaditos", null,"Lorem ipsum dolor sit amet,... ", "100@got.com", 999555333, "Desembarco del rey", "1234", "urlFoto"),
    (4, 2, "Slynda", "Sara", "Lyndalae", "Me gustan los gatos, pero no mucho", "slynda@mail.com", "999666001", "Nunca jamás 25", "1234", "urlFoto"),
    (6, 1, "Coffè", "Cafetería - heladería", null, "Cafe, leche y azúcar, ¿existe una mejor combinación?", "cofsugar@mail.com", "999666002", "Calle Matemático Marzal 25", "1234", "urlFoto"),
    (7, 2, "Chloe", "Chloe", "Apellido Inventado", "Primera vez que puedo llamarme chloe y no Chloe1 o Chloe2 o Chloe1234", "chrrr5@mail.com", "999666003", "Calle la Princesa 71, bajo", "1234", "urlFoto"),
    (8, 2, "Rosael", "James", "Anthony Adams", "I'm new here, who wants to hang out?", "totallynotfake@mail.com", "999666005", "I don't evem know where i am", "1234", "urlFoto"),
    (9, 1, "P24", "Pub", null, "Pub sin g", "pub24negocios@mail.com", "999666006", "Plaza la Violeta 84", "1234", "urlFoto"),
    (10, 2, "Mattt", "Mathews", "Moo", "No soy una vaka", "mooothwes@mail.com", "999666007", "La Granja 2", "1234", "urlFoto"),
    (11, 2, "CarlAs", "Solaire", "Astora", "\[T]/", "praisethesun@mail.com", "999666008", "Ruinas de Izalith", "1234", "urlFoto"),
    (12, 2, "Clara", "Clara", "Torres", "Crecer es cambiar", "clat65@mail.com", "999666009", "Calle Abu Masaifa 8", "1234", "urlFoto"),
    (13, 2, "Chafacharcos", "Sergio", "Astronauta", "Loving music and life", "chafacharcos97@mail.com", "999666010", "Hermanos Gandia 4-8-9", "1234", "urlFoto"),    
    (14, 2, "VitKras_87", "Viktor", "Andre Saldaya", "Una cerveza, un cigarro, y un día más", "ironman724830@mail.com", "999666011", "C/Sebastián del Castillo 5", "1234", "urlFoto"),
    (15, 1, "Soplo de verano", "Restaurante vegano", null, "Nuevo restaurante para aquellos que solo comen verde", "summerbreath@mail.com", "999666012", "C/Sebastián del Castillo 12", "1234", "urlFoto");

INSERT INTO activity VALUES
    (1, 2, "Party de Halloween", "Nos vamos de botellona por el centro...", 152, 12.50, "Valencia", "2021-12-31", 15),
    (2, 1, "Acampada", "Visita guiada al muro de hielo...", 45, 0, "Murcia", "2021-11-30", 90),
    (3, 3, "Come y bebe", "Come y bebe todo lo que puedas...", 30, 10, "Asturias", "2021-10-31", 45),
    (4, 8, "Anyone available?", "Tonight, near city centre. I'm bored", 30, 0, "Valencia", "2021-10-31", 45),
    (5, 4, "Fiesta de disfraces", "Pues eso, se acerca Halloween, ¿alquien quiere venirse disfrazado y ir a pedir xuxes?", 30, 0, "Asturias", "2021-10-31", 45),
    (6, 6, "Nuevo Capuccino", "Para celebrar nuestros nuevos cafés, almuerzo con descuento y actuación matutina, no te lo pierdas", 70, 4, "Asturias", "2021-10-31", 90),
    (7, 7, "Prueba", "Espero no publicar esto sin querer", 300, 10, "Asturias", "2021-12-31", 5),
    (8, 8, "Quiero conocer gente nueva", "Soy nuevo en la ciudad, quiero conocer gente nueva, soy nuevo estudiante de la UPV. Cervezas?", 20, 0, "Valencia", "2021-10-31", 120),
    (9, 9, "Noche de música", "Esta noche viene unas cuantas bandas locales a tocar, pásate y escucha al pueblo cantar", 80, 15, "Asturias", "2021-10-31", 240),
    (10, 10, "Introduce título", "La verdad esq soy nuevo aquí, alguien quiere quedar mañana por la tarde? No tengo nada que hacer", 30, 0, "Asturias", "2021-10-31", 45),
    (11, 11, "Tomemos el sol", "Quién se viene a la playa el viernes? Cervezas frías, bocadillos y helado", 30, 0, "Valencia", "2021-10-31", 180),
    (12, 12, "Feria del libro", "Pronto va a haber una feria del libro, ¿algún ratón de biblioteca que vaya a ir también?", 10, 0, "Barcelona", "2021-10-31", 45),
    (13, 13, "Recital", "El colegio de música El Mayor celebra el proximo lunes un recital de música. Venganse y escucheme a mí y mis compañeros cantar", 70, 0, "Asturias", "2021-10-31", 125),
    (14, 14, "Cerveza!", "En diez minutos llego al Bar del Monte, hacen unos bocadillos increíbles, por si alguien está solo para almorzar.", 10, 8, "Asturias", "2021-10-31", 30),
    (15, 15, "Inauguración!", "Mañana abrimos y vamos a tener una pequeña celebración. ¡Pásate y redescubre las verduras!", 100, 25, "Murcia", "2021-10-31", 180);

INSERT INTO review VALUES
    (1, 1, "Estupendo", "Me lo pasé estupendamente", 10),
    (2, 1, "Puta mierda", "Para nada aconsejable", 0),
    (3, 1, "OK", null, 9),
    (4, 1, "KO", null, 1),
    (5, 2, "ni bien ni mal", null, 5),
    (6, 2, "bueno", null, 6),
    (7, 3, "Guay", null, 7),
    (8, 3, "Me lo esperaba mejor", null, 4);
    
INSERT INTO entityToActivity VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 2),
    (3, 2),
    (3, 3);

INSERT INTO tags_ent VALUES
    (1, 1),
    (1, 2),
    (2, 6),
    (2, 9),
    (2, 2),
    (3, 8),
    (3, 3);

INSERT INTO tags_act VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (2, 2),
    (2, 3),
    (3, 5),
    (3, 4),
    (3, 8),
    (3, 3);