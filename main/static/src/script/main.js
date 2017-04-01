console.log("hello")

// $(document).ready(function() {
//     $('#example').DataTable({
//     	"ajax" : "/awsec2",
//     	"columns": [
//             { "data": "productFamily" },
//             { "data": "sku" },
//             { "data" : "attributes.location"},
//             { "data" : "attributes.instanceType"},
//             { "data" : "attributes.networkPerformance"}

//         ]
//     });
// } );

//https://willvincent.com/blog/making-vuejs-and-datatables-play-nice
Vue.component('data-table', {
  template: '<table></table>',
  props: ['users'],
  data() {
    return {
      headers: [
        { title: 'SKU' },
        { title: 'Product Family', class: 'some-special-class' },
        { title: 'Location', class: 'some-special-class' }
      ],
      rows: [] ,
      dtHandle: null
    }
  },
  watch: {
    users(val, oldVal) {
      let vm = this;
      vm.rows = [];
      // You should _probably_ check that this is changed data... but we'll skip that for this example.
      val.forEach(function (item) {
        // Fish out the specific column data for each item in your data set and push it to the appropriate place.
        // Basically we're just building a multi-dimensional array here. If the data is _already_ in the right format you could
        // skip this loop...
        let row = [];

        row.push(item.sku);
        row.push(item.productFamily);
        row.push(item.attributes.location);
        vm.rows.push(row);
      });

      // Here's the magic to keeping the DataTable in sync.
      // It must be cleared, new rows added, then redrawn!
      vm.dtHandle.clear();
      vm.dtHandle.rows.add(vm.rows);
      vm.dtHandle.draw();
    }
  },
  mounted() {
    let vm = this;
    // Instantiate the datatable and store the reference to the instance in our dtHandle element.
    vm.dtHandle = $(this.$el).DataTable({
      // Specify whatever options you want, at a minimum these:
      columns: vm.headers,
      data: vm.rows,
      searching: false,
      paging: false,
      info: false
    });
  }  
});

new Vue({
  el: '#tabledata',
  data: {
    users: [],
    search: ''
  },
  computed: {
    filteredUsers: function () {
      let self = this
      let search = self.search.toLowerCase()
      return self.users.filter(function (user) {
        return  user.sku.toLowerCase().indexOf(search) !== -1 ||
          user.productFamily.toLowerCase().indexOf(search) !== -1 ||
          user.attributes.location.toLowerCase().indexOf(search) !== -1 
      })
    }
  },
  mounted() {
    let vm = this;
    $.ajax({
      url: './awsec2',
      success(res) {
        vm.users = res.data;
      }
    });
  }
});