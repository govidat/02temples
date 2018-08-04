
// saint_id first and ism_id next
// export var saint_ism = [
//   {id: 1, to_id: 1},
//   {id: 2, to_id: 2},
//   {id: 3, to_id: 1},
//   {id: 3, to_id: 2},
//   {id: 4, to_id: 1},
//   {id: 5, to_id: 1},
//   {id: 10, to_id: 1},
//   {id: 12, to_id: 1},
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

// ism_id first and saint_id[]  next
export var ism_saint = [
  {id: 1, to_id: [4,5,10]},
  {id: 2, to_id: [12]},
];

export var temple_saint = [
  {id: 2, to_id: [4,5]},
  {id: 5, to_id: [4]},
  {id: 26, to_id: [5]},
  {id: 76, to_id: [12]},
];
