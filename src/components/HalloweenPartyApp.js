'use client';

import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Users, Heart, User, UserPlus } from "lucide-react";
import QRCode from "qrcode";

const dishes = [
  // 🕸️ Petites bouchées & Snacks / 小吃拼盘
  {
    id: "momies-saucisses",
    nameFr: "Momies de saucisses",
    nameCn: "木乃伊香肠卷（酥皮裹小香肠）",
    image: "https://image.hkhl.hk/f/1024p0/0x0/100/none/7f9a6a251b59b8ee0a82fb285bc5632e/2022-10/DFDF0916DEMO0100.JPG",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    isDisabled: true,
    takenBy: "Diliana",
    recipe: {
      ingredients: [
        "2 pâtes feuilletées (pour 12 personnes)",
        "12 saucisses type Knacki",
        "1 jaune d'œuf (dilué dans un peu d'eau pour la dorure)",
        "Grains de poivre ou graines de sésame (pour les yeux)",
        "Petits moules ou caissettes individuelles",
        "Sauce ketchup 'sanglante' ou mayonnaise colorée (optionnel)"
      ],
      instructions: [
        "Déroulez les pâtes feuilletées et coupez-les en longues lamelles de largeur moyenne",
        "Préchauffez le four à 210°C (thermostat 7)",
        "Enroulez chaque saucisse avec quelques bandes de pâte feuilletée comme des bandages",
        "Laissez un petit espace libre pour placer les 'yeux' après cuisson",
        "Badigeonnez chaque momie avec le jaune d'œuf délayé dans un peu d'eau",
        "Enfournez 15 à 20 minutes jusqu'à ce qu'elles soient bien dorées",
        "Laissez tiédir puis déposez dans de petits moules ou caissettes individuelles",
        "Ajoutez deux petits grains de poivre ou points de moutarde pour former les yeux",
        "Servez avec une sauce ketchup 'sanglante' pour un effet encore plus effrayant !"
      ],
      time: "40 minutes (20 min préparation + 20 min cuisson)",
      difficulty: "Très facile",
      tips: "🧙‍♀️ Astuce Déco : Servez-les avec une sauce ketchup 'sanglante' ou une mayonnaise colorée au charbon végétal pour un effet encore plus effrayant ! Présentation idéale pour un buffet d'Halloween ou un apéritif thématique."
    }
  },
  {
    id: "doigts-sorciere",
    nameFr: "Doigts de sorcière au fromage",
    nameCn: "女巫手指饼干（咸味饼干棒 + 杏仁指甲）",
    image: "https://imgproxy.icook.network/safe/rt:fit/w:1200/el:0/q:80/plain/http://tokyo-kitchen.icook.tw.s3.amazonaws.com/uploads/recipe/cover/313327/491474de3b3064f9.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    recipe: {
      ingredients: [
        "400g de farine (pour 12 personnes)",
        "200g de beurre à température ambiante",
        "100g de fromage râpé (emmental, comté ou cheddar)",
        "2 cuillères à café de graines de pavot",
        "4 œufs",
        "30 amandes entières (pour les ongles)",
        "2 cuillères à café de ketchup",
        "1 pincée de sel",
        "Petites caissettes ou plateau pour présentation"
      ],
      instructions: [
        "Dans le bol d'un robot, mélangez la farine et le beurre ramolli",
        "Ajoutez les graines de pavot et le fromage râpé",
        "Battez rapidement les œufs puis ajoutez-les à la pâte",
        "Mélangez jusqu'à obtenir une boule homogène qui se détache du bol",
        "Emballez dans du film alimentaire et placez 30 minutes au frais",
        "Préchauffez le four à 180°C",
        "Séparez la pâte en environ 30 portions de 30g chacune",
        "Roulez chaque portion en boudin d'environ 1 cm de large",
        "Déposez sur une plaque recouverte de papier cuisson",
        "Enfoncez une amande à une extrémité pour former l'ongle",
        "Avec un couteau, marquez des stries sous l'ongle et sur le pli du doigt",
        "Enfournez 15 minutes jusqu'à légère coloration dorée",
        "À la sortie du four, retirez délicatement les amandes et recollez-les avec un peu de ketchup",
        "Laissez refroidir complètement sur une grille avant de servir"
      ],
      time: "1h (15 min préparation + 30 min repos + 15 min cuisson)",
      difficulty: "Facile",
      tips: "💀 Astuce Halloween : Ajoutez un peu de paprika ou purée de betterave sur le doigt pour simuler du sang. Servez sur un plateau décoré avec de la salade verte ou du papier rouge pour accentuer l'effet Halloween. Présentation idéale dans petites caissettes individuelles."
    }
  },
  {
    id: "sandwichs-tombeaux",
    nameFr: "Sandwichs tombeaux (RIP)",
    nameCn: "墓碑三明治（吐司切成墓碑形状）",
    image: "https://connetable.com/wp-content/uploads/Connetable-TombeauxHalloween-PAYSAGEpackR@SophieFrancoisMulhens-scaled-1707x1707.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    isDisabled: true,
    takenBy: "Lilia",
    recipe: {
      ingredients: [
        "1 ½ boîte de sardines sans huile, sauce tomate & basilic Connétable",
        "375g de fromage à tartiner type Saint-Morêt",
        "24 tranches de pain de mie",
        "6 tranches fines de chorizo",
        "Salade verte ou chapelure noire (olives mixées) pour décoration",
        "Emporte-pièce forme tombeau ou gabarit"
      ],
      instructions: [
        "Dans un bol, écrasez les sardines avec leur sauce tomate et basilic à l'aide d'une fourchette",
        "Ajoutez le fromage frais et mélangez bien pour obtenir une pâte homogène",
        "À l'aide d'un emporte-pièce, découpez les tranches de pain en formes de tombeaux",
        "Tartinez une tranche de pain avec la préparation aux sardines",
        "Recouvrez d'une autre tranche pour former un petit sandwich tombeau",
        "Répétez l'opération avec le reste des ingrédients",
        "Découpez des bandes de chorizo de deux tailles différentes",
        "Disposez-les sur le dessus en forme de croix pour imiter des pierres tombales",
        "Placez sur un plateau décoré de salade verte ou chapelure noire pour l'effet 'terre de cimetière'"
      ],
      time: "15 minutes",
      difficulty: "Facile",
      tips: "🧙‍♀️ Astuce Déco : Écrivez 'R.I.P.' sur les tombeaux avec de la sauce tomate ou crème balsamique. Ajoutez des 'vers de terre' en cornichon ou spaghetti coloré autour des pierres tombales ! Présentation idéale sur petites assiettes individuelles ou grand plateau façon 'cimetière gourmand'."
    }
  },
  {
    id: "oeuf-mimosa",
    nameFr: "Œuf mimosa araignée",
    nameCn: "蜘蛛魔鬼蛋",
    image: "https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/5e0aba6b-fe7b-4331-b04c-80f02bc043fb_QzwJhxO.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZpbGVkJTIwZWdnc3xlbnwxfHx8fDE3NjA3MTgzNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    isDisabled: true,
    takenBy: "Aurelien/Valentina",
    recipe: {
      ingredients: [
        "12 œufs (pour 12 personnes)",
        "24 olives noires dénoyautées",
        "6 cuillères à soupe de mayonnaise",
        "Ciboulette hachée",
        "Sel et poivre",
        "Paprika (optionnel pour la couleur)",
        "Plat long ou assiettes individuelles pour présentation"
      ],
      instructions: [
        "Plongez les œufs dans de l'eau bouillante salée et cuisez 8 à 10 minutes",
        "Laissez refroidir puis écalez les œufs",
        "Coupez chaque œuf en deux dans le sens de la longueur",
        "Retirez les jaunes et placez-les dans un saladier",
        "Ajoutez la mayonnaise, la ciboulette, le sel et le poivre aux jaunes",
        "Mélangez jusqu'à obtenir une texture crémeuse",
        "Disposez les blancs d'œufs dans un plat ou assiettes individuelles",
        "Remplissez chaque blanc avec le mélange de jaunes à la mayonnaise",
        "Découpez la moitié des olives en deux pour former le corps des araignées",
        "Coupez l'autre moitié des olives en fines lamelles pour les pattes",
        "Déposez le corps d'olive sur chaque œuf puis disposez les pattes autour",
        "Saupoudrez légèrement de paprika pour la couleur Halloween et servez aussitôt"
      ],
      time: "20 minutes (10 min cuisson + 10 min préparation)",
      difficulty: "Très facile",
      tips: "🕷️ Astuce Halloween : Pour plus de réalisme, vous pouvez remplacer certaines olives par des tomates cerises coupées pour des 'araignées rouges'. Ajoutez quelques feuilles de salade pour créer un petit 'cimetière d'araignées'. Présentation idéale dans un plat long ou sur de petites assiettes individuelles."
    }
  },
  {
    id: "balais-sorciere",
    nameFr: "Balais de sorcière",
    nameCn: "女巫扫帚（咸棒 + 奶酪条 + 香葱绑）",
    image: "https://images.ricardocuisine.com/services/recipes/1011689568540e07238bc37.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    isDisabled: true,
    takenBy: "Mia/Thibault",
    recipe: {
      ingredients: [
        "Bâtonnets salés (bretzel sticks)",
        "Bâtonnets de fromage",
        "Ciboulette fraîche",
        "Couteau bien aiguisé"
      ],
      instructions: [
        "Coupez les bâtonnets de fromage en franges à une extrémité",
        "Insérez délicatement un bâtonnet salé dans l'autre extrémité",
        "Attachez avec un brin de ciboulette pour former le balai",
        "Disposez joliment sur un plateau de service"
      ],
      time: "15 minutes",
      difficulty: "Très facile"
    }
  },
  {
    id: "doigts-zombie",
    nameFr: "Doigts de zombie",
    nameCn: "僵尸手指胡萝卜（配白奶酪蘸酱）",
    image: "https://cache.marieclaire.fr/data/photo/w1999_ci/6n/recette-doigt-de-sorciere.webp",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    recipe: {
      ingredients: [
        "30 amandes effilées (pour 12 personnes)",
        "600g de fromage blanc",
        "3 petits bouquets de ciboulette",
        "1,5 c. à soupe de jus de citron",
        "1,5 c. à café de moutarde",
        "36 carottes moyennes (3 par personne)",
        "Sel et poivre",
        "Bol de service pour la sauce"
      ],
      instructions: [
        "Lavez et épluchez les carottes",
        "Découpez en biais les extrémités des carottes pour former des 'doigts'",
        "Rincez et ciselez finement la ciboulette",
        "Dans un grand bol, fouettez énergiquement le fromage blanc",
        "Ajoutez la ciboulette ciselée, la moutarde et le jus de citron",
        "Mélangez bien tous les ingrédients",
        "Assaisonnez avec sel et poivre selon votre goût",
        "Plantez délicatement une amande effilée à l'extrémité de chaque carotte pour faire 'l'ongle'",
        "Disposez les 'doigts de zombie' autour du bol de sauce",
        "Servez immédiatement en apéritif terrifiant !"
      ],
      time: "30 minutes",
      difficulty: "Très facile",
      tips: "💡 Astuce Halloween : Choisissez des carottes de différentes tailles pour plus de réalisme. La sauce blanche fait un parfait contraste 'sanglant' avec les carottes oranges !"
    }
  },
  {
    id: "mini-quiches",
    nameFr: "Mini quiches au potiron et chèvre",
    nameCn: "南瓜山羊奶酪迷你咸派",
    image: "https://www.audinette.com/wp-content/uploads/2016/10/ob_492946_halloween-pumkin-pie.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    recipe: {
      ingredients: [
        "3 pâtes brisées (pour 24 mini quiches - 12 personnes)",
        "800g de potimarron",
        "200g de fromage de chèvre frais",
        "6 œufs",
        "300ml de crème fraîche épaisse",
        "150ml de lait",
        "2 cuillères à soupe d'huile d'olive",
        "1 oignon",
        "Noix concassées (décoration)",
        "Sel, poivre, muscade",
        "24 mini moules à tartelettes"
      ],
      instructions: [
        "Préchauffez le four à 200°C",
        "Épluchez et coupez le potimarron en cubes",
        "Faites revenir l'oignon émincé dans l'huile d'olive",
        "Ajoutez les cubes de potimarron et cuisez 15 minutes à couvert",
        "Mixez grossièrement pour obtenir une purée avec des morceaux",
        "Étalez les pâtes brisées et découpez des cercles pour tapisser les mini moules",
        "Précuisez les fonds de tarte 8 minutes à blanc",
        "Dans un saladier, battez les œufs avec la crème et le lait",
        "Ajoutez la purée de potimarron et le fromage de chèvre émietté",
        "Assaisonnez avec sel, poivre et une pincée de muscade",
        "Répartissez la préparation dans les mini moules précuits",
        "Parsemez de noix concassées pour la décoration Halloween",
        "Enfournez 12-15 minutes jusqu'à ce que la surface soit dorée",
        "Laissez tiédir avant de démouler et servez tiède ou à température ambiante"
      ],
      time: "1h (30 min préparation + 30 min cuisson)",
      difficulty: "Moyen",
      tips: "🎃 Astuce Halloween : Utilisez des noix concassées ou graines de courge grillées pour décorer le dessus. Vous pouvez aussi découper des petites formes de potirons dans la pâte pour décorer. Parfait en apéritif ou entrée ! Prévoir 2 mini quiches par personne."
    }
  },
    {
    id: "mini-tartes",
    nameFr: "Mini Tartes de Potimarron et Confit de Canard",
    nameCn: "南瓜鸭肉迷你咸派",
    image: "https://www.audinette.com/wp-content/uploads/2016/10/ob_492946_halloween-pumkin-pie.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    recipe: {
      ingredients: [
        "4 cuisses de Confit de Canard (pour 12 personnes)",
        "2 potimarrons de taille moyenne",
        "3 pâtes brisées (ou 24 mini moules)",
        "6 œufs",
        "6 cuillères à soupe d'huile d'olive",
        "90cl de crème fraîche épaisse",
        "6 gousses d'ail",
        "Sel, poivre",
        "Mini moules à tartelettes"
      ],
      instructions: [
        "Préchauffez le four à 180°C",
        "Coupez les potimarrons en tranches en gardant la peau",
        "Badigeonnez d'huile d'olive et cuisez 40 min au four avec l'ail en chemise",
        "Réchauffez les cuisses de confit de canard 5 min au four, laissez refroidir et effilochez",
        "Découpez la pâte brisée pour tapisser vos mini moules à tartelettes",
        "Précuisez les fonds de tarte 10 min à 180°C",
        "Mixez le potimarron cuit avec l'ail pour faire une purée",
        "Battez 60cl de crème et les œufs, mélangez à la purée",
        "Ajoutez le confit effiloché au mélange",
        "Répartissez dans les mini moules précuits, enfournez 10 min à 180°C",
        "Décorez avec la crème restante en toile d'araignée avec une poche à douille"
      ],
      time: "1h30",
      difficulty: "Moyen",
      tips: "💡 Astuce Halloween : Utilisez la crème fraîche pour dessiner des toiles d'araignée sur chaque mini tarte. Pour 12 personnes, prévoyez 2-3 mini tartes par personne."
    }
  },
  {
    id: "boulettes-cerveau",
    nameFr: "Boulettes 'cerveau'",
    nameCn: "肉丸'脑袋'（肉丸配番茄酱）",
    image: "https://cdn.prod.website-files.com/621c9a77d9e0496f8be5723c/67077d9caaae804c31f6f832_idee-recette-peur-halloween-jade-oceane-blog-culinaire-33.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️"
  },
 // 🕸️ Petites bouchées & Snacks / 小吃拼盘
  {
    id: "mini-pizzas",
    nameFr: "Mini pizzas yeux de monstre",
    nameCn: "怪物眼睛迷你披萨",
    image: "https://i.pinimg.com/736x/00/15/3a/00153a6e51916a66788f5ef84478dce9.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    isDisabled: true,
    takenBy: "Simon",
    externalRecipeUrl: "https://www.francine.com/recettes/pizza/pizza-momies-halloween"
  },
  {
    id: "brochettes-squelette",
    nameFr: "Brochettes squelette",
    nameCn: "骷髅串（橄榄 + 马苏里拉 + 西班牙腊肠）",
    image: "https://i.pinimg.com/1200x/e1/55/a6/e155a6a9691e2a3f035d84d90db1c506.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    recipe: {
      ingredients: [
        "24 olives noires dénoyautées (pour 12 personnes)",
        "200g de mozzarella en dés",
        "100g de chorizo en dés",
        "24 mini bâtonnets en bois (pics à apéritif)",
        "Quelques olives vertes (optionnel pour variation)",
        "Plateau de service pour présentation"
      ],
      instructions: [
        "Coupez la mozzarella en petits cubes de 1 cm environ",
        "Découpez le chorizo en dés de même taille que la mozzarella",
        "Préparez vos mini bâtonnets en bois",
        "Enfilez sur chaque bâtonnet dans l'ordre : olive noire, dé de mozzarella, dé de chorizo, olive noire",
        "Répétez l'opération pour former des 'squelettes' avec les contrastes de couleurs",
        "Pour l'effet squelette, alternez les couleurs : noir (olives) et blanc (mozzarella)",
        "Disposez les brochettes sur un plateau de service noir pour accentuer l'effet Halloween",
        "Servez immédiatement à température ambiante ou légèrement frais"
      ],
      time: "15 minutes",
      difficulty: "Très facile",
      tips: "💀 Astuce Halloween : Utilisez des olives noires pour représenter les 'os' du squelette et la mozzarella blanche pour les 'articulations'. Le chorizo rouge ajoute une touche sanglante ! Disposez-les sur un plateau noir pour un effet dramatique maximum."
    }
  },
 
  {
    id: "chips-chauve-souris",
    nameFr: "Chips chauve-souris",
    nameCn: "蝙蝠形玉米片",
    image: "https://cache.marieclaire.fr/data/photo/w2000_ci/6n/chips-chauve-souris-halloween.webp",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    recipe: {
      ingredients: [
        "Tortillas de maïs (pour 6 personnes)",
        "Huile d'olive en spray",
        "Sel",
        "Emporte-pièces en forme de chauve-souris"
      ],
      instructions: [
        "Préchauffez le four à 200°C",
        "Graissez légèrement une plaque de cuisson",
        "Découpez des chips en forme de chauve-souris dans les tortillas à l'aide d'un emporte-pièce",
        "Placez les morceaux découpés sur la plaque de cuisson",
        "Vaporisez légèrement les chips avec un peu d'huile d'olive en spray",
        "Saupoudrez de sel selon votre goût",
        "Cuisez au four à 200°C pendant 5 à 7 minutes jusqu'à ce qu'elles soient croustillantes",
        "Laissez refroidir et servez immédiatement pour un apéritif terrifiant !"
      ],
      time: "15 minutes",
      difficulty: "Très facile",
      tips: "🦇 Astuce Halloween : Utilisez des tortillas noires si vous en trouvez pour un effet encore plus dramatique ! Servez avec des sauces colorées (guacamole vert, salsa rouge) pour un contraste saisissant. Parfait pour tremper dans des dips thématiques Halloween."
    }
  },
  {
    id: "timbaline-boeuf",
    nameFr: "Pumpkin-Shape Meatball",
    nameCn: "肉南瓜饼",
    image: "https://www.bhg.com/thmb/TlVozqYbLo29-m3ENPGzucJSOhI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/pumpkin-meatball-biscuits-RU296290-1-90ac5145b8a94ec68abca9f57690ca3e.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    externalRecipeUrl: "https://www.bhg.com/recipe/pumpkin-shape-meatball-biscuits/",
    recipe: {
      ingredients: [
        "1 paquet (450g) de pâte à biscuits réfrigérée (pour 8 personnes)",
        "100g de mozzarella râpée",
        "4 cuillères à café de pesto au basilic",
        "8 boulettes de viande surgelées cuites (2,5 cm de diamètre)",
        "Ficelle de cuisine en coton 100%",
        "8 feuilles de romarin frais"
      ],
      instructions: [
        "Préchauffez le four à 190°C. Tapissez une plaque de cuisson de papier sulfurisé",
        "Séparez les biscuits. Étalez ou aplatissez chaque morceau de pâte jusqu'à 11 cm de diamètre",
        "Placez 2 cuillères à soupe de fromage au centre d'un morceau de pâte",
        "Ajoutez 1/2 cuillère à café de pesto et une boulette de viande par dessus",
        "Remontez la pâte autour de la boulette et pincez pour sceller au sommet",
        "Attachez légèrement la ficelle de cuisine en coton verticalement à intervalles de 4 cm autour des boules pour ressembler aux striures d'une citrouille",
        "Placez sur la plaque préparée et enfournez 20 à 25 minutes jusqu'à ce qu'elles soient dorées",
        "Laissez refroidir 5 minutes, retirez délicatement la ficelle",
        "Placez les feuilles de romarin sur le dessus de chaque rouleau pour ressembler à une tige",
        "Servez chaud pour un effet citrouille parfait !"
      ],
      time: "55 minutes (30 min préparation + 20 min cuisson + 5 min refroidissement)",
      difficulty: "Moyen",
      tips: "🎃 Astuce Halloween : La ficelle de cuisine crée l'effet striures de citrouille ! Utilisez du pesto vert pour un contraste de couleur. Le romarin frais simule parfaitement la tige d'une vraie citrouille. Parfait comme plat principal Halloween ou gros snack !"
    }
  },
  {
    id: "risotto-potiron",
    nameFr: "Risotto au potiron",
    nameCn: "南瓜烩饭",
    image: "https://i.pinimg.com/736x/3d/4c/69/3d4c69fef2c0a64e41f7148e50b5f170.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    takenBy: "Chloe",
    isDisabled: true,
    recipe: {
      ingredients: [
        "300g de riz Arborio",
        "500g de potiron",
        "1L de bouillon de légumes",
        "1 oignon",
        "100ml de vin blanc",
        "Parmesan râpé",
        "Beurre, sel, poivre"
      ],
      instructions: [
        "Épluchez et coupez le potiron en dés, faites-le cuire à la vapeur",
        "Faites suer l'oignon émincé dans une casserole",
        "Ajoutez le riz et faites-le nacrer",
        "Versez le vin blanc et laissez évaporer",
        "Ajoutez le bouillon louche par louche en remuant",
        "Incorporez le potiron en purée",
        "Terminez avec beurre et parmesan"
      ],
      time: "45 minutes",
      difficulty: "Moyen"
    }
  },
  {
    id: "croquettes-fantomes",
    nameFr: "Croquettes fantômes",
    nameCn: "幽灵可乐饼（马铃薯泥造型）",
    image: "https://casavida.fr/wp-content/uploads/2023/10/crackers-fantomes.jpg",
    category: "Petites bouchées & Snacks",
    emoji: "🕸️",
    recipe: {
      ingredients: [
        "1,5 kg de pommes de terre (pour 12 personnes)",
        "3 œufs",
        "150g de farine",
        "300g de chapelure fine",
        "200g de fromage râpé (emmental ou comté)",
        "6 cuillères à soupe de crème fraîche",
        "Huile de friture",
        "Sel, poivre, muscade",
        "Papier absorbant"
      ],
      instructions: [
        "Épluchez et cuisez les pommes de terre dans de l'eau salée pendant 20-25 minutes",
        "Égouttez et écrasez en purée bien lisse",
        "Ajoutez la crème fraîche, le fromage râpé, sel, poivre et muscade",
        "Laissez refroidir la purée au réfrigérateur pendant 1 heure",
        "Formez des petites boules ovales avec la purée (forme de fantôme)",
        "Allongez légèrement une extrémité pour faire la 'queue' du fantôme",
        "Passez chaque croquette dans la farine, puis l'œuf battu, puis la chapelure",
        "Chauffez l'huile à 170°C dans une friteuse",
        "Plongez les croquettes par petites quantités et frire 3-4 minutes jusqu'à dorure",
        "Égouttez sur papier absorbant",
        "Plantez délicatement 2 grains de poivre pour faire les yeux",
        "Servez immédiatement bien chaud en accompagnement terrifiant !"
      ],
      time: "1h30 (45 min préparation + 1h repos + 15 min friture)",
      difficulty: "Moyen",
      tips: "👻 Astuce Halloween : Utilisez des grains de poivre noir ou des petites olives noires pour les yeux. Vous pouvez aussi faire des mini fantômes pour les enfants ! Servez avec une sauce tomate 'sanglante' ou une mayonnaise à l'ail. Parfait en accompagnement d'un plat principal Halloween."
    }
  },

  // 🍬 Desserts / 甜点类
  {
    id: "cupcakes-fantomes",
    nameFr: "Cupcakes fantômes",
    nameCn: "幽灵杯子蛋糕",
    image: "https://img.fourchette-et-bikini.fr/660x495/2025/06/23/i226402-cupcakes-fantomes-pour-halloween.webp",
    category: "Desserts / 甜点类",
    emoji: "🍬",
    externalRecipeUrl: "https://www.fourchette-et-bikini.fr/recettes/cupcakes-fantomes-pour-halloween-12519.html",
    recipe: {
      ingredients: [
        "200g de farine",
        "150g de sucre",
        "2 œufs",
        "100ml d'huile",
        "200ml de lait",
        "Chantilly blanche",
        "Pépites de chocolat noir (pour les yeux)"
      ],
      instructions: [
        "Mélangez tous les ingrédients secs",
        "Ajoutez les œufs, l'huile et le lait",
        "Versez dans des moules à cupcakes",
        "Enfournez 20 minutes à 180°C",
        "Laissez refroidir complètement",
        "Recouvrez de chantilly en forme de fantôme",
        "Ajoutez les pépites de chocolat pour les yeux"
      ],
      time: "40 minutes",
      difficulty: "Facile"
    }
  },

  {
    id: "panna-cotta",
    nameFr: "Panna cotta 'sanglante'",
    nameCn: "血浆奶冻（草莓酱）",
    image: "https://cbimg.cookinbreak.com/recettes/51bPuP2YbrPz.webp",
    category: "Desserts / 甜点类",
    emoji: "🍬",
    externalRecipeUrl: "https://cookinbreak.com/recettes/panna-cotta-dhalloween-220#google_vignette"
  },

  {
    id: "biscuits-citrouille-chocolat",
    nameFr: "Biscuits citrouille d'Halloween au chocolat",
    nameCn: "万圣节巧克力南瓜饼干",
    image: "https://www.francine.com/wp-content/uploads/2021/10/biscuits-citrouille-halloween-au-chocolat-046154664-1.webp",
    category: "Desserts / 甜点类",
    emoji: "🍬",
    externalRecipeUrl: "https://www.francine.com/recettes/desserts-et-gouters/biscuits-citrouille-halloween-au-chocolat",
    recipe: {
      ingredients: [
        "250g de farine",
        "80g de cacao en poudre non sucré",
        "200g de beurre mou",
        "150g de sucre",
        "1 œuf",
        "1 cuillère à café d'extrait de vanille",
        "1 pincée de sel",
        "Emporte-pièces forme citrouille"
      ],
      instructions: [
        "Mélangez la farine, le cacao et le sel dans un bol",
        "Battez le beurre et le sucre jusqu'à obtenir un mélange crémeux",
        "Ajoutez l'œuf et l'extrait de vanille",
        "Incorporez progressivement le mélange farine-cacao",
        "Formez une boule de pâte et filmez, réfrigérez 1h",
        "Préchauffez le four à 180°C",
        "Étalez la pâte sur 3-4mm d'épaisseur",
        "Découpez avec les emporte-pièces citrouille",
        "Enfournez 10-12 minutes",
        "Laissez refroidir avant de démouler"
      ],
      time: "1h30 (30 min préparation + 1h repos + 12 min cuisson)",
      difficulty: "Facile",
      tips: "🎃 Astuce Halloween : Décorez avec du glaçage orange pour accentuer l'effet citrouille ! Vous pouvez aussi ajouter des pépites de chocolat blanc pour les détails."
    }
  },
  {
    id: "biscuits-sables-halloween",
    nameFr: "Biscuits sablés d'Halloween",
    nameCn: "万圣节趣味饼干",
    image: "https://m.media-amazon.com/images/I/71iHAxXCHTL._AC_SX679_.jpg",
    category: "Desserts / 甜点类",
    emoji: "🍬",
    externalRecipeUrl: "https://www.marieclaire.fr/cuisine/biscuits-sables-d-halloween,1435756.asp",
    recipe: {
      ingredients: [
        "250g de farine",
        "125g de beurre mou",
        "100g de sucre",
        "1 œuf",
        "1 cuillère à café d'extrait de vanille",
        "1 pincée de sel",
        "Colorants alimentaires (orange, noir)",
        "Emporte-pièces Halloween (citrouilles, chauve-souris, fantômes)"
      ],
      instructions: [
        "Mélangez la farine et le sel dans un bol",
        "Battez le beurre et le sucre en crème",
        "Ajoutez l'œuf et l'extrait de vanille",
        "Incorporez progressivement la farine jusqu'à former une pâte",
        "Divisez la pâte en portions et ajoutez les colorants",
        "Filmez et réfrigérez 2 heures",
        "Préchauffez le four à 180°C",
        "Étalez la pâte sur 3mm d'épaisseur",
        "Découpez avec les emporte-pièces Halloween",
        "Enfournez 12-15 minutes jusqu'à légère dorure",
        "Laissez refroidir sur une grille"
      ],
      time: "2h30 (30 min préparation + 2h repos + 15 min cuisson)",
      difficulty: "Facile",
      tips: "👻 Astuce Halloween : Utilisez des colorants pour créer des biscuits orange (citrouilles), noirs (chauve-souris) et blancs (fantômes). Décorez avec du glaçage coloré pour plus d'effet !"
    }
  },
  {
    id: "gelee-yeux",
    nameFr: "Gelée yeux de monstre",
    nameCn: "眼球果冻（荔枝+蓝莓）",
    image: "https://evasion-culinaire.com/wp-content/uploads/2013/10/halloween-yeux-479x300.jpg",
    category: "Desserts / 甜点类",
    emoji: "🍬",
    externalRecipeUrl: "https://evasion-culinaire.com/yeux-pour-halloween/"
  },

  // 🍹 Boissons / 饮品
  {
    id: "bloody-mary",
    nameFr: "Bloody Mary (ou sans alcool)",
    nameCn: "血腥玛丽鸡尾酒（可无酒精）",
    image: "https://img.freepik.com/photos-premium/fete-halloween-cocktail-bloody-mary-contenant-vodka-du-jus-tomate_252124-2563.jpg",
    category: "Boissons / 饮品",
    emoji: "🍹",
    externalRecipeUrl: "https://www.marieclaire.fr/cuisine/bloody-mary-d-halloween,1462278.asp"
  },
  {
    id: "punch-orange",
    nameFr: "Punch orange",
    nameCn: "苹果南瓜祛毒饮",
    image: "https://cache.marieclaire.fr/data/photo/w2000_ci/1s6/boisson-chaude-citrouille-halloween.webp",
    category: "Boissons / 饮品",
    emoji: "🍹",
    isDisabled: true,
    takenBy: "Aurelien/Valentina",
    externalRecipeUrl: "https://www.marieclaire.fr/cuisine/cocktail-d-halloween-chaud-a-la-citrouille,1462311.asp#:~:text=Dans%20une%20casserole%2C%20portez%20à,ajoutez%20un%20peu%20de%20rhum."
  },
  {
    id: "potion-sorciere",
    nameFr: "Potion de sorcière violette",
    nameCn: "女巫药水",
    image: "https://blog.davidstea.com/fr/wp-content/uploads/2023/09/magic-potion-d.jpg",
    category: "Boissons / 饮品",
    emoji: "🍹",
    externalRecipeUrl: "https://www.1001cocktails.com/recettes/recette_cocktail-d-halloween-potion-magique-pomme-et-menthe_534502.aspx"
  }
];

// Get unique categories
const categories = Array.from(new Set(dishes.map(d => d.category)));

const invitees = [
  { names: ["Ludovic", "Chloe", "Estelle"], type: "family" },
  { names: ["Julie", "Pierre", "Jessica"], type: "family" },
  { names: ["Mia", "Thibeau"], type: "couple" },
  { names: ["Roza", "Benjamin", "Maxime"], type: "family" },
  { names: ["Lilia", "Diliana"], type: "friends" },
  { names: ["Michael"], type: "single" },
  { names: ["Simon"], type: "single" },
  { names: ["Aurelien", "Anaelle"], type: "couple" },
];

const totalInvitees = invitees.reduce((sum, inv) => sum + inv.names.length, 0);

export default function HalloweenPartyApp() {
  const [currentPage, setCurrentPage] = useState("selection");
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [paylibQrCodeDataURL, setPaylibQrCodeDataURL] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dishesList, setDishesList] = useState(dishes);
  const [isLoading, setIsLoading] = useState(true);

  // Load taken dishes from server on mount
  useEffect(() => {
    const loadTakenDishes = async () => {
      try {
        const response = await fetch('/api/dishes');
        const data = await response.json();
        
        if (data.success && data.takenDishes) {
          // Merge server data with local dishes array
          const updatedDishes = dishes.map(dish => {
            const takenInfo = data.takenDishes.find(t => t.dishId === dish.id);
            if (takenInfo) {
              return {
                ...dish,
                isDisabled: true,
                takenBy: takenInfo.takenBy
              };
            }
            return dish;
          });
          setDishesList(updatedDishes);
        }
      } catch (error) {
        console.error('Error loading taken dishes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTakenDishes();
  }, []);

  // Generate QR codes when component mounts
  useEffect(() => {
    const generateQRCodes = async () => {
      try {
        // Lydia payment URL (remplacez par votre vrai lien Lydia)
        const lydiaPaymentUrl = "https://lydia-app.com/pots/halloween-cagnotte-2024";
        const lydiaQR = await QRCode.toDataURL(lydiaPaymentUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#6C5CE7', // Couleur Lydia
            light: '#FFFFFF'
          }
        });
        setQrCodeDataURL(lydiaQR);

        // PayPal.me URL - sans montant pour que l'utilisateur choisisse
        const paypalPaymentUrl = "https://www.paypal.me/chloeycchu";
        const paypalQR = await QRCode.toDataURL(paypalPaymentUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#003087', // Couleur PayPal
            light: '#FFFFFF'
          }
        });
        setPaylibQrCodeDataURL(paypalQR);
      } catch (error) {
        console.error('Erreur génération QR codes:', error);
      }
    };

    generateQRCodes();
  }, []);

  const handleDishToggle = (dishId) => {
    console.log('🎃 Toggle called for:', dishId);
    console.log('🎃 Current selection:', selectedDishes);
    
    // Check if dish is already taken
    const dish = dishesList.find(d => d.id === dishId);
    if (dish?.isDisabled) {
      console.log('❌ Dish already taken by:', dish.takenBy);
      return;
    }
    
    setSelectedDishes(prev => {
      const newSelection = prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId];
      console.log('🎃 New selection:', newSelection);
      return newSelection;
    });
  };

  const handleContinue = () => {
    if (selectedDishes.length > 0) {
      setCurrentPage("confirmation");
    }
  };

  const handleSubmit = async () => {
    if (firstName && lastName) {
      const selectedItems = dishesList.filter(d => selectedDishes.includes(d.id)).map(d => `${d.nameFr} (${d.nameCn})`);
      
      try {
        console.log('🚀 Envoi en cours...');
        
        // Envoyer avec Web3Forms
        const web3formsKey = '91de4f66-c218-4e33-8248-0d82d1e97008';
        
        try {
          const formData = new FormData();
          formData.append('access_key', web3formsKey);
          formData.append('subject', `🎃 Halloween Party - Inscription de ${firstName} ${lastName}`);
          formData.append('from_name', 'Halloween Party Website');
          formData.append('email', 'yiching.uhc@gmail.com');
          formData.append('message', `
🎃 NOUVELLE INSCRIPTION HALLOWEEN PARTY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PARTICIPANT
   Nom: ${lastName}
   Prénom: ${firstName}

🍽️ PLATS À PRÉPARER (${selectedItems.length})
${selectedItems.map((item, index) => `   ${index + 1}. ${item}`).join('\n')}

📅 Date d'inscription: ${new Date().toLocaleString('fr-FR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Site: halloween2025-ten.vercel.app
          `);

          const web3response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });
          
          const web3result = await web3response.json();
          console.log('📧 Web3Forms result:', web3result);
          
          if (web3result.success) {
            // Save to server
            try {
              const saveResponse = await fetch('/api/dishes', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  dishes: selectedDishes,
                  firstName: firstName
                }),
              });
              
              const saveResult = await saveResponse.json();
              console.log('💾 Server save result:', saveResult);
              
              if (saveResult.success) {
                // Update local state to reflect server state
                setDishesList(prevDishes => 
                  prevDishes.map(dish => 
                    selectedDishes.includes(dish.id)
                      ? { ...dish, isDisabled: true, takenBy: firstName }
                      : dish
                  )
                );
              }
            } catch (saveError) {
              console.error('Error saving to server:', saveError);
            }
            
            alert(`✅ Merci ${firstName} ${lastName}!\n\nVous préparerez:\n${selectedItems.join("\n")}\n\n📧 Email envoyé à Chloé!`);
          }
        } catch (web3error) {
          console.warn('⚠️ Web3Forms error:', web3error);
          alert(`✅ Merci ${firstName} ${lastName}!\n\nVous préparerez:\n${selectedItems.join("\n")}\n\n⚠️ Erreur d'envoi d'email`);
        }
        
        // Aussi enregistrer localement
        try {
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              selectedDishes: selectedItems,
            }),
          });

          const result = await response.json();
          console.log('📬 Local result:', result);
        } catch (localError) {
          console.error('Local save error:', localError);
        }
        
      } catch (error) {
        console.error('❌ Error:', error);
        alert(`✅ Merci ${firstName} ${lastName}!\n\nVous préparerez:\n${selectedItems.join("\n")}`);
      }
      
      // Reset
      setCurrentPage("selection");
      setSelectedDishes([]);
      setFirstName("");
      setLastName("");
    }
  };

  const handleViewRecipe = (dish) => {
    setSelectedRecipe(dish);
    setCurrentPage("recipe");
  };

  if (currentPage === "selection") {
    return (
      <div className="min-h-screen bg-black relative z-10">
        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🎃</div>
              <p className="text-orange-500 text-xl">Chargement...</p>
            </div>
          </div>
        )}
        
        {/* Hero Image */}
        <div className="relative w-full h-[60vh] overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1630831872205-eeac13c30ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxsb3dlZW4lMjBwYXJ0eSUyMGRlY29yYXRpb25zfGVufDF8fHx8MTc2MDcxODE0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Halloween Party"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl font-bold text-orange-500 spooky-text text-center">
              🎃 Halloween 🎃
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-8 text-orange-500">
            Snacks à préparer
          </h2>


          {/* Categories and Dishes */}
          {categories.map(category => {
            const categoryDishes = dishesList.filter(d => d.category === category);
            const emoji = categoryDishes[0]?.emoji || "";
            
            return (
              <div key={category} className="mb-16">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">
                  {emoji} {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryDishes.map(dish => (
                    <Card 
                      key={dish.id}
                      className={`${
                        dish.isDisabled 
                          ? "bg-zinc-800 border-2 border-zinc-600 opacity-60 cursor-not-allowed" 
                          : "bg-zinc-900 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                      } overflow-hidden flex flex-col`}
                    >
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <ImageWithFallback 
                          src={dish.image}
                          alt={dish.nameFr}
                          className={`w-full h-full object-cover ${dish.isDisabled ? 'grayscale' : ''}`}
                        />
                        {dish.isDisabled && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              ✅ Pris par {dish.takenBy || 'quelqu\'un'}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex items-start gap-3 mb-3 min-h-[4rem]">
                          <Checkbox 
                            id={dish.id}
                            checked={selectedDishes.includes(dish.id)}
                            onCheckedChange={(checked) => {
                              if (!dish.isDisabled) {
                                handleDishToggle(dish.id);
                              }
                            }}
                            disabled={dish.isDisabled}
                            className={`mt-1 flex-shrink-0 ${
                              dish.isDisabled 
                                ? "border-zinc-500 opacity-50 cursor-not-allowed" 
                                : "border-orange-500"
                            }`}
                          />
                          <div className="flex-1 min-h-full flex flex-col justify-center">
                            <label 
                              htmlFor={dish.id}
                              className={`block mb-1 font-semibold leading-tight ${
                                dish.isDisabled 
                                  ? "text-zinc-500 cursor-not-allowed" 
                                  : "text-white cursor-pointer"
                              }`}
                            >
                              {dish.nameFr}
                              {dish.isDisabled && (
                                <span className="ml-2 text-xs text-red-400 font-normal">
                                  (Déjà pris)
                                </span>
                              )}
                            </label>
                            <p className={`text-sm leading-tight ${dish.isDisabled ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              {dish.nameCn}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (dish.externalRecipeUrl) {
                                window.open(dish.externalRecipeUrl, "_blank");
                              } else {
                                handleViewRecipe(dish);
                              }
                            }}
                            className="flex-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/50 hover:border-orange-500 text-sm py-2 h-10"
                          >
                            📖 Voir la recette
                          </Button>
                          {dish.id === "croquettes-fantomes" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://casavida.fr/carnet-culinaire/crackers-fantomes/", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "oeuf-mimosa" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.supertoinette.com/recette/7726/oeufs-mimosa-d-halloween.html", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "momies-saucisses" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.madrange.fr/nos-recettes/momies-feuilletees-aux-knacks/", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "mini-tartes" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.marieclaire.fr/cuisine/tarte-d-halloween-au-potimarron-roti-et-confit-de-canard,1462334.asp", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "mini-quiches" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://piao.fr/2022/10/quiche-potimarron-dhalloween/", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "boulettes-cerveau" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://devorezmoi.com/2021/10/24/cervelles-croustillantes/", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "doigts-zombie" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.marieclaire.fr/cuisine/doigts-de-sorciere-sales-pour-halloween,1459053.asp", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "balais-sorciere" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.ricardocuisine.com/recettes/6471-balais-de-sorciere-bretzels-au-fromage", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "doigts-sorciere" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://cuisine-addict.com/doigts-de-sorciere-au-fromage/", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "sandwichs-tombeaux" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://connetable.com/recettes/tombeaux-dhalloween/", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette originale"
                            >
                              🔗
                            </Button>
                          )}

                          {dish.id === "chips-chauve-souris" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.marieclaire.fr/cuisine/chips-de-mais-en-forme-de-chauve-souris,1459055.asp", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Marie Claire"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "cupcakes-fantomes" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.fourchette-et-bikini.fr/recettes/cupcakes-fantomes-pour-halloween-12519.html", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Fourchette et Bikini"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "biscuits-citrouille-chocolat" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.francine.com/recettes/desserts-et-gouters/biscuits-citrouille-halloween-au-chocolat", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Francine"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "biscuits-sables-halloween" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.marieclaire.fr/cuisine/biscuits-sables-d-halloween,1435756.asp", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Marie Claire"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "panna-cotta" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://cookinbreak.com/recettes/panna-cotta-dhalloween-220#google_vignette", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Cookinbreak"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "gelee-yeux" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://evasion-culinaire.com/yeux-pour-halloween/", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Évasion Culinaire"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "bloody-mary" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.marieclaire.fr/cuisine/bloody-mary-d-halloween,1462278.asp", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Marie Claire"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "punch-orange" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.marieclaire.fr/cuisine/cocktail-d-halloween-chaud-a-la-citrouille,1462311.asp#:~:text=Dans%20une%20casserole%2C%20portez%20à,ajoutez%20un%20peu%20de%20rhum.", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette Marie Claire"
                            >
                              🔗
                            </Button>
                          )}
                          {dish.id === "potion-sorciere" && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.1001cocktails.com/recettes/recette_cocktail-d-halloween-potion-magique-pomme-et-menthe_534502.aspx", "_blank");
                              }}
                              className="px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:border-blue-500 text-sm py-2 h-10 flex items-center justify-center"
                              title="Recette 1001 Cocktails"
                            >
                              🔗
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Cagnotte Option */}
          <Card className="bg-zinc-900 border-2 border-orange-400 p-6 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold text-orange-400 mb-4">
                💰 Cagnotte Halloween
              </h3>
              <p className="text-orange-100 mb-6">
                Vous ne pouvez pas préparer de snacks ? Contribuez à la cagnotte pour un traiteur personnel.
              </p>
              <Button 
                onClick={() => setCurrentPage("payment")}
                className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 text-lg font-bold transform hover:scale-105 transition-all"
              >
                 Contribuer à la cagnotte
              </Button>
            </div>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleContinue}
              disabled={selectedDishes.length === 0}
              className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-6 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
            >
              Continuer 👻
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Recipe Page
  if (currentPage === "recipe" && selectedRecipe) {
    const recipe = selectedRecipe.recipe || {
      ingredients: ["Ingrédients à venir..."],
      instructions: ["Recette détaillée à venir..."],
      time: "Variable",
      difficulty: "À déterminer"
    };

    return (
      <div className="min-h-screen bg-black relative z-10">
        {/* Hero Section */}
        <div className="relative w-full h-[40vh] overflow-hidden">
          <ImageWithFallback 
            src={selectedRecipe.image}
            alt={selectedRecipe.nameFr}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
              {selectedRecipe.nameFr}
            </h1>
            <p className="text-xl text-orange-300">
              {selectedRecipe.nameCn}
            </p>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Recipe Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-zinc-900 border border-orange-500/30 p-4 text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <h3 className="text-orange-400 font-bold">Temps</h3>
              <p className="text-white">{recipe.time}</p>
            </Card>
            <Card className="bg-zinc-900 border border-orange-500/30 p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-orange-400 font-bold">Difficulté</h3>
              <p className="text-white">{recipe.difficulty}</p>
            </Card>
            <Card className="bg-zinc-900 border border-orange-500/30 p-4 text-center">
              <div className="text-2xl mb-2">{selectedRecipe.emoji}</div>
              <h3 className="text-orange-400 font-bold">Catégorie</h3>
              <p className="text-white text-sm">{selectedRecipe.category}</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <Card className="bg-zinc-900 border border-orange-500/30 p-6">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center">
                🛒 Ingrédients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-white flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Instructions */}
            <Card className="bg-zinc-900 border border-orange-500/30 p-6">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center">
                👨‍🍳 Instructions
              </h2>
              <ol className="space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-white flex items-start">
                    <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          {/* Halloween Tips */}
          <Card className="bg-orange-500/10 border border-orange-500/30 p-6 mt-8">
            <h3 className="text-xl font-bold text-orange-400 mb-3 flex items-center">
              🎃 Astuces Halloween
            </h3>
            <div className="text-orange-200 space-y-2">
              <p>• Ajoutez des colorants alimentaires pour des effets plus terrifiants</p>
              <p>• Utilisez des emporte-pièces Halloween pour les formes</p>
              <p>• Servez dans des plats sombres pour l&apos;ambiance</p>
              <p>• N&apos;hésitez pas à exagérer les décorations pour l&apos;effet Halloween !</p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => setCurrentPage("selection")}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-4 text-lg"
            >
              ← Retour aux snacks
            </Button>
            <Button 
              onClick={() => {
                if (!selectedDishes.includes(selectedRecipe.id)) {
                  handleDishToggle(selectedRecipe.id);
                }
                setCurrentPage("selection");
              }}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black px-6 py-4 text-lg font-bold"
            >
              ✅ Ajouter à ma liste
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Payment Page
  if (currentPage === "payment") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative z-10">
        <Card className="bg-zinc-900 border-2 border-orange-500 p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
            💰 Contribution Cagnotte Halloween
          </h2>

          <div className="text-center mb-8">
            <p className="text-orange-100 text-lg mb-4">
              Merci de contribuer à notre cagnotte Halloween ! 🎃
            </p>
            <p className="text-zinc-400 mb-6">
              Vos contributions nous aideront à acheter les ingrédients pour un buffet terrifiant !
            </p>
          </div>

          {/* Payment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Lydia Payment (à venir) */}
<div className="bg-zinc-800 border border-purple-500/30 rounded-lg p-6 text-center">
  <h3 className="text-xl font-bold text-orange-400 mb-4">
    🟢 Lydia <span className="text-zinc-400 text-base">(à venir)</span>
  </h3>
  <div className="mb-4">
    <div className="w-48 h-48 mx-auto bg-purple-100 rounded flex items-center justify-center">
      <span className="text-purple-600 text-lg">Disponible prochainement</span>
    </div>
    <p className="text-sm text-zinc-400 mb-4">
      Paiement Lydia sera disponible bientôt
    </p>
  </div>
</div>

            {/* PayPal Payment */}
            <div className="bg-zinc-800 border border-blue-500/30 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-orange-400 mb-4">💰 PayPal</h3>
              <div className="mb-4">
                <div className="w-48 h-48 mx-auto bg-white p-2 rounded-lg mb-4">
                  {paylibQrCodeDataURL ? (
                    <img 
                      src={paylibQrCodeDataURL} 
                      alt="QR Code PayPal Payment"
                      className="w-full h-full object-contain cursor-pointer"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        // Pour mobile : action long press
                        navigator.clipboard?.writeText("https://www.paypal.me/chloeycchu");
                        alert("🔗 Lien PayPal copié ! Ouvrez PayPal ou collez dans votre navigateur.");
                      }}
                      onClick={() => {
                        window.open("https://www.paypal.me/chloeycchu", "_blank");
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 animate-pulse rounded flex items-center justify-center">
                      <span className="text-blue-600 text-sm">Génération...</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-zinc-400 mb-8">
                  Choisissez votre montant sur PayPal
                </p>
              </div>
              <Button 
                onClick={() => {
                  window.open("https://www.paypal.me/chloeycchu", "_blank");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
              >
                💰 Payer avec PayPal
              </Button>
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Revolut Payment */}
            <div className="bg-zinc-800 border border-gray-500/30 rounded-lg p-4 text-center">
              <h4 className="text-lg font-bold text-orange-400 mb-2">🔄 Revolut</h4>
              <p className="text-sm text-zinc-400 mb-3">
                Si vous avez Revolut, envoyez à : <br/>
                <span className="text-white font-mono">@chloeyr1jg</span>
              </p>
              <Button 
                onClick={() => {
                  if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
                    window.location.href = "revolut://pay/chloeyr1jg";
                  } else {
                    window.open("https://revolut.me/chloeyr1jg", "_blank");
                  }
                }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2"
              >
                🔄 Ouvrir Revolut
              </Button>
            </div>

            {/* Virement classique */}
            <div className="bg-zinc-800 border border-green-500/30 rounded-lg p-4 text-center">
              <h4 className="text-lg font-bold text-orange-400 mb-2">🏦 Virement</h4>
              <p className="text-sm text-zinc-400 mb-8">
                Virement bancaire classique
              </p>
              <Button 
                onClick={() => {
                  alert('🏦 Coordonnées bancaires\n\nIBAN: FR76 4061 8804 4400 0407 7790 095\nBIC: BOUSFRPPXXX\nTitulaire: VUE Ludovic\nLibellé: Cagnotte Halloween 2025\n\n');
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2"
              >
                📋 Voir coordonnées
              </Button>
            </div>
          </div>

          {/* Suggested Amounts */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-orange-400 mb-4 text-center">
              💡 Montants suggérés
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {[10, 15, 20].map(amount => (
                <Button 
                  key={amount}
                  onClick={() => alert(`Merci ! Montant sélectionné: ${amount}€\n\n🚧 En production, ceci préremplirait le montant dans le système de paiement.`)}
                  className="bg-orange-500/20 border border-orange-500/50 hover:bg-orange-500/30 text-orange-300 hover:text-orange-200 py-3"
                >
                  {amount}€
                </Button>
              ))}
            </div>
            <p className="text-center text-zinc-400 text-sm mt-2">
              Ou choisissez un montant libre lors du paiement
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-orange-400 font-bold mb-3">📱 Comment payer :</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="text-orange-300 font-semibold mb-2">🟢 Lydia (Recommandé)</h5>
                <ul className="text-orange-200 space-y-1">
                  <li>• Ouvrez l&apos;app Lydia</li>
                  <li>• Scannez le QR code</li>
                  <li>• Ou cliquez sur le QR code</li>
                  <li>• Montant libre ou suggéré</li>
                </ul>
              </div>
              <div>
                <h5 className="text-orange-300 font-semibold mb-2">💰 PayPal</h5>
                <ul className="text-orange-200 space-y-1">
                  <li>• Fonctionne sans compte PayPal</li>
                  <li>• Cartes bancaires acceptées</li>
                  <li>• Paiement international</li>
                  <li>• Sécurisé et rapide</li>
                </ul>
              </div>
            </div>
            <p className="text-orange-300 text-xs mt-3">
              💡 <strong>Astuce mobile :</strong> Maintenez appuyé sur un QR code pour copier le lien de paiement
            </p>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <Button 
              onClick={() => setCurrentPage("selection")}
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-4 text-lg"
            >
              ← Retour aux snacks
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Confirmation Page
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative z-10">
      <Card className="bg-zinc-900 border-2 border-orange-500 p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
          🎃 Confirmez votre participation
        </h2>

        {/* Selected Items */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-orange-400 mb-4">
            Vos sélections :
          </h3>
          
          {selectedDishes.length > 0 && (
            <ul className="list-disc list-inside space-y-2 mb-4">
              {dishesList
                .filter(d => selectedDishes.includes(d.id))
                .map(dish => (
                  <li key={dish.id} className="text-white">
                    <span className="font-semibold">{dish.nameFr}</span>{" "}
                    <span className="text-zinc-400">({dish.nameCn})</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Name Inputs */}
        <div className="space-y-4 mb-8">
          <div>
            <Label htmlFor="lastName" className="text-orange-400 text-lg">
              Nom
            </Label>
            <Input 
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-zinc-800 border-orange-500/50 text-white focus:border-orange-500 mt-2 text-lg"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <Label htmlFor="firstName" className="text-orange-400 text-lg">
              Prénom
            </Label>
            <Input 
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-zinc-800 border-orange-500/50 text-white focus:border-orange-500 mt-2 text-lg"
              placeholder="Votre prénom"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={() => setCurrentPage("selection")}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white text-lg py-6"
          >
            ← Retour
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!firstName || !lastName}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-black disabled:opacity-50 disabled:cursor-not-allowed text-lg py-6 font-bold"
          >
            Soumettre 🎃
          </Button>
        </div>
      </Card>
    </div>
  );
}
