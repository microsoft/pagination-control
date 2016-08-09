import Backbone from 'backbone';
import ko from 'knockout';

export default class KnockoutView extends Backbone.View {

  initialize({
    template = () => '',
    ViewModel = class {},
    state = {},
    config = {},
  }) {
    this.template = template;
    this.viewModel = new ViewModel(state);
    this.config = config;
  }

  render() {
    this.el.innerHTML = this.template(this.config);
    ko.applyBindings(this.viewModel, this.el);

    return this;
  }

  remove() {
    ko.cleanNode(this.el);
    super.remove();
  }

}
