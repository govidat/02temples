// export var mdistrictsMaster = [
// { Id: 1, Name: {English: 'EnTrichy', Tamil: 'TaTrichy', Telugu: 'TeTrichy'}, StateId: 31 },
// { Id: 2, Name: {English: 'EnThanjavur', Tamil: 'TaThanjavur', Telugu: 'TeThanjavur'}, StateId: 31 },
// { Id: 3, Name: {English: 'EnKannanur', Tamil: 'TaKannanur', Telugu: 'TeKannanur'}, StateId: 18 }
// ]

const core = [
  { Id: 1, StateId: 31 },
  { Id: 2, StateId: 31 },
  { Id: 3, StateId: 18 }
];
// const English = [
//   { Id: 1, Name: {English: 'EnTrichy2'} },
//   { Id: 2, Name: {English: 'EnThanjavur'} },
//   { Id: 3, Name: {English: 'EnKannanur'} }
// ];
// const Tamil = [
//   { Id: 1, Name: {Tamil: 'TaTrichy'} },
//   { Id: 2, Name: {Tamil: 'TaThanjavur'} },
//   { Id: 3, Name: {Tamil: 'TaKannanur'} }
// ];
// const Telugu = [
//   { Id: 1, Name: {Telugu: 'TeTrichy'} },
//   { Id: 2, Name: {Telugu: 'TeThanjavur'} },
//   { Id: 3, Name: {Telugu: 'TeKannanur'} }
// ];
const English = [
  { Id: 1, Name: 'EnTrichy2' },
  { Id: 2, Name: 'EnThanjavur' },
  { Id: 3, Name: 'EnKannanur' }
];
const Tamil = [
  { Id: 1, Name: 'TaTrichy' },
  { Id: 2, Name: 'TaThanjavur' },
  { Id: 3, Name: 'TaKannanur' }
];
const Telugu = [
  { Id: 1, Name: 'TeTrichy' },
  { Id: 2, Name: 'TeThanjavur' },
  { Id: 3, Name: 'TeKannanur' }
];
const mdistrictsMaster = core.map( x => {
  var rObj = {};
  rObj["Id"] = x.Id;
  rObj["StateId"] = x.StateId;
  // rObj["Name"] = Object.assign(
  //                             (English.find(itm => itm.Id === x.Id) || {Name: {English: "NA"}}).Name,
  //                             (Tamil.find(itm => itm.Id === x.Id) || {Name: {Tamil: "NA"}}).Name,
  //                             (Telugu.find(itm => itm.Id === x.Id) || {Name: {Telugu: "NA"}}).Name
  //                             );
  rObj["Name"] = {};
  rObj["Name"]["English"] = (English.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;
  rObj["Name"]["Tamil"] = (Tamil.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;
  rObj["Name"]["Telugu"] = (Telugu.find(itm => itm.Id === x.Id) || {Name: "NA"}).Name;


  return rObj;
});
export { mdistrictsMaster };
