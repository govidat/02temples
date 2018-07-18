const core = [
  {Id:4, IsmId: [1], SaintGr1Id: 1},
  {Id:5, IsmId: [1], SaintGr1Id: 1},
  {Id:10, IsmId: [1], SaintGr1Id: 1},
  {Id:12, IsmId: [2], SaintGr1Id: 2}
  ];

const English = [
  { Id: 4, Name: "EnThirumazhisai Alwar",
    Details: [
      { Header: "En BirthPlace4" , Text: "En Details BirthPlace4" },
      { Header: "En BirthStar4" ,Text: "En Details BirthStar4" }
    ]
  },
  { Id: 5, Name: "EnThirumangai Alwar",
    Details: [
      { Header: "En BirthPlace5" , Text: "En Details BirthPlace5" },
      { Header: "En BirthStar5" ,Text: "En Details BirthStar5" }
    ]
  },
  { Id: 10, Name: "EnNammalwar",
    Details: [
      { Header: "En BirthPlace10" , Text: "En Details BirthPlace10" },
      { Header: "En BirthStar10" ,Text: "En Details BirthStar10" }
    ]
  },
  { Id: 12, Name: "EnKulasekara Alwar",
    Details: [
      { Header: "En BirthPlace12" , Text: "En Details BirthPlace12" },
      { Header: "En BirthStar12" ,Text: "En Details BirthStar12" }
    ]
  }
];
const Tamil = [
  { Id: 4, Name: "TaThirumazhisai Alwar",
    Details: [
      { Header: "Ta BirthPlace4" , Text: "Ta Details BirthPlace4" },
      { Header: "Ta BirthStar4" ,Text: "Ta Details BirthStar4" }
    ]
  },
  { Id: 5, Name: "TaThirumangai Alwar",
    Details: [
      { Header: "Ta BirthPlace5" , Text: "Ta Details BirthPlace5" },
      { Header: "Ta BirthStar5" ,Text: "Ta Details BirthStar5" }
    ]
  },
  { Id: 10, Name: "TaNammalwar",
    Details: [
      { Header: "Ta BirthPlace10" , Text: "Ta Details BirthPlace10" },
      { Header: "Ta BirthStar10" ,Text: "Ta Details BirthStar10" }
    ]
  },
  { Id: 12, Name: "TaKulasekara Alwar",
    Details: [
      { Header: "Ta BirthPlace12" , Text: "Ta Details BirthPlace12" },
      { Header: "Ta BirthStar12" ,Text: "Ta Details BirthStar12" }
    ]
  }
];
const Telugu = [
  { Id: 4, Name: "TeThirumazhisai Alwar",
    Details: [
      { Header: "Te BirthPlace4" , Text: "Te Details BirthPlace4" },
      { Header: "Te BirthStar4" ,Text: "Te Details BirthStar4" }
    ]
  },
  { Id: 5, Name: "TeThirumangai Alwar",
    Details: [
      { Header: "Te BirthPlace5" , Text: "Te Details BirthPlace5" },
      { Header: "Te BirthStar5" ,Text: "Te Details BirthStar5" }
    ]
  },
  { Id: 10, Name: "TeNammalwar",
    Details: [
      { Header: "Te BirthPlace10" , Text: "Te Details BirthPlace10" },
      { Header: "Te BirthStar10" ,Text: "Te Details BirthStar10" }
    ]
  },
  { Id: 12, Name: "TeKulasekara Alwar",
    Details: [
      { Header: "Te BirthPlace12" , Text: "Te Details BirthPlace12" },
      { Header: "Te BirthStar12" ,Text: "Te Details BirthStar12" }
    ]
  }
];

const msaintsMaster = core.map( x => {
  var rObj = {};
  rObj["Id"] = x.Id;
  rObj["IsmId"] = x.IsmId;
  rObj["SaintGr1Id"] = x.SaintGr1Id;
  rObj["Name"] = {};
  rObj["Name"]["English"] = (English.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;
  rObj["Name"]["Tamil"] = (Tamil.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;
  rObj["Name"]["Telugu"] = (Telugu.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;
  rObj["Details"] = {};
  rObj["Details"]["English"] = (English.find(itm => itm.Id === x.Id) || {Details: []}).Details;
  rObj["Details"]["Tamil"] = (Tamil.find(itm => itm.Id === x.Id) || {Details: []}).Details;
  rObj["Details"]["Telugu"] = (Telugu.find(itm => itm.Id === x.Id) || {Details: []}).Details;
  return rObj;
});
export { msaintsMaster };
