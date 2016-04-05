require(['pagination-control'], function (paginationControl) {
  var PaginationView = paginationControl.PaginationView;

  new PaginationView({
    el: '.container',
    itemCount: 100,
  }).render();
});
