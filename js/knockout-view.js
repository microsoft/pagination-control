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

  template() {
    return this.template;
  }

  viewModel() {
    return this.viewModel;
  }

  config() {
    return this.config;
  }

  render() {
    const template = this.template();
    const config = this.config();

    this.el.innerHTML = template(config);
    ko.applyBindings(this.viewModel(), this.el);

    return this;
  }

  remove() {
    ko.clearNode(this.el);
    super.remove();
  }

}
