;(() => {

  function Chainer(subject, options) {
    this.subject = subject;
    this.extend(options);
  }

  // @todo maybe command namespacing?
  Chainer.addCommand = (name, handler) => {
    Chainer.prototype[name] = function (...commandArgs) {
      return this.run(handler, ...commandArgs);
    };
  };

  Chainer.prototype = {
    extend: function (options) {
      Object.assign(this, options);
      return this;
    },
    valueOf: function () {
      return this.subject;
    },
    toString: function () {
      const val = this.valueOf();
      return val && val.toString();
    },
    then: function (callback) {
      return Promise
        .resolve(this.subject)
        .then(callback.bind(this));
    },
    setSubject: function (newSubject) {
      if (typeof newSubject === 'function') {
        return this.run(newSubject);
      }

      return this.updateSubject(newSubject)
    },
    run: function (method, ...methodArgs) {
      const newSubject = method.bind(this)(this.subject, ...methodArgs);
      return this.updateSubject(newSubject);
    },
    updateSubject: function (newSubject) {
      this.subject = newSubject !== undefined ? newSubject : this.subject;
      return this;
    }
  };

  /**
   *
   * @examples
   *
   */

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

  debugger;

})();