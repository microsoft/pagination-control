import _ from 'underscore';
import KnockoutView from './knockout-view';
import tmpl from '../template/layout/simple.jade';
import PaginationViewModel from './pagination-view-model';

export class PaginationView extends KnockoutView {

  initialize({
    // for view model
    pageSize = 20,
    pageNumber = 0,
    itemCount = 0,
    availablePageSizes = [20, 50, 100, 200],

    viewModelDecorator = _.identity,
    template = tmpl,
  }) {
    super.initialize({
      state: {
        pageSize,
        pageNumber,
        itemCount,
        availablePageSizes,
      },
      template,
      ViewModel: PaginationViewModel,
    });

    viewModelDecorator(this.viewModel);

    this.viewModel.pageSize.subscribe(
      pageSize => this.trigger('change:page-size', pageSize)
    );
    this.viewModel.pageSize.subscribe(
      pageNumber => this.trigger('change:page-number', pageNumber)
    );
    this.viewModel.itemCount.subscribe(
      itemCount => this.trigger('change:item-count', itemCount)
    );
  }

  get pageSize() {
    return this.viewModel.pageSize();
  }

  set pageSize(pageSize) {
    this.viewModel.pageSize(pageSize);
  }

  get itemCount() {
    return this.itemCount();
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

}
