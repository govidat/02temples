// export var msaintsMaster = [
//   {Id:4, IsmId: [1], SaintGr1Id: 1,  Name: { English: "EnThirumazhisai Alwar", Tamil: "TaThirumazhisai Alwar", Telugu: "TeThirumazhisai Alwar" }},
//   {Id:5, IsmId: [1], SaintGr1Id: 1, Name: { English: "EnThirumangai Alwar", Tamil: "TaThirumangai Alwar", Telugu: "TeThirumangai Alwar" }},
//   {Id:10, IsmId: [1], SaintGr1Id: 1, Name: { English: "EnNammalwar", Tamil: "TaNammalwar", Telugu: "TeNammalwar" }},
//   {Id:12, IsmId: [2], SaintGr1Id: 2, Name: { English: "EnKulasekara Alwar", Tamil: "TaKulasekara Alwar", Telugu: "TeKulasekara Alwar" }}
//   ];

// export var saint = [
//   {id: 1, p_id: 0},
//   {id: 2, p_id: 0},
//   {id: 3, p_id: 0},
//   {id: 4, p_id: 1},
//   {id: 5, p_id: 1},
//   {id: 10, p_id: 1},
//   {id: 12, p_id: 2}
//   ];

// export var saint_desc = [
//   {id: 1, ln_id: 'en', desc: 'Alwars'},
//   {id: 1, ln_id: 'ta', desc:  'ஆழ்வார்கள்'},
//   {id: 1, ln_id: 'te', desc:  'ఆల్వార్స్'},
//   {id: 2, ln_id: 'en', desc: 'Nayanmars'},
//   {id: 2, ln_id: 'ta', desc:  'நாயன்மார்கள்'},
//   {id: 2, ln_id: 'te', desc:  'నయనమార్స్'},
//   {id: 3, ln_id: 'en', desc: 'Others'},
//   {id: 3, ln_id: 'ta', desc:  'மற்ற'},
//   {id: 3, ln_id: 'te', desc:  'ఇతర'},
//   {id: 4, ln_id: 'en', desc: 'EnThirumazhisai Alwar'},
//   {id: 4, ln_id: 'ta', desc:  'TaThirumazhisai Alwar'},
//   {id: 4, ln_id: 'te', desc:  'TeThirumazhisai Alwar'},
//   {id: 5, ln_id: 'en', desc: 'EnThirumangai Alwar'},
//   {id: 5, ln_id: 'ta', desc:  'TaThirumangai Alwar'},
//   {id: 5, ln_id: 'te', desc:  'TeThirumangai Alwar'},
//   {id: 10, ln_id: 'en', desc: 'EnNammalwar'},
//   {id: 10, ln_id: 'ta', desc:  'TaNammalwar'},
//   {id: 10, ln_id: 'te', desc:  'TeNammalwar'},
//   {id: 12, ln_id: 'en', desc: 'EnSekkizhar'},
//   {id: 12, ln_id: 'ta', desc:  'TaSekkizhar'},
//   {id: 12, ln_id: 'te', desc:  'TeSekkizhar'},
//
// ];

// saint_id first and ism_id next
export var saint_ism = [
  {id: 1, to_id: 1},
  {id: 2, to_id: 2},
  {id: 3, to_id: 1},
  {id: 3, to_id: 2},
  {id: 4, to_id: 1},
  {id: 5, to_id: 1},
  {id: 10, to_id: 1},
  {id: 12, to_id: 1},
];

export var saint_ism_old = [
  {ism_id: 1, saint_id: 1},
  {ism_id: 2, saint_id: 2},
  {ism_id: 1, saint_id: 3},
  {ism_id: 2, saint_id: 3},
  {ism_id: 1, saint_id: 4},
  {ism_id: 1, saint_id: 5},
  {ism_id: 1, saint_id: 10},
  {ism_id: 2, saint_id: 12},
];


export var saint_temple = [
  {temple_id: 202, saint_id: 4},
  {temple_id: 205, saint_id: 4},
  {temple_id: 202, saint_id: 5},
  {temple_id: 226, saint_id: 5},
  {temple_id: 276, saint_id: 12}
];

// export var msaintsGr1Master = [
//   { Id: 1, Name: {English: "Alwars", Tamil: "ஆழ்வார்கள்", Telugu: "ఆల్వార్స్"}, IsmId: [1], SaintId: [4, 5, 10] },
//   { Id: 2, Name: {English: "Nayanmars", Tamil: "நாயன்மார்கள்", Telugu: "నయనమార్స్"}, IsmId: [2], SaintId: [12] },
//   { Id: 3, Name: {English: "Others", Tamil: "மற்ற", Telugu: "ఇతర"}, IsmId: [2], SaintId: [12] }
// ];

export var saint = [
  {id: 4, h_path: [1]},
  {id: 5, h_path: [1]},
  {id: 10, h_path: [1]},
  {id: 12, h_path: [2]}
  ];

export var saint_hier = [
  {id: 1, path: [1]},
  {id: 2, path: [2]},
  {id: 3, path: [3]}
];

// export var saint_hier_desc = [
//   {id: 1, ln_id: 'en', desc: 'Alwars'},
//   {id: 1, ln_id: 'ta', desc:  'ஆழ்வார்கள்'},
//   {id: 1, ln_id: 'te', desc:  'ఆల్వార్స్'},
//   {id: 2, ln_id: 'en', desc: 'Nayanmars'},
//   {id: 2, ln_id: 'ta', desc:  'நாயன்மார்கள்'},
//   {id: 2, ln_id: 'te', desc:  'నయనమార్స్'},
//   {id: 3, ln_id: 'en', desc: 'Others'},
//   {id: 3, ln_id: 'ta', desc:  'மற்ற'},
//   {id: 3, ln_id: 'te', desc:  'ఇతర'}
// ];
// ism_id first and saint_id[]  next
export var ism_saint = [
  {id: 1, to_id: [4,5,10]},
  {id: 2, to_id: [12]},
];
