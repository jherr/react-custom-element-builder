import createCustomElement from './index.js';
import ReactDOM from 'react-dom';

class HTMLElement {
  constructor() {
    this.attributes = [];
    this.testAttributes = {};
  }
  attachShadow() {
    this.shadowRoot = {};
  }
  getAttribute(name) {
    return this.testAttributes[name];
  }
  setAttribute(name, value) {
    this.testAttributes[name] = value;
  }
}
global.HTMLElement = HTMLElement;

jest.mock('react-shadow-dom-retarget-events', () => () => null);
jest.mock('react-dom');

describe('createCustomElement', () => {
  it('should exist', () => {
    const Foo = createCustomElement(() => null);
    expect(new Foo()).not.toBeNull();
  });

  it('should connect', () => {
    ReactDOM.render = jest.fn();

    const Foo = createCustomElement(() => {});
    const a = new Foo();
    a.connectedCallback();
    expect(ReactDOM.render).toBeCalled();
  });

  it('should disconnect', () => {
    ReactDOM.unmountComponentAtNode = jest.fn();

    const Foo = createCustomElement(() => {});
    const a = new Foo();
    a.disconnectedCallback();
    expect(ReactDOM.unmountComponentAtNode).toBeCalled();
  });

  it('should support attributes', () => {
    ReactDOM.render = jest.fn();

    const Foo = createCustomElement(() => {}, {
      attributes: {
        name: 'foo',
      },
    });
    const a = new Foo();
    a.attributes = [
      {
        name: 'foo',
        value: 'bar',
      }
    ];
    a.connectedCallback();
    expect(ReactDOM.render).toBeCalled();
    expect(Foo.observedAttributes).toEqual(['name']);
    a.name = 'foobaz';
    expect(a.name).toBe('foobaz');
    a.attributeChangedCallback();
  });

  it('should support methods', () => {
    ReactDOM.render = jest.fn();

    const Foo = createCustomElement(() => {}, {
      methods: {
        foo: () => {},
      },
    });
    const a = new Foo();
    a.connectedCallback();
    expect(ReactDOM.render).toBeCalled();
    expect(Foo.observedAttributes).toEqual([]);
  });

  it('should support properties', () => {
    ReactDOM.render = jest.fn();

    const Foo = createCustomElement(() => {}, {
      properties: {
        foo: {},
        zoom: {
          default: 'bar',
        },
      },
    });
    const a = new Foo();
    a.connectedCallback();
    expect(a.zoom).toBe('bar');
    a.zoom = 'zam';
    expect(a.zoom).toBe('zam');
  });
});
