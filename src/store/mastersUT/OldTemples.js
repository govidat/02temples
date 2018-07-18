// export var mtemplesMaster = [
// {Id: 2,LocalId: 2, StateId: 31, RegionId: 1, Nearby: "Trichy", Location: "Uraiyur",
//   Name: { English: "EnThirukkozhi - Sri Azhagiya Manavala Perumal Temple", Tamil: "TaThirukkozhi - Sri Azhagiya Manavala Perumal Temple", Telugu: "TeThirukkozhi - Sri Azhagiya Manavala Perumal Temple" },
//   DistrictId: 1,
//   LongLat: [78.673418 , 10.826983], SaintId: [5, 12], SongId: [667, 1762],
//   Details: [
//     {
//       Header: { English: "En Nearby" },
//       Text: { English: "En Trichy" }
//     },
//     {
//       Header: { Tamil: "Ta Nearby" },
//       Text: { Tamil: "Ta Trichy" }
//     },
//     {
//       Header: { Telugu: "Te Nearby" },
//       Text: { Telugu: "Te Trichy" }
//     },
//
//     {
//       Header: { English: "En Some Header2", Tamil: "Ta Some Header2", Telugu: "Te Some Header2" },
//       Text: { English: "En Some Text2", Tamil: "Ta Some Text2", Telugu: "Te Some Text2" }
//     }
//   ]
// },
// {Id: 5,LocalId: 5, StateId: 31, RegionId: 1, Nearby: "Trichy", Location: "Anbil",
//   Name: { English: "EnThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple", Tamil: "TaThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple", Telugu: "TeThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple" },
//   DistrictId: 1,
//   LongLat: [78.882549 , 10.867804], SaintId: [4], SongId: [2417],
//   Details: [
//     {
//       Header: { English: "En Nearby", Tamil: "Ta Nearby", Telugu: "Te Nearby" },
//       Text: { English: "En Trichy5", Tamil: "Ta Trichy5", Telugu: "Te Trichy5" }
//     },
//     {
//       Header: { English: "En Some Header5", Tamil: "Ta Some Header5", Telugu: "Te Some Header5" },
//       Text: { English: "En Some Text5", Tamil: "Ta Some Text5", Telugu: "Te Some Text5" }
//     }
//   ]
// },
// {Id: 26,LocalId: 26, StateId: 31, RegionId: 1, Nearby: "TBD", Location: "TBD",
//   Name: { English: "EnThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple", Tamil: "TaThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple", Telugu: "TeThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple" },
//   DistrictId: 2,
//   LongLat: [79.785542 , 11.129729], SaintId: [5], SongId: [1736, 2784],
//   Details: [
//     {
//       Header: { English: "En Nearby", Tamil: "Ta Nearby", Telugu: "Te Nearby" },
//       Text: { English: "En Trichy26", Tamil: "Ta Trichy26", Telugu: "Te Trichy26" }
//     },
//     {
//       Header: { English: "En Some Header26", Tamil: "Ta Some Header26", Telugu: "Te Some Header26" },
//       Text: { English: "En Some Text26", Tamil: "Ta Some Text26", Telugu: "Te Some Text26" }
//     }
//   ]
// },
// {Id: 76,LocalId: 74, StateId: 18, RegionId: 6, Nearby: "TBD", Location: "TBD",
//   Name: { English: "EnThiruvaragunamangai - Sri Vijayaasana Perumal Temple", Tamil: "TaThiruvaragunamangai - Sri Vijayaasana Perumal Temple", Telugu: "TeThiruvaragunamangai - Sri Vijayaasana Perumal Temple" },
//   DistrictId: 3,
//   LongLat: [77.923982 , 8.637055], SaintId: [10], SongId: [3571],
//   Details: [
//     {
//       Header: { English: "En Nearby", Tamil: "Ta Nearby", Telugu: "Te Nearby" },
//       Text: { English: "En Trichy76", Tamil: "Ta Trichy76", Telugu: "Te Trichy76" }
//     },
//     {
//       Header: { English: "En Some Header76", Tamil: "Ta Some Header76", Telugu: "Te Some Header76" },
//       Text: { English: "En Some Text76", Tamil: "Ta Some Text76", Telugu: "Te Some Text76" }
//     }
//   ]
// },
// ]


const core = [
  {Id: 2, LocalId: 2, StateId: 31, RegionId: 1, DistrictId: 1, IsmId: [1],
    LongLat: [78.673418 , 10.826983], SaintId: [5, 12], SongId: [667, 1762]
  },
  {Id: 5, LocalId: 5, StateId: 31, RegionId: 1, DistrictId: 1, IsmId: [1],
    LongLat: [78.882549 , 10.867804], SaintId: [4], SongId: [2417]
  },
  {Id: 26, LocalId: 26, StateId: 31, RegionId: 1, DistrictId: 2, IsmId: [1],
    LongLat: [79.785542 , 11.129729], SaintId: [5], SongId: [1736, 2784]
  },
  {Id: 76, LocalId: 74, StateId: 18, RegionId: 6, DistrictId: 3, IsmId: [2],
    LongLat: [77.923982 , 8.637055], SaintId: [10], SongId: [3571]
  }
  ];

// const English = [
//   { Id: 2, Name: {English: "EnThirukkozhi - Sri Azhagiya Manavala Perumal Temple"},
//     Details: [
//       { Header: { English: "En Nearby2" }, Text: { English: "En Trichy2" }},
//       { Header: { English: "En Some Header2" },Text: { English: "En Some Text2" }}
//     ]
//   },
//   { Id: 5, Name: {English: 'EnThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple'},
//     Details: [
//       { Header: { English: "En Nearby5" }, Text: { English: "En Anbil" }},
//       { Header: { English: "En Some Header5" },Text: { English: "En Some Text5" }}]
//   },
//   { Id: 26, Name: {English: "EnThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple"},
//     Details: [
//       { Header: { English: "En Nearby26" }, Text: { English: "En Trichy26" }},
//       { Header: { English: "En Some Header26" },Text: { English: "En Some Text26" }}]
//   },
//   { Id: 76, Name: {English: "EnThiruvaragunamangai - Sri Vijayaasana Perumal Temple"},
//     Details: [
//       { Header: { English: "En Nearby76" }, Text: { English: "En Trichy76" }},
//       { Header: { English: "En Some Header76" },Text: { English: "En Some Text76" }}]
//   }
// ];
// const Tamil = [
//   { Id: 2, Name: {Tamil: "TaThirukkozhi - Sri Azhagiya Manavala Perumal Temple"},
//     Details: [
//       { Header: { Tamil: "Ta Nearby2" }, Text: { Tamil: "Ta Trichy2" }},
//       { Header: { Tamil: "Ta Some Header2" },Text: { Tamil: "Ta Some Text2" }}]
//   },
//   { Id: 5, Name: {Tamil: 'TaThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple'},
//     Details: [
//       { Header: { Tamil: "Ta Nearby5" }, Text: { Tamil: "Ta Anbil" }},
//       { Header: { Tamil: "Ta Some Header5" },Text: { Tamil: "Ta Some Text5" }}]
//   },
//   { Id: 26, Name: {Tamil: "TaThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple"},
//     Details: [
//       { Header: { Tamil: "Ta Nearby26" }, Text: { Tamil: "Ta Trichy26" }},
//       { Header: { Tamil: "Ta Some Header26" },Text: { Tamil: "Ta Some Text26" }}]
//   },
//   { Id: 76, Name: {Tamil: "TaThiruvaragunamangai - Sri Vijayaasana Perumal Temple"},
//     Details: [
//       { Header: { Tamil: "Ta Nearby76" }, Text: { Tamil: "Ta Trichy76" }},
//       { Header: { Tamil: "Ta Some Header76" },Text: { Tamil: "Ta Some Text76" }}]
//   }
// ];
// const Telugu = [
//   { Id: 2, Name: {Telugu: "TeThirukkozhi - Sri Azhagiya Manavala Perumal Temple"},
//     Details: [
//       { Header: { Telugu: "Te Nearby2" }, Text: { Telugu: "Te Trichy2" }},
//       { Header: { Telugu: "Te Some Header2" },Text: { Telugu: "Te Some Text2" }}]
//   },
//   { Id: 5, Name: {Telugu: 'TeThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple'},
//     Details: [
//       { Header: { Telugu: "Te Nearby5" }, Text: { Telugu: "Te Anbil" }},
//       { Header: { Telugu: "Te Some Header5" },Text: { Telugu: "Te Some Text5" }}]
//   },
//   { Id: 26, Name: {Telugu: "TeThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple"},
//     Details: [
//       { Header: { Telugu: "Te Nearby26" }, Text: { Telugu: "Te Trichy26" }},
//       { Header: { Telugu: "Te Some Header26" },Text: { Telugu: "Te Some Text26" }}]
//   },
//   { Id: 76, Name: {Telugu: "TeThiruvaragunamangai - Sri Vijayaasana Perumal Temple"},
//     Details: [
//       { Header: { Telugu: "Te Nearby76" }, Text: { Telugu: "Te Trichy76" }},
//       { Header: { Telugu: "Te Some Header76" },Text: { Telugu: "Te Some Text76" }}]
//   }
//];
const English = [
  { Id: 2, Name: "EnThirukkozhi - Sri Azhagiya Manavala Perumal Temple",
    Details: [
      { Header: "En Nearby2" , Text: "En Trichy2" },
      { Header: "En Some Header2", Text: "En Some Text2" }
    ]
  },
  { Id: 5, Name: 'EnThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple',
    Details: [
      { Header: "En Nearby5" , Text: "En Anbil" },
      { Header: "En Some Header5", Text: "En Some Text5" }]
  },
  { Id: 26, Name: "EnThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple",
    Details: [
      { Header: "En Nearby26" , Text: "En Trichy26" },
      { Header: "En Some Header26", Text: "En Some Text26" }]
  },
  { Id: 76, Name: "EnThiruvaragunamangai - Sri Vijayaasana Perumal Temple",
    Details: [
      { Header: "En Nearby76" , Text: "En Trichy76" },
      { Header: "En Some Header76" , Text: "En Some Text76" }]
  }
];
const Tamil = [
  { Id: 2, Name: "TaThirukkozhi - Sri Azhagiya Manavala Perumal Temple",
    Details: [
      { Header: "Ta Nearby2" , Text: "Ta Trichy2" },
      { Header: "Ta Some Header2", Text: "Ta Some Text2" }
    ]
  },
  { Id: 5, Name: 'TaThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple',
    Details: [
      { Header: "Ta Nearby5" , Text: "Ta Anbil" },
      { Header: "Ta Some Header5", Text: "Ta Some Text5" }]
  },
  { Id: 26, Name: "TaThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple",
    Details: [
      { Header: "Ta Nearby26" , Text: "Ta Trichy26" },
      { Header: "Ta Some Header26", Text: "Ta Some Text26" }]
  },
  { Id: 76, Name: "TaThiruvaragunamangai - Sri Vijayaasana Perumal Temple",
    Details: [
      { Header: "Ta Nearby76" , Text: "Ta Trichy76" },
      { Header: "Ta Some Header76" , Text: "Ta Some Text76" }]
  }
];
const Telugu = [
  { Id: 2, Name: "TeThirukkozhi - Sri Azhagiya Manavala Perumal Temple",
    Details: [
      { Header: "Te Nearby2" , Text: "Te Trichy2" },
      { Header: "Te Some Header2", Text: "Te Some Text2" }
    ]
  },
  { Id: 5, Name: 'TeThiru Anbil - Sri Vadivazhagiya Nambi Perumal Temple',
    Details: [
      { Header: "Te Nearby5" , Text: "Te Anbil" },
      { Header: "Te Some Header5", Text: "Te Some Text5" }]
  },
  { Id: 26, Name: "TeThiru Thalaicchanga Naanmathiyam - Sri Naan Madhiya Perumal Temple",
    Details: [
      { Header: "Te Nearby26" , Text: "Te Trichy26" },
      { Header: "Te Some Header26", Text: "Te Some Text26" }]
  },
  { Id: 76, Name: "TeThiruvaragunamangai - Sri Vijayaasana Perumal Temple",
    Details: [
      { Header: "Te Nearby76" , Text: "Te Trichy76" },
      { Header: "Te Some Header76" , Text: "Te Some Text76" }]
  }
];
const mtemplesMaster = core.map( x => {
  var rObj = {};
  // {Id: 2, LocalId: 2, StateId: 31, RegionId: 1, DistrictId: 1,
  //   LongLat: [78.673418 , 10.826983], SaintId: [5, 12], SongId: [667, 1762]
  // },

  rObj["Id"] = x.Id;
  rObj["LocalId"] = x.LocalId;
  rObj["StateId"] = x.StateId;
  rObj["RegionId"] = x.RegionId;
  rObj["DistrictId"] = x.DistrictId;
  rObj["IsmId"] = x.IsmId;
  rObj["SaintId"] = x.SaintId;
  rObj["SongId"] = x.SongId;
  rObj["LongLat"] = x.LongLat;
  // rObj["Name"] = Object.assign(
  //                             (English.find(itm => itm.Id === x.Id) || {Name: {English: "NA"}}).Name,
  //                             (Tamil.find(itm => itm.Id === x.Id) || {Name: {Tamil: "NA"}}).Name,
  //                             (Telugu.find(itm => itm.Id === x.Id) || {Name: {Telugu: "NA"}}).Name
  //                             );
  rObj["Name"] = {};
  rObj["Name"]["English"] = (English.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;
  rObj["Name"]["Tamil"] = (Tamil.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;
  rObj["Name"]["Telugu"] = (Telugu.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;

  // rObj["Details"] = (English.find(itm => itm.Id === x.Id) || {Details: []}).Details.concat(
  //                   (Tamil.find(itm => itm.Id === x.Id) || {Details: []}).Details,
  //                   (Telugu.find(itm => itm.Id === x.Id) || {Details: []}).Details
  //                   );
  rObj["Details"] = {};
  rObj["Details"]["English"] = (English.find(itm => itm.Id === x.Id) || {Details: []}).Details;
  rObj["Details"]["Tamil"] = (Tamil.find(itm => itm.Id === x.Id) || {Details: []}).Details;
  rObj["Details"]["Telugu"] = (Telugu.find(itm => itm.Id === x.Id) || {Details: []}).Details;

  return rObj;
});
export { mtemplesMaster };
