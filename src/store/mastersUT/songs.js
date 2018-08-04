
export var song = [
  {id: 667, h_path: [1, 11]},
  {id: 1762, h_path: [1, 11]},
  {id: 1736, h_path: [1, 11]},
  {id: 2417, h_path: [1, 12]},
  {id: 2784, h_path: [1, 12]},
  {id: 3571, h_path: [2, 21]}
  ];

export var song_hier = [
  {id: 1, path: [1]},
  {id: 2, path: [2]},
  {id: 11, path: [1, 11]},
  {id: 12, path: [1, 12]},
  {id: 21, path: [2, 21]}

];

export var ism_song = [
  {id: 1, to_id: [667, 1762, 1736, 2417, 2784]},
  {id: 2, to_id: [3571]}
];

export var saint_song = [
  {id: 4, to_id: [667, 1736, 2417]},
  {id: 5, to_id: [1762, 2784]},
  {id: 10, to_id: [3571]}
];

export var temple_song = [
  {id: 2, to_id: [667, 1762]},
  {id: 5, to_id: [2417]},
  {id: 26, to_id: [1736]},
  {id: 76, to_id: [3571]}
];
