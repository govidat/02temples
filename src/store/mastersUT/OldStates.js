// export var mstatesMaster = [
// { Id: 31, Name: {English: 'EnTamilnadu', Tamil: 'TaTamilnadu', Telugu: 'TeTamilnadu'} , DistrictId: [1, 2]},
// { Id: 18, Name: {English: 'EnKerala', Tamil: 'TaKerala', Telugu: 'TeKerala'}, DistrictId: [3] }
// ]
// import {mlanguages as languages} from '../customize.js'

const core = [
  { Id: 31, DistrictId: [1, 2] },
  { Id: 18, DistrictId: [3] }
];
// const English = [
//   { Id: 31, Name: {English: 'EnTamilnadu'} },
//   { Id: 18, Name: {English: 'EnKerala'} }
// ];
// const Tamil = [
//  { Id: 31, Name: {Tamil: 'TaTamilnadu'} },
//   { Id: 18, Name: {Tamil: 'TaKerala'} }
// ];
// const Telugu = [
//   { Id: 31, Name: {Telugu: 'TeTamilnadu'} },
//   { Id: 18, Name: {Telugu: 'TeKerala'} }
// ];

const English = [
  { Id: 31, Name: 'EnTamilnadu' },
  { Id: 18, Name: 'EnKerala' }
];
const Tamil = [
 { Id: 31, Name: 'TaTamilnadu' },
  { Id: 18, Name: 'TaKerala' }
];
const Telugu = [
  { Id: 31, Name: 'TeTamilnadu' },
  { Id: 18, Name: 'TeKerala' }
];

// const lmap = new Map([['English', English], ['Tamil', Tamil]]);

const mstatesMaster = core.map( x => {
  var rObj = {};
  rObj["Id"] = x.Id;
  rObj["DistrictId"] = x.DistrictId;

  // let z1 = languages[0].value;
  // let z2 = languages[1].value;
  // let x1 = (lmap.get(z1).find(itm => itm.Id === x.Id) || {Name: {strmap.get(z1): "NA"}}).Name
  // let x2 = (lmap.get(z2).find(itm => itm.Id === x.Id) || {Name: {Tamil: "NA"}}).Name
  // rObj["Name"] = Object.assign(
  //                             x1,
  //                             x2
  //                             );

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

export { mstatesMaster };
