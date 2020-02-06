--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.images ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."images_productId_seq";
DROP TABLE public.images;
DROP TABLE public."emailSubs";
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: emailSubs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."emailSubs" (
    email text NOT NULL
);


--
-- Name: images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images (
    "productId" integer NOT NULL,
    image1 text NOT NULL,
    image2 text NOT NULL,
    image3 text NOT NULL,
    image4 text NOT NULL
);


--
-- Name: images_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."images_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: images_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."images_productId_seq" OWNED BY public.images."productId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "creditCard" text NOT NULL,
    "expirationDate" text NOT NULL,
    cvv text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: images productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images ALTER COLUMN "productId" SET DEFAULT nextval('public."images_productId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
19	44	3	15000	1
22	45	1	19000	2
21	45	3	15000	2
54	47	3	15000	1
56	47	5	17000	1
25	46	3	15000	2
55	47	4	13000	2
53	47	2	19000	4
59	49	3	15000	1
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
44	2020-02-04 21:15:02.444716+00
45	2020-02-04 21:15:07.753478+00
46	2020-02-04 21:17:45.987392+00
47	2020-02-04 21:22:23.568123+00
\.


--
-- Data for Name: emailSubs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."emailSubs" (email) FROM stdin;
dfdfd
timothylee3508@gmail.com
timothylee3508@gmail.com
dfadf@gmail.com
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.images ("productId", image1, image2, image3, image4) FROM stdin;
1	/images/Jordan1RetroRed_1.jpg	/images/Jordan1RetroRed_2.jpg	/images/Jordan1RetroRed_3.jpg	/images/Jordan1RetroRed_4.jpg
2	/images/Jordan1RetroBlue_1.jpg	/images/Jordan1RetroBlue_2.jpg	/images/Jordan1RetroBlue_3.jpg	/images/Jordan1RetroBlue_4.jpg
3	/images/AirForce1_1.jpg	/images/AirForce1_2.jpg	/images/AirForce1_3.jpg	/images/AirForce1_4.jpg
4	/images/NikeBlazer_1.jpg	/images/NikeBlazer_2.jpg	/images/NikeBlazer_3.jpg	/images/NikeBlazer_4.jpg
5	/images/NikeDunkGreen_1.jpg	/images/NikeDunkGreen_2.jpg	/images/NikeDunkGreen_3.jpg	/images/NikeDunkGreen_4.jpg
6	/images/AirForce1Volt_1.jpg	/images/AirForce1Volt_2.jpg	/images/AirForce1Volt_3.jpg	/images/AirForce1Volt_4.jpg
7	/images/AirMax90_1.jpg	/images/AirMax90_2.jpg	/images/AirMax90_3.jpg	/images/AirMax90_4.jpg
8	/images/AirPresto_1.jpg	/images/AirPresto_2.jpg	/images/AirPresto_3.jpg	/images/AirPresto_4.jpg
9	/images/AirVaporMax_1.jpg	/images/AirVaporMax_2.jpg	/images/AirVaporMax_3.jpg	/images/AirVaporMax_4.jpg
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", "fullName", email, phone, "creditCard", "expirationDate", cvv, "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Jordan 1 Retro High Off-White Chicago	19000	/images/Jordan1RetroRed_1.jpg	STYLE AA3834-101 COLORWAY White/Black-Varsity Red RELEASE DATE 09/09/2017	The Off-White x Air Jordan 1 Retro High OG was one of the most highly anticipated footwear collaborations of 2017. It marked the first time Virgil Abloh, founder of the Milan-based fashion label and Jordan Brand had teamed up. Nicknamed "The 10" edition, this pair comes in the original Chicago-themed white, black and varsity red colorway. Featuring a white, red and black-based deconstructed leather upper with a Swooshless medial side branded with "Off-White for Nike Air Jordan 1, Beaverton, Oregon, USA © 1985."
2	Jordan 1 Retro High Off-White University Blue	19000	/images/Jordan1RetroBlue_1.jpg	STYLE AQ0818-148 COLORWAY White/Dark Powder Blue-Cone RELEASE DATE 06/23/2018	Time for some Tobacco Road vibes with these Jordan 1 Retro Off-Whites. Also known as the “UNC” editions, these Jordan 1s are the third colorway designed by Virgil Abloh and made in collaboration with his Off-White label. The sneakers come in a white, dark powder blue and cone colorway, with a white and blue deconstructed leather upper and Off-White detailing throughout.
3	Air Force 1 Low Off-White MCA University Blue	15000	/images/AirForce1_1.jpg	STYLE Cl1173-400 COLORWAY University Blue/Metallic Silver RELEASE DATE 07/20/2019	Virgil Abloh added yet another colorway to his coveted selection of Off-White Air Force 1 iterations that will forever preserve his Figures of Speech exhibit in sneaker history. Having the first pair exclusively gifted to Serena Williams in May of 2019, these Air Force 1 Low Off-White MCA University Blues were one of Virgils many highly anticipated releases of 2019.
4	Nike Blazer Mid Off-White All Hallow’s Eve	13000	/images/NikeBlazer_1.jpg	STYLE AA3832-700 COLORWAY Canvas/Total Orange-Pale Vanilla RELEASE DATE 10/03/2018	Don’t sleep because Virgil Abloh continues to give the shoe game a nightmare with the Nike Blazer Mid Off-White All Hallow’s Eve. This pumpkin inspired half of the “Spooky Pack” comes with a pale vanilla upper, total orange “Swoosh”, and pale vanilla sole.
5	Nike Dunk Low Off-White Pine Green	17000	/images/NikeDunkGreen_1.jpg	STYLE CT0856-1 COLORWAY White/Pine Green-Pine Green RELEASE DATE 12/20/2019	Virgil Abloh pays homage to skate culture’s adoption of 1980’s Nike Basketball silhouettes with the Nike Dunk Low Off-White Pine Green. This colorway was not a part of the original Be True To Your School collection in 1985; instead, it derives from the Gorge Green colorway that debuted in 2003 as part of a general release.
6	Air Force 1 Low Off-White Volt	17000	/images/AirForce1Volt_1.jpg	STYLE A04606-700 COLORWAY Volt/Hyper Jade-Cone-Black RELEASE DATE 12/19/2018	Be more lit than a lightning bolt while wearing Nike and Virgil’s Air Force 1 Low Off-White Volt. This AF1 comes with a volt upper, black Nike “Swoosh”, volt midsole, and volt sole.
7	Air Max 90 Off-White Desert Ore	16000	/images/AirMax90_1.jpg	STYLE AA7293-200 COLORWAY Desert Ore/Desert Ore-Hyper RELEASE DATE 02/07/2019	Virgil is doing his best attempt in trying to dry out the sneaker competition with the release of the Air Max 90 Off-White “Desert Ore”. This AM 90 comes with a beige upper, mango orange Nike “Swoosh”, beige midsole, and beige sole.
8	Air Presto Off-White	16000	/images/AirPresto_1.jpg	STYLE AA3830-001 COLORWAY Black/Black-Muslin RELEASE DATE 09/09/2017	The Virgil Abloh’s Nike Air Presto Off White caused an absolute frenzy. It features a black Nike Swoosh sewn onto the lateral side. Finally, "AIR" is written in classic Virgil fashion on the side heel, completing this deconstructed, utilitarian #vibe.
9	Air VaporMax Off-White	25000	/images/AirVaporMax_1.jpg	STYLE AA3831-001 COLORWAY Black/White-Clear RELEASE DATE 09/09/2017	Following up from “The Ten” collection in 2017, the Nike VaporMax Off-White are certainly “popular.” Designed by Virgil Abloh, these shoes are an extension of the original VaporMaxs featured in “The Ten” drop, the main difference being a white tongue and a Swoosh atop the clear outsole.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 59, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 47, true);


--
-- Name: images_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."images_productId_seq"', 9, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY ("productId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

