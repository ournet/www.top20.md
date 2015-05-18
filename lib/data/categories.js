var external = module.exports;

external.getCategories = function() {
  return CATEGORIES;
};

external.getCategory = function(id) {
  return CATEGORIES[id];
};

external.getSubcategories = function(id) {
  return CATEGORIES[id].categories;
};

var CATEGORIES = {
  37: {
    id: 37,
    ro: 'Auto, Moto',
    name: 'auto-moto',
    ru: 'Авто, мото',
    categories: {
      62: {
        id: 62,
        ro: 'Automobile',
        name: 'automobile',
        ru: 'Автомобили'
      },
      63: {
        id: 63,
        ro: 'Asigurare auto',
        name: 'asigurare-auto',
        ru: ' Автострахование'
      },
      64: {
        id: 64,
        ro: 'Siguranța rutieră',
        name: 'siguranta-rutiera',
        ru: 'Безопасность движения'
      },
      65: {
        id: 65,
        ro: 'Accesorii',
        name: 'accesorii',
        ru: ' Запчасти, оборудование'
      },
      66: {
        id: 66,
        ro: 'Cluburi auto',
        name: 'cluburi-auto',
        ru: 'Клубы автовладельцев'
      },
      67: {
        id: 67,
        ro: 'Motociclete',
        name: 'motociclete',
        ru: 'Мотоциклы'
      },
      68: {
        id: 68,
        ro: 'Școli auto',
        name: 'scoli-auto',
        ru: 'Обучение вождению'
      },
      69: {
        id: 69,
        ro: 'Servicii auto',
        name: 'servicii-auto',
        ru: 'Услуги'
      }
    }
  },
  38: {
    id: 38,
    ro: 'Securitate',
    name: 'securitate',
    ru: 'Безопасность',
    categories: {
      70: {
        id: 70,
        ro: 'Securitate business',
        name: 'securitate-business',
        ru: 'Безопасность бизнеса'
      },
      71: {
        id: 71,
        ro: 'Securitatea casei',
        name: 'securitatea-casei',
        ru: 'Безопасность жилища'
      },
      72: {
        id: 72,
        ro: 'Securitate informațională',
        name: 'securitate-informationala',
        ru: 'Информационная безопасность'
      },
      73: {
        id: 73,
        ro: 'Securitate personală',
        name: 'securitate-personala',
        ru: 'Личная безопасность'
      },
      74: {
        id: 74,
        ro: 'Sănătate, Siguranță',
        name: 'sanatate-siguranta',
        ru: 'Охрана труда и техника безопасности'
      },
      75: {
        id: 75,
        ro: 'Servicii de securitate',
        name: 'servicii-de-securitate',
        ru: 'Охранная деятельность'
      },
      76: {
        id: 76,
        ro: 'Sisteme de securitate',
        name: 'sisteme-de-securitate',
        ru: 'Охранные системы'
      },
      77: {
        id: 77,
        ro: 'Securitate incendii',
        name: 'securitate-incendii',
        ru: 'Пожарная безопасность'
      }
    }
  },
  39: {
    id: 39,
    ro: 'Busines, Economie',
    name: 'busines-economie',
    ru: 'Бизнес и экономика',
    categories: {
      79: {
        id: 79,
        ro: 'Automatizare',
        name: 'automatizare',
        ru: 'Автоматизация'
      },
      80: {
        id: 80,
        ro: 'Inovații',
        name: 'inovatii',
        ru: 'Инновации'
      },
      81: {
        id: 81,
        ro: 'Silvicultură',
        name: 'silvicultura',
        ru: 'Лесное хозяйство'
      },
      82: {
        id: 82,
        ro: 'Logistică',
        name: 'logistica',
        ru: 'Логистика'
      },
      83: {
        id: 83,
        ro: 'Organizare business',
        name: 'organizare-business',
        ru: 'Организация бизнеса'
      },
      84: {
        id: 84,
        ro: 'Industrie',
        name: 'industrie',
        ru: 'Промышленность'
      },
      85: {
        id: 85,
        ro: 'Publicitate, Marketing',
        name: 'publicitate-marketing',
        ru: 'Реклама, маркетинг, PR'
      },
      86: {
        id: 86,
        ro: 'Agricultură',
        name: 'agricultura',
        ru: 'Сельское хозяйство'
      },
      87: {
        id: 87,
        ro: 'Asigurare',
        name: 'asigurare',
        ru: 'Страхование'
      },
      88: {
        id: 88,
        ro: 'Telecomunicații',
        name: 'telecomunicatii',
        ru: 'Телекоммуникации'
      },
      89: {
        id: 89,
        ro: 'Finanțe',
        name: 'finante',
        ru: 'Финансы'
      }
    }
  },
  40: {
    id: 40,
    ro: 'Stat și Societate',
    name: 'stat-si-societate',
    ru: 'Государство и общество',
    categories: {
      90: {
        id: 90,
        ro: 'Armată și armament',
        name: 'armata-si-armament',
        ru: 'Армия и вооружение'
      },
      91: {
        id: 91,
        ro: 'Instituții publice',
        name: 'institutii-publice',
        ru: 'Власть'
      },
      92: {
        id: 92,
        ro: 'Relații internaționale',
        name: 'relatii-internationale',
        ru: 'Международные отношения'
      },
      93: {
        id: 93,
        ro: 'Relații interne',
        name: 'relatii-interne',
        ru: 'Национальные отношения'
      },
      94: {
        id: 94,
        ro: 'ONG-uri',
        name: 'ong',
        ru: 'Неправительственные организации'
      },
      95: {
        id: 95,
        ro: 'Protecție socială',
        name: 'protectie-sociala',
        ru: 'Органы социальной защиты'
      },
      96: {
        id: 96,
        ro: 'Partide și organizații',
        name: 'partide-organizatii',
        ru: 'Партии и организации'
      },
      97: {
        id: 97,
        ro: 'Organe legislative',
        name: 'organe-legislative',
        ru: 'Правоохранительные органы'
      },
      98: {
        id: 98,
        ro: 'Servicii',
        name: 'servicii',
        ru: 'Службы спасения'
      }
    }
  },
  42: {
    id: 42,
    ro: 'Divertisment',
    name: 'divertisment',
    ru: 'Досуг, развлечения',
    categories: {
      99: {
        id: 99,
        ro: 'Postere',
        name: 'postere',
        ru: 'Афиша'
      },
      100: {
        id: 100,
        ro: 'Adult',
        name: 'adult',
        ru: 'Для взрослых'
      },
      101: {
        id: 101,
        ro: 'Jocuri',
        name: 'jocuri',
        ru: 'Игры'
      },
      102: {
        id: 102,
        ro: 'Locuri de odihnă',
        name: 'locuri-de-odihna',
        ru: 'Места для отдыха'
      },
      103: {
        id: 103,
        ro: 'Comunicare, Dating',
        name: 'comunicare-dating',
        ru: 'Общение, знакомства'
      },
      104: {
        id: 104,
        ro: 'Sărbători',
        name: 'sarbatori',
        ru: 'Праздники'
      },
      105: {
        id: 105,
        ro: 'Hobby-uri',
        name: 'hobby',
        ru: 'Увлечения, хобби'
      },
      106: {
        id: 106,
        ro: 'Umor',
        name: 'umor',
        ru: 'Юмор'
      }
    }
  },
  43: {
    id: 43,
    ro: 'Femei',
    name: 'femei',
    ru: 'Женский клуб',
    categories: {
      107: {
        id: 107,
        ro: 'Sarcina și naștere',
        name: 'sarcina-nastere',
        ru: 'Беременность и роды'
      },
      108: {
        id: 108,
        ro: 'Agenții de căsătorii',
        name: 'agentii-de-casatorii',
        ru: 'Брачные агентства'
      },
      109: {
        id: 109,
        ro: 'Copii',
        name: 'copii',
        ru: 'Дети'
      },
      110: {
        id: 110,
        ro: 'Sănătate, Frumusețe',
        name: 'sanatate-frumusete',
        ru: 'Красота и здоровье'
      },
      111: {
        id: 111,
        ro: 'Modă și Stil',
        name: 'moda-stil',
        ru: 'Мода и стиль'
      },
      112: {
        id: 112,
        ro: 'Lucru manual',
        name: 'lucru-manual',
        ru: 'Рукоделие'
      },
      113: {
        id: 113,
        ro: 'Nunți',
        name: 'nunti',
        ru: 'Свадьбы'
      }
    }
  },
  44: {
    id: 44,
    ro: 'Lege și drept',
    name: 'lege-drept',
    ru: 'Закон и право',
    categories: {
      114: {
        id: 114,
        ro: 'Acte normative',
        name: 'acte-normative',
        ru: 'Законы'
      },
      115: {
        id: 115,
        ro: 'Judiciar',
        name: 'judiciar',
        ru: 'Судебная власть'
      },
      116: {
        id: 116,
        ro: 'Documentare',
        name: 'documentare',
        ru: 'Формы документов'
      },
      117: {
        id: 117,
        ro: 'Servicii juridice',
        name: 'servicii-juridice',
        ru: 'Юридические услуги'
      }
    }
  },
  45: {
    id: 45,
    ro: 'Internet, Comunicații',
    name: 'internet-comunicatii',
    ru: 'Интернет, связь',
    categories: {
      118: {
        id: 118,
        ro: 'Acces la internet',
        name: 'acces-internet',
        ru: 'Доступ в интернет'
      },
      119: {
        id: 119,
        ro: 'Conecțiuni mobile',
        name: 'conectiuni-mobile',
        ru: 'Мобильная связь'
      },
      120: {
        id: 120,
        ro: 'Radio online',
        name: 'radio-online',
        ru: 'Онлайн-радио'
      },
      121: {
        id: 121,
        ro: 'TV online',
        name: 'tv-online',
        ru: 'Онлайн-телевидение'
      },
      122: {
        id: 122,
        ro: 'Promovare site-uri',
        name: 'promovare-site',
        ru: 'Продвижение сайтов'
      },
      123: {
        id: 123,
        ro: 'Publicitate online',
        name: 'publicitate-online',
        ru: 'Реклама в интернете'
      },
      124: {
        id: 124,
        ro: 'Creare site-uri',
        name: 'creare-site',
        ru: 'Создание сайтов'
      },
      125: {
        id: 125,
        ro: 'Poștă electronică',
        name: 'posta-electronica',
        ru: 'Электронная почта'
      }
    }
  },
  46: {
    id: 46,
    ro: 'Sănătate, Frumusețe',
    name: 'sanatate-frumusete',
    ru: 'Красота и здоровье',
    categories: {
      126: {
        id: 126,
        ro: 'Mod de viață sănătos',
        name: 'mod-de-viata-sanatos',
        ru: 'Здоровый образ жизни'
      },
      127: {
        id: 127,
        ro: 'Cosmetică',
        name: 'cosmetica',
        ru: 'Косметика'
      },
      128: {
        id: 128,
        ro: 'Parfumerie',
        name: 'parfumerie',
        ru: 'Парфюмерия'
      },
      129: {
        id: 129,
        ro: 'Saloane de frumusețe',
        name: 'saloane-de-frumusete',
        ru: 'Салоны красоты'
      },
      130: {
        id: 130,
        ro: 'Tatuaje și piercing',
        name: 'tatuaje-piercing',
        ru: 'Татуировки и пирсинг'
      },
      131: {
        id: 131,
        ro: 'Produse',
        name: 'produse',
        ru: 'Товары'
      },
      132: {
        id: 132,
        ro: 'Cluburi de fitness',
        name: 'cluburi-de-fitness',
        ru: 'Фитнес-клубы'
      }
    }
  },
  47: {
    id: 47,
    ro: 'Artă și Cultură',
    name: 'arta-cultura',
    ru: 'Культура и искусство',
    categories: {
      133: {
        id: 133,
        ro: 'Animație',
        name: 'animatie',
        ru: 'Анимация'
      },
      135: {
        id: 135,
        ro: 'Arhitectură',
        name: 'arhitectura',
        ru: 'Архитектура'
      },
      136: {
        id: 136,
        ro: 'Biblioteci',
        name: 'biblioteci',
        ru: 'Библиотеки'
      },
      137: {
        id: 137,
        ro: 'Arta vizuală',
        name: 'arta-vizuala',
        ru: 'Изобразительное искусство'
      },
      138: {
        id: 138,
        ro: 'Film',
        name: 'film',
        ru: 'Кино'
      },
      139: {
        id: 139,
        ro: 'Literatură',
        name: 'literatura',
        ru: 'Литература'
      },
      140: {
        id: 140,
        ro: 'Muzee',
        name: 'muzee',
        ru: 'Музеи'
      },
      141: {
        id: 141,
        ro: 'Muzică',
        name: 'muzica',
        ru: 'Музыка'
      },
      142: {
        id: 142,
        ro: 'Dans',
        name: 'dans',
        ru: 'Танец'
      },
      143: {
        id: 143,
        ro: 'Uniuni de creație',
        name: 'uniuni-de-creatie',
        ru: 'Творческие союзы'
      },
      144: {
        id: 144,
        ro: 'Teatru',
        name: 'teatru',
        ru: 'Театр'
      },
      145: {
        id: 145,
        ro: 'Fotografie',
        name: 'fotografie',
        ru: 'Фотография'
      },
      146: {
        id: 146,
        ro: 'Tradiții',
        name: 'traditii',
        ru: 'Традиции'
      }
    }
  },
  48: {
    id: 48,
    ro: 'Medicină',
    name: 'medicina',
    ru: 'Медицина',
    categories: {
      147: {
        id: 147,
        ro: 'Medicina tradițională',
        name: 'medicina-traditionala',
        ru: 'Альтернативная медицина'
      },
      148: {
        id: 148,
        ro: 'Sarcină și naștere',
        name: 'sarcina-nastere',
        ru: 'Беременность и роды'
      },
      149: {
        id: 149,
        ro: 'Boli',
        name: 'boli',
        ru: 'Болезни'
      },
      150: {
        id: 150,
        ro: 'Veterinărie',
        name: 'veterinarie',
        ru: 'Ветеринария'
      },
      151: {
        id: 151,
        ro: 'Deprinderi dăunătoare',
        name: 'deprinderi-daunatoare',
        ru: 'Вредные привычки'
      },
      152: {
        id: 152,
        ro: 'Documentere',
        name: 'documentere',
        ru: 'Справки и документы'
      },
      153: {
        id: 153,
        ro: 'Medicamente',
        name: 'medicamente',
        ru: 'Медицинские препараты'
      },
      154: {
        id: 154,
        ro: 'Aparate medicinale',
        name: 'aparate-medicinale',
        ru: 'Медицинское оборудование'
      },
      155: {
        id: 155,
        ro: 'Servicii medicale',
        name: 'servicii-medicale',
        ru: 'Медицинское обслуживание'
      },
      156: {
        id: 156,
        ro: 'Asigurare',
        name: 'asigurare',
        ru: 'Страхование'
      }
    }
  },
  49: {
    id: 49,
    ro: 'Modă și Stil',
    name: 'moda-stil',
    ru: 'Мода и стиль',
    categories: {
      157: {
        id: 157,
        ro: 'Jurnale, Reviste',
        name: 'jurnale-reviste',
        ru: 'Журналы'
      },
      158: {
        id: 158,
        ro: 'Magazine, Ateliere',
        name: 'magazine-ateliere',
        ru: 'Магазины, Ателье'
      },
      159: {
        id: 159,
        ro: 'Machiaj și cosmetică',
        name: 'machiaj-cosmetica',
        ru: 'Макияж, косметика'
      },
      160: {
        id: 160,
        ro: 'Îmbrăcăminte',
        name: 'imbracaminte',
        ru: 'Одежда, обувь'
      },
      161: {
        id: 161,
        ro: 'Parfumerie',
        name: 'parfumerie',
        ru: 'Парфюмерия'
      },
      162: {
        id: 162,
        ro: 'Sfaturi',
        name: 'sfaturi',
        ru: 'Советы, рекомендации'
      }
    }
  },
  50: {
    id: 50,
    ro: 'Știință',
    name: 'stiința',
    ru: 'Наука',
    categories: {
      163: {
        id: 163,
        ro: 'Organe administrative',
        name: 'organe-administrative',
        ru: 'Административные органы'
      },
      164: {
        id: 164,
        ro: 'Granturi',
        name: 'granturi',
        ru: 'Гранты'
      },
      165: {
        id: 165,
        ro: 'Științe umaniste',
        name: 'stiinte-umaniste',
        ru: 'Гуманитарные'
      },
      166: {
        id: 166,
        ro: 'Naturale și exacte',
        name: 'naturale-exacte',
        ru: 'Естественные и точные'
      },
      167: {
        id: 167,
        ro: 'Jurnale, Publicații',
        name: 'jurnale-publicatii',
        ru: 'Журналы, публикации'
      },
      168: {
        id: 168,
        ro: 'Conferințe',
        name: 'conferinte',
        ru: 'Конференции'
      },
      169: {
        id: 169,
        ro: 'Centre științifice',
        name: 'centre-stiintifice',
        ru: 'Научные центры'
      },
      170: {
        id: 170,
        ro: 'Oameni de știință',
        name: 'oameni-de-stiința',
        ru: 'Сайты ученых'
      },
      171: {
        id: 171,
        ro: 'Tehnică',
        name: 'tehnica',
        ru: 'Технические'
      }
    }
  },
  51: {
    id: 51,
    ro: 'Imobiliare',
    name: 'imobiliare',
    ru: 'Недвижимость',
    categories: {
      172: {
        id: 172,
        ro: 'Arendă',
        name: 'arenda',
        ru: 'Аренда'
      },
      173: {
        id: 173,
        ro: 'Expoziții',
        name: 'expozitii',
        ru: 'Выставки'
      },
      174: {
        id: 174,
        ro: 'Parcări și garaje',
        name: 'parcari-garaje',
        ru: 'Гаражи и автостоянки'
      },
      175: {
        id: 175,
        ro: 'Utilități',
        name: 'utilitati',
        ru: 'ЖКХ'
      },
      176: {
        id: 176,
        ro: 'Urban',
        name: 'urban',
        ru: 'Городская'
      },
      177: {
        id: 177,
        ro: 'Rural',
        name: 'rural',
        ru: 'Загородная'
      },
      178: {
        id: 178,
        ro: 'Peste hotare',
        name: 'peste-hotare',
        ru: 'Зарубежная'
      },
      179: {
        id: 179,
        ro: 'Ipotecă',
        name: 'ipoteca',
        ru: 'Ипотека'
      },
      180: {
        id: 180,
        ro: 'Evaluare',
        name: 'evaluare',
        ru: 'Оценка'
      },
      181: {
        id: 181,
        ro: 'Vânzare',
        name: 'vanzare',
        ru: 'Коммерческая'
      },
      182: {
        id: 182,
        ro: 'Asigurare imobiliară',
        name: 'asigurare-imobiliara',
        ru: 'Страхование имущества'
      },
      183: {
        id: 183,
        ro: 'Teren',
        name: 'teren',
        ru: 'Участки'
      }
    }
  },
  52: {
    id: 52,
    ro: 'Știri, Massmedia',
    name: 'stiri-massmedia',
    ru: 'Новости и СМИ',
    categories: {
      184: {
        id: 184,
        ro: 'Analiză, Recenzii',
        name: 'analiza-recenzii',
        ru: 'Аналитика, обзоры'
      },
      185: {
        id: 185,
        ro: 'Bloguri',
        name: 'bloguri',
        ru: 'Блоги'
      },
      186: {
        id: 186,
        ro: 'Ziare, Reviste',
        name: 'ziare-reviste',
        ru: 'Газеты, журналы'
      },
      187: {
        id: 187,
        ro: 'Agenții de știri',
        name: 'agentii-de-stiri',
        ru: 'Информационные агентства'
      },
      188: {
        id: 188,
        ro: 'Organizații de jurnaliști',
        name: 'organizatii-de-jurnalisti',
        ru: 'Организации журналистов'
      },
      189: {
        id: 189,
        ro: 'Radio',
        name: 'radio',
        ru: 'Радио'
      },
      190: {
        id: 190,
        ro: 'TV',
        name: 'tv',
        ru: 'Телевидение'
      }
    }
  },
  53: {
    id: 53,
    ro: 'Educație, Învățământ',
    name: 'educatie-invatamant',
    ru: 'Образование',
    categories: {
      191: {
        id: 191,
        ro: 'Învățământ non-formal',
        name: 'invatamant-non-formal',
        ru: 'Внешкольное образование'
      },
      192: {
        id: 192,
        ro: 'Publicații',
        name: 'publicatii',
        ru: 'Вузовские издания'
      },
      193: {
        id: 193,
        ro: 'Învățământ superior',
        name: 'invatamant-superior',
        ru: 'Вузы'
      },
      194: {
        id: 194,
        ro: 'Defectologie',
        name: 'defectologie',
        ru: 'Дефектология'
      },
      195: {
        id: 195,
        ro: 'Învățământ la distanță',
        name: 'invatamant-la-distanta',
        ru: 'Дистанционное образование'
      },
      196: {
        id: 196,
        ro: 'Învățământ preșcolar',
        name: 'invatamant-prescolar',
        ru: 'Дошкольное воспитание'
      },
      197: {
        id: 197,
        ro: 'Informație',
        name: 'informatie',
        ru: 'Методические материалы'
      },
      198: {
        id: 198,
        ro: 'Servicii educaționale',
        name: 'servicii-educationale',
        ru: 'Образовательные услуги'
      },
      199: {
        id: 199,
        ro: 'Studii în trăinătate',
        name: 'studii-in-trainatate',
        ru: 'Обучение за рубежом'
      },
      200: {
        id: 200,
        ro: 'Organe de control',
        name: 'organe-de-control',
        ru: 'Органы управления'
      },
      201: {
        id: 201,
        ro: 'Dezvoltare personală',
        name: 'dezvoltare-personala',
        ru: 'Повышение квалификации'
      },
      202: {
        id: 202,
        ro: 'Profesori',
        name: 'profesori',
        ru: 'Сайты педагогов'
      },
      203: {
        id: 203,
        ro: 'Învățământ școlar',
        name: 'invatamant-scolar',
        ru: 'Среднее образование'
      },
      204: {
        id: 204,
        ro: 'Rechezite școlare',
        name: 'rechezite-scolare',
        ru: 'Средства обучения'
      },
      205: {
        id: 205,
        ro: 'Viața studențească',
        name: 'viata-studenteasca',
        ru: 'Студенческая жизнь'
      },
      206: {
        id: 206,
        ro: 'Teorie și istorie',
        name: 'teorie-istorie',
        ru: 'Теория и история'
      },
      207: {
        id: 207,
        ro: 'Fonduri, Burse, Granturi',
        name: 'fonduri-burse-granturi',
        ru: 'Фонды, стипендии, гранты'
      }
    }
  },
  54: {
    id: 54,
    ro: 'Copii, Adolescenți',
    name: 'copii-adolescenți',
    ru: 'Подросткам и детям',
    categories: {
      208: {
        id: 208,
        ro: 'Jurnale',
        name: 'jurnale',
        ru: 'Журналы'
      },
      209: {
        id: 209,
        ro: 'Jocuri',
        name: 'jocuri',
        ru: 'Игры'
      },
      210: {
        id: 210,
        ro: 'Cluburi',
        name: 'cluburi',
        ru: 'Клубы'
      },
      211: {
        id: 211,
        ro: 'Modă și stil',
        name: 'moda-stil',
        ru: 'Мода и стиль'
      },
      212: {
        id: 212,
        ro: 'Muzică',
        name: 'muzica',
        ru: 'Музыка'
      },
      213: {
        id: 213,
        ro: 'Comunicare',
        name: 'comunicare',
        ru: 'Общение'
      },
      214: {
        id: 214,
        ro: 'Lucru',
        name: 'lucru',
        ru: 'Работа для молодежи'
      },
      215: {
        id: 215,
        ro: 'Divertisment',
        name: 'divertisment',
        ru: 'Развлечения'
      },
      216: {
        id: 216,
        ro: 'Sport',
        name: 'sport',
        ru: 'Спорт'
      },
      217: {
        id: 217,
        ro: 'Artă',
        name: 'arta',
        ru: 'Творчество'
      },
      218: {
        id: 218,
        ro: 'Studii',
        name: 'studii',
        ru: 'Учеба'
      }
    }
  },
  55: {
    id: 55,
    ro: 'Călătorii',
    name: 'calatorii',
    ru: 'Путешествия',
    categories: {
      219: {
        id: 219,
        ro: 'Odihnă activă',
        name: 'odihna-activa',
        ru: 'Активный отдых'
      },
      220: {
        id: 220,
        ro: 'Hoteluri',
        name: 'hoteluri',
        ru: 'Гостиницы'
      },
      221: {
        id: 221,
        ro: 'Pașapoarte și vize',
        name: 'pasapoarte-vize',
        ru: 'Оформление загранпаспортов и виз'
      },
      222: {
        id: 222,
        ro: 'Evaluări, Recenzii',
        name: 'evaluari-recenzii',
        ru: 'Рейтинги, отзывы'
      },
      223: {
        id: 223,
        ro: 'Sanatorii',
        name: 'sanatorii',
        ru: 'Санатории'
      },
      224: {
        id: 224,
        ro: 'Destinații',
        name: 'destinatii',
        ru: 'Страны'
      },
      225: {
        id: 225,
        ro: 'Agenții turistice',
        name: 'agentii-turistice',
        ru: 'Туроператоры и агентства'
      },
      226: {
        id: 226,
        ro: 'Excursii',
        name: 'excursii',
        ru: 'Туры и экскурсии'
      }
    }
  },
  56: {
    id: 56,
    ro: 'Lucru și carieră',
    name: 'lucru-cariera',
    ru: 'Работа и карьера',
    categories: {
      227: {
        id: 227,
        ro: 'Piața brațelor de muncă',
        name: 'piata-bratelor-de-munca',
        ru: 'Биржи труда'
      },
      228: {
        id: 228,
        ro: 'Locuri de muncă',
        name: 'locuri-de-munca',
        ru: 'Вакансии, резюме'
      },
      229: {
        id: 229,
        ro: 'Agenții',
        name: 'agentii',
        ru: 'Кадровые агентства'
      },
      230: {
        id: 230,
        ro: 'Dezvoltare profesională',
        name: 'dezvoltare-profesionala',
        ru: 'Повышение квалификации'
      },
      231: {
        id: 231,
        ro: 'Lucru pe internet',
        name: 'lucru-pe-internet',
        ru: 'Работа в интернете'
      },
      232: {
        id: 232,
        ro: 'Lucru pentru tineri',
        name: 'lucru-pentru-tineri',
        ru: 'Работа для молодежи'
      },
      233: {
        id: 233,
        ro: 'Freelance',
        name: 'freelance',
        ru: 'Фриланс'
      },
      234: {
        id: 234,
        ro: 'Lucru peste hotare',
        name: 'lucru-peste-hotare',
        ru: 'Работа за рубежом'
      },
      235: {
        id: 235,
        ro: 'Munca de sezon',
        name: 'munca-de-sezon',
        ru: 'Сезонная работа'
      },
      236: {
        id: 236,
        ro: 'Drepturi',
        name: 'drepturi',
        ru: 'Трудовое право'
      }
    }
  },
  57: {
    id: 57,
    ro: 'Religie',
    name: 'religie',
    ru: 'Религия',
    categories: {
      237: {
        id: 237,
        ro: 'Ateism',
        name: 'ateism',
        ru: 'Атеизм'
      },
      238: {
        id: 238,
        ro: 'Budism',
        name: 'budism',
        ru: 'Буддизм'
      },
      239: {
        id: 239,
        ro: 'Islam',
        name: 'islam',
        ru: 'Ислам'
      },
      240: {
        id: 240,
        ro: 'Istoria religiei',
        name: 'istoria-religiei',
        ru: 'Религиозная история'
      },
      241: {
        id: 241,
        ro: 'Iudaism',
        name: 'iudaism',
        ru: 'Иудаизм'
      },
      242: {
        id: 242,
        ro: 'Pelerinaj',
        name: 'pelerinaj',
        ru: 'Паломничество'
      },
      243: {
        id: 243,
        ro: 'Educație religioasă',
        name: 'educatie-religioasa',
        ru: 'Религиозное образование'
      },
      244: {
        id: 244,
        ro: 'Creștinism',
        name: 'crestinism',
        ru: 'Христианство'
      },
      245: {
        id: 245,
        ro: 'Păgânism',
        name: 'paganism',
        ru: 'Язычество'
      }
    }
  },
  58: {
    id: 58,
    ro: 'Casă și familie',
    name: 'casa-familie',
    ru: 'Семья и быт',
    categories: {
      246: {
        id: 246,
        ro: 'Servicii casnice',
        name: 'servicii-casnice',
        ru: 'Бытовое обслуживание'
      },
      247: {
        id: 247,
        ro: 'Copii',
        name: 'copii',
        ru: 'Дети'
      },
      248: {
        id: 248,
        ro: 'Animale de companie',
        name: 'animale-de-companie',
        ru: 'Домашние животные'
      },
      249: {
        id: 249,
        ro: 'Gastronomie',
        name: 'gastronomie',
        ru: 'Кулинария'
      },
      250: {
        id: 250,
        ro: 'Înmormântări',
        name: 'inmormantari',
        ru: 'Ритуальные услуги'
      },
      251: {
        id: 251,
        ro: 'Grădină',
        name: 'gradina',
        ru: 'Сад и огород'
      }
    }
  },
  59: {
    id: 59,
    ro: 'Sport',
    name: 'sport',
    ru: 'Спорт',
    categories: {
      252: {
        id: 252,
        ro: 'Bowling',
        name: 'bowling',
        ru: 'Боулинг'
      },
      253: {
        id: 253,
        ro: 'Sporturi de apă',
        name: 'sporturi-de-apa',
        ru: 'Водные виды'
      },
      254: {
        id: 254,
        ro: 'Sporturi de iarnă',
        name: 'sporturi-de-iarna',
        ru: 'Зимние виды'
      },
      255: {
        id: 255,
        ro: 'Jocuri intelectuale',
        name: 'jocuri-intelectuale',
        ru: 'Интеллектуальные игры'
      },
      256: {
        id: 256,
        ro: 'Jocuri de echipă',
        name: 'jocuri-de-echipa',
        ru: 'Командные виды'
      },
      257: {
        id: 257,
        ro: 'Atletica ușoară',
        name: 'atletica-usoara',
        ru: 'Легкая атлетика'
      },
      258: {
        id: 258,
        ro: 'Societăți, Federații',
        name: 'societati-federatii',
        ru: 'Общества, федерации'
      },
      259: {
        id: 259,
        ro: 'Centre de sănătate',
        name: 'centre-de-sanatate',
        ru: 'Оздоровительные центры'
      },
      260: {
        id: 260,
        ro: 'Cluburi sportive',
        name: 'cluburi-sportive',
        ru: 'Спортивные клубы'
      },
      261: {
        id: 261,
        ro: 'Articole sportive',
        name: 'articole-sportive',
        ru: 'Спортивные товары '
      },
      262: {
        id: 262,
        ro: 'Fanclub-uri',
        name: 'fanclub',
        ru: 'Фан-клубы'
      },
      263: {
        id: 263,
        ro: 'Fitness, Culturism',
        name: 'fitness-culturism',
        ru: 'Фитнес и бодибилдинг'
      },
      264: {
        id: 264,
        ro: 'Sporturi extreme',
        name: 'sporturi-extreme',
        ru: 'Экстремальный спорт'
      }
    }
  },
  60: {
    id: 60,
    ro: 'Construcții, Reparații',
    name: 'constructii',
    ru: 'Строительство и ремонт',
    categories: {
      265: {
        id: 265,
        ro: 'Meteriale și echipament',
        name: 'meteriale-echipament',
        ru: 'Материалы и оборудование'
      },
      266: {
        id: 266,
        ro: 'Proiectare',
        name: 'proiectare',
        ru: 'Проектирование'
      },
      267: {
        id: 267,
        ro: 'Sfaturi și consiliere',
        name: 'sfaturi-consiliere',
        ru: 'Советы и рекомендации'
      },
      268: {
        id: 268,
        ro: 'Expertiza tehnică',
        name: 'expertiza-tehnica',
        ru: 'Техническая экспертиза и надзор'
      },
      269: {
        id: 269,
        ro: 'Contractori, Echipe',
        name: 'contractori-echipe',
        ru: 'Подрядчики, бригады'
      }
    }
  },
  61: {
    id: 61,
    ro: 'Comerț',
    name: 'comert',
    ru: 'Торговля',
    categories: {
      270: {
        id: 270,
        ro: 'Auto, Moto',
        name: 'auto-moto',
        ru: 'Автомобили'
      },
      271: {
        id: 271,
        ro: 'Farmacii, Optică',
        name: 'farmacii-optica',
        ru: 'Аптеки, оптики'
      },
      272: {
        id: 272,
        ro: 'Vilă și grădină',
        name: 'vila-gradina',
        ru: 'Для дачи и сада'
      },
      273: {
        id: 273,
        ro: 'Pentru copii',
        name: 'pentru-copii',
        ru: 'Для детей'
      },
      274: {
        id: 274,
        ro: 'Pentru animale',
        name: 'pentru-animale',
        ru: 'Для животных'
      },
      275: {
        id: 275,
        ro: 'Pentru birou',
        name: 'pentru-birou',
        ru: 'Для офиса'
      },
      276: {
        id: 276,
        ro: 'Cărți',
        name: 'carti',
        ru: 'Книги'
      },
      277: {
        id: 277,
        ro: 'Frumusețe, Sănătate',
        name: 'frumusete-sanatate',
        ru: 'Красота и здоровье'
      },
      278: {
        id: 278,
        ro: 'Muzică, Film',
        name: 'muzica-film',
        ru: 'Музыка, фильмы'
      },
      279: {
        id: 279,
        ro: 'Îmbrăcăminte, Accesorii',
        name: 'imbracaminte',
        ru: 'Одежда, обувь, аксессуары '
      },
      280: {
        id: 280,
        ro: 'Cadouri, Flori',
        name: 'cadouri-flori',
        ru: 'Подарки, цветы'
      },
      281: {
        id: 281,
        ro: 'Produse alimentare',
        name: 'produse-alimentare',
        ru: 'Продукты'
      },
      282: {
        id: 282,
        ro: 'Sport, Turism',
        name: 'sport-turism',
        ru: 'Спорт, Туризм'
      },
      283: {
        id: 283,
        ro: 'Materiale de construcție',
        name: 'materiale-de-constructie',
        ru: 'Строительные материалы'
      },
      284: {
        id: 284,
        ro: 'Pentru casă',
        name: 'pentru-casa',
        ru: 'Товары для дома'
      },
      285: {
        id: 285,
        ro: 'Electrocasnice',
        name: 'electrocasnice',
        ru: 'Электронная техника'
      },
      286: {
        id: 286,
        ro: 'Bijuterii',
        name: 'bijuterii',
        ru: 'Ювелирные изделия'
      }
    }
  },
  970: {
    id: 970,
    ro: 'Informație',
    name: 'informatie',
    ru: 'Справки',
    categories: {
      971: {
        id: 971,
        ro: 'Calendare',
        name: 'calendare',
        ru: 'Календари'
      },
      972: {
        id: 972,
        ro: 'Hărți și diagrame',
        name: 'harti-diagrame',
        ru: 'Карты и схемы'
      },
      973: {
        id: 973,
        ro: 'Codurile de orașe și țări',
        name: 'codurile-de-orase-tari',
        ru: 'Коды городов и стран'
      },
      974: {
        id: 974,
        ro: 'Personalități',
        name: 'personalitati',
        ru: 'Персоны'
      },
      975: {
        id: 975,
        ro: 'Vremea',
        name: 'vremea',
        ru: 'Погода'
      },
      976: {
        id: 976,
        ro: 'ZIP coduri',
        name: 'zip-coduri',
        ru: 'Почтовые индексы'
      },
      977: {
        id: 977,
        ro: 'Orar transport',
        name: 'orar-transport',
        ru: 'Расписания транспорта'
      },
      978: {
        id: 978,
        ro: 'Dicționare, traduceri',
        name: 'dictionare-traduceri',
        ru: 'Словари, переводчики'
      },
      979: {
        id: 979,
        ro: 'Statistici',
        name: 'statistici',
        ru: 'Статистические данные'
      },
      980: {
        id: 980,
        ro: 'Enciclopedii',
        name: 'enciclopedii',
        ru: 'Энциклопедии'
      }
    }
  }
};
