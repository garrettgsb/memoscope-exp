--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: gsb
--

INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (6, 1, '<span class="chunk "></span><span class="chunk highlighter-red">May 28th</span><span class="chunk ">: </span><span class="chunk highlighter-blue">Manchester United</span><span class="chunk "> </span><span class="chunk highlighter-green">3:1</span><span class="chunk "> </span><span class="chunk highlighter-blue">Liverpool</span><span class="chunk "></span>', 6, 1466569243224, '2016-06-21 17:27:31.230672', '2016-06-21 17:27:31.230672');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (1, 9, '<span class="chunk ">Every minute, </span><span class="chunk highlighter-blue">700 people</span><span class="chunk "> take a ride in an Uber car.</span>', 6, 1466634032475, '2016-06-21 19:17:50.122889', '2016-06-21 19:17:50.122889');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (2, 4, '<span class="chunk ">According to a poll by </span><span class="chunk highlighter-red">Monmouth University</span><span class="chunk ">, </span><span class="chunk highlighter-blue">49</span><span class="chunk ">% of people say it''s "very important" to keep </span><span class="chunk highlighter-blue">Donald Trump</span><span class="chunk "> out of the White House. </span><span class="chunk highlighter-green">41</span><span class="chunk ">% of people say that it''s "very important" to keep </span><span class="chunk highlighter-green">Hillary Clinton</span><span class="chunk "> out of the White House.</span>', 6, 1466634033609, '2016-06-21 17:40:55.714419', '2016-06-21 17:40:55.714419');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (3, 2, '<span class="chunk ">Famous Blunders:<br /> 1) </span><span class="chunk highlighter-red">Never get involved in a land war with Asia;</span><br /><span class="chunk "> 2) </span><span class="chunk highlighter-blue">Never go in against a Sicilian when death is on the line</span><span class="chunk "></span>', 6, 1466634034134, '2016-06-21 17:31:07.504187', '2016-06-21 17:31:07.504187');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (5, 8, '<span class="chunk ">English: </span><span class="chunk highlighter-red">Hello</span><span class="chunk "> | Chinese: </span><span class="chunk highlighter-blue">你好 </span><span class="chunk highlighter-green">[ní hǎo]</span><span class="chunk highlighter-blue"></span><span class="chunk "> | Persian: </span><span class="chunk highlighter-blue">درود</span><span class="chunk "> </span><span class="chunk highlighter-green">[Doroud]</span><span class="chunk "> | Russian: </span><span class="chunk highlighter-blue">Приве́т</span><span class="chunk "> </span><span class="chunk highlighter-green">[Privyet]</span><span class="chunk "></span>', 6, 1466634035035, '2016-06-21 18:59:16.939501', '2016-06-21 18:59:16.939501');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (7, 3, '<span class="chunk ">Word of the Day: </span><span class="chunk highlighter-red">Iatrogenic</span><span class="chunk "> ; </span><span class="chunk highlighter-blue">A medical disorder caused by the physician treating it</span><span class="chunk ">.</span>', 6, 1466634035820, '2016-06-21 17:33:52.350924', '2016-06-21 17:33:52.350924');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (4, 7, '<span class="chunk ">The world''s highest earning actor is </span><span class="chunk highlighter-blue">Robert Downey Jr.</span><span class="chunk highlighter-red"></span><span class="chunk highlighter-red"></span><span class="chunk ">, who pulled </span><span class="chunk highlighter-green">$40 million</span><span class="chunk "> for </span><span class="chunk highlighter-red">Captain America: Civil War.</span><span class="chunk "></span>', 5, 1466636461320, '2016-06-21 20:58:35.39', '2016-06-21 20:58:35.39');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (10, 9, '<span class="chunk ">Sensory memory: </span><span class="chunk highlighter-red">Decays quickly</span><span class="chunk ">, lasts for </span><span class="chunk highlighter-blue">less than a second</span><span class="chunk "></span>', 4, 1466636470996, '2016-06-22 15:37:06.934733', '2016-06-22 15:37:06.934733');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (11, 9, '<span class="chunk ">Sensory memory, three types: </span><span class="chunk highlighter-red">Iconic (visual)</span><span class="chunk ">, </span><span class="chunk highlighter-blue">Echoic (auditory)</span><span class="chunk ">, and </span><span class="chunk highlighter-green">Haptic (touch)</span><span class="chunk "></span>', 4, 1466636473631, '2016-06-22 15:37:58.679164', '2016-06-22 15:37:58.679164');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (8, 7, '<span class="chunk ">There are over </span><span class="chunk highlighter-green">6000</span><span class="chunk "> bones in the human ear.</span>', 4, 1466636458217, '2016-06-22 15:20:58.331684', '2016-06-22 15:20:58.331684');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (9, 8, '<span class="chunk "></span><span class="chunk highlighter-red">1 in 4</span><span class="chunk "> adults in North America are allergic to </span><span class="chunk highlighter-yellow">wood</span><span class="chunk ">.</span>', 4, 1466636459843, '2016-06-22 15:21:42.686723', '2016-06-22 15:21:42.686723');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (15, 9, '<span class="chunk ">"On Memory" (</span><span class="chunk highlighter-red">1885</span><span class="chunk ">), </span><span class="chunk highlighter-blue">Hermann Ebbinghaus</span><span class="chunk ">: Ability to retrieve information is enhanced by </span><span class="chunk highlighter-green">repetition</span><span class="chunk ">. Frequent repetition causes </span><span class="chunk highlighter-yellow">cognitive associations to passively form</span><span class="chunk ">.</span>', 0, NULL, '2016-06-22 16:00:26.615508', '2016-06-22 16:00:26.615508');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (13, 9, '<span class="chunk ">Short-term memory: Also called </span><span class="chunk highlighter-green">working memory</span><span class="chunk ">. Lasts between </span><span class="chunk highlighter-yellow">several seconds and a minute</span><span class="chunk "> without rehearsal.</span>', 3, 1466636456801, '2016-06-22 15:40:16.128685', '2016-06-22 15:40:16.128685');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (12, 9, '<span class="chunk ">Sensory memory, three types: </span><span class="chunk highlighter-red">Iconic (visual)</span><span class="chunk ">, </span><span class="chunk highlighter-blue">Echoic (auditory)</span><span class="chunk ">, and </span><span class="chunk highlighter-green">Haptic (touch)</span><span class="chunk "></span>', 4, 1466636466251, '2016-06-22 15:37:58.680505', '2016-06-22 15:37:58.680505');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (14, 9, '<span class="chunk ">In </span><span class="chunk highlighter-yellow">1956</span><span class="chunk highlighter-red"></span><span class="chunk highlighter-red"></span><span class="chunk ">, </span><span class="chunk highlighter-blue">George A. Miller</span><span class="chunk "> found that people can store </span><span class="chunk highlighter-green">7 ± 2</span><span class="chunk "> items in short-term memory at once, but modern research puts that number closer to </span><span class="chunk highlighter-red">4-5</span><span class="chunk ">.</span>', 2, 1466636477838, '2016-06-22 15:44:08.075672', '2016-06-22 15:44:08.075672');


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gsb
--

SELECT pg_catalog.setval('cards_id_seq', 15, true);


--
-- PostgreSQL database dump complete
--

