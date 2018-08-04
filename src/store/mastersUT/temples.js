
// export var temple_ism = [
//   {id: 18, to_id: 1},
//   {id: 18, to_id: 2},
//   {id: 31, to_id: 1},
//   {id: 31, to_id: 2},
//   {id: 101, to_id: 1},
//   {id: 102, to_id: 1},
//   {id: 103, to_id: 2},
//   {id: 202, to_id: 1},
//   {id: 205, to_id: 1},
//   {id: 226, to_id: 1},
//   {id: 276, to_id: 2}
// ];

// export var temple_ism_old = [
//   {ism_id: 1, temple_id: 18},
//   {ism_id: 2, temple_id: 18},
//   {ism_id: 1, temple_id: 31},
//   {ism_id: 2, temple_id: 31},
//   {ism_id: 1, temple_id: 101},
//   {ism_id: 1, temple_id: 102},
//   {ism_id: 2, temple_id: 103},
//   {ism_id: 1, temple_id: 202},
//   {ism_id: 1, temple_id: 205},
//   {ism_id: 1, temple_id: 226},
//   {ism_id: 2, temple_id: 276}
// ];

// export var temple_pps = [
//   {pps_id: 1, temple_id: 18},
//   {pps_id: 2, temple_id: 18},
//   {pps_id: 1, temple_id: 31},
//   {pps_id: 2, temple_id: 31},
//   {pps_id: 1, temple_id: 101},
//   {pps_id: 1, temple_id: 102},
//   {pps_id: 2, temple_id: 103},
//   {pps_id: 1, temple_id: 202},
//   {pps_id: 1, temple_id: 205},
//   {pps_id: 1, temple_id: 226},
//   {pps_id: 2, temple_id: 276}
// ];

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

export var pps_temple = [
  {id: 1, to_id: [2, 5, 26]},
  {id: 2, to_id: [76]}
];
