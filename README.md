# Chainer
A generic pipeline featuring value objects and command composition.

## Examples

### Benefits of a value object
```
const valueObjectDemo = new Chainer('hello');
console.log(`${valueObjectDemo} world`);
// -> 'hello world'

new Chainer('hello world')
  .then(console.log);
// -> 'hello world'
```

### Add commands to transform subjects
```
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

### Gotchas
Beware of `() => {}` shorthand in `.then()` handlers!

The `function` keyword is important for referencing the correct `this`. 

```
new Chainer('hello', { suffix: 'world' })
  .then(function (prefix) {
    return `${prefix} ${this.suffix}`;
  })
  .then(console.log);
// -> 'hello world'
```