import _ from 'underscore';
import ko from 'knockout';

function isFiniteInteger(n) {
  return Number.isFinite(n) && Number.isInteger(n);
}

export default class {
  constructor(options) {
    const { pageNumber, pageSize, itemCount, availablePageSizes } = options;

    this.validate(options);

    // All numbers / calculations in this model are
    // base 0; so page 0 is the first page
    _.extend(this, {
      pageNumber: ko.observable(pageNumber),
      pageSize: ko.observable(pageSize),
      itemCount: ko.observable(itemCount),
      availablePageSizes: ko.observableArray(availablePageSizes),
    });

    _.extend(this, {
      pageCount: ko.computed(() => Math.ceil(this.itemCount() / this.pageSize())),
      skip: ko.computed(() => this.pageNumber() * this.pageSize()),
      take: ko.computed(() => this.pageSize()),
    });

    _.extend(this, {
      itemFrom: ko.computed(() => this.skip() + 1),
      itemTo: ko.computed(() => Math.min(this.itemCount(), this.skip() + this.take())),
    });

    _.extend(this, {
      pageCountBefore: ko.computed(() => this.pageNumber()),
      pageCountAfter: ko.computed(() => this.pageCount() - this.pageNumber() - 1),
    });

    _.extend(this, {
      inputPageNumber: ko.computed({
        read: () => this.pageNumber() + 1,
        write: n => n > 0 && n <= this.pageCount() && this.pageNumber(n - 1),
      }),
    });
  }

  incPageNumber() {
    const pageNumber = this.pageNumber();

    if (pageNumber + 1 < this.pageCount()) {
      this.pageNumber(pageNumber + 1);
    }
  }

  decPageNumber() {
    const pageNumber = this.pageNumber();

    if (pageNumber > 0) {
      this.pageNumber(pageNumber - 1);
    }
  }

  validate({ pageNumber, pageSize, itemCount, availablePageSizes }) {
    if (!isFiniteInteger(pageNumber) || pageNumber < 0) {
      throw new Error(`invalid pageNumber ${pageNumber}`);
    }

    if (!isFiniteInteger(pageSize) || pageSize <= 0) {
      throw new Error(`invalid pageSize ${pageSize}`);
    }

    if (!isFiniteInteger(itemCount) || itemCount < 0) {
      throw new Error(`invalid itemCount ${itemCount}`);
    }

    if (pageNumber * pageSize >= itemCount) {
      throw new Error(`pageNumber ${pageNumber} out of range`);
    }

    if (!_.isArray(availablePageSizes)) {
      throw new Error(`availablePageSizes should be an array`);
    }

    _.each(availablePageSizes, size => {
      if (!isFiniteInteger(size) || size < 0) {
        throw new Error(`invalid size ${size} in availablePageSizes`);
      }
    });
  }
}
