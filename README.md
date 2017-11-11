# Chainer
A generic pipeline featuring value objects and command composition.

## Examples

```
console.log('hello world');
// -> 'hello world'

const valueObjectDemo = new Chainer('hello');
console.log(`${valueObjectDemo} world`);
// -> 'hello world'

new Chainer('hello world')
  .then(console.log);
// -> 'hello world'

Chainer.addCommand('world', subject => `${subject} world`);
new Chainer('hello')
  .world()
  .then(console.log);
// -> 'hello world'

Chainer.addCommand('hello', () => 'hello');
new Chainer()
  .hello()
  .world()
  .then(console.log);
// -> 'hello world'

/**
 * @note beware of () => {} in `.then()` handlers!
 * the `function` keyword is important for referencing the correct `this`
 */
new Chainer('hello', { suffix: 'world' })
  .then(function (prefix) {
    return `${prefix} ${this.suffix}`;
  })
  .then(console.log);
// -> 'hello world'
```