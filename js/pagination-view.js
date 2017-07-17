import _ from 'underscore';
import KnockoutView from './knockout-view';
import tmpl from '../template/layout/default.jade';
import PaginationViewModel from './pagination-view-model';

export class PaginationView extends KnockoutView {

  initialize({
    // for view model
    pageSize = 20,
    pageNumber = 0,
    itemCount = 0,
    availablePageSizes = [20, 50, 100, 200],
    pageSizeText = 'Page size: ',
    totalPageCountText = 'of ',
    previousPageText = 'Previous Page',
    nextPageText = 'Next Page',
    enableRandomPage = true,

    viewModelDecorator = _.identity,
    template = tmpl,
  }) {
    super.initialize({
      state: {
        pageSize,
        pageNumber,
        itemCount,
        availablePageSizes,
        enableRandomPage,
      },
      template,
      ViewModel: PaginationViewModel,
      config: {
        pageSizeText,
        totalPageCountText,
        previousPageText,
        nextPageText,
      },
    });

    viewModelDecorator(this.viewModel);

    this.viewModel.pageSize.subscribe(
      pageSize => this.trigger('change:page-size', pageSize)
    );
    this.viewModel.pageNumber.subscribe(
      pageNumber => this.trigger('change:page-number', pageNumber)
    );
    this.viewModel.itemCount.subscribe(
      itemCount => this.trigger('change:item-count', itemCount)
    );
  }

  get events() {
    return {
      sumbmit: () => false,
    };
  }

  get pageSize() {
    return this.viewModel.pageSize();
  }

  set pageSize(pageSize) {
    this.viewModel.pageSize(pageSize);
  }

  get itemCount() {
    return this.viewModel.itemCount();
  }

  set itemCount(itemCount) {
    this.viewModel.itemCount(itemCount);
  }

  get pageNumber() {
    return this.viewModel.pageNumber();
  }

  set pageNumber(pageNumber) {
    this.viewModel.pageNumber(pageNumber);
  }

  get availablePageSizes() {
    return this.viewModel.availablePageSizes();
  }

  set availablePageSizes(availablePageSizes) {
    this.viewModel.availablePageSizes(availablePageSizes);
  }

  get enableRandomPage() {
    return this.viewModel.enableRandomPage();
  }

  set enableRandomPage(enableRandomPage) {
    return this.viewModel.enableRandomPage(enableRandomPage);
  }
}
