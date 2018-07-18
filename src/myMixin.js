// define a mixin objecta
export const fn_desc = {

  methods: {
    fn_tab_desc: function (itemid, main_ln, def_ln, def_desc, tab_desc) {
      // itemid, main_ln_id, default_ln_id, default desc, tab_name
      // using the Map set and get function to refer subsequently

      // var map_table = new Map();
      // // var mapY = 'this.'+ tab_name;
      // map_table.set('tab', tab_name);
      // var mapZ = map_table.get('tab');
      // alert ("Hello" +  mapZ);
      alert ("Hello from method" + JSON.stringify(tab_desc[0]))

      var y = {};
      y.desc = def_desc;
      // alert ("Itemid " + itemid + " |Main_ln :" + main_ln + " |def_ln :" + def_ln + " |def_desc :" + def_desc);

      return (
        (
        tab_desc.find(itm => (itm.id == itemid && itm.ln_id == main_ln)) ||
        tab_desc.find(itm => (itm.id == itemid && itm.ln_id == def_ln)) ||
        y
        ).desc
      )
    },

  }
}
