import _ from 'underscore';
import ko from 'knockout';

const parseInt = Number.parseInt || window.parseInt;

function isInteger(n) {
  return n === parseInt(n, 10);
}

function isFiniteInteger(n) {
  return isFinite(n) && isInteger(n);
}

export default class {
  constructor(options) {
    const { pageNumber, pageSize, itemCount, availablePageSizes, enableRandomPage } = options;

    this.validate(options);

    // All numbers / calculations in this model are
    // base 0; so page 0 is the first page
    this.pageSize = ko.observable(pageSize);
    this.itemCount = ko.observable(itemCount);
    this.pageNumber = ko.observable(pageNumber);
    this.availablePageSizes = ko.observableArray(availablePageSizes);
    this.enableRandomPage = ko.observable(enableRandomPage);

    this.pageSizeInput = ko.computed({
      read: () => this.pageSize(),
      write: value => {
        if (isInteger(value)) {
          this.pageSize(value);
          this.pageNumberInput(this.pageNumber());
        }
      },
    });

    this.pageCount = ko.computed(() => Math.ceil(this.itemCount() / this.pageSize()));
    this.pageNumberInput = ko.computed({
      read: () => this.pageNumber(),
      write: value => {
        if (isInteger(value)) {
          this.pageNumber(Math.max(Math.min(value, this.pageCount() - 1), 0));
        }
      },
    });
    this.pageNumberText = ko.computed({
      read: () => (this.pageNumberInput() + 1).toString(),
      write: value => {
        const intValue = parseInt(value, 10) - 1;
        if (isInteger(intValue)) {
          this.pageNumberInput(intValue);
        } else {
          this.pageNumberInput.notifySubscribers();
          this.pageNumberText.notifySubscribers();
        }
      },
    });
    this.pageNumberSize = ko.computed(() => Math.floor(this.pageCount().toString().length));

    this.skip = ko.computed(() => this.pageNumber() * this.pageSize());
    this.take = ko.computed(() => this.pageSize());
    // initialize the
  }

  incPageNumber() {
    this.pageNumberInput(this.pageNumber() + 1);
  }

  decPageNumber() {
    this.pageNumberInput(this.pageNumber() - 1);
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

    if (pageNumber > 0 && pageNumber * pageSize >= itemCount) {
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
