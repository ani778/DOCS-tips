# Browser events
An event is a signal that something has happened.
Most useful DOM events:
#### Mouse events:
- `click ` - when an element is clicked
- `contextmenu` - when the right mouse button is clicked
- `mouseover / mouseout` - when the mouse pointer moves over / out of an element
- `mousedown / mouseup` - when a mouse button is pressed / released
- `mousemove` - when the mouse is moved.

#### Keyboard events:
- `keydown` and `keyup` – when a keyboard key is pressed and released.

#### Form events:
- `submit` – when the visitor submits a `<form>.`
- `focus` – when the visitor focuses on an element, e.g. on an `<input>.`

#### Document events:
- `DOMContentLoaded` – when the HTML is loaded and parsed

#### CSS events:
- `resize` – when the browser window is resized
- `scroll` – when the visitor scrolls the page
- `transitionend` – when a CSS-animation finishes.

# Event flow
Event flow refers to the order in which events are handled in the browser when a user interacts with elements on a webpage like clicking, typing, hovering.
3 phases in JavaScript’s event flow:
- Event Capturing(Top to Bottom)
- Target phase: The event reaches the target element
- Event Bubbling(Bottom to Top)

# Bubbling
**When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.**

### event.target
The most deeply nested element that caused the event is called a `target element`, accessible as `event.target.`
- `event.target` – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
- `this` – is the “current” element, the one that has a currently running handler on it.

### Stopping bubbling
The method for it is `event.stopPropagation().`

# Capturing
**In capturing, the event goes down to the element.**

- If it’s `false` (default), then the handler is set on the `bubbling phase`.
- If it’s `true`, then the handler is set on the `capturing phase`.
```js
elem.addEventListener(..., {capture: true})

// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```
## preventDefault()
The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur.
## stopPropagation 
The stopPropagation method is used to stop the event from bubbling up the event chain. 
