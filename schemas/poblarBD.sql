-- BD Producción
-- CREATE DATABASE IF NOT EXISTS heroku_8710917fecf1cf0;
-- USE heroku_8710917fecf1cf0;

-- BD Beta
-- CREATE DATABASE IF NOT EXISTS heroku_314befdd836197e;
-- USE heroku_314befdd836197e;

-- BD local
CREATE DATABASE IF NOT EXISTS PIN;
USE PIN;

INSERT INTO rol (id_role, name) VALUES
    (1, "Shop"),
    (2, "User");

INSERT INTO tags (id_tags, name) VALUES
    (1, "Actividades al aire libre"),
    (2, "Actividades escolares"),
    (3, "Ciencia y tecnología"),
    (4, "Cine y teatro"),
    (5, "Deportes y salud"),
    (6, "eSport"),
    (7, "Estilo de vida"),
    (8, "Fiesta"),
    (9, "Gastronomía"),
    (10, "Música"),
    (11, "Negocios"),
    (12, "Ocio"),
    (13, "Viajes"),
    (14, "Otros...");

INSERT INTO images (id_image, urlPath) VALUES
	(1, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630261/FeriaPIN2021/Activity/fblcn0uuapjeb6gog8wd.webp"),
	(2, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630262/FeriaPIN2021/Activity/cmwinaub4kd9nhhqpgcz.webp"),
	(3, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630264/FeriaPIN2021/Activity/ne86jea5izwiaxfjr55n.webp"),
	(5, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630265/FeriaPIN2021/Activity/nmegi4hmyq4gmk33hzld.webp"),
	(6, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630266/FeriaPIN2021/Activity/srhq8nkwywqk4t6on5hn.webp"),
	(7, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630268/FeriaPIN2021/Activity/vcqrrfka3mk6oaboqwol.webp"),
	(8, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630269/FeriaPIN2021/Activity/cxvy90szhftc1lchkafb.webp"),
	(9, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630270/FeriaPIN2021/Activity/lgrqwcnmdk2suk785w7c.webp"),
	(10, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630271/FeriaPIN2021/Activity/g5pdlhwaappmbjcezdmm.webp"),
	(11, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630272/FeriaPIN2021/Activity/cwwsnrhcfzmt24nil7mr.webp"),
	(12, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630274/FeriaPIN2021/Activity/utstkbujur5rbrwexm6m.webp"),
	(13, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630275/FeriaPIN2021/Activity/ovpgfnrcy1qiwjyn1f2h.webp"),
	(14, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630276/FeriaPIN2021/Activity/zsjqsbfnpimaiscoo0s9.webp"),
	(15, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630277/FeriaPIN2021/Activity/kajcjahheuqmisrifk4v.webp"),
	(16, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630278/FeriaPIN2021/Activity/yxe9uduaziair9x7jw95.webp"),
	(17, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630279/FeriaPIN2021/Activity/qyqhizs22urlntwe7spm.webp"),
	(18, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630281/FeriaPIN2021/Activity/czdejmtsjxw8jfymy5n3.webp"),
	(19, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630282/FeriaPIN2021/Activity/zjlawhrrlj9hhziuezbt.webp"),
	(20, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630283/FeriaPIN2021/Activity/zsjkfrpa0tktpkgap2sq.webp"),
	(21, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630284/FeriaPIN2021/Activity/seslvui8wpxiofv1xw1i.webp"),
	(22, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630286/FeriaPIN2021/Activity/dsbklwwzjiiiud3njpb4.webp"),
	(23, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630287/FeriaPIN2021/Activity/dg0up1xawpybktekvyoj.webp"),
	(24, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630288/FeriaPIN2021/Activity/qsobghgryqscctyuvi2u.webp"),
	(25, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630289/FeriaPIN2021/Activity/axotrlnyduxdh0svjyhm.webp"),
	(26, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639630291/FeriaPIN2021/Activity/wm7owsew9zcptpbpn6nn.webp"),
	(27, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628773/FeriaPIN2021/Activity/o8hrk2gtlmunbg5dskcv.webp"),
	(28, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628775/FeriaPIN2021/Activity/av0fgmz8gb5yhmljolff.webp"),
	(29, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628776/FeriaPIN2021/Activity/mqcpbfb5ugwjedgiyjxf.webp"),
	(30, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628778/FeriaPIN2021/Activity/yjt1jrqh1vmcnt0fvifc.webp"),
	(31, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628779/FeriaPIN2021/Activity/voj3hgp8r7td6nsrat7s.webp"),
	(32, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628780/FeriaPIN2021/Activity/i5wusjquduozpaqeuijf.webp"),
	(33, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628781/FeriaPIN2021/Activity/uiv3vpzvbeflkopvphuh.webp"),
	(34, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628783/FeriaPIN2021/Activity/mqpbh0wnomrigy4xfbjb.webp"),
	(35, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628784/FeriaPIN2021/Activity/wa3nona3pf2nuctxnar2.webp"),
	(36, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628785/FeriaPIN2021/Activity/lqys1gzj5ho8aewzx0w9.webp"),
	(37, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628786/FeriaPIN2021/Activity/psbx2sql55cnsmf28s7q.webp"),
	(38, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628788/FeriaPIN2021/Activity/tnfi58b9joyuou0zhunz.webp"),
	(39, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628789/FeriaPIN2021/Activity/rapgwu00wvcjmhdxyaub.webp"),
	(40, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628791/FeriaPIN2021/Activity/bb6iq3bfgvqzdw7nvlbw.webp"),
	(41, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628792/FeriaPIN2021/Activity/wshgwa2zm3zchh6e0wxc.webp"),
	(42, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628794/FeriaPIN2021/Activity/bo4rqc2uv2l4mmecp01k.webp"),
	(43, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628795/FeriaPIN2021/Activity/jffj3nga3ouho4h8cawi.webp"),
	(44, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628797/FeriaPIN2021/Activity/mcgqfbcup4s6xvtuooim.webp"),
	(45, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628798/FeriaPIN2021/Activity/ny1lac3smgwxwvfp9e1f.webp"),
	(46, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628800/FeriaPIN2021/Activity/k09xbdwho9w8beinguni.webp"),
	(47, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628801/FeriaPIN2021/Activity/hypaumllycblbuglcgax.webp"),
	(48, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628802/FeriaPIN2021/Activity/ry2dtc5talanbzd7z4qk.webp"),
	(49, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628804/FeriaPIN2021/Activity/ttihftlvfveqegyxi68k.webp"),
	(50, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628805/FeriaPIN2021/Activity/dugmponxsnf4hv340xyb.webp"),
	(51, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628807/FeriaPIN2021/Activity/ksx79xm7arm77w2zqq9t.webp"),
	(52, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628808/FeriaPIN2021/Activity/tcf4efa8z5mvkixtctfl.webp"),
	(53, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628810/FeriaPIN2021/Activity/p9rcns0oa839ypj6jxdk.webp"),
	(54, "http://res.cloudinary.com/wannahangout2021/image/upload/v1639628812/FeriaPIN2021/Activity/mm235lviy66vmfnvcnpe.webp");

INSERT INTO provinces VALUES
	(1,  "Álava"),
	(2,  "Albacete"),
	(3,  "Alicante"),
	(4,  "Almería"),
	(5,  "Ávila"),
	(6,  "Badajoz"),
	(7,  "Islas Baleares"),
	(8,  "Barcelona"),
	(9,  "Burgos"),
	(10,  "Cáceres"),
	(11,  "Cádiz"),
	(12,  "Castellón"),
	(13,  "Ciudad Real"),
	(14,  "Córdoba"),
	(15,  "La Coruña"),
	(16,  "Cuenca"),
	(17,  "Girona"),
	(18,  "Granada"),
	(19,  "Guadalajara"),
	(20,  "Gipuzkoa"),
	(21,  "Huelva"),
	(22,  "Huesca"),
	(23,  "Jaén"),
	(24,  "León"),
	(25,  "Lleida"),
	(26,  "La Rioja"),
	(27,  "Lugo"),
	(28,  "Madrid"),
	(29,  "Málaga"),
	(30,  "Murcia"),
	(31,  "Navarra"),
	(32,  "Ourense"),
	(33,  "Asturias"),
	(34,  "Palencia"),
	(35,  "Las Palmas"),
	(36,  "Pontevedra"),
	(37,  "Salamanca"),
	(38,  "Santa Cruz de Tenerife"),
	(39,  "Cantabria"),
	(40,  "Segovia"),
	(41,  "Sevilla"),
	(42,  "Soria"),
	(43,  "Tarragona"),
	(44,  "Teruel"),
	(45,  "Toledo"),
	(46,  "Valencia"),
	(47,  "Valladolid"),
	(48,  "Vizcaya"),
	(49,  "Zamora"),
	(50,  "Zaragoza"),
	(51,  "Ceuta"),
	(52,  "Melilla");

INSERT INTO address (id_address, id_province, codPos, location, direction, latitude, longitude) VALUES
	(1, 46, 46120, "Alboraia", "Av. Mare Nostrum, 36", 39.48671569925988, -0.32602104678428906),
	(2, 46, 46020, "Valencia", "C. Emilio Baró, 41-37", 39.4866736811619, -0.3614394767533182),
	(3, 46, 46100, "Burjassot", "Carrer del Dr. Moliner, 2", 39.51041027978192, -0.41506449019920777),
	(4, 46, 46010, "Valencia", "C. de Amadeo de Saboya, 2-4", 39.474009473049556, -0.3630316433638434),
	(9, 46, 46005, "Valencia", "Gran Vía del Marqués del Turia, 65", 39.46807245684281, -0.36675250690513783),
	(19, 46, 46010, "Valencia", "Av. del Botánico Cavanilles, 1", 39.48179197451317, -0.36524853930435147),
	(20, 46, 46013, "Valencia", "Carrer d'Antonio Ferrandis, 50", 39.44911789072239, -0.36205039540202827),
	(5, 46, 46500, "Sagunto", "Carrer Metge Rafael Moya", 39.676668185904006, -0.258765828658274),
	(7, 45, 46169, "Olocau", "Mirador de l'Abella", 39.69537011750718, -0.49397461632787654),
	(10, 14, 14200, "Peñarroya-Pueblonuevo", "C/ Dos de mayo, 22", 39.08989925, -0.545081986577831),
	(12, 46, 46930, "Cuart de Poblet", "C. Majoral de Quart, 1", 39.482501778699536, -0.4396012216226947),
	(13, 13, 13200, "Manzanares", "C. Carrilejos, 43", 39.00137532191904, -3.372950343157947),
	(14, 12, 12006, "Castellón de la Plana", "C. de Jesús Martí Martín, 13-9", 39.99147365142124, -0.0641439836421396),
	(15, 12, 12006, "Castellón de la Plana", "C. del Abeto, 6", 39.983984786795396, -0.06362056718402999),
	(16, 46, 46500, "Sagunto", "Pl. del Cronista Chabret, 7", 39.68074768685425, -0.2779137857173898),
	(17, 46, 46500, "Sagunto", "Carrer Gilet, 14-16", 39.68014460937561, -0.28555737085122407),
	(18, 46, 46010, "Valencia", "C. de Amadeo de Saboya, 2-4", 39.474009473049556, -0.3630316433638434),
	(6, 46, 46011, "Valencia", "Calle Dr. Lluch, 299-293", 39.47403934794228, -0.32737726469032713),
	(8, 46, 46013, "Valencia", "Avinguda dels Germans Maristes, 15-11", 39.451769876036245, -0.36739977459014783),
	(11, 12, 12530, "Burriana", "C. del Bronze, 26-34", 39.87747692547962, -0.11732116967371088),
	(21, 46, 46022, "Valencia", "Camí de Vera, s/n", 39.48284584589209, -0.3477416146072911),
	(22, 46, 46019, "Valencia", "Carrer de Jacomart, 7", 39.4968736, -0.3753872),
	(23, 46, 46019, "València", "Carrer d'Alemany, 38", 39.4971646, -0.3792077),
	(24, 46, 46025, "València", "Carrer d'Alfara del Patriarca", 39.4918921, -0.3846803),
	(25, 46, 46035, "Valencia", "Carrer del Ceramista Mateu, 17", 39.4900015, -0.393801),
	(26, 46, 46035, "Valencia", "Carrer de Alquerías de les Bellver, 30", 39.4926645, -0.3953099),
	(27, 46, 46035, "Valencia", "Carrer de Vicente Ríos Enrique, 7", 39.4770339, -0.4032017000000001),
	(28, 47, 46910, "Benetúser", "Avinguda de Paiporta, 25", 39.4244378, -0.3963914),
	(29, 46, 46134, "Foios", "Carrer Alacant, 18", 39.5347264, -0.3519029),
	(30, 47, 46530, "Puzol", "Carrer Picaio, 25", 39.6208429, -0.3074413),
	(31, 47, 46529, "Canet,de,Berenguer", "Carrer Flor de Mayo, 2, 8", 39.6811666, -0.203605),
	(32, 8, 7800, "Ibiza", "Carrer d'Astúries, 18, 38", 38.9052368, 1.4218615),
	(33, 2, 2200, "Casas-Ibáñez", "C. Tévar, 7", 39.2895285, -1.4713906),
	(34, 47, 46500, "Sagunto", "Citypaq de Correos", 39.6705652, -0.2647971),
	(35, 13, 12530, "Burriana", "Carrer Peu de la Creu, 6, 36", 39.8889676, -0.08802549999999999),
	(36, 13, 12539, "Les,Alqueries", "Carrer Vilavella, 14", 39.8985399, -0.11782),
	(37, 43, 43001, "Tarragona", "Tien21 Domestic Tarraco", 41.1165651, 1.2468232),
	(38, 43, 43002, "Tarragona", "C/ de Santa Joaquima de Vedruna, 13, 15", 41.1204152, 1.248586),
	(39, 33, 33003, "Oviedo", "Calle Uria", 43.3640763, -5.851394399999999),
	(40, 33, 33004, "Oviedo", "C. Arquitecto Reguera, 5", 43.363359, -5.8547791),
	(41, 16, 15703, "Santiago,de,Compostela", "Av. de Xoán Paulo II", 42.8897972, -8.5276146),
	(42, 16, 15701, "Santiago,de,Compostela", "R. de Santiago de Chile, 31, 17", 42.8710373, -8.5496384),
	(43, 49, 49031, "Zamora", "C. Sol, 9", 41.5066546, -5.752953),
	(44, 41, 41007, "Sevilla", "C. Luis Montoto, 65", 37.3876443, -5.9765928),
	(45, 30, 29601, "Marbella", "Av. Trapiche, 17", 36.5141853, -4.8862961),
	(46, 5, 4740, "Roquetas,de,Mar", "C. Minerva, 16", 36.76361, -2.61064),
	(47, 5, 4750, "Dalías", "C. Cantarranas, 103D", 36.8211229, -2.8685698),
	(48, 5, 4750, "Dalías", "Pl. Plazas de Olmo, 28", 36.8215741, -2.8700747),
	(49, 5, 4700, "El,Ejido", "C. Córdoba, 40", 36.7714187, -2.8168639),
	(50, 5, 4700, "El,Ejido", "C. Evangelistas, 4", 36.777055, -2.8198521),
	(51, 24, 23700, "Linares", "Av. del Pisar", 38.099658, -3.6376476);

      
INSERT INTO entity (id_entity, id_role, id_address, phone, sha256, pass, avatar, mail, nick, name, surname, description) VALUES
	(1, 2, 12, 999555111, "AB08B0D233EDD559A58A0561C4569A67032B849B09C975178A8F61A8C4EBF4EF", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619916/FeriaPIN2021/Avatar/User/upttpmjh6mpvgdnmlwzd.webp", "prueba1@feriaupv.es", "keira_ortiz86", "Modesta", "Alfonso Campillo", "El único modo de hacer un gran trabajo es amar lo que haces - Steve Jobs"),
	(2, 2, 5, 999555222, "555D5C623D4C4F8FB8B6F191B3A9E32AB2419D7A4189653C3A31288C73AADAEA", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619918/FeriaPIN2021/Avatar/User/mc1wdxpwfnydod2ynr4e.webp", "prueba2@feriaupv.es", "katelin_gutkowski", "Benito", "del Grande", "Nunca pienso en las consecuencias de fallar un gran tiro… cuando se piensa en las consecuencias se está pensando en un resultado negativo - Michael Jordan"),
	(3, 2, 7, 999666001, "F9479780EF04ED58E2A0006C8BDDC07DA179FD76FF5FF645AA19C43CA75E851F", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619919/FeriaPIN2021/Avatar/User/qmquwn9zsqqdsizv9rqm.webp", "prueba3@feriaupv.es", "myrtle53", "Lino", "Ayuso Tenorio", "El dinero no es la clave del éxito; la libertad para poder crear lo es - Nelson Mandela"),
	(4, 2, 13, 999666005, "948B2E2E62D6F6C255CD207B8FE860E3D438DA1544FB20BC8646CCAAD5F5C572", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619920/FeriaPIN2021/Avatar/User/wwrh57eq9klzqqrg7gh2.webp", "prueba4@feriaupv.es", "kiarra21", "Desiderio Fortunato", "Pedrero Valencia", "Cuanto más duramente trabajo, más suerte tengo - Gary Player"),
	(5, 2, 14, 999666007, "0E224F749B6AAE85D37BFDFAD852EBC9C903674BEFDF242F2DEC3C7EC65CC3E4", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619922/FeriaPIN2021/Avatar/User/ajkpaq0c1xh1gytxuha0.webp", "totallynotfake@mail.com", "green_hamill37", "Cornelio", "Pombo Echevarría", "La inteligencia consiste no sólo en el conocimiento, sino también en la destreza de aplicar los conocimientos en la práctica - Aristóteles"),
	(6, 2, 15, 999666008, "516C2E6E088CE279DDBF7B607814637F5643ED45E507A0638B8E1D6B430F4471", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619923/FeriaPIN2021/Avatar/User/x3qaqjkq7dflgrpho5bf.webp", "prueba5@feriaupv.es", "shaniya.pfeffer", "Manola Jovita", "Castañeda Rozas", "El trabajo duro hace que desaparezcan las arrugas de la mente y el espíritu - Helena Rubinstein "),
	(7, 2, 10, 999666009, "4CDC62B0732ADC171461A8BC7A266BBCCFB92FF4CB44B116DB097D89F80D1288", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619924/FeriaPIN2021/Avatar/User/cqjrmmxmujxsuyjmc4pn.webp", "prueba6@feriaupv.es", "myrna_schneider", "Jose Miguel", "Moliner Oliver", "Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades de que salga bien no te acompañan - Elon Musk"),
	(8, 2, 16, 999666010, "C48740B89302F1CFA17242E4F939C5461A85D9247F4E6CF64001C67E19278DBC", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619925/FeriaPIN2021/Avatar/User/a9qpwshzwr4hlcgwmjre.webp", "prueba7@feriaupv.es", "marcelina.marks", "Macarena", "Torres", "Escoge un trabajo que te guste, y nunca tendrás que trabajar ni un solo día de tu vida - Confucio"),
	(9, 2, 17, 999555335, "363C1FBAA96A5EC8FC0EE7FC38DC4B72F1FB049B4EA7D4FDE1F306BC4571124C", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619926/FeriaPIN2021/Avatar/User/yvtnmpce3g5nltqbg00g.webp", "prueba8@feriaupv.es", "thomas.borer", "Cosme", "Pacheco Moya", "Loving music and life"),
	(10, 2, 18, 999555333, "05C837CD25B64B388A9F0CEDC89BDFDA7611130873C55D42F97EA8BBE73DC714", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "http://res.cloudinary.com/wannahangout2021/image/upload/v1639619930/FeriaPIN2021/Avatar/User/ltvso7q41uytbrbzyvdw.webp", "prueba9@feriaupv.es", "laura.stiedemann96", "Úrsula", "Pera Pallarès", "Un sueño no se hace realidad por arte de magia, necesita sudor, determinación y trabajo duro - Colin Powell"),
	(11, 1, 19, 999666003, "302D5D4909C59A356F935C54A427DC3F2BC258591E62E7A4DAD9B52E1A69C690", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "https://res.cloudinary.com/wannahangout2021/image/upload/v1639621195/FeriaPIN2021/Avatar/Shop/iucxb1j4cughpdh0wnol.webp", "prueba11@feriaupv.es", "PirataPub", "Pirata Pub, S.L.", null, "Tu pub favoríto con temática pirata, ¿A qué esperas, grumete?"),
	(12, 1, 9, 999666002, "713D63EA13722940547EA33F7B7070C2B04707AC8326ABC0339FC599817C1F7B", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "https://res.cloudinary.com/wannahangout2021/image/upload/v1639621197/FeriaPIN2021/Avatar/Shop/eoqy1uxx0hnfcffypejg.webp", "prueba12@feriaupv.es", "PubCarril", "Pub Carril, S.A.", null, "¡Cuidado con lo que tomas, no te salgas de la vía?"),
	(13, 1, 20, 999666006, "39707EF2848A05D4D222E198DDEB95EC47A52F1FA872BEEE5E8F76B0E12B3D52", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "https://res.cloudinary.com/wannahangout2021/image/upload/v1639621196/FeriaPIN2021/Avatar/Shop/zz7zubtcqojsdsj4d6jr.webp", "prueba13@feriaupv.es", "BocateriaVista", "Bocatería a la vista", null, "Los mejores bocadillos de toda la contorná"),
	(14, 1, 1, 999666003, "26F1BB8289FE6FFE055BF6A284867706888ADE3EC7D48C95BB61E34329F1AA52", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "https://res.cloudinary.com/wannahangout2021/image/upload/v1639621192/FeriaPIN2021/Avatar/Shop/jkooxutdgfprnnwqsvkm.webp", "prueba14@feriaupv.es", "TierrasAltas", "Excursiones 'Tierras Altas', S.B.", null, "Aventuras sin límite, desde senderísmo hasta paracaidismo"),
	(15, 1, 2, 999666012, "E44432E1133D2E32E96ED56D87E59E21687F6A9BDADB49A3534B8AADDC3B364F", "03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4", "https://res.cloudinary.com/wannahangout2021/image/upload/v1639621193/FeriaPIN2021/Avatar/Shop/ftqajv2vt7hvtrqcmysm.webp", "prueba15@feriaupv.es", "RestVegano", "Restaurante vegano", null, "Por que la calidad no está reñida con el cuidado de otros seres vidos");


INSERT INTO activity (id_activity, id_entity_creator, id_address, seats, price, min_duration, dateAct, title, description) VALUES
	(1, 14, 1, 30, 7.5, 600, "2021-12-26", "Ruta de senderismo", "Visitaremos 'El salto de la novia'. Solo debes acudir al punto de salida (nuestro local) con el alimento suficiente para pasar el día."),
	(2, 15, 2, 100, 6, 450, "2021-12-16", "Fiesta de Proyectos PIN", "Invitamos a los participantes en la fiesta de proyectos de PIN a probar nuestro menú estrella"),
	(3, 12, 9, 100, 0, 300, "2021-12-17", "¡Gran Inauguración!", "Mañana abrimos y vamos a tener una pequeña celebración. ¡Pásate y redescubre todas las posibilidades de nuestro establecimiento!"),
	(4, 2, 6, 100, 30, 480, "2021-12-31", "Fiesta Nochevieja", "He alquilado un local para empezar el año nuevo con una gran fiesta +18 años (alcohol). No os olvidéis vuestro pasaporte COVID"),
	(5, 3, 8, 15, 0, 60, "2021-12-23", "Aguinaldo", "Recuperemos esta actividad tradicional, vayamos a pedir el aguinaldo, cantando villancicos por los distintos establecimientos"),
	(6, 2, 11, 11, 0, 180, "2021-12-18", "¿Algún plan?", "Acabo de llegar a la ciudad por trabajo, soy nuevo aquí y no conozco a nadie ¿Alguien quiere quedar mañana por la tarde?"),
	(7, 11, 19, 75, 0.5, 180, "2021-11-22", "Cerveza!", "Promoción en quintos de cerveza, para celebrar nuestro 10º aniversario."),	
	(8, 11, 19, 60, 5, 240, "2021-11-23", "Noche de música", "Esta noche viene unas cuantas bandas locales a tocar pásate y escucha al pueblo cantar"),
	(9, 1, 12, 15, 0, 120, "2021-09-03", "Quiero conocer gente nueva", "Soy nuevo en la ciudad quiero conocer gente nueva soy nuevo estudiante de la UPV. Cervezas?"),
 	(10, 15, 2, 100, 0, 240, "2021-09-03", "Nuevo curso escolar", "Por que la vuelta al 'cole' no debe ser triste, celebrémoslo a lo grande"),
	(11, 1, 23, 15, 0, 90, "2021-11-20", "Fiesta", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(12, 2, 24, 20, 10, 120, "2021-11-20", "Excursión por la ciudad", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(13, 3, 25, 25, 15, 180, "2021-11-20", "Reunión de Erasmus", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(14, 4, 26, 30, 20, 270, "2021-11-20", "Salir, beber, el rollo de siempre", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(15, 5, 27, 35, 25, 380, "2021-11-20", "Quedada de botellona", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(16, 6, 28, 40, 0, 560, "2021-11-20", "Miremos las flores del campo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(17, 7, 29, 45, 10, 90, "2021-11-20", "Paseito por los jardines del Turia", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(18, 8, 30, 50, 15, 120, "2021-11-20", "¿Alguien se viene a mi bajo?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(19, 9, 31, 15, 20, 180, "2021-11-20", "Algún torneo de LOL", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(20, 10, 32, 20, 25, 270, "2021-11-20", "¿Quedamos para ver las estrellas?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(21, 1, 33, 25, 0, 380, "2021-11-20", "Vámonos de viaje", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(22, 2, 34, 30, 10, 560, "2021-11-20", "Y nos vamos pa' Madrid!!!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(23, 3, 35, 35, 200, 560, "2021-11-20", "Echamos un partidillo a basquet", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(24, 4, 36, 40, 20, 120, "2021-11-20", "Me aburro… demos una vuelta", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(25, 5, 37, 45, 25, 180, "2021-11-20", "Reunión de pastores, ovejas muertas", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(26, 6, 38, 50, 0, 270, "2021-12-20", "Reunión de ex-alumnos ETSINF 1984", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(27, 7, 39, 15, 10, 380, "2021-12-21", "Celebremos la Navidad", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(28, 8, 40, 20, 15, 560, "2021-12-20", "Cena de Clase 1º Master Informática", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(29, 9, 41, 25, 20, 90, "2021-12-21", "Vamonos lejos, a despejarnos", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(30, 10, 42, 30, 25, 120, "2021-12-20", "¿Unas cervezas?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(31, 1, 43, 35, 0, 180, "2021-12-21", "¡Ostras Pedrín, que sed tengo!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(32, 2, 44, 40, 10, 270, "2021-12-20", "Celebremoslo por todo lo alto, antes de que vengan los exámenes", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(33, 3, 45, 45, 15, 380, "2021-12-21", "Me siento solo, ¿alguien me acompaña?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(34, 4, 46, 50, 20, 560, "2021-12-20", "Pachanga de futbol", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(35, 5, 47, 15, 25, 90, "2021-12-21", "Excursión por la sierra", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(36, 6, 48, 20, 0, 120, "2021-12-20", "Vamonos al campo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(37, 7, 49, 25, 10, 180, "2021-12-21", "Torneo de Póker", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(38, 8, 50, 4, 0, 270, "2021-12-20", "¿Quedamos para estudiar?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum."),
	(39, 9, 51, 35, 20, 380, "2021-12-21", "A esta invito yo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada lorem dui. Curabitur nulla magna, hendrerit non enim nec, pellentesque congue ipsum.");
	

INSERT INTO img_act (id_image, id_activity) VALUES 
	(1, 1),
	(2, 1),
	(3, 2),
	(5, 3),
	(6, 3),
	(7, 3),
	(8, 4),
	(9, 4),
	(10, 5),
	(11, 5),
	(12, 5),
	(13, 6),
	(14, 9),
	(15, 7),
	(16, 7),
	(17, 7),
	(18, 8),
	(19, 8),
	(20, 8),
	(21, 8),
	(22, 10),
	(23, 10),
	(24, 10),
	(26, 11),
	(27, 12),
	(28, 13),
	(29, 14),
	(30, 15),
	(31, 16),
	(32, 17),
	(33, 18),
	(34, 19),
	(35, 20),
	(36, 21),
	(37, 22),
	(38, 23),
	(39, 24),
	(40, 25),
	(41, 26),
	(42, 27),
	(43, 28),
	(44, 29),
	(45, 30),
	(46, 31),
	(47, 32),
	(48, 33),
	(49, 34),
	(50, 35),
	(51, 36),
	(52, 37),
	(53, 38),
	(54, 39);


-- El id_review sobra, podría ser clave primaria (id_activity, id_entity)
INSERT INTO review (id_review, id_activity, id_entity, points, title, description) VALUES
    (1, 7, 2, 5, "Estupendo", "Me lo pasé estupendamente."),
    (2, 7, 4, 3, "No estuvo mal", "Muy buen ambiente, buenos precios, poca variedad de marcas."),
    (3, 7, 6, 4, "Repetiré", "Muy buen ambiente, conocí a mi novia, no sé si celebrarlo ;-)"),
    (4, 7, 5, 3, "Mejorable", "Buenos precios, poca variedad de marcas."),
    (5, 8, 8, 1, "Que aburrimiento", "Desafinaban hasta cuando estaban callados."),
    (6, 8, 5, 2, "No me gustó", null),
    (7, 8, 9, 1, "Nada recomendable", null),
    (8, 8, 10, 2, "ni bien ni mal", null),
    (9, 9, 10, 3, "Enrollao", null),
    (10, 9, 9, 5, "Guay", null),
    (11, 9, 7, 4, "Nice", null),
    (12, 10, 5, 4, "Estupendo", "Me lo pasé estupendamente."),
    (13, 10, 9, 5, "La mejor fiesta de mi vida", null),
    (14, 10, 2, 4, "ni bien ni mal", null),
    (15, 10, 3, 3, "Mejorable", null),
    (16, 10, 1, 5, "Guay", null);

INSERT INTO img_review (id_image, id_review) VALUES 
	(25, 1),
	(26, 2);

INSERT INTO entityToActivity (id_entity, id_activity) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 6),
	(1, 27),
	(1, 28),
	(1, 29),
	(1, 30),
	(1, 31),
	(1, 32),
	(1, 33),
	(1, 34),
	(1, 35),
	(1, 36),
	(1, 37),
	(1, 38),
	(1, 39),
	(2, 1),
	(2, 2),
	(2, 22),
	(2, 23),
	(2, 24),
	(2, 25),
	(2, 26),
	(2, 27),
	(2, 28),
	(2, 29),
	(2, 30),
	(2, 31),
	(2, 32),
	(2, 33),
	(2, 34),
	(3, 11),
	(3, 12),
	(3, 13),
	(3, 14),
	(3, 15),
	(3, 16),
	(3, 17),
	(3, 18),
	(3, 19),
	(3, 20),
	(3, 21),
	(3, 22),
	(3, 23),
	(3, 24),
	(4, 4),
	(4, 5),
	(4, 6),
	(4, 7),
	(4, 8),
	(4, 9),
	(4, 10),
	(4, 11),
	(4, 12),
	(4, 13),
	(4, 14),
	(4, 15),
	(4, 16),
	(4, 17),
	(4, 18),
	(4, 33),
	(4, 34),
	(4, 35),
	(4, 36),
	(4, 37),
	(4, 38),
	(4, 39),
	(5, 1),
	(5, 2),
	(5, 3),
	(5, 4),
	(5, 5),
	(5, 6),
	(5, 7),
	(5, 27),
	(5, 28),
	(5, 29),
	(5, 30),
	(5, 31),
	(5, 32),
	(5, 33),
	(5, 34),
	(5, 35),
	(5, 36),
	(5, 37),
	(5, 38),
	(5, 39),
	(6, 1),
	(6, 2),
	(6, 3),
	(6, 4),
	(6, 5),
	(6, 6),
	(6, 7),
	(6, 8),
	(6, 24),
	(6, 25),
	(6, 26),
	(6, 27),
	(6, 28),
	(6, 29),
	(6, 30),
	(6, 31),
	(6, 32),
	(6, 33),
	(6, 34),
	(6, 35),
	(6, 36),
	(6, 37),
	(7, 21),
	(7, 22),
	(7, 23),
	(7, 24),
	(7, 25),
	(7, 26),
	(7, 27),
	(7, 28),
	(7, 29),
	(7, 30),
	(7, 31),
	(7, 32),
	(7, 33),
	(8, 34),
	(8, 35),
	(8, 36),
	(8, 37),
	(8, 38),
	(8, 39),
	(9, 1),
	(9, 2),
	(9, 3),
	(9, 4),
	(9, 5),
	(9, 6),
	(9, 7),
	(9, 8),
	(9, 30),
	(9, 31),
	(9, 32),
	(9, 33),
	(9, 34),
	(9, 35),
	(9, 36),
	(9, 37),
	(9, 38),
	(9, 39),
	(10, 1),
	(10, 2),
	(10, 3),
	(10, 4),
	(10, 5),
	(10, 6),
	(10, 7),
	(10, 8),
	(10, 9),
	(10, 30),
	(10, 31),
	(10, 32),
	(10, 33),
	(10, 34),
	(10, 35),
	(10, 36),
	(10, 37),
	(10, 38),
	(10, 39),
	(11, 1),
	(11, 2),
	(11, 3),
	(11, 4),
	(11, 5),
	(11, 6),
	(11, 7),
	(11, 8),
	(11, 9),
	(11, 10),
	(11, 11),
	(11, 12),
	(11, 13),
	(11, 14),
	(11, 35),
	(11, 36),
	(11, 37),
	(11, 38),
	(11, 39);


INSERT INTO tags_ent (id_tags, id_entity) VALUES
	(1, 10),
	(1, 11),
	(1, 5),
	(1, 8),
	(1, 9),
	(2, 10),
	(2, 5),
	(2, 8),
	(3, 1),
	(3, 11),
	(3, 12),
	(3, 3),
	(3, 6),
	(3, 8),
	(3, 9),
	(4, 10),
	(4, 2),
	(4, 6),
	(4, 7),
	(4, 9),
	(5, 10),
	(5, 14),
	(5, 15),
	(5, 2),
	(5, 3),
	(5, 4),
	(5, 6),
	(5, 7),
	(5, 8),
	(6, 11),
	(6, 2),
	(6, 4),
	(6, 6),
	(7, 14),
	(7, 15),
	(7, 8),
	(7, 9),
	(8, 10),
	(8, 13),
	(8, 15),
	(8, 2),
	(8, 3),
	(8, 5),
	(8, 8),
	(8, 9),
	(9, 13),
	(9, 2),
	(9, 4),
	(9, 6),
	(9, 7),
	(10, 10),
	(10, 11),
	(10, 3),
	(10, 4),
	(10, 6),
	(11, 1),
	(11, 11),
	(11, 12),
	(11, 13),
	(11, 2),
	(11, 3),
	(11, 6),
	(11, 8),
	(11, 9),
	(12, 12),
	(12, 13),
	(12, 15),
	(12, 4),
	(12, 8),
	(12, 9),
	(13, 11),
	(13, 15),
	(13, 6),
	(14, 10),
	(14, 11),
	(14, 12),
	(14, 3),
	(14, 4);
    
INSERT INTO tags_act (id_tags, id_activity) VALUES
	(1, 1),
	(1, 12),
	(1, 19),
	(1, 20),
	(1, 25),
	(1, 29),
	(1, 3),
	(1, 31),
	(1, 33),
	(1, 38),
	(1, 39),
	(1, 5),
	(1, 6),
	(1, 8),
	(1, 9),
	(2, 1),
	(2, 11),
	(2, 16),
	(2, 19),
	(2, 22),
	(2, 24),
	(2, 27),
	(2, 29),
	(2, 32),
	(2, 33),
	(2, 37),
	(2, 38),
	(2, 4),
	(2, 5),
	(2, 6),
	(2, 9),
	(3, 1),
	(3, 10),
	(3, 12),
	(3, 16),
	(3, 17),
	(3, 18),
	(3, 19),
	(3, 21),
	(3, 24),
	(3, 29),
	(3, 3),
	(3, 32),
	(3, 34),
	(3, 38),
	(3, 39),
	(3, 7),
	(3, 9),
	(4, 10),
	(4, 12),
	(4, 13),
	(4, 15),
	(4, 16),
	(4, 18),
	(4, 19),
	(4, 2),
	(4, 20),
	(4, 21),
	(4, 25),
	(4, 27),
	(4, 3),
	(4, 31),
	(4, 32),
	(4, 36),
	(4, 38),
	(4, 39),
	(4, 7),
	(4, 8),
	(4, 9),
	(5, 1),
	(5, 14),
	(5, 17),
	(5, 18),
	(5, 19),
	(5, 2),
	(5, 21),
	(5, 22),
	(5, 23),
	(5, 28),
	(5, 32),
	(5, 34),
	(5, 38),
	(6, 1),
	(6, 11),
	(6, 12),
	(6, 15),
	(6, 16),
	(6, 18),
	(6, 19),
	(6, 20),
	(6, 21),
	(6, 25),
	(6, 27),
	(6, 28),
	(6, 3),
	(6, 30),
	(6, 31),
	(6, 32),
	(6, 33),
	(6, 34),
	(6, 35),
	(6, 37),
	(6, 39),
	(6, 6),
	(6, 7),
	(6, 8),
	(7, 10),
	(7, 12),
	(7, 15),
	(7, 16),
	(7, 19),
	(7, 2),
	(7, 28),
	(7, 3),
	(7, 30),
	(7, 31),
	(7, 37),
	(7, 39),
	(7, 5),
	(7, 8),
	(8, 1),
	(8, 10),
	(8, 2),
	(8, 20),
	(8, 23),
	(8, 25),
	(8, 29),
	(8, 3),
	(8, 30),
	(8, 31),
	(8, 32),
	(8, 35),
	(8, 36),
	(8, 37),
	(8, 39),
	(8, 5),
	(8, 7),
	(9, 14),
	(9, 16),
	(9, 17),
	(9, 18),
	(9, 25),
	(9, 3),
	(9, 33),
	(9, 34),
	(9, 35),
	(9, 37),
	(9, 38),
	(9, 8),
	(10, 15),
	(10, 2),
	(10, 20),
	(10, 22),
	(10, 23),
	(10, 24),
	(10, 28),
	(10, 29),
	(10, 3),
	(10, 31),
	(10, 34),
	(10, 36),
	(10, 39),
	(10, 8),
	(11, 10),
	(11, 15),
	(11, 19),
	(11, 20),
	(11, 23),
	(11, 26),
	(11, 27),
	(11, 29),
	(11, 3),
	(11, 30),
	(11, 33),
	(11, 35),
	(11, 36),
	(11, 37),
	(11, 39),
	(11, 4),
	(11, 9),
	(12, 13),
	(12, 25),
	(12, 27),
	(12, 31),
	(12, 33),
	(12, 35),
	(12, 37),
	(12, 38),
	(12, 39),
	(12, 6),
	(12, 7),
	(13, 13),
	(13, 14),
	(13, 18),
	(13, 19),
	(13, 2),
	(13, 20),
	(13, 22),
	(13, 23),
	(13, 24),
	(13, 25),
	(13, 27),
	(13, 28),
	(13, 29),
	(13, 33),
	(13, 34),
	(13, 35),
	(13, 5),
	(13, 9),
	(14, 12),
	(14, 18),
	(14, 19),
	(14, 2),
	(14, 21),
	(14, 22),
	(14, 24),
	(14, 28),
	(14, 3),
	(14, 30),
	(14, 38),
	(14, 39),
	(14, 5),
	(14, 7);
