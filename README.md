# Chainer
A generic pipeline featuring value objects and command composition.

## Features
### It's `.then()`-able
```javascript
new Chainer('hello world')
  .then(console.log);
// -> 'hello world'
```

### It's a value object
```javascript
const valueObjectDemo = new Chainer('hello');
console.log(`${valueObjectDemo} world`);
// -> 'hello world'
```

### It's easy to add commands
```javascript
Chainer.addCommand('hello', () => 'hello');
Chainer.addCommand('world', subject => `${subject} world`);

new Chainer('hello')
  .world()
  .then(console.log);
// -> 'hello world'

new Chainer()
  .hello()
  .world()
  .then(console.log);
// -> 'hello world'
```

## Gotchas
Beware of `() => {}` shorthand in `.then()` handlers!

The `function` keyword is important for referencing the correct `this`. 

```javascript
const context = { suffix: 'world' };

new Chainer('hello', context)
  .then(function (prefix) {
    return `${prefix} ${this.suffix}`;
  })
  .then(console.log);
// -> 'hello world'
```