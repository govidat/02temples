// export var node = [
// {id: 101, d_id: 1, cat_id: 6, path: []},
// {id: 102, d_id: 2, cat_id: 6, path: []},
// {id: 105, d_id: 4, cat_id: 8, path: [500]},
// {id: 106, d_id: 5, cat_id: 8, path: [500]},
// {id: 107, d_id: 10, cat_id: 8, path: [500]},
// {id: 108, d_id: 12, cat_id: 8, path: [501]},
// {id: 109, d_id: 2, cat_id: 9, path: [504, 505]},
// {id: 110, d_id: 5, cat_id: 9, path: [504, 505]},
// {id: 111, d_id: 26, cat_id: 9, path: [504, 506]},
// {id: 112, d_id: 76, cat_id: 9, path: [504, 506]},
// {id: 103, d_id: 1, cat_id: 14, path: [103]},
// {id: 104, d_id: 2, cat_id: 14, path: [104]},
// {id: 503, d_id: 18, cat_id: 12, path: [503]},
// {id: 504, d_id: 31, cat_id: 12, path: [504]},
// {id: 507, d_id: 1, cat_id: 12, path: [503, 507]},
// {id: 505, d_id: 1, cat_id: 12, path: [504, 505]},
// {id: 506, d_id: 2, cat_id: 12, path: [504, 506]},
// {id: 508, d_id: 1, cat_id: 13, path: [508]},
// {id: 509, d_id: 2, cat_id: 13, path: [509]},
// {id: 510, d_id: 1, cat_id: 13, path: [508, 510]},
// {id: 511, d_id: 2, cat_id: 13, path: [508, 511]},
// {id: 512, d_id: 3, cat_id: 13, path: [508, 512]},
// {id: 500, d_id: 1, cat_id: 11, path: [500]},
// {id: 501, d_id: 2, cat_id: 11, path: [501]},
// {id: 502, d_id: 3, cat_id: 11, path: [502]},
//
// ];

// export var hier = [
// ];

export var node_matrix = [
{id: 101, to_id: [103,109,110,111,112,500,508,510,511]},
{id: 102, to_id: [104,108,501,512]},
{id: 103, to_id: [109,110,111,112]},
{id: 109, to_id: [105, 106]},
{id: 110, to_id: [105]},
{id: 111, to_id: [106]},
{id: 112, to_id: [108]},
];

export var song_range = [
  {id: 105, to_id: [[667,670], [1736,1739], [2417,2419]]},
  {id: 106, to_id: [[1762,1763], [2784,2784]]},
  {id: 107, to_id: [[3570,3570]]},
  {id: 108, to_id: [[3571,3571]]},
  {id: 109, to_id: [[667,670], [1762,1762]]},
  {id: 110, to_id: [[2417,2419]]},
  {id: 111, to_id: [[1736, 1750]]},
  {id: 112, to_id: [[3571, 3580]]},
  {id: 510, to_id: [[667,670]]},
  {id: 511, to_id: [[1762,1763]]},
  {id: 512, to_id: [[3571,3572]]},
]
