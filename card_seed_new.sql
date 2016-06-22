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

INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (1, 1, '<span class="chunk "></span><span class="chunk highlighter-red">May 28th</span><span class="chunk ">: </span><span class="chunk highlighter-blue">Manchester United</span><span class="chunk "> </span><span class="chunk highlighter-green">3:1</span><span class="chunk "> </span><span class="chunk highlighter-blue">Liverpool</span><span class="chunk "></span>', 4, 1466559309901, '2016-06-21 17:27:31.230672', '2016-06-21 17:27:31.230672');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (4, 4, '<span class="chunk ">According to a poll by </span><span class="chunk highlighter-red">Monmouth University</span><span class="chunk ">, </span><span class="chunk highlighter-blue">49</span><span class="chunk ">% of people say it''s "very important" to keep </span><span class="chunk highlighter-blue">Donald Trump</span><span class="chunk "> out of the White House. </span><span class="chunk highlighter-green">41</span><span class="chunk ">% of people say that it''s "very important" to keep </span><span class="chunk highlighter-green">Hillary Clinton</span><span class="chunk "> out of the White House.</span>', 3, 1466559876102, '2016-06-21 17:40:55.714419', '2016-06-21 17:40:55.714419');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (2, 2, '<span class="chunk ">Famous Blunders: 1) </span><span class="chunk highlighter-red">Never get involved in a land war with Asia;</span><span class="chunk "> 2) </span><span class="chunk highlighter-blue">Never go in against a Sicilian when death is on the line</span><span class="chunk "></span>', 3, 1466559924873, '2016-06-21 17:31:07.504187', '2016-06-21 17:31:07.504187');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (3, 3, '<span class="chunk ">Word of the Day: </span><span class="chunk highlighter-red">Iatrogenic</span><span class="chunk "> ; </span><span class="chunk highlighter-blue">A medical disorder caused by the physician treating it</span><span class="chunk ">.</span>', 3, 1466560252553, '2016-06-21 17:33:52.350924', '2016-06-21 17:33:52.350924');
INSERT INTO cards (id, deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES (8, 8, '<span class="chunk ">English: </span><span class="chunk highlighter-red">Hello</span><span class="chunk "> | Chinese: </span><span class="chunk highlighter-blue">你好 </span><span class="chunk highlighter-green">[ní hǎo]</span><span class="chunk highlighter-blue"></span><span class="chunk "> | Persian: </span><span class="chunk highlighter-blue">درود</span><span class="chunk "> </span><span class="chunk highlighter-green">[Doroud]</span><span class="chunk "> | Russian: </span><span class="chunk highlighter-blue">Приве́т</span><span class="chunk "> </span><span class="chunk highlighter-green">[Privyet]</span><span class="chunk "></span>', 2, 1466560899924, '2016-06-21 18:59:16.939501', '2016-06-21 18:59:16.939501');


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gsb
--

SELECT pg_catalog.setval('cards_id_seq', 8, true);


--
-- PostgreSQL database dump complete
--
