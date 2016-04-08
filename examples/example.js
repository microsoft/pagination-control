require(['pagination-control'], function (paginationControl) {
  var PaginationView = paginationControl.PaginationView;

  var pager = new PaginationView({
    el: '.container',
    itemCount: 100,
  }).render();

  pager.on('change:page-size', function (pageSize) {
    console.log('page size changed to ' + pageSize);
  });

  pager.on('change:page-number', function (pageNumber) {
    console.log('page number changed to ' + pageNumber);
  });

  pager.on('change:item-count', function (itemCount) {
    console.log('item count changed to ' + itemCount);
  });
});
