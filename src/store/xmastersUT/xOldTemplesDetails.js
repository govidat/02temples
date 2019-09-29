const core = [
  {Id: 2},
  {Id: 5},
  {Id: 26},
  {Id: 76}
  ];

const English = [
  { Id: 2,
    Details: [
      { Header: "En Nearby2" , Text: "En Trichy2" },
      { Header: "En Some Header2", Text: "En Some Text2" }
    ]
  },
  { Id: 5,
    Details: [
      { Header: "En Nearby5" , Text: "En Anbil" },
      { Header: "En Some Header5", Text: "En Some Text5" }]
  },
  { Id: 26,
    Details: [
      { Header: "En Nearby26" , Text: "En Trichy26" },
      { Header: "En Some Header26", Text: "En Some Text26" }]
  },
  { Id: 76,
    Details: [
      { Header: "En Nearby76" , Text: "En Trichy76" },
      { Header: "En Some Header76" , Text: "En Some Text76" }]
  }
];
const Tamil = [
  { Id: 2,
    Details: [
      { Header: "Ta Nearby2" , Text: "Ta Trichy2" },
      { Header: "Ta Some Header2", Text: "Ta Some Text2" }
    ]
  },
  { Id: 5,
    Details: [
      { Header: "Ta Nearby5" , Text: "Ta Anbil" },
      { Header: "Ta Some Header5", Text: "Ta Some Text5" }]
  },
  { Id: 26,
    Details: [
      { Header: "Ta Nearby26" , Text: "Ta Trichy26" },
      { Header: "Ta Some Header26", Text: "Ta Some Text26" }]
  },
  { Id: 76,
    Details: [
      { Header: "Ta Nearby76" , Text: "Ta Trichy76" },
      { Header: "Ta Some Header76" , Text: "Ta Some Text76" }]
  }
];
const Telugu = [
  { Id: 2,
    Details: [
      { Header: "Te Nearby2" , Text: "Te Trichy2" },
      { Header: "Te Some Header2", Text: "Te Some Text2" }
    ]
  },
  { Id: 5,
    Details: [
      { Header: "Te Nearby5" , Text: "Te Anbil" },
      { Header: "Te Some Header5", Text: "Te Some Text5" }]
  },
  { Id: 26,
    Details: [
      { Header: "Te Nearby26" , Text: "Te Trichy26" },
      { Header: "Te Some Header26", Text: "Te Some Text26" }]
  },
  { Id: 76,
    Details: [
      { Header: "Te Nearby76" , Text: "Te Trichy76" },
      { Header: "Te Some Header76" , Text: "Te Some Text76" }]
  }
];
const mtemplesDetails = core.map( x => {

  var rObj = {};

  rObj["Id"] = x.Id;

  rObj["English"] = {};
  rObj["Tamil"] = {};
  rObj["Telugu"] = {};
  rObj["English"]["Details"] = (English.find(itm => itm.Id === x.Id) || {Details: []}).Details;
  rObj["Tamil"]["Details"] = (Tamil.find(itm => itm.Id === x.Id) || {Details: []}).Details;
  rObj["Telugu"]["Details"] = (Telugu.find(itm => itm.Id === x.Id) || {Details: []}).Details;

  // for ( var lang of this.allLang ) {
  //   rObj[lang] = {};
  //   rObj[lang]["Details"] = [lang].find(itm => (itm.Id ===  x.Id) || {Details: []}).Details;
  // }


  return rObj;
});
export { mtemplesDetails };
