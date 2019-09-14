const storesData = [
  {
    'id': 1,
    'name': 'Morón',
    'latitude': -34.649374,
    'longitude': -58.6235667,
  },
  {
    'id': 2,
    'name': 'Padua',
    'latitude': -34.6665171,
    'longitude': -58.7053631,
  },
  {
    'id': 3,
    'name': 'Castelar',
    'latitude': -34.6409618,
    'longitude': -58.6583778,
  },
  {
    'id': 4,
    'name': 'Ballester',
    'latitude': -34.549459,
    'longitude': -58.5543418,
  },
  {
    'id': 5,
    'name': 'Ecuador',
    'latitude': -34.5940735,
    'longitude': -58.4054737,
  },
  {
    'id': 6,
    'name': 'La Plata',
    'latitude': -34.9132032,
    'longitude': -57.952291,
  },
  {
    'id': 7,
    'name': 'Portal Lomas',
    'latitude': -34.791601,
    'longitude': -58.416914,
  },
  {
    'id': 8,
    'name': 'Caseros',
    'latitude': -34.605653,
    'longitude': -58.564487,
  },
  {
    'id': 9,
    'name': 'San Fernando',
    'latitude': -34.446685,
    'longitude': -58.545857,
  },
  {
    'id': 10,
    'name': 'Escobar',
    'latitude': -34.3483227,
    'longitude': -58.7981075,
  },
  {
    'id': 11,
    'name': 'Wilde',
    'latitude': -34.7036033,
    'longitude': -58.3189912,
  },
  {
    'id': 12,
    'name': 'Haedo',
    'latitude': -34.6392098,
    'longitude': -58.5831834,
  },
  {
    'id': 13,
    'name': 'Ramos Mejía',
    'latitude': -34.6420755,
    'longitude': -58.5746414,
  },
  {
    'id': 14,
    'name': 'Liniers',
    'latitude': -34.6402479,
    'longitude': -58.5270297,
  },
  {
    'id': 15,
    'name': 'Morón II',
    'latitude': -34.6484792,
    'longitude': -58.618536,
  },
  {
    'id': 16,
    'name': 'Plaza Oeste',
    'latitude': -34.6348719,
    'longitude': -58.6293442,
  },
  {
    'id': 17,
    'name': 'Merlo',
    'latitude': -34.666458,
    'longitude': -58.72693,
  },
  {
    'id': 18,
    'name': 'Moreno',
    'latitude': -34.6491969,
    'longitude': -58.7895162,
  },
  {
    'id': 19,
    'name': 'Ituzaingo',
    'latitude': -34.6577384,
    'longitude': -58.6669749,
  },
  {
    'id': 20,
    'name': 'Francisco Alvarez',
    'latitude': -34.6095534,
    'longitude': -58.8711634,
  },
  {
    'id': 21,
    'name': 'Leloir',
    'latitude': -34.6280117,
    'longitude': -58.6917222,
  },
  {
    'id': 22,
    'name': 'Martínez',
    'latitude': -34.4804135,
    'longitude': -58.492459,
  },
  {
    'id': 23,
    'name': 'Unicines',
    'latitude': -34.5079697,
    'longitude': -58.5248298,
  },
  {
    'id': 24,
    'name': 'Uni TN',
    'latitude': -34.5079697,
    'longitude': -58.5248298,
  },
  {
    'id': 25,
    'name': 'Soleil',
    'latitude': -34.4944369,
    'longitude': -58.5851571,
  },
  {
    'id': 26,
    'name': 'San Miguel',
    'latitude': -34.543982,
    'longitude': -58.7092049,
  },
  {
    'id': 27,
    'name': 'Terrazas de Mayo',
    'latitude': -34.5303969,
    'longitude': -58.7018379,
  },
  {
    'id': 28,
    'name': 'Fondo de la Legua',
    'latitude': -34.4975215,
    'longitude': -58.5438575,
  },
  {
    'id': 29,
    'name': 'San Miguel II',
    'latitude': -34.5419568,
    'longitude': -58.7145043,
  },
  {
    'id': 32,
    'name': 'Quilmes',
    'latitude': -34.7238968,
    'longitude': -58.2611185,
  },
  {
    'id': 33,
    'name': 'Gonzalez Catan',
    'latitude': -34.7862457,
    'longitude': -58.6233276,
  },
  {
    'id': 34,
    'name': 'Solano',
    'latitude': -34.7816873,
    'longitude': -58.3142627,
  },
  {
    'id': 35,
    'name': 'Quilmes Factory',
    'latitude': -34.7594991,
    'longitude': -58.2786666,
  },
  {
    'id': 36,
    'name': 'San Justo',
    'latitude': -34.6821771,
    'longitude': -58.5559906,
  },
  {
    'id': 37,
    'name': 'Berazategui',
    'latitude': -34.7624,
    'longitude': -58.2107716,
  },
  {
    'id': 38,
    'name': 'La Plata 51',
    'latitude': -34.9156214,
    'longitude': -57.9510432,
  },
  {
    'id': 39,
    'name': 'P. Madero',
    'latitude': -34.6206878,
    'longitude': -58.3657228,
  },
  {
    'id': 40,
    'name': 'A. Avellaneda',
    'latitude': -34.6754072,
    'longitude': -58.3689887,
  },
  {
    'id': 41,
    'name': 'Puerto Viamonte',
    'latitude': -34.6020029,
    'longitude': -58.3678822,
  },
  {
    'id': 42,
    'name': 'Avellaneda Mitre',
    'latitude': -34.6614581,
    'longitude': -58.3663792,
  },
  {
    'id': 43,
    'name': 'Lanús Este',
    'latitude': -34.7097153,
    'longitude': -58.3876777,
  },
  {
    'id': 44,
    'name': 'Lanus Oeste',
    'latitude': -34.6907246,
    'longitude': -58.4220747,
  },
  {
    'id': 45,
    'name': 'Village Avellaneda',
    'latitude': -34.6769716,
    'longitude': -58.3356987,
  },
  {
    'id': 46,
    'name': 'Banfield',
    'latitude': -34.7441906,
    'longitude': -58.3977727,
  },
  {
    'id': 47,
    'name': 'Obelisco',
    'latitude': -34.6029803,
    'longitude': -58.3809772,
  },
  {
    'id': 48,
    'name': 'Florida',
    'latitude': -34.6033009,
    'longitude': -58.3753137,
  },
  {
    'id': 49,
    'name': 'Galerias Pacifico',
    'latitude': -34.5988548,
    'longitude': -58.3752079,
  },
  {
    'id': 50,
    'name': 'Lavalle',
    'latitude': -34.6019936,
    'longitude': -58.3792377,
  },
  {
    'id': 51,
    'name': 'Flores',
    'latitude': -34.6252736,
    'longitude': -58.4568027,
  },
  {
    'id': 52,
    'name': 'Once',
    'latitude': -34.6061186,
    'longitude': -58.4079717,
  },
  {
    'id': 53,
    'name': 'Caballito',
    'latitude': -34.6137216,
    'longitude': -58.4293447,
  },
  {
    'id': 54,
    'name': 'Abasto',
    'latitude': -34.6030596,
    'longitude': -58.4131327,
  },
  {
    'id': 55,
    'name': 'Acoyte',
    'latitude': -34.6187981,
    'longitude': -58.4373908,
  },
  {
    'id': 56,
    'name': 'Gavilán',
    'latitude': -34.6274856,
    'longitude': -58.4616207,
  },
  {
    'id': 57,
    'name': 'Nazca',
    'latitude': -34.6306376,
    'longitude': -58.4720807,
  },
  {
    'id': 58,
    'name': 'Almagro',
    'latitude': -34.6137576,
    'longitude': -58.4293667,
  },
  {
    'id': 59,
    'name': 'Lomas',
    'latitude': -34.7504376,
    'longitude': -58.4027977,
  },
  {
    'id': 60,
    'name': 'Parque Brown',
    'latitude': -34.6744216,
    'longitude': -58.4629987,
  },
  {
    'id': 61,
    'name': 'Lomas Centro',
    'latitude': -34.7607106,
    'longitude': -58.4038517,
  },
  {
    'id': 62,
    'name': 'Plaza Canning',
    'latitude': -34.8580236,
    'longitude': -58.5064797,
  },
  {
    'id': 63,
    'name': 'Portal Neuquén',
    'latitude': -38.9596878,
    'longitude': -68.0947957,
  },
  {
    'id': 64,
    'name': 'Temperley',
    'latitude': -34.7816784,
    'longitude': -58.4067741,
  },
  {
    'id': 65,
    'name': 'Alto Comahue',
    'latitude': -38.9421318,
    'longitude': -68.0669017,
  },
  {
    'id': 66,
    'name': 'Monte Grande',
    'latitude': -34.8337692,
    'longitude': -58.4573303,
  },
  {
    'id': 67,
    'name': 'Lomas Alsina',
    'latitude': -34.7596366,
    'longitude': -58.3982327,
  },
  {
    'id': 68,
    'name': 'Paseo de la Patagonia',
    'latitude': -38.9457388,
    'longitude': -68.0768507,
  },
  {
    'id': 69,
    'name': 'V. Urquiza',
    'latitude': -34.5746411,
    'longitude': -58.4859486,
  },
  {
    'id': 70,
    'name': 'Canning',
    'latitude': -34.5993064,
    'longitude': -58.4398765,
  },
  {
    'id': 71,
    'name': 'Angel Gallardo',
    'latitude': -34.6017136,
    'longitude': -58.4337277,
  },
  {
    'id': 72,
    'name': 'Olivos',
    'latitude': -34.5092383,
    'longitude': -58.4917995,
  },
  {
    'id': 73,
    'name': 'DOT Baires',
    'latitude': -34.5459442,
    'longitude': -58.4888727,
  },
  {
    'id': 74,
    'name': 'Cuenca',
    'latitude': -34.5985026,
    'longitude': -58.4995357,
  },
  {
    'id': 75,
    'name': 'San Isidro',
    'latitude': -34.4702336,
    'longitude': -58.5143097,
  },
  {
    'id': 76,
    'name': 'Vicente Lopez',
    'latitude': -34.5158126,
    'longitude': -58.4781537,
  },
  {
    'id': 77,
    'name': 'Rosario',
    'latitude': -32.9346595,
    'longitude': -60.7033507,
  },
  {
    'id': 78,
    'name': 'El Portal',
    'latitude': -32.9087285,
    'longitude': -60.6857307,
  },
  {
    'id': 79,
    'name': 'Portal Tucumám',
    'latitude': -26.8214672,
    'longitude': -65.2694077,
  },
  {
    'id': 80,
    'name': 'Alto Rosario',
    'latitude': -32.9261525,
    'longitude': -60.6713277,
  },
  {
    'id': 81,
    'name': 'Tucumán centro',
    'latitude': -26.8237762,
    'longitude': -65.2053277,
  },
  {
    'id': 82,
    'name': 'Rosario Centro',
    'latitude': -32.9449315,
    'longitude': -60.6476807,
  },
  {
    'id': 83,
    'name': 'Alto Noa',
    'latitude': -24.7809141,
    'longitude': -65.4056027,
  },
  {
    'id': 84,
    'name': 'Resistencia',
    'latitude': -27.4145302,
    'longitude': -58.9693147,
  },
  {
    'id': 85,
    'name': 'Palmares Open Mall',
    'latitude': -32.9529315,
    'longitude': -68.8590007,
  },
  {
    'id': 86,
    'name': 'Mendoza Plaza',
    'latitude': -32.9015565,
    'longitude': -68.7998797,
  },
  {
    'id': 87,
    'name': 'Mendoza Centro',
    'latitude': -32.8783825,
    'longitude': -68.8462507,
  },
  {
    'id': 88,
    'name': 'San Luis',
    'latitude': -33.3076385,
    'longitude': -66.3294237,
  },
  {
    'id': 89,
    'name': 'San Juan',
    'latitude': -31.5188944,
    'longitude': -68.5429147,
  },
  {
    'id': 90,
    'name': 'Rivera Indarte',
    'latitude': -31.3324374,
    'longitude': -64.2892917,
  },
  {
    'id': 91,
    'name': 'Nuevocentro',
    'latitude': -31.4126134,
    'longitude': -64.2065807,
  },
  {
    'id': 92,
    'name': 'Dino Mall',
    'latitude': -31.3654324,
    'longitude': -64.2217097,
  },
  {
    'id': 93,
    'name': 'Patio Olmos',
    'latitude': -31.4196084,
    'longitude': -64.1908997,
  },
  {
    'id': 94,
    'name': 'Cordoba Rivadavia',
    'latitude': -31.4156764,
    'longitude': -64.1848097,
  },
  {
    'id': 95,
    'name': 'Jockey Cordoba',
    'latitude': -31.4130604,
    'longitude': -64.1881797,
  },
  {
    'id': 96,
    'name': 'Rio Cuarto',
    'latitude': -33.1177095,
    'longitude': -64.3506727,
  },
  {
    'id': 97,
    'name': 'Buen Pastor',
    'latitude': -33.1255585,
    'longitude': -64.3443897,
  },
  {
    'id': 98,
    'name': 'Lugones',
    'latitude': -31.3705574,
    'longitude': -64.2419357,
  },
  {
    'id': 99,
    'name': 'Rafael Nuñez',
    'latitude': -31.3678914,
    'longitude': -64.2377737,
  },
  {
    'id': 100,
    'name': 'Colon',
    'latitude': -31.4099784,
    'longitude': -64.1966167,
  },
  {
    'id': 101,
    'name': 'Cine',
    'latitude': -34.6041796,
    'longitude': -58.3941357,
  },
  {
    'id': 102,
    'name': 'Ayacucho',
    'latitude': -34.5947226,
    'longitude': -58.3985867,
  },
  {
    'id': 103,
    'name': 'Bulnes',
    'latitude': -34.5875956,
    'longitude': -58.4138567,
  },
  {
    'id': 104,
    'name': 'Facultad',
    'latitude': -34.5993016,
    'longitude': -58.4024907,
  },
  {
    'id': 105,
    'name': 'Plaza Italia',
    'latitude': -34.5812806,
    'longitude': -58.4237747,
  },
  {
    'id': 106,
    'name': 'Rodriguez Peña',
    'latitude': -34.5993226,
    'longitude': -58.3942897,
  },
  {
    'id': 107,
    'name': 'Retiro',
    'latitude': -34.5917776,
    'longitude': -58.3792597,
  },
  {
    'id': 108,
    'name': 'Talcahuano',
    'latitude': -34.6034076,
    'longitude': -58.3862387,
  },
  {
    'id': 109,
    'name': 'Tigre',
    'latitude': -34.4221746,
    'longitude': -58.5824857,
  },
  {
    'id': 110,
    'name': 'Tortugas',
    'latitude': -34.4531316,
    'longitude': -58.7327687,
  },
  {
    'id': 111,
    'name': 'Champagnat',
    'latitude': -34.4497986,
    'longitude': -58.9191427,
  },
  {
    'id': 112,
    'name': 'Torres del Sol',
    'latitude': -34.4476566,
    'longitude': -58.9191437,
  },
  {
    'id': 113,
    'name': 'Remeros Plaza',
    'latitude': -34.4063405,
    'longitude': -58.6202496,
  },
  {
    'id': 114,
    'name': 'Campana',
    'latitude': -34.1763905,
    'longitude': -58.9770437,
  },
  {
    'id': 115,
    'name': 'Palmas de Pilar',
    'latitude': -34.4455036,
    'longitude': -58.8730417,
  },
  {
    'id': 116,
    'name': 'Belgrano',
    'latitude': -34.5596796,
    'longitude': -58.4603977,
  },
  {
    'id': 117,
    'name': 'Quesada',
    'latitude': -34.5545106,
    'longitude': -58.4654277,
  },
  {
    'id': 118,
    'name': 'Los Gallegos',
    'latitude': -37.9979848,
    'longitude': -57.5544547,
  },
  {
    'id': 119,
    'name': 'José Hernandez',
    'latitude': -34.5658076,
    'longitude': -58.4549897,
  },
  {
    'id': 120,
    'name': 'Mar del Plata Regina',
    'latitude': -37.9997428,
    'longitude': -57.5475557,
  },
  {
    'id': 121,
    'name': 'Udaondo',
    'latitude': -34.5491826,
    'longitude': -58.4566417,
  },
  {
    'id': 122,
    'name': 'Mar del Tuyu',
    'latitude': -36.4394087,
    'longitude': -56.9455907,
  },
  {
    'id': 123,
    'name': 'Bernal',
    'latitude': -34.7100635,
    'longitude': -58.2804211,
  },
  {
    'id': 124,
    'name': 'Perú',
    'latitude': -34.6081265,
    'longitude': -58.3751321,
  },
  {
    'id': 127,
    'name': 'Almagro',
    'latitude': -34.6137576,
    'longitude': -58.4293667,
  },
  {
    'id': 372,
    'name': 'La Plata 12',
    'latitude': -34.9226749,
    'longitude': -57.9508712,
  },
  {
    'id': 373,
    'name': 'La Plata 12 entrevista apertura',
    'latitude': -34.9142929,
    'longitude': -57.9458676,
  },
  {
    'id': 374,
    'name': 'Lujan Walk',
    'latitude': -34.550108,
    'longitude': -59.112093,
  },
  {
    'id': 375,
    'name': 'Valentin Alsina',
    'latitude': -34.672373,
    'longitude': -58.4097317,
  },
  {
    'id': 959,
    'name': 'Aeroparque',
    'latitude': -34.5580305,
    'longitude': -58.4191975,
  },
  {
    'id': 960,
    'name': 'Aeropuerto Ezeiza',
    'latitude': -34.814722,
    'longitude': -58.534807,
  }
 ];

 export default storesData;