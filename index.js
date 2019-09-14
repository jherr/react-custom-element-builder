import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

export default (Component, options = {}) => class NewElement extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(options.attributes || {});
  }

  constructor() {
    super();

    this._reference = null;
    this.props = {};

    Object.keys(options.methods || {}).forEach(
      (methodName) => {
        NewElement.prototype[methodName] = options.methods[methodName];
      },
    );

    // Connect attributes to properties automatically
    Object.keys(options.attributes || {}).forEach((propKey) => {
      Object.defineProperty(this, propKey, {
        get: () => this.getAttribute(propKey),
        set: (value) => {
          this.setAttribute(propKey, value);
        },
      });
    });

    // Add getters and setters for properties
    Object.keys(options.properties || {}).forEach((propKey) => {
      this.props[propKey] = options.properties[propKey].default;
      Object.defineProperty(this, propKey, {
        get: () => this.props[propKey],
        set: (value) => {
          this.props[propKey] = value;
          this.render();
        },
      });
    });
  }

  get reactProps() {
    const currentProps = {
      ...this.props,
      ...(options.attributes || {}),
    };

    const attrs = this.attributes;
    for (let i = attrs.length - 1; i >= 0; i -= 1) {
      currentProps[attrs[i].name] = attrs[i].value;
    }

    return currentProps;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    retargetEvents(this.shadowRoot);
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this.shadowRoot);
  }

  render() {
    if (this.shadowRoot) {
      this._reference = ReactDOM.render(<Component {...this.reactProps} />, this.shadowRoot);
    }
  }

  attributeChangedCallback() {
    this.render();
  }
};
