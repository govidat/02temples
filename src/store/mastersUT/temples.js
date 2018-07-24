// export var mtemplesMaster = [
//   {Id: 2, LocalId: 2, StateId: 31, RegionId: 1, DistrictId: 1, IsmId: [1],
//     LongLat: [78.673418 , 10.826983], SaintId: [5, 12], SongId: [667, 1762],
//     Name: { English: "EnThirukkozhi - Sri Azhagiya Manavala Perumal Temple", Tamil: "TaThirukkozhi - Sri Azhagiya Manavala Perumal Temple", Telugu: "TeThirukkozhi - Sri Azhagiya Manavala Perumal Temple" }
//   },
//   {Id: 5, LocalId: 5, StateId: 31, RegionId: 1, DistrictId: 1, IsmId: [1],
//     LongLat: [78.882549 , 10.867804], SaintId: [4], SongId: [2417],
//     Name: { English: "EnThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple", Tamil: "TaThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple", Telugu: "TeThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple" }
//   },
//   {Id: 26, LocalId: 26, StateId: 31, RegionId: 1, DistrictId: 2, IsmId: [1],
//     LongLat: [79.785542 , 11.129729], SaintId: [5], SongId: [1736, 2784],
//     Name: { English: "EnThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple", Tamil: "TaThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple", Telugu: "TeThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple" }
//   },
//   {Id: 76, LocalId: 74, StateId: 18, RegionId: 6, DistrictId: 3, IsmId: [2],
//     LongLat: [77.923982 , 8.637055], SaintId: [10], SongId: [3571],
//     Name: { English: "EnThiruvaragunamangai - Sri Vijayaasana Perumal Temple", Tamil: "TaThiruvaragunamangai - Sri Vijayaasana Perumal Temple", Telugu: "TeThiruvaragunamangai - Sri Vijayaasana Perumal Temple" }
//   }
// ]

// export var temple = [
//   {id: 31, p_id: 0},
//   {id: 18, p_id: 0},
//   {id: 101, p_id: 31},
//   {id: 102, p_id: 31},
//   {id: 103, p_id: 18},
//   {id: 202, p_id: 101},
//   {id: 205, p_id: 101},
//   {id: 226, p_id: 102},
//   {id: 276, p_id: 103},
//   ];

// export var temple_desc = [
//   {id: 18, ln_id: 'en', desc: 'EnKerala'},
//   {id: 18, ln_id: 'ta', desc: 'TaKerala'},
//   {id: 18, ln_id: 'te', desc: 'TeKerala'},
//   {id: 31, ln_id: 'en', desc: 'EnTamilnadu'},
//   {id: 31, ln_id: 'ta', desc: 'TaTamilnadu'},
//   {id: 31, ln_id: 'te', desc: 'TeTamilnadu'},
//   {id: 101, ln_id: 'en', desc: 'EnTrichy'},
//   {id: 101, ln_id: 'ta', desc: 'TaTrichy'},
//   {id: 101, ln_id: 'te', desc: 'TeTrichy'},
//   {id: 102, ln_id: 'en', desc: 'EnTanjavur'},
//   {id: 102, ln_id: 'ta', desc: 'TaTanjavur'},
//   {id: 102, ln_id: 'te', desc: 'TeTanjavur'},
//   {id: 103, ln_id: 'en', desc: 'EnKannanur'},
//   {id: 103, ln_id: 'ta', desc: 'TaKannanur'},
//   {id: 103, ln_id: 'te', desc: 'TeKannanur'},
//   {id: 202, ln_id: 'en', desc: 'EnEnThirukkozhi - Sri Azhagiya Manavala Perumal Temple'},
//   {id: 202, ln_id: 'ta', desc: 'TaEnThirukkozhi - Sri Azhagiya Manavala Perumal Temple'},
//   {id: 202, ln_id: 'te', desc: 'TeEnThirukkozhi - Sri Azhagiya Manavala Perumal Temple'},
//   {id: 205, ln_id: 'en', desc: 'EnEnThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple'},
//   {id: 205, ln_id: 'ta', desc: 'TaEnThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple'},
//   {id: 205, ln_id: 'te', desc: 'TeEnThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple'},
//   {id: 226, ln_id: 'en', desc: 'EnThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple'},
//   {id: 226, ln_id: 'ta', desc: 'TaThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple'},
//   {id: 226, ln_id: 'te', desc: 'TeThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple'},
//   {id: 276, ln_id: 'en', desc: 'EnThiruvaragunamangai - Sri Vijayaasana Perumal Temple'},
//   {id: 276, ln_id: 'ta', desc: 'TaThiruvaragunamangai - Sri Vijayaasana Perumal Temple'},
//   {id: 276, ln_id: 'te', desc: 'TeThiruvaragunamangai - Sri Vijayaasana Perumal Temple'}
// ];

export var temple_ism = [
  {id: 18, to_id: 1},
  {id: 18, to_id: 2},
  {id: 31, to_id: 1},
  {id: 31, to_id: 2},
  {id: 101, to_id: 1},
  {id: 102, to_id: 1},
  {id: 103, to_id: 2},
  {id: 202, to_id: 1},
  {id: 205, to_id: 1},
  {id: 226, to_id: 1},
  {id: 276, to_id: 2}
];

export var temple_ism_old = [
  {ism_id: 1, temple_id: 18},
  {ism_id: 2, temple_id: 18},
  {ism_id: 1, temple_id: 31},
  {ism_id: 2, temple_id: 31},
  {ism_id: 1, temple_id: 101},
  {ism_id: 1, temple_id: 102},
  {ism_id: 2, temple_id: 103},
  {ism_id: 1, temple_id: 202},
  {ism_id: 1, temple_id: 205},
  {ism_id: 1, temple_id: 226},
  {ism_id: 2, temple_id: 276}
];

export var temple_pps = [
  {pps_id: 1, temple_id: 18},
  {pps_id: 2, temple_id: 18},
  {pps_id: 1, temple_id: 31},
  {pps_id: 2, temple_id: 31},
  {pps_id: 1, temple_id: 101},
  {pps_id: 1, temple_id: 102},
  {pps_id: 2, temple_id: 103},
  {pps_id: 1, temple_id: 202},
  {pps_id: 1, temple_id: 205},
  {pps_id: 1, temple_id: 226},
  {pps_id: 2, temple_id: 276}
];

export var temple = [
  {id: 2, h_path: [31, 3101]},
  {id: 5, h_path: [31, 3101]},
  {id: 26, h_path: [31, 3102]},
  {id: 76, h_path: [18, 1803]}
  ];

export var temple_hier = [
  {id: 18, path: [18]},
  {id: 31, path: [31]},
  {id: 3101, path: [31, 3101]},
  {id: 3102, path: [31, 3102]},
  {id: 1803, path: [18, 1803]}

];

export var ism_temple = [
  {id: 1, to_id: [2, 5, 26]},
  {id: 2, to_id: [76]}
];
