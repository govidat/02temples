export function helper_desc(state, getters, itemid, main_ln_id, def_ln_id, def_desc, tabname) {
  alert ("Hello from helper" + tabname + JSON.stringify(state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == main_ln_id))))
  var y = {};
  y.desc = def_desc;
  return (
    (
    state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == main_ln_id)) ||
    state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == def_ln_id)) ||
    y
    ).desc
  )
}
