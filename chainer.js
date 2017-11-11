;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
    return;
  }

  if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
    return;
  }

  // Browser globals (root is window)
  root.Chainer = factory();
  return;

}(this, function () {
  function Chainer(subject, options) {
    this.subject = subject;
    this.extend(options);
  }

  Chainer.addCommand = function (name, handler) {
    Chainer.prototype[name] = function (...commandArgs) {
      return this.run(handler, ...commandArgs);
    };
  }

  Chainer.prototype = {
    valueOf: function () {
      return this.subject;
    },
    toString: function () {
      const val = this.valueOf();
      return val && val.toString();
    },
    extend: function (options) {
      Object.assign(this, options);
      return this;
    },
    then: function (callback) {
      return Promise
        .resolve(this.subject)
        .then(callback.bind(this));
    },
    run: function (method, ...methodArgs) {
      const newSubject = method.bind(this)(this.subject, ...methodArgs);
      return this.updateSubject(newSubject);
    },
    setSubject: function (newSubject) {
      if (typeof newSubject === 'function') {
        return this.run(newSubject);
      }

      return this.updateSubject(newSubject)
    },
    updateSubject: function (newSubject) {
      this.subject = newSubject !== undefined ? newSubject : this.subject;
      return this;
    }
  };

  return Chainer;
}));