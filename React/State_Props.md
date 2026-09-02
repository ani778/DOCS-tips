# State
State of a component is an object that holds some information that may change over the lifetime of the component.
The important point is whenever the state object changes, the component re-renders.
State is similar to props, but it is private and fully controlled by the component.

# Props
Props are inputs to components. They are single values or objects containing a set of values that are passed to components.
The primary purpose of props in React is to provide following component functionality:
- Pass custom data to your component.
- Trigger state changes.
- Use via this.props.reactProp inside component's render() method.

The default value won't be used if you pass null or 0 value. default value is only used if the prop value is missed or undefined value has been passed.

## Difference between state and props
#### State
- State is a data structure that is managed within a component. It represents information that can change over the lifetime of the component.
- state is mutable, meaning it can be changed using the setter function (setState in class components or the updater function from useState in functional components).
- Updating the state triggers a re-render of the component and its descendants.

#### Props
- Props (short for “properties”) are inputs to a component, provided by its parent component.
- Props are read-only. A component cannot modify its own props; they are immutable from the component’s perspective.
- Props are used to pass data and event handlers down the component tree, enabling parent components to configure or communicate with their children.
- Props are commonly used to make components reusable and configurable. They allow the same component to be rendered with different data or behavior.
  <img width="923" height="355" alt="image" src="https://github.com/user-attachments/assets/07a3657a-b7ae-4cce-86e2-7e02aee373d3" />
