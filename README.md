react-custom-element-builder
============================

This helper function creates a custom element from a React class.

# Installation

To install:

```sh
yarn add react-custom-element-builder
```

# Smple use

Here is the simplest possible use:

```js
import createCustomElement from 'react-custom-element-builder';

window.customElements.define('my-element', createCustomElement(MyReactComponent));
```

# Attributes

You have to specify all the attributes you want to watch. Attributes are automatically coerced to props for the React component.

```js
window.customElements.define('my-element', createCustomElement(MyReactComponent, {
  attributes: {
    name: 'Megan',
    value: undefined,
  },
}));
```

If the browser doesn't specify an attribute for `name` then the value will be `megan`.

## Properties

You can map properties to the React component using the `properties` option:

```js
window.customElements.define('my-element', createCustomElement(MyReactComponent, {
  properties: {
    images: {
      default: [],
    },
    href: {},
  },
}));
```

This would put `images` and `href` properties on the custom element that is then accessible via JS in the client.

Assuming that you have HTML like this:

```html
<my-element id="foo">
</my-element>
```

You could have Javascript in the client like so:

```js
document.getElementById('foo').images = [...];
```

And the React component would be re-rendered with the new property value.

# Methods

Shocker, some HTML elements have methods on them, like `play` on a `video` element. It's not really the React way, but, if you want to do something like that, you can use the `methods` option.

```js
window.customElements.define('my-video', createCustomElement(MyVideoComponent, {
  methods: {
    play() {
      this.setAttribute('playing', true);
    },
  },
}));
```

The point of making custom elements is for these elements to behave as you would think a native HTML element would behave. So if a native HTML element would have some methods you should add them.

# Emitting events

Events will not pass from your React component up to the host page without adding the `composed` flag. Here is an example:

```js
this.myRef.dispatchEvent(new CustomEvent('my-click', {
  composed: true,
}));
```
