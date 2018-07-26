require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 121);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consoleStream = exports.ConsoleStream = undefined;

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.createLogger = createLogger;

var _bunyan = __webpack_require__(103);

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bunyan-related Flow types

// ConsoleStream types and implementation.

var ConsoleStream = exports.ConsoleStream = function () {
  function ConsoleStream() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    (0, _classCallCheck3.default)(this, ConsoleStream);

    this.verbose = verbose;
    this.isCapturing = false;
    this.capturedMessages = [];
  }

  (0, _createClass3.default)(ConsoleStream, [{
    key: 'format',
    value: function format(_ref2) {
      var name = _ref2.name,
          msg = _ref2.msg,
          level = _ref2.level;

      var prefix = this.verbose ? '[' + name + '][' + _bunyan.nameFromLevel[level] + '] ' : '';
      return '' + prefix + msg + '\n';
    }
  }, {
    key: 'makeVerbose',
    value: function makeVerbose() {
      this.verbose = true;
    }
  }, {
    key: 'write',
    value: function write(packet) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$localProcess = _ref3.localProcess,
          localProcess = _ref3$localProcess === undefined ? process : _ref3$localProcess;

      var thisLevel = this.verbose ? _bunyan2.default.TRACE : _bunyan2.default.INFO;
      if (packet.level >= thisLevel) {
        var _msg = this.format(packet);
        if (this.isCapturing) {
          this.capturedMessages.push(_msg);
        } else {
          localProcess.stdout.write(_msg);
        }
      }
    }
  }, {
    key: 'startCapturing',
    value: function startCapturing() {
      this.isCapturing = true;
    }
  }, {
    key: 'stopCapturing',
    value: function stopCapturing() {
      this.isCapturing = false;
      this.capturedMessages = [];
    }
  }, {
    key: 'flushCapturedLogs',
    value: function flushCapturedLogs() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$localProcess = _ref4.localProcess,
          localProcess = _ref4$localProcess === undefined ? process : _ref4$localProcess;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.capturedMessages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _msg2 = _step.value;

          localProcess.stdout.write(_msg2);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.capturedMessages = [];
    }
  }]);
  return ConsoleStream;
}();

var consoleStream = exports.consoleStream = new ConsoleStream();

// createLogger types and implementation.

function createLogger(filename) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$createBunyanLog = _ref5.createBunyanLog,
      createBunyanLog = _ref5$createBunyanLog === undefined ? _bunyan.createLogger : _ref5$createBunyanLog;

  return createBunyanLog({
    // Strip the leading src/ from file names (which is in all file names) to
    // make the name less redundant.
    name: filename.replace(/^src\//, ''),
    // Capture all log levels and let the stream filter them.
    level: _bunyan2.default.TRACE,
    streams: [{
      type: 'raw',
      stream: consoleStream
    }]
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(126);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(127);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiExtensionsReloadError = exports.RemoteTempInstallNotSupported = exports.InvalidManifest = exports.UsageError = exports.WebExtError = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(49);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(52);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.onlyInstancesOf = onlyInstancesOf;
exports.onlyErrorsWithCode = onlyErrorsWithCode;
exports.isErrorWithCode = isErrorWithCode;

var _es6Error = __webpack_require__(106);

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Base error for all custom web-ext errors.
 */
var WebExtError = exports.WebExtError = function (_ExtendableError) {
  (0, _inherits3.default)(WebExtError, _ExtendableError);

  function WebExtError(message) {
    (0, _classCallCheck3.default)(this, WebExtError);
    return (0, _possibleConstructorReturn3.default)(this, (WebExtError.__proto__ || Object.getPrototypeOf(WebExtError)).call(this, message));
  }

  return WebExtError;
}(_es6Error2.default);

/*
 * The class for errors that can be fixed by the developer.
 */


var UsageError = exports.UsageError = function (_WebExtError) {
  (0, _inherits3.default)(UsageError, _WebExtError);

  function UsageError(message) {
    (0, _classCallCheck3.default)(this, UsageError);
    return (0, _possibleConstructorReturn3.default)(this, (UsageError.__proto__ || Object.getPrototypeOf(UsageError)).call(this, message));
  }

  return UsageError;
}(WebExtError);

/*
 * The manifest for the extension is invalid (or missing).
 */


var InvalidManifest = exports.InvalidManifest = function (_UsageError) {
  (0, _inherits3.default)(InvalidManifest, _UsageError);

  function InvalidManifest(message) {
    (0, _classCallCheck3.default)(this, InvalidManifest);
    return (0, _possibleConstructorReturn3.default)(this, (InvalidManifest.__proto__ || Object.getPrototypeOf(InvalidManifest)).call(this, message));
  }

  return InvalidManifest;
}(UsageError);

/*
 * The remote Firefox does not support temporary add-on installation.
 */


var RemoteTempInstallNotSupported = exports.RemoteTempInstallNotSupported = function (_WebExtError2) {
  (0, _inherits3.default)(RemoteTempInstallNotSupported, _WebExtError2);

  function RemoteTempInstallNotSupported(message) {
    (0, _classCallCheck3.default)(this, RemoteTempInstallNotSupported);
    return (0, _possibleConstructorReturn3.default)(this, (RemoteTempInstallNotSupported.__proto__ || Object.getPrototypeOf(RemoteTempInstallNotSupported)).call(this, message));
  }

  return RemoteTempInstallNotSupported;
}(WebExtError);

/*
 * The errors collected when reloading all extensions at once
 * (initialized from a map of errors by extensionSourceDir string).
 */


var MultiExtensionsReloadError = exports.MultiExtensionsReloadError = function (_WebExtError3) {
  (0, _inherits3.default)(MultiExtensionsReloadError, _WebExtError3);

  function MultiExtensionsReloadError(errorsMap) {
    (0, _classCallCheck3.default)(this, MultiExtensionsReloadError);

    var errors = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = errorsMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
            sourceDir = _step$value[0],
            error = _step$value[1];

        var msg = String(error);
        errors += '\nError on extension loaded from ' + sourceDir + ': ' + msg + '\n';
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var message = 'Reload errors: ' + errors;

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (MultiExtensionsReloadError.__proto__ || Object.getPrototypeOf(MultiExtensionsReloadError)).call(this, message));

    _this5.errorsBySourceDir = errorsMap;
    return _this5;
  }

  return MultiExtensionsReloadError;
}(WebExtError);

/*
 * Sugar-y way to catch only instances of a certain error.
 *
 * Usage:
 *
 *  Promise.reject(SyntaxError)
 *    .catch(onlyInstancesOf(SyntaxError, (error) => {
 *      // error is guaranteed to be an instance of SyntaxError
 *    }))
 *
 * All other errors will be re-thrown.
 *
 */


function onlyInstancesOf(predicate, errorHandler) {
  return function (error) {
    if (error instanceof predicate) {
      return errorHandler(error);
    } else {
      throw error;
    }
  };
}

/*
 * Sugar-y way to catch only errors having certain code(s).
 *
 * Usage:
 *
 *  Promise.resolve()
 *    .catch(onlyErrorsWithCode('ENOENT', (error) => {
 *      // error.code is guaranteed to be ENOENT
 *    }))
 *
 *  or:
 *
 *  Promise.resolve()
 *    .catch(onlyErrorsWithCode(['ENOENT', 'ENOTDIR'], (error) => {
 *      // ...
 *    }))
 *
 * All other errors will be re-thrown.
 *
 */
function onlyErrorsWithCode(codeWanted, errorHandler) {
  return function (error) {
    var throwError = true;

    if (Array.isArray(codeWanted)) {
      if (codeWanted.indexOf(error.code) !== -1 || codeWanted.indexOf(error.errno) !== -1) {
        throwError = false;
      }
    } else if (error.code === codeWanted || error.errno === codeWanted) {
      throwError = false;
    }

    if (throwError) {
      throw error;
    }

    return errorHandler(error);
  };
}

function isErrorWithCode(codeWanted, error) {
  if (Array.isArray(codeWanted) && codeWanted.indexOf(error.code) !== -1) {
    return true;
  } else if (error.code === codeWanted) {
    return true;
  }

  return false;
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mocha");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("sinon");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(182);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mz");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename, __dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeStdin = exports.FakeExtensionRunner = exports.basicManifest = exports.ErrorWithCode = exports.TCPConnectError = exports.StubChildProcess = exports.ZipFile = undefined;

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = __webpack_require__(50);

var _typeof3 = _interopRequireDefault(_typeof2);

var _possibleConstructorReturn2 = __webpack_require__(49);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(52);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.fixturePath = fixturePath;
exports.makeSureItFails = makeSureItFails;
exports.fake = fake;
exports.createFakeProcess = createFakeProcess;
exports.fakeFirefoxClient = fakeFirefoxClient;
exports.getFakeFirefox = getFakeFirefox;
exports.getFakeRemoteFirefox = getFakeRemoteFirefox;

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _events = __webpack_require__(41);

var _events2 = _interopRequireDefault(_events);

var _tty = __webpack_require__(80);

var _tty2 = _interopRequireDefault(_tty);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _yauzl = __webpack_require__(186);

var _yauzl2 = _interopRequireDefault(_yauzl);

var _es6Error = __webpack_require__(106);

var _es6Error2 = _interopRequireDefault(_es6Error);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _logger = __webpack_require__(0);

var _firefox = __webpack_require__(42);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(27);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

/*
 * A way to read zip files using promises for all the things.
 */

var ZipFile = exports.ZipFile = function () {
  function ZipFile() {
    (0, _classCallCheck3.default)(this, ZipFile);

    this._zip = null;
    this._close = null;
  }

  /*
   * Open a zip file and return a promise that resolves to a yauzl
   * zipfile object.
   */


  (0, _createClass3.default)(ZipFile, [{
    key: 'open',
    value: function open() {
      var _this = this;

      return (0, _es6Promisify2.default)(_yauzl2.default.open).apply(undefined, arguments).then(function (zip) {
        _this._zip = zip;
        _this._close = new Promise(function (resolve) {
          zip.once('close', resolve);
        });
      });
    }

    /**
     * Close the zip file and wait fd to release.
     */

  }, {
    key: 'close',
    value: function close() {
      this._zip.close();
      return this._close;
    }

    /*
     * After open(), readEach(onRead) will return a promise that resolves
     * when all entries have been read.
     *
     * The onRead callback receives a single argument, a yauzl Entry object.
     */

  }, {
    key: 'readEach',
    value: function readEach(onRead) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {

        if (!_this2._zip) {
          throw new Error('Cannot operate on a falsey zip file. Call open() first.');
        }

        _this2._zip.on('entry', function (entry) {
          onRead(entry);
        });

        _this2._zip.once('error', function (error) {
          reject(error);
        });

        _this2._zip.once('end', function () {
          resolve();
        });
      });
    }

    /*
     * Resolve a promise with an array of all file names in the zip archive.
     */

  }, {
    key: 'extractFilenames',
    value: function extractFilenames() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var fileNames = [];
        _this3.readEach(function (entry) {
          fileNames.push(entry.fileName);
        }).then(function () {
          resolve(fileNames);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);
  return ZipFile;
}();

/*
 * Returns a path to a test fixture file. Invoke it the same as path.join().
 */


function fixturePath() {
  for (var _len = arguments.length, pathParts = Array(_len), _key = 0; _key < _len; _key++) {
    pathParts[_key] = arguments[_key];
  }

  return _path2.default.join.apply(_path2.default, [__dirname, '..', 'fixtures'].concat(pathParts));
}

/*
 * Test helper to make sure a promise chain really fails.
 *
 * Usage:
 *
 *  Promise.reject(new Error('some error'))
 *    .then(makeSureItFails(), (error) => {
 *      // Safely make assertions about the error...
 *    });
 */
function makeSureItFails() {
  return function () {
    throw new Error('This test unexpectedly succeeded without an error');
  };
}

/*
 * Return a fake version of an object for testing.
 *
 * The fake object will contain stub implementations of
 * all original methods. Each method will be wrapped in
 * a sinon.spy() for inspection.
 *
 * You can optionally provide implementations for one or
 * more methods.
 *
 * Unlike similar sinon helpers, this *does not* touch the
 * original object so there is no need to tear down any
 * patches afterwards.
 *
 * Usage:
 *
 * let fakeProcess = fake(process, {
 *   cwd: () => '/some/directory',
 * });
 *
 * // Use the object in real code:
 * fakeProcess.cwd();
 *
 * // Make assertions about methods that
 * // were on the original object:
 * assert.equal(fakeProcess.exit.called, true);
 *
 */

// $FLOW_IGNORE: fake can return any kind of object and fake a defined set of methods for testing.
function fake(original) {
  var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var skipProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var stub = {};

  // Provide stubs for all original members:
  var props = [];
  var obj = original;
  while (obj) {
    props = props.concat(Object.getOwnPropertyNames(obj));
    obj = Object.getPrototypeOf(obj);
  }

  var proto = Object.getPrototypeOf(original);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var key = _step.value;

      if (skipProperties.indexOf(key) >= 0 || !original.hasOwnProperty(key) && !proto.hasOwnProperty(key)) {
        return 'continue';
      }
      var definition = original[key] || proto[key];
      if (typeof definition === 'function') {
        stub[key] = function () {
          log.warn('Running stubbed function ' + key + ' (default implementation)');
        };
      }
    };

    for (var _iterator = props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ret = _loop();

      if (_ret === 'continue') continue;
    }

    // Provide custom implementations, if necessary.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  Object.keys(methods).forEach(function (key) {
    if (!original[key]) {
      throw new Error('Cannot define method "' + key + '"; it does not exist on the original');
    }
    stub[key] = methods[key];
  });

  // Wrap all implementations in spies.
  Object.keys(stub).forEach(function (key) {
    stub[key] = _sinon2.default.spy(stub[key]);
  });

  // $FLOW_IGNORE: fake can return any kind of object for testing.
  return stub;
}

function createFakeProcess() {
  return fake(process, {}, ['EventEmitter', 'stdin']);
}

var StubChildProcess = exports.StubChildProcess = function (_EventEmitter) {
  (0, _inherits3.default)(StubChildProcess, _EventEmitter);

  function StubChildProcess() {
    var _ref;

    var _temp, _this4, _ret2;

    (0, _classCallCheck3.default)(this, StubChildProcess);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp = (_this4 = (0, _possibleConstructorReturn3.default)(this, (_ref = StubChildProcess.__proto__ || Object.getPrototypeOf(StubChildProcess)).call.apply(_ref, [this].concat(args))), _this4), _this4.stderr = new _events2.default(), _this4.stdout = new _events2.default(), _this4.kill = _sinon2.default.spy(function () {}), _temp), (0, _possibleConstructorReturn3.default)(_this4, _ret2);
  }

  return StubChildProcess;
}(_events2.default);

/*
 * Returns a fake Firefox client as would be returned by
 * connect() of 'node-firefox-connect'
 */

function fakeFirefoxClient() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$requestResult = _ref2.requestResult,
      requestResult = _ref2$requestResult === undefined ? {} : _ref2$requestResult,
      requestError = _ref2.requestError,
      _ref2$makeRequestResu = _ref2.makeRequestResult,
      makeRequestResult = _ref2$makeRequestResu === undefined ? {} : _ref2$makeRequestResu,
      makeRequestError = _ref2.makeRequestError;

  return {
    disconnect: _sinon2.default.spy(function () {}),
    request: _sinon2.default.spy(function (request, callback) {
      return callback(requestError, requestResult);
    }),
    // This is client.client, the actual underlying connection.
    client: {
      on: function on() {},
      makeRequest: _sinon2.default.spy(function (request, callback) {
        //
        // The real function returns a response object that you
        // use like this:
        // if (response.error) {
        //   ...
        // } else {
        //   response.something; // ...
        // }
        //
        if (makeRequestError) {
          var error = void 0;
          if ((typeof makeRequestError === 'undefined' ? 'undefined' : (0, _typeof3.default)(makeRequestError)) === 'object') {
            error = makeRequestError;
          } else {
            error = { error: makeRequestError };
          }
          callback(error);
        } else {
          callback(makeRequestResult);
        }
      })
    }
  };
}

/*
 * A simulated TCP connection error.
 *
 * By default, the error code will be ECONNREFUSED.
 */

var TCPConnectError = exports.TCPConnectError = function (_ExtendableError) {
  (0, _inherits3.default)(TCPConnectError, _ExtendableError);

  function TCPConnectError() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'simulated connection error';
    (0, _classCallCheck3.default)(this, TCPConnectError);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (TCPConnectError.__proto__ || Object.getPrototypeOf(TCPConnectError)).call(this, msg));

    _this5.code = 'ECONNREFUSED';
    return _this5;
  }

  return TCPConnectError;
}(_es6Error2.default);

var ErrorWithCode = exports.ErrorWithCode = function (_Error) {
  (0, _inherits3.default)(ErrorWithCode, _Error);

  function ErrorWithCode(code, message) {
    (0, _classCallCheck3.default)(this, ErrorWithCode);

    var _this6 = (0, _possibleConstructorReturn3.default)(this, (ErrorWithCode.__proto__ || Object.getPrototypeOf(ErrorWithCode)).call(this, (code || '') + ': ' + (message || 'pretend this is a system error')));

    _this6.code = code || 'SOME_CODE';
    return _this6;
  }

  return ErrorWithCode;
}(Error);

/*
 * A basic manifest fixture using in unit tests.
 */


var basicManifest = exports.basicManifest = {
  name: 'the extension',
  version: '0.0.1',
  applications: {
    gecko: {
      id: 'basic-manifest@web-ext-test-suite'
    }
  }
};

/*
 * A class that implements an empty IExtensionRunner interface.
 */

var FakeExtensionRunner = exports.FakeExtensionRunner = function () {
  function FakeExtensionRunner(params) {
    (0, _classCallCheck3.default)(this, FakeExtensionRunner);

    this.params = params;
  }

  (0, _createClass3.default)(FakeExtensionRunner, [{
    key: 'getName',
    value: function getName() {
      return 'Fake Extension Runner';
    }
  }, {
    key: 'run',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref3.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'exit',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function exit() {
        return _ref4.apply(this, arguments);
      }

      return exit;
    }()
  }, {
    key: 'reloadAllExtensions',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', []);

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reloadAllExtensions() {
        return _ref5.apply(this, arguments);
      }

      return reloadAllExtensions;
    }()
  }, {
    key: 'reloadExtensionBySourceDir',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(sourceDir) {
        var runnerName;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                runnerName = this.getName();
                return _context4.abrupt('return', [{ runnerName: runnerName, sourceDir: sourceDir }]);

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function reloadExtensionBySourceDir(_x5) {
        return _ref6.apply(this, arguments);
      }

      return reloadExtensionBySourceDir;
    }()
  }, {
    key: 'registerCleanup',
    value: function registerCleanup(fn) {} // eslint-disable-line no-unused-vars

  }]);
  return FakeExtensionRunner;
}();

function getFakeFirefox() {
  var implementations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6005;

  var profile = {}; // empty object just to avoid errors.
  var firefox = function firefox() {
    return Promise.resolve();
  };
  var allImplementations = (0, _extends3.default)({
    createProfile: function createProfile() {
      return Promise.resolve(profile);
    },
    copyProfile: function copyProfile() {
      return Promise.resolve(profile);
    },
    useProfile: function useProfile() {
      return Promise.resolve(profile);
    },
    installExtension: function installExtension() {
      return Promise.resolve();
    },
    run: function run() {
      return Promise.resolve({ firefox: firefox, debuggerPort: port });
    }
  }, implementations);
  return fake(defaultFirefoxApp, allImplementations);
}

function getFakeRemoteFirefox() {
  var implementations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return fake(_remote.RemoteFirefox.prototype, implementations);
}

var FakeStdin = exports.FakeStdin = function (_tty$ReadStream) {
  (0, _inherits3.default)(FakeStdin, _tty$ReadStream);

  function FakeStdin() {
    (0, _classCallCheck3.default)(this, FakeStdin);

    // $FLOW_FIXME: flow doesn't yet recognize 0 as a valid parameter of tty.ReadStream.
    return (0, _possibleConstructorReturn3.default)(this, (FakeStdin.__proto__ || Object.getPrototypeOf(FakeStdin)).call(this, 0));
  }

  return FakeStdin;
}(_tty2.default.ReadStream);
/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/helpers.js", "tests/unit"))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(68)('wks');
var uid = __webpack_require__(45);
var Symbol = __webpack_require__(12).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function extend(prototype, properties) {
  return Object.create(prototype, getOwnPropertyDescriptors(properties));
}

function getOwnPropertyDescriptors(object) {
  var names = Object.getOwnPropertyNames(object);

  return names.reduce(function(descriptor, name) {
    descriptor[name] = Object.getOwnPropertyDescriptor(object, name);
    return descriptor;
  }, {});
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TempDir = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.withTempDir = withTempDir;

var _tmp = __webpack_require__(181);

var _tmp2 = _interopRequireDefault(_tmp);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);


/*
 * Work with a self-destructing temporary directory in a promise chain.
 *
 * The directory will be destroyed when the promise chain is finished
 * (whether there was an error or not).
 *
 * Usage:
 *
 * withTempDir(
 *   (tmpDir) =>
 *     doSomething(tmpDir.path())
 *     .then(...)
 * );
 *
 */
function withTempDir(makePromise) {
  var tmpDir = new TempDir();
  return tmpDir.create().then(function () {
    return makePromise(tmpDir);
  }).catch(tmpDir.errorHandler()).then(tmpDir.successHandler());
}

/*
 * Work with a self-destructing temporary directory object.
 *
 * It is safer to use withTempDir() instead but if you know
 * what you're doing you can use it directly like:
 *
 * let tmpDir = new TempDir();
 * tmpDir.create()
 *   .then(() => {
 *     // work with tmpDir.path()
 *   })
 *   .catch(tmpDir.errorHandler())
 *   .then(tmpDir.successHandler());
 *
 */

var TempDir = exports.TempDir = function () {
  function TempDir() {
    (0, _classCallCheck3.default)(this, TempDir);

    this._path = undefined;
    this._removeTempDir = undefined;
  }

  /*
   * Returns a promise that is fulfilled when the temp directory has
   * been created.
   */


  (0, _createClass3.default)(TempDir, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var createTempDir = (0, _es6Promisify2.default)(_tmp2.default.dir, { multiArgs: true });
      return createTempDir({
        prefix: 'tmp-web-ext-',
        // This allows us to remove a non-empty tmp dir.
        unsafeCleanup: true
      }).then(function (args) {
        var _args = (0, _slicedToArray3.default)(args, 2),
            tmpPath = _args[0],
            removeTempDir = _args[1];

        _this._path = tmpPath;
        _this._removeTempDir = removeTempDir;
        log.debug('Created temporary directory: ' + _this.path());
        return _this;
      });
    }

    /*
     * Get the absolute path of the temp directory.
     */

  }, {
    key: 'path',
    value: function path() {
      if (!this._path) {
        throw new Error('You cannot access path() before calling create()');
      }
      return this._path;
    }

    /*
     * Returns a callback that will catch an error, remove
     * the temporary directory, and throw the error.
     *
     * This is intended for use in a promise like
     * Promise().catch(tmp.errorHandler())
     */

  }, {
    key: 'errorHandler',
    value: function errorHandler() {
      var _this2 = this;

      return function (error) {
        _this2.remove();
        throw error;
      };
    }

    /*
     * Returns a callback that will remove the temporary direcotry.
     *
     * This is intended for use in a promise like
     * Promise().then(tmp.successHandler())
     */

  }, {
    key: 'successHandler',
    value: function successHandler() {
      var _this3 = this;

      return function (promiseResult) {
        _this3.remove();
        return promiseResult;
      };
    }

    /*
     * Remove the temp directory.
     */

  }, {
    key: 'remove',
    value: function remove() {
      if (!this._removeTempDir) {
        return;
      }
      log.debug('Removing temporary directory: ' + this.path());
      this._removeTempDir && this._removeTempDir();
    }
  }]);
  return TempDir;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/temp-dir.js"))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var events = __webpack_require__(41),
    extend = __webpack_require__(14);

// to be instantiated later - to avoid circular dep resolution
var JSObject;

var ClientMethods = extend(events.EventEmitter.prototype, {
  /**
   * Intialize this client object.
   *
   * @param  {object} client
   *         Client to send requests on.
   * @param  {string} actor
   *         Actor id to set as 'from' field on requests
   */
  initialize: function(client, actor) {
    this.client = client;
    this.actor = actor;

    this.client.on('message', function(message) {
      if (message.from == this.actor) {
        this.emit(message.type, message);
      }
    }.bind(this));
  },

  /**
   * Make request to our actor on the server.
   *
   * @param  {string}   type
   *         Method name of the request
   * @param  {object}   message
   *         Optional extra properties (arguments to method)
   * @param  {Function}   transform
   *         Optional tranform for response object. Takes response object
   *         and returns object to send on.
   * @param  {Function} callback
   *         Callback to call with (maybe transformed) response
   */
  request: function(type, message, transform, callback) {
    if (typeof message == "function") {
      if (typeof transform == "function") {
        // (type, trans, cb)
        callback = transform;
        transform = message;
      }
      else {
        // (type, cb)
        callback = message;
      }
      message = {};
    }
    else if (!callback) {
      if (!message) {
        // (type)
        message = {};
      }
      // (type, message, cb)
      callback = transform;
      transform = null;
    }

    message.to = this.actor;
    message.type = type;

    this.client.makeRequest(message, function(resp) {
      delete resp.from;

      if (resp.error) {
        var err = new Error(resp.message);
        err.name = resp.error;

        callback(err);
        return;
      }

      if (transform) {
        resp = transform(resp);
      }

      if (callback) {
        callback(null, resp);
      }
    });
  },

  /*
   * Transform obj response into a JSObject
   */
  createJSObject: function(obj) {
    if (obj == null) {
      return;
    }
    if (!JSObject) {
      // circular dependencies
      JSObject = __webpack_require__(109);
    }
    if (obj.type == "object") {
      return new JSObject(this.client, obj);
    }
    return obj;
  },

  /**
   * Create function that plucks out only one value from an object.
   * Used as the transform function for some responses.
   */
  pluck: function(prop) {
    return function(obj) {
      return obj[prop];
    }
  }
})

module.exports = ClientMethods;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(102);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var core = __webpack_require__(11);
var ctx = __webpack_require__(28);
var hide = __webpack_require__(24);
var has = __webpack_require__(25);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(22);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(20);
var IE8_DOM_DEFINE = __webpack_require__(89);
var toPrimitive = __webpack_require__(64);
var dP = Object.defineProperty;

exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(37)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var createDesc = __webpack_require__(38);
module.exports = __webpack_require__(23) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(155);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(158);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectWithMaxRetries = exports.connect = exports.RemoteFirefox = exports.REMOTE_PORT = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var connect = exports.connect = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : REMOTE_PORT;

    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$connectToFirefo = _ref4.connectToFirefox,
        connectToFirefox = _ref4$connectToFirefo === undefined ? _nodeFirefoxConnect2.default : _ref4$connectToFirefo;

    var client;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            log.debug('Connecting to Firefox on port ' + port);
            _context3.next = 3;
            return connectToFirefox(port);

          case 3:
            client = _context3.sent;

            log.debug('Connected to the remote Firefox debugger on port ' + port);
            return _context3.abrupt('return', new RemoteFirefox(client));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function connect() {
    return _ref3.apply(this, arguments);
  };
}();

// ConnectWithMaxRetries types and implementation

var connectWithMaxRetries = exports.connectWithMaxRetries = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(
  // A max of 250 will try connecting for 30 seconds.
  _ref6) {
    var _ref6$maxRetries = _ref6.maxRetries,
        maxRetries = _ref6$maxRetries === undefined ? 250 : _ref6$maxRetries,
        _ref6$retryInterval = _ref6.retryInterval,
        retryInterval = _ref6$retryInterval === undefined ? 120 : _ref6$retryInterval,
        port = _ref6.port;

    var establishConnection = function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var lastError, retries;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                retries = 0;

              case 1:
                if (!(retries <= maxRetries)) {
                  _context4.next = 22;
                  break;
                }

                _context4.prev = 2;
                _context4.next = 5;
                return connectToFirefox(port);

              case 5:
                return _context4.abrupt('return', _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](2);

                if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context4.t0)) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 13;
                return new Promise(function (resolve) {
                  setTimeout(resolve, retryInterval);
                });

              case 13:

                lastError = _context4.t0;
                log.debug('Retrying Firefox (' + retries + '); connection error: ' + _context4.t0);
                _context4.next = 19;
                break;

              case 17:
                log.error(_context4.t0.stack);
                throw _context4.t0;

              case 19:
                retries++;
                _context4.next = 1;
                break;

              case 22:

                log.debug('Connect to Firefox debugger: too many retries');
                throw lastError;

              case 24:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 8]]);
      }));

      return function establishConnection() {
        return _ref8.apply(this, arguments);
      };
    }();

    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref7$connectToFirefo = _ref7.connectToFirefox,
        connectToFirefox = _ref7$connectToFirefo === undefined ? connect : _ref7$connectToFirefo;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:

            log.debug('Connecting to the remote Firefox debugger');
            return _context5.abrupt('return', establishConnection());

          case 2:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function connectWithMaxRetries(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var _nodeFirefoxConnect = __webpack_require__(188);

var _nodeFirefoxConnect2 = _interopRequireDefault(_nodeFirefoxConnect);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// RemoteFirefox types and implementation
var log = (0, _logger.createLogger)(__filename);

// The default port that Firefox's remote debugger will listen on and the
// client will connect to.

var REMOTE_PORT = exports.REMOTE_PORT = 6005;

// NOTE: this type aliases Object to catch any other possible response.

var RemoteFirefox = exports.RemoteFirefox = function () {
  function RemoteFirefox(client) {
    (0, _classCallCheck3.default)(this, RemoteFirefox);

    this.client = client;
    this.checkedForAddonReloading = false;

    client.client.on('disconnect', function () {
      log.debug('Received "disconnect" from Firefox client');
    });
    client.client.on('end', function () {
      log.debug('Received "end" from Firefox client');
    });
    client.client.on('message', function (info) {
      // These are arbitrary messages that the client library ignores.
      log.debug('Received message from client: ' + JSON.stringify(info));
    });
  }

  (0, _createClass3.default)(RemoteFirefox, [{
    key: 'disconnect',
    value: function disconnect() {
      this.client.disconnect();
    }
  }, {
    key: 'addonRequest',
    value: function addonRequest(addon, request) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.client.client.makeRequest({ to: addon.actor, type: request }, function (response) {
          if (response.error) {
            var _error = response.error + ': ' + response.message;
            log.debug('Client responded to \'' + request + '\' request with error:', _error);
            reject(new _errors.WebExtError(_error));
          } else {
            resolve(response);
          }
        });
      });
    }
  }, {
    key: 'installTemporaryAddon',
    value: function installTemporaryAddon(addonPath) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.client.request('listTabs', function (error, tabsResponse) {
          if (error) {
            return reject(new _errors.WebExtError('Remote Firefox: listTabs() error: ' + error));
          }
          if (!tabsResponse.addonsActor) {
            log.debug('listTabs returned a falsey addonsActor: ' + ('' + tabsResponse.addonsActor));
            return reject(new _errors.RemoteTempInstallNotSupported('This is an older version of Firefox that does not provide an ' + 'add-ons actor for remote installation. Try Firefox 49 or ' + 'higher.'));
          }

          _this2.client.client.makeRequest({
            to: tabsResponse.addonsActor,
            type: 'installTemporaryAddon',
            addonPath: addonPath
          }, function (installResponse) {
            if (installResponse.error) {
              return reject(new _errors.WebExtError('installTemporaryAddon: Error: ' + (installResponse.error + ': ' + installResponse.message)));
            }
            log.debug('installTemporaryAddon: ' + JSON.stringify(installResponse));
            log.info('Installed ' + addonPath + ' as a temporary add-on');
            resolve(installResponse);
          });
        });
      });
    }
  }, {
    key: 'getInstalledAddon',
    value: function getInstalledAddon(addonId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.client.request('listAddons', function (error, response) {
          if (error) {
            reject(new _errors.WebExtError('Remote Firefox: listAddons() error: ' + error));
          } else {
            resolve(response.addons);
          }
        });
      }).then(function (addons) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = addons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _addon = _step.value;

            if (_addon.id === addonId) {
              return _addon;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        log.debug('Remote Firefox has these addons: ' + addons.map(function (a) {
          return a.id;
        }));
        throw new _errors.WebExtError('The remote Firefox does not have your extension installed');
      });
    }
  }, {
    key: 'checkForAddonReloading',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(addon) {
        var response, supportedRequestTypes;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.checkedForAddonReloading) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', addon);

              case 4:
                _context.next = 6;
                return this.addonRequest(addon, 'requestTypes');

              case 6:
                response = _context.sent;

                if (!(response.requestTypes.indexOf('reload') === -1)) {
                  _context.next = 13;
                  break;
                }

                supportedRequestTypes = JSON.stringify(response.requestTypes);

                log.debug('Remote Firefox only supports: ' + supportedRequestTypes);
                throw new _errors.UsageError('This Firefox version does not support add-on reloading. ' + 'Re-run with --no-reload');

              case 13:
                this.checkedForAddonReloading = true;
                return _context.abrupt('return', addon);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkForAddonReloading(_x) {
        return _ref.apply(this, arguments);
      }

      return checkForAddonReloading;
    }()
  }, {
    key: 'reloadAddon',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(addonId) {
        var addon;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getInstalledAddon(addonId);

              case 2:
                addon = _context2.sent;
                _context2.next = 5;
                return this.checkForAddonReloading(addon);

              case 5:
                _context2.next = 7;
                return this.addonRequest(addon, 'reload');

              case 7:
                process.stdout.write('\rLast extension reload: ' + new Date().toTimeString());
                log.debug('\n');

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reloadAddon(_x2) {
        return _ref2.apply(this, arguments);
      }

      return reloadAddon;
    }()
  }]);
  return RemoteFirefox;
}();

// Connect types and implementation
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/remote.js"))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(43);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(92);
var defined = __webpack_require__(62);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPackageCreator = exports.getDefaultLocalizedName = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getDefaultLocalizedName = exports.getDefaultLocalizedName = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var messageFile = _ref2.messageFile,
        manifestData = _ref2.manifestData;
    var messageData, messageContents, extensionName;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            messageData = void 0;
            messageContents = void 0;
            extensionName = manifestData.name;
            _context.prev = 3;
            _context.next = 6;
            return _mz.fs.readFile(messageFile);

          case 6:
            messageContents = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            throw new _errors.UsageError('Error reading messages.json file at ' + messageFile + ': ' + _context.t0);

          case 12:
            _context.prev = 12;

            messageData = (0, _parseJson2.default)(String(messageContents), messageFile);
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t1 = _context['catch'](12);
            throw new _errors.UsageError('Error parsing messages.json ' + _context.t1);

          case 19:

            extensionName = manifestData.name.replace(/__MSG_([A-Za-z0-9@_]+?)__/g, function (match, messageName) {
              if (!(messageData[messageName] && messageData[messageName].message)) {
                var error = new _errors.UsageError('The locale file ' + messageFile + ' ' + ('is missing key: ' + messageName));
                throw error;
              } else {
                return messageData[messageName].message;
              }
            });
            return _context.abrupt('return', Promise.resolve(extensionName));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9], [12, 16]]);
  }));

  return function getDefaultLocalizedName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var defaultPackageCreator = exports.defaultPackageCreator = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
    var manifestData = _ref4.manifestData,
        sourceDir = _ref4.sourceDir,
        fileFilter = _ref4.fileFilter,
        artifactsDir = _ref4.artifactsDir,
        overwriteDest = _ref4.overwriteDest,
        showReadyMessage = _ref4.showReadyMessage;

    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref5$eventToPromise = _ref5.eventToPromise,
        eventToPromise = _ref5$eventToPromise === undefined ? _eventToPromise2.default : _ref5$eventToPromise;

    var id, buffer, extensionName, _messageFile, packageName, extensionPath, stream;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = void 0;

            if (!manifestData) {
              _context2.next = 6;
              break;
            }

            id = (0, _manifest.getManifestId)(manifestData);
            log.debug('Using manifest id=' + (id || '[not specified]'));
            _context2.next = 9;
            break;

          case 6:
            _context2.next = 8;
            return (0, _manifest2.default)(sourceDir);

          case 8:
            manifestData = _context2.sent;

          case 9:
            _context2.next = 11;
            return (0, _zipDir.zipDir)(sourceDir, {
              filter: function filter() {
                return fileFilter.wantFile.apply(fileFilter, arguments);
              }
            });

          case 11:
            buffer = _context2.sent;
            extensionName = manifestData.name;

            if (!manifestData.default_locale) {
              _context2.next = 19;
              break;
            }

            _messageFile = _path2.default.join(sourceDir, '_locales', manifestData.default_locale, 'messages.json');

            log.debug('Manifest declared default_locale, localizing extension name');
            _context2.next = 18;
            return getDefaultLocalizedName({
              messageFile: _messageFile, manifestData: manifestData
            });

          case 18:
            extensionName = _context2.sent;

          case 19:
            packageName = safeFileName(extensionName + '-' + manifestData.version + '.zip');
            extensionPath = _path2.default.join(artifactsDir, packageName);

            // Added 'wx' flags to avoid overwriting of existing package.

            stream = (0, _fs.createWriteStream)(extensionPath, { flags: 'wx' });


            stream.write(buffer, function () {
              return stream.end();
            });

            _context2.prev = 23;
            _context2.next = 26;
            return eventToPromise(stream, 'close');

          case 26:
            _context2.next = 39;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2['catch'](23);

            if ((0, _errors.isErrorWithCode)('EEXIST', _context2.t0)) {
              _context2.next = 32;
              break;
            }

            throw _context2.t0;

          case 32:
            if (overwriteDest) {
              _context2.next = 34;
              break;
            }

            throw new _errors.UsageError('Extension exists at the destination path: ' + extensionPath + '\n' + 'Use --overwrite-dest to enable overwriting.');

          case 34:
            log.info('Destination exists, overwriting: ' + extensionPath);
            stream = (0, _fs.createWriteStream)(extensionPath);
            stream.write(buffer, function () {
              return stream.end();
            });
            _context2.next = 39;
            return eventToPromise(stream, 'close');

          case 39:

            if (showReadyMessage) {
              log.info('Your web extension is ready: ' + extensionPath);
            }
            return _context2.abrupt('return', { extensionPath: extensionPath });

          case 41:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[23, 28]]);
  }));

  return function defaultPackageCreator(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Build command types and implementation.

exports.safeFileName = safeFileName;

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(48);

var _mz = __webpack_require__(9);

var _parseJson = __webpack_require__(101);

var _parseJson2 = _interopRequireDefault(_parseJson);

var _eventToPromise = __webpack_require__(74);

var _eventToPromise2 = _interopRequireDefault(_eventToPromise);

var _watcher = __webpack_require__(75);

var _watcher2 = _interopRequireDefault(_watcher);

var _zipDir = __webpack_require__(152);

var _manifest = __webpack_require__(33);

var _manifest2 = _interopRequireDefault(_manifest);

var _artifacts = __webpack_require__(79);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(3);

var _fileFilter = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types.
var log = (0, _logger.createLogger)(__filename);

function safeFileName(name) {
  return name.toLowerCase().replace(/[^a-z0-9.-]+/g, '_');
}

// defaultPackageCreator types and implementation.

// This defines the _locales/messages.json type. See:
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Internationalization#Providing_localized_strings_in__locales

exports.default = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
    var sourceDir = _ref7.sourceDir,
        artifactsDir = _ref7.artifactsDir,
        _ref7$asNeeded = _ref7.asNeeded,
        asNeeded = _ref7$asNeeded === undefined ? false : _ref7$asNeeded,
        _ref7$overwriteDest = _ref7.overwriteDest,
        overwriteDest = _ref7$overwriteDest === undefined ? false : _ref7$overwriteDest,
        _ref7$ignoreFiles = _ref7.ignoreFiles,
        ignoreFiles = _ref7$ignoreFiles === undefined ? [] : _ref7$ignoreFiles;

    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        manifestData = _ref8.manifestData,
        _ref8$createFileFilte = _ref8.createFileFilter,
        createFileFilter = _ref8$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref8$createFileFilte,
        _ref8$fileFilter = _ref8.fileFilter,
        fileFilter = _ref8$fileFilter === undefined ? createFileFilter({
      sourceDir: sourceDir,
      artifactsDir: artifactsDir,
      ignoreFiles: ignoreFiles
    }) : _ref8$fileFilter,
        _ref8$onSourceChange = _ref8.onSourceChange,
        onSourceChange = _ref8$onSourceChange === undefined ? _watcher2.default : _ref8$onSourceChange,
        _ref8$packageCreator = _ref8.packageCreator,
        packageCreator = _ref8$packageCreator === undefined ? defaultPackageCreator : _ref8$packageCreator,
        _ref8$showReadyMessag = _ref8.showReadyMessage,
        showReadyMessage = _ref8$showReadyMessag === undefined ? true : _ref8$showReadyMessag;

    var rebuildAsNeeded, createPackage, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rebuildAsNeeded = asNeeded; // alias for `build --as-needed`

            log.info('Building web extension from ' + sourceDir);

            createPackage = function createPackage() {
              return packageCreator({
                manifestData: manifestData,
                sourceDir: sourceDir,
                fileFilter: fileFilter,
                artifactsDir: artifactsDir,
                overwriteDest: overwriteDest,
                showReadyMessage: showReadyMessage
              });
            };

            _context3.next = 5;
            return (0, _artifacts.prepareArtifactsDir)(artifactsDir);

          case 5:
            _context3.next = 7;
            return createPackage();

          case 7:
            result = _context3.sent;


            if (rebuildAsNeeded) {
              log.info('Rebuilding when files change...');
              onSourceChange({
                sourceDir: sourceDir,
                artifactsDir: artifactsDir,
                onChange: function onChange() {
                  return createPackage().catch(function (error) {
                    log.error(error.stack);
                    throw error;
                  });
                },
                shouldWatchFile: function shouldWatchFile() {
                  return fileFilter.wantFile.apply(fileFilter, arguments);
                }
              });
            }

            return _context3.abrupt('return', result);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function build(_x4) {
    return _ref6.apply(this, arguments);
  }

  return build;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/build.js"))

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("es6-promisify");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.getManifestId = getManifestId;

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(9);

var _parseJson = __webpack_require__(101);

var _parseJson2 = _interopRequireDefault(_parseJson);

var _stripJsonComments = __webpack_require__(154);

var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

var _errors = __webpack_require__(3);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// getValidatedManifest helper types and implementation

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sourceDir) {
    var manifestFile, manifestContents, manifestData, errors;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manifestFile = _path2.default.join(sourceDir, 'manifest.json');

            log.debug('Validating manifest at ' + manifestFile);

            manifestContents = void 0;
            _context.prev = 3;
            _context.next = 6;
            return _mz.fs.readFile(manifestFile);

          case 6:
            manifestContents = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            throw new _errors.InvalidManifest('Could not read manifest.json file at ' + manifestFile + ': ' + _context.t0);

          case 12:
            manifestData = void 0;
            _context.prev = 13;

            manifestData = (0, _parseJson2.default)((0, _stripJsonComments2.default)(manifestContents.toString()), manifestFile);
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context['catch'](13);
            throw new _errors.InvalidManifest('Error parsing manifest.json at ' + manifestFile + ': ' + _context.t1);

          case 20:
            errors = [];
            // This is just some basic validation of what web-ext needs, not
            // what Firefox will need to run the extension.
            // TODO: integrate with the addons-linter for actual validation.

            if (!manifestData.name) {
              errors.push('missing "name" property');
            }
            if (!manifestData.version) {
              errors.push('missing "version" property');
            }

            if (manifestData.applications && !manifestData.applications.gecko) {
              // Since the applications property only applies to gecko, make
              // sure 'gecko' exists when 'applications' is defined. This should
              // make introspection of gecko properties easier.
              errors.push('missing "applications.gecko" property');
            }

            if (!errors.length) {
              _context.next = 26;
              break;
            }

            throw new _errors.InvalidManifest('Manifest at ' + manifestFile + ' is invalid: ' + errors.join('; '));

          case 26:
            return _context.abrupt('return', manifestData);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9], [13, 17]]);
  }));

  function getValidatedManifest(_x) {
    return _ref.apply(this, arguments);
  }

  return getValidatedManifest;
}();

function getManifestId(manifestData) {
  return manifestData.applications ? manifestData.applications.gecko.id : undefined;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/manifest.js"))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// This module exports entry points for all supported commands. For performance
// reasons (faster start-up), the implementations are not statically imported
// at the top of the file, but lazily loaded in the (exported) functions.
// The latter would slow down start-up by several seconds, as seen in #1302 .

var build = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(params, options) {
    var _require, runCommand;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
            _require = __webpack_require__(31), runCommand = _require.default;
            return _context.abrupt('return', runCommand(params, options));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function build(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var lint = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params, options) {
    var _require2, runCommand;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
            _require2 = __webpack_require__(56), runCommand = _require2.default;
            return _context2.abrupt('return', runCommand(params, options));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function lint(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var run = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(params, options) {
    var _require3, runCommand;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
            _require3 = __webpack_require__(57), runCommand = _require3.default;
            return _context3.abrupt('return', runCommand(params, options));

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function run(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var sign = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(params, options) {
    var _require4, runCommand;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
            _require4 = __webpack_require__(59), runCommand = _require4.default;
            return _context4.abrupt('return', runCommand(params, options));

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function sign(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var docs = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(params, options) {
    var _require5, runCommand;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
            _require5 = __webpack_require__(55), runCommand = _require5.default;
            return _context5.abrupt('return', runCommand(params, options));

          case 2:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function docs(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { build: build, lint: lint, run: run, sign: sign, docs: docs };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(129)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(88)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFileFilter = exports.FileFilter = exports.isSubPath = undefined;

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _multimatch = __webpack_require__(180);

var _multimatch2 = _interopRequireDefault(_multimatch);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// check if target is a sub directory of src

var isSubPath = exports.isSubPath = function isSubPath(src, target) {
  var relate = _path2.default.relative(src, target);
  // same dir
  if (!relate) {
    return false;
  }
  if (relate === '..') {
    return false;
  }
  return !relate.startsWith('..' + _path2.default.sep);
};

// FileFilter types and implementation.

/*
 * Allows or ignores files.
 */
var FileFilter = exports.FileFilter = function () {
  function FileFilter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$baseIgnoredPatte = _ref.baseIgnoredPatterns,
        baseIgnoredPatterns = _ref$baseIgnoredPatte === undefined ? ['**/*.xpi', '**/*.zip', '**/.*', // any hidden file and folder
    '**/.*/**/*', // and the content inside hidden folder
    '**/node_modules', '**/node_modules/**/*'] : _ref$baseIgnoredPatte,
        _ref$ignoreFiles = _ref.ignoreFiles,
        ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
        sourceDir = _ref.sourceDir,
        artifactsDir = _ref.artifactsDir;

    (0, _classCallCheck3.default)(this, FileFilter);

    sourceDir = _path2.default.resolve(sourceDir);

    this.filesToIgnore = [];
    this.sourceDir = sourceDir;

    this.addToIgnoreList(baseIgnoredPatterns);
    if (ignoreFiles) {
      this.addToIgnoreList(ignoreFiles);
    }
    if (artifactsDir && isSubPath(sourceDir, artifactsDir)) {
      artifactsDir = _path2.default.resolve(artifactsDir);
      log.debug('Ignoring artifacts directory "' + artifactsDir + '" ' + 'and all its subdirectories');
      this.addToIgnoreList([artifactsDir, _path2.default.join(artifactsDir, '**', '*')]);
    }
  }

  /**
   *  Resolve relative path to absolute path with sourceDir.
   */


  (0, _createClass3.default)(FileFilter, [{
    key: 'resolveWithSourceDir',
    value: function resolveWithSourceDir(file) {
      var resolvedPath = _path2.default.resolve(this.sourceDir, file);
      log.debug('Resolved path ' + file + ' with sourceDir ' + this.sourceDir + ' ' + ('to ' + resolvedPath));
      return resolvedPath;
    }

    /**
     *  Insert more files into filesToIgnore array.
     */

  }, {
    key: 'addToIgnoreList',
    value: function addToIgnoreList(files) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          if (file.charAt(0) === '!') {
            var resolvedFile = this.resolveWithSourceDir(file.substr(1));
            this.filesToIgnore.push('!' + resolvedFile);
          } else {
            this.filesToIgnore.push(this.resolveWithSourceDir(file));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /*
     * Returns true if the file is wanted.
     *
     * If filePath does not start with a slash, it will be treated as a path
     * relative to sourceDir when matching it against all configured
     * ignore-patterns.
     *
     * Example: this is called by zipdir as wantFile(filePath) for each
     * file in the folder that is being archived.
     */

  }, {
    key: 'wantFile',
    value: function wantFile(filePath) {
      var resolvedPath = this.resolveWithSourceDir(filePath);
      var matches = (0, _multimatch2.default)(resolvedPath, this.filesToIgnore);
      if (matches.length > 0) {
        log.debug('FileFilter: ignoring file ' + resolvedPath);
        return false;
      }
      return true;
    }
  }]);
  return FileFilter;
}();

// a helper function to make mocking easier

var createFileFilter = exports.createFileFilter = function createFileFilter(params) {
  return new FileFilter(params);
};
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/file-filter.js"))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installExtension = exports.copyProfile = exports.createProfile = exports.useProfile = exports.isDefaultProfile = exports.run = exports.defaultRemotePortFinder = exports.defaultFirefoxEnv = undefined;

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var defaultRemotePortFinder = exports.defaultRemotePortFinder = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$portToTry = _ref2.portToTry,
        portToTry = _ref2$portToTry === undefined ? _remote.REMOTE_PORT : _ref2$portToTry,
        _ref2$retriesLeft = _ref2.retriesLeft,
        retriesLeft = _ref2$retriesLeft === undefined ? 10 : _ref2$retriesLeft,
        _ref2$connectToFirefo = _ref2.connectToFirefox,
        connectToFirefox = _ref2$connectToFirefo === undefined ? _remote.connect : _ref2$connectToFirefo;

    var client;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log.debug('Checking if remote Firefox port ' + portToTry + ' is available');

            client = void 0;

          case 2:
            if (!(retriesLeft >= 0)) {
              _context.next = 20;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return connectToFirefox(portToTry);

          case 6:
            client = _context.sent;

            log.debug('Remote Firefox port ' + portToTry + ' is in use ' + ('(retries remaining: ' + retriesLeft + ')'));
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](3);

            if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context.t0)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return', portToTry);

          case 14:
            throw _context.t0;

          case 15:

            client.disconnect();
            portToTry++;
            retriesLeft--;
            _context.next = 2;
            break;

          case 20:
            throw new _errors.WebExtError('Too many retries on port search');

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 10]]);
  }));

  return function defaultRemotePortFinder() {
    return _ref.apply(this, arguments);
  };
}();

// Declare the needed 'fx-runner' module flow types.

// Run command types and implementaion.

/*
 * Runs Firefox with the given profile object and resolves a promise on exit.
 */
var run = exports.run = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(profile) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$fxRunner = _ref4.fxRunner,
        fxRunner = _ref4$fxRunner === undefined ? _fxRunner2.default : _ref4$fxRunner,
        _ref4$findRemotePort = _ref4.findRemotePort,
        findRemotePort = _ref4$findRemotePort === undefined ? defaultRemotePortFinder : _ref4$findRemotePort,
        firefoxBinary = _ref4.firefoxBinary,
        binaryArgs = _ref4.binaryArgs;

    var remotePort, results, firefox;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            log.debug('Running Firefox with profile at ' + profile.path());

            _context2.next = 3;
            return findRemotePort();

          case 3:
            remotePort = _context2.sent;
            _context2.next = 6;
            return fxRunner({
              // if this is falsey, fxRunner tries to find the default one.
              'binary': firefoxBinary,
              'binary-args': binaryArgs,
              // This ensures a new instance of Firefox is created. It has nothing
              // to do with the devtools remote debugger.
              'no-remote': true,
              'listen': remotePort,
              'foreground': true,
              'profile': profile.path(),
              'env': (0, _extends3.default)({}, process.env, defaultFirefoxEnv),
              'verbose': true
            });

          case 6:
            results = _context2.sent;
            firefox = results.process;


            log.debug('Executing Firefox binary: ' + results.binary);
            log.debug('Firefox args: ' + results.args.join(' '));

            firefox.on('error', function (error) {
              // TODO: show a nice error when it can't find Firefox.
              // if (/No such file/.test(err) || err.code === 'ENOENT') {
              log.error('Firefox error: ' + error);
              throw error;
            });

            log.info('Use --verbose or open Tools > Web Developer > Browser Console ' + 'to see logging');

            firefox.stderr.on('data', function (data) {
              log.debug('Firefox stderr: ' + data.toString().trim());
            });

            firefox.stdout.on('data', function (data) {
              log.debug('Firefox stdout: ' + data.toString().trim());
            });

            firefox.on('close', function () {
              log.debug('Firefox closed');
            });

            return _context2.abrupt('return', { firefox: firefox, debuggerPort: remotePort });

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function run(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// isDefaultProfile types and implementation.

/*
 * Tests if a profile is a default Firefox profile (both as a profile name or
 * profile path).
 *
 * Returns a promise that resolves to true if the profile is one of default Firefox profile.
 */
var isDefaultProfile = exports.isDefaultProfile = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(profilePathOrName) {
    var ProfileFinder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _firefoxProfile2.default.Finder;
    var fsStat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _mz.fs.stat;

    var baseProfileDir, profilesIniPath, finder, readProfiles, normalizedProfileDirPath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _profile, profileFullPath;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!DEFAULT_PROFILES_NAMES.includes(profilePathOrName)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', true);

          case 2:
            baseProfileDir = ProfileFinder.locateUserDirectory();
            profilesIniPath = _path2.default.join(baseProfileDir, 'profiles.ini');
            _context3.prev = 4;
            _context3.next = 7;
            return fsStat(profilesIniPath);

          case 7:
            _context3.next = 15;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](4);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context3.t0)) {
              _context3.next = 14;
              break;
            }

            log.debug('profiles.ini not found: ' + _context3.t0);

            // No profiles exist yet, default to false (the default profile name contains a
            // random generated component).
            return _context3.abrupt('return', false);

          case 14:
            throw _context3.t0;

          case 15:

            // Check for profile dir path.
            finder = new ProfileFinder(baseProfileDir);
            readProfiles = (0, _es6Promisify2.default)(finder.readProfiles, finder);
            _context3.next = 19;
            return readProfiles();

          case 19:
            normalizedProfileDirPath = _path2.default.normalize(_path2.default.join(_path2.default.resolve(profilePathOrName), _path2.default.sep));
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 23;
            _iterator = finder.profiles[Symbol.iterator]();

          case 25:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 37;
              break;
            }

            _profile = _step.value;

            if (!(DEFAULT_PROFILES_NAMES.includes(_profile.Name) || _profile.Default === '1')) {
              _context3.next = 34;
              break;
            }

            profileFullPath = void 0;

            // Check for profile name.

            if (!(_profile.Name === profilePathOrName)) {
              _context3.next = 31;
              break;
            }

            return _context3.abrupt('return', true);

          case 31:

            // Check for profile path.
            if (_profile.IsRelative === '1') {
              profileFullPath = _path2.default.join(baseProfileDir, _profile.Path, _path2.default.sep);
            } else {
              profileFullPath = _path2.default.join(_profile.Path, _path2.default.sep);
            }

            if (!(_path2.default.normalize(profileFullPath) === normalizedProfileDirPath)) {
              _context3.next = 34;
              break;
            }

            return _context3.abrupt('return', true);

          case 34:
            _iteratorNormalCompletion = true;
            _context3.next = 25;
            break;

          case 37:
            _context3.next = 43;
            break;

          case 39:
            _context3.prev = 39;
            _context3.t1 = _context3['catch'](23);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 43:
            _context3.prev = 43;
            _context3.prev = 44;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 46:
            _context3.prev = 46;

            if (!_didIteratorError) {
              _context3.next = 49;
              break;
            }

            throw _iteratorError;

          case 49:
            return _context3.finish(46);

          case 50:
            return _context3.finish(43);

          case 51:
            return _context3.abrupt('return', false);

          case 52:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[4, 9], [23, 39, 43, 51], [44,, 46, 50]]);
  }));

  return function isDefaultProfile(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

// configureProfile types and implementation.

// Use the target path as a Firefox profile without cloning it

var useProfile = exports.useProfile = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(profilePath) {
    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        app = _ref8.app,
        _ref8$configureThisPr = _ref8.configureThisProfile,
        configureThisProfile = _ref8$configureThisPr === undefined ? configureProfile : _ref8$configureThisPr,
        _ref8$isFirefoxDefaul = _ref8.isFirefoxDefaultProfile,
        isFirefoxDefaultProfile = _ref8$isFirefoxDefaul === undefined ? isDefaultProfile : _ref8$isFirefoxDefaul,
        _ref8$customPrefs = _ref8.customPrefs,
        customPrefs = _ref8$customPrefs === undefined ? {} : _ref8$customPrefs;

    var isForbiddenProfile, profile;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return isFirefoxDefaultProfile(profilePath);

          case 2:
            isForbiddenProfile = _context4.sent;

            if (!isForbiddenProfile) {
              _context4.next = 5;
              break;
            }

            throw new _errors.UsageError('Cannot use --keep-profile-changes on a default profile' + (' ("' + profilePath + '")') + ' because web-ext will make it insecure and unsuitable for daily use.' + '\nSee https://github.com/mozilla/web-ext/issues/1005');

          case 5:
            profile = new _firefoxProfile2.default({ destinationDirectory: profilePath });
            _context4.next = 8;
            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });

          case 8:
            return _context4.abrupt('return', _context4.sent);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function useProfile(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

// createProfile types and implementation.

/*
 * Creates a new temporary profile and resolves with the profile object.
 *
 * The profile will be deleted when the system process exits.
 */
var createProfile = exports.createProfile = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        app = _ref10.app,
        _ref10$configureThisP = _ref10.configureThisProfile,
        configureThisProfile = _ref10$configureThisP === undefined ? configureProfile : _ref10$configureThisP,
        _ref10$customPrefs = _ref10.customPrefs,
        customPrefs = _ref10$customPrefs === undefined ? {} : _ref10$customPrefs;

    var profile;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            profile = new _firefoxProfile2.default();
            _context5.next = 3;
            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });

          case 3:
            return _context5.abrupt('return', _context5.sent);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function createProfile() {
    return _ref9.apply(this, arguments);
  };
}();

// copyProfile types and implementation.

/*
 * Copies an existing Firefox profile and creates a new temporary profile.
 * The new profile will be configured with some preferences required to
 * activate extension development.
 *
 * It resolves with the new profile object.
 *
 * The temporary profile will be deleted when the system process exits.
 *
 * The existing profile can be specified as a directory path or a name of
 * one that exists in the current user's Firefox directory.
 */
var copyProfile = exports.copyProfile = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(profileDirectory) {
    var _ref12 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        app = _ref12.app,
        _ref12$configureThisP = _ref12.configureThisProfile,
        configureThisProfile = _ref12$configureThisP === undefined ? configureProfile : _ref12$configureThisP,
        _ref12$copyFromUserPr = _ref12.copyFromUserProfile,
        copyFromUserProfile = _ref12$copyFromUserPr === undefined ? _firefoxProfile.copyFromUserProfile : _ref12$copyFromUserPr,
        _ref12$customPrefs = _ref12.customPrefs,
        customPrefs = _ref12$customPrefs === undefined ? {} : _ref12$customPrefs;

    var copy, copyByName, dirExists, _profile2;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            copy = (0, _es6Promisify2.default)(_firefoxProfile2.default.copy);
            copyByName = (0, _es6Promisify2.default)(copyFromUserProfile);
            _context6.prev = 2;
            _context6.next = 5;
            return (0, _isDirectory2.default)(profileDirectory);

          case 5:
            dirExists = _context6.sent;
            _profile2 = void 0;

            if (!dirExists) {
              _context6.next = 14;
              break;
            }

            log.debug('Copying profile directory from "' + profileDirectory + '"');
            _context6.next = 11;
            return copy({ profileDirectory: profileDirectory });

          case 11:
            _profile2 = _context6.sent;
            _context6.next = 18;
            break;

          case 14:
            log.debug('Assuming ' + profileDirectory + ' is a named profile');
            _context6.next = 17;
            return copyByName({ name: profileDirectory });

          case 17:
            _profile2 = _context6.sent;

          case 18:
            return _context6.abrupt('return', configureThisProfile(_profile2, { app: app, customPrefs: customPrefs }));

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6['catch'](2);
            throw new _errors.WebExtError('Could not copy Firefox profile from ' + profileDirectory + ': ' + _context6.t0);

          case 24:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[2, 21]]);
  }));

  return function copyProfile(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

// installExtension types and implementation.

/*
 * Installs an extension into the given Firefox profile object.
 * Resolves when complete.
 *
 * The extension is copied into a special location and you need to turn
 * on some preferences to allow this. See extensions.autoDisableScopes in
 * ./preferences.js.
 *
 * When asProxy is true, a special proxy file will be installed. This is a
 * text file that contains the path to the extension source.
 */
var installExtension = exports.installExtension = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref14) {
    var _ref14$asProxy = _ref14.asProxy,
        asProxy = _ref14$asProxy === undefined ? false : _ref14$asProxy,
        manifestData = _ref14.manifestData,
        profile = _ref14.profile,
        extensionPath = _ref14.extensionPath;

    var id, isDir, destPath, writeStream, readStream, _destPath, _writeStream;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (profile.extensionsDir) {
              _context7.next = 2;
              break;
            }

            throw new _errors.WebExtError('profile.extensionsDir was unexpectedly empty');

          case 2:
            _context7.prev = 2;
            _context7.next = 5;
            return _mz.fs.stat(profile.extensionsDir);

          case 5:
            _context7.next = 16;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7['catch'](2);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context7.t0)) {
              _context7.next = 15;
              break;
            }

            log.debug('Creating extensions directory: ' + profile.extensionsDir);
            _context7.next = 13;
            return _mz.fs.mkdir(profile.extensionsDir);

          case 13:
            _context7.next = 16;
            break;

          case 15:
            throw _context7.t0;

          case 16:
            id = (0, _manifest.getManifestId)(manifestData);

            if (id) {
              _context7.next = 19;
              break;
            }

            throw new _errors.UsageError('An explicit extension ID is required when installing to ' + 'a profile (applications.gecko.id not found in manifest.json)');

          case 19:
            if (!asProxy) {
              _context7.next = 35;
              break;
            }

            log.debug('Installing as an extension proxy; source: ' + extensionPath);

            _context7.next = 23;
            return (0, _isDirectory2.default)(extensionPath);

          case 23:
            isDir = _context7.sent;

            if (isDir) {
              _context7.next = 26;
              break;
            }

            throw new _errors.WebExtError('proxy install: extensionPath must be the extension source ' + ('directory; got: ' + extensionPath));

          case 26:

            // Write a special extension proxy file containing the source
            // directory. See:
            // https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Firefox_extension_proxy_file
            destPath = _path2.default.join(profile.extensionsDir, '' + id);
            writeStream = _fs2.default.createWriteStream(destPath);

            writeStream.write(extensionPath);
            writeStream.end();
            _context7.next = 32;
            return (0, _eventToPromise2.default)(writeStream, 'close');

          case 32:
            return _context7.abrupt('return', _context7.sent);

          case 35:
            // Write the XPI file to the profile.
            readStream = _fs2.default.createReadStream(extensionPath);
            _destPath = _path2.default.join(profile.extensionsDir, id + '.xpi');
            _writeStream = _fs2.default.createWriteStream(_destPath);


            log.debug('Installing extension from ' + extensionPath + ' to ' + _destPath);
            readStream.pipe(_writeStream);

            _context7.next = 42;
            return Promise.all([(0, _eventToPromise2.default)(readStream, 'close'), (0, _eventToPromise2.default)(_writeStream, 'close')]);

          case 42:
            return _context7.abrupt('return', _context7.sent);

          case 43:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[2, 7]]);
  }));

  return function installExtension(_x13) {
    return _ref13.apply(this, arguments);
  };
}();

exports.configureProfile = configureProfile;

var _fs = __webpack_require__(48);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _fxRunner = __webpack_require__(187);

var _fxRunner2 = _interopRequireDefault(_fxRunner);

var _firefoxProfile = __webpack_require__(107);

var _firefoxProfile2 = _interopRequireDefault(_firefoxProfile);

var _mz = __webpack_require__(9);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _eventToPromise = __webpack_require__(74);

var _eventToPromise2 = _interopRequireDefault(_eventToPromise);

var _isDirectory = __webpack_require__(108);

var _isDirectory2 = _interopRequireDefault(_isDirectory);

var _errors = __webpack_require__(3);

var _preferences = __webpack_require__(81);

var _manifest = __webpack_require__(33);

var _logger = __webpack_require__(0);

var _remote = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types
var log = (0, _logger.createLogger)(__filename);
var defaultFirefoxEnv = exports.defaultFirefoxEnv = {
  XPCOM_DEBUG_BREAK: 'stack',
  NS_TRACE_MALLOC_DISABLE_STACKS: '1'
};

// defaultRemotePortFinder types and implementation.

var DEFAULT_PROFILES_NAMES = ['default', 'dev-edition-default'];

/*
 * Configures a profile with common preferences that are required to
 * activate extension development.
 *
 * Returns a promise that resolves with the original profile object.
 */
function configureProfile(profile) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$app = _ref6.app,
      app = _ref6$app === undefined ? 'firefox' : _ref6$app,
      _ref6$getPrefs = _ref6.getPrefs,
      getPrefs = _ref6$getPrefs === undefined ? _preferences.getPrefs : _ref6$getPrefs,
      _ref6$customPrefs = _ref6.customPrefs,
      customPrefs = _ref6$customPrefs === undefined ? {} : _ref6$customPrefs;

  // Set default preferences. Some of these are required for the add-on to
  // operate, such as disabling signatures.
  var prefs = getPrefs(app);
  Object.keys(prefs).forEach(function (pref) {
    profile.setPreference(pref, prefs[pref]);
  });
  if (Object.keys(customPrefs).length > 0) {
    var customPrefsStr = JSON.stringify(customPrefs, null, 2);
    log.info('Setting custom Firefox preferences: ' + customPrefsStr);
    Object.keys(customPrefs).forEach(function (custom) {
      profile.setPreference(custom, customPrefs[custom]);
    });
  }
  profile.updatePreferences();
  return Promise.resolve(profile);
}

// useProfile types and implementation.
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/index.js"))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(91);
var enumBugKeys = __webpack_require__(69);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(21).f;
var has = __webpack_require__(25);
var TAG = __webpack_require__(13)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
var global = __webpack_require__(12);
var hide = __webpack_require__(24);
var Iterators = __webpack_require__(29);
var TO_STRING_TAG = __webpack_require__(13)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(50);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(161);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(163);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(172);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(176);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(50);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manifestWithoutApps = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _deepcopy = __webpack_require__(54);

var _deepcopy2 = _interopRequireDefault(_deepcopy);

var _mz = __webpack_require__(9);

var _errors = __webpack_require__(3);

var _manifest = __webpack_require__(33);

var _manifest2 = _interopRequireDefault(_manifest);

var _tempDir = __webpack_require__(16);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manifestWithoutApps = exports.manifestWithoutApps = (0, _deepcopy2.default)(_helpers.basicManifest);

delete manifestWithoutApps.applications;

(0, _mocha.describe)('util/manifest', function () {

  (0, _mocha.describe)('getValidatedManifest', function () {

    (0, _mocha.it)('returns a valid manifest', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        return writeManifest(tmpDir.path(), _helpers.basicManifest).then(function () {
          return (0, _manifest2.default)(tmpDir.path());
        }).then(function (manifestData) {
          _chai.assert.deepEqual(manifestData, _helpers.basicManifest);
        });
      });
    });

    (0, _mocha.it)('allows manifests without an applications property', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        return writeManifest(tmpDir.path(), manifestWithoutApps).then(function () {
          return (0, _manifest2.default)(tmpDir.path());
        }).then(function (manifestData) {
          _chai.assert.deepEqual(manifestData, manifestWithoutApps);
        });
      });
    });

    (0, _mocha.it)('reports an error for a missing manifest file', function () {
      var nonExistentDir = _path2.default.join('dev', 'null', 'nowhere');
      return (0, _manifest2.default)(nonExistentDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
        _chai.assert.match(error.message, /Could not read manifest\.json/);
        // Make sure the filename is included in the exception message.
        // This is actually done by default in file system error messages.
        _chai.assert.include(error.message, nonExistentDir);
      }));
    });

    (0, _mocha.it)('reports an error for invalid manifest JSON', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var badManifest = '{\n          "name": "I\'m an invalid JSON Manifest\n          "version": "0.0.0"\n        }';
        var manifestFile = _path2.default.join(tmpDir.path(), 'manifest.json');
        return _mz.fs.writeFile(manifestFile, badManifest).then(function () {
          return (0, _manifest2.default)(tmpDir.path());
        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
          _chai.assert.match(error.message, /Error parsing manifest\.json at /);
          _chai.assert.include(error.message, 'Unexpected token  in JSON at position 49');
          _chai.assert.include(error.message, manifestFile);
        }));
      });
    });

    (0, _mocha.it)('reports an error when missing a name', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var noNameManifest = (0, _deepcopy2.default)(_helpers.basicManifest);
        delete noNameManifest.name;

        return writeManifest(tmpDir.path(), noNameManifest).then(function (manifestFile) {
          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
            _chai.assert.match(error.message, /Manifest at .* is invalid: missing "name" property/);
            _chai.assert.include(error.message, manifestFile);
          }));
        });
      });
    });

    (0, _mocha.it)('reports an error when missing version', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var noVersionManifest = (0, _deepcopy2.default)(_helpers.basicManifest);
        delete noVersionManifest.version;

        return writeManifest(tmpDir.path(), noVersionManifest).then(function (manifestFile) {
          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
            _chai.assert.match(error.message, /Manifest at .* is invalid: missing "version" property/);
            _chai.assert.include(error.message, manifestFile);
          }));
        });
      });
    });

    (0, _mocha.it)('reports an error when missing applications.gecko', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var incompleteManifest = (0, _deepcopy2.default)(_helpers.basicManifest);
        delete incompleteManifest.applications.gecko;

        return writeManifest(tmpDir.path(), incompleteManifest).then(function (manifestFile) {
          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
            _chai.assert.match(error.message, /Manifest at .* is invalid: missing "applications.gecko".*/);
            _chai.assert.include(error.message, manifestFile);
          }));
        });
      });
    });

    (0, _mocha.it)('allows a missing applications.gecko.id', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var incompleteManifest = (0, _deepcopy2.default)(_helpers.basicManifest);
        delete incompleteManifest.applications.gecko.id;

        return writeManifest(tmpDir.path(), incompleteManifest).then(function () {
          return (0, _manifest2.default)(tmpDir.path());
        }).then(function (manifestData) {
          _chai.assert.strictEqual((0, _manifest.getManifestId)(manifestData), undefined);
        });
      });
    });

    (0, _mocha.it)('concatenates errors in error message', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var manifestWithErrors = (0, _deepcopy2.default)(_helpers.basicManifest);
        delete manifestWithErrors.name;
        delete manifestWithErrors.version;

        return writeManifest(tmpDir.path(), manifestWithErrors).then(function () {
          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
            _chai.assert.match(error.message, /missing "name" property; missing "version" property/);
          }));
        });
      });
    });

    (0, _mocha.it)('allows comments in manifest JSON', function () {
      return (0, _tempDir.withTempDir)(function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tmpDir) {
          var manifestWithComments, manifestFile, manifestData;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  manifestWithComments = '{\n          "name": "the extension",\n          "version": "0.0.1" // comments\n        }';
                  manifestFile = _path2.default.join(tmpDir.path(), 'manifest.json');
                  _context.next = 4;
                  return _mz.fs.writeFile(manifestFile, manifestWithComments);

                case 4:
                  _context.next = 6;
                  return (0, _manifest2.default)(tmpDir.path());

                case 6:
                  manifestData = _context.sent;


                  _chai.assert.deepEqual(manifestData, manifestWithoutApps);

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });

    (0, _mocha.it)('reports an error with line number in manifest JSON with comments', function () {
      return (0, _tempDir.withTempDir)(function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(tmpDir) {
          var invalidManifestWithComments, manifestFile, promise, error;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  invalidManifestWithComments = '{\n          // a comment in its own line\n          // another comment on its own line\n          "name": "I\'m an invalid JSON Manifest\n        }';
                  manifestFile = _path2.default.join(tmpDir.path(), 'manifest.json');
                  _context2.next = 4;
                  return _mz.fs.writeFile(manifestFile, invalidManifestWithComments);

                case 4:
                  promise = (0, _manifest2.default)(tmpDir.path());
                  _context2.next = 7;
                  return _chai.assert.isRejected(promise, _errors.InvalidManifest);

                case 7:
                  error = _context2.sent;
                  _context2.next = 10;
                  return _chai.assert.isRejected(promise, /Error parsing manifest\.json at /);

                case 10:
                  _chai.assert.include(error.message, 'in JSON at position 133');
                  _chai.assert.include(error.message, manifestFile);

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    });
  });

  (0, _mocha.describe)('getManifestId', function () {

    (0, _mocha.it)('returns a gecko ID', function () {
      _chai.assert.equal((0, _manifest.getManifestId)(_helpers.basicManifest), 'basic-manifest@web-ext-test-suite');
    });

    (0, _mocha.it)('returns undefined when ID is not specified', function () {
      _chai.assert.strictEqual((0, _manifest.getManifestId)(manifestWithoutApps), undefined);
    });
  });
});

function writeManifest(destDir, manifestData) {
  var manifestFile = _path2.default.join(destDir, 'manifest.json');
  return _mz.fs.writeFile(manifestFile, JSON.stringify(manifestData)).then(function () {
    return manifestFile;
  });
}

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("deepcopy");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = undefined;
exports.default = docs;

var _opn = __webpack_require__(205);

var _opn2 = _interopRequireDefault(_opn);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var url = exports.url = 'https://developer.mozilla.org/en-US/Add-ons' + '/WebExtensions/Getting_started_with_web-ext';

function docs(params) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$openUrl = _ref.openUrl,
      openUrl = _ref$openUrl === undefined ? _opn2.default : _ref$openUrl;

  return new Promise(function (resolve, reject) {
    openUrl(url, function (error) {
      if (error) {
        log.debug('Encountered an error while opening URL ' + url, error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/docs.js"))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lint;

var _addonsLinter = __webpack_require__(207);

var _logger = __webpack_require__(0);

var _fileFilter = __webpack_require__(40);

// import flow types
var log = (0, _logger.createLogger)(__filename);

// Define the needed 'addons-linter' module flow types.

// Lint command types and implementation.

function lint(_ref) {
  var artifactsDir = _ref.artifactsDir,
      boring = _ref.boring,
      ignoreFiles = _ref.ignoreFiles,
      metadata = _ref.metadata,
      output = _ref.output,
      pretty = _ref.pretty,
      sourceDir = _ref.sourceDir,
      selfHosted = _ref.selfHosted,
      verbose = _ref.verbose,
      warningsAsErrors = _ref.warningsAsErrors;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$createLinter = _ref2.createLinter,
      createLinter = _ref2$createLinter === undefined ? _addonsLinter.createInstance : _ref2$createLinter,
      _ref2$createFileFilte = _ref2.createFileFilter,
      createFileFilter = _ref2$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref2$createFileFilte,
      _ref2$shouldExitProgr = _ref2.shouldExitProgram,
      shouldExitProgram = _ref2$shouldExitProgr === undefined ? true : _ref2$shouldExitProgr;

  var fileFilter = createFileFilter({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: artifactsDir });

  log.debug('Running addons-linter on ' + sourceDir);
  var linter = createLinter({
    config: {
      logLevel: verbose ? 'debug' : 'fatal',
      stack: Boolean(verbose),
      pretty: pretty,
      warningsAsErrors: warningsAsErrors,
      metadata: metadata,
      output: output,
      boring: boring,
      selfHosted: selfHosted,
      shouldScanFile: function shouldScanFile(fileName) {
        return fileFilter.wantFile(fileName);
      },
      // This mimics the first command line argument from yargs,
      // which should be the directory to the extension.
      _: [sourceDir]
    },
    runAsBinary: shouldExitProgram
  });
  return linter.run();
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/lint.js"))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _build = __webpack_require__(31);

var _build2 = _interopRequireDefault(_build);

var _desktopNotifier = __webpack_require__(58);

var _firefox = __webpack_require__(42);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(27);

var _logger = __webpack_require__(0);

var _manifest = __webpack_require__(33);

var _manifest2 = _interopRequireDefault(_manifest);

var _extensionRunners = __webpack_require__(112);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import objects that are only used as Flow types.
var log = (0, _logger.createLogger)(__filename);

// Run command types and implementation.

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var artifactsDir = _ref2.artifactsDir,
        _ref2$browserConsole = _ref2.browserConsole,
        browserConsole = _ref2$browserConsole === undefined ? false : _ref2$browserConsole,
        pref = _ref2.pref,
        firefox = _ref2.firefox,
        firefoxArg = _ref2.firefoxArg,
        firefoxProfile = _ref2.firefoxProfile,
        _ref2$keepProfileChan = _ref2.keepProfileChanges,
        keepProfileChanges = _ref2$keepProfileChan === undefined ? false : _ref2$keepProfileChan,
        ignoreFiles = _ref2.ignoreFiles,
        _ref2$noInput = _ref2.noInput,
        noInput = _ref2$noInput === undefined ? false : _ref2$noInput,
        _ref2$noReload = _ref2.noReload,
        noReload = _ref2$noReload === undefined ? false : _ref2$noReload,
        _ref2$preInstall = _ref2.preInstall,
        preInstall = _ref2$preInstall === undefined ? false : _ref2$preInstall,
        sourceDir = _ref2.sourceDir,
        startUrl = _ref2.startUrl,
        target = _ref2.target,
        adbBin = _ref2.adbBin,
        adbHost = _ref2.adbHost,
        adbPort = _ref2.adbPort,
        adbDevice = _ref2.adbDevice,
        firefoxApk = _ref2.firefoxApk;

    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$buildExtension = _ref3.buildExtension,
        buildExtension = _ref3$buildExtension === undefined ? _build2.default : _ref3$buildExtension,
        _ref3$desktopNotifica = _ref3.desktopNotifications,
        desktopNotifications = _ref3$desktopNotifica === undefined ? _desktopNotifier.showDesktopNotification : _ref3$desktopNotifica,
        _ref3$firefoxApp = _ref3.firefoxApp,
        firefoxApp = _ref3$firefoxApp === undefined ? defaultFirefoxApp : _ref3$firefoxApp,
        _ref3$firefoxClient = _ref3.firefoxClient,
        firefoxClient = _ref3$firefoxClient === undefined ? _remote.connectWithMaxRetries : _ref3$firefoxClient,
        _ref3$reloadStrategy = _ref3.reloadStrategy,
        reloadStrategy = _ref3$reloadStrategy === undefined ? _extensionRunners.defaultReloadStrategy : _ref3$reloadStrategy,
        _ref3$MultiExtensionR = _ref3.MultiExtensionRunner,
        MultiExtensionRunner = _ref3$MultiExtensionR === undefined ? _extensionRunners.MultiExtensionRunner : _ref3$MultiExtensionR,
        _ref3$getValidatedMan = _ref3.getValidatedManifest,
        getValidatedManifest = _ref3$getValidatedMan === undefined ? _manifest2.default : _ref3$getValidatedMan;

    var customPrefs, manifestData, runners, commonRunnerParams, firefoxDesktopRunnerParams, firefoxDesktopRunner, firefoxAndroidRunnerParams, firefoxAndroidRunner, extensionRunner;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            log.info('Running web extension from ' + sourceDir);
            if (preInstall) {
              log.info('Disabled auto-reloading because it\'s not possible with ' + '--pre-install');
              noReload = true;
            }

            // Create an alias for --pref since it has been transformed into an
            // object containing one or more preferences.
            customPrefs = pref;
            _context.next = 5;
            return getValidatedManifest(sourceDir);

          case 5:
            manifestData = _context.sent;
            runners = [];
            commonRunnerParams = {
              // Common options.
              extensions: [{ sourceDir: sourceDir, manifestData: manifestData }],
              keepProfileChanges: keepProfileChanges,
              startUrl: startUrl,
              desktopNotifications: desktopNotifications
            };

            if (!(!target || target.length === 0 || target.includes('firefox-desktop'))) {
              _context.next = 14;
              break;
            }

            firefoxDesktopRunnerParams = (0, _extends3.default)({}, commonRunnerParams, {

              // Firefox specific CLI options.
              firefoxArg: firefoxArg,
              firefoxBinary: firefox,
              profilePath: firefoxProfile,
              customPrefs: customPrefs,
              browserConsole: browserConsole,
              preInstall: preInstall,

              // Firefox runner injected dependencies.
              firefoxApp: firefoxApp,
              firefoxClient: firefoxClient
            });
            _context.next = 12;
            return (0, _extensionRunners.createExtensionRunner)({
              target: 'firefox-desktop',
              params: firefoxDesktopRunnerParams
            });

          case 12:
            firefoxDesktopRunner = _context.sent;

            runners.push(firefoxDesktopRunner);

          case 14:
            if (!(target && target.includes('firefox-android'))) {
              _context.next = 20;
              break;
            }

            firefoxAndroidRunnerParams = (0, _extends3.default)({}, commonRunnerParams, {

              // Firefox specific CLI options.
              profilePath: firefoxProfile,
              customPrefs: customPrefs,
              browserConsole: browserConsole,
              preInstall: preInstall,
              firefoxApk: firefoxApk,
              adbDevice: adbDevice,
              adbHost: adbHost,
              adbPort: adbPort,
              adbBin: adbBin,

              // Injected dependencies.
              firefoxApp: firefoxApp,
              firefoxClient: firefoxClient,
              desktopNotifications: _desktopNotifier.showDesktopNotification,
              buildSourceDir: function buildSourceDir(extensionSourceDir, tmpArtifactsDir) {
                return buildExtension({
                  sourceDir: extensionSourceDir,
                  ignoreFiles: ignoreFiles,
                  asNeeded: false,
                  // Use a separate temporary directory for building the extension zip file
                  // that we are going to upload on the android device.
                  artifactsDir: tmpArtifactsDir
                }, {
                  // Suppress the message usually logged by web-ext build.
                  showReadyMessage: false
                });
              }
            });
            _context.next = 18;
            return (0, _extensionRunners.createExtensionRunner)({
              target: 'firefox-android',
              params: firefoxAndroidRunnerParams
            });

          case 18:
            firefoxAndroidRunner = _context.sent;

            runners.push(firefoxAndroidRunner);

          case 20:
            extensionRunner = new MultiExtensionRunner({
              desktopNotifications: desktopNotifications,
              runners: runners
            });
            _context.next = 23;
            return extensionRunner.run();

          case 23:

            if (noReload) {
              log.info('Automatic extension reloading has been disabled');
            } else {
              log.info('The extension will reload if any source file changes');

              reloadStrategy({
                extensionRunner: extensionRunner,
                sourceDir: sourceDir,
                artifactsDir: artifactsDir,
                ignoreFiles: ignoreFiles,
                noInput: noInput
              });
            }

            return _context.abrupt('return', extensionRunner);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function run(_x) {
    return _ref.apply(this, arguments);
  }

  return run;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/run.js"))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDesktopNotification = showDesktopNotification;

var _nodeNotifier = __webpack_require__(209);

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultLog = (0, _logger.createLogger)(__filename);

function showDesktopNotification(_ref) {
  var title = _ref.title,
      message = _ref.message,
      icon = _ref.icon;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$notifier = _ref2.notifier,
      notifier = _ref2$notifier === undefined ? _nodeNotifier2.default : _ref2$notifier,
      _ref2$log = _ref2.log,
      log = _ref2$log === undefined ? defaultLog : _ref2$log;

  return new Promise(function (resolve, reject) {
    notifier.notify({ title: title, message: message, icon: icon }, function (err, res) {
      if (err) {
        log.debug('Desktop notifier error: ' + err.message + ',' + (' response: ' + res));
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/desktop-notifier.js"))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveIdToSourceDir = exports.getIdFromSourceDir = exports.extensionIdFile = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getIdFromSourceDir = exports.getIdFromSourceDir = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(sourceDir) {
    var filePath, content, lines, id;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filePath = _path2.default.join(sourceDir, extensionIdFile);
            content = void 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _mz.fs.readFile(filePath);

          case 5:
            content = _context2.sent;
            _context2.next = 14;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](2);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context2.t0)) {
              _context2.next = 13;
              break;
            }

            log.debug('No ID file found at: ' + filePath);
            return _context2.abrupt('return');

          case 13:
            throw _context2.t0;

          case 14:
            lines = content.toString().split('\n');

            lines = lines.filter(function (line) {
              line = line.trim();
              if (line && !line.startsWith('#')) {
                return line;
              }
            });

            id = lines[0];

            log.debug('Found extension ID ' + id + ' in ' + filePath);

            if (id) {
              _context2.next = 20;
              break;
            }

            throw new _errors.UsageError('No ID found in extension ID file ' + filePath);

          case 20:
            return _context2.abrupt('return', id);

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 8]]);
  }));

  return function getIdFromSourceDir(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var saveIdToSourceDir = exports.saveIdToSourceDir = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(sourceDir, id) {
    var filePath;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filePath = _path2.default.join(sourceDir, extensionIdFile);
            _context3.next = 3;
            return _mz.fs.writeFile(filePath, ['# This file was created by https://github.com/mozilla/web-ext', '# Your auto-generated extension ID for addons.mozilla.org is:', id.toString()].join('\n'));

          case 3:

            log.debug('Saved auto-generated ID ' + id + ' to ' + filePath);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function saveIdToSourceDir(_x4, _x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.default = sign;

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(9);

var _signAddon = __webpack_require__(213);

var _signAddon2 = _interopRequireDefault(_signAddon);

var _build = __webpack_require__(31);

var _build2 = _interopRequireDefault(_build);

var _manifest = __webpack_require__(33);

var _manifest2 = _interopRequireDefault(_manifest);

var _tempDir = __webpack_require__(16);

var _errors = __webpack_require__(3);

var _artifacts = __webpack_require__(79);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var extensionIdFile = exports.extensionIdFile = '.web-extension-id';

// Sign command types and implementation.

function sign(_ref) {
  var apiKey = _ref.apiKey,
      apiProxy = _ref.apiProxy,
      apiSecret = _ref.apiSecret,
      apiUrlPrefix = _ref.apiUrlPrefix,
      artifactsDir = _ref.artifactsDir,
      id = _ref.id,
      _ref$ignoreFiles = _ref.ignoreFiles,
      ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
      sourceDir = _ref.sourceDir,
      timeout = _ref.timeout,
      verbose = _ref.verbose;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$build = _ref2.build,
      build = _ref2$build === undefined ? _build2.default : _ref2$build,
      preValidatedManifest = _ref2.preValidatedManifest,
      _ref2$signAddon = _ref2.signAddon,
      signAddon = _ref2$signAddon === undefined ? _signAddon2.default : _ref2$signAddon;

  return (0, _tempDir.withTempDir)(function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tmpDir) {
      var manifestData, _ref4, _ref5, buildResult, idFromSourceDir, manifestId, signingResult;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _artifacts.prepareArtifactsDir)(artifactsDir);

            case 2:
              manifestData = void 0;

              if (!preValidatedManifest) {
                _context.next = 7;
                break;
              }

              manifestData = preValidatedManifest;
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return (0, _manifest2.default)(sourceDir);

            case 9:
              manifestData = _context.sent;

            case 10:
              _context.next = 12;
              return Promise.all([build({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: tmpDir.path() }, { manifestData: manifestData, showReadyMessage: false }), getIdFromSourceDir(sourceDir)]);

            case 12:
              _ref4 = _context.sent;
              _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
              buildResult = _ref5[0];
              idFromSourceDir = _ref5[1];
              manifestId = (0, _manifest.getManifestId)(manifestData);

              if (!(id && manifestId)) {
                _context.next = 19;
                break;
              }

              throw new _errors.UsageError('Cannot set custom ID ' + id + ' because manifest.json ' + ('declares ID ' + manifestId));

            case 19:
              if (id) {
                log.debug('Using custom ID declared as --id=' + id);
              }

              if (manifestId) {
                id = manifestId;
              }

              if (!id && idFromSourceDir) {
                log.info('Using previously auto-generated extension ID: ' + idFromSourceDir);
                id = idFromSourceDir;
              }

              if (!id) {
                log.warn('No extension ID specified (it will be auto-generated)');
              }

              _context.next = 25;
              return signAddon({
                apiKey: apiKey,
                apiSecret: apiSecret,
                apiUrlPrefix: apiUrlPrefix,
                apiProxy: apiProxy,
                timeout: timeout,
                verbose: verbose,
                id: id,
                xpiPath: buildResult.extensionPath,
                version: manifestData.version,
                downloadDir: artifactsDir
              });

            case 25:
              signingResult = _context.sent;

              if (!signingResult.id) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return saveIdToSourceDir(sourceDir, signingResult.id);

            case 29:
              if (!signingResult.success) {
                _context.next = 34;
                break;
              }

              log.info('Extension ID: ' + signingResult.id);
              log.info('SUCCESS');
              _context.next = 36;
              break;

            case 34:
              log.info('FAIL');
              throw new _errors.WebExtError('The extension could not be signed');

            case 36:
              return _context.abrupt('return', signingResult);

            case 37:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/sign.js"))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__(231);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.defaultVersionGetter = defaultVersionGetter;
exports.main = main;

var _os = __webpack_require__(118);

var _os2 = _interopRequireDefault(_os);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(48);

var _camelcase = __webpack_require__(119);

var _camelcase2 = _interopRequireDefault(_camelcase);

var _gitRevSync = __webpack_require__(120);

var _gitRevSync2 = _interopRequireDefault(_gitRevSync);

var _yargs = __webpack_require__(236);

var _yargs2 = _interopRequireDefault(_yargs);

var _cmd = __webpack_require__(34);

var _cmd2 = _interopRequireDefault(_cmd);

var _errors = __webpack_require__(3);

var _logger = __webpack_require__(0);

var _preferences = __webpack_require__(81);

var _updates = __webpack_require__(117);

var _config = __webpack_require__(86);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var envPrefix = 'WEB_EXT';

// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed

/*
 * The command line program.
 */
var Program = exports.Program = function () {
  function Program(argv) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$absolutePackageD = _ref.absolutePackageDir,
        absolutePackageDir = _ref$absolutePackageD === undefined ? process.cwd() : _ref$absolutePackageD;

    (0, _classCallCheck3.default)(this, Program);

    // This allows us to override the process argv which is useful for
    // testing.
    // NOTE: process.argv.slice(2) removes the path to node and web-ext
    // executables from the process.argv array.
    argv = argv || process.argv.slice(2);

    // NOTE: always initialize yargs explicitly with the package dir
    // so that we are sure that it is going to load the 'boolean-negation: false'
    // config (See web-ext#469 for rationale).
    var yargsInstance = (0, _yargs2.default)(argv, absolutePackageDir);

    this.verboseEnabled = false;
    this.shouldExitProgram = true;
    this.yargs = yargsInstance;
    this.yargs.strict();

    this.commands = {};
    this.options = {};
  }

  (0, _createClass3.default)(Program, [{
    key: 'command',
    value: function command(name, description, executor) {
      var _this = this;

      var commandOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      this.options[(0, _camelcase2.default)(name)] = commandOptions;

      this.yargs.command(name, description, function (yargsForCmd) {
        if (!commandOptions) {
          return;
        }
        return yargsForCmd
        // Make sure the user does not add any extra commands. For example,
        // this would be a mistake because lint does not accept arguments:
        // web-ext lint ./src/path/to/file.js
        .demandCommand(0, 0, undefined, 'This command does not take any arguments').strict().exitProcess(_this.shouldExitProgram)
        // Calling env() will be unnecessary after
        // https://github.com/yargs/yargs/issues/486 is fixed
        .env(envPrefix).options(commandOptions);
      });
      this.commands[name] = executor;
      return this;
    }
  }, {
    key: 'setGlobalOptions',
    value: function setGlobalOptions(options) {
      // This is a convenience for setting global options.
      // An option is only global (i.e. available to all sub commands)
      // with the `global` flag so this makes sure every option has it.
      this.options = (0, _extends3.default)({}, this.options, options);
      Object.keys(options).forEach(function (key) {
        options[key].global = true;
        if (options[key].demand === undefined) {
          // By default, all options should be "demanded" otherwise
          // yargs.strict() will think they are missing when declared.
          options[key].demand = true;
        }
      });
      this.yargs.options(options);
      return this;
    }
  }, {
    key: 'enableVerboseMode',
    value: function enableVerboseMode(logStream, version) {
      if (this.verboseEnabled) {
        return;
      }

      logStream.makeVerbose();
      log.info('Version:', version);
      this.verboseEnabled = true;
    }
  }, {
    key: 'execute',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(absolutePackageDir) {
        var _this2 = this;

        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$checkForUpdates = _ref3.checkForUpdates,
            checkForUpdates = _ref3$checkForUpdates === undefined ? _updates.checkForUpdates : _ref3$checkForUpdates,
            _ref3$systemProcess = _ref3.systemProcess,
            systemProcess = _ref3$systemProcess === undefined ? process : _ref3$systemProcess,
            _ref3$logStream = _ref3.logStream,
            logStream = _ref3$logStream === undefined ? _logger.consoleStream : _ref3$logStream,
            _ref3$getVersion = _ref3.getVersion,
            getVersion = _ref3$getVersion === undefined ? defaultVersionGetter : _ref3$getVersion,
            _ref3$applyConfigToAr = _ref3.applyConfigToArgv,
            applyConfigToArgv = _ref3$applyConfigToAr === undefined ? _config.applyConfigToArgv : _ref3$applyConfigToAr,
            _ref3$discoverConfigF = _ref3.discoverConfigFiles,
            discoverConfigFiles = _ref3$discoverConfigF === undefined ? _config.discoverConfigFiles : _ref3$discoverConfigF,
            _ref3$loadJSConfigFil = _ref3.loadJSConfigFile,
            loadJSConfigFile = _ref3$loadJSConfigFil === undefined ? _config.loadJSConfigFile : _ref3$loadJSConfigFil,
            _ref3$shouldExitProgr = _ref3.shouldExitProgram,
            shouldExitProgram = _ref3$shouldExitProgr === undefined ? true : _ref3$shouldExitProgr,
            _ref3$globalEnv = _ref3.globalEnv,
            globalEnv = _ref3$globalEnv === undefined ? "development" : _ref3$globalEnv;

        var argv, cmd, version, runCommand, adjustedArgv, configFiles, discoveredConfigs, niceFileList;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.shouldExitProgram = shouldExitProgram;
                this.yargs.exitProcess(this.shouldExitProgram);

                argv = this.yargs.argv;
                cmd = argv._[0];
                version = getVersion(absolutePackageDir);
                runCommand = this.commands[cmd];


                if (argv.verbose) {
                  this.enableVerboseMode(logStream, version);
                }

                adjustedArgv = (0, _extends3.default)({}, argv);
                _context.prev = 8;

                if (!(cmd === undefined)) {
                  _context.next = 11;
                  break;
                }

                throw new _errors.UsageError('No sub-command was specified in the args');

              case 11:
                if (runCommand) {
                  _context.next = 13;
                  break;
                }

                throw new _errors.UsageError('Unknown command: ' + cmd);

              case 13:
                if (globalEnv === 'production') {
                  checkForUpdates({
                    version: getVersion(absolutePackageDir)
                  });
                }

                configFiles = [];

                if (!argv.configDiscovery) {
                  _context.next = 23;
                  break;
                }

                log.debug('Discovering config files. ' + 'Set --no-config-discovery to disable');
                _context.next = 19;
                return discoverConfigFiles();

              case 19:
                discoveredConfigs = _context.sent;

                configFiles.push.apply(configFiles, (0, _toConsumableArray3.default)(discoveredConfigs));
                _context.next = 24;
                break;

              case 23:
                log.debug('Not discovering config files');

              case 24:

                if (argv.config) {
                  configFiles.push(_path2.default.resolve(argv.config));
                }

                if (configFiles.length) {
                  niceFileList = configFiles.map(function (f) {
                    return f.replace(process.cwd(), '.');
                  }).map(function (f) {
                    return f.replace(_os2.default.homedir(), '~');
                  }).join(', ');

                  log.info('Applying config file' + ((configFiles.length !== 1 ? 's' : '') + ': ') + ('' + niceFileList));
                }

                configFiles.forEach(function (configFileName) {
                  var configObject = loadJSConfigFile(configFileName);
                  adjustedArgv = applyConfigToArgv({
                    argv: adjustedArgv,
                    argvFromCLI: argv,
                    configFileName: configFileName,
                    configObject: configObject,
                    options: _this2.options
                  });
                });

                if (adjustedArgv.verbose) {
                  // Ensure that the verbose is enabled when specified in a config file.
                  this.enableVerboseMode(logStream, version);
                }

                _context.next = 30;
                return runCommand(adjustedArgv, { shouldExitProgram: shouldExitProgram });

              case 30:
                _context.next = 42;
                break;

              case 32:
                _context.prev = 32;
                _context.t0 = _context['catch'](8);

                if (!(_context.t0 instanceof _errors.UsageError) || adjustedArgv.verbose) {
                  log.error('\n' + _context.t0.stack + '\n');
                } else {
                  log.error('\n' + _context.t0 + '\n');
                }
                if (_context.t0.code) {
                  log.error('Error code: ' + _context.t0.code + '\n');
                }

                log.debug('Command executed: ' + cmd);

                if (!this.shouldExitProgram) {
                  _context.next = 41;
                  break;
                }

                systemProcess.exit(1);
                _context.next = 42;
                break;

              case 41:
                throw _context.t0;

              case 42:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 32]]);
      }));

      function execute(_x3) {
        return _ref2.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Program;
}();

// A global variable generated by DefinePlugin, generated in webpack.config.js


//A defintion of type of argument for defaultVersionGetter


function defaultVersionGetter(absolutePackageDir) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$globalEnv = _ref4.globalEnv,
      globalEnv = _ref4$globalEnv === undefined ? "development" : _ref4$globalEnv;

  if (globalEnv === 'production') {
    log.debug('Getting the version from package.json');
    var packageData = (0, _fs.readFileSync)(_path2.default.join(absolutePackageDir, 'package.json'));
    return JSON.parse(packageData).version;
  } else {
    log.debug('Getting version from the git revision');
    return _gitRevSync2.default.branch(absolutePackageDir) + '-' + _gitRevSync2.default.long(absolutePackageDir);
  }
}

// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed

function main(absolutePackageDir) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$getVersion = _ref5.getVersion,
      getVersion = _ref5$getVersion === undefined ? defaultVersionGetter : _ref5$getVersion,
      _ref5$commands = _ref5.commands,
      commands = _ref5$commands === undefined ? _cmd2.default : _ref5$commands,
      argv = _ref5.argv,
      _ref5$runOptions = _ref5.runOptions,
      runOptions = _ref5$runOptions === undefined ? {} : _ref5$runOptions;

  var program = new Program(argv, { absolutePackageDir: absolutePackageDir });

  // yargs uses magic camel case expansion to expose options on the
  // final argv object. For example, the 'artifacts-dir' option is alternatively
  // available as argv.artifactsDir.
  program.yargs.usage('Usage: $0 [options] command\n\nOption values can also be set by declaring an environment variable prefixed\nwith $' + envPrefix + '_. For example: $' + envPrefix + '_SOURCE_DIR=/path is the same as\n--source-dir=/path.\n\nTo view specific help for any given command, add the command name.\nExample: $0 --help run.\n').help('help').alias('h', 'help').env(envPrefix).version(function () {
    return getVersion(absolutePackageDir);
  }).demandCommand(1, 'You must specify a command').strict();

  program.setGlobalOptions({
    'source-dir': {
      alias: 's',
      describe: 'Web extension source directory.',
      default: process.cwd(),
      requiresArg: true,
      type: 'string',
      coerce: _path2.default.resolve
    },
    'artifacts-dir': {
      alias: 'a',
      describe: 'Directory where artifacts will be saved.',
      default: _path2.default.join(process.cwd(), 'web-ext-artifacts'),
      normalize: true,
      requiresArg: true,
      type: 'string'
    },
    'verbose': {
      alias: 'v',
      describe: 'Show verbose output',
      type: 'boolean'
    },
    'ignore-files': {
      alias: 'i',
      describe: 'A list of glob patterns to define which files should be ' + 'ignored. (Example: --ignore-files=path/to/first.js ' + 'path/to/second.js "**/*.log")',
      demand: false,
      requiresArg: true,
      type: 'array'
    },
    'no-input': {
      describe: 'Disable all features that require standard input',
      type: 'boolean'
    },
    'config': {
      alias: 'c',
      describe: 'Path to a CommonJS config file to set ' + 'option defaults',
      default: undefined,
      demand: false,
      requiresArg: true,
      type: 'string'
    },
    'config-discovery': {
      describe: 'Discover config files in home directory and ' + 'working directory. Disable with --no-config-discovery.',
      demand: false,
      default: true,
      type: 'boolean'
    }
  });

  program.command('build', 'Create an extension package from source', commands.build, {
    'as-needed': {
      describe: 'Watch for file changes and re-build as needed',
      type: 'boolean'
    },
    'overwrite-dest': {
      alias: 'o',
      describe: 'Overwrite destination package if it exists.',
      type: 'boolean'
    }
  }).command('sign', 'Sign the extension so it can be installed in Firefox', commands.sign, {
    'api-key': {
      describe: 'API key (JWT issuer) from addons.mozilla.org',
      demand: true,
      type: 'string'
    },
    'api-secret': {
      describe: 'API secret (JWT secret) from addons.mozilla.org',
      demand: true,
      type: 'string'
    },
    'api-url-prefix': {
      describe: 'Signing API URL prefix',
      default: 'https://addons.mozilla.org/api/v3',
      demand: true,
      type: 'string'
    },
    'api-proxy': {
      describe: 'Use a proxy to access the signing API. ' + 'Example: https://yourproxy:6000 ',
      demand: false,
      type: 'string'
    },
    'id': {
      describe: 'A custom ID for the extension. This has no effect if the ' + 'extension already declares an explicit ID in its manifest.',
      demand: false,
      type: 'string'
    },
    'timeout': {
      describe: 'Number of milliseconds to wait before giving up',
      type: 'number'
    }
  }).command('run', 'Run the extension', commands.run, {
    'target': {
      alias: 't',
      describe: 'The extensions runners to enable (e.g. firefox-desktop, ' + 'firefox-android). Specify this option multiple times to ' + 'run against multiple targets.',
      default: 'firefox-desktop',
      demand: false,
      type: 'array'
    },
    'firefox': {
      alias: ['f', 'firefox-binary'],
      describe: 'Path or alias to a Firefox executable such as firefox-bin ' + 'or firefox.exe. ' + 'If not specified, the default Firefox will be used. ' + 'You can specify the following aliases in lieu of a path: ' + 'firefox, beta, nightly, firefoxdeveloperedition.',
      demand: false,
      type: 'string'
    },
    'firefox-arg': {
      alias: 'arg',
      describe: 'Supply an extra argument to Firefox.',
      demand: false,
      type: 'array'
    },
    'firefox-profile': {
      alias: 'p',
      describe: 'Run Firefox using a copy of this profile. The profile ' + 'can be specified as a directory or a name, such as one ' + 'you would see in the Profile Manager. If not specified, ' + 'a new temporary profile will be created.',
      demand: false,
      type: 'string'
    },
    'keep-profile-changes': {
      describe: 'Run Firefox directly in custom profile. Any changes to ' + 'the profile will be saved.',
      demand: false,
      type: 'boolean'
    },
    'no-reload': {
      describe: 'Do not reload the extension when source files change',
      demand: false,
      type: 'boolean'
    },
    'pre-install': {
      describe: 'Pre-install the extension into the profile before ' + 'startup. This is only needed to support older versions ' + 'of Firefox.',
      demand: false,
      type: 'boolean'
    },
    'pref': {
      describe: 'Launch firefox with a custom preference ' + '(example: --pref=general.useragent.locale=fr-FR). ' + 'You can repeat this option to set more than one ' + 'preference.',
      demand: false,
      requiresArg: true,
      type: 'array',
      coerce: _preferences.coerceCLICustomPreference
    },
    'start-url': {
      alias: ['u', 'url'],
      describe: 'Launch firefox at specified page',
      demand: false,
      requiresArg: true,
      type: 'array'
    },
    'browser-console': {
      alias: ['bc'],
      describe: 'Open the DevTools Browser Console.',
      demand: false,
      type: 'boolean'
    },
    // Firefox for Android CLI options.
    'adb-bin': {
      describe: 'Specify a custom path to the adb binary',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'adb-host': {
      describe: 'Connect to adb on the specified host',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'adb-port': {
      describe: 'Connect to adb on the specified port',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'adb-device': {
      alias: ['android-device'],
      describe: 'Connect to the specified adb device name',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'firefox-apk': {
      describe: 'Run a specific Firefox for Android APK. ' + 'Example: org.mozilla.fennec_aurora',
      demand: false,
      type: 'string',
      requiresArg: true
    }
  }).command('lint', 'Validate the extension source', commands.lint, {
    'output': {
      alias: 'o',
      describe: 'The type of output to generate',
      type: 'string',
      default: 'text',
      choices: ['json', 'text']
    },
    'metadata': {
      describe: 'Output only metadata as JSON',
      type: 'boolean',
      default: false
    },
    'warnings-as-errors': {
      describe: 'Treat warnings as errors by exiting non-zero for warnings',
      alias: 'w',
      type: 'boolean',
      default: false
    },
    'pretty': {
      describe: 'Prettify JSON output',
      type: 'boolean',
      default: false
    },
    'self-hosted': {
      describe: 'Your extension will be self-hosted. This disables messages ' + 'related to hosting on addons.mozilla.org.',
      type: 'boolean',
      default: false
    },
    'boring': {
      describe: 'Disables colorful shell output',
      type: 'boolean',
      default: false
    }
  }).command('docs', 'Open the web-ext documentation in a browser', commands.docs, {});

  return program.execute(absolutePackageDir, runOptions);
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/program.js"))

/***/ }),
/* 61 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(22);
var document = __webpack_require__(12).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(22);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(20);
var dPs = __webpack_require__(131);
var enumBugKeys = __webpack_require__(69);
var IE_PROTO = __webpack_require__(67)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(63)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(93).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(61);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(68)('keys');
var uid = __webpack_require__(45);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(11);
var global = __webpack_require__(12);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(36) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 69 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(62);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(39);
var TAG = __webpack_require__(13)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(71);
var ITERATOR = __webpack_require__(13)('iterator');
var Iterators = __webpack_require__(29);
module.exports = __webpack_require__(11).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(43);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("event-to-promise");

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onSourceChange;
exports.proxyFileChanges = proxyFileChanges;

var _watchpack = __webpack_require__(148);

var _watchpack2 = _interopRequireDefault(_watchpack);

var _debounce = __webpack_require__(149);

var _debounce2 = _interopRequireDefault(_debounce);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// onSourceChange types and implementation

// NOTE: this fix an issue with flow and default exports (which currently
// lose their type signatures) by explicitly declare the default export
// signature. Reference: https://github.com/facebook/flow/issues/449
// eslint-disable-next-line no-shadow

function onSourceChange(_ref) {
  var sourceDir = _ref.sourceDir,
      artifactsDir = _ref.artifactsDir,
      onChange = _ref.onChange,
      shouldWatchFile = _ref.shouldWatchFile;

  // TODO: For network disks, we would need to add {poll: true}.
  var watcher = new _watchpack2.default();

  var executeImmediately = true;
  onChange = (0, _debounce2.default)(onChange, 1000, executeImmediately);

  watcher.on('change', function (filePath) {
    proxyFileChanges({ artifactsDir: artifactsDir, onChange: onChange, filePath: filePath, shouldWatchFile: shouldWatchFile });
  });

  log.debug('Watching for file changes in ' + sourceDir);
  watcher.watch([], [sourceDir], Date.now());

  // TODO: support interrupting the watcher on Windows.
  // https://github.com/mozilla/web-ext/issues/225
  process.on('SIGINT', function () {
    return watcher.close();
  });
  return watcher;
}

// proxyFileChanges types and implementation.

function proxyFileChanges(_ref2) {
  var artifactsDir = _ref2.artifactsDir,
      onChange = _ref2.onChange,
      filePath = _ref2.filePath,
      shouldWatchFile = _ref2.shouldWatchFile;

  if (filePath.indexOf(artifactsDir) === 0 || !shouldWatchFile(filePath)) {
    log.debug('Ignoring change to: ' + filePath);
  } else {
    log.debug('Changed: ' + filePath);
    log.debug('Last change detection: ' + new Date().toTimeString());
    onChange();
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/watcher.js"))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(13);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var core = __webpack_require__(11);
var LIBRARY = __webpack_require__(36);
var wksExt = __webpack_require__(76);
var defineProperty = __webpack_require__(21).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareArtifactsDir = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var prepareArtifactsDir = exports.prepareArtifactsDir = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(artifactsDir) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$asyncMkdirp = _ref2.asyncMkdirp,
        asyncMkdirp = _ref2$asyncMkdirp === undefined ? defaultAsyncMkdirp : _ref2$asyncMkdirp;

    var stats;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mz.fs.stat(artifactsDir);

          case 3:
            stats = _context.sent;

            if (stats.isDirectory()) {
              _context.next = 6;
              break;
            }

            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but it is not a directory.');

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return _mz.fs.access(artifactsDir, _mz.fs.W_OK);

          case 9:
            _context.next = 18;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](6);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t0)) {
              _context.next = 17;
              break;
            }

            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but the user lacks ' + 'permissions on it.');

          case 17:
            throw _context.t0;

          case 18:
            _context.next = 43;
            break;

          case 20:
            _context.prev = 20;
            _context.t1 = _context['catch'](0);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t1)) {
              _context.next = 26;
              break;
            }

            throw new _errors.UsageError('Cannot access --artifacts-dir="' + artifactsDir + '" because the user ' + ('lacks permissions: ' + _context.t1));

          case 26:
            if (!(0, _errors.isErrorWithCode)('ENOENT', _context.t1)) {
              _context.next = 42;
              break;
            }

            _context.prev = 27;

            log.debug('Creating artifacts directory: ' + artifactsDir);
            _context.next = 31;
            return asyncMkdirp(artifactsDir);

          case 31:
            _context.next = 40;
            break;

          case 33:
            _context.prev = 33;
            _context.t2 = _context['catch'](27);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t2)) {
              _context.next = 39;
              break;
            }

            throw new _errors.UsageError('Cannot create --artifacts-dir="' + artifactsDir + '" because the ' + ('user lacks permissions: ' + _context.t2));

          case 39:
            throw _context.t2;

          case 40:
            _context.next = 43;
            break;

          case 42:
            throw _context.t1;

          case 43:
            return _context.abrupt('return', artifactsDir);

          case 44:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 20], [6, 11], [27, 33]]);
  }));

  return function prepareArtifactsDir(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _mz = __webpack_require__(9);

var _mkdirp = __webpack_require__(179);

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _errors = __webpack_require__(3);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var defaultAsyncMkdirp = (0, _es6Promisify2.default)(_mkdirp2.default);
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/artifacts.js"))

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonOverridablePreferences = undefined;

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

exports.getPrefs = getPrefs;
exports.coerceCLICustomPreference = coerceCLICustomPreference;

var _errors = __webpack_require__(3);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var nonOverridablePreferences = exports.nonOverridablePreferences = ['devtools.debugger.remote-enabled', 'devtools.debugger.prompt-connection', 'xpinstall.signatures.required'];

// Flow Types

// Preferences Maps

var prefsCommon = {
  // Allow debug output via dump to be printed to the system console
  'browser.dom.window.dump.enabled': true,
  // Warn about possibly incorrect code.
  'javascript.options.strict': true,
  'javascript.options.showInConsole': true,

  // Allow remote connections to the debugger.
  'devtools.debugger.remote-enabled': true,
  // Disable the prompt for allowing connections.
  'devtools.debugger.prompt-connection': false,

  // Turn off platform logging because it is a lot of info.
  'extensions.logging.enabled': false,

  // Disable extension updates and notifications.
  'extensions.checkCompatibility.nightly': false,
  'extensions.update.enabled': false,
  'extensions.update.notifyUser': false,

  // From:
  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l372
  // Only load extensions from the application and user profile.
  // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
  'extensions.enabledScopes': 5,
  // Disable metadata caching for installed add-ons by default.
  'extensions.getAddons.cache.enabled': false,
  // Disable intalling any distribution add-ons.
  'extensions.installDistroAddons': false,
  // Allow installing extensions dropped into the profile folder.
  'extensions.autoDisableScopes': 10,

  // Disable app update.
  'app.update.enabled': false,

  // Allow unsigned add-ons.
  'xpinstall.signatures.required': false
};

// Prefs specific to Firefox for Android.
var prefsFennec = {
  'browser.console.showInPanel': true,
  'browser.firstrun.show.uidiscovery': false,
  'devtools.remote.usb.enabled': true
};

// Prefs specific to Firefox for desktop.
var prefsFirefox = {
  'browser.startup.homepage': 'about:blank',
  'startup.homepage_welcome_url': 'about:blank',
  'startup.homepage_welcome_url.additional': '',
  'devtools.errorconsole.enabled': true,
  'devtools.chrome.enabled': true,

  // From:
  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l388
  // Make url-classifier updates so rare that they won't affect tests.
  'urlclassifier.updateinterval': 172800,
  // Point the url-classifier to a nonexistent local URL for fast failures.
  'browser.safebrowsing.provider.0.gethashURL': 'http://localhost/safebrowsing-dummy/gethash',
  'browser.safebrowsing.provider.0.keyURL': 'http://localhost/safebrowsing-dummy/newkey',
  'browser.safebrowsing.provider.0.updateURL': 'http://localhost/safebrowsing-dummy/update',

  // Disable self repair/SHIELD
  'browser.selfsupport.url': 'https://localhost/selfrepair',
  // Disable Reader Mode UI tour
  'browser.reader.detectedFirstArticle': true,

  // Set the policy firstURL to an empty string to prevent
  // the privacy info page to be opened on every "web-ext run".
  // (See #1114 for rationale)
  'datareporting.policy.firstRunURL': ''
};

var prefs = {
  common: prefsCommon,
  fennec: prefsFennec,
  firefox: prefsFirefox
};

// Module exports

function getPrefs() {
  var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'firefox';

  var appPrefs = prefs[app];
  if (!appPrefs) {
    throw new _errors.WebExtError('Unsupported application: ' + app);
  }
  return (0, _extends3.default)({}, prefsCommon, appPrefs);
}

function coerceCLICustomPreference(cliPrefs) {
  var customPrefs = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cliPrefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pref = _step.value;

      var prefsAry = pref.split('=');

      if (prefsAry.length < 2) {
        throw new _errors.UsageError('Incomplete custom preference: "' + pref + '". ' + 'Syntax expected: "prefname=prefvalue".');
      }

      var _key = prefsAry[0];
      var value = prefsAry.slice(1).join('=');

      if (/[^\w{@}.-]/.test(_key)) {
        throw new _errors.UsageError('Invalid custom preference name: ' + _key);
      }

      if (value === '' + parseInt(value)) {
        value = parseInt(value, 10);
      } else if (value === 'true' || value === 'false') {
        value = value === 'true';
      }

      if (nonOverridablePreferences.includes(_key)) {
        log.warn('\'' + _key + '\' preference cannot be customized.');
        continue;
      }
      customPrefs['' + _key] = value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return customPrefs;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/preferences.js"))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17),
    Console = __webpack_require__(194),
    Memory = __webpack_require__(195),
    DOM = __webpack_require__(196),
    Network = __webpack_require__(198),
    StyleSheets = __webpack_require__(199);

module.exports = Tab;

function Tab(client, tab) {
  this.initialize(client, tab.actor);

  this.tab = tab;
  this.updateInfo(tab);

  this.on("tabNavigated", this.onTabNavigated.bind(this));
}

Tab.prototype = extend(ClientMethods, {
  updateInfo: function(form) {
    this.url = form.url;
    this.title = form.title;
  },

  get StyleSheets() {
    if (!this._StyleSheets) {
      this._StyleSheets = new StyleSheets(this.client, this.tab.styleSheetsActor);
    }
    return this._StyleSheets;
  },

  get DOM() {
    if (!this._DOM) {
      this._DOM = new DOM(this.client, this.tab.inspectorActor);
    }
    return this._DOM;
  },

  get Network() {
    if (!this._Network) {
      this._Network = new Network(this.client, this.tab.consoleActor);
    }
    return this._Network;
  },

  get Console() {
    if (!this._Console) {
      this._Console = new Console(this.client, this.tab.consoleActor);
    }
    return this._Console;
  },

  get Memory() {
    if (!this._Memory) {
      this._Memory = new Memory(this.client, this.tab.memoryActor);
    }
    return this._Memory;
  },

  onTabNavigated: function(event) {
    if (event.state == "start") {
      this.emit("before-navigate", { url: event.url });
    }
    else if (event.state == "stop") {
      this.updateInfo(event);

      this.emit("navigate", { url: event.url, title: event.title });
    }
  },

  attach: function(cb) {
    this.request("attach", cb);
  },

  detach: function(cb) {
    this.request("detach", cb);
  },

  reload: function(cb) {
    this.request("reload", cb);
  },

  navigateTo: function(url, cb) {
    this.request("navigateTo", { url: url }, cb);
  }
})


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirefoxDesktopExtensionRunner = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _errors = __webpack_require__(3);

var _firefox = __webpack_require__(42);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(27);

var _logger = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types from project files.
// eslint-disable-line import/named

var log = (0, _logger.createLogger)(__filename);

/**
 * Implements an IExtensionRunner which manages a Firefox Desktop instance.
 */


/**
 * This module provide an ExtensionRunner subclass that manage an extension executed
 * in a Firefox for Desktop instance.
 */

// Import flow types from npm dependencies.

var FirefoxDesktopExtensionRunner = exports.FirefoxDesktopExtensionRunner = function () {
  function FirefoxDesktopExtensionRunner(params) {
    (0, _classCallCheck3.default)(this, FirefoxDesktopExtensionRunner);

    this.params = params;

    this.reloadableExtensions = new Map();
    this.cleanupCallbacks = new Set();
  }

  // Method exported from the IExtensionRunner interface.

  /**
   * Returns the runner name.
   */

  // Map extensions sourceDir to their related addon ids.


  (0, _createClass3.default)(FirefoxDesktopExtensionRunner, [{
    key: 'getName',
    value: function getName() {
      return 'Firefox Desktop';
    }

    /**
     * Setup the Firefox Profile and run a Firefox Desktop instance.
     */

  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.setupProfileDir();

              case 2:
                _context.next = 4;
                return this.startFirefoxInstance();

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()

    /**
     * Reloads all the extensions, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadAllExtensions',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var runnerName, reloadErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref4, sourceDir, _ref5, _ref6, res;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                runnerName = this.getName();
                reloadErrors = new Map();
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 5;
                _iterator = this.params.extensions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 19;
                  break;
                }

                _ref4 = _step.value;
                sourceDir = _ref4.sourceDir;
                _context2.next = 12;
                return this.reloadExtensionBySourceDir(sourceDir);

              case 12:
                _ref5 = _context2.sent;
                _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
                res = _ref6[0];

                if (res.reloadError instanceof Error) {
                  reloadErrors.set(sourceDir, res.reloadError);
                }

              case 16:
                _iteratorNormalCompletion = true;
                _context2.next = 7;
                break;

              case 19:
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 25:
                _context2.prev = 25;
                _context2.prev = 26;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 28:
                _context2.prev = 28;

                if (!_didIteratorError) {
                  _context2.next = 31;
                  break;
                }

                throw _iteratorError;

              case 31:
                return _context2.finish(28);

              case 32:
                return _context2.finish(25);

              case 33:
                if (!(reloadErrors.size > 0)) {
                  _context2.next = 35;
                  break;
                }

                return _context2.abrupt('return', [{
                  runnerName: runnerName,
                  reloadError: new _errors.MultiExtensionsReloadError(reloadErrors)
                }]);

              case 35:
                return _context2.abrupt('return', [{ runnerName: runnerName }]);

              case 36:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 21, 25, 33], [26,, 28, 32]]);
      }));

      function reloadAllExtensions() {
        return _ref2.apply(this, arguments);
      }

      return reloadAllExtensions;
    }()

    /**
     * Reloads a single extension, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadExtensionBySourceDir',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(extensionSourceDir) {
        var runnerName, addonId;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                runnerName = this.getName();
                addonId = this.reloadableExtensions.get(extensionSourceDir);

                if (addonId) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: new _errors.WebExtError('Extension not reloadable: ' + ('no addonId has been mapped to "' + extensionSourceDir + '"')),
                  runnerName: runnerName
                }]);

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return this.remoteFirefox.reloadAddon(addonId);

              case 7:
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](4);
                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: _context3.t0,
                  runnerName: runnerName
                }]);

              case 12:
                return _context3.abrupt('return', [{ runnerName: runnerName, sourceDir: extensionSourceDir }]);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 9]]);
      }));

      function reloadExtensionBySourceDir(_x) {
        return _ref7.apply(this, arguments);
      }

      return reloadExtensionBySourceDir;
    }()

    /**
     * Register a callback to be called when the runner has been exited
     * (e.g. the Firefox instance exits or the user has requested web-ext
     * to exit).
     */

  }, {
    key: 'registerCleanup',
    value: function registerCleanup(fn) {
      this.cleanupCallbacks.add(fn);
    }

    /**
     * Exits the runner, by closing the managed Firefox instance.
     */

  }, {
    key: 'exit',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!this.runningInfo || !this.runningInfo.firefox)) {
                  _context4.next = 2;
                  break;
                }

                throw new _errors.WebExtError('No firefox instance is currently running');

              case 2:

                this.runningInfo.firefox.kill();

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function exit() {
        return _ref8.apply(this, arguments);
      }

      return exit;
    }()

    // Private helper methods.

  }, {
    key: 'setupProfileDir',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var _params, customPrefs, extensions, keepProfileChanges, preInstall, profilePath, firefoxApp, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, extension;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _params = this.params, customPrefs = _params.customPrefs, extensions = _params.extensions, keepProfileChanges = _params.keepProfileChanges, preInstall = _params.preInstall, profilePath = _params.profilePath, firefoxApp = _params.firefoxApp;

                if (!profilePath) {
                  _context5.next = 15;
                  break;
                }

                if (!keepProfileChanges) {
                  _context5.next = 9;
                  break;
                }

                log.debug('Using Firefox profile from ' + profilePath);
                _context5.next = 6;
                return firefoxApp.useProfile(profilePath, { customPrefs: customPrefs });

              case 6:
                this.profile = _context5.sent;
                _context5.next = 13;
                break;

              case 9:
                log.debug('Copying Firefox profile from ' + profilePath);
                _context5.next = 12;
                return firefoxApp.copyProfile(profilePath, { customPrefs: customPrefs });

              case 12:
                this.profile = _context5.sent;

              case 13:
                _context5.next = 19;
                break;

              case 15:
                log.debug('Creating new Firefox profile');
                _context5.next = 18;
                return firefoxApp.createProfile({ customPrefs: customPrefs });

              case 18:
                this.profile = _context5.sent;

              case 19:
                if (!preInstall) {
                  _context5.next = 46;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 23;
                _iterator2 = extensions[Symbol.iterator]();

              case 25:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context5.next = 32;
                  break;
                }

                extension = _step2.value;
                _context5.next = 29;
                return firefoxApp.installExtension({
                  asProxy: true,
                  extensionPath: extension.sourceDir,
                  manifestData: extension.manifestData,
                  profile: this.profile
                });

              case 29:
                _iteratorNormalCompletion2 = true;
                _context5.next = 25;
                break;

              case 32:
                _context5.next = 38;
                break;

              case 34:
                _context5.prev = 34;
                _context5.t0 = _context5['catch'](23);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t0;

              case 38:
                _context5.prev = 38;
                _context5.prev = 39;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 41:
                _context5.prev = 41;

                if (!_didIteratorError2) {
                  _context5.next = 44;
                  break;
                }

                throw _iteratorError2;

              case 44:
                return _context5.finish(41);

              case 45:
                return _context5.finish(38);

              case 46:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[23, 34, 38, 46], [39,, 41, 45]]);
      }));

      function setupProfileDir() {
        return _ref9.apply(this, arguments);
      }

      return setupProfileDir;
    }()
  }, {
    key: 'startFirefoxInstance',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var _this = this;

        var _params2, browserConsole, extensions, firefoxArg, firefoxBinary, preInstall, startUrl, firefoxApp, firefoxClient, binaryArgs, urls, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, url, args, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, arg, remoteFirefox, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, extension, addonId;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _params2 = this.params, browserConsole = _params2.browserConsole, extensions = _params2.extensions, firefoxArg = _params2.firefoxArg, firefoxBinary = _params2.firefoxBinary, preInstall = _params2.preInstall, startUrl = _params2.startUrl, firefoxApp = _params2.firefoxApp, firefoxClient = _params2.firefoxClient;
                binaryArgs = [];


                if (browserConsole) {
                  binaryArgs.push('-jsconsole');
                }

                if (!startUrl) {
                  _context6.next = 24;
                  break;
                }

                urls = Array.isArray(startUrl) ? startUrl : [startUrl];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context6.prev = 8;

                for (_iterator3 = urls[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  url = _step3.value;

                  binaryArgs.push('--url', url);
                }
                _context6.next = 16;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6['catch'](8);
                _didIteratorError3 = true;
                _iteratorError3 = _context6.t0;

              case 16:
                _context6.prev = 16;
                _context6.prev = 17;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 19:
                _context6.prev = 19;

                if (!_didIteratorError3) {
                  _context6.next = 22;
                  break;
                }

                throw _iteratorError3;

              case 22:
                return _context6.finish(19);

              case 23:
                return _context6.finish(16);

              case 24:
                if (!firefoxArg) {
                  _context6.next = 45;
                  break;
                }

                args = Array.isArray(firefoxArg) ? firefoxArg : [firefoxArg];
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context6.prev = 29;

                for (_iterator4 = args[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  arg = _step4.value;

                  binaryArgs.push(arg);
                }
                _context6.next = 37;
                break;

              case 33:
                _context6.prev = 33;
                _context6.t1 = _context6['catch'](29);
                _didIteratorError4 = true;
                _iteratorError4 = _context6.t1;

              case 37:
                _context6.prev = 37;
                _context6.prev = 38;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 40:
                _context6.prev = 40;

                if (!_didIteratorError4) {
                  _context6.next = 43;
                  break;
                }

                throw _iteratorError4;

              case 43:
                return _context6.finish(40);

              case 44:
                return _context6.finish(37);

              case 45:
                _context6.next = 47;
                return firefoxApp.run(this.profile, {
                  firefoxBinary: firefoxBinary, binaryArgs: binaryArgs
                });

              case 47:
                this.runningInfo = _context6.sent;


                this.runningInfo.firefox.on('close', function () {
                  var _iteratorNormalCompletion5 = true;
                  var _didIteratorError5 = false;
                  var _iteratorError5 = undefined;

                  try {
                    for (var _iterator5 = _this.cleanupCallbacks[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                      var cleanupCb = _step5.value;

                      try {
                        cleanupCb();
                      } catch (error) {
                        log.error('Exception on executing cleanup callback: ' + error);
                      }
                    }
                  } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                      }
                    } finally {
                      if (_didIteratorError5) {
                        throw _iteratorError5;
                      }
                    }
                  }
                });

                if (preInstall) {
                  _context6.next = 94;
                  break;
                }

                _context6.next = 52;
                return firefoxClient({
                  port: this.runningInfo.debuggerPort
                });

              case 52:
                remoteFirefox = this.remoteFirefox = _context6.sent;


                // Install all the temporary addons.
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context6.prev = 56;
                _iterator6 = extensions[Symbol.iterator]();

              case 58:
                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                  _context6.next = 80;
                  break;
                }

                extension = _step6.value;
                _context6.prev = 60;
                _context6.next = 63;
                return remoteFirefox.installTemporaryAddon(extension.sourceDir).then(function (installResult) {
                  return installResult.addon.id;
                });

              case 63:
                addonId = _context6.sent;

                if (addonId) {
                  _context6.next = 66;
                  break;
                }

                throw new _errors.WebExtError('Unexpected missing addonId in the installAsTemporaryAddon result');

              case 66:

                this.reloadableExtensions.set(extension.sourceDir, addonId);
                _context6.next = 77;
                break;

              case 69:
                _context6.prev = 69;
                _context6.t2 = _context6['catch'](60);

                if (!(_context6.t2 instanceof _errors.RemoteTempInstallNotSupported)) {
                  _context6.next = 76;
                  break;
                }

                log.debug('Caught: ' + _context6.t2);
                throw new _errors.WebExtError('Temporary add-on installation is not supported in this version' + ' of Firefox (you need Firefox 49 or higher). For older Firefox' + ' versions, use --pre-install');

              case 76:
                throw _context6.t2;

              case 77:
                _iteratorNormalCompletion6 = true;
                _context6.next = 58;
                break;

              case 80:
                _context6.next = 86;
                break;

              case 82:
                _context6.prev = 82;
                _context6.t3 = _context6['catch'](56);
                _didIteratorError6 = true;
                _iteratorError6 = _context6.t3;

              case 86:
                _context6.prev = 86;
                _context6.prev = 87;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 89:
                _context6.prev = 89;

                if (!_didIteratorError6) {
                  _context6.next = 92;
                  break;
                }

                throw _iteratorError6;

              case 92:
                return _context6.finish(89);

              case 93:
                return _context6.finish(86);

              case 94:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[8, 12, 16, 24], [17,, 19, 23], [29, 33, 37, 45], [38,, 40, 44], [56, 82, 86, 94], [60, 69], [87,, 89, 93]]);
      }));

      function startFirefoxInstance() {
        return _ref10.apply(this, arguments);
      }

      return startFirefoxInstance;
    }()
  }]);
  return FirefoxDesktopExtensionRunner;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/extension-runners/firefox-desktop.js"))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirefoxAndroidExtensionRunner = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _net = __webpack_require__(111);

var _net2 = _interopRequireDefault(_net);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _readline = __webpack_require__(113);

var _readline2 = _interopRequireDefault(_readline);

var _tty = __webpack_require__(80);

var _tty2 = _interopRequireDefault(_tty);

var _tempDir = __webpack_require__(16);

var _adb = __webpack_require__(114);

var _adb2 = _interopRequireDefault(_adb);

var _desktopNotifier = __webpack_require__(58);

var _errors = __webpack_require__(3);

var _firefox = __webpack_require__(42);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(27);

var _logger = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

/**
 * This module provide an ExtensionRunner subclass that manage an extension executed
 * in a Firefox for Android instance.
 */

/**
 * Implements an IExtensionRunner which manages a Firefox for Android instance.
 */
var FirefoxAndroidExtensionRunner = exports.FirefoxAndroidExtensionRunner = function () {
  // Wait 3s before the next unix socket discovery loop.
  function FirefoxAndroidExtensionRunner(params) {
    (0, _classCallCheck3.default)(this, FirefoxAndroidExtensionRunner);

    this.params = params;
    this.cleanupCallbacks = new Set();
    this.adbExtensionsPathBySourceDir = new Map();
    this.reloadableExtensions = new Map();

    // Print warning for not currently supported options (e.g. preInstall,
    // cloned profiles, browser console).
    this.printIgnoredParamsWarnings();
  }
  // Wait for at most 3 minutes before giving up.


  (0, _createClass3.default)(FirefoxAndroidExtensionRunner, [{
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _params, adbBin, adbHost, adbPort, _params$ADBUtils, ADBUtils;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _params = this.params, adbBin = _params.adbBin, adbHost = _params.adbHost, adbPort = _params.adbPort, _params$ADBUtils = _params.ADBUtils, ADBUtils = _params$ADBUtils === undefined ? _adb2.default : _params$ADBUtils;


                this.adbUtils = new ADBUtils({
                  adbBin: adbBin, adbHost: adbHost, adbPort: adbPort
                });

                _context.next = 4;
                return this.adbDevicesDiscoveryAndSelect();

              case 4:
                _context.next = 6;
                return this.apkPackagesDiscoveryAndSelect();

              case 6:
                _context.next = 8;
                return this.adbCheckRuntimePermissions();

              case 8:
                _context.next = 10;
                return this.adbForceStopSelectedPackage();

              case 10:
                _context.next = 12;
                return this.adbPrepareProfileDir();

              case 12:
                _context.next = 14;
                return Promise.all([
                // Start Firefox for Android instance on the created profile.
                this.adbStartSelectedPackage(),

                // Build and push to devices all the extension xpis
                // and keep track of the xpi built and uploaded by extension sourceDir.
                this.buildAndPushExtensions(),

                // Wait for RDP unix socket file created and
                // Create an ADB forward connection on a free tcp port
                this.adbDiscoveryAndForwardRDPUnixSocket()]);

              case 14:
                _context.next = 16;
                return this.rdpInstallExtensions();

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()

    // Method exported from the IExtensionRunner interface.

    /**
     * Returns the runner name.
     */

  }, {
    key: 'getName',
    value: function getName() {
      return 'Firefox Android';
    }

    /**
     * Reloads all the extensions, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadAllExtensions',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var runnerName, reloadErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref4, sourceDir, _ref5, _ref6, res;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                runnerName = this.getName();
                reloadErrors = new Map();
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 5;
                _iterator = this.params.extensions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 19;
                  break;
                }

                _ref4 = _step.value;
                sourceDir = _ref4.sourceDir;
                _context2.next = 12;
                return this.reloadExtensionBySourceDir(sourceDir);

              case 12:
                _ref5 = _context2.sent;
                _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
                res = _ref6[0];

                if (res.reloadError instanceof Error) {
                  reloadErrors.set(sourceDir, res.reloadError);
                }

              case 16:
                _iteratorNormalCompletion = true;
                _context2.next = 7;
                break;

              case 19:
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 25:
                _context2.prev = 25;
                _context2.prev = 26;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 28:
                _context2.prev = 28;

                if (!_didIteratorError) {
                  _context2.next = 31;
                  break;
                }

                throw _iteratorError;

              case 31:
                return _context2.finish(28);

              case 32:
                return _context2.finish(25);

              case 33:
                if (!(reloadErrors.size > 0)) {
                  _context2.next = 35;
                  break;
                }

                return _context2.abrupt('return', [{
                  runnerName: runnerName,
                  reloadError: new _errors.MultiExtensionsReloadError(reloadErrors)
                }]);

              case 35:
                return _context2.abrupt('return', [{ runnerName: runnerName }]);

              case 36:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 21, 25, 33], [26,, 28, 32]]);
      }));

      function reloadAllExtensions() {
        return _ref2.apply(this, arguments);
      }

      return reloadAllExtensions;
    }()

    /**
     * Reloads a single extension, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadExtensionBySourceDir',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(extensionSourceDir) {
        var runnerName, addonId;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                runnerName = this.getName();
                addonId = this.reloadableExtensions.get(extensionSourceDir);

                if (addonId) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: new _errors.WebExtError('Extension not reloadable: ' + ('no addonId has been mapped to "' + extensionSourceDir + '"')),
                  runnerName: runnerName
                }]);

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return this.buildAndPushExtension(extensionSourceDir);

              case 7:
                _context3.next = 9;
                return this.remoteFirefox.reloadAddon(addonId);

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](4);
                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: _context3.t0,
                  runnerName: runnerName
                }]);

              case 14:
                return _context3.abrupt('return', [{ runnerName: runnerName, sourceDir: extensionSourceDir }]);

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 11]]);
      }));

      function reloadExtensionBySourceDir(_x) {
        return _ref7.apply(this, arguments);
      }

      return reloadExtensionBySourceDir;
    }()

    /**
     * Register a callback to be called when the runner has been exited
     * (e.g. the Firefox instance exits or the user has requested web-ext
     * to exit).
     */

  }, {
    key: 'registerCleanup',
    value: function registerCleanup(fn) {
      this.cleanupCallbacks.add(fn);
    }

    /**
     * Exits the runner, by closing the managed Firefox instance.
     */

  }, {
    key: 'exit',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var adbUtils, selectedAdbDevice, selectedArtifactsDir, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, fn;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedArtifactsDir = this.selectedArtifactsDir;


                this.exiting = true;

                // If a Firefox for Android instance has been started,
                // we should ensure that it has been stopped when we exit.
                _context4.next = 4;
                return this.adbForceStopSelectedPackage();

              case 4:
                if (!selectedArtifactsDir) {
                  _context4.next = 8;
                  break;
                }

                log.debug('Cleaning up artifacts directory on the Android device...');
                _context4.next = 8;
                return adbUtils.clearArtifactsDir(selectedAdbDevice);

              case 8:

                // Call all the registered cleanup callbacks.
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 11;
                for (_iterator2 = this.cleanupCallbacks[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  fn = _step2.value;

                  try {
                    fn();
                  } catch (error) {
                    log.error(error);
                  }
                }
                _context4.next = 19;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](11);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t0;

              case 19:
                _context4.prev = 19;
                _context4.prev = 20;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 22:
                _context4.prev = 22;

                if (!_didIteratorError2) {
                  _context4.next = 25;
                  break;
                }

                throw _iteratorError2;

              case 25:
                return _context4.finish(22);

              case 26:
                return _context4.finish(19);

              case 27:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[11, 15, 19, 27], [20,, 22, 26]]);
      }));

      function exit() {
        return _ref8.apply(this, arguments);
      }

      return exit;
    }()

    // Private helper methods.

  }, {
    key: 'getDeviceProfileDir',
    value: function getDeviceProfileDir() {
      return this.selectedArtifactsDir + '/profile';
    }
  }, {
    key: 'printIgnoredParamsWarnings',
    value: function printIgnoredParamsWarnings() {
      if (this.params.profilePath) {
        log.warn('Firefox for Android target does not support custom profile paths.');
      }

      if (this.params.keepProfileChanges) {
        log.warn('Firefox for Android target does not support --keep-profile-changes.');
      }

      if (this.params.browserConsole) {
        log.warn('Firefox for Android target does not support --browser-console option.');
      }

      if (this.params.preInstall) {
        log.warn('Firefox for Android target does not support --pre-install option.');
      }

      if (this.params.startUrl) {
        log.warn('Firefox for Android target does not support --start-url option.');
      }
    }
  }, {
    key: 'adbDevicesDiscoveryAndSelect',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var adbUtils, adbDevice, devices, devicesMsg, foundDevices, _devicesMsg;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                adbUtils = this.adbUtils;
                adbDevice = this.params.adbDevice;
                devices = [];


                log.debug('Listing android devices');
                _context5.next = 6;
                return adbUtils.discoverDevices();

              case 6:
                devices = _context5.sent;

                if (!(devices.length === 0)) {
                  _context5.next = 9;
                  break;
                }

                throw new _errors.UsageError('No Android device found through ADB. ' + 'Make sure the device is connected and USB debugging is enabled.');

              case 9:
                if (adbDevice) {
                  _context5.next = 13;
                  break;
                }

                devicesMsg = devices.map(function (dev) {
                  return ' - ' + dev;
                }).join('\n');

                log.info('\nAndroid devices found:\n' + devicesMsg);
                throw new _errors.UsageError('Select an android device using --android-device=<name>');

              case 13:
                foundDevices = devices.filter(function (device) {
                  return device === adbDevice;
                });

                if (!(foundDevices.length === 0)) {
                  _context5.next = 17;
                  break;
                }

                _devicesMsg = JSON.stringify(devices);
                throw new _errors.UsageError('Android device ' + adbDevice + ' was not found in list: ' + _devicesMsg);

              case 17:

                this.selectedAdbDevice = foundDevices[0];
                log.info('Selected ADB device: ' + this.selectedAdbDevice);

              case 19:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function adbDevicesDiscoveryAndSelect() {
        return _ref9.apply(this, arguments);
      }

      return adbDevicesDiscoveryAndSelect;
    }()
  }, {
    key: 'apkPackagesDiscoveryAndSelect',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var adbUtils, selectedAdbDevice, firefoxApk, packages, pkgsListMsg, filteredPackages, pkgsList;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, firefoxApk = this.params.firefoxApk;
                // Discovery and select a Firefox for Android version.

                _context6.next = 3;
                return adbUtils.discoverInstalledFirefoxAPKs(selectedAdbDevice, firefoxApk);

              case 3:
                packages = _context6.sent;

                if (!(packages.length === 0)) {
                  _context6.next = 6;
                  break;
                }

                throw new _errors.UsageError('No Firefox packages were found on the selected Android device');

              case 6:
                pkgsListMsg = function pkgsListMsg(pkgs) {
                  return pkgs.map(function (pkg) {
                    return ' - ' + pkg;
                  }).join('\n');
                };

                if (firefoxApk) {
                  _context6.next = 14;
                  break;
                }

                log.info('\nPackages found:\n' + pkgsListMsg(packages));

                if (!(packages.length > 1)) {
                  _context6.next = 11;
                  break;
                }

                throw new _errors.UsageError('Select one of the packages using --firefox-apk');

              case 11:

                // If only one APK has been found, select it even if it has not been
                // specified explicitly on the comment line.
                this.selectedFirefoxApk = packages[0];
                log.info('Selected Firefox for Android APK: ' + this.selectedFirefoxApk);
                return _context6.abrupt('return');

              case 14:
                filteredPackages = packages.filter(function (line) {
                  return line === firefoxApk;
                });

                if (!(filteredPackages.length === 0)) {
                  _context6.next = 18;
                  break;
                }

                pkgsList = pkgsListMsg(filteredPackages);
                throw new _errors.UsageError('Package ' + firefoxApk + ' was not found in list: ' + pkgsList);

              case 18:

                this.selectedFirefoxApk = filteredPackages[0];
                log.debug('Selected Firefox for Android APK: ' + this.selectedFirefoxApk);

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function apkPackagesDiscoveryAndSelect() {
        return _ref10.apply(this, arguments);
      }

      return apkPackagesDiscoveryAndSelect;
    }()
  }, {
    key: 'adbForceStopSelectedPackage',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk;


                log.info('Stopping existing instances of ' + selectedFirefoxApk + '...');
                _context7.next = 4;
                return adbUtils.amForceStopAPK(selectedAdbDevice, selectedFirefoxApk);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function adbForceStopSelectedPackage() {
        return _ref11.apply(this, arguments);
      }

      return adbForceStopSelectedPackage;
    }()
  }, {
    key: 'adbCheckRuntimePermissions',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk, androidVersion;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk;


                log.debug('Discovering Android version for ' + selectedAdbDevice + '...');

                _context8.next = 4;
                return adbUtils.getAndroidVersionNumber(selectedAdbDevice);

              case 4:
                androidVersion = _context8.sent;

                if (!(typeof androidVersion !== 'number' || Number.isNaN(androidVersion))) {
                  _context8.next = 7;
                  break;
                }

                throw new _errors.WebExtError('Invalid Android version: ' + androidVersion);

              case 7:

                log.debug('Detected Android version ' + androidVersion);

                if (!(androidVersion < 23)) {
                  _context8.next = 10;
                  break;
                }

                return _context8.abrupt('return');

              case 10:

                log.debug('Checking read/write permissions needed for web-ext' + ('on ' + selectedFirefoxApk + '...'));

                // Runtime permission needed to be able to run Firefox on a temporarily created profile
                // on android versions >= 23 (Android Marshmallow, which is the first version where
                // these permissions are optional and have to be granted explicitly).
                _context8.next = 13;
                return adbUtils.ensureRequiredAPKRuntimePermissions(selectedAdbDevice, selectedFirefoxApk, ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);

              case 13:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function adbCheckRuntimePermissions() {
        return _ref12.apply(this, arguments);
      }

      return adbCheckRuntimePermissions;
    }()
  }, {
    key: 'adbPrepareProfileDir',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk, firefoxApp, profile, deviceProfileDir;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk, firefoxApp = this.params.firefoxApp;
                // Create the preferences file and the Fennec temporary profile.

                log.debug('Preparing a temporary profile for ' + selectedFirefoxApk + '...');

                _context9.next = 4;
                return firefoxApp.createProfile({ app: 'fennec' });

              case 4:
                profile = _context9.sent;
                _context9.next = 7;
                return adbUtils.getOrCreateArtifactsDir(selectedAdbDevice);

              case 7:
                this.selectedArtifactsDir = _context9.sent;
                deviceProfileDir = this.getDeviceProfileDir();
                _context9.next = 11;
                return adbUtils.runShellCommand(selectedAdbDevice, ['mkdir', '-p', deviceProfileDir]);

              case 11:
                _context9.next = 13;
                return adbUtils.pushFile(selectedAdbDevice, _path2.default.join(profile.profileDir, 'user.js'), deviceProfileDir + '/user.js');

              case 13:

                log.debug('Created temporary profile at ' + deviceProfileDir + '.');

              case 14:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function adbPrepareProfileDir() {
        return _ref13.apply(this, arguments);
      }

      return adbPrepareProfileDir;
    }()
  }, {
    key: 'adbStartSelectedPackage',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var adbUtils, selectedFirefoxApk, selectedAdbDevice, deviceProfileDir;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                adbUtils = this.adbUtils, selectedFirefoxApk = this.selectedFirefoxApk, selectedAdbDevice = this.selectedAdbDevice;
                deviceProfileDir = this.getDeviceProfileDir();


                log.info('Starting ' + selectedFirefoxApk + '...');

                log.debug('Using profile ' + deviceProfileDir);

                _context10.next = 6;
                return adbUtils.startFirefoxAPK(selectedAdbDevice, selectedFirefoxApk, deviceProfileDir);

              case 6:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function adbStartSelectedPackage() {
        return _ref14.apply(this, arguments);
      }

      return adbStartSelectedPackage;
    }()
  }, {
    key: 'buildAndPushExtension',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(sourceDir) {
        var _this = this;

        var adbUtils, selectedAdbDevice, selectedArtifactsDir, buildSourceDir;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedArtifactsDir = this.selectedArtifactsDir, buildSourceDir = this.params.buildSourceDir;
                _context12.next = 3;
                return (0, _tempDir.withTempDir)(function () {
                  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(tmpDir) {
                    var _ref17, extensionPath, extFileName, adbExtensionPath;

                    return _regenerator2.default.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.next = 2;
                            return buildSourceDir(sourceDir, tmpDir.path());

                          case 2:
                            _ref17 = _context11.sent;
                            extensionPath = _ref17.extensionPath;
                            extFileName = _path2.default.basename(extensionPath, '.zip');
                            adbExtensionPath = _this.adbExtensionsPathBySourceDir.get(sourceDir);


                            if (!adbExtensionPath) {
                              adbExtensionPath = selectedArtifactsDir + '/' + extFileName + '.xpi';
                            }

                            log.debug('Uploading ' + extFileName + ' on the android device');

                            _context11.next = 10;
                            return adbUtils.pushFile(selectedAdbDevice, extensionPath, adbExtensionPath);

                          case 10:

                            log.debug('Upload completed: ' + adbExtensionPath);

                            _this.adbExtensionsPathBySourceDir.set(sourceDir, adbExtensionPath);

                          case 12:
                          case 'end':
                            return _context11.stop();
                        }
                      }
                    }, _callee11, _this);
                  }));

                  return function (_x3) {
                    return _ref16.apply(this, arguments);
                  };
                }());

              case 3:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function buildAndPushExtension(_x2) {
        return _ref15.apply(this, arguments);
      }

      return buildAndPushExtension;
    }()
  }, {
    key: 'buildAndPushExtensions',
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref20, sourceDir;

        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context13.prev = 3;
                _iterator3 = this.params.extensions[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context13.next = 13;
                  break;
                }

                _ref20 = _step3.value;
                sourceDir = _ref20.sourceDir;
                _context13.next = 10;
                return this.buildAndPushExtension(sourceDir);

              case 10:
                _iteratorNormalCompletion3 = true;
                _context13.next = 5;
                break;

              case 13:
                _context13.next = 19;
                break;

              case 15:
                _context13.prev = 15;
                _context13.t0 = _context13['catch'](3);
                _didIteratorError3 = true;
                _iteratorError3 = _context13.t0;

              case 19:
                _context13.prev = 19;
                _context13.prev = 20;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 22:
                _context13.prev = 22;

                if (!_didIteratorError3) {
                  _context13.next = 25;
                  break;
                }

                throw _iteratorError3;

              case 25:
                return _context13.finish(22);

              case 26:
                return _context13.finish(19);

              case 27:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[3, 15, 19, 27], [20,, 22, 26]]);
      }));

      function buildAndPushExtensions() {
        return _ref18.apply(this, arguments);
      }

      return buildAndPushExtensions;
    }()
  }, {
    key: 'adbDiscoveryAndForwardRDPUnixSocket',
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk, firefoxAndroidTimeout, stdin, unixSocketDiscoveryRetryInterval, unixSocketDiscoveryMaxTime, handleCtrlC, tcpPort;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk, firefoxAndroidTimeout = this.params.firefoxAndroidTimeout;
                stdin = this.params.stdin || process.stdin;
                unixSocketDiscoveryRetryInterval = FirefoxAndroidExtensionRunner.unixSocketDiscoveryRetryInterval;
                unixSocketDiscoveryMaxTime = FirefoxAndroidExtensionRunner.unixSocketDiscoveryMaxTime;


                if (typeof firefoxAndroidTimeout === 'number') {
                  unixSocketDiscoveryMaxTime = firefoxAndroidTimeout;
                }

                handleCtrlC = function handleCtrlC(str, key) {
                  if (key.ctrl && key.name === 'c') {
                    adbUtils.setUserAbortDiscovery(true);
                  }
                };

                // TODO: use noInput property to decide if we should
                // disable direct keypress handling.


                if (stdin.isTTY && stdin instanceof _tty2.default.ReadStream) {
                  _readline2.default.emitKeypressEvents(stdin);
                  stdin.setRawMode(true);

                  stdin.on('keypress', handleCtrlC);
                }

                _context14.prev = 7;
                _context14.next = 10;
                return adbUtils.discoverRDPUnixSocket(selectedAdbDevice, selectedFirefoxApk, {
                  maxDiscoveryTime: unixSocketDiscoveryMaxTime,
                  retryInterval: unixSocketDiscoveryRetryInterval
                });

              case 10:
                this.selectedRDPSocketFile = _context14.sent;

              case 11:
                _context14.prev = 11;

                if (stdin.isTTY && stdin instanceof _tty2.default.ReadStream) {
                  stdin.removeListener('keypress', handleCtrlC);
                }
                return _context14.finish(11);

              case 14:

                log.debug('RDP Socket File selected: ' + this.selectedRDPSocketFile);

                _context14.next = 17;
                return this.chooseLocalTcpPort();

              case 17:
                tcpPort = _context14.sent;


                // Log the choosen tcp port at info level (useful to the user to be able
                // to connect the Firefox DevTools to the Firefox for Android instance).
                log.info('You can connect to this Android device on TCP port ' + tcpPort);

                _context14.next = 21;
                return adbUtils.setupForward(selectedAdbDevice, 'localfilesystem:' + this.selectedRDPSocketFile, 'tcp:' + tcpPort);

              case 21:

                this.selectedTCPPort = tcpPort;

              case 22:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[7,, 11, 14]]);
      }));

      function adbDiscoveryAndForwardRDPUnixSocket() {
        return _ref21.apply(this, arguments);
      }

      return adbDiscoveryAndForwardRDPUnixSocket;
    }()
  }, {
    key: 'chooseLocalTcpPort',
    value: function chooseLocalTcpPort() {
      return new Promise(function (resolve) {
        var srv = _net2.default.createServer();
        // $FLOW_FIXME: flow has his own opinions on this method signature.
        srv.listen(0, function () {
          var freeTcpPort = srv.address().port;
          srv.close();
          resolve(freeTcpPort);
        });
      });
    }
  }, {
    key: 'rdpInstallExtensions',
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
        var _this2 = this;

        var selectedTCPPort, _params2, extensions, firefoxClient, remoteFirefox, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, extension, sourceDir, adbExtensionPath, addonId;

        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                selectedTCPPort = this.selectedTCPPort, _params2 = this.params, extensions = _params2.extensions, firefoxClient = _params2.firefoxClient;
                _context15.next = 3;
                return firefoxClient({
                  port: selectedTCPPort
                });

              case 3:
                remoteFirefox = this.remoteFirefox = _context15.sent;


                // Exit and cleanup the extension runner if the connection to the
                // remote Firefox for Android instance has been closed.
                remoteFirefox.client.on('end', function () {
                  if (!_this2.exiting) {
                    log.info('Exiting the device because Firefox for Android disconnected');
                    _this2.exit();
                  }
                });

                // Install all the temporary addons.
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context15.prev = 8;
                _iterator4 = extensions[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context15.next = 25;
                  break;
                }

                extension = _step4.value;
                sourceDir = extension.sourceDir;
                adbExtensionPath = this.adbExtensionsPathBySourceDir.get(sourceDir);

                if (adbExtensionPath) {
                  _context15.next = 16;
                  break;
                }

                throw new _errors.WebExtError('ADB extension path for "' + sourceDir + '" was unexpectedly empty');

              case 16:
                _context15.next = 18;
                return remoteFirefox.installTemporaryAddon(adbExtensionPath).then(function (installResult) {
                  return installResult.addon.id;
                });

              case 18:
                addonId = _context15.sent;

                if (addonId) {
                  _context15.next = 21;
                  break;
                }

                throw new _errors.WebExtError('Received an empty addonId from ' + ('remoteFirefox.installTemporaryAddon("' + adbExtensionPath + '")'));

              case 21:

                this.reloadableExtensions.set(extension.sourceDir, addonId);

              case 22:
                _iteratorNormalCompletion4 = true;
                _context15.next = 10;
                break;

              case 25:
                _context15.next = 31;
                break;

              case 27:
                _context15.prev = 27;
                _context15.t0 = _context15['catch'](8);
                _didIteratorError4 = true;
                _iteratorError4 = _context15.t0;

              case 31:
                _context15.prev = 31;
                _context15.prev = 32;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 34:
                _context15.prev = 34;

                if (!_didIteratorError4) {
                  _context15.next = 37;
                  break;
                }

                throw _iteratorError4;

              case 37:
                return _context15.finish(34);

              case 38:
                return _context15.finish(31);

              case 39:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this, [[8, 27, 31, 39], [32,, 34, 38]]);
      }));

      function rdpInstallExtensions() {
        return _ref22.apply(this, arguments);
      }

      return rdpInstallExtensions;
    }()
  }]);
  return FirefoxAndroidExtensionRunner;
}();

FirefoxAndroidExtensionRunner.unixSocketDiscoveryRetryInterval = 3 * 1000;
FirefoxAndroidExtensionRunner.unixSocketDiscoveryMaxTime = 3 * 60 * 1000;
/* WEBPACK VAR INJECTION */}.call(exports, "src/extension-runners/firefox-android.js"))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discoverConfigFiles = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = __webpack_require__(50);

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var discoverConfigFiles = exports.discoverConfigFiles = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var _this = this;

    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$getHomeDir = _ref3.getHomeDir,
        getHomeDir = _ref3$getHomeDir === undefined ? _os2.default.homedir : _ref3$getHomeDir;

    var magicConfigName, possibleConfigs, configs, existingConfigs;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            magicConfigName = 'web-ext-config.js';

            // Config files will be loaded in this order.

            possibleConfigs = [
            // Look for a magic hidden config (preceded by dot) in home dir.
            _path2.default.join(getHomeDir(), '.' + magicConfigName),
            // Look for webExt key inside package.json file
            _path2.default.join(process.cwd(), 'package.json'),
            // Look for a magic config in the current working directory.
            _path2.default.join(process.cwd(), magicConfigName)];
            _context2.next = 4;
            return Promise.all(possibleConfigs.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileName) {
                var resolvedFileName;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        resolvedFileName = _path2.default.resolve(fileName);
                        _context.next = 3;
                        return (0, _fileExists2.default)(resolvedFileName);

                      case 3:
                        if (!_context.sent) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt('return', resolvedFileName);

                      case 7:
                        log.debug('Discovered config "' + resolvedFileName + '" does not ' + 'exist or is not readable');
                        return _context.abrupt('return', undefined);

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x2) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 4:
            configs = _context2.sent;
            existingConfigs = [];

            configs.forEach(function (f) {
              if (typeof f === 'string') {
                existingConfigs.push(f);
              }
            });
            return _context2.abrupt('return', existingConfigs);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function discoverConfigFiles() {
    return _ref2.apply(this, arguments);
  };
}();

exports.applyConfigToArgv = applyConfigToArgv;
exports.loadJSConfigFile = loadJSConfigFile;

var _os = __webpack_require__(118);

var _os2 = _interopRequireDefault(_os);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _requireUncached = __webpack_require__(237);

var _requireUncached2 = _interopRequireDefault(_requireUncached);

var _camelcase = __webpack_require__(119);

var _camelcase2 = _interopRequireDefault(_camelcase);

var _decamelize = __webpack_require__(238);

var _decamelize2 = _interopRequireDefault(_decamelize);

var _fileExists = __webpack_require__(116);

var _fileExists2 = _interopRequireDefault(_fileExists);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

function applyConfigToArgv(_ref) {
  var argv = _ref.argv,
      argvFromCLI = _ref.argvFromCLI,
      configObject = _ref.configObject,
      options = _ref.options,
      configFileName = _ref.configFileName;

  var newArgv = (0, _extends3.default)({}, argv);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(configObject)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      if ((0, _camelcase2.default)(option) !== option) {
        throw new _errors.UsageError('The config option "' + option + '" must be ' + ('specified in camel case: "' + (0, _camelcase2.default)(option) + '"'));
      }

      // A config option cannot be a sub-command config
      // object if it is an array.
      if (!Array.isArray(configObject[option]) && (0, _typeof3.default)(options[option]) === 'object' && (0, _typeof3.default)(configObject[option]) === 'object') {
        // Descend into the nested configuration for a sub-command.
        newArgv = applyConfigToArgv({
          argv: newArgv,
          argvFromCLI: argvFromCLI,
          configObject: configObject[option],
          options: options[option],
          configFileName: configFileName });
        continue;
      }

      var decamelizedOptName = (0, _decamelize2.default)(option, '-');

      if ((0, _typeof3.default)(options[decamelizedOptName]) !== 'object') {
        throw new _errors.UsageError('The config file at ' + configFileName + ' specified ' + ('an unknown option: "' + option + '"'));
      }
      if (options[decamelizedOptName].type === undefined) {
        // This means yargs option type wasn't not defined correctly
        throw new _errors.WebExtError('Option: ' + option + ' was defined without a type.');
      }

      var expectedType = options[decamelizedOptName].type === 'count' ? 'number' : options[decamelizedOptName].type;

      var optionType = Array.isArray(configObject[option]) ? 'array' : (0, _typeof3.default)(configObject[option]);

      if (optionType !== expectedType) {
        throw new _errors.UsageError('The config file at ' + configFileName + ' specified ' + ('the type of "' + option + '" incorrectly as "' + optionType + '"') + (' (expected type "' + expectedType + '")'));
      }

      var defaultValue = void 0;
      if (options[decamelizedOptName]) {
        if (options[decamelizedOptName].default !== undefined) {
          defaultValue = options[decamelizedOptName].default;
        } else if (expectedType === 'boolean') {
          defaultValue = false;
        }
      }

      // This is our best effort (without patching yargs) to detect
      // if a value was set on the CLI instead of in the config.
      // It looks for a default value and if the argv value is
      // different, it assumes that the value was configured on the CLI.

      var wasValueSetOnCLI = typeof argvFromCLI[option] !== 'undefined' && argvFromCLI[option] !== defaultValue;
      if (wasValueSetOnCLI) {
        log.debug('Favoring CLI: ' + option + '=' + argvFromCLI[option] + ' over ' + ('configuration: ' + option + '=' + configObject[option]));
        newArgv[option] = argvFromCLI[option];
        continue;
      }

      newArgv[option] = configObject[option];

      var coerce = options[decamelizedOptName].coerce;
      if (coerce) {
        log.debug('Calling coerce() on configured value for ' + option);
        newArgv[option] = coerce(newArgv[option]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newArgv;
}

function loadJSConfigFile(filePath) {
  var resolvedFilePath = _path2.default.resolve(filePath);
  log.debug('Loading JS config file: "' + filePath + '" ' + ('(resolved to "' + resolvedFilePath + '")'));
  var configObject = void 0;
  try {
    configObject = (0, _requireUncached2.default)(resolvedFilePath);
  } catch (error) {
    log.debug('Handling error:', error);
    throw new _errors.UsageError('Cannot read config file: ' + resolvedFilePath + '\n' + ('Error: ' + error.message));
  }
  if (filePath.endsWith('package.json')) {
    log.debug('Looking for webExt key inside package.json file');
    configObject = configObject.webExt || {};
  }
  if (Object.keys(configObject).length === 0) {
    log.debug('Config file ' + resolvedFilePath + ' did not define any options. ' + 'Did you set module.exports = {...}?');
  }
  return configObject;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/config.js"))

/***/ }),
/* 87 */
/***/ (function(module, exports) {



/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(36);
var $export = __webpack_require__(19);
var redefine = __webpack_require__(90);
var hide = __webpack_require__(24);
var Iterators = __webpack_require__(29);
var $iterCreate = __webpack_require__(130);
var setToStringTag = __webpack_require__(46);
var getPrototypeOf = __webpack_require__(134);
var ITERATOR = __webpack_require__(13)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(23) && !__webpack_require__(37)(function () {
  return Object.defineProperty(__webpack_require__(63)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(25);
var toIObject = __webpack_require__(30);
var arrayIndexOf = __webpack_require__(132)(false);
var IE_PROTO = __webpack_require__(67)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(39);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(12).document;
module.exports = document && document.documentElement;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(20);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(29);
var ITERATOR = __webpack_require__(13)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(20);
var aFunction = __webpack_require__(43);
var SPECIES = __webpack_require__(13)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(28);
var invoke = __webpack_require__(141);
var html = __webpack_require__(93);
var cel = __webpack_require__(63);
var global = __webpack_require__(12);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(39)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(20);
var isObject = __webpack_require__(22);
var newPromiseCapability = __webpack_require__(73);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(13)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("parse-json");

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(91);
var hiddenKeys = __webpack_require__(69).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(51);
var createDesc = __webpack_require__(38);
var toIObject = __webpack_require__(30);
var toPrimitive = __webpack_require__(64);
var has = __webpack_require__(25);
var IE8_DOM_DEFINE = __webpack_require__(89);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("es6-error");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = require("firefox-profile");

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDirectory;

var _mz = __webpack_require__(9);

var _errors = __webpack_require__(3);

/*
 * Resolves true if the path is a readable directory.
 *
 * Usage:
 *
 * isDirectory('/some/path')
 *  .then((dirExists) => {
 *    // dirExists will be true or false.
 *  });
 *
 * */
function isDirectory(path) {
  return _mz.fs.stat(path).then(function (stats) {
    return stats.isDirectory();
  }).catch((0, _errors.onlyErrorsWithCode)(['ENOENT', 'ENOTDIR'], function () {
    return false;
  }));
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var select = __webpack_require__(110),
    extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17);

module.exports = JSObject;

function JSObject(client, obj) {
  this.initialize(client, obj.actor);
  this.obj = obj;
}

JSObject.prototype = extend(ClientMethods, {
  type: "object",

  get class() {
    return this.obj.class;
  },

  get name() {
    return this.obj.name;
  },

  get displayName() {
    return this.obj.displayName;
  },

  ownPropertyNames: function(cb) {
    this.request('ownPropertyNames', function(resp) {
      return resp.ownPropertyNames;
    }, cb);
  },

  ownPropertyDescriptor: function(name, cb) {
    this.request('property', { name: name }, function(resp) {
      return this.transformDescriptor(resp.descriptor);
    }.bind(this), cb);
  },

  ownProperties: function(cb) {
    this.request('prototypeAndProperties', function(resp) {
      return this.transformProperties(resp.ownProperties);
    }.bind(this), cb);
  },

  prototype: function(cb) {
    this.request('prototype', function(resp) {
      return this.createJSObject(resp.prototype);
    }.bind(this), cb);
  },

  ownPropertiesAndPrototype: function(cb) {
    this.request('prototypeAndProperties', function(resp) {
      resp.ownProperties = this.transformProperties(resp.ownProperties);
      resp.safeGetterValues = this.transformGetters(resp.safeGetterValues);
      resp.prototype = this.createJSObject(resp.prototype);

      return resp;
    }.bind(this), cb);
  },

  /* helpers */
  transformProperties: function(props) {
    var transformed = {};
    for (var prop in props) {
      transformed[prop] = this.transformDescriptor(props[prop]);
    }
    return transformed;
  },

  transformGetters: function(getters) {
    var transformed = {};
    for (var prop in getters) {
      transformed[prop] = this.transformGetter(getters[prop]);
    }
    return transformed;
  },

  transformDescriptor: function(descriptor) {
    descriptor.value = this.createJSObject(descriptor.value);
    return descriptor;
  },

  transformGetter: function(getter) {
    return {
      value: this.createJSObject(getter.getterValue),
      prototypeLevel: getter.getterPrototypeLevel,
      enumerable: getter.enumerable,
      writable: getter.writable
    }
  }
})

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("js-select");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiExtensionRunner = exports.createExtensionRunner = undefined;

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createExtensionRunner = exports.createExtensionRunner = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
    var _require, FirefoxDesktopExtensionRunner, _require2, FirefoxAndroidExtensionRunner;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = config.target;
            _context.next = _context.t0 === 'firefox-desktop' ? 3 : _context.t0 === 'firefox-android' ? 5 : 7;
            break;

          case 3:
            // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
            _require = __webpack_require__(83), FirefoxDesktopExtensionRunner = _require.FirefoxDesktopExtensionRunner;
            return _context.abrupt('return', new FirefoxDesktopExtensionRunner(config.params));

          case 5:
            // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
            _require2 = __webpack_require__(84), FirefoxAndroidExtensionRunner = _require2.FirefoxAndroidExtensionRunner;
            return _context.abrupt('return', new FirefoxAndroidExtensionRunner(config.params));

          case 7:
            throw new _errors.WebExtError('Unknown target: "' + config.target + '"');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createExtensionRunner(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Implements an IExtensionRunner which allow the caller to
 * manage multiple extension runners at the same time (e.g. by running
 * a Firefox Desktop instance alongside to a Firefox for Android instance).
 */


exports.defaultWatcherCreator = defaultWatcherCreator;
exports.defaultReloadStrategy = defaultReloadStrategy;

var _readline = __webpack_require__(113);

var _readline2 = _interopRequireDefault(_readline);

var _tty = __webpack_require__(80);

var _tty2 = _interopRequireDefault(_tty);

var _errors = __webpack_require__(3);

var _desktopNotifier = __webpack_require__(58);

var _logger = __webpack_require__(0);

var _fileFilter = __webpack_require__(40);

var _watcher = __webpack_require__(75);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var MultiExtensionRunner = exports.MultiExtensionRunner = function () {
  function MultiExtensionRunner(params) {
    (0, _classCallCheck3.default)(this, MultiExtensionRunner);

    this.extensionRunners = params.runners;
    this.desktopNotifications = params.desktopNotifications;
  }

  // Method exported from the IExtensionRunner interface.

  /**
   * Returns the runner name.
   */


  (0, _createClass3.default)(MultiExtensionRunner, [{
    key: 'getName',
    value: function getName() {
      return 'Multi Extension Runner';
    }

    /**
     * Call the `run` method on all the managed extension runners,
     * and awaits that all the runners has been successfully started.
     */

  }, {
    key: 'run',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var promises, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, runner;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promises = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;

                for (_iterator = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  runner = _step.value;

                  promises.push(runner.run());
                }

                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 12:
                _context2.prev = 12;
                _context2.prev = 13;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 15:
                _context2.prev = 15;

                if (!_didIteratorError) {
                  _context2.next = 18;
                  break;
                }

                throw _iteratorError;

              case 18:
                return _context2.finish(15);

              case 19:
                return _context2.finish(12);

              case 20:
                _context2.next = 22;
                return Promise.all(promises);

              case 22:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      function run() {
        return _ref2.apply(this, arguments);
      }

      return run;
    }()

    /**
     * Reloads all the extensions on all the managed extension runners,
     * collect any reload error, and resolves to an array composed by
     * a ExtensionRunnerReloadResult object per managed runner.
     *
     * Any detected reload error is also logged on the terminal and shows as a
     * desktop notification.
     */

  }, {
    key: 'reloadAllExtensions',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _this = this;

        var promises, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                log.debug('Reloading all reloadable add-ons');

                promises = [];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 5;

                _loop = function _loop() {
                  var runner = _step2.value;

                  var reloadPromise = runner.reloadAllExtensions().then(function () {
                    return { runnerName: runner.getName() };
                  }, function (error) {
                    return {
                      runnerName: runner.getName(),
                      reloadError: error
                    };
                  });

                  promises.push(reloadPromise);
                };

                for (_iterator2 = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _loop();
                }

                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](5);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t0;

              case 14:
                _context3.prev = 14;
                _context3.prev = 15;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 17:
                _context3.prev = 17;

                if (!_didIteratorError2) {
                  _context3.next = 20;
                  break;
                }

                throw _iteratorError2;

              case 20:
                return _context3.finish(17);

              case 21:
                return _context3.finish(14);

              case 22:
                _context3.next = 24;
                return Promise.all(promises).then(function (results) {
                  _this.handleReloadResults(results);
                  return results;
                });

              case 24:
                return _context3.abrupt('return', _context3.sent);

              case 25:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 10, 14, 22], [15,, 17, 21]]);
      }));

      function reloadAllExtensions() {
        return _ref3.apply(this, arguments);
      }

      return reloadAllExtensions;
    }()

    /**
     * Reloads a single extension on all the managed extension runners,
     * collect any reload error and resolves to an array composed by
     * a ExtensionRunnerReloadResult object per managed runner.
     *
     * Any detected reload error is also logged on the terminal and shows as a
     * desktop notification.
     */

  }, {
    key: 'reloadExtensionBySourceDir',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(sourceDir) {
        var _this2 = this;

        var promises, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop2, _iterator3, _step3;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                log.debug('Reloading add-on at ' + sourceDir);

                promises = [];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 5;

                _loop2 = function _loop2() {
                  var runner = _step3.value;

                  var reloadPromise = runner.reloadExtensionBySourceDir(sourceDir).then(function () {
                    return { runnerName: runner.getName(), sourceDir: sourceDir };
                  }, function (error) {
                    return {
                      runnerName: runner.getName(),
                      reloadError: error,
                      sourceDir: sourceDir
                    };
                  });

                  promises.push(reloadPromise);
                };

                for (_iterator3 = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _loop2();
                }

                // $FLOW_FIXME: When upgrading to Flow 0.61.0, it could not follow the type of sourceDir in the array of promises.
                _context4.next = 14;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4['catch'](5);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t0;

              case 14:
                _context4.prev = 14;
                _context4.prev = 15;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 17:
                _context4.prev = 17;

                if (!_didIteratorError3) {
                  _context4.next = 20;
                  break;
                }

                throw _iteratorError3;

              case 20:
                return _context4.finish(17);

              case 21:
                return _context4.finish(14);

              case 22:
                _context4.next = 24;
                return Promise.all(promises).then(function (results) {
                  _this2.handleReloadResults(results);
                  return results;
                });

              case 24:
                return _context4.abrupt('return', _context4.sent);

              case 25:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 10, 14, 22], [15,, 17, 21]]);
      }));

      function reloadExtensionBySourceDir(_x2) {
        return _ref4.apply(this, arguments);
      }

      return reloadExtensionBySourceDir;
    }()

    /**
     * Register a callback to be called when all the managed runners has been exited.
     */

  }, {
    key: 'registerCleanup',
    value: function registerCleanup(cleanupCallback) {
      var promises = [];

      // Create a promise for every extension runner managed by this instance,
      // the promise will be resolved when the particular runner calls its
      // registered cleanup callbacks.
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop3 = function _loop3() {
          var runner = _step4.value;

          promises.push(new Promise(function (resolve) {
            runner.registerCleanup(resolve);
          }));
        };

        for (var _iterator4 = this.extensionRunners[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop3();
        }

        // Wait for all the created promises to be resolved or rejected
        // (once each one of the runners has cleaned up) and then call
        // the cleanup callback registered to this runner.
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      Promise.all(promises).then(cleanupCallback, cleanupCallback);
    }

    /**
     * Exits all the managed runner has been exited.
     */

  }, {
    key: 'exit',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var promises, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _runner;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                promises = [];
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context5.prev = 4;

                for (_iterator5 = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  _runner = _step5.value;

                  promises.push(_runner.exit());
                }

                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](4);
                _didIteratorError5 = true;
                _iteratorError5 = _context5.t0;

              case 12:
                _context5.prev = 12;
                _context5.prev = 13;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 15:
                _context5.prev = 15;

                if (!_didIteratorError5) {
                  _context5.next = 18;
                  break;
                }

                throw _iteratorError5;

              case 18:
                return _context5.finish(15);

              case 19:
                return _context5.finish(12);

              case 20:
                _context5.next = 22;
                return Promise.all(promises);

              case 22:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      function exit() {
        return _ref5.apply(this, arguments);
      }

      return exit;
    }()

    // Private helper methods.

  }, {
    key: 'handleReloadResults',
    value: function handleReloadResults(results) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = results[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _ref7 = _step6.value;
          var runnerName = _ref7.runnerName,
              reloadError = _ref7.reloadError,
              _sourceDir = _ref7.sourceDir;

          if (reloadError instanceof Error) {
            var message = 'Error occurred while reloading';
            if (_sourceDir) {
              message += ' "' + _sourceDir + '" ';
            }

            message += 'on "' + runnerName + '" - ' + reloadError.message;

            log.error('\n' + message);
            log.debug(reloadError.stack);

            this.desktopNotifications({
              title: 'web-ext run: extension reload error',
              message: message
            });
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }]);
  return MultiExtensionRunner;
}();

// defaultWatcherCreator types and implementation.

function defaultWatcherCreator(_ref8) {
  var reloadExtension = _ref8.reloadExtension,
      sourceDir = _ref8.sourceDir,
      artifactsDir = _ref8.artifactsDir,
      ignoreFiles = _ref8.ignoreFiles,
      _ref8$onSourceChange = _ref8.onSourceChange,
      onSourceChange = _ref8$onSourceChange === undefined ? _watcher2.default : _ref8$onSourceChange,
      _ref8$createFileFilte = _ref8.createFileFilter,
      createFileFilter = _ref8$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref8$createFileFilte;

  var fileFilter = createFileFilter({ sourceDir: sourceDir, artifactsDir: artifactsDir, ignoreFiles: ignoreFiles });
  return onSourceChange({
    sourceDir: sourceDir,
    artifactsDir: artifactsDir,
    onChange: function onChange() {
      return reloadExtension(sourceDir);
    },
    shouldWatchFile: function shouldWatchFile(file) {
      return fileFilter.wantFile(file);
    }
  });
}

// defaultReloadStrategy types and implementation.

function defaultReloadStrategy(_ref9) {
  var artifactsDir = _ref9.artifactsDir,
      extensionRunner = _ref9.extensionRunner,
      ignoreFiles = _ref9.ignoreFiles,
      _ref9$noInput = _ref9.noInput,
      noInput = _ref9$noInput === undefined ? false : _ref9$noInput,
      sourceDir = _ref9.sourceDir;

  var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref10$createWatcher = _ref10.createWatcher,
      createWatcher = _ref10$createWatcher === undefined ? defaultWatcherCreator : _ref10$createWatcher,
      _ref10$stdin = _ref10.stdin,
      stdin = _ref10$stdin === undefined ? process.stdin : _ref10$stdin,
      _ref10$kill = _ref10.kill,
      kill = _ref10$kill === undefined ? process.kill : _ref10$kill;

  var allowInput = !noInput;
  if (!allowInput) {
    log.debug('Input has been disabled because of noInput==true');
  }

  var watcher = createWatcher({
    reloadExtension: function reloadExtension(watchedSourceDir) {
      extensionRunner.reloadExtensionBySourceDir(watchedSourceDir);
    },
    sourceDir: sourceDir,
    artifactsDir: artifactsDir,
    ignoreFiles: ignoreFiles
  });

  extensionRunner.registerCleanup(function () {
    watcher.close();
    if (allowInput) {
      stdin.pause();
    }
  });

  if (allowInput && stdin instanceof _tty2.default.ReadStream && stdin.isTTY) {
    _readline2.default.emitKeypressEvents(stdin);
    stdin.setRawMode(true);

    var keypressUsageInfo = 'Press R to reload (and Ctrl-C to quit)';

    // NOTE: this `Promise.resolve().then(...)` is basically used to spawn a "co-routine"
    // that is executed before the callback attached to the Promise returned by this function
    // (and it allows the `run` function to not be stuck in the while loop).
    Promise.resolve().then((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var userExit, keyPressed;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              log.info(keypressUsageInfo);

              userExit = false;

            case 2:
              if (userExit) {
                _context6.next = 9;
                break;
              }

              _context6.next = 5;
              return new Promise(function (resolve) {
                stdin.once('keypress', function (str, key) {
                  return resolve(key);
                });
              });

            case 5:
              keyPressed = _context6.sent;


              if (keyPressed.ctrl && keyPressed.name === 'c') {
                userExit = true;
              } else if (keyPressed.name === 'z') {
                // Prepare to suspend.

                // NOTE: Switch the raw mode off before suspending (needed to make the keypress event
                // to work correctly when the nodejs process is resumed).
                if (stdin instanceof _tty2.default.ReadStream) {
                  stdin.setRawMode(false);
                }

                log.info('\nweb-ext has been suspended on user request');
                kill(process.pid, 'SIGTSTP');

                // Prepare to resume.

                log.info('\nweb-ext has been resumed. ' + keypressUsageInfo);
                // Switch the raw mode on on resume.
                if (stdin instanceof _tty2.default.ReadStream) {
                  stdin.setRawMode(true);
                }
              } else if (keyPressed.name === 'r') {
                log.debug('Reloading installed extensions on user request');
                extensionRunner.reloadAllExtensions();
              }
              _context6.next = 2;
              break;

            case 9:

              log.info('\nExiting web-ext on user request');
              extensionRunner.exit();

            case 11:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/extension-runners/index.js"))

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Helper function used to raise an UsageError when the adb binary has not been found.
var wrapADBCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asyncFn) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return asyncFn();

          case 3:
            return _context.abrupt('return', _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            if (!((0, _errors.isErrorWithCode)('ENOENT', _context.t0) && _context.t0.message.includes('spawn adb'))) {
              _context.next = 10;
              break;
            }

            throw new _errors.UsageError('No adb executable has been found. ' + 'You can Use --adb-bin, --adb-host/--adb-port ' + 'to configure it manually if needed.');

          case 10:
            throw _context.t0;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  return function wrapADBCall(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _adbkit = __webpack_require__(210);

var _adbkit2 = _interopRequireDefault(_adbkit);

var _errors = __webpack_require__(3);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var ADBUtils = function () {
  // TODO: better flow typing here.

  // Map<deviceId -> artifactsDir>
  function ADBUtils(params) {
    (0, _classCallCheck3.default)(this, ADBUtils);

    this.params = params;

    var adb = params.adb,
        adbBin = params.adbBin,
        adbHost = params.adbHost,
        adbPort = params.adbPort;


    this.adb = adb || _adbkit2.default;

    this.adbClient = this.adb.createClient({
      bin: adbBin,
      host: adbHost,
      port: adbPort
    });

    this.artifactsDirMap = new Map();

    this.userAbortDiscovery = false;
  }
  // Toggled when the user wants to abort the RDP Unix Socket discovery loop
  // while it is still executing.


  (0, _createClass3.default)(ADBUtils, [{
    key: 'runShellCommand',
    value: function runShellCommand(deviceId, cmd) {
      var _this = this;

      var adb = this.adb,
          adbClient = this.adbClient;


      log.debug('Run adb shell command on ' + deviceId + ': ' + JSON.stringify(cmd));

      return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return adbClient.shell(deviceId, cmd).then(adb.util.readAll);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))).then(function (res) {
        return res.toString();
      });
    }
  }, {
    key: 'discoverDevices',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _this2 = this;

        var adbClient, devices;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                adbClient = this.adbClient;
                devices = [];


                log.debug('Listing android devices');
                _context4.next = 5;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          return _context3.abrupt('return', adbClient.listDevices());

                        case 1:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this2);
                })));

              case 5:
                devices = _context4.sent;
                return _context4.abrupt('return', devices.map(function (dev) {
                  return dev.id;
                }));

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function discoverDevices() {
        return _ref3.apply(this, arguments);
      }

      return discoverDevices;
    }()
  }, {
    key: 'discoverInstalledFirefoxAPKs',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(deviceId, firefoxApk) {
        var pmList;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                log.debug('Listing installed Firefox APKs on ' + deviceId);

                _context5.next = 3;
                return this.runShellCommand(deviceId, ['pm', 'list', 'packages']);

              case 3:
                pmList = _context5.sent;
                return _context5.abrupt('return', pmList.split('\n').map(function (line) {
                  return line.replace('package:', '').trim();
                }).filter(function (line) {
                  // Look for an exact match if firefoxApk is defined.
                  if (firefoxApk) {
                    return line === firefoxApk;
                  }
                  // Match any package name that starts with the package name of a Firefox for Android browser.
                  return line.startsWith('org.mozilla.fennec') || line.startsWith('org.mozilla.firefox');
                }));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function discoverInstalledFirefoxAPKs(_x2, _x3) {
        return _ref5.apply(this, arguments);
      }

      return discoverInstalledFirefoxAPKs;
    }()
  }, {
    key: 'getAndroidVersionNumber',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(deviceId) {
        var androidVersion, androidVersionNumber;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.runShellCommand(deviceId, ['getprop', 'ro.build.version.sdk']);

              case 2:
                androidVersion = _context6.sent.trim();
                androidVersionNumber = parseInt(androidVersion);

                // No need to check the granted runtime permissions on Android versions < Lollypop.

                if (!isNaN(androidVersionNumber)) {
                  _context6.next = 6;
                  break;
                }

                throw new _errors.WebExtError('Unable to discovery android version on ' + (deviceId + ': ' + androidVersion));

              case 6:
                return _context6.abrupt('return', androidVersionNumber);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAndroidVersionNumber(_x4) {
        return _ref6.apply(this, arguments);
      }

      return getAndroidVersionNumber;
    }()

    // Raise an UsageError when the given APK does not have the required runtime permissions.

  }, {
    key: 'ensureRequiredAPKRuntimePermissions',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(deviceId, apk, permissions) {
        var permissionsMap, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, perm, pmDumpLogs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _perm, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _perm2;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                permissionsMap = {};

                // Initialize every permission to false in the permissions map.

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context7.prev = 4;
                for (_iterator = permissions[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  perm = _step.value;

                  permissionsMap[perm] = false;
                }

                // Retrieve the permissions information for the given apk.
                _context7.next = 12;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context7.t0;

              case 12:
                _context7.prev = 12;
                _context7.prev = 13;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 15:
                _context7.prev = 15;

                if (!_didIteratorError) {
                  _context7.next = 18;
                  break;
                }

                throw _iteratorError;

              case 18:
                return _context7.finish(15);

              case 19:
                return _context7.finish(12);

              case 20:
                _context7.next = 22;
                return this.runShellCommand(deviceId, ['pm', 'dump', apk]);

              case 22:
                pmDumpLogs = _context7.sent.split('\n');


                // Set to true the required permissions that have been granted.
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context7.prev = 26;
                _iterator2 = pmDumpLogs[Symbol.iterator]();

              case 28:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context7.next = 52;
                  break;
                }

                line = _step2.value;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context7.prev = 33;

                for (_iterator4 = permissions[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  _perm = _step4.value;

                  if (line.includes(_perm + ': granted=true')) {
                    permissionsMap[_perm] = true;
                  }
                }
                _context7.next = 41;
                break;

              case 37:
                _context7.prev = 37;
                _context7.t1 = _context7['catch'](33);
                _didIteratorError4 = true;
                _iteratorError4 = _context7.t1;

              case 41:
                _context7.prev = 41;
                _context7.prev = 42;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 44:
                _context7.prev = 44;

                if (!_didIteratorError4) {
                  _context7.next = 47;
                  break;
                }

                throw _iteratorError4;

              case 47:
                return _context7.finish(44);

              case 48:
                return _context7.finish(41);

              case 49:
                _iteratorNormalCompletion2 = true;
                _context7.next = 28;
                break;

              case 52:
                _context7.next = 58;
                break;

              case 54:
                _context7.prev = 54;
                _context7.t2 = _context7['catch'](26);
                _didIteratorError2 = true;
                _iteratorError2 = _context7.t2;

              case 58:
                _context7.prev = 58;
                _context7.prev = 59;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 61:
                _context7.prev = 61;

                if (!_didIteratorError2) {
                  _context7.next = 64;
                  break;
                }

                throw _iteratorError2;

              case 64:
                return _context7.finish(61);

              case 65:
                return _context7.finish(58);

              case 66:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context7.prev = 69;
                _iterator3 = permissions[Symbol.iterator]();

              case 71:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context7.next = 78;
                  break;
                }

                _perm2 = _step3.value;

                if (permissionsMap[_perm2]) {
                  _context7.next = 75;
                  break;
                }

                throw new _errors.UsageError('Required ' + _perm2 + ' has not be granted for ' + apk + '. ' + 'Please grant them using the Android Settings ' + 'or using the following adb command:\n' + ('\t adb shell pm grant ' + apk + ' ' + _perm2 + '\n'));

              case 75:
                _iteratorNormalCompletion3 = true;
                _context7.next = 71;
                break;

              case 78:
                _context7.next = 84;
                break;

              case 80:
                _context7.prev = 80;
                _context7.t3 = _context7['catch'](69);
                _didIteratorError3 = true;
                _iteratorError3 = _context7.t3;

              case 84:
                _context7.prev = 84;
                _context7.prev = 85;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 87:
                _context7.prev = 87;

                if (!_didIteratorError3) {
                  _context7.next = 90;
                  break;
                }

                throw _iteratorError3;

              case 90:
                return _context7.finish(87);

              case 91:
                return _context7.finish(84);

              case 92:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[4, 8, 12, 20], [13,, 15, 19], [26, 54, 58, 66], [33, 37, 41, 49], [42,, 44, 48], [59,, 61, 65], [69, 80, 84, 92], [85,, 87, 91]]);
      }));

      function ensureRequiredAPKRuntimePermissions(_x5, _x6, _x7) {
        return _ref7.apply(this, arguments);
      }

      return ensureRequiredAPKRuntimePermissions;
    }()
  }, {
    key: 'amForceStopAPK',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(deviceId, apk) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.runShellCommand(deviceId, ['am', 'force-stop', apk]);

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function amForceStopAPK(_x8, _x9) {
        return _ref8.apply(this, arguments);
      }

      return amForceStopAPK;
    }()
  }, {
    key: 'getOrCreateArtifactsDir',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(deviceId) {
        var artifactsDir, testDirOut;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                artifactsDir = this.artifactsDirMap.get(deviceId);

                if (!artifactsDir) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt('return', artifactsDir);

              case 3:

                artifactsDir = '/sdcard/web-ext-artifacts-' + Date.now();

                _context9.next = 6;
                return this.runShellCommand(deviceId, 'test -d ' + artifactsDir + ' ; echo $?');

              case 6:
                testDirOut = _context9.sent.trim();

                if (!(testDirOut !== '1')) {
                  _context9.next = 9;
                  break;
                }

                throw new _errors.WebExtError('Cannot create artifacts directory ' + artifactsDir + ' ' + ('because it exists on ' + deviceId + '.'));

              case 9:
                _context9.next = 11;
                return this.runShellCommand(deviceId, ['mkdir', '-p', artifactsDir]);

              case 11:

                this.artifactsDirMap.set(deviceId, artifactsDir);

                return _context9.abrupt('return', artifactsDir);

              case 13:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getOrCreateArtifactsDir(_x10) {
        return _ref9.apply(this, arguments);
      }

      return getOrCreateArtifactsDir;
    }()
  }, {
    key: 'clearArtifactsDir',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(deviceId) {
        var artifactsDir;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                artifactsDir = this.artifactsDirMap.get(deviceId);

                if (artifactsDir) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt('return');

              case 3:

                this.artifactsDirMap.delete(deviceId);

                log.debug('Removing ' + artifactsDir + ' artifacts directory on ' + deviceId + ' device');

                _context10.next = 7;
                return this.runShellCommand(deviceId, ['rm', '-rf', artifactsDir]);

              case 7:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function clearArtifactsDir(_x11) {
        return _ref10.apply(this, arguments);
      }

      return clearArtifactsDir;
    }()
  }, {
    key: 'pushFile',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(deviceId, localPath, devicePath) {
        var _this3 = this;

        var adbClient;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                adbClient = this.adbClient;


                log.debug('Pushing ' + localPath + ' to ' + devicePath + ' on ' + deviceId);

                _context12.next = 4;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
                  return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return adbClient.push(deviceId, localPath, devicePath).then(function (transfer) {
                            return new Promise(function (resolve) {
                              transfer.on('end', resolve);
                            });
                          });

                        case 2:
                        case 'end':
                          return _context11.stop();
                      }
                    }
                  }, _callee11, _this3);
                })));

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function pushFile(_x12, _x13, _x14) {
        return _ref11.apply(this, arguments);
      }

      return pushFile;
    }()
  }, {
    key: 'startFirefoxAPK',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(deviceId, apk, deviceProfileDir) {
        var _this4 = this;

        var adbClient;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                adbClient = this.adbClient;


                log.debug('Starting ' + apk + ' with profile ' + deviceProfileDir + ' on ' + deviceId);

                _context14.next = 4;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
                  return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          _context13.next = 2;
                          return adbClient.startActivity(deviceId, {
                            wait: true,
                            action: 'android.activity.MAIN',
                            component: apk + '/.App',
                            extras: [{
                              key: 'args',
                              value: '-profile ' + deviceProfileDir
                            }]
                          });

                        case 2:
                        case 'end':
                          return _context13.stop();
                      }
                    }
                  }, _callee13, _this4);
                })));

              case 4:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function startFirefoxAPK(_x15, _x16, _x17) {
        return _ref13.apply(this, arguments);
      }

      return startFirefoxAPK;
    }()
  }, {
    key: 'setUserAbortDiscovery',
    value: function setUserAbortDiscovery(value) {
      this.userAbortDiscovery = value;
    }
  }, {
    key: 'discoverRDPUnixSocket',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(deviceId, apk) {
        var _ref16 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            maxDiscoveryTime = _ref16.maxDiscoveryTime,
            retryInterval = _ref16.retryInterval;

        var rdpUnixSockets, discoveryStartedAt;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                rdpUnixSockets = [];
                discoveryStartedAt = Date.now();

              case 2:
                if (!(rdpUnixSockets.length === 0)) {
                  _context15.next = 16;
                  break;
                }

                if (!this.userAbortDiscovery) {
                  _context15.next = 5;
                  break;
                }

                throw new _errors.UsageError('Exiting Firefox Remote Debugging socket discovery on user request');

              case 5:
                if (!(Date.now() - discoveryStartedAt > maxDiscoveryTime)) {
                  _context15.next = 7;
                  break;
                }

                throw new _errors.WebExtError('Timeout while waiting for the Android Firefox Debugger Socket');

              case 7:
                _context15.next = 9;
                return this.runShellCommand(deviceId, ['cat', '/proc/net/unix']);

              case 9:
                _context15.t0 = function (line) {
                  // The RDP unix socket is expected to be a path in the form:
                  //   /data/data/org.mozilla.fennec_rpl/firefox-debugger-socket
                  return line.trim().endsWith(apk + '/firefox-debugger-socket');
                };

                rdpUnixSockets = _context15.sent.split('\n').filter(_context15.t0);

                if (!(rdpUnixSockets.length === 0)) {
                  _context15.next = 14;
                  break;
                }

                _context15.next = 14;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, retryInterval);
                });

              case 14:
                _context15.next = 2;
                break;

              case 16:

                // Convert into an array of unix socket filenames.
                rdpUnixSockets = rdpUnixSockets.map(function (line) {
                  return line.trim().split(/\s/).pop();
                });

                if (!(rdpUnixSockets.length > 1)) {
                  _context15.next = 19;
                  break;
                }

                throw new _errors.WebExtError('Unexpected multiple RDP sockets: ' + ('' + JSON.stringify(rdpUnixSockets)));

              case 19:
                return _context15.abrupt('return', rdpUnixSockets[0]);

              case 20:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function discoverRDPUnixSocket(_x18, _x19) {
        return _ref15.apply(this, arguments);
      }

      return discoverRDPUnixSocket;
    }()
  }, {
    key: 'setupForward',
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(deviceId, remote, local) {
        var _this5 = this;

        var adbClient;
        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                adbClient = this.adbClient;

                // TODO(rpl): we should use adb.listForwards and reuse the existing one if any (especially
                // because adbkit doesn't seem to support `adb forward --remote` yet).

                log.debug('Configuring ADB forward for ' + deviceId + ': ' + remote + ' -> ' + local);

                _context17.next = 4;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
                  return _regenerator2.default.wrap(function _callee16$(_context16) {
                    while (1) {
                      switch (_context16.prev = _context16.next) {
                        case 0:
                          _context16.next = 2;
                          return adbClient.forward(deviceId, local, remote);

                        case 2:
                        case 'end':
                          return _context16.stop();
                      }
                    }
                  }, _callee16, _this5);
                })));

              case 4:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function setupForward(_x21, _x22, _x23) {
        return _ref17.apply(this, arguments);
      }

      return setupForward;
    }()
  }]);
  return ADBUtils;
}();

exports.default = ADBUtils;
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/adb.js"))

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mz = __webpack_require__(9);

var _errors = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Resolves true if the path is a readable file.
 *
 * Usage:
 *
 * const exists = await fileExists(filePath);
 * if (exists) {
 *   // ...
 * }
 *
 * */
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$fileIsReadable = _ref2.fileIsReadable,
        fileIsReadable = _ref2$fileIsReadable === undefined ? function (f) {
      return _mz.fs.access(f, _mz.fs.constants.R_OK);
    } : _ref2$fileIsReadable;

    var stat;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fileIsReadable(path);

          case 3:
            _context.next = 5;
            return _mz.fs.stat(path);

          case 5:
            stat = _context.sent;
            return _context.abrupt('return', stat.isFile());

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            if (!(0, _errors.isErrorWithCode)(['EACCES', 'ENOENT'], _context.t0)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', false);

          case 13:
            throw _context.t0;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  function fileExists(_x) {
    return _ref.apply(this, arguments);
  }

  return fileExists;
}();

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForUpdates = checkForUpdates;

var _updateNotifier = __webpack_require__(229);

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkForUpdates(_ref) {
  var version = _ref.version,
      _ref$updateNotifier = _ref.updateNotifier,
      updateNotifier = _ref$updateNotifier === undefined ? _updateNotifier2.default : _ref$updateNotifier;

  var pkg = { name: 'web-ext', version: version };

  updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3 // 3 days,
  }).notify();
}

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("camelcase");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("git-rev-sync");

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(122);

var _chai = __webpack_require__(5);

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = __webpack_require__(123);

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Enable chai-as-promised plugin.
_chai2.default.use(_chaiAsPromised2.default); // Webpack tests entry point. Bundles all the test files
// into a single file.

var context = __webpack_require__(124);
context.keys().forEach(context);

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("chai-as-promised");

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./test-cmd/test.build.js": 125,
	"./test-cmd/test.docs.js": 204,
	"./test-cmd/test.lint.js": 206,
	"./test-cmd/test.run.js": 208,
	"./test-cmd/test.sign.js": 211,
	"./test-extension-runners/test.extension-runners.js": 214,
	"./test-extension-runners/test.firefox-android.js": 215,
	"./test-extension-runners/test.firefox-desktop.js": 216,
	"./test-firefox/test.firefox.js": 217,
	"./test-firefox/test.preferences.js": 218,
	"./test-firefox/test.remote.js": 219,
	"./test-util/test.adb.js": 220,
	"./test-util/test.artifacts.js": 221,
	"./test-util/test.desktop-notifier.js": 222,
	"./test-util/test.file-exists.js": 223,
	"./test-util/test.file-filter.js": 224,
	"./test-util/test.is-directory.js": 225,
	"./test-util/test.logger.js": 226,
	"./test-util/test.manifest.js": 53,
	"./test-util/test.temp-dir.js": 227,
	"./test-util/test.updates.js": 228,
	"./test.config.js": 230,
	"./test.errors.js": 239,
	"./test.program.js": 240,
	"./test.setup.js": 242,
	"./test.watcher.js": 243,
	"./test.web-ext.js": 244
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 124;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(9);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _eventToPromise = __webpack_require__(74);

var _eventToPromise2 = _interopRequireDefault(_eventToPromise);

var _build = __webpack_require__(31);

var _build2 = _interopRequireDefault(_build);

var _fileFilter = __webpack_require__(40);

var _tempDir = __webpack_require__(16);

var _helpers = __webpack_require__(10);

var _test = __webpack_require__(53);

var _errors = __webpack_require__(3);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);


(0, _mocha.describe)('build', function () {

  (0, _mocha.it)('zips a package', function () {
    var zipFile = new _helpers.ZipFile();

    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
        artifactsDir: tmpDir.path()
      }).then(function (buildResult) {
        _chai.assert.match(buildResult.extensionPath, /minimal_extension-1\.0\.zip$/);
        return buildResult.extensionPath;
      }).then(function (extensionPath) {
        return zipFile.open(extensionPath);
      }).then(function () {
        return zipFile.extractFilenames();
      }).then(function (fileNames) {
        fileNames.sort();
        _chai.assert.deepEqual(fileNames, ['background-script.js', 'manifest.json']);
        return zipFile.close();
      });
    });
  });

  (0, _mocha.it)('configures a build command with the expected fileFilter', function () {
    var packageCreator = _sinon2.default.spy(function () {
      return { extensionPath: 'extension/path' };
    });
    var fileFilter = { wantFile: function wantFile() {
        return true;
      } };
    var createFileFilter = _sinon2.default.spy(function () {
      return fileFilter;
    });
    var params = {
      sourceDir: '/src',
      artifactsDir: 'artifacts',
      ignoreFiles: ['**/*.log']
    };
    return (0, _build2.default)(params, { packageCreator: packageCreator, createFileFilter: createFileFilter }).then(function () {
      // ensure sourceDir, artifactsDir, ignoreFiles is used
      _sinon2.default.assert.calledWithMatch(createFileFilter, params);
      // ensure packageCreator received correct fileFilter
      _sinon2.default.assert.calledWithMatch(packageCreator, { fileFilter: fileFilter });
    });
  });

  (0, _mocha.it)('gives the correct name to a localized extension', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-localizable-web-ext'),
        artifactsDir: tmpDir.path()
      }).then(function (buildResult) {
        _chai.assert.match(buildResult.extensionPath, /name_of_the_extension-1\.0\.zip$/);
        return buildResult.extensionPath;
      });
    });
  });

  (0, _mocha.it)('handles repeating localization keys', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var messageFileName = _path2.default.join(tmpDir.path(), 'messages.json');
      _mz.fs.writeFileSync(messageFileName, '{"extensionName": {\n              "message": "example extension",\n              "description": "example description"\n            }\n          }');

      var manifestWithRepeatingPattern = {
        name: '__MSG_extensionName__ __MSG_extensionName__',
        version: '0.0.1'
      };

      return (0, _build.getDefaultLocalizedName)({
        messageFile: messageFileName,
        manifestData: manifestWithRepeatingPattern
      }).then(function (result) {
        _chai.assert.match(result, /example extension example extension/);
      });
    });
  });

  (0, _mocha.it)('checks locale file for malformed json', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var messageFileName = _path2.default.join(tmpDir.path(), 'messages.json');
      _mz.fs.writeFileSync(messageFileName, '{"simulated:" "json syntax error"');

      return (0, _build.getDefaultLocalizedName)({
        messageFile: messageFileName,
        manifestData: _test.manifestWithoutApps
      }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.instanceOf(error, _errors.UsageError);
        _chai.assert.match(error.message, /Unexpected string in JSON at position 14/);
        _chai.assert.match(error.message, /^Error parsing messages\.json/);
        _chai.assert.include(error.message, messageFileName);
      });
    });
  });

  (0, _mocha.it)('checks locale file for incorrect format', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var messageFileName = _path2.default.join(tmpDir.path(), 'messages.json');
      //This is missing the 'message' key
      _mz.fs.writeFileSync(messageFileName, '{"extensionName": {\n              "description": "example extension"\n              }\n          }');

      var basicLocalizedManifest = {
        name: '__MSG_extensionName__',
        version: '0.0.1'
      };
      return (0, _build.getDefaultLocalizedName)({
        messageFile: messageFileName,
        manifestData: basicLocalizedManifest
      }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.instanceOf(error, _errors.UsageError);
        _chai.assert.match(error.message, /The locale file .*messages\.json is missing key: extensionName/);
      });
    });
  });

  (0, _mocha.it)('throws an error if the locale file does not exist', function () {
    return (0, _build.getDefaultLocalizedName)({
      messageFile: '/path/to/non-existent-dir/messages.json',
      manifestData: _test.manifestWithoutApps
    }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      log.info(error);
      _chai.assert.instanceOf(error, _errors.UsageError);
      _chai.assert.match(error.message, /Error: ENOENT: no such file or directory, open .*messages.json/);
      _chai.assert.match(error.message, /^Error reading messages.json/);
      _chai.assert.include(error.message, '/path/to/non-existent-dir/messages.json');
    });
  });

  (0, _mocha.it)('can build an extension without an ID', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      // Make sure a manifest without an ID doesn't throw an error.
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
        artifactsDir: tmpDir.path()
      }, { manifestData: _test.manifestWithoutApps });
    });
  });

  (0, _mocha.it)('prepares the artifacts dir', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var artifactsDir = _path2.default.join(tmpDir.path(), 'artifacts');
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
        artifactsDir: artifactsDir
      }).then(function () {
        return _mz.fs.stat(artifactsDir);
      }).then(function (stats) {
        _chai.assert.equal(stats.isDirectory(), true);
      });
    });
  });

  (0, _mocha.it)('lets you specify a manifest', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
        artifactsDir: tmpDir.path()
      }, {
        manifestData: _helpers.basicManifest
      }).then(function (buildResult) {
        _chai.assert.match(buildResult.extensionPath, /the_extension-0\.0\.1\.zip$/);
        return buildResult.extensionPath;
      });
    });
  });

  (0, _mocha.it)('asks FileFilter what files to include in the ZIP', function () {
    var zipFile = new _helpers.ZipFile();
    var fileFilter = new _fileFilter.FileFilter({
      sourceDir: '.',
      baseIgnoredPatterns: ['**/background-script.js']
    });

    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
        artifactsDir: tmpDir.path()
      }, { fileFilter: fileFilter }).then(function (buildResult) {
        return zipFile.open(buildResult.extensionPath);
      }).then(function () {
        return zipFile.extractFilenames();
      }).then(function (fileNames) {
        _chai.assert.notInclude(fileNames, 'background-script.js');
        return zipFile.close();
      });
    });
  });

  (0, _mocha.it)('lets you rebuild when files change', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var sourceDir = (0, _helpers.fixturePath)('minimal-web-ext');
      var artifactsDir = tmpDir.path();
      var fileFilter = new _fileFilter.FileFilter({ sourceDir: sourceDir, artifactsDir: artifactsDir });
      _sinon2.default.spy(fileFilter, 'wantFile');
      var onSourceChange = _sinon2.default.spy(function () {});
      return (0, _build2.default)({
        sourceDir: sourceDir, artifactsDir: artifactsDir, asNeeded: true
      }, {
        manifestData: _helpers.basicManifest, onSourceChange: onSourceChange, fileFilter: fileFilter
      }).then(function (buildResult) {
        // Make sure we still have a build result.
        _chai.assert.match(buildResult.extensionPath, /\.zip$/);
        return buildResult;
      }).then(function (buildResult) {
        var args = onSourceChange.firstCall.args[0];

        _sinon2.default.assert.called(onSourceChange);
        _sinon2.default.assert.calledWithMatch(onSourceChange, {
          artifactsDir: artifactsDir,
          sourceDir: sourceDir
        });

        _chai.assert.typeOf(args.onChange, 'function');

        // Make sure it uses the file filter.
        _chai.assert.typeOf(args.shouldWatchFile, 'function');
        args.shouldWatchFile('/some/path');
        _sinon2.default.assert.called(fileFilter.wantFile);

        // Remove the built extension.
        return _mz.fs.unlink(buildResult.extensionPath)
        // Execute the onChange handler to make sure it gets built
        // again. This simulates what happens when the file watcher
        // executes the callback.
        .then(function () {
          return args.onChange();
        });
      }).then(function (buildResult) {
        _chai.assert.match(buildResult.extensionPath, /\.zip$/);
        return _mz.fs.stat(buildResult.extensionPath);
      }).then(function (stat) {
        _chai.assert.equal(stat.isFile(), true);
      });
    });
  });

  (0, _mocha.it)('throws errors when rebuilding in source watcher', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var packageResult = Promise.resolve({});
      var packageCreator = _sinon2.default.spy(function () {
        return packageResult;
      });
      var onSourceChange = _sinon2.default.spy(function () {});
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
        artifactsDir: tmpDir.path(),
        asNeeded: true
      }, {
        manifestData: _helpers.basicManifest, onSourceChange: onSourceChange, packageCreator: packageCreator
      }).then(function () {
        _sinon2.default.assert.called(onSourceChange);
        _sinon2.default.assert.calledOnce(packageCreator);
        var onChange = onSourceChange.firstCall.args[0].onChange;

        packageResult = Promise.reject(new Error('Simulate an error on the second call to packageCreator()'));
        // Invoke the stub packageCreator() again which should throw an error
        return onChange();
      }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.include(error.message, 'Simulate an error on the second call to packageCreator()');
      });
    });
  });

  (0, _mocha.it)('raises an UsageError if zip file exists', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var testFileName = _path2.default.join(tmpDir.path(), 'minimal_extension-1.0.zip');
      return _mz.fs.writeFile(testFileName, 'test').then(function () {
        return (0, _build2.default)({
          sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
          artifactsDir: tmpDir.path()
        });
      }).catch(function (error) {
        _chai.assert.instanceOf(error, _errors.UsageError);
        _chai.assert.match(error.message, /Extension exists at the destination path/);
      });
    });
  });

  (0, _mocha.it)('overwrites zip file if it exists', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var testFileName = _path2.default.join(tmpDir.path(), 'minimal_extension-1.0.zip');
      return _mz.fs.writeFile(testFileName, 'test').then(function () {
        return (0, _build2.default)({
          sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
          artifactsDir: tmpDir.path(),
          overwriteDest: true
        });
      }).then(function (buildResult) {
        _chai.assert.match(buildResult.extensionPath, /minimal_extension-1\.0\.zip$/);
      });
    });
  });

  (0, _mocha.it)('zips a package and includes a file from a negated filter', function () {
    var zipFile = new _helpers.ZipFile();

    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _build2.default)({
        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
        artifactsDir: tmpDir.path(),
        ignoreFiles: ['!node_modules', '!node_modules/pkg1', '!node_modules/pkg1/**']
      }).then(function (buildResult) {
        _chai.assert.match(buildResult.extensionPath, /minimal_extension-1\.0\.zip$/);
        return buildResult.extensionPath;
      }).then(function (extensionPath) {
        return zipFile.open(extensionPath);
      }).then(function () {
        return zipFile.extractFilenames();
      }).then(function (fileNames) {
        fileNames.sort();
        _chai.assert.deepEqual(fileNames, ['background-script.js', 'manifest.json', 'node_modules/', 'node_modules/pkg1/', 'node_modules/pkg1/file1.txt']);
        return zipFile.close();
      });
    });
  });

  (0, _mocha.describe)('safeFileName', function () {

    (0, _mocha.it)('makes names safe for writing to a file system', function () {
      _chai.assert.equal((0, _build.safeFileName)('Bob Loblaw\'s 2005 law-blog.net'), 'bob_loblaw_s_2005_law-blog.net');
    });
  });

  (0, _mocha.describe)('defaultPackageCreator', function () {
    (0, _mocha.it)('should reject on Unexpected errors', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var fakeEventToPromise = _sinon2.default.spy(function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(stream) {
            var files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;

            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _eventToPromise2.default)(stream, 'close');

                  case 2:
                    _context.next = 4;
                    return _mz.fs.readdir(tmpDir.path());

                  case 4:
                    files = _context.sent;
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 8;
                    _iterator = files[Symbol.iterator]();

                  case 10:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context.next = 17;
                      break;
                    }

                    file = _step.value;
                    _context.next = 14;
                    return _mz.fs.unlink(_path2.default.join(tmpDir.path(), file));

                  case 14:
                    _iteratorNormalCompletion = true;
                    _context.next = 10;
                    break;

                  case 17:
                    _context.next = 23;
                    break;

                  case 19:
                    _context.prev = 19;
                    _context.t0 = _context['catch'](8);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 23:
                    _context.prev = 23;
                    _context.prev = 24;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }

                  case 26:
                    _context.prev = 26;

                    if (!_didIteratorError) {
                      _context.next = 29;
                      break;
                    }

                    throw _iteratorError;

                  case 29:
                    return _context.finish(26);

                  case 30:
                    return _context.finish(23);

                  case 31:
                    return _context.abrupt('return', Promise.reject(new Error('Unexpected error')));

                  case 32:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined, [[8, 19, 23, 31], [24,, 26, 30]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        var sourceDir = (0, _helpers.fixturePath)('minimal-web-ext');
        var artifactsDir = tmpDir.path();
        var fileFilter = new _fileFilter.FileFilter({ sourceDir: sourceDir, artifactsDir: artifactsDir });
        var params = {
          manifestData: _helpers.basicManifest,
          sourceDir: sourceDir,
          fileFilter: fileFilter,
          artifactsDir: artifactsDir,
          overwriteDest: false,
          showReadyMessage: false
        };
        var options = {
          eventToPromise: fakeEventToPromise
        };

        return (0, _build.defaultPackageCreator)(params, options).then((0, _helpers.makeSureItFails)()).catch(function (error) {
          _chai.assert.match(error.message, /Unexpected error/);
        });
      });
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/test-cmd/test.build.js"))

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
__webpack_require__(35);
__webpack_require__(47);
__webpack_require__(138);
__webpack_require__(146);
__webpack_require__(147);
module.exports = __webpack_require__(11).Promise;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(61);
var defined = __webpack_require__(62);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(65);
var descriptor = __webpack_require__(38);
var setToStringTag = __webpack_require__(46);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(24)(IteratorPrototype, __webpack_require__(13)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var anObject = __webpack_require__(20);
var getKeys = __webpack_require__(44);

module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(30);
var toLength = __webpack_require__(66);
var toAbsoluteIndex = __webpack_require__(133);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(61);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(25);
var toObject = __webpack_require__(70);
var IE_PROTO = __webpack_require__(67)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(136);
var step = __webpack_require__(137);
var Iterators = __webpack_require__(29);
var toIObject = __webpack_require__(30);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(88)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(36);
var global = __webpack_require__(12);
var ctx = __webpack_require__(28);
var classof = __webpack_require__(71);
var $export = __webpack_require__(19);
var isObject = __webpack_require__(22);
var aFunction = __webpack_require__(43);
var anInstance = __webpack_require__(139);
var forOf = __webpack_require__(140);
var speciesConstructor = __webpack_require__(96);
var task = __webpack_require__(97).set;
var microtask = __webpack_require__(142)();
var newPromiseCapabilityModule = __webpack_require__(73);
var perform = __webpack_require__(98);
var userAgent = __webpack_require__(143);
var promiseResolve = __webpack_require__(99);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(13)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(144)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(46)($Promise, PROMISE);
__webpack_require__(145)(PROMISE);
Wrapper = __webpack_require__(11)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(100)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(28);
var call = __webpack_require__(94);
var isArrayIter = __webpack_require__(95);
var anObject = __webpack_require__(20);
var toLength = __webpack_require__(66);
var getIterFn = __webpack_require__(72);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 141 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var macrotask = __webpack_require__(97).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(39)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(24);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(12);
var core = __webpack_require__(11);
var dP = __webpack_require__(21);
var DESCRIPTORS = __webpack_require__(23);
var SPECIES = __webpack_require__(13)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(19);
var core = __webpack_require__(11);
var global = __webpack_require__(12);
var speciesConstructor = __webpack_require__(96);
var promiseResolve = __webpack_require__(99);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(19);
var newPromiseCapability = __webpack_require__(73);
var perform = __webpack_require__(98);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = require("watchpack");

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = require("debounce");

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
var $Object = __webpack_require__(11).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(19);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(23), 'Object', { defineProperty: __webpack_require__(21).f });


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipDir = undefined;

var _zipDir = __webpack_require__(153);

var _zipDir2 = _interopRequireDefault(_zipDir);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zipDir = exports.zipDir = (0, _es6Promisify2.default)(_zipDir2.default);

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = require("zip-dir");

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = require("strip-json-comments");

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(35);
module.exports = __webpack_require__(157);


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(71);
var ITERATOR = __webpack_require__(13)('iterator');
var Iterators = __webpack_require__(29);
module.exports = __webpack_require__(11).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(159), __esModule: true };

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(35);
module.exports = __webpack_require__(160);


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(20);
var get = __webpack_require__(72);
module.exports = __webpack_require__(11).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(47);
module.exports = __webpack_require__(76).f('iterator');


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(165);
__webpack_require__(87);
__webpack_require__(170);
__webpack_require__(171);
module.exports = __webpack_require__(11).Symbol;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(12);
var has = __webpack_require__(25);
var DESCRIPTORS = __webpack_require__(23);
var $export = __webpack_require__(19);
var redefine = __webpack_require__(90);
var META = __webpack_require__(166).KEY;
var $fails = __webpack_require__(37);
var shared = __webpack_require__(68);
var setToStringTag = __webpack_require__(46);
var uid = __webpack_require__(45);
var wks = __webpack_require__(13);
var wksExt = __webpack_require__(76);
var wksDefine = __webpack_require__(77);
var enumKeys = __webpack_require__(167);
var isArray = __webpack_require__(168);
var anObject = __webpack_require__(20);
var isObject = __webpack_require__(22);
var toIObject = __webpack_require__(30);
var toPrimitive = __webpack_require__(64);
var createDesc = __webpack_require__(38);
var _create = __webpack_require__(65);
var gOPNExt = __webpack_require__(169);
var $GOPD = __webpack_require__(105);
var $DP = __webpack_require__(21);
var $keys = __webpack_require__(44);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(104).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(51).f = $propertyIsEnumerable;
  __webpack_require__(78).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(36)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(24)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(45)('meta');
var isObject = __webpack_require__(22);
var has = __webpack_require__(25);
var setDesc = __webpack_require__(21).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(37)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(44);
var gOPS = __webpack_require__(78);
var pIE = __webpack_require__(51);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(39);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(30);
var gOPN = __webpack_require__(104).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77)('asyncIterator');


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77)('observable');


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(173), __esModule: true };

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(174);
module.exports = __webpack_require__(11).Object.setPrototypeOf;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(19);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(175).set });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(22);
var anObject = __webpack_require__(20);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(28)(Function.call, __webpack_require__(105).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(177), __esModule: true };

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(178);
var $Object = __webpack_require__(11).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(19);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(65) });


/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = require("multimatch");

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = require("tmp");

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(183), __esModule: true };

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(184);
module.exports = __webpack_require__(11).Object.assign;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(19);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(185) });


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(44);
var gOPS = __webpack_require__(78);
var pIE = __webpack_require__(51);
var toObject = __webpack_require__(70);
var IObject = __webpack_require__(92);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(37)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = require("yauzl");

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = require("fx-runner");

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// See https://github.com/jshint/jshint/issues/1747 for context
/* global -Promise */
var Promise = __webpack_require__(189).Promise;
var FirefoxClient = __webpack_require__(190);

module.exports = connect;

function connect(port) {
  return new Promise(function(resolve, reject) {

    var client = new FirefoxClient();
    client.connect(port, function(err) {
      if (err) {
        reject(err);
      }
      resolve(client);
    });

    client.on('error', reject);
    client.on('timeout', reject);
  });
}


/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(191);

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17),
    Client = __webpack_require__(192),
    Tab = __webpack_require__(82),
    Webapps = __webpack_require__(200),
    Device = __webpack_require__(202),
    SimulatorApps = __webpack_require__(203);

const DEFAULT_PORT = 6000;
const DEFAULT_HOST = "localhost";

module.exports = FirefoxClient;

function FirefoxClient(options) {
  var client = new Client(options);
  var actor = 'root';

  client.on("error", this.onError.bind(this));
  client.on("end", this.onEnd.bind(this));
  client.on("timeout", this.onTimeout.bind(this));

  this.initialize(client, actor);
}

FirefoxClient.prototype = extend(ClientMethods, {
  connect: function(port, host, cb) {
    if (typeof port == "function") {
      // (cb)
      cb = port;
      port = DEFAULT_PORT;
      host = DEFAULT_HOST;

    }
    if (typeof host == "function") {
      // (port, cb)
      cb = host;
      host = DEFAULT_HOST;
    }
    // (port, host, cb)

    this.client.connect(port, host, cb);

    this.client.expectReply(this.actor, function(packet) {
      // root message
    });
  },

  disconnect: function() {
    this.client.disconnect();
  },

  onError: function(error) {
    this.emit("error", error);
  },

  onEnd: function() {
    this.emit("end");
  },

  onTimeout: function() {
    this.emit("timeout");
  },

  selectedTab: function(cb) {
    this.request("listTabs", function(resp) {
      var tab = resp.tabs[resp.selected];
      return new Tab(this.client, tab);
    }.bind(this), cb);
  },

  listTabs: function(cb) {
    this.request("listTabs", function(err, resp) {
      if (err) {
        return cb(err);
      }

      if (resp.simulatorWebappsActor) {
        // the server is the Firefox OS Simulator, return apps as "tabs"
        var apps = new SimulatorApps(this.client, resp.simulatorWebappsActor);
        apps.listApps(cb);
      }
      else {
        var tabs = resp.tabs.map(function(tab) {
          return new Tab(this.client, tab);
        }.bind(this));
        cb(null, tabs);
      }
    }.bind(this));
  },

  getWebapps: function(cb) {
    this.request("listTabs", (function(err, resp) {
      if (err) {
        return cb(err);
      }
      var webapps = new Webapps(this.client, resp);
      cb(null, webapps);
    }).bind(this));
  },

  getDevice: function(cb) {
    this.request("listTabs", (function(err, resp) {
      if (err) {
        return cb(err);
      }
      var device = new Device(this.client, resp);
      cb(null, device);
    }).bind(this));
  },

  getRoot: function(cb) {
    this.request("listTabs", (function(err, resp) {
      if (err) {
        return cb(err);
      }
      if (!resp.consoleActor) {
        return cb("No root actor being available.");
      }
      var root = new Tab(this.client, resp);
      cb(null, root);
    }).bind(this));
  }
})


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var net = __webpack_require__(111),
    events = __webpack_require__(41),
    extend = __webpack_require__(14);

var colors = __webpack_require__(193);

module.exports = Client;

// this is very unfortunate! and temporary. we can't
// rely on 'type' property to signify an event, and we
// need to write clients for each actor to handle differences
// in actor protocols
var unsolicitedEvents = {
  "tabNavigated": "tabNavigated",
  "styleApplied": "styleApplied",
  "propertyChange": "propertyChange",
  "networkEventUpdate": "networkEventUpdate",
  "networkEvent": "networkEvent",
  "propertyChange": "propertyChange",
  "newMutations": "newMutations",
  "appOpen": "appOpen",
  "appClose": "appClose",
  "appInstall": "appInstall",
  "appUninstall": "appUninstall",
  "frameUpdate": "frameUpdate",
  "tabListChanged": "tabListChanged"
};

/**
 * a Client object handles connecting with a Firefox remote debugging
 * server instance (e.g. a Firefox instance), plus sending and receiving
 * packets on that conection using the Firefox remote debugging protocol.
 *
 * Important methods:
 * connect - Create the connection to the server.
 * makeRequest - Make a request to the server with a JSON message,
 *   and a callback to call with the response.
 *
 * Important events:
 * 'message' - An unsolicited (e.g. not a response to a prior request)
 *    packet has been received. These packets usually describe events.
 */
function Client(options) {
  this.options = options || {};

  this.incoming = new Buffer("");

  this._pendingRequests = [];
  this._activeRequests = {};
}

Client.prototype = extend(events.EventEmitter.prototype, {
  connect: function(port, host, cb) {
    this.client = net.createConnection({
      port: port,
      host: host
    });

    this.client.on("connect", cb);
    this.client.on("data", this.onData.bind(this));
    this.client.on("error", this.onError.bind(this));
    this.client.on("end", this.onEnd.bind(this));
    this.client.on("timeout", this.onTimeout.bind(this));
  },

  disconnect: function() {
    if (this.client) {
      this.client.end();
    }
  },

  /**
   * Set a request to be sent to an actor on the server. If the actor
   * is already handling a request, queue this request until the actor
   * has responded to the previous request.
   *
   * @param {object} request
   *        Message to be JSON-ified and sent to server.
   * @param {function} callback
   *        Function that's called with the response from the server.
   */
  makeRequest: function(request, callback) {
    this.log("request: " + JSON.stringify(request).green);

    if (!request.to) {
      var type = request.type || "";
      throw new Error(type + " request packet has no destination.");
    }
    this._pendingRequests.push({ to: request.to,
                                 message: request,
                                 callback: callback });
    this._flushRequests();
  },

  /**
   * Activate (send) any pending requests to actors that don't have an
   * active request.
   */
  _flushRequests: function() {
    this._pendingRequests = this._pendingRequests.filter(function(request) {
      // only one active request per actor at a time
      if (this._activeRequests[request.to]) {
        return true;
      }

      // no active requests for this actor, so activate this one
      this.sendMessage(request.message);
      this.expectReply(request.to, request.callback);

      // remove from pending requests
      return false;
    }.bind(this));
  },

  /**
   * Send a JSON message over the connection to the server.
   */
  sendMessage: function(message) {
    if (!message.to) {
      throw new Error("No actor specified in request");
    }
    if (!this.client) {
      throw new Error("Not connected, connect() before sending requests");
    }
    var str = JSON.stringify(message);

    // message is preceded by byteLength(message):
    str = (new Buffer(str).length) + ":" + str;

    this.client.write(str);
  },

  /**
   * Arrange to hand the next reply from |actor| to |handler|.
   */
  expectReply: function(actor, handler) {
    if (this._activeRequests[actor]) {
      throw Error("clashing handlers for next reply from " + uneval(actor));
    }
    this._activeRequests[actor] = handler;
  },

  /**
   * Handler for a new message coming in. It's either an unsolicited event
   * from the server, or a response to a previous request from the client.
   */
  handleMessage: function(message) {
    if (!message.from) {
      if (message.error) {
        throw new Error(message.message);
      }
      throw new Error("Server didn't specify an actor: " + JSON.stringify(message));
    }

    if (!(message.type in unsolicitedEvents)
        && this._activeRequests[message.from]) {
      this.log("response: " + JSON.stringify(message).yellow);

      var callback = this._activeRequests[message.from];
      delete this._activeRequests[message.from];

      callback(message);

      this._flushRequests();
    }
    else if (message.type) {
      // this is an unsolicited event from the server
      this.log("unsolicited event: ".grey + JSON.stringify(message).grey);

      this.emit('message', message);
      return;
    }
    else {
      throw new Error("Unexpected packet from actor " +  message.from
      +  JSON.stringify(message));
    }
  },

  /**
   * Called when a new data chunk is received on the connection.
   * Parse data into message(s) and call message handler for any full
   * messages that are read in.
   */
  onData: function(data) {
    this.incoming = Buffer.concat([this.incoming, data]);

    while(this.readMessage()) {};
  },

  /**
   * Parse out and process the next message from the data read from
   * the connection. Returns true if a full meassage was parsed, false
   * otherwise.
   */
  readMessage: function() {
    var sep = this.incoming.toString().indexOf(':');
    if (sep < 0) {
      return false;
    }

    // beginning of a message is preceded by byteLength(message) + ":"
    var count = parseInt(this.incoming.slice(0, sep));

    if (this.incoming.length - (sep + 1) < count) {
      this.log("no complete response yet".grey);
      return false;
    }
    this.incoming = this.incoming.slice(sep + 1);

    var packet = this.incoming.slice(0, count);

    this.incoming = this.incoming.slice(count);

    var message;
    try {
      message = JSON.parse(packet.toString());
    } catch(e) {
      throw new Error("Couldn't parse packet from server as JSON " + e
        + ", message:\n" + packet);
    }
    this.handleMessage(message);

    return true;
  },

  onError: function(error) {
    var code = error.code ? error.code : error;
    this.log("connection error: ".red + code.red);
    this.emit("error", error);
  },

  onEnd: function() {
    this.log("connection closed by server".red);
    this.emit("end");
  },

  onTimeout: function() {
    this.log("connection timeout".red);
    this.emit("timeout");
  },

  log: function(str) {
    if (this.options.log) {
      console.log(str);
    }
  }
})


/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var select = __webpack_require__(110),
    extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17),
    JSObject = __webpack_require__(109);

module.exports = Console;

function Console(client, actor) {
  this.initialize(client, actor);

  this.on("consoleAPICall", this.onConsoleAPI.bind(this));
  this.on("pageError", this.onPageError.bind(this));
}

Console.prototype = extend(ClientMethods, {
  types: ["PageError", "ConsoleAPI"],

  /**
   * Response object:
   *   -empty-
   */
  startListening: function(cb) {
    this.request('startListeners', { listeners: this.types }, cb);
  },

  /**
   * Response object:
   *   -empty-
   */
  stopListening: function(cb) {
    this.request('stopListeners', { listeners: this.types }, cb);
  },

  /**
   * Event object:
   *   level - "log", etc.
   *   filename - file with call
   *   lineNumber - line number of call
   *   functionName - function log called from
   *   timeStamp - ms timestamp of call
   *   arguments - array of the arguments to log call
   *   private -
   */
  onConsoleAPI: function(event) {
    var message = this.transformConsoleCall(event.message);

    this.emit("console-api-call", message);
  },

  /**
   * Event object:
   *   errorMessage - string error message
   *   sourceName - file error
   *   lineText
   *   lineNumber - line number of error
   *   columnNumber - column number of error
   *   category - usually "content javascript",
   *   timeStamp - time in ms of error occurance
   *   warning - whether it's a warning
   *   error - whether it's an error
   *   exception - whether it's an exception
   *   strict -
   *   private -
   */
  onPageError: function(event) {
    this.emit("page-error", event.pageError);
  },

  /**
   * Response object: array of page error or console call objects.
   */
  getCachedLogs: function(cb) {
    var message = {
      messageTypes: this.types
    };
    this.request('getCachedMessages', message, function(resp) {
      select(resp, ".messages > *").update(this.transformConsoleCall.bind(this));
      return resp.messages;
    }.bind(this), cb);
  },

  /**
   * Response object:
   *   -empty-
   */
  clearCachedLogs: function(cb) {
    this.request('clearMessagesCache', cb);
  },

  /**
   * Response object:
   *   input - original input
   *   result - result of the evaluation, a value or JSObject
   *   timestamp - timestamp in ms of the evaluation
   *   exception - any exception as a result of the evaluation
   */
  evaluateJS: function(text, cb) {
    this.request('evaluateJS', { text: text }, function(resp) {
      return select(resp, ".result, .exception")
             .update(this.createJSObject.bind(this));
    }.bind(this), cb)
  },

  transformConsoleCall: function(message) {
    return select(message, ".arguments > *").update(this.createJSObject.bind(this));
  }
})


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17);

module.exports = Memory;

function Memory(client, actor) {
  this.initialize(client, actor);
}

Memory.prototype = extend(ClientMethods, {
  measure: function(cb) {
    this.request('measure', function (err, resp) {
      cb(err, resp);
    });
  }
})


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17),
    Node = __webpack_require__(197);

module.exports = DOM;

function DOM(client, actor) {
  this.initialize(client, actor);
  this.walker = null;
}

DOM.prototype = extend(ClientMethods, {
  document: function(cb) {
    this.walkerRequest("document", function(err, resp) {
      if (err) return cb(err);

      var node = new Node(this.client, this.walker, resp.node);
      cb(null, node);
    }.bind(this))
  },

  documentElement: function(cb) {
    this.walkerRequest("documentElement", function(err, resp) {
      var node = new Node(this.client, this.walker, resp.node);
      cb(err, node);
    }.bind(this))
  },

  querySelector: function(selector, cb) {
    this.document(function(err, node) {
      if (err) return cb(err);

      node.querySelector(selector, cb);
    })
  },

  querySelectorAll: function(selector, cb) {
    this.document(function(err, node) {
      if (err) return cb(err);

      node.querySelectorAll(selector, cb);
    })
  },

  getComputedStyle: function(node, cb) {
    this.styleRequest("getComputed", { node: node.actor },
                      this.pluck('computed'), cb);
  },

  getUsedFontFaces: function(node, options, cb) {
    var message = {
      node: node.actor,
      includePreviews: options.includePreviews,
      previewText: options.previewText,
      previewFontSize: options.previewFontSize
    };

    this.styleRequest("getUsedFontFaces", message,
                      this.pluck('fontFaces'), cb);
  },

  getFontPreview: function(node, font, cb) {
    this.styleRequest("getFontPreview", { node: node.actor, font: font }, cb);
  },

  walkerRequest: function(type, message, cb) {
    this.getWalker(function(err, walker) {
      walker.request(type, message, cb);
    });
  },

  getWalker: function(cb) {
    if (this.walker) {
      return cb(null, this.walker);
    }
    this.request('getWalker', function(err, resp) {
      this.walker = new Walker(this.client, resp.walker);
      cb(err, this.walker);
    }.bind(this))
  },

  styleRequest: function(type, message, transform, cb) {
    this.getStyle(function(err, style) {
      if (err) throw err;

      style.request(type, message, transform, cb);
    })
  },

  getStyle: function(cb) {
    if (this.style) {
      return cb(null, this.style);
    }
    this.request('getPageStyle', function(err, resp) {
      this.style = new Style(this.client, resp.pageStyle);
      cb(err, this.style);
    }.bind(this))
  }
})

function Walker(client, walker) {
  this.initialize(client, walker.actor);

  this.root = new Node(client, this, walker.root);
}

Walker.prototype = extend(ClientMethods, {});

function Style(client, style) {
  this.initialize(client, style.actor);
}

Style.prototype = extend(ClientMethods, {});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17);

module.exports = Node;

function Node(client, walker, node) {
  this.initialize(client, node.actor);
  this.walker = walker;

  this.getNode = this.getNode.bind(this);
  this.getNodeArray = this.getNodeArray.bind(this);
  this.getNodeList = this.getNodeList.bind(this);

  walker.on('newMutations', function(event) {
    //console.log("on new mutations! ", JSON.stringify(event));
  });

  ['nodeType', 'nodeName', 'namespaceURI', 'attrs']
  .forEach(function(attr) {
    this[attr] = node[attr];
  }.bind(this));
}

Node.prototype = extend(ClientMethods, {
  getAttribute: function(name) {
    for (var i in this.attrs) {
      var attr = this.attrs[i];
      if (attr.name == name) {
        return attr.value;
      }
    }
  },

  setAttribute: function(name, value, cb) {
    var mods = [{
      attributeName: name,
      newValue: value
    }];
    this.request('modifyAttributes', { modifications: mods }, cb);
  },

  parentNode: function(cb) {
    this.parents(function(err, nodes) {
      if (err) {
        return cb(err);
      }
      var node = null;
      if (nodes.length) {
        node = nodes[0];
      }
      cb(null, node);
    })
  },

  parents: function(cb) {
    this.nodeRequest('parents', this.getNodeArray, cb);
  },

  children: function(cb) {
    this.nodeRequest('children', this.getNodeArray, cb);
  },

  siblings: function(cb) {
    this.nodeRequest('siblings', this.getNodeArray, cb);
  },

  nextSibling: function(cb) {
    this.nodeRequest('nextSibling', this.getNode, cb);
  },

  previousSibling: function(cb) {
    this.nodeRequest('previousSibling', this.getNode, cb);
  },

  querySelector: function(selector, cb) {
    this.nodeRequest('querySelector', { selector: selector },
                     this.getNode, cb);
  },

  querySelectorAll: function(selector, cb) {
    this.nodeRequest('querySelectorAll', { selector: selector },
                     this.getNodeList, cb);
  },

  getUniqueSelector: function(cb) {
    this.request('getUniqueSelector', cb);
  },

  innerHTML: function(cb) {
    this.nodeRequest('innerHTML', function(resp) {
      return resp.value;
    }, cb)
  },

  outerHTML: function(cb) {
    this.nodeRequest('outerHTML', function(resp) {
      return resp.value;
    }, cb)
  },

  remove: function(cb) {
    this.nodeRequest('removeNode', function(resp) {
      return new Node(this.client, this.walker, resp.nextSibling);
    }.bind(this), cb);
  },

  highlight: function(cb) {
    this.nodeRequest('highlight', cb);
  },

  release: function(cb) {
    this.nodeRequest('releaseNode', cb);
  },

  getNode: function(resp) {
    if (resp.node) {
      return new Node(this.client, this.walker, resp.node);
    }
    return null;
  },

  getNodeArray: function(resp) {
    return resp.nodes.map(function(form) {
      return new Node(this.client, this.walker, form);
    }.bind(this));
  },

  getNodeList: function(resp) {
    return new NodeList(this.client, this.walker, resp.list);
  },

  nodeRequest: function(type, message, transform, cb) {
    if (!cb) {
      cb = transform;
      transform = message;
      message = {};
    }
    message.node = this.actor;

    this.walker.request(type, message, transform, cb);
  }
});

function NodeList(client, walker, list) {
  this.client = client;
  this.walker = walker;
  this.actor = list.actor;

  this.length = list.length;
}

NodeList.prototype = extend(ClientMethods, {
  items: function(start, end, cb) {
    if (typeof start == "function") {
      cb = start;
      start = 0;
      end = this.length;
    }
    else if (typeof end == "function") {
      cb = end;
      end = this.length;
    }
    this.request('items', { start: start, end: end },
      this.getNodeArray.bind(this), cb);
  },

  // TODO: add this function to ClientMethods
  getNodeArray: function(resp) {
    return resp.nodes.map(function(form) {
      return new Node(this.client, this.walker, form);
    }.bind(this));
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14);
var ClientMethods = __webpack_require__(17);

module.exports = Network;

function Network(client, actor) {
  this.initialize(client, actor);

  this.on("networkEvent", this.onNetworkEvent.bind(this));
}

Network.prototype = extend(ClientMethods, {
  types: ["NetworkActivity"],

  startLogging: function(cb) {
    this.request('startListeners', { listeners: this.types }, cb);
  },

  stopLogging: function(cb) {
    this.request('stopListeners', { listeners: this.types }, cb);
  },

  onNetworkEvent: function(event) {
    var networkEvent = new NetworkEvent(this.client, event.eventActor);

    this.emit("network-event", networkEvent);
  },

  sendHTTPRequest: function(request, cb) {
    this.request('sendHTTPRequest', { request: request }, function(resp) {
      return new NetworkEvent(this.client, resp.eventActor);
    }.bind(this), cb);
  }
})

function NetworkEvent(client, event) {
  this.initialize(client, event.actor);
  this.event = event;

  this.on("networkEventUpdate", this.onUpdate.bind(this));
}

NetworkEvent.prototype = extend(ClientMethods, {
  get url() {
   return this.event.url;
  },

  get method() {
    return this.event.method;
  },

  get isXHR() {
    return this.event.isXHR;
  },

  getRequestHeaders: function(cb) {
    this.request('getRequestHeaders', cb);
  },

  getRequestCookies: function(cb) {
    this.request('getRequestCookies', this.pluck('cookies'), cb);
  },

  getRequestPostData: function(cb) {
    this.request('getRequestPostData', cb);
  },

  getResponseHeaders: function(cb) {
    this.request('getResponseHeaders', cb);
  },

  getResponseCookies: function(cb) {
    this.request('getResponseCookies', this.pluck('cookies'), cb);
  },

  getResponseContent: function(cb) {
    this.request('getResponseContent', cb);
  },

  getEventTimings: function(cb) {
    this.request('getEventTimings', cb);
  },

  onUpdate: function(event) {
    var types = {
      "requestHeaders": "request-headers",
      "requestCookies": "request-cookies",
      "requestPostData": "request-postdata",
      "responseStart": "response-start",
      "responseHeaders": "response-headers",
      "responseCookies": "response-cookies",
      "responseContent": "response-content",
      "eventTimings": "event-timings"
    }

    var type = types[event.updateType];
    delete event.updateType;

    this.emit(type, event);
  }
})






/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14);
var ClientMethods = __webpack_require__(17);

module.exports = StyleSheets;

function StyleSheets(client, actor) {
  this.initialize(client, actor);
}

StyleSheets.prototype = extend(ClientMethods, {
  getStyleSheets: function(cb) {
    this.request('getStyleSheets', function(resp) {
      return resp.styleSheets.map(function(sheet) {
        return new StyleSheet(this.client, sheet);
      }.bind(this));
    }.bind(this), cb);
  },

  addStyleSheet: function(text, cb) {
    this.request('addStyleSheet', { text: text }, function(resp) {
      return new StyleSheet(this.client, resp.styleSheet);
    }.bind(this), cb);
  }
})

function StyleSheet(client, sheet) {
  this.initialize(client, sheet.actor);
  this.sheet = sheet;

  this.on("propertyChange", this.onPropertyChange.bind(this));
}

StyleSheet.prototype = extend(ClientMethods, {
  get href() {
    return this.sheet.href;
  },

  get disabled() {
    return this.sheet.disabled;
  },

  get ruleCount() {
    return this.sheet.ruleCount;
  },

  onPropertyChange: function(event) {
    this.sheet[event.property] = event.value;
    this.emit(event.property + "-changed", event.value);
  },

  toggleDisabled: function(cb) {
    this.request('toggleDisabled', function(err, resp) {
      if (err) return cb(err);

      this.sheet.disabled = resp.disabled;
      cb(null, resp.disabled);
    }.bind(this));
  },

  getOriginalSources: function(cb) {
    this.request('getOriginalSources', function(resp) {
      if (resp.originalSources === null) {
        return [];
      }
      return resp.originalSources.map(function(form) {
        return new OriginalSource(this.client, form);
      }.bind(this));
    }.bind(this), cb);
  },

  getMediaRules: function(cb) {
    this.request('getMediaRules', function(resp) {
      return resp.mediaRules.map(function(form) {
        return new MediaRule(this.client, form);
      }.bind(this));
    }.bind(this), cb);
  },

  update: function(text, cb) {
    this.request('update', { text: text, transition: true }, cb);
  },

  getText: function(cb) {
    this.request('getText', this.pluck('text'), cb);
  }
});

function MediaRule(client, rule) {
  this.initialize(client, rule.actor);
  this.rule = rule;

  this.on("matchesChange", function(event) {
    this.emit("matches-change", event.matches);
  }.bind(this));
}
MediaRule.prototype = extend(ClientMethods, {
  get mediaText() {
    return this.rule.mediaText;
  },

  get matches() {
    return this.rule.matches;
  }
})

function OriginalSource(client, source) {
  console.log("source", source);
  this.initialize(client, source.actor);

  this.source = source;
}

OriginalSource.prototype = extend(ClientMethods, {
  get url()  {
    return this.source.url
  },

  getText: function(cb) {
    this.request('getText', this.pluck('text'), cb);
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17),
    Tab = __webpack_require__(82),
    fs = __webpack_require__(48),
    spawn = __webpack_require__(201).spawn;

module.exports = Webapps;

var CHUNK_SIZE = 20480;

// Also dispatch appOpen/appClose, appInstall/appUninstall events
function Webapps(client, tab) {
  this.initialize(client, tab.webappsActor);
}

Webapps.prototype = extend(ClientMethods, {
  watchApps: function(cb) {
    this.request("watchApps", cb);
  },
  unwatchApps: function(cb) {
    this.request("unwatchApps", cb);
  },
  launch: function(manifestURL, cb) {
    this.request("launch", {manifestURL: manifestURL}, cb);
  },
  close: function(manifestURL, cb) {
    this.request("close", {manifestURL: manifestURL}, cb);
  },
  getInstalledApps: function(cb) {
    this.request("getAll", function (err, resp) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, resp.apps);
    });
  },
  listRunningApps: function(cb) {
    this.request("listRunningApps", function (err, resp) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, resp.apps);
    });
  },
  getApp: function(manifestURL, cb) {
    this.request("getAppActor", {manifestURL: manifestURL}, (function (err, resp) {
      if (err) {
        cb(err);
        return;
      }
      var actor = new Tab(this.client, resp.actor);
      cb(null, actor);
    }).bind(this));
  },
  installHosted: function(options, cb) {
    this.request(
      "install",
      { appId: options.appId,
        metadata: options.metadata,
        manifest: options.manifest },
      function (err, resp) {
        if (err || resp.error) {
          cb(err || resp.error);
          return;
        }
        cb(null, resp.appId);
      });
  },
  _upload: function (path, cb) {
    // First create an upload actor
    this.request("uploadPackage", function (err, resp) {
      var actor = resp.actor;
      fs.readFile(path, function(err, data) {
        chunk(actor, data);
      });
    });
    // Send push the file chunk by chunk
    var self = this;
    var step = 0;
    function chunk(actor, data) {
      var i = step++ * CHUNK_SIZE;
      var m = Math.min(i + CHUNK_SIZE, data.length);
      var c = "";
      for(; i < m; i++)
        c += String.fromCharCode(data[i]);
      var message = {
        to: actor,
        type: "chunk",
        chunk: c
      };
      self.client.makeRequest(message, function(resp) {
        if (resp.error) {
          cb(resp);
          return;
        }
        if (i < data.length) {
          setTimeout(chunk, 0, actor, data);
        } else {
          done(actor);
        }
      });
    }
    // Finally close the upload
    function done(actor) {
      var message = {
        to: actor,
        type: "done"
      };
      self.client.makeRequest(message, function(resp) {
        if (resp.error) {
          cb(resp);
        } else {
          cb(null, actor, cleanup.bind(null, actor));
        }
      });
    }

    // Remove the temporary uploaded file from the server:
    function cleanup(actor) {
      var message = {
        to: actor,
        type: "remove"
      };
      self.client.makeRequest(message, function () {});
    }
  },
  installPackaged: function(path, appId, cb) {
    this._upload(path, (function (err, actor, cleanup) {
      this.request("install", {appId: appId, upload: actor},
        function (err, resp) {
          if (err) {
            cb(err);
            return;
          }
          cb(null, resp.appId);
          cleanup();
        });
    }).bind(this));
  },
  installPackagedWithADB: function(path, appId, cb) {
    var self = this;
    // First ensure the temporary folder exists
    function createTemporaryFolder() {
      var c = spawn("adb", ["shell", "mkdir -p /data/local/tmp/b2g/" + appId], {stdio:"inherit"});
      c.on("close", uploadPackage);
    }
    // then upload the package to the temporary directory
    function uploadPackage() {
      var child = spawn("adb", ["push", path, "/data/local/tmp/b2g/" + appId + "/application.zip"], {stdio:"inherit"});
      child.on("close", installApp);
    }
    // finally order the webapps actor to install the app
    function installApp() {
      self.request("install", {appId: appId},
        function (err, resp) {
          if (err) {
            cb(err);
            return;
          }
          cb(null, resp.appId);
        });
    }
    createTemporaryFolder();
  },
  uninstall: function(manifestURL, cb) {
    this.request("uninstall", {manifestURL: manifestURL}, cb);
  }
})


/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17);

module.exports = Device;

function Device(client, tab) {
  this.initialize(client, tab.deviceActor);
}

Device.prototype = extend(ClientMethods, {
  getDescription: function(cb) {
    this.request("getDescription", function(err, resp) {
      if (err) {
        return cb(err);
      }

      cb(null, resp.value);
    });
  },
  getRawPermissionsTable: function(cb) {
    this.request("getRawPermissionsTable", function(err, resp) {
      if (err) {
        return cb(err);
      }

      cb(null, resp.value.rawPermissionsTable);
    });
  }
})


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(14),
    ClientMethods = __webpack_require__(17),
    Tab = __webpack_require__(82);

module.exports = SimulatorApps;

function SimulatorApps(client, actor) {
  this.initialize(client, actor);
}

SimulatorApps.prototype = extend(ClientMethods, {
  listApps: function(cb) {
    this.request('listApps', function(resp) {
      var apps = [];
      for (var url in resp.apps) {
        var app = resp.apps[url];
        apps.push(new Tab(this.client, app));
      }
      return apps;
    }.bind(this), cb);
  }
})


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mocha = __webpack_require__(4);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = __webpack_require__(5);

var _helpers = __webpack_require__(10);

var _docs = __webpack_require__(55);

var _docs2 = _interopRequireDefault(_docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('docs', function () {
  (0, _mocha.it)('passes the correct url to docs', function () {
    var openUrl = _sinon2.default.spy(function (urlToOpen, callback) {
      return callback(null);
    });
    return (0, _docs2.default)({}, { openUrl: openUrl }).then(function () {
      _sinon2.default.assert.calledWith(openUrl, _docs.url);
    });
  });

  (0, _mocha.it)('throws an error when open fails', function () {
    var openUrl = _sinon2.default.spy(function (urlToOpen, callback) {
      return callback(new Error('pretends this is an error from open()'));
    });
    return (0, _docs2.default)({}, { openUrl: openUrl }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      _chai.assert.match(error.message, /error from open()/);
    });
  });
});

/***/ }),
/* 205 */
/***/ (function(module, exports) {

module.exports = require("opn");

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _lint = __webpack_require__(56);

var _lint2 = _interopRequireDefault(_lint);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('lint', function () {

  function setUp() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        createLinter = _ref.createLinter,
        createFileFilter = _ref.createFileFilter;

    var lintResult = '<lint.run() result placeholder>';
    var runLinter = _sinon2.default.spy(function () {
      return Promise.resolve(lintResult);
    });
    if (!createLinter) {
      createLinter = _sinon2.default.spy(function () {
        return { run: runLinter };
      });
    }
    return {
      lintResult: lintResult,
      createLinter: createLinter,
      runLinter: runLinter,
      lint: function lint() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return (0, _lint2.default)((0, _extends3.default)({
          sourceDir: '/fake/source/dir'
        }, params), (0, _extends3.default)({
          createLinter: createLinter,
          createFileFilter: createFileFilter
        }, options));
      }
    };
  }

  (0, _mocha.it)('creates and runs a linter', function () {
    var _setUp = setUp(),
        lint = _setUp.lint,
        createLinter = _setUp.createLinter,
        runLinter = _setUp.runLinter,
        lintResult = _setUp.lintResult;

    return lint().then(function (actualLintResult) {
      _chai.assert.equal(actualLintResult, lintResult);
      _sinon2.default.assert.called(createLinter);
      _sinon2.default.assert.called(runLinter);
    });
  });

  (0, _mocha.it)('fails when the linter fails', function () {
    var createLinter = function createLinter() {
      return {
        run: function run() {
          return Promise.reject(new Error('some error from the linter'));
        }
      };
    };

    var _setUp2 = setUp({ createLinter: createLinter }),
        lint = _setUp2.lint;

    return lint().then((0, _helpers.makeSureItFails)(), function (error) {
      _chai.assert.match(error.message, /error from the linter/);
    });
  });

  (0, _mocha.it)('runs as a binary', function () {
    var _setUp3 = setUp(),
        lint = _setUp3.lint,
        createLinter = _setUp3.createLinter;

    return lint().then(function () {
      _sinon2.default.assert.calledWithMatch(createLinter, { runAsBinary: true });
    });
  });

  (0, _mocha.it)('sets runAsBinary according shouldExitProgram option', function () {
    var _setUp4 = setUp(),
        lint = _setUp4.lint,
        createLinter = _setUp4.createLinter;

    return lint({}, { shouldExitProgram: false }).then(function () {
      _sinon2.default.assert.calledWithMatch(createLinter, { runAsBinary: false });
    });
  });

  (0, _mocha.it)('passes sourceDir to the linter', function () {
    var _setUp5 = setUp(),
        lint = _setUp5.lint,
        createLinter = _setUp5.createLinter;

    return lint({ sourceDir: '/some/path' }).then(function () {
      var config = createLinter.firstCall.args[0].config;
      _chai.assert.equal(config._[0], '/some/path');
    });
  });

  (0, _mocha.it)('passes warningsAsErrors to the linter', function () {
    var _setUp6 = setUp(),
        lint = _setUp6.lint,
        createLinter = _setUp6.createLinter;

    return lint({ warningsAsErrors: true }).then(function () {
      _sinon2.default.assert.calledWithMatch(createLinter, {
        config: {
          warningsAsErrors: true
        }
      });
    });
  });

  (0, _mocha.it)('passes warningsAsErrors undefined to the linter', function () {
    var _setUp7 = setUp(),
        lint = _setUp7.lint,
        createLinter = _setUp7.createLinter;

    return lint().then(function () {
      _sinon2.default.assert.calledWithMatch(createLinter, {
        config: {
          warningsAsErrors: undefined
        }
      });
    });
  });

  (0, _mocha.it)('configures the linter when verbose', function () {
    var _setUp8 = setUp(),
        lint = _setUp8.lint,
        createLinter = _setUp8.createLinter;

    return lint({ verbose: true }).then(function () {
      _sinon2.default.assert.calledWithMatch(createLinter, {
        config: {
          logLevel: 'debug',
          stack: true
        }
      });
    });
  });

  (0, _mocha.it)('configures the linter when not verbose', function () {
    var _setUp9 = setUp(),
        lint = _setUp9.lint,
        createLinter = _setUp9.createLinter;

    return lint({ verbose: false }).then(function () {
      _sinon2.default.assert.calledWithMatch(createLinter, {
        config: {
          logLevel: 'fatal',
          stack: false
        }
      });
    });
  });

  (0, _mocha.it)('passes through linter configuration', function () {
    var _setUp10 = setUp(),
        lint = _setUp10.lint,
        createLinter = _setUp10.createLinter;

    return lint({
      pretty: true,
      metadata: true,
      output: 'json',
      boring: true,
      selfHosted: true
    }).then(function () {
      _sinon2.default.assert.calledWithMatch(createLinter, {
        config: {
          pretty: true,
          metadata: true,
          output: 'json',
          boring: true,
          selfHosted: true
        }
      });
    });
  });

  (0, _mocha.it)('configures a lint command with the expected fileFilter', function () {
    var fileFilter = { wantFile: _sinon2.default.spy(function () {
        return true;
      }) };
    var createFileFilter = _sinon2.default.spy(function () {
      return fileFilter;
    });

    var _setUp11 = setUp({ createFileFilter: createFileFilter }),
        lint = _setUp11.lint,
        createLinter = _setUp11.createLinter;

    var params = {
      sourceDir: '.',
      artifactsDir: 'artifacts',
      ignoreFiles: ['file1', '**/file2']
    };
    return lint(params).then(function () {
      _sinon2.default.assert.calledWith(createFileFilter, params);

      _chai.assert.ok(createLinter.called);
      var shouldScanFile = createLinter.firstCall.args[0].config.shouldScanFile;

      shouldScanFile('path/to/file');
      _sinon2.default.assert.calledWith(fileFilter.wantFile, 'path/to/file');
    });
  });
});

/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = require("addons-linter");

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _run2 = __webpack_require__(57);

var _run3 = _interopRequireDefault(_run2);

var _helpers = __webpack_require__(10);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
// Fake result for client.installTemporaryAddon().then(installResult => ...)

var tempInstallResult = {
  addon: { id: 'some-addon@test-suite' }
};

function prepareRun(fakeInstallResult) {
  var sourceDir = (0, _helpers.fixturePath)('minimal-web-ext');

  var argv = {
    artifactsDir: _path2.default.join(sourceDir, 'web-ext-artifacts'),
    sourceDir: sourceDir,
    noReload: true,
    keepProfileChanges: false,
    browserConsole: false
  };
  var options = {
    buildExtension: _sinon2.default.spy(function () {}),
    firefoxApp: (0, _helpers.getFakeFirefox)(),
    firefoxClient: _sinon2.default.spy(function () {
      return Promise.resolve((0, _helpers.getFakeRemoteFirefox)({
        installTemporaryAddon: function installTemporaryAddon() {
          return Promise.resolve(fakeInstallResult || tempInstallResult);
        }
      }));
    }),
    reloadStrategy: _sinon2.default.spy(function () {
      log.debug('fake: reloadStrategy()');
    }),
    MultiExtensionRunner: _sinon2.default.spy(_helpers.FakeExtensionRunner),
    desktopNotifications: _sinon2.default.spy(function () {})
  };

  return {
    argv: argv,
    options: options,
    run: function run() {
      var customArgv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var customOpt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (0, _run3.default)((0, _extends3.default)({}, argv, customArgv), (0, _extends3.default)({}, options, customOpt));
    }
  };
}

(0, _mocha.describe)('run', function () {
  var androidRunnerStub = void 0;
  var desktopRunnerStub = void 0;

  (0, _mocha.beforeEach)(function () {
    androidRunnerStub = _sinon2.default.stub(
    // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
    __webpack_require__(84), 'FirefoxAndroidExtensionRunner');

    desktopRunnerStub = _sinon2.default.stub(
    // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
    __webpack_require__(83), 'FirefoxDesktopExtensionRunner');
  });
  (0, _mocha.afterEach)(function () {
    androidRunnerStub.restore();
    androidRunnerStub = undefined;
    desktopRunnerStub.restore();
    desktopRunnerStub = undefined;
  });

  (0, _mocha.it)('passes a custom Firefox binary when specified', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var firefox, cmd;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            firefox = '/pretend/path/to/Firefox/firefox-bin';
            cmd = prepareRun();
            _context.next = 4;
            return cmd.run({ firefox: firefox });

          case 4:
            _sinon2.default.assert.calledWithMatch(desktopRunnerStub, { firefoxBinary: firefox });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  (0, _mocha.it)('passes startUrl parameter to Firefox when specified', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var cmd, expectedStartUrls;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cmd = prepareRun();
            expectedStartUrls = ['www.example.com'];
            _context2.next = 4;
            return cmd.run({ startUrl: expectedStartUrls });

          case 4:
            _sinon2.default.assert.calledWithMatch(desktopRunnerStub, { startUrl: expectedStartUrls });

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  (0, _mocha.it)('passes the expected parameters to the extension runner', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var cmd, runOptions, runnerParams, expectedRunnerParams;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cmd = prepareRun();
            runOptions = {
              preInstall: true,
              keepProfileChanges: true,
              browserConsole: true,
              firefox: '/path/to/custom/bin/firefox',
              pref: { 'my.custom.pref': 'value' },
              firefoxProfile: '/path/to/custom/profile'
            };
            _context3.next = 4;
            return cmd.run(runOptions);

          case 4:

            _sinon2.default.assert.calledOnce(desktopRunnerStub);
            runnerParams = desktopRunnerStub.firstCall.args[0];

            // The runner should receive the same parameters as the options sent
            // to run() with just a few minor adjustments.

            expectedRunnerParams = (0, _extends3.default)({}, runOptions, {
              firefoxBinary: runOptions.firefox,
              customPrefs: runOptions.pref
            });

            delete expectedRunnerParams.firefox;
            delete expectedRunnerParams.pref;

            _chai.assert.deepEqual({
              preInstall: runnerParams.preInstall,
              keepProfileChanges: runnerParams.keepProfileChanges,
              browserConsole: runnerParams.browserConsole,
              firefoxBinary: runnerParams.firefoxBinary,
              customPrefs: runnerParams.customPrefs,
              firefoxProfile: runnerParams.profilePath
            }, expectedRunnerParams);
            _chai.assert.equal(runnerParams.extensions.length, 1);
            _chai.assert.equal(runnerParams.extensions[0].sourceDir, cmd.argv.sourceDir);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  (0, _mocha.it)('passes the expected dependencies to the extension runner', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var cmd, _cmd$options, firefoxApp, firefoxClient, runnerParams;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cmd = prepareRun();
            _cmd$options = cmd.options, firefoxApp = _cmd$options.firefoxApp, firefoxClient = _cmd$options.firefoxClient;
            _context4.next = 4;
            return cmd.run({});

          case 4:
            _sinon2.default.assert.calledOnce(desktopRunnerStub);
            runnerParams = desktopRunnerStub.firstCall.args[0];

            _chai.assert.deepEqual({
              firefoxApp: runnerParams.firefoxApp,
              firefoxClient: runnerParams.firefoxClient
            }, { firefoxApp: firefoxApp, firefoxClient: firefoxClient });

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  (0, _mocha.it)('can watch and reload the extension', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var cmd, _cmd$argv, sourceDir, artifactsDir, reloadStrategy, args;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cmd = prepareRun();
            _cmd$argv = cmd.argv, sourceDir = _cmd$argv.sourceDir, artifactsDir = _cmd$argv.artifactsDir;
            reloadStrategy = cmd.options.reloadStrategy;
            _context5.next = 5;
            return cmd.run({ noReload: false });

          case 5:
            _chai.assert.equal(reloadStrategy.called, true);
            args = reloadStrategy.firstCall.args[0];

            _chai.assert.equal(args.sourceDir, sourceDir);
            _chai.assert.equal(args.artifactsDir, artifactsDir);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  (0, _mocha.it)('can disable input in the reload strategy', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var cmd, reloadStrategy;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            cmd = prepareRun();
            reloadStrategy = cmd.options.reloadStrategy;
            _context6.next = 4;
            return cmd.run({ noInput: true, noReload: false });

          case 4:
            _sinon2.default.assert.calledWithMatch(reloadStrategy, { noInput: true });

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  (0, _mocha.it)('will not reload when using --pre-install', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var cmd, reloadStrategy;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            cmd = prepareRun();
            reloadStrategy = cmd.options.reloadStrategy;

            // --pre-install should imply --no-reload

            _context7.next = 4;
            return cmd.run({ noReload: false, preInstall: true });

          case 4:
            _chai.assert.equal(reloadStrategy.called, false);

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  (0, _mocha.it)('allows you to opt out of extension reloading', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var cmd, reloadStrategy;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            cmd = prepareRun();
            reloadStrategy = cmd.options.reloadStrategy;
            _context8.next = 4;
            return cmd.run({ noReload: true });

          case 4:
            _chai.assert.equal(reloadStrategy.called, false);

          case 5:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  (0, _mocha.it)('allows to replace manifest parser', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
    var cmd, getFakeManifest;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            cmd = prepareRun();
            getFakeManifest = _sinon2.default.spy();
            _context9.next = 4;
            return cmd.run({}, { getValidatedManifest: getFakeManifest });

          case 4:
            _chai.assert.equal(getFakeManifest.called, true);

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));

  (0, _mocha.it)('returns ExtensonRunner', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
    var cmd, extensionRunner;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            cmd = prepareRun();
            _context10.next = 3;
            return cmd.run();

          case 3:
            extensionRunner = _context10.sent;

            _chai.assert.instanceOf(extensionRunner, _helpers.FakeExtensionRunner);

          case 5:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  (0, _mocha.it)('creates a Firefox Desktop runner if targets is an empty array', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
    var cmd;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            cmd = prepareRun();
            _context11.next = 3;
            return cmd.run({ target: [] });

          case 3:
            _sinon2.default.assert.notCalled(androidRunnerStub);
            _sinon2.default.assert.calledOnce(desktopRunnerStub);

          case 5:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));

  (0, _mocha.it)('creates a Firefox Desktop runner if "firefox-desktop" is in target', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
    var cmd;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            cmd = prepareRun();
            _context12.next = 3;
            return cmd.run({ target: ['firefox-desktop'] });

          case 3:
            _sinon2.default.assert.notCalled(androidRunnerStub);
            _sinon2.default.assert.calledOnce(desktopRunnerStub);

          case 5:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  (0, _mocha.it)('creates a Firefox Android runner if "firefox-android" is in target', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
    var cmd;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            cmd = prepareRun();
            _context13.next = 3;
            return cmd.run({ target: ['firefox-android'] });

          case 3:

            _sinon2.default.assert.calledOnce(androidRunnerStub);
            _sinon2.default.assert.notCalled(desktopRunnerStub);

          case 5:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  })));

  (0, _mocha.it)('creates multiple extension runners', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
    var cmd;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            cmd = prepareRun();
            _context14.next = 3;
            return cmd.run({ target: ['firefox-android', 'firefox-desktop'] });

          case 3:

            _sinon2.default.assert.calledOnce(androidRunnerStub);
            _sinon2.default.assert.calledOnce(desktopRunnerStub);

          case 5:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));

  (0, _mocha.it)('provides a buildSourceDir method to the Firefox Android runner', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
    var cmd, buildSourceDir;
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            cmd = prepareRun();
            _context15.next = 3;
            return cmd.run({ target: ['firefox-android'] });

          case 3:

            _sinon2.default.assert.calledWithMatch(androidRunnerStub, {
              buildSourceDir: _sinon2.default.match.func
            });

            buildSourceDir = androidRunnerStub.firstCall.args[0].buildSourceDir;
            _context15.next = 7;
            return buildSourceDir('/fake/source/dir');

          case 7:

            _sinon2.default.assert.calledWithMatch(cmd.options.buildExtension, {
              sourceDir: '/fake/source/dir'
            });

          case 8:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});
/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/test-cmd/test.run.js"))

/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = require("node-notifier");

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = require("adbkit");

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _copyDir = __webpack_require__(212);

var _copyDir2 = _interopRequireDefault(_copyDir);

var _mz = __webpack_require__(9);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _errors = __webpack_require__(3);

var _manifest = __webpack_require__(33);

var _tempDir = __webpack_require__(16);

var _test = __webpack_require__(53);

var _sign2 = __webpack_require__(59);

var _sign3 = _interopRequireDefault(_sign2);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow type
(0, _mocha.describe)('sign', function () {

  function getStubs() {
    var signingConfig = {
      apiKey: 'AMO JWT issuer',
      apiSecret: 'AMO JWT secret',
      apiUrlPrefix: 'http://not-the-real-amo.com/api/v3',
      apiProxy: 'http://yourproxy:6000',
      timeout: 999
    };

    var buildResult = {
      extensionPath: '/tmp/built-web-extension.xpi'
    };
    var build = _sinon2.default.spy(function () {
      return Promise.resolve(buildResult);
    });

    var signingResult = {
      id: 'some-addon-id',
      success: true,
      downloadedFiles: []
    };
    var signAddon = _sinon2.default.spy(function () {
      return Promise.resolve(signingResult);
    });

    return {
      signingConfig: signingConfig,
      build: build,
      buildResult: buildResult,
      signAddon: signAddon,
      signingResult: signingResult,
      preValidatedManifest: _helpers.basicManifest
    };
  }

  /*
   * Run the sign command with stubs for all dependencies.
   */
  function sign(tmpDir, stubs) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$extraArgs = _ref.extraArgs,
        extraArgs = _ref$extraArgs === undefined ? {} : _ref$extraArgs,
        _ref$extraOptions = _ref.extraOptions,
        extraOptions = _ref$extraOptions === undefined ? {} : _ref$extraOptions;

    return (0, _sign3.default)((0, _extends3.default)({
      verbose: false,
      artifactsDir: _path2.default.join(tmpDir.path(), 'artifacts-dir'),
      sourceDir: tmpDir.path()
    }, stubs.signingConfig, extraArgs), (0, _extends3.default)({}, stubs, extraOptions));
  }

  (0, _mocha.it)('builds and signs an extension', function () {
    return (0, _tempDir.withTempDir)(
    // This test only stubs out the signer in an effort to integrate
    // all other parts of the process.
    function (tmpDir) {
      var stubs = getStubs();
      var sourceDir = _path2.default.join(tmpDir.path(), 'source-dir');
      var copyDirAsPromised = (0, _es6Promisify2.default)(_copyDir2.default);
      return copyDirAsPromised((0, _helpers.fixturePath)('minimal-web-ext'), sourceDir).then(function () {
        return (0, _sign3.default)((0, _extends3.default)({
          sourceDir: sourceDir,
          artifactsDir: _path2.default.join(tmpDir.path(), 'artifacts')
        }, stubs.signingConfig), {
          signAddon: stubs.signAddon
        });
      }).then(function (result) {
        _chai.assert.equal(result.success, true);
        // Do a sanity check that a built extension was passed to the
        // signer.
        _chai.assert.include(stubs.signAddon.firstCall.args[0].xpiPath, 'minimal_extension-1.0.zip');
      });
    });
  });

  (0, _mocha.it)('allows an empty application ID when signing', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var stubs = getStubs();
      return sign(tmpDir, stubs, {
        extraOptions: {
          preValidatedManifest: _test.manifestWithoutApps
        }
      }).then(function () {
        _sinon2.default.assert.called(stubs.signAddon);
        _sinon2.default.assert.calledWithMatch(stubs.signAddon, { id: (0, _manifest.getManifestId)(_test.manifestWithoutApps) });
      });
    });
  });

  (0, _mocha.it)('allows a custom ID when no ID in manifest.json', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var customId = 'some-custom-id';
      var stubs = getStubs();
      return sign(tmpDir, stubs, {
        extraArgs: {
          id: customId
        },
        extraOptions: {
          preValidatedManifest: _test.manifestWithoutApps
        }
      }).then(function () {
        _sinon2.default.assert.called(stubs.signAddon);
        _sinon2.default.assert.calledWithMatch(stubs.signAddon, { id: customId });
      });
    });
  });

  (0, _mocha.it)('prefers a custom ID over an ID file', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var sourceDir = _path2.default.join(tmpDir.path(), 'source-dir');
      var customId = 'some-custom-id';
      var stubs = getStubs();
      // First, save an extension ID like a previous signing call.
      return _mz.fs.mkdir(sourceDir).then(function () {
        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'some-other-id');
      })
      // Now, make a signing call with a custom ID.
      .then(function () {
        return sign(tmpDir, stubs, {
          extraArgs: {
            sourceDir: sourceDir,
            id: customId
          },
          extraOptions: {
            preValidatedManifest: _test.manifestWithoutApps
          }
        });
      }).then(function () {
        _sinon2.default.assert.called(stubs.signAddon);
        _sinon2.default.assert.calledWithMatch(stubs.signAddon, { id: customId });
      });
    });
  });

  (0, _mocha.it)('disallows a custom ID when manifest.json has ID', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var customId = 'some-custom-id';
      var stubs = getStubs();
      return sign(tmpDir, stubs, {
        extraArgs: {
          id: customId
        },
        extraOptions: {
          // This manifest has an ID in it.
          preValidatedManifest: _helpers.basicManifest
        }
      }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
        _chai.assert.match(error.message, /Cannot set custom ID some-custom-id/);
        _chai.assert.match(error.message, /manifest\.json declares ID basic-manifest@web-ext-test-suite/);
      }));
    });
  });

  (0, _mocha.it)('remembers auto-generated IDs for successive signing', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {

      function _sign() {
        var signAddon = _sinon2.default.spy(function () {
          return Promise.resolve((0, _extends3.default)({}, stubs.signingResult, {
            id: 'auto-generated-id'
          }));
        });

        return sign(tmpDir, (0, _extends3.default)({}, stubs, {
          signAddon: signAddon
        }), {
          extraOptions: {
            preValidatedManifest: _test.manifestWithoutApps
          }
        }).then(function (signingResult) {
          return { signingResult: signingResult, signAddon: signAddon };
        });
      }

      var stubs = getStubs();

      // Run an initial sign command which will yield a server generated ID.
      return _sign().then(function (_ref2) {
        var signAddon = _ref2.signAddon,
            signingResult = _ref2.signingResult;

        _sinon2.default.assert.called(signAddon);
        _sinon2.default.assert.calledWithMatch(signAddon, { id: undefined });
        _chai.assert.equal(signingResult.id, 'auto-generated-id');

        // Re-run the sign command again.
        return _sign();
      }).then(function (_ref3) {
        var signAddon = _ref3.signAddon;

        _sinon2.default.assert.called(signAddon);
        // This should call signAddon() with the server generated
        // ID that was saved to the source directory from the previous
        // signing result.
        _sinon2.default.assert.calledWithMatch(signAddon, { id: 'auto-generated-id' });
      });
    });
  });

  (0, _mocha.it)('returns a signing result', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var stubs = getStubs();
      return sign(tmpDir, stubs).then(function (realResult) {
        _chai.assert.deepEqual(realResult, stubs.signingResult);
      });
    });
  });

  (0, _mocha.it)('might fail', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return sign(tmpDir, (0, _extends3.default)({}, getStubs(), {
        signAddon: function signAddon() {
          return Promise.resolve({
            success: false
          });
        }
      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.instanceOf(error, _errors.WebExtError);
        _chai.assert.match(error.message, /The extension could not be signed/);
      });
    });
  });

  (0, _mocha.it)('calls the add-on signer', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var stubs = getStubs();
      var artifactsDir = _path2.default.join(tmpDir.path(), 'some-artifacts-dir');
      var applications = stubs.preValidatedManifest.applications || { gecko: {} };
      return sign(tmpDir, stubs, { extraArgs: { artifactsDir: artifactsDir } }).then(function () {
        _sinon2.default.assert.called(stubs.signAddon);
        _sinon2.default.assert.calledWithMatch(stubs.signAddon, {
          apiKey: stubs.signingConfig.apiKey,
          apiProxy: stubs.signingConfig.apiProxy,
          apiSecret: stubs.signingConfig.apiSecret,
          apiUrlPrefix: stubs.signingConfig.apiUrlPrefix,
          downloadDir: artifactsDir,
          id: applications.gecko.id,
          timeout: stubs.signingConfig.timeout,
          version: stubs.preValidatedManifest.version,
          xpiPath: stubs.buildResult.extensionPath
        });
      });
    });
  });

  (0, _mocha.it)('passes the verbose flag to the signer', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var stubs = getStubs();
      return sign(tmpDir, stubs, { extraArgs: { verbose: true } }).then(function () {
        _sinon2.default.assert.called(stubs.signAddon);
        _sinon2.default.assert.calledWithMatch(stubs.signAddon, { verbose: true });
      });
    });
  });

  (0, _mocha.it)('passes the ignoreFiles flag to the builder', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var stubs = getStubs();
      var ignoreFiles = ['*'];
      return sign(tmpDir, stubs, { extraArgs: { ignoreFiles: ignoreFiles } }).then(function () {
        _sinon2.default.assert.called(stubs.signAddon);
        _sinon2.default.assert.calledWithMatch(stubs.build, { ignoreFiles: ignoreFiles });
      });
    });
  });

  (0, _mocha.it)('passes through a signing exception', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var stubs = getStubs();
      stubs.signAddon = function () {
        return Promise.reject(new Error('some signing error'));
      };

      return sign(tmpDir, stubs).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.match(error.message, /signing error/);
      });
    });
  });

  (0, _mocha.describe)('saveIdToSourceDir', function () {

    (0, _mocha.it)('saves an extension ID to file', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var sourceDir = tmpDir.path();
        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'some-id').then(function () {
          return _mz.fs.readFile(_path2.default.join(sourceDir, _sign2.extensionIdFile));
        }).then(function (content) {
          _chai.assert.include(content.toString(), 'some-id');
        });
      });
    });

    (0, _mocha.it)('will overwrite an existing file', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var sourceDir = tmpDir.path();
        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'first-id').then(function () {
          return (0, _sign2.saveIdToSourceDir)(sourceDir, 'second-id');
        }).then(function () {
          return (0, _sign2.getIdFromSourceDir)(sourceDir);
        }).then(function (savedId) {
          _chai.assert.equal(savedId, 'second-id');
        });
      });
    });
  });

  (0, _mocha.describe)('getIdFromSourceDir', function () {

    (0, _mocha.it)('gets a saved extension ID', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var sourceDir = tmpDir.path();
        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'some-id').then(function () {
          return (0, _sign2.getIdFromSourceDir)(sourceDir);
        }).then(function (extensionId) {
          _chai.assert.equal(extensionId, 'some-id');
        });
      });
    });

    (0, _mocha.it)('throws an error for empty files', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var sourceDir = tmpDir.path();
        return _mz.fs.writeFile(_path2.default.join(sourceDir, _sign2.extensionIdFile), '').then(function () {
          return (0, _sign2.getIdFromSourceDir)(sourceDir);
        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
          _chai.assert.match(error.message, /No ID found in extension ID file/);
        }));
      });
    });

    (0, _mocha.it)('returns empty ID when extension file does not exist', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var sourceDir = tmpDir.path();
        return (0, _sign2.getIdFromSourceDir)(sourceDir).then(function (savedId) {
          _chai.assert.strictEqual(savedId, undefined);
        });
      });
    });
  });
});

/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = require("copy-dir");

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = require("sign-addon");

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _objectWithoutProperties2 = __webpack_require__(85);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _stream = __webpack_require__(115);

var _stream2 = _interopRequireDefault(_stream);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _extensionRunners = __webpack_require__(112);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFakeExtensionRunner(_ref) {
  var _ref$params = _ref.params,
      params = _ref$params === undefined ? {} : _ref$params,
      _ref$overriddenMethod = _ref.overriddenMethods,
      overriddenMethods = _ref$overriddenMethod === undefined ? {} : _ref$overriddenMethod;

  var runner = new _helpers.FakeExtensionRunner(params);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(overriddenMethods)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          fnName = _step$value[0],
          fn = _step$value[1];

      _sinon2.default.stub(runner, fnName).callsFake(fn);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return runner;
}

function prepareExtensionRunnerParams(params) {
  return (0, _extends3.default)({
    runners: [new _helpers.FakeExtensionRunner(), new _helpers.FakeExtensionRunner()],
    desktopNotifications: _sinon2.default.spy(function () {})
  }, params);
}

function exitKeypressLoop(stdin) {
  try {
    // Ensure that the keypress processing loop (defined in defaultReloadStrategy)
    // is exited.
    stdin.emit('keypress', 'c', { name: 'c', ctrl: true });
  } catch (error) {
    // NOTE: exceptions raised by this helper are logged on the console
    // and ignored (so that we don't hide an exception raised by a try block
    // if this helper is used in a finally block).

    // eslint-disable-next-line no-console
    console.error('ERROR in exitKeypressLoop test helper - ' + 'Unexpected exception while exiting the keypress loop', error);
  }
}

(0, _mocha.describe)('util/extension-runners', function () {
  (0, _mocha.describe)('createExtensionRunner', function () {
    (0, _mocha.it)('requires a valid target', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var promise;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // $FLOW_IGNORE: Want to pass invalid argument and check the error.
              promise = (0, _extensionRunners.createExtensionRunner)({});
              _context.next = 3;
              return _chai.assert.isRejected(promise, /Unknown target: "undefined"/);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));
  });

  (0, _mocha.describe)('MultiExtensionRunner', function () {

    (0, _mocha.it)('calls the "run" method on all the created IExtensionRunner', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var params, _params$runners, fakeExtensionRunner, anotherFakeExtensionRunner, runnerInstance;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params = prepareExtensionRunnerParams();
              _params$runners = (0, _slicedToArray3.default)(params.runners, 2), fakeExtensionRunner = _params$runners[0], anotherFakeExtensionRunner = _params$runners[1];


              _sinon2.default.spy(fakeExtensionRunner, 'run');
              _sinon2.default.spy(anotherFakeExtensionRunner, 'run');

              runnerInstance = new _extensionRunners.MultiExtensionRunner(params);


              _chai.assert.equal(runnerInstance.getName(), 'Multi Extension Runner');

              _context2.next = 8;
              return runnerInstance.run();

            case 8:

              _sinon2.default.assert.calledOnce(fakeExtensionRunner.run);
              _sinon2.default.assert.calledOnce(anotherFakeExtensionRunner.run);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    (0, _mocha.it)('calls the "reloadAllExtensions" on all the created runners', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var params, _params$runners2, fakeExtensionRunner, anotherFakeExtensionRunner, runnerInstance;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = prepareExtensionRunnerParams();
              _params$runners2 = (0, _slicedToArray3.default)(params.runners, 2), fakeExtensionRunner = _params$runners2[0], anotherFakeExtensionRunner = _params$runners2[1];


              _sinon2.default.spy(fakeExtensionRunner, 'reloadAllExtensions');
              _sinon2.default.spy(anotherFakeExtensionRunner, 'reloadAllExtensions');

              runnerInstance = new _extensionRunners.MultiExtensionRunner(params);
              _context3.next = 7;
              return runnerInstance.reloadAllExtensions();

            case 7:

              _sinon2.default.assert.calledOnce(fakeExtensionRunner.reloadAllExtensions);
              _sinon2.default.assert.calledOnce(anotherFakeExtensionRunner.reloadAllExtensions);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    (0, _mocha.it)('calls the "reloadExtensionBySourceDir" on all the created runners', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var params, _params$runners3, fakeExtensionRunner, anotherFakeExtensionRunner, runnerInstance;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params = prepareExtensionRunnerParams();
              _params$runners3 = (0, _slicedToArray3.default)(params.runners, 2), fakeExtensionRunner = _params$runners3[0], anotherFakeExtensionRunner = _params$runners3[1];


              _sinon2.default.spy(fakeExtensionRunner, 'reloadExtensionBySourceDir');
              _sinon2.default.spy(anotherFakeExtensionRunner, 'reloadExtensionBySourceDir');

              runnerInstance = new _extensionRunners.MultiExtensionRunner(params);
              _context4.next = 7;
              return runnerInstance.reloadExtensionBySourceDir('/fake/source/dir');

            case 7:

              _sinon2.default.assert.calledOnce(fakeExtensionRunner.reloadExtensionBySourceDir);
              _sinon2.default.assert.calledOnce(anotherFakeExtensionRunner.reloadExtensionBySourceDir);

              _sinon2.default.assert.calledWith(fakeExtensionRunner.reloadExtensionBySourceDir, _sinon2.default.match('/fake/source/dir'));
              _sinon2.default.assert.calledWith(anotherFakeExtensionRunner.reloadExtensionBySourceDir, _sinon2.default.match('/fake/source/dir'));

            case 11:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    (0, _mocha.it)('calls exit on all the created IExtensionRunner', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var params, _params$runners4, fakeExtensionRunner, anotherFakeExtensionRunner, runnerInstance;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              params = prepareExtensionRunnerParams();
              _params$runners4 = (0, _slicedToArray3.default)(params.runners, 2), fakeExtensionRunner = _params$runners4[0], anotherFakeExtensionRunner = _params$runners4[1];


              _sinon2.default.spy(fakeExtensionRunner, 'exit');
              _sinon2.default.spy(anotherFakeExtensionRunner, 'exit');

              runnerInstance = new _extensionRunners.MultiExtensionRunner(params);
              _context5.next = 7;
              return runnerInstance.exit();

            case 7:

              _sinon2.default.assert.calledOnce(fakeExtensionRunner.exit);
              _sinon2.default.assert.calledOnce(anotherFakeExtensionRunner.exit);

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    (0, _mocha.it)('shows a desktop notification on errors while reloading all extensions', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var params, fakeExtensionRunner, anotherFakeExtensionRunner, runnerInstance;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              params = prepareExtensionRunnerParams();
              fakeExtensionRunner = createFakeExtensionRunner({
                overriddenMethods: {
                  getName: function getName() {
                    return 'fakeExtensionRunner';
                  },
                  reloadAllExtensions: function reloadAllExtensions() {
                    return Promise.reject(new Error('reload error 1'));
                  }
                }
              });
              anotherFakeExtensionRunner = createFakeExtensionRunner({
                getName: function getName() {
                  return 'anotherFakeExtensionRunner';
                },
                overriddenMethods: {
                  reloadAllExtensions: function reloadAllExtensions() {
                    return Promise.reject(new Error('reload error 2'));
                  }
                }
              });


              params.runners = [fakeExtensionRunner, anotherFakeExtensionRunner];

              runnerInstance = new _extensionRunners.MultiExtensionRunner(params);
              _context6.next = 7;
              return runnerInstance.reloadAllExtensions();

            case 7:

              _sinon2.default.assert.calledOnce(fakeExtensionRunner.reloadAllExtensions);
              _sinon2.default.assert.calledOnce(anotherFakeExtensionRunner.reloadAllExtensions);
              _sinon2.default.assert.callCount(params.desktopNotifications, 2);
              _sinon2.default.assert.calledWith(params.desktopNotifications, _sinon2.default.match({
                title: _sinon2.default.match(/web-ext run: extension reload error/),
                message: _sinon2.default.match(/on "fakeExtensionRunner" - reload error 1/)
              }));

            case 11:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    (0, _mocha.it)('shows a desktop notification on errors while reloading an extension', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var params, fakeExtensionRunner, anotherFakeExtensionRunner, runnerInstance, sourceDir, res, errors;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              params = prepareExtensionRunnerParams();
              fakeExtensionRunner = createFakeExtensionRunner({
                overriddenMethods: {
                  getName: function getName() {
                    return 'fakeExtensionRunner';
                  },
                  reloadExtensionBySourceDir: function reloadExtensionBySourceDir() {
                    return Promise.reject(new Error('reload error 1'));
                  }
                }
              });
              anotherFakeExtensionRunner = createFakeExtensionRunner({
                overriddenMethods: {
                  reloadExtensionBySourceDir: function reloadExtensionBySourceDir() {
                    return Promise.resolve();
                  },
                  getName: function getName() {
                    return 'anotherFakeExtensionRunner';
                  }
                }
              });


              params.runners = [fakeExtensionRunner, anotherFakeExtensionRunner];

              runnerInstance = new _extensionRunners.MultiExtensionRunner(params);
              sourceDir = '/fake/sourceDir';
              _context7.next = 8;
              return runnerInstance.reloadExtensionBySourceDir(sourceDir);

            case 8:
              res = _context7.sent;
              errors = res.filter(function (r) {
                return r.reloadError;
              });


              _chai.assert.equal(res.length, 2);
              _chai.assert.equal(errors.length, 1);

              _sinon2.default.assert.calledOnce(fakeExtensionRunner.reloadExtensionBySourceDir);
              _sinon2.default.assert.calledOnce(anotherFakeExtensionRunner.reloadExtensionBySourceDir);
              _sinon2.default.assert.calledOnce(params.desktopNotifications);

              _sinon2.default.assert.calledWith(params.desktopNotifications, _sinon2.default.match({
                title: _sinon2.default.match(/web-ext run: extension reload error/),
                message: _sinon2.default.match(/"\/fake\/sourceDir" on "fakeExtensionRunner" - reload error 1/)
              }));

            case 16:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));

    (0, _mocha.describe)('registerCleanup', function () {

      (0, _mocha.it)('calls its callbacks once all the runner callbacks have been called', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var params, _params$runners5, fakeExtensionRunner, anotherFakeExtensionRunner, runnerInstance, waitRegisterCleanup, checkIncompleteCleanup;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = prepareExtensionRunnerParams();
                _params$runners5 = (0, _slicedToArray3.default)(params.runners, 2), fakeExtensionRunner = _params$runners5[0], anotherFakeExtensionRunner = _params$runners5[1];


                _sinon2.default.spy(fakeExtensionRunner, 'registerCleanup');
                _sinon2.default.spy(anotherFakeExtensionRunner, 'registerCleanup');

                runnerInstance = new _extensionRunners.MultiExtensionRunner(params);
                waitRegisterCleanup = new Promise(function (resolve) {
                  runnerInstance.registerCleanup(resolve);
                });


                _sinon2.default.assert.calledOnce(fakeExtensionRunner.registerCleanup);
                _sinon2.default.assert.calledOnce(anotherFakeExtensionRunner.registerCleanup);

                // Call the cleanup callback on the first runner.
                fakeExtensionRunner.registerCleanup.firstCall.args[0]();

                _context8.next = 11;
                return Promise.race([waitRegisterCleanup, new Promise(function (resolve) {
                  setTimeout(function () {
                    resolve('waitRegisterCleanup should not be resolved yet');
                  }, 300);
                })]);

              case 11:
                checkIncompleteCleanup = _context8.sent;


                _chai.assert.equal(checkIncompleteCleanup, 'waitRegisterCleanup should not be resolved yet');

                // Call the cleanup callback on the second and last runner.
                anotherFakeExtensionRunner.registerCleanup.firstCall.args[0]();

                _context8.next = 16;
                return waitRegisterCleanup;

              case 16:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      })));
    });
  });

  (0, _mocha.describe)('defaultWatcherCreator', function () {

    function prepare() {
      var config = {
        sourceDir: '/path/to/extension/source/',
        artifactsDir: '/path/to/web-ext-artifacts',
        onSourceChange: _sinon2.default.spy(function () {}),
        ignoreFiles: ['path/to/file', 'path/to/file2'],
        reloadExtension: _sinon2.default.spy(function () {
          return Promise.resolve();
        })
      };
      return {
        config: config,
        createWatcher: function createWatcher() {
          var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          return (0, _extensionRunners.defaultWatcherCreator)((0, _extends3.default)({}, config, customConfig));
        }
      };
    }

    (0, _mocha.it)('configures a source watcher', function () {
      var _prepare = prepare(),
          config = _prepare.config,
          createWatcher = _prepare.createWatcher;

      createWatcher();
      _sinon2.default.assert.called(config.onSourceChange);
      _sinon2.default.assert.calledWith(config.onSourceChange, _sinon2.default.match({
        sourceDir: config.sourceDir,
        artifactsDir: config.artifactsDir,
        onChange: _sinon2.default.match.typeOf('function')
      }));
    });

    (0, _mocha.it)('configures a run command with the expected fileFilter', function () {
      var fileFilter = { wantFile: _sinon2.default.spy() };
      var createFileFilter = _sinon2.default.spy(function () {
        return fileFilter;
      });

      var _prepare2 = prepare(),
          config = _prepare2.config,
          createWatcher = _prepare2.createWatcher;

      createWatcher({ createFileFilter: createFileFilter });
      _sinon2.default.assert.called(createFileFilter);
      _sinon2.default.assert.calledWith(createFileFilter, _sinon2.default.match({
        sourceDir: config.sourceDir,
        artifactsDir: config.artifactsDir,
        ignoreFiles: config.ignoreFiles
      }));
      var shouldWatchFile = config.onSourceChange.firstCall.args[0].shouldWatchFile;

      shouldWatchFile('path/to/file');
      _sinon2.default.assert.called(fileFilter.wantFile);
      _sinon2.default.assert.calledWith(fileFilter.wantFile, _sinon2.default.match('path/to/file'));
    });

    (0, _mocha.it)('returns a watcher', function () {
      var watcher = {};
      var onSourceChange = _sinon2.default.spy(function () {
        return watcher;
      });
      var createdWatcher = prepare().createWatcher({ onSourceChange: onSourceChange });
      _chai.assert.equal(createdWatcher, watcher);
    });

    (0, _mocha.it)('reloads the extension', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
      var _prepare3, config, createWatcher, onChange;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _prepare3 = prepare(), config = _prepare3.config, createWatcher = _prepare3.createWatcher;

              createWatcher();

              _sinon2.default.assert.called(config.onSourceChange);
              _sinon2.default.assert.calledWith(config.onSourceChange, _sinon2.default.match({
                onChange: _sinon2.default.match.typeOf('function')
              }));

              onChange = config.onSourceChange.firstCall.args[0].onChange;
              // Simulate executing the handler when a source file changes.

              _context9.next = 7;
              return onChange();

            case 7:
              _sinon2.default.assert.called(config.reloadExtension);
              _sinon2.default.assert.calledWith(config.reloadExtension, _sinon2.default.match(config.sourceDir));

            case 9:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });

  (0, _mocha.describe)('defaultReloadStrategy', function () {

    function prepare() {
      var _this = this;

      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          stubExtensionRunner = _ref11.stubExtensionRunner;

      var watcher = {
        close: _sinon2.default.spy(function () {})
      };
      var extensionRunner = createFakeExtensionRunner({
        overriddenMethods: stubExtensionRunner
      });
      var args = {
        extensionRunner: extensionRunner,
        sourceDir: '/path/to/extension/source',
        artifactsDir: '/path/to/web-ext-artifacts/',
        ignoreFiles: ['first/file', 'second/file']
      };
      var options = {
        createWatcher: _sinon2.default.spy(function () {
          return watcher;
        }),
        stdin: new _stream2.default.Readable()
      };
      return (0, _extends3.default)({}, args, options, {
        watcher: watcher,
        extensionRunner: extensionRunner,
        reloadStrategy: function () {
          var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
            var argOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var optOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return _regenerator2.default.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    return _context10.abrupt('return', (0, _extensionRunners.defaultReloadStrategy)((0, _extends3.default)({}, args, argOverride), (0, _extends3.default)({}, options, optOverride)));

                  case 1:
                  case 'end':
                    return _context10.stop();
                }
              }
            }, _callee10, _this);
          }));

          return function reloadStrategy() {
            return _ref12.apply(this, arguments);
          };
        }()
      });
    }

    (0, _mocha.it)('configures a watcher', function () {
      var _prepare4 = prepare(),
          createWatcher = _prepare4.createWatcher,
          reloadStrategy = _prepare4.reloadStrategy,
          sentArgs = (0, _objectWithoutProperties3.default)(_prepare4, ['createWatcher', 'reloadStrategy']);

      reloadStrategy();
      _sinon2.default.assert.called(createWatcher);
      _sinon2.default.assert.calledWith(createWatcher, _sinon2.default.match({
        sourceDir: sentArgs.sourceDir,
        artifactsDir: sentArgs.artifactsDir,
        ignoreFiles: sentArgs.ignoreFiles
      }));
    });

    (0, _mocha.it)('configure the watcher to reload an extension by sourceDir', function () {
      var _prepare5 = prepare({
        stubExtensionRunner: {
          reloadExtensionBySourceDir: function reloadExtensionBySourceDir() {}
        }
      }),
          extensionRunner = _prepare5.extensionRunner,
          createWatcher = _prepare5.createWatcher,
          reloadStrategy = _prepare5.reloadStrategy;

      reloadStrategy();

      _sinon2.default.assert.calledOnce(createWatcher);
      _sinon2.default.assert.calledWith(createWatcher, _sinon2.default.match({
        reloadExtension: _sinon2.default.match.typeOf('function')
      }));

      var sourceDir = '/fake/sourceDir';
      var reloadExtension = createWatcher.firstCall.args[0].reloadExtension;

      reloadExtension(sourceDir);

      var reloadExtensionBySourceDir = extensionRunner.reloadExtensionBySourceDir;

      _sinon2.default.assert.calledOnce(reloadExtensionBySourceDir);
      _sinon2.default.assert.calledWith(reloadExtensionBySourceDir, _sinon2.default.match(sourceDir));
    });

    (0, _mocha.it)('cleans up when the extension runner closes', function () {
      var _prepare6 = prepare({
        stubExtensionRunner: {
          registerCleanup: function registerCleanup() {}
        }
      }),
          extensionRunner = _prepare6.extensionRunner,
          watcher = _prepare6.watcher,
          reloadStrategy = _prepare6.reloadStrategy,
          stdin = _prepare6.stdin;

      _sinon2.default.spy(stdin, 'pause');

      reloadStrategy();

      _sinon2.default.assert.called(extensionRunner.registerCleanup);
      _sinon2.default.assert.calledOnce(extensionRunner.registerCleanup);
      _sinon2.default.assert.calledWith(extensionRunner.registerCleanup, _sinon2.default.match.typeOf('function'));

      var registeredCb = extensionRunner.registerCleanup.firstCall.args[0];
      registeredCb();

      _sinon2.default.assert.called(watcher.close);
      _sinon2.default.assert.called(stdin.pause);
    });

    (0, _mocha.it)('can reload when user presses R in shell console', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
      var _prepare7, extensionRunner, reloadStrategy, fakeStdin;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _prepare7 = prepare(), extensionRunner = _prepare7.extensionRunner, reloadStrategy = _prepare7.reloadStrategy;
              fakeStdin = new _helpers.FakeStdin();

              _sinon2.default.spy(fakeStdin, 'setRawMode');
              _sinon2.default.spy(extensionRunner, 'reloadAllExtensions');

              _context11.prev = 4;
              _context11.next = 7;
              return reloadStrategy({}, { stdin: fakeStdin });

            case 7:
              fakeStdin.emit('keypress', 'r', { name: 'r', ctrl: false });

              // Wait for one tick.
              _context11.next = 10;
              return Promise.resolve();

            case 10:

              _sinon2.default.assert.called(fakeStdin.setRawMode);
              _sinon2.default.assert.called(extensionRunner.reloadAllExtensions);

            case 12:
              _context11.prev = 12;

              exitKeypressLoop(fakeStdin);
              return _context11.finish(12);

            case 15:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined, [[4,, 12, 15]]);
    })));

    (0, _mocha.it)('allows you to disable input', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
      var _prepare8, extensionRunner, reloadStrategy, fakeStdin, cleanupCb;

      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _prepare8 = prepare(), extensionRunner = _prepare8.extensionRunner, reloadStrategy = _prepare8.reloadStrategy;

              _sinon2.default.spy(extensionRunner, 'registerCleanup');

              fakeStdin = new _helpers.FakeStdin();

              _sinon2.default.spy(fakeStdin, 'pause');
              _sinon2.default.spy(fakeStdin, 'setRawMode');

              _context12.prev = 5;
              _context12.next = 8;
              return reloadStrategy({ noInput: true }, { stdin: fakeStdin });

            case 8:
              // This is meant to test that all input is ignored.
              _sinon2.default.assert.notCalled(fakeStdin.setRawMode);

            case 9:
              _context12.prev = 9;

              exitKeypressLoop(fakeStdin);
              return _context12.finish(9);

            case 12:
              cleanupCb = extensionRunner.registerCleanup.firstCall.args[0];

              cleanupCb();
              _sinon2.default.assert.notCalled(fakeStdin.pause);

            case 15:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined, [[5,, 9, 12]]);
    })));

    (0, _mocha.it)('can still reload when user presses R after a reload error', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
      var _prepare9, extensionRunner, reloadStrategy, fakeStdin;

      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _prepare9 = prepare({
                stubExtensionRunner: {
                  reloadAllExtensions: _sinon2.default.spy(function () {
                    return Promise.reject(Error('fake reload error'));
                  })
                }
              }), extensionRunner = _prepare9.extensionRunner, reloadStrategy = _prepare9.reloadStrategy;
              fakeStdin = new _helpers.FakeStdin();

              _sinon2.default.spy(fakeStdin, 'setRawMode');

              _context13.prev = 3;
              _context13.next = 6;
              return reloadStrategy({}, { stdin: fakeStdin });

            case 6:
              _context13.next = 8;
              return Promise.resolve();

            case 8:

              fakeStdin.emit('keypress', 'r', { name: 'r', ctrl: false });
              // Wait for one tick to give reloadStrategy the chance to handle
              // the keypress event.
              _context13.next = 11;
              return Promise.resolve();

            case 11:
              _sinon2.default.assert.called(fakeStdin.setRawMode);
              _sinon2.default.assert.calledOnce(extensionRunner.reloadAllExtensions);
              fakeStdin.emit('keypress', 'r', { name: 'r', ctrl: false });
              _context13.next = 16;
              return Promise.resolve();

            case 16:
              _sinon2.default.assert.calledTwice(extensionRunner.reloadAllExtensions);

            case 17:
              _context13.prev = 17;

              exitKeypressLoop(fakeStdin);
              return _context13.finish(17);

            case 20:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined, [[3,, 17, 20]]);
    })));

    (0, _mocha.it)('shuts down firefox on user request (CTRL+C in shell console)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
      var _prepare10, extensionRunner, reloadStrategy, fakeStdin;

      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _prepare10 = prepare({
                stubExtensionRunner: {
                  exit: function exit() {
                    var _this2 = this;

                    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
                      return _regenerator2.default.wrap(function _callee14$(_context14) {
                        while (1) {
                          switch (_context14.prev = _context14.next) {
                            case 0:
                            case 'end':
                              return _context14.stop();
                          }
                        }
                      }, _callee14, _this2);
                    }))();
                  }
                }
              }), extensionRunner = _prepare10.extensionRunner, reloadStrategy = _prepare10.reloadStrategy;
              fakeStdin = new _helpers.FakeStdin();
              _context15.prev = 2;
              _context15.next = 5;
              return reloadStrategy({}, { stdin: fakeStdin });

            case 5:
              _context15.next = 7;
              return Promise.resolve();

            case 7:

              fakeStdin.emit('keypress', 'c', { name: 'c', ctrl: true });

              // Wait for one tick.
              _context15.next = 10;
              return Promise.resolve();

            case 10:

              _sinon2.default.assert.called(extensionRunner.exit);

            case 11:
              _context15.prev = 11;

              exitKeypressLoop(fakeStdin);
              return _context15.finish(11);

            case 14:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, undefined, [[2,, 11, 14]]);
    })));

    (0, _mocha.it)('pauses the web-ext process (CTRL+Z in shell console)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
      var _prepare11, reloadStrategy, fakeStdin, setRawMode, fakeKill;

      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _prepare11 = prepare(), reloadStrategy = _prepare11.reloadStrategy;
              fakeStdin = new _helpers.FakeStdin();
              setRawMode = _sinon2.default.spy(fakeStdin, 'setRawMode');
              fakeKill = _sinon2.default.spy(function () {});
              _context16.prev = 4;

              reloadStrategy({}, { stdin: fakeStdin, kill: fakeKill });

              // Wait for one tick.
              _context16.next = 8;
              return Promise.resolve();

            case 8:

              fakeStdin.emit('keypress', 'z', { name: 'z', ctrl: true });

              // Wait for one tick.
              _context16.next = 11;
              return Promise.resolve();

            case 11:

              _sinon2.default.assert.called(fakeKill);
              _sinon2.default.assert.calledWith(fakeKill, _sinon2.default.match(process.pid), _sinon2.default.match('SIGTSTP'));
              _sinon2.default.assert.callOrder(setRawMode, setRawMode, fakeKill, setRawMode);
              _sinon2.default.assert.calledThrice(setRawMode);
              _sinon2.default.assert.calledWith(setRawMode, _sinon2.default.match(true));
              _sinon2.default.assert.calledWith(setRawMode, _sinon2.default.match(false));
              _sinon2.default.assert.calledWith(setRawMode, _sinon2.default.match(true));

            case 18:
              _context16.prev = 18;

              exitKeypressLoop(fakeStdin);
              return _context16.finish(18);

            case 21:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, undefined, [[4,, 18, 21]]);
    })));
  });
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _events = __webpack_require__(41);

var _events2 = _interopRequireDefault(_events);

var _chai = __webpack_require__(5);

var _mocha = __webpack_require__(4);

var _deepcopy = __webpack_require__(54);

var _deepcopy2 = _interopRequireDefault(_deepcopy);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _logger = __webpack_require__(0);

var _firefoxAndroid = __webpack_require__(84);

var _errors = __webpack_require__(3);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fake result for client.installTemporaryAddon().then(installResult => ...)
var tempInstallResult = {
  addon: { id: 'some-addon@test-suite' }
};

// Fake missing addon id result for client.installTemporaryAddon


var tempInstallResultMissingAddonId = {
  addon: { id: null }
};

var builtFileName = 'built-ext-filename';

var fakeBuiltExtensionPath = '/fake/extensionPath/' + builtFileName + '.zip';

var fakeRDPUnixSocketFile = '/data/data/org.mozilla.firefox/firefox-debugger-socket';

// Reduce the waiting time during tests.
_firefoxAndroid.FirefoxAndroidExtensionRunner.unixSocketDiscoveryRetryInterval = 0;

function prepareExtensionRunnerParams() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      debuggerPort = _ref.debuggerPort,
      fakeFirefoxApp = _ref.fakeFirefoxApp,
      fakeRemoteFirefox = _ref.fakeRemoteFirefox,
      fakeADBUtils = _ref.fakeADBUtils,
      params = _ref.params;

  var fakeRemoteFirefoxClient = new _events2.default();
  var remoteFirefox = (0, _helpers.getFakeRemoteFirefox)((0, _extends3.default)({
    installTemporaryAddon: _sinon2.default.spy(function () {
      return Promise.resolve(tempInstallResult);
    })
  }, fakeRemoteFirefox));
  remoteFirefox.client = fakeRemoteFirefoxClient;

  // $FLOW_IGNORE: allow overriden params for testing purpose.
  var runnerParams = (0, _extends3.default)({
    extensions: [{
      sourceDir: '/fake/sourceDir',
      manifestData: (0, _deepcopy2.default)(_helpers.basicManifest)
    }],
    keepProfileChanges: false,
    browserConsole: false,
    startUrl: undefined,
    firefoxBinary: 'firefox',
    preInstall: false,
    firefoxApp: (0, _helpers.getFakeFirefox)((0, _extends3.default)({}, fakeFirefoxApp), debuggerPort),
    ADBUtils: _sinon2.default.spy(function () {
      return fakeADBUtils;
    }),
    firefoxClient: _sinon2.default.spy(function () {
      return Promise.resolve(remoteFirefox);
    }),
    desktopNotifications: _sinon2.default.spy(function () {}),
    stdin: new _events2.default()
  }, params || {});

  return {
    remoteFirefox: remoteFirefox,
    params: runnerParams
  };
}

function prepareSelectedDeviceAndAPKParams() {
  var overriddenProperties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var fakeADBUtils = {
    discoverDevices: _sinon2.default.spy(function () {
      return Promise.resolve(['emulator-1', 'emulator-2']);
    }),
    discoverInstalledFirefoxAPKs: _sinon2.default.spy(function () {
      return Promise.resolve(['org.mozilla.fennec', 'org.mozilla.firefox']);
    }),
    getAndroidVersionNumber: _sinon2.default.spy(function () {
      return Promise.resolve(20);
    }),
    amForceStopAPK: _sinon2.default.spy(function () {
      return Promise.resolve();
    }),
    discoverRDPUnixSocket: _sinon2.default.spy(function () {
      return Promise.resolve(fakeRDPUnixSocketFile);
    }),
    getOrCreateArtifactsDir: _sinon2.default.spy(function () {
      return Promise.resolve('/fake/artifacts-dir/');
    }),
    runShellCommand: _sinon2.default.spy(function () {
      return Promise.resolve('');
    }),
    pushFile: _sinon2.default.spy(function () {
      return Promise.resolve();
    }),
    startFirefoxAPK: _sinon2.default.spy(function () {
      return Promise.resolve();
    }),
    setupForward: _sinon2.default.spy(function () {
      return Promise.resolve();
    }),
    clearArtifactsDir: _sinon2.default.spy(function () {
      return Promise.resolve();
    }),
    setUserAbortDiscovery: _sinon2.default.spy(function () {}),
    ensureRequiredAPKRuntimePermissions: _sinon2.default.spy(function () {
      return Promise.resolve();
    })
  };

  var _prepareExtensionRunn = prepareExtensionRunnerParams((0, _extends3.default)({
    params: {
      adbDevice: 'emulator-1',
      firefoxApk: 'org.mozilla.firefox',
      buildSourceDir: _sinon2.default.spy(function () {
        return Promise.resolve({
          extensionPath: fakeBuiltExtensionPath
        });
      })
    },
    fakeADBUtils: fakeADBUtils,
    fakeFirefoxApp: {
      createProfile: _sinon2.default.spy(function () {
        return Promise.resolve({ profileDir: '/path/to/fake/profile' });
      })
    }
  }, overriddenProperties)),
      params = _prepareExtensionRunn.params;

  return { params: params, fakeADBUtils: fakeADBUtils };
}

(0, _mocha.describe)('util/extension-runners/firefox-android', function () {

  (0, _mocha.describe)('raises an UsageError when:', function () {
    var testUsageError = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(prepareTestParams, testExceptionCallback) {
        var _prepareExtensionRunn2, params, runnerInstance, actualException;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _prepareExtensionRunn2 = prepareExtensionRunnerParams(prepareTestParams), params = _prepareExtensionRunn2.params;
                runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
                actualException = void 0;
                _context.prev = 3;
                _context.next = 6;
                return runnerInstance.run();

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](3);

                actualException = _context.t0;

              case 11:
                return _context.abrupt('return', testExceptionCallback({ actualException: actualException }));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 8]]);
      }));

      return function testUsageError(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();

    (0, _mocha.it)('does not find any android device', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var fakeADBUtils;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              fakeADBUtils = {
                discoverDevices: _sinon2.default.spy(function () {
                  return Promise.resolve([]);
                })
              };
              _context2.next = 3;
              return testUsageError({ fakeADBUtils: fakeADBUtils }, function (_ref4) {
                var actualException = _ref4.actualException;

                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverDevices);

                _chai.assert.instanceOf(actualException, _errors.UsageError);
                _chai.assert.match(actualException && actualException.message, /No Android device found/);
              });

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    (0, _mocha.it)('does not know which is the selected android device', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var fakeADBUtils;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              fakeADBUtils = {
                discoverDevices: _sinon2.default.spy(function () {
                  return Promise.resolve(['emulator-1', 'emulator-2']);
                })
              };
              _context3.next = 3;
              return testUsageError({ fakeADBUtils: fakeADBUtils }, function (_ref6) {
                var actualException = _ref6.actualException;

                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverDevices);

                _chai.assert.instanceOf(actualException, _errors.UsageError);
                _chai.assert.match(actualException && actualException.message, /Select an android device using --android-device/);
              });

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    (0, _mocha.it)('does not find the selected android device', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var fakeADBUtils;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              fakeADBUtils = {
                discoverDevices: _sinon2.default.spy(function () {
                  return Promise.resolve(['emulator-1', 'emulator-2']);
                })
              };
              _context4.next = 3;
              return testUsageError({
                params: {
                  adbDevice: 'emulator-3'
                },
                fakeADBUtils: fakeADBUtils
              }, function (_ref8) {
                var actualException = _ref8.actualException;

                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverDevices);

                _chai.assert.instanceOf(actualException, _errors.UsageError);
                _chai.assert.match(actualException && actualException.message, /Android device emulator-3 was not found in list:/);
              });

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    (0, _mocha.it)('does not find a valid Firefox apk', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var fakeADBUtils;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              fakeADBUtils = {
                discoverDevices: _sinon2.default.spy(function () {
                  return Promise.resolve(['emulator-1', 'emulator-2']);
                }),
                discoverInstalledFirefoxAPKs: _sinon2.default.spy(function () {
                  return Promise.resolve([]);
                })
              };
              _context5.next = 3;
              return testUsageError({
                params: {
                  adbDevice: 'emulator-1'
                },
                fakeADBUtils: fakeADBUtils
              }, function (_ref10) {
                var actualException = _ref10.actualException;

                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverDevices);
                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverInstalledFirefoxAPKs);

                _chai.assert.instanceOf(actualException, _errors.UsageError);
                _chai.assert.match(actualException && actualException.message, /No Firefox packages were found on the selected Android device/);
              });

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    (0, _mocha.it)('does not know which Firefox apk to use', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var fakeADBUtils;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              fakeADBUtils = {
                discoverDevices: _sinon2.default.spy(function () {
                  return Promise.resolve(['emulator-1', 'emulator-2']);
                }),
                discoverInstalledFirefoxAPKs: _sinon2.default.spy(function () {
                  return Promise.resolve(['org.mozilla.fennec', 'org.mozilla.firefox']);
                })
              };
              _context6.next = 3;
              return testUsageError({
                params: {
                  adbDevice: 'emulator-1'
                },
                fakeADBUtils: fakeADBUtils
              }, function (_ref12) {
                var actualException = _ref12.actualException;

                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverDevices);
                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverInstalledFirefoxAPKs);

                _chai.assert.instanceOf(actualException, _errors.UsageError);
                _chai.assert.match(actualException && actualException.message, /Select one of the packages using --firefox-apk/);
              });

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    (0, _mocha.it)('cannot find the Firefox apk selected using --firefox-apk value', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var fakeADBUtils;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              fakeADBUtils = {
                discoverDevices: _sinon2.default.spy(function () {
                  return Promise.resolve(['emulator-1', 'emulator-2']);
                }),
                discoverInstalledFirefoxAPKs: _sinon2.default.spy(function () {
                  return Promise.resolve(['org.mozilla.fennec', 'org.mozilla.firefox']);
                })
              };
              _context7.next = 3;
              return testUsageError({
                params: {
                  adbDevice: 'emulator-1',
                  firefoxApk: 'org.mozilla.f'
                },
                fakeADBUtils: fakeADBUtils
              }, function (_ref14) {
                var actualException = _ref14.actualException;

                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverDevices);
                _sinon2.default.assert.calledOnce(fakeADBUtils.discoverInstalledFirefoxAPKs);

                _chai.assert.instanceOf(actualException, _errors.UsageError);
                _chai.assert.match(actualException && actualException.message, /Package org.mozilla.f was not found in list:/);
              });

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));
  });

  (0, _mocha.describe)('a valid device and Firefox apk has been selected:', function () {

    (0, _mocha.it)('does select a Firefox apk if only one has been found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
      var _prepareSelectedDevic, params, fakeADBUtils, runnerInstance;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _prepareSelectedDevic = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic.params, fakeADBUtils = _prepareSelectedDevic.fakeADBUtils;


              fakeADBUtils.discoverInstalledFirefoxAPKs = _sinon2.default.spy(function () {
                return Promise.resolve(['org.mozilla.firefox']);
              });

              delete params.firefoxApk;

              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context8.next = 6;
              return runnerInstance.run();

            case 6:

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.amForceStopAPK, 'emulator-1', 'org.mozilla.firefox');

            case 7:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    (0, _mocha.it)('stops any running instances of the selected Firefox apk ' + 'and then starts it on the temporary profile', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
      var _prepareSelectedDevic2, params, fakeADBUtils, runnerInstance;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _prepareSelectedDevic2 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic2.params, fakeADBUtils = _prepareSelectedDevic2.fakeADBUtils;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context9.next = 4;
              return runnerInstance.run();

            case 4:

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.amForceStopAPK, 'emulator-1', 'org.mozilla.firefox');

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.startFirefoxAPK, 'emulator-1', 'org.mozilla.firefox', runnerInstance.getDeviceProfileDir());

              _sinon2.default.assert.callOrder(fakeADBUtils.amForceStopAPK, fakeADBUtils.startFirefoxAPK);

            case 7:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));

    (0, _mocha.it)('builds and pushes the extension xpi to the android device', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
      var _prepareSelectedDevic3, params, fakeADBUtils, buildSourceDir, extensions, runnerInstance;

      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _prepareSelectedDevic3 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic3.params, fakeADBUtils = _prepareSelectedDevic3.fakeADBUtils;
              buildSourceDir = params.buildSourceDir, extensions = params.extensions;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context10.next = 5;
              return runnerInstance.run();

            case 5:

              _sinon2.default.assert.calledWithMatch(buildSourceDir, extensions[0].sourceDir);

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.pushFile, 'emulator-1', fakeBuiltExtensionPath, runnerInstance.selectedArtifactsDir + '/' + builtFileName + '.xpi');

              _sinon2.default.assert.callOrder(buildSourceDir, fakeADBUtils.pushFile);

            case 8:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    })));

    (0, _mocha.it)('discovers the RDP unix socket and forward it on a local tcp port', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
      var _prepareSelectedDevic4, params, fakeADBUtils, runnerInstance;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _prepareSelectedDevic4 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic4.params, fakeADBUtils = _prepareSelectedDevic4.fakeADBUtils;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context11.next = 4;
              return runnerInstance.run();

            case 4:

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.discoverRDPUnixSocket, 'emulator-1', 'org.mozilla.firefox');

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.setupForward, 'emulator-1', 'localfilesystem:' + runnerInstance.selectedRDPSocketFile, 'tcp:' + runnerInstance.selectedTCPPort);

              _sinon2.default.assert.callOrder(fakeADBUtils.discoverRDPUnixSocket, fakeADBUtils.setupForward);

            case 7:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    })));

    (0, _mocha.it)('installs the build extension as a temporarily installed addon', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
      var _prepareSelectedDevic5, params, fakeADBUtils, firefoxClient, runnerInstance;

      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _prepareSelectedDevic5 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic5.params, fakeADBUtils = _prepareSelectedDevic5.fakeADBUtils;
              firefoxClient = params.firefoxClient;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context12.next = 5;
              return runnerInstance.run();

            case 5:

              // Test that the android extension runner connects to the
              // remote debugging server on the tcp port that has been
              // chosen to forward the android device RDP unix socket file.

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.setupForward, 'emulator-1', 'localfilesystem:' + runnerInstance.selectedRDPSocketFile, 'tcp:' + runnerInstance.selectedTCPPort);

              _sinon2.default.assert.calledWithMatch(firefoxClient, { port: runnerInstance.selectedTCPPort });

              _sinon2.default.assert.calledWithMatch(runnerInstance.remoteFirefox.installTemporaryAddon, runnerInstance.selectedArtifactsDir + '/' + builtFileName + '.xpi');

              _sinon2.default.assert.callOrder(fakeADBUtils.setupForward, firefoxClient, runnerInstance.remoteFirefox.installTemporaryAddon);

            case 9:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    })));

    (0, _mocha.it)('raises an error on addonId missing from installTemporaryAddon result', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
      var _prepareSelectedDevic6, params, expectedErrorMessage, runnerInstance;

      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _prepareSelectedDevic6 = prepareSelectedDeviceAndAPKParams({
                fakeRemoteFirefox: {
                  installTemporaryAddon: _sinon2.default.spy(function () {
                    return Promise.resolve(tempInstallResultMissingAddonId);
                  })
                }
              }), params = _prepareSelectedDevic6.params;
              expectedErrorMessage = /Received an empty addonId from remoteFirefox.installTemporaryAddon/;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context13.next = 5;
              return runnerInstance.run().catch(function (error) {
                return error;
              }).then(function (error) {
                _chai.assert.instanceOf(error, _errors.WebExtError);
                _chai.assert.match(error && error.message, expectedErrorMessage);
              });

            case 5:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined);
    })));

    (0, _mocha.it)('reloads all reloadable extensions when reloadAllExtensions is called', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
      var _prepareSelectedDevic7, params, runnerInstance;

      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _prepareSelectedDevic7 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic7.params;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context14.next = 4;
              return runnerInstance.run();

            case 4:
              _context14.next = 6;
              return runnerInstance.reloadAllExtensions();

            case 6:

              _sinon2.default.assert.calledOnce(runnerInstance.remoteFirefox.reloadAddon);

            case 7:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined);
    })));

    (0, _mocha.it)('reloads an extension by sourceDir', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
      var _prepareSelectedDevic8, params, runnerInstance;

      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _prepareSelectedDevic8 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic8.params;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context15.next = 4;
              return runnerInstance.run();

            case 4:
              _context15.next = 6;
              return runnerInstance.reloadExtensionBySourceDir(params.extensions[0].sourceDir);

            case 6:

              _sinon2.default.assert.calledOnce(runnerInstance.remoteFirefox.reloadAddon);

            case 7:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, undefined);
    })));

    (0, _mocha.it)('resolves to an array of WebExtError if the extension is not reloadable', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
      var _prepareSelectedDevic9, params, runnerInstance, results, error;

      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _prepareSelectedDevic9 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic9.params;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context16.next = 4;
              return runnerInstance.run();

            case 4:
              _context16.next = 6;
              return runnerInstance.reloadExtensionBySourceDir('/non-existent/source-dir');

            case 6:
              results = _context16.sent;
              error = results[0].reloadError;

              _chai.assert.instanceOf(error, _errors.WebExtError);
              _chai.assert.equal(error && error.message, 'Extension not reloadable: no addonId has been mapped to ' + '"/non-existent/source-dir"');

              _sinon2.default.assert.notCalled(runnerInstance.remoteFirefox.reloadAddon);

            case 11:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, undefined);
    })));

    (0, _mocha.it)('resolves an AllExtensionsReloadError if any extension fails to reload', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
      var _prepareSelectedDevic10, params, runnerInstance, results, error, sourceDir;

      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _prepareSelectedDevic10 = prepareSelectedDeviceAndAPKParams({
                fakeRemoteFirefox: {
                  reloadAddon: _sinon2.default.spy(function () {
                    return Promise.reject(Error('Reload failure'));
                  })
                }
              }), params = _prepareSelectedDevic10.params;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context17.next = 4;
              return runnerInstance.run();

            case 4:
              _context17.next = 6;
              return runnerInstance.reloadAllExtensions();

            case 6:
              results = _context17.sent;
              error = results[0].reloadError;

              _chai.assert.instanceOf(error, _errors.WebExtError);

              sourceDir = params.extensions[0].sourceDir;

              _chai.assert.ok(error && error.message.includes('Error on extension loaded from ' + sourceDir + ': '));

              _sinon2.default.assert.called(runnerInstance.remoteFirefox.reloadAddon);

            case 12:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, undefined);
    })));

    (0, _mocha.it)('cleans the android device state when the exit method is called', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
      var _prepareSelectedDevic11, params, fakeADBUtils, runnerInstance, cleanupCallback, anotherCallback;

      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _prepareSelectedDevic11 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic11.params, fakeADBUtils = _prepareSelectedDevic11.fakeADBUtils;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              cleanupCallback = _sinon2.default.spy(function () {
                throw new Error('cleanup callback error');
              });
              anotherCallback = _sinon2.default.spy();


              runnerInstance.registerCleanup(cleanupCallback);
              runnerInstance.registerCleanup(anotherCallback);

              _context18.next = 8;
              return runnerInstance.run();

            case 8:
              _context18.next = 10;
              return runnerInstance.exit();

            case 10:

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.amForceStopAPK, 'emulator-1', params.firefoxApk);

              _chai.assert.isString(runnerInstance.selectedArtifactsDir);
              _chai.assert.equal(runnerInstance.selectedArtifactsDir, '/fake/artifacts-dir/');

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.clearArtifactsDir, 'emulator-1');

            case 14:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, undefined);
    })));

    (0, _mocha.it)('allows user to exit while waiting for the Android Firefox Debugger', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
      var _prepareSelectedDevic12, params, fakeADBUtils, fakeStdin, actualError, runnerInstance;

      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _prepareSelectedDevic12 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic12.params, fakeADBUtils = _prepareSelectedDevic12.fakeADBUtils;


              fakeADBUtils.discoverRDPUnixSocket = _sinon2.default.spy((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
                return _regenerator2.default.wrap(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        fakeStdin.emit('keypress', 'c', { name: 'c', ctrl: true });

                        _sinon2.default.assert.calledOnce(fakeADBUtils.setUserAbortDiscovery);
                        _sinon2.default.assert.calledWith(fakeADBUtils.setUserAbortDiscovery);

                        // Reject the expected error, if all the assertion passes.
                        throw new _errors.UsageError('fake user exit');

                      case 4:
                      case 'end':
                        return _context19.stop();
                    }
                  }
                }, _callee19, undefined);
              })));

              fakeStdin = new _helpers.FakeStdin();


              params.stdin = fakeStdin;

              actualError = void 0;
              _context20.prev = 5;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context20.next = 9;
              return runnerInstance.run();

            case 9:
              _context20.next = 14;
              break;

            case 11:
              _context20.prev = 11;
              _context20.t0 = _context20['catch'](5);

              actualError = _context20.t0;

            case 14:
              _context20.prev = 14;

              fakeStdin.emit('keypress', 'c', { name: 'c', ctrl: true });
              return _context20.finish(14);

            case 17:

              _chai.assert.instanceOf(actualError, _errors.UsageError);
              _chai.assert.match(actualError && actualError.message, /fake user exit/);

            case 19:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined, [[5, 11, 14, 17]]);
    })));

    (0, _mocha.it)('rejects on Android Firefox Debugger discovery timeouts', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
      var _prepareSelectedDevic13, params, fakeADBUtils, actualError, runnerInstance;

      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _prepareSelectedDevic13 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic13.params, fakeADBUtils = _prepareSelectedDevic13.fakeADBUtils;


              fakeADBUtils.discoverRDPUnixSocket = _sinon2.default.spy(function () {
                return Promise.reject(new _errors.WebExtError('fake timeout'));
              });

              params.firefoxAndroidTimeout = 0;

              actualError = void 0;
              _context21.prev = 4;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context21.next = 8;
              return runnerInstance.run();

            case 8:
              _context21.next = 13;
              break;

            case 10:
              _context21.prev = 10;
              _context21.t0 = _context21['catch'](4);

              actualError = _context21.t0;

            case 13:

              _chai.assert.instanceOf(actualError, _errors.WebExtError);
              _chai.assert.match(actualError && actualError.message, /fake timeout/);

            case 15:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, undefined, [[4, 10]]);
    })));

    (0, _mocha.it)('rejects if an extension has never been uploaded on the device', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22() {
      var _prepareSelectedDevic14, params, fakeFirefoxClient, actualError, runnerInstance;

      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _prepareSelectedDevic14 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic14.params;
              fakeFirefoxClient = params.firefoxClient;
              actualError = void 0;
              runnerInstance = void 0;


              params.firefoxClient = _sinon2.default.spy(function (firefoxClientParams) {
                // Clear the map of uploaded extensions to fake a missing one.
                runnerInstance.adbExtensionsPathBySourceDir.clear();
                return fakeFirefoxClient(firefoxClientParams);
              });

              _context22.prev = 5;

              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              _context22.next = 9;
              return runnerInstance.run();

            case 9:
              _context22.next = 14;
              break;

            case 11:
              _context22.prev = 11;
              _context22.t0 = _context22['catch'](5);

              actualError = _context22.t0;

            case 14:

              _chai.assert.instanceOf(actualError, _errors.WebExtError);
              _chai.assert.match(actualError && actualError.message, /ADB extension path for "(.*)" was unexpectedly empty/);

            case 16:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, undefined, [[5, 11]]);
    })));

    (0, _mocha.it)('calls the callback registered on cleanup when firefox closes', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
      var _prepareSelectedDevic15, params, fakeADBUtils, runnerInstance, cleanupCallback, anotherCallback, finalCallback, waitFinalCallback;

      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _prepareSelectedDevic15 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic15.params, fakeADBUtils = _prepareSelectedDevic15.fakeADBUtils;
              runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
              cleanupCallback = _sinon2.default.spy(function () {
                throw new Error('cleanup callback error');
              });
              anotherCallback = _sinon2.default.spy();

              finalCallback = function finalCallback() {};

              waitFinalCallback = new Promise(function (resolve) {
                finalCallback = function finalCallback() {
                  return resolve();
                };
              });


              runnerInstance.registerCleanup(cleanupCallback);
              runnerInstance.registerCleanup(anotherCallback);
              runnerInstance.registerCleanup(finalCallback);

              _context23.next = 11;
              return runnerInstance.run();

            case 11:

              runnerInstance.remoteFirefox.client.emit('end');

              _context23.next = 14;
              return waitFinalCallback;

            case 14:

              _sinon2.default.assert.calledWithMatch(fakeADBUtils.amForceStopAPK, 'emulator-1', params.firefoxApk);

              _sinon2.default.assert.calledOnce(cleanupCallback);
              _sinon2.default.assert.calledOnce(anotherCallback);

            case 17:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, undefined);
    })));

    (0, _mocha.it)('raises an error when unable to find an android version number', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25() {
      var expectInvalidVersionError = function () {
        var _ref32 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(version) {
          var _prepareSelectedDevic16, params, fakeADBUtils, runnerInstance, promise, expectedMsg;

          return _regenerator2.default.wrap(function _callee24$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  _prepareSelectedDevic16 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic16.params, fakeADBUtils = _prepareSelectedDevic16.fakeADBUtils;


                  fakeADBUtils.getAndroidVersionNumber = _sinon2.default.spy(function () {
                    return version;
                  });

                  runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
                  promise = runnerInstance.run();
                  expectedMsg = 'Invalid Android version: ' + version;
                  _context24.next = 7;
                  return _chai.assert.isRejected(promise, _errors.WebExtError);

                case 7:
                  _context24.next = 9;
                  return _chai.assert.isRejected(promise, expectedMsg);

                case 9:
                case 'end':
                  return _context24.stop();
              }
            }
          }, _callee24, this);
        }));

        return function expectInvalidVersionError(_x5) {
          return _ref32.apply(this, arguments);
        };
      }();

      return _regenerator2.default.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return expectInvalidVersionError(undefined);

            case 2:
              _context25.next = 4;
              return expectInvalidVersionError(NaN);

            case 4:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, undefined);
    })));

    (0, _mocha.it)('does not check granted android permissions on Android <= 21', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27() {
      var expectNoGrantedPermissionDiscovery = function () {
        var _ref34 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26(version) {
          var _prepareSelectedDevic17, params, fakeADBUtils, runnerInstance;

          return _regenerator2.default.wrap(function _callee26$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  _prepareSelectedDevic17 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic17.params, fakeADBUtils = _prepareSelectedDevic17.fakeADBUtils;


                  fakeADBUtils.getAndroidVersionNumber = _sinon2.default.spy(function () {
                    return Promise.resolve(version);
                  });

                  runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
                  _context26.next = 5;
                  return runnerInstance.run();

                case 5:

                  _sinon2.default.assert.calledWithMatch(fakeADBUtils.getAndroidVersionNumber, 'emulator-1');

                  _sinon2.default.assert.notCalled(fakeADBUtils.ensureRequiredAPKRuntimePermissions);

                case 7:
                case 'end':
                  return _context26.stop();
              }
            }
          }, _callee26, this);
        }));

        return function expectNoGrantedPermissionDiscovery(_x6) {
          return _ref34.apply(this, arguments);
        };
      }();

      // KitKat (Android 4.4).


      return _regenerator2.default.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return expectNoGrantedPermissionDiscovery(19);

            case 2:
              _context27.next = 4;
              return expectNoGrantedPermissionDiscovery(21);

            case 4:
              _context27.next = 6;
              return expectNoGrantedPermissionDiscovery(22);

            case 6:
            case 'end':
              return _context27.stop();
          }
        }
      }, _callee27, undefined);
    })));

    (0, _mocha.it)('checks the granted android permissions on Android >= 23', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29() {
      var testGrantedPermissionDiscovery = function () {
        var _ref36 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28(version) {
          var _prepareSelectedDevic18, params, fakeADBUtils, runnerInstance;

          return _regenerator2.default.wrap(function _callee28$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  _prepareSelectedDevic18 = prepareSelectedDeviceAndAPKParams(), params = _prepareSelectedDevic18.params, fakeADBUtils = _prepareSelectedDevic18.fakeADBUtils;


                  fakeADBUtils.getAndroidVersionNumber = _sinon2.default.spy(function () {
                    return Promise.resolve(version);
                  });

                  runnerInstance = new _firefoxAndroid.FirefoxAndroidExtensionRunner(params);
                  _context28.next = 5;
                  return runnerInstance.run();

                case 5:

                  _sinon2.default.assert.calledWithMatch(fakeADBUtils.getAndroidVersionNumber, 'emulator-1');

                  _sinon2.default.assert.calledWithMatch(fakeADBUtils.ensureRequiredAPKRuntimePermissions, 'emulator-1', 'org.mozilla.firefox', ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);

                  _sinon2.default.assert.callOrder(fakeADBUtils.getAndroidVersionNumber, fakeADBUtils.ensureRequiredAPKRuntimePermissions);

                case 8:
                case 'end':
                  return _context28.stop();
              }
            }
          }, _callee28, this);
        }));

        return function testGrantedPermissionDiscovery(_x7) {
          return _ref36.apply(this, arguments);
        };
      }();

      // Marshmallow (Android 6.0)


      return _regenerator2.default.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return testGrantedPermissionDiscovery(23);

            case 2:
              _context29.next = 4;
              return testGrantedPermissionDiscovery(24);

            case 4:
              _context29.next = 6;
              return testGrantedPermissionDiscovery(25);

            case 6:
            case 'end':
              return _context29.stop();
          }
        }
      }, _callee29, undefined);
    })));

    (0, _mocha.it)('logs warnings on the unsupported CLI options', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30() {
      var params, optionsWarningTestCases, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, testCase;

      return _regenerator2.default.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              params = prepareSelectedDeviceAndAPKParams();


              _logger.consoleStream.startCapturing();

              optionsWarningTestCases = [{
                params: { profilePath: '/fake/dir' },
                expectedMessage: /Android target does not support custom profile paths/
              }, {
                params: { keepProfileChanges: true },
                expectedMessage: /Android target does not support --keep-profile-changes/
              }, {
                params: { browserConsole: true },
                expectedMessage: /Android target does not support --browser-console/
              }, {
                params: { preInstall: true },
                expectedMessage: /Android target does not support --pre-install option/
              }, {
                params: { startUrl: 'http://fake-start-url.org' },
                expectedMessage: /Android target does not support --start-url option/
              }];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context30.prev = 6;


              for (_iterator = optionsWarningTestCases[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                testCase = _step.value;

                // $FLOW_IGNORE: allow overriden params for testing purpose.
                new _firefoxAndroid.FirefoxAndroidExtensionRunner((0, _extends3.default)({}, params, testCase.params));

                _chai.assert.match(_logger.consoleStream.capturedMessages[0], testCase.expectedMessage);

                _logger.consoleStream.flushCapturedLogs();
              }

              _context30.next = 14;
              break;

            case 10:
              _context30.prev = 10;
              _context30.t0 = _context30['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context30.t0;

            case 14:
              _context30.prev = 14;
              _context30.prev = 15;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 17:
              _context30.prev = 17;

              if (!_didIteratorError) {
                _context30.next = 20;
                break;
              }

              throw _iteratorError;

            case 20:
              return _context30.finish(17);

            case 21:
              return _context30.finish(14);

            case 22:
              _logger.consoleStream.stopCapturing();

            case 23:
            case 'end':
              return _context30.stop();
          }
        }
      }, _callee30, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    })));
  });
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _chai = __webpack_require__(5);

var _mocha = __webpack_require__(4);

var _deepcopy = __webpack_require__(54);

var _deepcopy2 = _interopRequireDefault(_deepcopy);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _firefoxDesktop = __webpack_require__(83);

var _helpers = __webpack_require__(10);

var _errors = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fake result for client.installTemporaryAddon().then(installResult => ...)
var tempInstallResult = {
  addon: { id: 'some-addon@test-suite' }
};
// Fake missing addon id result for client.installTemporaryAddon


var tempInstallResultMissingAddonId = {
  addon: { id: null }
};

function prepareExtensionRunnerParams() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      params = _ref.params,
      fakeFirefoxApp = _ref.fakeFirefoxApp,
      fakeRemoteFirefox = _ref.fakeRemoteFirefox,
      debuggerPort = _ref.debuggerPort;

  var remoteFirefox = (0, _helpers.getFakeRemoteFirefox)((0, _extends3.default)({
    installTemporaryAddon: _sinon2.default.spy(function () {
      return Promise.resolve(tempInstallResult);
    })
  }, fakeRemoteFirefox));
  var firefoxProcess = new _helpers.StubChildProcess();

  // $FLOW_IGNORE: allow overriden params for testing purpose.
  var runnerParams = (0, _extends3.default)({
    extensions: [{
      sourceDir: '/fake/sourceDir',
      manifestData: (0, _deepcopy2.default)(_helpers.basicManifest)
    }],
    keepProfileChanges: false,
    browserConsole: false,
    startUrl: undefined,
    firefoxBinary: 'firefox',
    preInstall: false,
    firefoxApp: (0, _helpers.getFakeFirefox)((0, _extends3.default)({
      run: _sinon2.default.spy(function () {
        return Promise.resolve({
          debuggerPort: debuggerPort,
          firefox: firefoxProcess
        });
      })
    }, fakeFirefoxApp), debuggerPort),
    firefoxClient: function firefoxClient() {
      return Promise.resolve(remoteFirefox);
    }
  }, params || {});

  return {
    remoteFirefox: remoteFirefox,
    firefoxProcess: firefoxProcess,
    params: runnerParams
  };
}

(0, _mocha.describe)('util/extension-runners/firefox-desktop', function () {
  var testBinaryArgs = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(extensionRunnerParams, expectedBinaryArgs) {
      var _prepareExtensionRunn4, params, runnerInstance;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _prepareExtensionRunn4 = prepareExtensionRunnerParams({
                params: (0, _extends3.default)({}, extensionRunnerParams)
              }), params = _prepareExtensionRunn4.params;


              _sinon2.default.spy(params, 'firefoxClient');

              runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
              _context4.next = 5;
              return runnerInstance.run();

            case 5:

              _sinon2.default.assert.calledOnce(params.firefoxApp.run);
              _sinon2.default.assert.calledWith(params.firefoxApp.run, _sinon2.default.match.any, _sinon2.default.match.has('binaryArgs', _sinon2.default.match.array.deepEquals(expectedBinaryArgs)));

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function testBinaryArgs(_x2, _x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  (0, _mocha.it)('installs and runs the extension', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var fakeProfile, customPrefs, _prepareExtensionRunn, params, remoteFirefox, runnerInstance;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fakeProfile = {};
            customPrefs = {};
            _prepareExtensionRunn = prepareExtensionRunnerParams({
              fakeFirefoxApp: {
                createProfile: _sinon2.default.spy(function () {
                  return fakeProfile;
                })
              },
              params: {
                customPrefs: customPrefs
              }
            }), params = _prepareExtensionRunn.params, remoteFirefox = _prepareExtensionRunn.remoteFirefox;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context.next = 6;
            return runnerInstance.run();

          case 6:

            _chai.assert.ok(runnerInstance.getName(), 'Firefox Desktop');
            _sinon2.default.assert.calledOnce(remoteFirefox.installTemporaryAddon);
            _sinon2.default.assert.calledWithMatch(remoteFirefox.installTemporaryAddon, params.extensions[0].sourceDir);

            _sinon2.default.assert.calledOnce(params.firefoxApp.createProfile);
            _sinon2.default.assert.calledWith(params.firefoxApp.createProfile, _sinon2.default.match({ customPrefs: customPrefs }));

            _sinon2.default.assert.calledOnce(params.firefoxApp.run);
            _sinon2.default.assert.calledWith(params.firefoxApp.run, _sinon2.default.match(fakeProfile));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  (0, _mocha.it)('runs extension in correct port', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var _prepareExtensionRunn2, params, runnerInstance;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _prepareExtensionRunn2 = prepareExtensionRunnerParams({
              debuggerPort: 6008
            }), params = _prepareExtensionRunn2.params;


            _sinon2.default.spy(params, 'firefoxClient');

            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context2.next = 5;
            return runnerInstance.run();

          case 5:

            _sinon2.default.assert.calledOnce(params.firefoxApp.run);
            _sinon2.default.assert.calledOnce(params.firefoxClient);
            _sinon2.default.assert.calledWith(params.firefoxClient, _sinon2.default.match({ port: 6008 }));

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  (0, _mocha.it)('suggests --pre-install when remote install not supported', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var _prepareExtensionRunn3, params, remoteFirefox, runnerInstance;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _prepareExtensionRunn3 = prepareExtensionRunnerParams({
              fakeRemoteFirefox: {
                // Simulate an older Firefox that will throw this error.
                installTemporaryAddon: _sinon2.default.spy(function () {
                  return Promise.reject(new _errors.RemoteTempInstallNotSupported(''));
                })
              }
            }), params = _prepareExtensionRunn3.params, remoteFirefox = _prepareExtensionRunn3.remoteFirefox;


            _sinon2.default.spy(params, 'firefoxClient');

            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            return _context3.abrupt('return', runnerInstance.run().then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
              _sinon2.default.assert.called(remoteFirefox.installTemporaryAddon);
              _chai.assert.match(error.message, /use --pre-install/);
            })));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  (0, _mocha.it)('passes -jsconsole when --browser-console is specified', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return testBinaryArgs({
              browserConsole: true
            }, ['-jsconsole']);

          case 2:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  (0, _mocha.it)('passes single url parameter to Firefox when specified', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return testBinaryArgs({
              startUrl: 'url1'
            }, ['--url', 'url1']);

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  (0, _mocha.it)('passes multiple url parameters to Firefox when specified', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return testBinaryArgs({
              startUrl: ['url1', 'url2']
            }, ['--url', 'url1', '--url', 'url2']);

          case 2:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  (0, _mocha.it)('passes a custom Firefox profile when specified', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var _prepareExtensionRunn5, params, runnerInstance;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _prepareExtensionRunn5 = prepareExtensionRunnerParams({
              params: {
                profilePath: '/path/to/profile'
              }
            }), params = _prepareExtensionRunn5.params;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context8.next = 4;
            return runnerInstance.run();

          case 4:

            _sinon2.default.assert.notCalled(params.firefoxApp.createProfile);
            _sinon2.default.assert.notCalled(params.firefoxApp.useProfile);
            _sinon2.default.assert.calledOnce(params.firefoxApp.copyProfile);
            _sinon2.default.assert.calledWith(params.firefoxApp.copyProfile, _sinon2.default.match(params.profilePath));

          case 8:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  (0, _mocha.it)('keeps changes in custom profile when specified', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
    var _prepareExtensionRunn6, params, runnerInstance;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _prepareExtensionRunn6 = prepareExtensionRunnerParams({
              params: {
                profilePath: '/path/to/profile',
                keepProfileChanges: true
              }
            }), params = _prepareExtensionRunn6.params;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context9.next = 4;
            return runnerInstance.run();

          case 4:

            _sinon2.default.assert.notCalled(params.firefoxApp.createProfile);
            _sinon2.default.assert.notCalled(params.firefoxApp.copyProfile);
            _sinon2.default.assert.calledOnce(params.firefoxApp.useProfile);
            _sinon2.default.assert.calledWith(params.firefoxApp.useProfile, _sinon2.default.match(params.profilePath));

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));

  (0, _mocha.it)('can pre-install into the profile before startup', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
    var fakeProfile, _prepareExtensionRunn7, params, remoteFirefox, runnerInstance, _params$extensions$, manifestData, sourceDir, install;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            fakeProfile = {};
            _prepareExtensionRunn7 = prepareExtensionRunnerParams({
              fakeFirefoxApp: {
                copyProfile: function copyProfile() {
                  return fakeProfile;
                }
              },
              params: {
                preInstall: true
              }
            }), params = _prepareExtensionRunn7.params, remoteFirefox = _prepareExtensionRunn7.remoteFirefox;


            _sinon2.default.spy(params, 'firefoxClient');

            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context10.next = 6;
            return runnerInstance.run();

          case 6:

            // Install the extension without connecting to the RDP server.

            _sinon2.default.assert.notCalled(params.firefoxClient);
            _sinon2.default.assert.notCalled(remoteFirefox.installTemporaryAddon);
            _sinon2.default.assert.called(params.firefoxApp.installExtension);

            _params$extensions$ = params.extensions[0], manifestData = _params$extensions$.manifestData, sourceDir = _params$extensions$.sourceDir;


            _sinon2.default.assert.calledWith(params.firefoxApp.installExtension, _sinon2.default.match({
              asProxy: true,
              manifestData: manifestData,
              profile: fakeProfile,
              extensionPath: sourceDir
            }));
            // $FLOW_IGNORE: ignored 'property not found' on sinon spy.
            install = params.firefoxApp.installExtension.firstCall.args[0];


            _chai.assert.equal(install.asProxy, true);
            _chai.assert.equal(install.manifestData.applications.gecko.id, manifestData.applications && manifestData.applications.gecko.id);
            _chai.assert.deepEqual(install.profile, fakeProfile);
            // This needs to be the source of the extension.
            _chai.assert.equal(install.extensionPath, sourceDir);

          case 16:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  (0, _mocha.it)('raise an error on addonId missing from installTemporaryAddon result', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
    var _prepareExtensionRunn8, params, runnerInstance;

    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _prepareExtensionRunn8 = prepareExtensionRunnerParams({
              fakeRemoteFirefox: {
                installTemporaryAddon: _sinon2.default.spy(function () {
                  return Promise.resolve(tempInstallResultMissingAddonId);
                })
              }
            }), params = _prepareExtensionRunn8.params;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context11.next = 4;
            return runnerInstance.run().catch(function (error) {
              return error;
            }).then(function (error) {
              _chai.assert.equal(error instanceof _errors.WebExtError, true);
              _chai.assert.equal(error && error.message, 'Unexpected missing addonId in the installAsTemporaryAddon result');
            });

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));

  (0, _mocha.it)('calls the callback registered on cleanup when firefox closes', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
    var _prepareExtensionRunn9, params, firefoxProcess, runnerInstance, cleanupCallback, anotherCallback;

    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _prepareExtensionRunn9 = prepareExtensionRunnerParams(), params = _prepareExtensionRunn9.params, firefoxProcess = _prepareExtensionRunn9.firefoxProcess;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            cleanupCallback = _sinon2.default.spy(function () {
              throw new Error('cleanup callback error');
            });
            anotherCallback = _sinon2.default.spy();


            runnerInstance.registerCleanup(cleanupCallback);
            runnerInstance.registerCleanup(anotherCallback);

            _context12.next = 8;
            return runnerInstance.run();

          case 8:

            firefoxProcess.emit('close');
            _context12.next = 11;
            return Promise.resolve();

          case 11:
            _sinon2.default.assert.calledOnce(cleanupCallback);
            _sinon2.default.assert.calledOnce(anotherCallback);

          case 13:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  (0, _mocha.it)('kills Firefox when the exit method is called', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
    var _prepareExtensionRunn10, params, firefoxProcess, runnerInstance, cleanupCallback, anotherCallback;

    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _prepareExtensionRunn10 = prepareExtensionRunnerParams(), params = _prepareExtensionRunn10.params, firefoxProcess = _prepareExtensionRunn10.firefoxProcess;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            cleanupCallback = _sinon2.default.spy(function () {
              throw new Error('cleanup callback error');
            });
            anotherCallback = _sinon2.default.spy();


            runnerInstance.registerCleanup(cleanupCallback);
            runnerInstance.registerCleanup(anotherCallback);

            _context13.next = 8;
            return runnerInstance.run();

          case 8:
            _context13.next = 10;
            return runnerInstance.exit();

          case 10:

            _sinon2.default.assert.calledOnce(firefoxProcess.kill);

          case 11:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  })));

  (0, _mocha.it)('raises an Error when exit method is called on a non-started runner', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
    var _prepareExtensionRunn11, params, runnerInstance;

    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _prepareExtensionRunn11 = prepareExtensionRunnerParams(), params = _prepareExtensionRunn11.params;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context14.next = 4;
            return runnerInstance.exit().catch(function (error) {
              return error;
            }).then(function (error) {
              _chai.assert.equal(error instanceof _errors.WebExtError, true);
              _chai.assert.equal(error && error.message, 'No firefox instance is currently running');
            });

          case 4:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));

  (0, _mocha.it)('reloads all reloadable extensions when reloadAllExtensions is called', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
    var _prepareExtensionRunn12, params, remoteFirefox, runnerInstance;

    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _prepareExtensionRunn12 = prepareExtensionRunnerParams(), params = _prepareExtensionRunn12.params, remoteFirefox = _prepareExtensionRunn12.remoteFirefox;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context15.next = 4;
            return runnerInstance.run();

          case 4:
            _context15.next = 6;
            return runnerInstance.reloadAllExtensions();

          case 6:

            _sinon2.default.assert.calledOnce(remoteFirefox.reloadAddon);

          case 7:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));

  (0, _mocha.it)('reloads an extension by sourceDir', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
    var _prepareExtensionRunn13, params, remoteFirefox, runnerInstance;

    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _prepareExtensionRunn13 = prepareExtensionRunnerParams(), params = _prepareExtensionRunn13.params, remoteFirefox = _prepareExtensionRunn13.remoteFirefox;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context16.next = 4;
            return runnerInstance.run();

          case 4:
            _context16.next = 6;
            return runnerInstance.reloadExtensionBySourceDir(params.extensions[0].sourceDir);

          case 6:

            _sinon2.default.assert.calledOnce(remoteFirefox.reloadAddon);

          case 7:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));

  (0, _mocha.it)('resolves to an array of WebExtError if the extension is not reloadable', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
    var _prepareExtensionRunn14, params, remoteFirefox, runnerInstance;

    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _prepareExtensionRunn14 = prepareExtensionRunnerParams(), params = _prepareExtensionRunn14.params, remoteFirefox = _prepareExtensionRunn14.remoteFirefox;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context17.next = 4;
            return runnerInstance.run();

          case 4:
            _context17.next = 6;
            return runnerInstance.reloadExtensionBySourceDir('/non-existent/source-dir').then(function (results) {
              var error = results[0].reloadError;
              _chai.assert.equal(error instanceof _errors.WebExtError, true);
              _chai.assert.equal(error && error.message, 'Extension not reloadable: no addonId has been mapped to ' + '"/non-existent/source-dir"');
            });

          case 6:

            _sinon2.default.assert.notCalled(remoteFirefox.reloadAddon);

          case 7:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));

  (0, _mocha.it)('resolves to an AllExtensionsReloadError if any extension fails to reload', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
    var _prepareExtensionRunn15, params, remoteFirefox, runnerInstance;

    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _prepareExtensionRunn15 = prepareExtensionRunnerParams({
              fakeRemoteFirefox: {
                reloadAddon: _sinon2.default.spy(function () {
                  return Promise.reject(Error('Reload failure'));
                })
              }
            }), params = _prepareExtensionRunn15.params, remoteFirefox = _prepareExtensionRunn15.remoteFirefox;
            runnerInstance = new _firefoxDesktop.FirefoxDesktopExtensionRunner(params);
            _context18.next = 4;
            return runnerInstance.run();

          case 4:
            _context18.next = 6;
            return runnerInstance.reloadAllExtensions().then(function (results) {
              var error = results[0].reloadError;
              _chai.assert.equal(error instanceof _errors.WebExtError, true);
              var sourceDir = params.extensions[0].sourceDir;

              _chai.assert.ok(error && error.message.includes('Error on extension loaded from ' + sourceDir + ': '));
            });

          case 6:

            _sinon2.default.assert.called(remoteFirefox.reloadAddon);

          case 7:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  })));
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _objectWithoutProperties2 = __webpack_require__(85);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createFakeProfilesIni = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dirPath, profilesDefs) {
    var content, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, idx, _profile, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, k;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = '';
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = profilesDefs.entries()[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 32;
              break;
            }

            _step$value = (0, _slicedToArray3.default)(_step.value, 2), idx = _step$value[0], _profile = _step$value[1];

            content += '[Profile' + idx + ']\n';
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 12;
            for (_iterator2 = Object.keys(_profile)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              k = _step2.value;

              content += k + '=' + _profile[k] + '\n';
            }
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](12);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 20:
            _context.prev = 20;
            _context.prev = 21;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 23:
            _context.prev = 23;

            if (!_didIteratorError2) {
              _context.next = 26;
              break;
            }

            throw _iteratorError2;

          case 26:
            return _context.finish(23);

          case 27:
            return _context.finish(20);

          case 28:
            content += '\n';

          case 29:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 32:
            _context.next = 38;
            break;

          case 34:
            _context.prev = 34;
            _context.t1 = _context['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 38:
            _context.prev = 38;
            _context.prev = 39;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 41:
            _context.prev = 41;

            if (!_didIteratorError) {
              _context.next = 44;
              break;
            }

            throw _iteratorError;

          case 44:
            return _context.finish(41);

          case 45:
            return _context.finish(38);

          case 46:
            _context.next = 48;
            return _mz.fs.writeFile(_path2.default.join(dirPath, 'profiles.ini'), content);

          case 48:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 34, 38, 46], [12, 16, 20, 28], [21,, 23, 27], [39,, 41, 45]]);
  }));

  return function createFakeProfilesIni(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _deepcopy = __webpack_require__(54);

var _deepcopy2 = _interopRequireDefault(_deepcopy);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _firefoxProfile = __webpack_require__(107);

var _firefoxProfile2 = _interopRequireDefault(_firefoxProfile);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _mz = __webpack_require__(9);

var _firefox = __webpack_require__(42);

var firefox = _interopRequireWildcard(_firefox);

var _errors = __webpack_require__(3);

var _tempDir = __webpack_require__(16);

var _helpers = __webpack_require__(10);

var _test = __webpack_require__(53);

var _remote = __webpack_require__(27);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultFirefoxEnv = firefox.defaultFirefoxEnv;


function withBaseProfile(callback) {
  return (0, _tempDir.withTempDir)(function (tmpDir) {
    var baseProfile = new _firefoxProfile2.default({
      destinationDirectory: tmpDir.path()
    });
    return callback(baseProfile);
  });
}

function createFakeProfileFinder(profilesDirPath) {
  var FakeProfileFinder = _sinon2.default.spy(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var finder = new (Function.prototype.bind.apply(_firefoxProfile2.default.Finder, [null].concat(args)))();

    _sinon2.default.spy(finder, 'readProfiles');

    return finder;
  });

  FakeProfileFinder.locateUserDirectory = _sinon2.default.spy(function () {
    return profilesDirPath;
  });

  return FakeProfileFinder;
}

(0, _mocha.describe)('firefox', function () {

  (0, _mocha.describe)('run', function () {

    var fakeProfile = {
      path: function path() {
        return '/dev/null/some-profile-path';
      }
    };

    var fakeFirefoxProcess = {
      on: function on(eventName, callback) {
        if (eventName === 'close') {
          // Immediately "emit" a close event to complete the test.
          callback();
        }
      },
      stdout: { on: function on() {} },
      stderr: { on: function on() {} }
    };

    function createFakeFxRunner() {
      var firefoxOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var fxProcess = (0, _extends3.default)({}, (0, _deepcopy2.default)(fakeFirefoxProcess), firefoxOverrides);
      return _sinon2.default.spy(function () {
        return Promise.resolve({ args: [], process: fxProcess });
      });
    }

    // TODO: This object should accept dynamic properties since those are passed to firefox.run()

    function runFirefox() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _ref2$profile = _ref2.profile,
          profile = _ref2$profile === undefined ? fakeProfile : _ref2$profile,
          args = (0, _objectWithoutProperties3.default)(_ref2, ['profile']);

      return firefox.run(profile, (0, _extends3.default)({
        fxRunner: createFakeFxRunner(),
        findRemotePort: function findRemotePort() {
          return Promise.resolve(6000);
        }
      }, args));
    }

    (0, _mocha.it)('executes the Firefox runner with a given profile', function () {
      var runner = createFakeFxRunner();
      var profile = fakeProfile;
      return runFirefox({ fxRunner: runner, profile: profile }).then(function () {
        _sinon2.default.assert.called(runner);
        _chai.assert.equal(runner.firstCall.args[0].profile, profile.path());
      });
    });

    (0, _mocha.it)('starts the remote debugger on a discovered port', function () {
      var port = 6001;
      var runner = createFakeFxRunner();
      var findRemotePort = _sinon2.default.spy(function () {
        return Promise.resolve(port);
      });
      return runFirefox({ fxRunner: runner, findRemotePort: findRemotePort }).then(function () {
        _sinon2.default.assert.called(runner);
        _chai.assert.equal(runner.firstCall.args[0].listen, port);
      });
    });

    (0, _mocha.it)('passes binary args to Firefox', function () {
      var fxRunner = createFakeFxRunner();
      var binaryArgs = '--safe-mode';
      return runFirefox({ fxRunner: fxRunner, binaryArgs: binaryArgs }).then(function () {
        _sinon2.default.assert.called(fxRunner);
        _chai.assert.equal(fxRunner.firstCall.args[0]['binary-args'], binaryArgs);
      });
    });

    (0, _mocha.it)('sets up a Firefox process environment', function () {
      var runner = createFakeFxRunner();
      // Make sure it passes through process environment variables.
      process.env._WEB_EXT_FIREFOX_ENV_TEST = 'thing';
      return runFirefox({ fxRunner: runner }).then(function () {
        var declaredEnv = runner.firstCall.args[0].env;
        for (var key in defaultFirefoxEnv) {
          _chai.assert.equal(declaredEnv[key], defaultFirefoxEnv[key]);
        }
        _chai.assert.equal(declaredEnv._WEB_EXT_FIREFOX_ENV_TEST, 'thing');
      });
    });

    (0, _mocha.it)('fails on a firefox error', function () {
      var someError = new Error('some internal firefox error');
      var runner = createFakeFxRunner({
        on: function on(eventName, callback) {
          if (eventName === 'error') {
            // Immediately "emit" an error event.
            callback(someError);
          }
        }
      });

      return runFirefox({ fxRunner: runner }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.equal(error.message, someError.message);
      });
    });

    (0, _mocha.it)('passes a custom Firefox binary when specified', function () {
      var runner = createFakeFxRunner();
      var firefoxBinary = '/pretend/path/to/firefox-bin';
      return runFirefox({ fxRunner: runner, firefoxBinary: firefoxBinary }).then(function () {
        _sinon2.default.assert.called(runner);
        _sinon2.default.assert.calledWithMatch(runner, { binary: firefoxBinary });
      });
    });

    (0, _mocha.it)('logs stdout and stderr without errors', function () {
      // Store a registry of handlers that we can execute directly.
      var firefoxApp = {};
      var runner = createFakeFxRunner({
        stdout: {
          on: function on(event, handler) {
            firefoxApp.writeStdout = handler;
          }
        },
        stderr: {
          on: function on(event, handler) {
            firefoxApp.writeStderr = handler;
          }
        }
      });

      return runFirefox({ fxRunner: runner }).then(function () {
        // This makes sure that when each handler writes to the
        // logger they don't raise any exceptions.
        firefoxApp.writeStdout('example of stdout');
        firefoxApp.writeStderr('example of stderr');
      });
    });
  });

  (0, _mocha.describe)('copyProfile', function () {

    (0, _mocha.it)('copies a profile', function () {
      return withBaseProfile(function (baseProfile) {
        baseProfile.setPreference('webext.customSetting', true);
        baseProfile.updatePreferences();

        return firefox.copyProfile(baseProfile.path(), {
          configureThisProfile: function configureThisProfile(profile) {
            return Promise.resolve(profile);
          }
        }).then(function (profile) {
          return _mz.fs.readFile(profile.userPrefs);
        }).then(function (userPrefs) {
          _chai.assert.include(userPrefs.toString(), 'webext.customSetting');
        });
      });
    });

    (0, _mocha.it)('requires a valid profile directory', function () {
      // This stubs out the code that looks for a named
      // profile because on Travis CI there will not be a Firefox
      // user directory.
      var copyFromUserProfile = _sinon2.default.spy(function (config, cb) {
        return cb(new Error('simulated: could not find profile'));
      });

      return firefox.copyProfile('/dev/null/non_existent_path', {
        copyFromUserProfile: copyFromUserProfile,
        configureThisProfile: function configureThisProfile(profile) {
          return Promise.resolve(profile);
        }
      }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
        _chai.assert.equal(copyFromUserProfile.called, true);
        _chai.assert.match(error.message, /Could not copy Firefox profile from .*non_existent_path/);
      }));
    });

    (0, _mocha.it)('can copy a profile by name', function () {
      var name = 'some-fake-firefox-profile-name';
      // Fake profile object:
      var profileToCopy = {
        defaultPreferences: {
          thing: 'value'
        }
      };
      var copyFromUserProfile = _sinon2.default.spy(function (config, callback) {
        return callback(null, profileToCopy);
      });

      return firefox.copyProfile(name, {
        copyFromUserProfile: copyFromUserProfile,
        configureThisProfile: function configureThisProfile(profile) {
          return Promise.resolve(profile);
        }
      }).then(function (profile) {
        _sinon2.default.assert.called(copyFromUserProfile);
        _sinon2.default.assert.calledWithMatch(copyFromUserProfile, { name: name });
        _chai.assert.equal(profile.defaultPreferences.thing, profileToCopy.defaultPreferences.thing);
      });
    });

    (0, _mocha.it)('configures the copied profile', function () {
      return withBaseProfile(function (baseProfile) {
        var app = 'fennec';
        var configureThisProfile = _sinon2.default.spy(function (profile) {
          return Promise.resolve(profile);
        });

        return firefox.copyProfile(baseProfile.path(), {
          app: app, configureThisProfile: configureThisProfile
        }).then(function (profile) {
          _sinon2.default.assert.called(configureThisProfile);
          _sinon2.default.assert.calledWith(configureThisProfile, profile);
          _chai.assert.equal(configureThisProfile.firstCall.args[1].app, app);
        });
      });
    });
  });

  (0, _mocha.describe)('isDefaultProfile', function () {

    (0, _mocha.it)('detects common Firefox default profiles specified by name', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var isDefault, isDevEditionDefault;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return firefox.isDefaultProfile('default');

            case 2:
              isDefault = _context2.sent;

              _chai.assert.equal(isDefault, true);

              _context2.next = 6;
              return firefox.isDefaultProfile('dev-edition-default');

            case 6:
              isDevEditionDefault = _context2.sent;

              _chai.assert.equal(isDevEditionDefault, true);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    (0, _mocha.it)('allows profile name if it is not listed as default in profiles.ini', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', (0, _tempDir.withTempDir)(function () {
                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(tmpDir) {
                  var profilesDirPath, FakeProfileFinder, isDefault, isNotDefault;
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          profilesDirPath = tmpDir.path();
                          FakeProfileFinder = createFakeProfileFinder(profilesDirPath);
                          _context3.next = 4;
                          return createFakeProfilesIni(profilesDirPath, [{
                            Name: 'manually-set-default',
                            Path: 'fake-default-profile',
                            IsRelative: 1,
                            Default: 1
                          }]);

                        case 4:
                          _context3.next = 6;
                          return firefox.isDefaultProfile('manually-set-default', FakeProfileFinder);

                        case 6:
                          isDefault = _context3.sent;

                          _chai.assert.equal(isDefault, true, 'Manually configured default profile');

                          _context3.next = 10;
                          return firefox.isDefaultProfile('unkown-profile-name', FakeProfileFinder);

                        case 10:
                          isNotDefault = _context3.sent;

                          _chai.assert.equal(isNotDefault, false, 'Unknown profile name');

                        case 12:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, undefined);
                }));

                return function (_x5) {
                  return _ref5.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    (0, _mocha.it)('allows profile path if it is not listed as default in profiles.ini', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', (0, _tempDir.withTempDir)(function () {
                var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(tmpDir) {
                  var profilesDirPath, FakeProfileFinder, absProfilePath, isFirefoxDefaultPath, isDevEditionDefaultPath, isManuallyDefault, isNotDefault;
                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          profilesDirPath = tmpDir.path();
                          FakeProfileFinder = createFakeProfileFinder(profilesDirPath);
                          absProfilePath = _path2.default.join(profilesDirPath, 'fake-manually-default-profile');
                          _context5.next = 5;
                          return createFakeProfilesIni(profilesDirPath, [{
                            Name: 'default',
                            Path: 'fake-default-profile',
                            IsRelative: 1
                          }, {
                            Name: 'dev-edition-default',
                            Path: 'fake-devedition-default-profile',
                            IsRelative: 1
                          }, {
                            Name: 'manually-set-default',
                            Path: absProfilePath,
                            Default: 1
                          }]);

                        case 5:
                          _context5.next = 7;
                          return firefox.isDefaultProfile(_path2.default.join(profilesDirPath, 'fake-default-profile'), FakeProfileFinder);

                        case 7:
                          isFirefoxDefaultPath = _context5.sent;

                          _chai.assert.equal(isFirefoxDefaultPath, true, 'Firefox default profile');

                          _context5.next = 11;
                          return firefox.isDefaultProfile(_path2.default.join(profilesDirPath, 'fake-devedition-default-profile'), FakeProfileFinder);

                        case 11:
                          isDevEditionDefaultPath = _context5.sent;

                          _chai.assert.equal(isDevEditionDefaultPath, true, 'Firefox DevEdition default profile');

                          _context5.next = 15;
                          return firefox.isDefaultProfile(absProfilePath, FakeProfileFinder);

                        case 15:
                          isManuallyDefault = _context5.sent;

                          _chai.assert.equal(isManuallyDefault, true, 'Manually configured default profile');

                          _context5.next = 19;
                          return firefox.isDefaultProfile(_path2.default.join(profilesDirPath, 'unkown-profile-dir'), FakeProfileFinder);

                        case 19:
                          isNotDefault = _context5.sent;

                          _chai.assert.equal(isNotDefault, false, 'Unknown profile path');

                        case 21:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, undefined);
                }));

                return function (_x6) {
                  return _ref7.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    (0, _mocha.it)('allows profile path if there is no profiles.ini file', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt('return', (0, _tempDir.withTempDir)(function () {
                var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(tmpDir) {
                  var profilesDirPath, FakeProfileFinder, isNotDefault;
                  return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          profilesDirPath = tmpDir.path();
                          FakeProfileFinder = createFakeProfileFinder(profilesDirPath);
                          _context7.next = 4;
                          return firefox.isDefaultProfile('/tmp/my-custom-profile-dir', FakeProfileFinder);

                        case 4:
                          isNotDefault = _context7.sent;


                          _chai.assert.equal(isNotDefault, false);

                        case 6:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _callee7, undefined);
                }));

                return function (_x7) {
                  return _ref9.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    (0, _mocha.it)('rejects on any unexpected error while looking for profiles.ini', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt('return', (0, _tempDir.withTempDir)(function () {
                var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(tmpDir) {
                  var profilesDirPath, FakeProfileFinder, fakeFsStat, exception;
                  return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          profilesDirPath = tmpDir.path();
                          FakeProfileFinder = createFakeProfileFinder(profilesDirPath);
                          fakeFsStat = _sinon2.default.spy(function () {
                            return Promise.reject(new Error('Fake fs stat error'));
                          });
                          exception = void 0;
                          _context9.prev = 4;
                          _context9.next = 7;
                          return firefox.isDefaultProfile('/tmp/my-custom-profile-dir', FakeProfileFinder, fakeFsStat);

                        case 7:
                          _context9.next = 12;
                          break;

                        case 9:
                          _context9.prev = 9;
                          _context9.t0 = _context9['catch'](4);

                          exception = _context9.t0;

                        case 12:

                          _chai.assert.match(exception && exception.message, /Fake fs stat error/);

                        case 13:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, undefined, [[4, 9]]);
                }));

                return function (_x8) {
                  return _ref11.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    })));
  });

  (0, _mocha.describe)('createProfile', function () {

    (0, _mocha.it)('resolves with a profile object', function () {
      return firefox.createProfile({ configureThisProfile: function configureThisProfile(profile) {
          return Promise.resolve(profile);
        } }).then(function (profile) {
        _chai.assert.instanceOf(profile, _firefoxProfile2.default);
      });
    });

    (0, _mocha.it)('creates a Firefox profile', function () {
      // This is a quick and paranoid sanity check that the FirefoxProfile
      // object is real and has some preferences.
      return firefox.createProfile({ configureThisProfile: function configureThisProfile(profile) {
          return Promise.resolve(profile);
        } }).then(function (profile) {
        profile.updatePreferences();
        return _mz.fs.readFile(_path2.default.join(profile.path(), 'user.js'));
      }).then(function (prefFile) {
        // Check for some default pref set by FirefoxProfile.
        _chai.assert.include(prefFile.toString(), '"startup.homepage_welcome_url", "about:blank"');
      });
    });

    (0, _mocha.it)('configures a profile', function () {
      var configureThisProfile = _sinon2.default.spy(function (profile) {
        return Promise.resolve(profile);
      });
      var app = 'fennec';
      return firefox.createProfile({ app: app, configureThisProfile: configureThisProfile }).then(function (profile) {
        _sinon2.default.assert.called(configureThisProfile);
        _sinon2.default.assert.calledWith(configureThisProfile, profile);
        _chai.assert.equal(configureThisProfile.firstCall.args[1].app, app);
      });
    });
  });

  (0, _mocha.describe)('useProfile', function () {
    (0, _mocha.it)('rejects to a UsageError when used on a default Firefox profile', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
      var configureThisProfile, isFirefoxDefaultProfile, exception;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              configureThisProfile = _sinon2.default.spy(function (profile) {
                return Promise.resolve(profile);
              });
              isFirefoxDefaultProfile = _sinon2.default.spy(function () {
                return Promise.resolve(true);
              });
              exception = void 0;
              _context11.prev = 3;
              _context11.next = 6;
              return firefox.useProfile('default', {
                configureThisProfile: configureThisProfile,
                isFirefoxDefaultProfile: isFirefoxDefaultProfile
              });

            case 6:
              _context11.next = 11;
              break;

            case 8:
              _context11.prev = 8;
              _context11.t0 = _context11['catch'](3);

              exception = _context11.t0;

            case 11:

              _chai.assert.match(exception && exception.message, /Cannot use --keep-profile-changes on a default profile/);

            case 12:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined, [[3, 8]]);
    })));

    (0, _mocha.it)('resolves to a FirefoxProfile instance', function () {
      return withBaseProfile(function (baseProfile) {
        var configureThisProfile = function configureThisProfile(profile) {
          return Promise.resolve(profile);
        };
        return firefox.useProfile(baseProfile.path(), { configureThisProfile: configureThisProfile }).then(function (profile) {
          _chai.assert.instanceOf(profile, _firefoxProfile2.default);
        });
      });
    });

    (0, _mocha.it)('configures a profile', function () {
      return withBaseProfile(function (baseProfile) {
        var configureThisProfile = _sinon2.default.spy(function (profile) {
          return Promise.resolve(profile);
        });
        var app = 'fennec';
        var profilePath = baseProfile.path();
        return firefox.useProfile(profilePath, { app: app, configureThisProfile: configureThisProfile }).then(function (profile) {
          _sinon2.default.assert.called(configureThisProfile);
          _sinon2.default.assert.calledWith(configureThisProfile, profile);
          _chai.assert.equal(configureThisProfile.firstCall.args[1].app, app);
        });
      });
    });
  });

  (0, _mocha.describe)('configureProfile', function () {

    function withTempProfile(callback) {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var profile = new _firefoxProfile2.default({
          destinationDirectory: tmpDir.path()
        });
        return callback(profile);
      });
    }

    (0, _mocha.it)('resolves with a profile', function () {
      return withTempProfile(function (profile) {
        var fakePrefGetter = _sinon2.default.stub().returns({});
        return firefox.configureProfile(profile, { getPrefs: fakePrefGetter }).then(function (configuredProfile) {
          _chai.assert.instanceOf(configuredProfile, _firefoxProfile2.default);
        });
      });
    });

    (0, _mocha.it)('sets Firefox preferences', function () {
      return withTempProfile(function (profile) {
        var fakePrefGetter = _sinon2.default.stub().returns({});
        return firefox.configureProfile(profile, { getPrefs: fakePrefGetter }).then(function () {
          _sinon2.default.assert.calledWith(fakePrefGetter, 'firefox');
        });
      });
    });

    (0, _mocha.it)('sets Fennec preferences', function () {
      return withTempProfile(function (profile) {
        var fakePrefGetter = _sinon2.default.stub().returns({});
        return firefox.configureProfile(profile, {
          getPrefs: fakePrefGetter,
          app: 'fennec'
        }).then(function () {
          _sinon2.default.assert.calledWith(fakePrefGetter, 'fennec');
        });
      });
    });

    (0, _mocha.it)('writes new preferences', function () {
      return withTempProfile(function (profile) {
        // This is a quick sanity check that real preferences were
        // written to disk.
        return firefox.configureProfile(profile).then(function (configuredProfile) {
          return _mz.fs.readFile(_path2.default.join(configuredProfile.path(), 'user.js'));
        }).then(function (prefFile) {
          // Check for some pref set by configureProfile().
          _chai.assert.include(prefFile.toString(), '"devtools.debugger.remote-enabled", true');
        });
      });
    });

    (0, _mocha.it)('writes custom preferences', function () {
      return withTempProfile(function (profile) {
        var customPrefs = { 'extensions.checkCompatibility.nightly': true };
        return firefox.configureProfile(profile, { customPrefs: customPrefs }).then(function (configuredProfile) {
          return _mz.fs.readFile(_path2.default.join(configuredProfile.path(), 'user.js'));
        }).then(function (prefFile) {
          // Check for custom pref set by configureProfile().
          _chai.assert.include(prefFile.toString(), '"extensions.checkCompatibility.nightly", true');
          // Check that one of the default preferences is set as well
          _chai.assert.include(prefFile.toString(), '"devtools.debugger.remote-enabled", true');
        });
      });
    });
  });

  (0, _mocha.describe)('installExtension', function () {

    function setUp(testPromise) {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var data = {
          extensionPath: (0, _helpers.fixturePath)('minimal_extension-1.0.zip'),
          profile: undefined,
          profileDir: _path2.default.join(tmpDir.path(), 'profile')
        };
        return _mz.fs.mkdir(data.profileDir).then(function () {
          data.profile = new _firefoxProfile2.default({
            destinationDirectory: data.profileDir
          });
        }).then(function () {
          return testPromise(data);
        });
      });
    }

    function installBasicExt(data) {
      return firefox.installExtension({
        manifestData: _helpers.basicManifest,
        profile: data.profile,
        extensionPath: data.extensionPath
      });
    }

    (0, _mocha.it)('installs an extension file into a profile', function () {
      return setUp(function (data) {
        return installBasicExt(data).then(function () {
          return _mz.fs.readdir(data.profile.extensionsDir);
        }).then(function (files) {
          _chai.assert.deepEqual(files, ['basic-manifest@web-ext-test-suite.xpi']);
        });
      });
    });

    (0, _mocha.it)('requires a manifest ID', function () {
      return setUp(function (data) {
        return firefox.installExtension({
          manifestData: _test.manifestWithoutApps,
          profile: data.profile,
          extensionPath: data.extensionPath
        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
          _chai.assert.match(error.message, /explicit extension ID is required/);
        }));
      });
    });

    (0, _mocha.it)('can install the extension as a proxy', function () {
      return setUp(function (data) {
        var sourceDir = (0, _helpers.fixturePath)('minimal-web-ext');
        return firefox.installExtension({
          manifestData: _helpers.basicManifest,
          profile: data.profile,
          extensionPath: sourceDir,
          asProxy: true
        }).then(function () {
          var proxyFile = _path2.default.join(data.profile.extensionsDir, 'basic-manifest@web-ext-test-suite');
          return _mz.fs.readFile(proxyFile);
        }).then(function (proxyData) {
          // The proxy file should contain the path to the extension.
          _chai.assert.equal(proxyData.toString(), sourceDir);
        });
      });
    });

    (0, _mocha.it)('requires a directory path for proxy installs', function () {
      return setUp(function (data) {
        var extensionPath = (0, _helpers.fixturePath)('minimal_extension-1.0.zip');
        return firefox.installExtension({
          manifestData: _helpers.basicManifest,
          profile: data.profile,
          extensionPath: extensionPath,
          asProxy: true
        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
          _chai.assert.match(error.message, /must be the extension source directory/);
          _chai.assert.include(error.message, extensionPath);
        }));
      });
    });

    (0, _mocha.it)('re-uses an existing extension directory', function () {
      return setUp(function (data) {
        return _mz.fs.mkdir(_path2.default.join(data.profile.extensionsDir)).then(function () {
          return installBasicExt(data);
        }).then(function () {
          return _mz.fs.stat(data.profile.extensionsDir);
        });
      });
    });

    (0, _mocha.it)('checks for an empty extensionsDir', function () {
      return setUp(function (data) {
        data.profile.extensionsDir = undefined;
        return installBasicExt(data).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
          _chai.assert.match(error.message, /unexpectedly empty/);
        }));
      });
    });
  });

  (0, _mocha.describe)('defaultRemotePortFinder', function () {

    function findRemotePort() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var args = (0, _objectWithoutProperties3.default)(_ref13, []);

      return firefox.defaultRemotePortFinder((0, _extends3.default)({}, args));
    }

    (0, _mocha.it)('resolves to an open port', function () {
      var connectToFirefox = _sinon2.default.spy(function () {
        return Promise.reject(new _helpers.TCPConnectError());
      });
      return findRemotePort({ connectToFirefox: connectToFirefox }).then(function (port) {
        _chai.assert.isNumber(port);
      });
    });

    (0, _mocha.it)('returns a port on first try', function () {
      var connectToFirefox = _sinon2.default.spy(function () {
        return new Promise(function (resolve, reject) {
          reject(new _helpers.TCPConnectError('first call connection fails - port is free'));
        });
      });
      return findRemotePort({ connectToFirefox: connectToFirefox, retriesLeft: 2 }).then(function (port) {
        _sinon2.default.assert.calledOnce(connectToFirefox);
        _chai.assert.isNumber(port);
      });
    });

    (0, _mocha.it)('cancels search after too many fails', function () {
      var client = (0, _helpers.fake)(_remote.RemoteFirefox.prototype);
      var connectToFirefox = _sinon2.default.spy(function () {
        return new Promise(function (resolve) {
          return resolve(client);
        });
      });
      return findRemotePort({ connectToFirefox: connectToFirefox, retriesLeft: 2 }).catch(function (err) {
        _chai.assert.equal(err, 'WebExtError: Too many retries on port search');
        _sinon2.default.assert.calledThrice(connectToFirefox);
      });
    });

    (0, _mocha.it)('retries port discovery after first failure', function () {
      var client = (0, _helpers.fake)(_remote.RemoteFirefox.prototype);
      var callCount = 0;
      var connectToFirefox = _sinon2.default.spy(function () {
        callCount++;
        return new Promise(function (resolve, reject) {
          if (callCount === 2) {
            reject(new _helpers.TCPConnectError('port is free'));
          } else {
            resolve(client);
          }
        });
      });
      return findRemotePort({ connectToFirefox: connectToFirefox, retriesLeft: 2 }).then(function (port) {
        _chai.assert.isNumber(port);
        _sinon2.default.assert.calledTwice(connectToFirefox);
      });
    });
  });
});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _errors = __webpack_require__(3);

var _preferences = __webpack_require__(81);

(0, _mocha.describe)('firefox/preferences', function () {

  (0, _mocha.describe)('getPrefs', function () {

    (0, _mocha.it)('gets Firefox prefs with some defaults', function () {
      var prefs = (0, _preferences.getPrefs)();
      // This is a commonly shared pref.
      _chai.assert.equal(prefs['devtools.debugger.remote-enabled'], true);
      // This is a Firefox only pref.
      _chai.assert.equal(prefs['devtools.chrome.enabled'], true);
      // This is a Firefox only pref that we set to prevent Firefox
      // to open the privacy policy info page on every "web-ext run".
      _chai.assert.equal(prefs['datareporting.policy.firstRunURL'], '');
    });

    (0, _mocha.it)('gets Fennec prefs with some defaults', function () {
      var prefs = (0, _preferences.getPrefs)('fennec');
      // This is a commonly shared pref.
      _chai.assert.equal(prefs['devtools.debugger.remote-enabled'], true);
      // This is a Fennec only pref.
      _chai.assert.equal(prefs['browser.console.showInPanel'], true);
    });

    (0, _mocha.it)('throws an error for unsupported apps', function () {
      // $FLOW_IGNORE: ignore type errors on testing nonexistent 'thunderbird' prefs
      _chai.assert.throws(function () {
        return (0, _preferences.getPrefs)('thunderbird');
      }, _errors.WebExtError, /Unsupported application: thunderbird/);
    });
  });

  (0, _mocha.describe)('coerceCLICustomPreference', function () {

    (0, _mocha.it)('converts a single --pref cli option from string to object', function () {
      var prefs = (0, _preferences.coerceCLICustomPreference)(['valid.preference=true']);
      _chai.assert.isObject(prefs);
      _chai.assert.equal(prefs['valid.preference'], true);
    });

    (0, _mocha.it)('converts array of --pref cli option values into object', function () {
      var prefs = (0, _preferences.coerceCLICustomPreference)(['valid.preference=true', 'valid.preference2=false']);
      _chai.assert.isObject(prefs);
      _chai.assert.equal(prefs['valid.preference'], true);
      _chai.assert.equal(prefs['valid.preference2'], false);
    });

    (0, _mocha.it)('converts boolean values', function () {
      var prefs = (0, _preferences.coerceCLICustomPreference)(['valid.preference=true']);
      _chai.assert.equal(prefs['valid.preference'], true);
    });

    (0, _mocha.it)('converts number values', function () {
      var prefs = (0, _preferences.coerceCLICustomPreference)(['valid.preference=455']);
      _chai.assert.equal(prefs['valid.preference'], 455);
    });

    (0, _mocha.it)('converts float values', function () {
      var prefs = (0, _preferences.coerceCLICustomPreference)(['valid.preference=4.55']);
      _chai.assert.equal(prefs['valid.preference'], '4.55');
    });

    (0, _mocha.it)('supports string values with "=" chars', function () {
      var prefs = (0, _preferences.coerceCLICustomPreference)(['valid.preference=value=withequals=chars']);
      _chai.assert.equal(prefs['valid.preference'], 'value=withequals=chars');
    });

    (0, _mocha.it)('does not allow certain default preferences to be customized', function () {
      var nonChangeablePrefs = _preferences.nonOverridablePreferences.map(function (prop) {
        return prop += '=true';
      });
      var prefs = (0, _preferences.coerceCLICustomPreference)(nonChangeablePrefs);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nonChangeablePrefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pref = _step.value;

          _chai.assert.isUndefined(prefs[pref], pref + ' should be undefined');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    (0, _mocha.it)('throws an error for invalid or incomplete preferences', function () {
      _chai.assert.throws(function () {
        return (0, _preferences.coerceCLICustomPreference)(['test.invalid.prop']);
      }, _errors.UsageError, 'Incomplete custom preference: "test.invalid.prop". ' + 'Syntax expected: "prefname=prefvalue".');

      _chai.assert.throws(function () {
        return (0, _preferences.coerceCLICustomPreference)(['*&%£=true']);
      }, _errors.UsageError, 'Invalid custom preference name: *&%£');
    });
  });
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _errors = __webpack_require__(3);

var _remote = __webpack_require__(27);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('firefox.remote', function () {

  (0, _mocha.describe)('connect', function () {

    function prepareConnection() {
      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = (0, _extends3.default)({
        connectToFirefox: _sinon2.default.spy(function () {
          return Promise.resolve((0, _helpers.fakeFirefoxClient)());
        })
      }, options);
      var connect = (0, _remote.connect)(port, options);
      return { options: options, connect: connect };
    }

    (0, _mocha.it)('resolves with a RemoteFirefox instance', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var client;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return prepareConnection().connect;

            case 2:
              client = _context.sent;

              _chai.assert.instanceOf(client, _remote.RemoteFirefox);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));

    (0, _mocha.it)('connects on the default port', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _prepareConnection, connect, options;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _prepareConnection = prepareConnection(), connect = _prepareConnection.connect, options = _prepareConnection.options;
              _context2.next = 3;
              return connect;

            case 3:
              _sinon2.default.assert.calledWith(options.connectToFirefox, 6005);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    (0, _mocha.it)('lets you configure the port', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var _prepareConnection2, connect, options;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _prepareConnection2 = prepareConnection(7000), connect = _prepareConnection2.connect, options = _prepareConnection2.options;
              _context3.next = 3;
              return connect;

            case 3:
              _chai.assert.equal(options.connectToFirefox.args[0], 7000);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));
  });

  (0, _mocha.describe)('RemoteFirefox', function () {

    function fakeAddon() {
      return { id: 'some-id', actor: 'serv1.localhost' };
    }

    function makeInstance() {
      var client = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.fakeFirefoxClient)();

      return new _remote.RemoteFirefox(client);
    }

    (0, _mocha.it)('listens to client events', function () {
      var client = (0, _helpers.fakeFirefoxClient)();
      var listener = _sinon2.default.spy(function () {});
      client.client.on = listener;
      makeInstance(client); // this will register listeners
      // Make sure no errors are thrown when the client emits
      // events and calls each handler.
      listener.firstCall.args[1](); // disconnect
      listener.secondCall.args[1](); // end
      listener.thirdCall.args[1]({}); // message
    });

    (0, _mocha.describe)('disconnect', function () {
      (0, _mocha.it)('lets you disconnect', function () {
        var client = (0, _helpers.fakeFirefoxClient)();
        var conn = makeInstance(client);
        conn.disconnect();

        _sinon2.default.assert.called(client.disconnect);
      });
    });

    (0, _mocha.describe)('addonRequest', function () {

      (0, _mocha.it)('makes requests to an add-on actor', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var addon, stubResponse, client, conn, response;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                addon = fakeAddon();
                stubResponse = { requestTypes: ['reload'] };
                client = (0, _helpers.fakeFirefoxClient)({
                  makeRequestResult: stubResponse
                });
                conn = makeInstance(client);
                _context4.next = 6;
                return conn.addonRequest(addon, 'requestTypes');

              case 6:
                response = _context4.sent;


                _sinon2.default.assert.called(client.client.makeRequest);
                _sinon2.default.assert.calledWithMatch(client.client.makeRequest, { type: 'requestTypes', to: 'serv1.localhost' });

                _chai.assert.deepEqual(response, stubResponse);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      })));

      (0, _mocha.it)('throws when add-on actor requests fail', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var addon, client, conn;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                addon = fakeAddon();
                client = (0, _helpers.fakeFirefoxClient)({
                  makeRequestError: {
                    error: 'unknownError',
                    message: 'some actor failure'
                  }
                });
                conn = makeInstance(client);
                _context5.next = 5;
                return conn.addonRequest(addon, 'requestTypes').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
                  _chai.assert.equal(error.message, 'unknownError: some actor failure');
                }));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      })));
    });

    (0, _mocha.describe)('getInstalledAddon', function () {

      (0, _mocha.it)('gets an installed add-on by ID', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var someAddonId, client, conn, addon;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                someAddonId = 'some-id';
                client = (0, _helpers.fakeFirefoxClient)({
                  requestResult: {
                    addons: [{ id: 'another-id' }, { id: someAddonId }, { id: 'bazinga' }]
                  }
                });
                conn = makeInstance(client);
                _context6.next = 5;
                return conn.getInstalledAddon(someAddonId);

              case 5:
                addon = _context6.sent;

                _chai.assert.equal(addon.id, someAddonId);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      })));

      (0, _mocha.it)('throws an error when the add-on is not installed', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var client, conn;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                client = (0, _helpers.fakeFirefoxClient)({
                  requestResult: {
                    addons: [{ id: 'one-id' }, { id: 'other-id' }]
                  }
                });
                conn = makeInstance(client);
                _context7.next = 4;
                return conn.getInstalledAddon('missing-id').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
                  _chai.assert.match(error.message, /does not have your extension installed/);
                }));

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      })));

      (0, _mocha.it)('throws an error when listAddons() fails', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var client, conn;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                client = (0, _helpers.fakeFirefoxClient)({
                  requestError: new Error('some internal error')
                });
                conn = makeInstance(client);
                _context8.next = 4;
                return conn.getInstalledAddon('some-id').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
                  _chai.assert.equal(error.message, 'Remote Firefox: listAddons() error: Error: some internal error');
                }));

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      })));
    });

    (0, _mocha.describe)('checkForAddonReloading', function () {

      (0, _mocha.it)('checks for reload requestType in remote debugger', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var addon, stubResponse, conn, returnedAddon, args;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                addon = fakeAddon();
                stubResponse = { requestTypes: ['reload'] };
                conn = makeInstance();


                conn.addonRequest = _sinon2.default.spy(function () {
                  return Promise.resolve(stubResponse);
                });

                _context9.next = 6;
                return conn.checkForAddonReloading(addon);

              case 6:
                returnedAddon = _context9.sent;

                _sinon2.default.assert.called(conn.addonRequest);
                args = conn.addonRequest.firstCall.args;


                _chai.assert.equal(args[0].id, addon.id);
                _chai.assert.equal(args[1], 'requestTypes');

                _chai.assert.deepEqual(returnedAddon, addon);

              case 12:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      })));

      (0, _mocha.it)('throws an error if reload is not supported', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var addon, stubResponse, conn;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                addon = fakeAddon();
                stubResponse = { requestTypes: ['install'] };
                conn = makeInstance();


                conn.addonRequest = function () {
                  return Promise.resolve(stubResponse);
                };

                _context10.next = 6;
                return conn.checkForAddonReloading(addon).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
                  _chai.assert.match(error.message, /does not support add-on reloading/);
                }));

              case 6:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, undefined);
      })));

      (0, _mocha.it)('only checks for reloading once', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        var addon, conn, checkedAddon, finalAddon;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                addon = fakeAddon();
                conn = makeInstance();


                conn.addonRequest = _sinon2.default.spy(function () {
                  return Promise.resolve({ requestTypes: ['reload'] });
                });
                _context11.next = 5;
                return conn.checkForAddonReloading(addon);

              case 5:
                checkedAddon = _context11.sent;
                _context11.next = 8;
                return conn.checkForAddonReloading(checkedAddon);

              case 8:
                finalAddon = _context11.sent;

                // This should remember not to check a second time.
                _sinon2.default.assert.calledOnce(conn.addonRequest);
                _chai.assert.deepEqual(finalAddon, addon);

              case 11:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      })));
    });

    (0, _mocha.describe)('installTemporaryAddon', function () {

      (0, _mocha.it)('throws listTabs errors', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
        var client, conn;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                client = (0, _helpers.fakeFirefoxClient)({
                  // listTabs response:
                  requestError: new Error('some listTabs error')
                });
                conn = makeInstance(client);
                _context12.next = 4;
                return conn.installTemporaryAddon('/path/to/addon').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
                  _chai.assert.match(error.message, /some listTabs error/);
                }));

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, undefined);
      })));

      (0, _mocha.it)('fails when there is no add-ons actor', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
        var client, conn;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                client = (0, _helpers.fakeFirefoxClient)({
                  // A listTabs response that does not contain addonsActor.
                  requestResult: {}
                });
                conn = makeInstance(client);
                _context13.next = 4;
                return conn.installTemporaryAddon('/path/to/addon').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.RemoteTempInstallNotSupported, function (error) {
                  _chai.assert.match(error.message, /does not provide an add-ons actor/);
                }));

              case 4:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, undefined);
      })));

      (0, _mocha.it)('lets you install an add-on temporarily', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
        var client, conn, response;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                client = (0, _helpers.fakeFirefoxClient)({
                  // listTabs response:
                  requestResult: {
                    addonsActor: 'addons1.actor.conn'
                  },
                  // installTemporaryAddon response:
                  makeRequestResult: {
                    addon: { id: 'abc123@temporary-addon' }
                  }
                });
                conn = makeInstance(client);
                _context14.next = 4;
                return conn.installTemporaryAddon('/path/to/addon');

              case 4:
                response = _context14.sent;

                _chai.assert.equal(response.addon.id, 'abc123@temporary-addon');

              case 6:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, undefined);
      })));

      (0, _mocha.it)('throws install errors', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
        var client, conn;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                client = (0, _helpers.fakeFirefoxClient)({
                  // listTabs response:
                  requestResult: {
                    addonsActor: 'addons1.actor.conn'
                  },
                  // installTemporaryAddon response:
                  makeRequestError: {
                    error: 'install error',
                    message: 'error message'
                  }
                });
                conn = makeInstance(client);
                _context15.next = 4;
                return conn.installTemporaryAddon('/path/to/addon').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
                  _chai.assert.match(error.message, /install error: error message/);
                }));

              case 4:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, undefined);
      })));
    });

    (0, _mocha.describe)('reloadAddon', function () {

      (0, _mocha.it)('asks the actor to reload the add-on', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
        var addon, conn, requestArgs;
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                addon = fakeAddon();
                conn = makeInstance();


                conn.getInstalledAddon = _sinon2.default.spy(function () {
                  return Promise.resolve(addon);
                });
                conn.checkForAddonReloading = function (addonToCheck) {
                  return Promise.resolve(addonToCheck);
                };
                conn.addonRequest = _sinon2.default.spy(function () {
                  return Promise.resolve({});
                });

                _context16.next = 7;
                return conn.reloadAddon('some-id');

              case 7:
                _sinon2.default.assert.called(conn.getInstalledAddon);
                _sinon2.default.assert.calledWith(conn.getInstalledAddon, 'some-id');
                _sinon2.default.assert.called(conn.addonRequest);

                requestArgs = conn.addonRequest.firstCall.args;

                _chai.assert.deepEqual(requestArgs[0], addon);
                _chai.assert.equal(requestArgs[1], 'reload');

              case 13:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, undefined);
      })));

      (0, _mocha.it)('makes sure the addon can be reloaded', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
        var addon, conn;
        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                addon = fakeAddon();
                conn = makeInstance();


                conn.getInstalledAddon = function () {
                  return Promise.resolve(addon);
                };
                conn.checkForAddonReloading = _sinon2.default.spy(function (addonToCheck) {
                  return Promise.resolve(addonToCheck);
                });

                _context17.next = 6;
                return conn.reloadAddon(addon.id);

              case 6:

                _sinon2.default.assert.called(conn.checkForAddonReloading);
                _chai.assert.deepEqual(conn.checkForAddonReloading.firstCall.args[0], addon);

              case 8:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, undefined);
      })));
    });
  });

  (0, _mocha.describe)('connectWithMaxRetries', function () {

    function firefoxClient() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var deps = arguments[1];

      return (0, _remote.connectWithMaxRetries)((0, _extends3.default)({
        maxRetries: 0, retryInterval: 1, port: 6005 }, opt), deps);
    }

    (0, _mocha.it)('retries after a connection error', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
      var client, tryCount, connectToFirefox;
      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              client = new _remote.RemoteFirefox((0, _helpers.fakeFirefoxClient)());
              tryCount = 0;
              connectToFirefox = _sinon2.default.spy(function () {
                return new Promise(function (resolve, reject) {
                  tryCount++;
                  if (tryCount === 1) {
                    reject(new _helpers.TCPConnectError('first connection fails'));
                  } else {
                    // The second connection succeeds.
                    resolve(client);
                  }
                });
              });
              _context18.next = 5;
              return firefoxClient({ maxRetries: 3 }, { connectToFirefox: connectToFirefox });

            case 5:
              _sinon2.default.assert.calledTwice(connectToFirefox);

            case 6:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, undefined);
    })));

    (0, _mocha.it)('only retries connection errors', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
      var connectToFirefox;
      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              connectToFirefox = _sinon2.default.spy(function () {
                return Promise.reject(new Error('not a connection error'));
              });
              _context19.next = 3;
              return firefoxClient({ maxRetries: 2 }, { connectToFirefox: connectToFirefox }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
                _sinon2.default.assert.calledOnce(connectToFirefox);
                _chai.assert.equal(error.message, 'not a connection error');
              });

            case 3:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, undefined);
    })));

    (0, _mocha.it)('gives up connecting after too many retries', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
      var connectToFirefox;
      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              connectToFirefox = _sinon2.default.spy(function () {
                return Promise.reject(new _helpers.TCPConnectError('failure'));
              });
              _context20.next = 3;
              return firefoxClient({ maxRetries: 2 }, { connectToFirefox: connectToFirefox }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
                _sinon2.default.assert.calledThrice(connectToFirefox);
                _chai.assert.equal(error.message, 'failure');
              });

            case 3:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined);
    })));
  });
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var testSpawnADBUsageError = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
    var testFn = _ref3.testFn,
        adbClient = _ref3.adbClient,
        adbkitUtil = _ref3.adbkitUtil;
    var adb, adbUtils, promise;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            adb = getFakeADBKit({ adbClient: adbClient, adbkitUtil: adbkitUtil });
            adbUtils = new _adb2.default({ adb: adb });
            promise = testFn(adbUtils);
            _context.next = 5;
            return assert.isRejected(promise, _errors.UsageError);

          case 5:
            _context.next = 7;
            return assert.isRejected(promise, /No adb executable has been found/);

          case 7:
            return _context.abrupt('return', adb);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function testSpawnADBUsageError(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _events = __webpack_require__(41);

var _events2 = _interopRequireDefault(_events);

var _chai = __webpack_require__(5);

var _chai2 = _interopRequireDefault(_chai);

var _mocha = __webpack_require__(4);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _errors = __webpack_require__(3);

var _adb = __webpack_require__(114);

var _adb2 = _interopRequireDefault(_adb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeADBPackageList = '\npackage:org.mozilla.fennec\npackage:org.mozilla.firefox\npackage:com.some.firefox.fork\npackage:com.some.firefox.fork2\npackage:org.some.other.software\n';

// NOTE: fake /proc/net/unix output format based on the output collected from
// an android system.
var fakeSocketFilePrefix = '00000000: 00000003 00000000 00000000 0001 03  1857';

var fakeRDPUnixSocketFile = '/data/data/org.mozilla.firefox/firefox-debugger-socket';

var fakeUnixSocketFiles = '\n' + fakeSocketFilePrefix + ' /dev/socket/mdns\n' + fakeSocketFilePrefix + '  ' + fakeRDPUnixSocketFile + '\n';

// NOTE: fake 'pm dump <APK>' output related to the granted permissions for an
// android application.
var fakeAndroidGrantedPermissions = '\nandroid.permission.READ_EXTERNAL_STORAGE: granted=true\nandroid.permission.WRITE_EXTERNAL_STORAGE: granted=true\n';

var assert = _chai2.default.assert;


function getFakeADBKit(_ref) {
  var _ref$adbClient = _ref.adbClient,
      adbClient = _ref$adbClient === undefined ? {} : _ref$adbClient,
      _ref$adbkitUtil = _ref.adbkitUtil,
      adbkitUtil = _ref$adbkitUtil === undefined ? {} : _ref$adbkitUtil;

  var fakeTransfer = new _events2.default();
  var adbUtilReadAllStub = _sinon2.default.stub();

  adbUtilReadAllStub.onCall(0).returns(Promise.resolve(new Buffer('')));

  var fakeADBClient = (0, _extends3.default)({
    listDevices: _sinon2.default.spy(function () {
      return [];
    }),
    shell: _sinon2.default.spy(function () {
      return Promise.resolve('');
    }),
    startActivity: _sinon2.default.spy(function () {}),
    forward: _sinon2.default.spy(function () {}),
    push: _sinon2.default.spy(function () {
      var originalOn = fakeTransfer.on.bind(fakeTransfer);
      // $FLOW_IGNORE: ignore flow errors on this testing hack
      fakeTransfer.on = function (event, cb) {
        originalOn(event, cb);
        fakeTransfer.emit('end');
      };
      return Promise.resolve(fakeTransfer);
    })
  }, adbClient);

  return {
    fakeADBClient: fakeADBClient,
    fakeTransfer: fakeTransfer,
    createClient: _sinon2.default.spy(function () {
      return fakeADBClient;
    }),
    util: (0, _extends3.default)({
      readAll: adbUtilReadAllStub
    }, adbkitUtil)
  };
}

function createSpawnADBErrorSpy() {
  return _sinon2.default.spy(function () {
    var fakeADBError = new Error('spawn adb');
    // $FLOW_FIXME: reuse ErrorWithCode from other tests
    fakeADBError.code = 'ENOENT';
    return Promise.reject(fakeADBError);
  });
}

(0, _mocha.describe)('utils/adb', function () {
  (0, _mocha.describe)('discoverDevices', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var adb;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  listDevices: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.discoverDevices();
                }
              });

            case 2:
              adb = _context2.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.listDevices);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    (0, _mocha.it)('resolves the array of the android device ids', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var adb, adbUtils, promise, devices;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  listDevices: _sinon2.default.spy(function () {
                    return [{ id: 'emulator1' }, { id: 'device2' }];
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.discoverDevices();
              _context3.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              devices = _context3.sent;

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.listDevices);
              assert.deepEqual(devices, ['emulator1', 'device2']);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));
  });

  (0, _mocha.describe)('runShellCommand', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var adb;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.runShellCommand('device1', 'test -d /some/dir && echo 1');
                }
              });

            case 2:
              adb = _context4.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', 'test -d /some/dir && echo 1');

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    (0, _mocha.it)('rejects on any unexpected exception', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    throw new Error('Unexpected error');
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.runShellCommand('device1', 'test -d /some/dir && echo 1');
              _context5.next = 5;
              return assert.isRejected(promise, /Unexpected error/);

            case 5:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', 'test -d /some/dir && echo 1');

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    (0, _mocha.it)('resolves the shell command output as a string', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var adb, adbUtils, promise, result;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('fake_data_result'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.runShellCommand('device1', 'echo fake_data_result');
              _context6.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              result = _context6.sent;

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledOnce(adb.util.readAll);
              assert.equal(result, 'fake_data_result');

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));
  });

  (0, _mocha.describe)('discoverInstalledFirefoxAPKs', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var adb;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.discoverInstalledFirefoxAPKs('device1');
                }
              });

            case 2:
              adb = _context7.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['pm', 'list', 'packages']);

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));

    (0, _mocha.it)('resolves the array of the installed firefox APKs', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
      var adb, adbUtils, promise, packages;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer(fakeADBPackageList));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.discoverInstalledFirefoxAPKs('device1');
              _context8.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              packages = _context8.sent;

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledOnce(adb.util.readAll);
              assert.deepEqual(packages, ['org.mozilla.fennec', 'org.mozilla.firefox']);

            case 9:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    (0, _mocha.it)('resolves the given firefox APK with exact package name', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
      var adb, adbUtils, promise, packages;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(Buffer.from(fakeADBPackageList));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.discoverInstalledFirefoxAPKs('device1', 'com.some.firefox.fork');
              _context9.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              packages = _context9.sent;

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledOnce(adb.util.readAll);
              assert.deepEqual(packages, ['com.some.firefox.fork']);

            case 9:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });

  (0, _mocha.describe)('getAndroidVersionNumber', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
      var adb;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.getAndroidVersionNumber('device1');
                }
              });

            case 2:
              adb = _context10.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['getprop', 'ro.build.version.sdk']);

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    })));

    (0, _mocha.it)('rejects a WebExtError when unable to return a number', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('UnexpectedNaN'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.getAndroidVersionNumber('device1');
              _context11.next = 5;
              return assert.isRejected(promise, _errors.WebExtError);

            case 5:
              _context11.next = 7;
              return assert.isRejected(promise, 'Unable to discovery android version on device1: UnexpectedNaN');

            case 7:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['getprop', 'ro.build.version.sdk']);

            case 9:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    })));

    (0, _mocha.it)('resolves the android version number', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
      var adb, adbUtils, promise, versionNumber;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('21'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.getAndroidVersionNumber('device1');
              _context12.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              versionNumber = _context12.sent;

              assert.equal(versionNumber, 21);

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['getprop', 'ro.build.version.sdk']);

            case 9:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    })));
  });

  (0, _mocha.describe)('ensureRequiredAPKRuntimePermissions', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
      var adb;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.ensureRequiredAPKRuntimePermissions('device1', 'org.mozilla.firefox', ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);
                }
              });

            case 2:
              adb = _context13.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['pm', 'dump', 'org.mozilla.firefox']);

            case 5:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined);
    })));

    (0, _mocha.it)('rejects an UsageError when a required permission has not been granted', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
      var adb, adbUtils, permissions, promise;
      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(
                    // No granted permissions in the output.
                    new Buffer(''));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              permissions = ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE'];
              promise = adbUtils.ensureRequiredAPKRuntimePermissions('device1', 'org.mozilla.firefox', permissions);
              _context14.next = 6;
              return assert.isRejected(promise, _errors.UsageError);

            case 6:
              _context14.next = 8;
              return assert.isRejected(promise, new RegExp('Required ' + permissions[0] + ' has not be granted'));

            case 8:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['pm', 'dump', 'org.mozilla.firefox']);

            case 10:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined);
    })));

    (0, _mocha.it)('does not reject when all the required permissions have been granted', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer(fakeAndroidGrantedPermissions));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.ensureRequiredAPKRuntimePermissions('device1', 'org.mozilla.firefox', ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);
              _context15.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['pm', 'dump', 'org.mozilla.firefox']);

            case 7:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, undefined);
    })));
  });

  (0, _mocha.describe)('amForceStopAPK', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
      var adb;
      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.amForceStopAPK('device1', 'org.mozilla.firefox');
                }
              });

            case 2:
              adb = _context16.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['am', 'force-stop', 'org.mozilla.firefox']);

            case 5:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, undefined);
    })));

    (0, _mocha.it)('does not reject when "am force-stop" has been called successfully', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.amForceStopAPK('device1', 'org.mozilla.firefox');
              _context17.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWith(adb.fakeADBClient.shell, 'device1', ['am', 'force-stop', 'org.mozilla.firefox']);

            case 7:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, undefined);
    })));
  });

  (0, _mocha.describe)('getOrCreateArtifactsDir', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
      var adb;
      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.getOrCreateArtifactsDir('device1');
                }
              });

            case 2:
              adb = _context18.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', /test -d (.*) ; echo \$\?/);

            case 5:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, undefined);
    })));

    (0, _mocha.it)('rejects a WebExtError if the artifact dir path exists', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('0\n'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.getOrCreateArtifactsDir('device1');
              _context19.next = 5;
              return assert.isRejected(promise, _errors.WebExtError);

            case 5:
              _context19.next = 7;
              return assert.isRejected(promise, /Cannot create artifacts directory (.*) because it exists on (.*)/);

            case 7:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', /test -d (.*) ; echo \$\?/);

            case 9:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, undefined);
    })));

    (0, _mocha.it)('resolves to the android artifacts dir path', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
      var adb, adbUtils, promise, result;
      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('1\n'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.getOrCreateArtifactsDir('device1');
              _context20.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              result = _context20.sent;


              assert.match(result, /^\/sdcard\/web-ext-artifacts-/);

              _sinon2.default.assert.calledTwice(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', 'test -d ' + result + ' ; echo $?');
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', ['mkdir', '-p', result]);

            case 10:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined);
    })));

    (0, _mocha.it)('does not create a new artifact dir if it has been already created', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
      var adb, adbUtils, fakeArtifactsDir, promise, result;
      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('1\n'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });

              // Add an artifact dir to the adbUtils internal map.

              fakeArtifactsDir = '/sdcard/web-ext-artifacts-already-created';

              adbUtils.artifactsDirMap.set('device1', fakeArtifactsDir);

              promise = adbUtils.getOrCreateArtifactsDir('device1');
              _context21.next = 7;
              return assert.isFulfilled(promise);

            case 7:
              result = _context21.sent;

              assert.equal(result, fakeArtifactsDir);

              _sinon2.default.assert.notCalled(adb.fakeADBClient.shell);

            case 10:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, undefined);
    })));
  });

  (0, _mocha.describe)('clearArtifactsDir', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22() {
      var adb;
      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  adbUtils.artifactsDirMap.set('device1', '/sdcard/webext-artifacts-fake');
                  return adbUtils.clearArtifactsDir('device1');
                }
              });

            case 2:
              adb = _context22.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', ['rm', '-rf', '/sdcard/webext-artifacts-fake']);

            case 5:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, undefined);
    })));

    (0, _mocha.it)('removes the directory if it has been previously created', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('\n'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });


              adbUtils.artifactsDirMap.set('device1', '/sdcard/webext-artifacts-fake');
              promise = adbUtils.clearArtifactsDir('device1');
              _context23.next = 6;
              return assert.isFulfilled(promise);

            case 6:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', ['rm', '-rf', '/sdcard/webext-artifacts-fake']);

            case 8:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, undefined);
    })));

    (0, _mocha.it)('is a no-op if no artifacts dir has been previously created', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.clearArtifactsDir('device1');
              _context24.next = 5;
              return assert.isFulfilled(promise);

            case 5:

              _sinon2.default.assert.notCalled(adb.fakeADBClient.shell);

            case 6:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, undefined);
    })));
  });

  (0, _mocha.describe)('pushFile', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25() {
      var adb;
      return _regenerator2.default.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  push: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.pushFile('device1', '/fake/src', '/fake/dest');
                }
              });

            case 2:
              adb = _context25.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.push);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.push, 'device1', '/fake/src', '/fake/dest');

            case 5:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, undefined);
    })));

    (0, _mocha.it)('resolves when the file has been completely transfered', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26() {
      var fakeTransfer, fakeTransferPromise, adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              fakeTransfer = new _events2.default();
              fakeTransferPromise = Promise.resolve(fakeTransfer);
              adb = getFakeADBKit({
                adbClient: {
                  push: _sinon2.default.spy(function () {
                    return fakeTransferPromise;
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.pushFile('device1', '/fake/local/path', '/fake/remote/path');
              _context26.next = 7;
              return fakeTransferPromise;

            case 7:
              fakeTransfer.emit('end');

              _context26.next = 10;
              return assert.isFulfilled(promise);

            case 10:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.push);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.push, 'device1', '/fake/local/path', 'fake/remote/path');

            case 12:
            case 'end':
              return _context26.stop();
          }
        }
      }, _callee26, undefined);
    })));
  });

  (0, _mocha.describe)('startFirefoxAPK', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27() {
      var adb;
      return _regenerator2.default.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  startActivity: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.startFirefoxAPK('device1', 'org.mozilla.firefox_mybuild', '/fake/custom/profile/path');
                }
              });

            case 2:
              adb = _context27.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.startActivity);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.startActivity, 'device1', {
                action: 'android.activity.MAIN',
                component: 'org.mozilla.firefox_mybuild/.App',
                extras: [{
                  key: 'args',
                  value: '-profile /fake/custom/profile/path'
                }],
                wait: true
              });

            case 5:
            case 'end':
              return _context27.stop();
          }
        }
      }, _callee27, undefined);
    })));

    (0, _mocha.it)('starts the given Firefox APK on a custom profile', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  startActivity: _sinon2.default.spy(function () {
                    return Promise.resolve();
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer('\n'));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.startFirefoxAPK('device1', 'org.mozilla.firefox_mybuild', '/fake/custom/profile/path');
              _context28.next = 5;
              return assert.isFulfilled(promise);

            case 5:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.startActivity);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.startActivity, 'device1', {
                action: 'android.activity.MAIN',
                component: 'org.mozilla.firefox_mybuild/.App',
                extras: [{
                  key: 'args',
                  value: '-profile /fake/custom/profile/path'
                }],
                wait: true
              });

            case 7:
            case 'end':
              return _context28.stop();
          }
        }
      }, _callee28, undefined);
    })));
  });

  (0, _mocha.describe)('discoverRDPUnixSocket', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29() {
      var adb;
      return _regenerator2.default.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  shell: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.discoverRDPUnixSocket('device1', 'org.mozilla.firefox_mybuild');
                }
              });

            case 2:
              adb = _context29.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', ['cat', '/proc/net/unix']);

            case 5:
            case 'end':
              return _context29.stop();
          }
        }
      }, _callee29, undefined);
    })));

    (0, _mocha.it)('rejects an UsageError on setUserAbortDiscovery call', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer(''));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.discoverRDPUnixSocket('device1', 'org.mozilla.firefox_mybuild');


              adbUtils.setUserAbortDiscovery(true);

              _context30.next = 6;
              return assert.isRejected(promise, _errors.UsageError);

            case 6:
              _context30.next = 8;
              return assert.isRejected(promise, 'Exiting Firefox Remote Debugging socket discovery on user request');

            case 8:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', ['cat', '/proc/net/unix']);

            case 10:
            case 'end':
              return _context30.stop();
          }
        }
      }, _callee30, undefined);
    })));

    (0, _mocha.it)('rejects a WebExtError on timeouts', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee31() {
      var adb, adbUtils, maxDiscoveryTime, retryInterval, promise;
      return _regenerator2.default.wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve('');
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    return Promise.resolve(new Buffer(''));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              maxDiscoveryTime = 50;
              retryInterval = 10;
              promise = adbUtils.discoverRDPUnixSocket('device1', 'org.mozilla.firefox_mybuild', {
                maxDiscoveryTime: maxDiscoveryTime,
                retryInterval: retryInterval
              });
              _context31.next = 7;
              return assert.isRejected(promise, _errors.WebExtError);

            case 7:
              _context31.next = 9;
              return assert.isRejected(promise, 'Timeout while waiting for the Android Firefox Debugger Socket');

            case 9:

              _sinon2.default.assert.called(adb.fakeADBClient.shell);
              _sinon2.default.assert.alwaysCalledWithMatch(adb.fakeADBClient.shell, 'device1', ['cat', '/proc/net/unix']);

            case 11:
            case 'end':
              return _context31.stop();
          }
        }
      }, _callee31, undefined);
    })));

    (0, _mocha.it)('rejects a WebExtError if more than one RDP socket have been found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee32() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve();
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    // Fake unexpected multiple RDP socket matches.
                    return Promise.resolve(new Buffer('' + fakeUnixSocketFiles + fakeUnixSocketFiles));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.discoverRDPUnixSocket('device1', 'org.mozilla.firefox');
              _context32.next = 5;
              return assert.isRejected(promise, _errors.WebExtError);

            case 5:
              _context32.next = 7;
              return assert.isRejected(promise, /Unexpected multiple RDP sockets/);

            case 7:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.shell);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.shell, 'device1', ['cat', '/proc/net/unix']);

            case 9:
            case 'end':
              return _context32.stop();
          }
        }
      }, _callee32, undefined);
    })));

    (0, _mocha.it)('resolves the android RDP unix socket path', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee33() {
      var adb, adbUtils, promise, result;
      return _regenerator2.default.wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve();
                  })
                },
                adbkitUtil: {
                  readAll: _sinon2.default.spy(function () {
                    // Fake unexpected multiple RDP socket matches.
                    return Promise.resolve(new Buffer(fakeUnixSocketFiles));
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.discoverRDPUnixSocket('device1', 'org.mozilla.firefox');
              _context33.next = 5;
              return assert.isFulfilled(promise);

            case 5:
              result = _context33.sent;


              assert.equal(result, fakeRDPUnixSocketFile);

            case 7:
            case 'end':
              return _context33.stop();
          }
        }
      }, _callee33, undefined);
    })));
  });

  (0, _mocha.describe)('setupForward', function () {
    (0, _mocha.it)('rejects an UsageError on adb binary not found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee34() {
      var adb;
      return _regenerator2.default.wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return testSpawnADBUsageError({
                adbClient: {
                  forward: createSpawnADBErrorSpy()
                },
                testFn: function testFn(adbUtils) {
                  return adbUtils.setupForward('device1', 'remote:fake', 'local:fake');
                }
              });

            case 2:
              adb = _context34.sent;


              _sinon2.default.assert.calledOnce(adb.fakeADBClient.forward);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.forward, 'device1', 'local:fake', 'remote:fake');

            case 5:
            case 'end':
              return _context34.stop();
          }
        }
      }, _callee34, undefined);
    })));

    (0, _mocha.it)('configures an adb forwarding for a given device', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee35() {
      var adb, adbUtils, promise;
      return _regenerator2.default.wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              adb = getFakeADBKit({
                adbClient: {
                  shell: _sinon2.default.spy(function () {
                    return Promise.resolve();
                  })
                }
              });
              adbUtils = new _adb2.default({ adb: adb });
              promise = adbUtils.setupForward('device1', 'remote:fake', 'local:fake');
              _context35.next = 5;
              return assert.isFulfilled(promise);

            case 5:

              _sinon2.default.assert.calledOnce(adb.fakeADBClient.forward);
              _sinon2.default.assert.calledWithMatch(adb.fakeADBClient.forward, 'device1', 'local:fake', 'remote:fake');

            case 7:
            case 'end':
              return _context35.stop();
          }
        }
      }, _callee35, undefined);
    })));
  });
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _mz = __webpack_require__(9);

var _errors = __webpack_require__(3);

var _tempDir = __webpack_require__(16);

var _artifacts = __webpack_require__(79);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('prepareArtifactsDir', function () {

  (0, _mocha.it)('creates an artifacts dir if needed', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var artifactsDir = _path2.default.join(tmpDir.path(), 'build');
      return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then(function () {
        // This should not throw an error if created properly.
        return _mz.fs.stat(artifactsDir);
      });
    });
  });

  (0, _mocha.it)('ignores existing artifacts dir', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _artifacts.prepareArtifactsDir)(tmpDir.path()).then(function () {
        // Make sure everything is still cool with this path.
        return _mz.fs.stat(tmpDir.path());
      });
    });
  });

  (0, _mocha.it)('ensures the path is really a directory', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var someFile = _path2.default.join(tmpDir.path(), 'some-file.txt');
      return _mz.fs.writeFile(someFile, 'some content').then(function () {
        return (0, _artifacts.prepareArtifactsDir)(someFile);
      }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
        _chai.assert.match(error.message, /not a directory/);
      }));
    });
  });

  (0, _mocha.it)('resolves with the artifacts dir', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var artifactsDir = _path2.default.join(tmpDir.path(), 'artifacts');
      return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then(function (resolvedDir) {
        _chai.assert.equal(resolvedDir, artifactsDir);
      });
    });
  });

  (0, _mocha.it)('throws an UsageError when it lacks permissions to stat the directory', function () {
    var _this = this;

    return (0, _tempDir.withTempDir)(function (tmpDir) {
      if (process.platform === 'win32') {
        _this.skip();
        return;
      }
      var tmpPath = _path2.default.join(tmpDir.path(), 'build');
      return _mz.fs.mkdir(tmpPath, '0622').then(function () {
        var artifactsDir = _path2.default.join(tmpPath, 'artifacts');
        return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
          _chai.assert.match(error.message, /Cannot access.*lacks permissions/);
        }));
      });
    });
  });

  (0, _mocha.it)('throws error when directory exists but lacks writing permissions', function () {
    var _this2 = this;

    return (0, _tempDir.withTempDir)(function (tmpDir) {
      if (process.platform === 'win32') {
        _this2.skip();
        return;
      }
      var artifactsDir = _path2.default.join(tmpDir.path(), 'dir-nowrite');
      return _mz.fs.mkdir(artifactsDir, '0555').then(function () {
        return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
          _chai.assert.match(error.message, /exists.*lacks permissions/);
        }));
      });
    });
  });

  (0, _mocha.it)('throws error when creating a folder if lacks writing permissions', function () {
    var _this3 = this;

    return (0, _tempDir.withTempDir)(function (tmpDir) {
      if (process.platform === 'win32') {
        _this3.skip();
        return;
      }
      var parentDir = _path2.default.join(tmpDir.path(), 'dir-nowrite');
      var artifactsDir = _path2.default.join(parentDir, 'artifacts');
      return _mz.fs.mkdir(parentDir, '0555').then(function () {
        return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
          _chai.assert.match(error.message, /Cannot create.*lacks permissions/);
        }));
      });
    });
  });

  (0, _mocha.it)('creates the artifacts dir successfully if the parent dir does not exist', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var tmpPath = _path2.default.join(tmpDir.path(), 'build', 'subdir');
      return (0, _artifacts.prepareArtifactsDir)(tmpPath).then(function (resolvedDir) {
        _chai.assert.equal(resolvedDir, tmpPath);
      });
    });
  });

  (0, _mocha.it)('throws error when creating a folder if there is not enough space', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var fakeAsyncMkdirp = _sinon2.default.spy(function () {
        return Promise.reject(new _helpers.ErrorWithCode('ENOSPC', 'an error'));
      });
      var tmpPath = _path2.default.join(tmpDir.path(), 'build', 'subdir');
      return (0, _artifacts.prepareArtifactsDir)(tmpPath, { asyncMkdirp: fakeAsyncMkdirp }).then((0, _helpers.makeSureItFails)(), function (error) {
        _sinon2.default.assert.called(fakeAsyncMkdirp);
        _chai.assert.equal(error.message, 'ENOSPC: an error');
      });
    });
  });
});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

var _mocha = __webpack_require__(4);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _desktopNotifier = __webpack_require__(58);

var _logger = __webpack_require__(0);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('util/desktop-notifier', function () {
  (0, _mocha.describe)('desktopNotifications()', function () {
    var expectedNotification = {
      title: 'web-ext run: title',
      message: 'message'
    };

    (0, _mocha.it)('is called and creates a message with correct parameters', function () {
      var fakeNotifier = {
        notify: _sinon2.default.spy(function (options, callback) {
          return callback();
        })
      };
      return (0, _desktopNotifier.showDesktopNotification)(expectedNotification, {
        notifier: fakeNotifier
      }).then(function () {
        _sinon2.default.assert.calledWithMatch(fakeNotifier.notify, {
          title: 'web-ext run: title',
          message: 'message'
        });
      });
    });

    (0, _mocha.it)('logs error when notifier fails', function () {
      var expectedError = new Error('an error');
      var fakeLog = (0, _logger.createLogger)(__filename);
      _sinon2.default.spy(fakeLog, 'debug');
      var fakeNotifier = {
        notify: function notify(obj, callback) {
          callback(expectedError, 'response');
        }
      };

      return (0, _desktopNotifier.showDesktopNotification)(expectedNotification, {
        notifier: fakeNotifier,
        log: fakeLog
      }).then((0, _helpers.makeSureItFails)()).catch(function () {
        _sinon2.default.assert.calledWith(fakeLog.debug, 'Desktop notifier error: ' + expectedError.message + ', ' + 'response: response');
      });
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/test-util/test.desktop-notifier.js"))

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _chai = __webpack_require__(5);

var _mocha = __webpack_require__(4);

var _mz = __webpack_require__(9);

var _fileExists = __webpack_require__(116);

var _fileExists2 = _interopRequireDefault(_fileExists);

var _tempDir = __webpack_require__(16);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('util/file-exists', function () {
  (0, _mocha.it)('returns true for existing files', function () {
    return (0, _tempDir.withTempDir)(function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tmpDir) {
        var someFile;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                someFile = _path2.default.join(tmpDir.path(), 'file.txt');
                _context.next = 3;
                return _mz.fs.writeFile(someFile, '');

              case 3:
                _context.t0 = _chai.assert;
                _context.next = 6;
                return (0, _fileExists2.default)(someFile);

              case 6:
                _context.t1 = _context.sent;

                _context.t0.equal.call(_context.t0, _context.t1, true);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });

  (0, _mocha.it)('returns false for non-existent files', function () {
    return (0, _tempDir.withTempDir)(function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(tmpDir) {
        var someFile;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // This file does not exist.
                someFile = _path2.default.join(tmpDir.path(), 'file.txt');
                _context2.t0 = _chai.assert;
                _context2.next = 4;
                return (0, _fileExists2.default)(someFile);

              case 4:
                _context2.t1 = _context2.sent;

                _context2.t0.equal.call(_context2.t0, _context2.t1, false);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });

  (0, _mocha.it)('returns false for directories', function () {
    return (0, _tempDir.withTempDir)(function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(tmpDir) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = _chai.assert;
                _context3.next = 3;
                return (0, _fileExists2.default)(tmpDir.path());

              case 3:
                _context3.t1 = _context3.sent;

                _context3.t0.equal.call(_context3.t0, _context3.t1, false);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
  });

  (0, _mocha.it)('returns false for unreadable files', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var exists;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _fileExists2.default)('pretend/unreadable/file', {
              fileIsReadable: function () {
                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          throw new _helpers.ErrorWithCode('EACCES', 'permission denied');

                        case 1:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, undefined);
                }));

                return function fileIsReadable() {
                  return _ref5.apply(this, arguments);
                };
              }()
            });

          case 2:
            exists = _context5.sent;

            _chai.assert.equal(exists, false);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  (0, _mocha.it)('throws unexpected errors', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var exists;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            exists = (0, _fileExists2.default)('pretend/file', {
              fileIsReadable: function () {
                var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                  return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          throw new _helpers.ErrorWithCode('EBUSY', 'device is busy');

                        case 1:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  }, _callee6, undefined);
                }));

                return function fileIsReadable() {
                  return _ref7.apply(this, arguments);
                };
              }()
            });
            _context7.next = 3;
            return exists.then((0, _helpers.makeSureItFails)(), function (error) {
              _chai.assert.equal(error.message, 'EBUSY: device is busy');
            });

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _fileFilter = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('util/file-filter', function () {

  var newFileFilter = function newFileFilter() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new _fileFilter.FileFilter((0, _extends3.default)({
      sourceDir: '.'
    }, params));
  };

  (0, _mocha.describe)('default', function () {
    var defaultFilter = newFileFilter();

    (0, _mocha.it)('ignores long XPI paths', function () {
      _chai.assert.equal(defaultFilter.wantFile('path/to/some.xpi'), false);
    });

    (0, _mocha.it)('ignores short XPI paths', function () {
      _chai.assert.equal(defaultFilter.wantFile('some.xpi'), false);
    });

    (0, _mocha.it)('ignores .git directories', function () {
      _chai.assert.equal(defaultFilter.wantFile('.git'), false);
    });

    (0, _mocha.it)('ignores nested .git directories', function () {
      _chai.assert.equal(defaultFilter.wantFile('path/to/.git'), false);
    });

    (0, _mocha.it)('ignores any hidden file', function () {
      _chai.assert.equal(defaultFilter.wantFile('.whatever'), false);
    });

    (0, _mocha.it)('ignores subdirectories within hidden folders', function () {
      _chai.assert.equal(defaultFilter.wantFile('.git/some/other/stuff'), false);
    });

    (0, _mocha.it)('ignores ZPI paths', function () {
      _chai.assert.equal(defaultFilter.wantFile('path/to/some.zip'), false);
    });

    (0, _mocha.it)('allows other files', function () {
      _chai.assert.equal(defaultFilter.wantFile('manifest.json'), true);
    });

    (0, _mocha.it)('ignores node_modules by default', function () {
      _chai.assert.equal(defaultFilter.wantFile('path/to/node_modules'), false);
    });

    (0, _mocha.it)('ignores module content within node_modules by default', function () {
      _chai.assert.equal(defaultFilter.wantFile('node_modules/something/file.js'), false);
    });
  });

  (0, _mocha.describe)('options', function () {

    (0, _mocha.it)('override the defaults with baseIgnoredPatterns', function () {
      var filter = newFileFilter({
        baseIgnoredPatterns: ['manifest.json']
      });
      _chai.assert.equal(filter.wantFile('some.xpi'), true);
      _chai.assert.equal(filter.wantFile('manifest.json'), false);
    });

    (0, _mocha.it)('add more files to ignore with ignoreFiles', function () {
      var filter = newFileFilter({
        ignoreFiles: ['*.log']
      });
      _chai.assert.equal(filter.wantFile('some.xpi'), false);
      _chai.assert.equal(filter.wantFile('some.log'), false);
    });

    (0, _mocha.it)('ignore artifactsDir and its content', function () {
      var filter = newFileFilter({
        artifactsDir: 'artifacts'
      });
      _chai.assert.equal(filter.wantFile('artifacts'), false);
      _chai.assert.equal(filter.wantFile('artifacts/some.js'), false);
    });

    (0, _mocha.it)('does not ignore an artifactsDir outside of sourceDir', function () {
      var filter = newFileFilter({
        artifactsDir: '.',
        sourceDir: 'dist'
      });
      _chai.assert.equal(filter.wantFile('file'), true);
      _chai.assert.equal(filter.wantFile('dist/file'), true);
    });

    (0, _mocha.it)('resolve relative path', function () {
      var filter = newFileFilter({
        sourceDir: '/src',
        artifactsDir: 'artifacts',
        ignoreFiles: ['ignore-dir/', 'some.js', '**/some.log', 'ignore/dir/content/**/*']
      });
      _chai.assert.equal(filter.wantFile('/src/artifacts'), true);
      _chai.assert.equal(filter.wantFile('/src/ignore-dir'), false);
      _chai.assert.equal(filter.wantFile('/src/ignore-dir/some.css'), true);
      _chai.assert.equal(filter.wantFile('/src/some.js'), false);
      _chai.assert.equal(filter.wantFile('/src/some.log'), false);
      _chai.assert.equal(filter.wantFile('/src/other/some.js'), true);
      _chai.assert.equal(filter.wantFile('/src/other/some.log'), false);
      _chai.assert.equal(filter.wantFile('/src/ignore/dir/content'), true);
      _chai.assert.equal(filter.wantFile('/src/ignore/dir/content/file.js'), false);
      // This file is not ignored because it's not relative to /src:
      _chai.assert.equal(filter.wantFile('/some.js'), true);
    });
  });

  (0, _mocha.describe)('isSubPath', function () {
    (0, _mocha.it)('test if target is a sub directory of src', function () {
      _chai.assert.equal((0, _fileFilter.isSubPath)('dist', '.'), false);
      _chai.assert.equal((0, _fileFilter.isSubPath)('.', 'artifacts'), true);
      _chai.assert.equal((0, _fileFilter.isSubPath)('.', '.'), false);
      _chai.assert.equal((0, _fileFilter.isSubPath)('/src/dist', '/src'), false);
      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src/artifacts'), true);
      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src'), false);
      _chai.assert.equal((0, _fileFilter.isSubPath)('/firstroot', '/secondroot'), false);
      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src/.dir'), true);
      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src/..dir'), true);
    });
  });

  (0, _mocha.describe)('negation', function () {
    var filter = newFileFilter({
      sourceDir: '/src',
      ignoreFiles: ['!node_modules/libdweb/src/**']
    });

    (0, _mocha.it)('ignore paths not captured by negation', function () {
      _chai.assert.equal(filter.wantFile('/src/node_modules/lib/foo.js'), false);
      _chai.assert.equal(filter.wantFile('/src/node_modules/lib'), false);
      _chai.assert.equal(filter.wantFile('/src/node_modules/what.js'), false);
      _chai.assert.equal(filter.wantFile('/src/node_modules/libdweb/what.js'), false);
      _chai.assert.equal(filter.wantFile('/src/node_modules/libdweb/src.js'), false);
      _chai.assert.equal(filter.wantFile('/src/node_modules/libdweb/src'), false);
    });

    (0, _mocha.it)('includes paths captured by negation', function () {
      _chai.assert.equal(filter.wantFile('/src/node_modules/libdweb/src/lib.js'), true);
      _chai.assert.equal(filter.wantFile('/src/node_modules/libdweb/src/sub/lib.js'), true);
      _chai.assert.equal(filter.wantFile('/src/node_modules/libdweb/src/node_modules/lib.js'), true);
    });
  });
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(9);

var _chai = __webpack_require__(5);

var _mocha = __webpack_require__(4);

var _isDirectory = __webpack_require__(108);

var _isDirectory2 = _interopRequireDefault(_isDirectory);

var _tempDir = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('util.isDirectory', function () {

  (0, _mocha.it)('resolves true for a directory', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _isDirectory2.default)(tmpDir.path()).then(function (dirExists) {
        _chai.assert.equal(dirExists, true);
      });
    });
  });

  (0, _mocha.it)('resolves false for non-existent paths', function () {
    return (0, _isDirectory2.default)('/dev/null/not-a-real-path-at-all').then(function (dirExists) {
      _chai.assert.equal(dirExists, false);
    });
  });

  (0, _mocha.it)('resolves false for non-directory paths', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var filePath = _path2.default.join(tmpDir.path(), 'some.txt');
      return _mz.fs.writeFile(filePath, 'some text').then(function () {
        return (0, _isDirectory2.default)(filePath);
      }).then(function (dirExists) {
        _chai.assert.equal(dirExists, false);
      });
    });
  });

  (0, _mocha.it)('resolves false for incomplete directory paths', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return (0, _isDirectory2.default)(_path2.default.join(tmpDir.path(), 'missing-leaf')).then(function (dirExists) {
        _chai.assert.equal(dirExists, false);
      });
    });
  });
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(49);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(52);

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _stream = __webpack_require__(115);

var _bunyan = __webpack_require__(103);

var _bunyan2 = _interopRequireDefault(_bunyan);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('logger', function () {

  (0, _mocha.describe)('createLogger', function () {

    (0, _mocha.it)('makes file names less redundant', function () {
      var createBunyanLog = _sinon2.default.spy(function () {});
      (0, _logger.createLogger)('src/some-file.js', { createBunyanLog: createBunyanLog });
      _sinon2.default.assert.calledWithMatch(createBunyanLog, { name: 'some-file.js' });
    });
  });

  (0, _mocha.describe)('ConsoleStream', function () {

    function packet(overrides) {
      return (0, _extends3.default)({
        name: 'some name',
        msg: 'some messge',
        level: _bunyan2.default.INFO
      }, overrides);
    }

    // NOTE: create a fake process that makes flow happy.
    function fakeProcess() {
      var FakeWritableStream = function (_WritableStream) {
        (0, _inherits3.default)(FakeWritableStream, _WritableStream);

        function FakeWritableStream() {
          (0, _classCallCheck3.default)(this, FakeWritableStream);
          return (0, _possibleConstructorReturn3.default)(this, (FakeWritableStream.__proto__ || Object.getPrototypeOf(FakeWritableStream)).apply(this, arguments));
        }

        (0, _createClass3.default)(FakeWritableStream, [{
          key: 'write',
          value: function write() {
            return true;
          }
        }]);
        return FakeWritableStream;
      }(_stream.Writable);

      var fakeWritableStream = new FakeWritableStream();
      _sinon2.default.spy(fakeWritableStream, 'write');

      return {
        stdout: fakeWritableStream
      };
    }

    (0, _mocha.it)('lets you turn on verbose logging', function () {
      var log = new _logger.ConsoleStream({ verbose: false });
      log.makeVerbose();
      _chai.assert.equal(log.verbose, true);
    });

    (0, _mocha.it)('logs names in verbose mode', function () {
      var log = new _logger.ConsoleStream({ verbose: true });
      _chai.assert.equal(log.format(packet({
        name: 'foo',
        msg: 'some message',
        level: _bunyan2.default.DEBUG
      })), '[foo][debug] some message\n');
    });

    (0, _mocha.it)('does not log names in non-verbose mode', function () {
      var log = new _logger.ConsoleStream({ verbose: false });
      _chai.assert.equal(log.format(packet({ name: 'foo', msg: 'some message' })), 'some message\n');
    });

    (0, _mocha.it)('does not log debug packets unless verbose', function () {
      var log = new _logger.ConsoleStream({ verbose: false });
      var localProcess = fakeProcess();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet({ level: _bunyan2.default.DEBUG }), { localProcess: localProcess });
      _sinon2.default.assert.notCalled(localProcess.stdout.write);
    });

    (0, _mocha.it)('does not log trace packets unless verbose', function () {
      var log = new _logger.ConsoleStream({ verbose: false });
      var localProcess = fakeProcess();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet({ level: _bunyan2.default.TRACE }), { localProcess: localProcess });
      _sinon2.default.assert.notCalled(localProcess.stdout.write);
    });

    (0, _mocha.it)('logs debug packets when verbose', function () {
      var log = new _logger.ConsoleStream({ verbose: true });
      var localProcess = fakeProcess();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet({ level: _bunyan2.default.DEBUG }), { localProcess: localProcess });
      _sinon2.default.assert.called(localProcess.stdout.write);
    });

    (0, _mocha.it)('logs trace packets when verbose', function () {
      var log = new _logger.ConsoleStream({ verbose: true });
      var localProcess = fakeProcess();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet({ level: _bunyan2.default.TRACE }), { localProcess: localProcess });
      _sinon2.default.assert.called(localProcess.stdout.write);
    });

    (0, _mocha.it)('logs info packets when verbose or not', function () {
      var log = new _logger.ConsoleStream({ verbose: false });
      var localProcess = fakeProcess();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet({ level: _bunyan2.default.INFO }), { localProcess: localProcess });
      log.makeVerbose();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet({ level: _bunyan2.default.INFO }), { localProcess: localProcess });
      _sinon2.default.assert.callCount(localProcess.stdout.write, 2);
    });

    (0, _mocha.it)('lets you capture logging', function () {
      var log = new _logger.ConsoleStream();
      var localProcess = fakeProcess();

      log.startCapturing();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet({ msg: 'message' }), { localProcess: localProcess });
      _sinon2.default.assert.notCalled(localProcess.stdout.write);
      // $FLOW_IGNORE: fake process for testing reasons.
      log.flushCapturedLogs({ localProcess: localProcess });
      _sinon2.default.assert.calledWith(localProcess.stdout.write, 'message\n');
    });

    (0, _mocha.it)('only flushes captured messages once', function () {
      var log = new _logger.ConsoleStream();
      var localProcess = fakeProcess();

      log.startCapturing();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet(), { localProcess: localProcess });
      // $FLOW_IGNORE: fake process for testing reasons.
      log.flushCapturedLogs({ localProcess: localProcess });

      // Make sure there is nothing more to flush.
      localProcess = fakeProcess();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.flushCapturedLogs({ localProcess: localProcess });
      _sinon2.default.assert.notCalled(localProcess.stdout.write);
    });

    (0, _mocha.it)('lets you start and stop capturing', function () {
      var log = new _logger.ConsoleStream();
      var localProcess = fakeProcess();

      log.startCapturing();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet(), { localProcess: localProcess });
      _sinon2.default.assert.notCalled(localProcess.stdout.write);

      log.stopCapturing();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.write(packet(), { localProcess: localProcess });
      _sinon2.default.assert.callCount(localProcess.stdout.write, 1);

      // Make sure that when we start capturing again,
      // the queue gets reset.
      log.startCapturing();
      log.write(packet());
      localProcess = fakeProcess();
      // $FLOW_IGNORE: fake process for testing reasons.
      log.flushCapturedLogs({ localProcess: localProcess });
      _sinon2.default.assert.callCount(localProcess.stdout.write, 1);
    });
  });
});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mocha = __webpack_require__(4);

var _mz = __webpack_require__(9);

var _chai = __webpack_require__(5);

var _tempDir = __webpack_require__(16);

var _helpers = __webpack_require__(10);

(0, _mocha.describe)('util.withTempDir', function () {

  (0, _mocha.it)('creates a temp directory', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      // Make sure the directory exists.
      return _mz.fs.stat(tmpDir.path());
    });
  });

  (0, _mocha.it)('destroys the directory on completion', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      return Promise.resolve(tmpDir.path());
    }).then(function (tmpPath) {
      return _mz.fs.stat(tmpPath);
    }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      _chai.assert.match(error.message, /ENOENT.* stat/);
    });
  });

  (0, _mocha.it)('destroys the directory on error', function () {
    var tmpPath;
    var tmpPathExisted = false;
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      tmpPath = tmpDir.path();
      return _mz.fs.stat(tmpPath).then(function () {
        tmpPathExisted = true;
        throw new Error('simulated error');
      });
    }).then((0, _helpers.makeSureItFails)()).catch(function () {
      _chai.assert.equal(tmpPathExisted, true);
      return _mz.fs.stat(tmpPath);
    }).catch(function (error) {
      _chai.assert.match(error.message, /ENOENT.* stat/);
    });
  });
});


(0, _mocha.describe)('util.TempDir', function () {

  (0, _mocha.it)('requires you to create the directory before accessing path()', function () {
    var tmp = new _tempDir.TempDir();
    _chai.assert.throws(function () {
      return tmp.path();
    }, /cannot access path.* before.* create/);
  });
});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mocha = __webpack_require__(4);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _updates = __webpack_require__(117);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('util/updates', function () {
  (0, _mocha.describe)('checkForUpdates()', function () {
    (0, _mocha.it)('calls the notifier with the correct parameters', function () {
      var updateNotifierStub = _sinon2.default.spy(function () {
        return {
          notify: _sinon2.default.spy()
        };
      });

      (0, _updates.checkForUpdates)({
        version: '1.0.0',
        updateNotifier: updateNotifierStub
      });

      _sinon2.default.assert.calledWithMatch(updateNotifierStub, {
        updateCheckInterval: 1000 * 60 * 60 * 24 * 3,
        pkg: { name: 'web-ext', version: '1.0.0' }
      });
    });
  });
});

/***/ }),
/* 229 */
/***/ (function(module, exports) {

module.exports = require("update-notifier");

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _chai = __webpack_require__(5);

var _mocha = __webpack_require__(4);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _mz = __webpack_require__(9);

var _program = __webpack_require__(60);

var _config = __webpack_require__(86);

var _tempDir = __webpack_require__(16);

var _errors = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeArgv(_ref) {
  var _ref$userCmd = _ref.userCmd,
      userCmd = _ref$userCmd === undefined ? ['fakecommand'] : _ref$userCmd,
      _ref$command = _ref.command,
      command = _ref$command === undefined ? 'fakecommand' : _ref$command,
      _ref$commandDesc = _ref.commandDesc,
      commandDesc = _ref$commandDesc === undefined ? 'this is a fake command' : _ref$commandDesc,
      _ref$commandExecutor = _ref.commandExecutor,
      commandExecutor = _ref$commandExecutor === undefined ? _sinon2.default.stub() : _ref$commandExecutor,
      commandOpt = _ref.commandOpt,
      globalOpt = _ref.globalOpt;

  var program = new _program.Program(userCmd);

  if (globalOpt) {
    program.setGlobalOptions(globalOpt);
  }
  if (commandOpt) {
    program.command(command, commandDesc, commandExecutor, commandOpt);
  }

  var argv = program.yargs.exitProcess(false).argv;
  return {
    argv: argv,
    argvFromCLI: argv,
    options: program.options
  };
}


var applyConf = function applyConf(params) {
  return (0, _config.applyConfigToArgv)((0, _extends3.default)({
    configFileName: 'some/path/to/config.js'
  }, params));
};

(0, _mocha.describe)('config', function () {
  (0, _mocha.describe)('applyConfigToArgv', function () {

    (0, _mocha.it)('preserves a string value on the command line over configured', function () {
      var cmdLineSrcDir = '/user/specified/source/dir/';

      var params = makeArgv({
        userCmd: ['fakecommand', '--source-dir', cmdLineSrcDir],
        globalOpt: {
          'source-dir': {
            requiresArg: true,
            type: 'string',
            demand: false
          }
        }
      });
      var configObject = {
        sourceDir: '/configured/source/dir'
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
    });

    (0, _mocha.it)('preserves configured value over default', function () {
      var params = makeArgv({
        globalOpt: {
          'source-dir': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'default/value/option/definition'
          }
        }
      });
      var configObject = {
        sourceDir: '/configured/source/dir'
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, configObject.sourceDir);
    });

    (0, _mocha.it)('preserves a string value on the command line over all others', function () {
      var cmdLineSrcDir = '/user/specified/source/dir/';
      var params = makeArgv({
        userCmd: ['fakecommand', '--sourceDir', cmdLineSrcDir],
        globalOpt: {
          'source-dir': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'default/value/option/definition'
          }
        }
      });
      var configObject = {
        sourceDir: '/configured/source/dir'
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
    });

    (0, _mocha.it)('preserves default value of option if not in config', function () {
      var params = makeArgv({
        globalOpt: {
          'source-dir': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'default/value/option/definition'
          },
          'artifacts-dir': {
            type: 'string',
            demand: false
          }
        }
      });
      var configObject = {
        artifactsDir: '/configured/artifacts/dir'
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, 'default/value/option/definition');
    });

    (0, _mocha.it)('preserves value on the command line if not in config', function () {
      var cmdLineSrcDir = '/user/specified/source/dir/';
      var params = makeArgv({
        userCmd: ['fakecommand', '--sourceDir', cmdLineSrcDir],
        globalOpt: {
          'source-dir': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'default/value/option/definition'
          },
          'artifacts-dir': {
            type: 'string',
            demand: false
          }
        }
      });
      var configObject = {
        artifactsDir: '/configured/artifacts/dir'
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
    });

    (0, _mocha.it)('coerces config option values if needed', function () {
      var coerce = function coerce(sourceDir) {
        return 'coerced(' + sourceDir + ')';
      };
      var params = makeArgv({
        userCmd: ['fakecommand'],
        globalOpt: {
          'source-dir': {
            requiresArg: true,
            type: 'string',
            demand: false,
            // In the real world this would do something like
            // (sourceDir) => path.resolve(sourceDir)
            coerce: coerce
          }
        }
      });

      var sourceDir = '/configured/source/dir';
      var configObject = { sourceDir: sourceDir };

      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, coerce(sourceDir));
    });

    (0, _mocha.it)('uses a configured boolean value over an implicit default', function () {
      var params = makeArgv({
        globalOpt: {
          'overwrite-files': {
            type: 'boolean'
            // No default is set here explicitly but yargs will set it to
            // false implicitly.
          }
        }
      });
      var configObject = {
        overwriteFiles: true
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.overwriteFiles, true);
    });

    (0, _mocha.it)('uses a configured boolean value over explicit falsey default', function () {
      var params = makeArgv({
        globalOpt: {
          'overwrite-files': {
            type: 'boolean',
            default: false
          }
        }
      });
      var configObject = {
        overwriteFiles: true
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.overwriteFiles, true);
    });

    (0, _mocha.it)('uses configured boolean value over explicit truthy default', function () {
      var params = makeArgv({
        globalOpt: {
          verbose: {
            type: 'boolean',
            default: true
          }
        }
      });
      var configObject = {
        verbose: false
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.verbose, false);
    });

    (0, _mocha.it)('uses a CLI boolean value over a configured one', function () {
      var params = makeArgv({
        userCmd: ['fakecommand', '--overwrite-files'],
        globalOpt: {
          'overwrite-files': {
            type: 'boolean'
          }
        }
      });
      var configObject = {
        overwriteFiles: false
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.overwriteFiles, true);
    });

    (0, _mocha.it)('can load multiple configs for global options', function () {
      var params = makeArgv({
        userCmd: ['fakecommand'],
        globalOpt: {
          'file-path': {
            demand: false,
            type: 'string'
          }
        }
      });

      // Make sure the second global option overrides the first.
      var firstConfigObject = {
        filePath: 'first/path'
      };
      var secondConfigObject = {
        filePath: 'second/path'
      };

      var argv = applyConf((0, _extends3.default)({}, params, { configObject: firstConfigObject
      }));
      argv = applyConf((0, _extends3.default)({}, params, { argv: argv, configObject: secondConfigObject
      }));
      _chai.assert.strictEqual(argv.filePath, secondConfigObject.filePath);
    });

    (0, _mocha.it)('recognizes array config values as array types', function () {
      var params = makeArgv({
        userCmd: ['fakecommand'],
        globalOpt: {
          'ignore-files': {
            demand: false,
            type: 'array'
          }
        }
      });

      var configObject = {
        ignoreFiles: ['file1', 'file2']
      };

      var argv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(argv.ignoreFiles, configObject.ignoreFiles);
    });

    (0, _mocha.it)('does not mistake an array config values for a sub-command', function () {
      var params = makeArgv({
        userCmd: ['fakecommand'],
        globalOpt: {
          pref: {
            demand: false,
            type: 'array'
          }
        }
      });

      var configObject = {
        pref: ['pref1=true', 'pref2=false']
      };

      var resultArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(resultArgv.pref, configObject.pref);
    });

    (0, _mocha.it)('uses CLI option over undefined configured option and default', function () {
      var cmdLineSrcDir = '/user/specified/source/dir/';
      var params = makeArgv({
        userCmd: ['fakecommand', '--source-dir', cmdLineSrcDir],
        globalOpt: {
          'source-dir': {
            type: 'string'
          },
          'verbose': {
            type: 'boolean'
          }
        }
      });
      var configObject = {
        verbose: true
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
    });

    (0, _mocha.it)('uses a configured number value over a falsey default', function () {
      var params = makeArgv({
        userCmd: ['fakecommand'],
        globalOpt: {
          'number-of-retries': {
            type: 'number',
            default: 0
          }
        }
      });
      var configObject = {
        numberOfRetries: 1
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.numberOfRetries, 1);
    });

    (0, _mocha.it)('uses a falsey CLI number value over a configured one', function () {
      var params = makeArgv({
        userCmd: ['fakecommand', '--number-of-retries=0'],
        globalOpt: {
          'number-of-retries': {
            type: 'number',
            default: 1
          }
        }
      });
      var configObject = {
        numberOfRetries: 1
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.numberOfRetries, 0);
    });

    (0, _mocha.it)('uses configured value even when option defaults to undefined', function () {
      var params = makeArgv({
        globalOpt: {
          'source-dir': {
            type: 'string',
            default: undefined
          }
        }
      });
      var configObject = {
        sourceDir: '/configured/directory'
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, '/configured/directory');
    });

    (0, _mocha.it)('throws an error when an option is not camel cased', function () {
      var params = makeArgv({
        globalOpt: {
          'source-dir': {
            type: 'string',
            demand: false
          }
        }
      });
      var configObject = {
        'source-dir': 'fake/value/'
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config option "source-dir" must be ' + 'specified in camel case: "sourceDir"');
    });

    (0, _mocha.it)('throws an error when an option is invalid', function () {
      var params = makeArgv({
        globalOpt: {
          'source-dir': {
            type: 'string',
            demand: false
          }
        }
      });
      var configObject = {
        randomDir: 'fake/artifacts/dir'
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config file ' + 'at some/path/to/config.js specified an unknown option: "randomDir"');
    });

    (0, _mocha.it)('throws an error when a global option type is invalid', function () {
      var params = makeArgv({
        globalOpt: {
          retries: {
            type: 'number',
            default: 1
          }
        }
      });
      var configObject = {
        retries: 'invalid-value'
      };
      _chai.assert.throws(function () {
        return applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config file at some/path/to/config.js specified the ' + 'type of "retries" incorrectly as "string" (expected type "number")');
    });

    (0, _mocha.it)('throws an error when the type of option value is invalid', function () {
      var params = makeArgv({
        globalOpt: {
          'source-dir': {
            type: 'string',
            demand: false
          }
        }
      });
      var configObject = {
        sourceDir: { randomKey: 'randomValue' }
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config file at some/path/to/config.js ' + 'specified the type of "sourceDir" incorrectly');
    });

    (0, _mocha.it)('does not throw an error when the type of option value is count', function () {
      var params = makeArgv({
        globalOpt: {
          'random-numeric-option': {
            type: 'count',
            default: 0
          }
        }
      });
      var configObject = {
        randomNumericOption: 15
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.randomNumericOption, 15);
    });
  });

  (0, _mocha.describe)('sub commands', function () {
    (0, _mocha.it)('preserves configured value over default', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-key': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value'
          }
        }
      });
      var configObject = {
        sign: {
          apiKey: 'custom-configured-key'
        }
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.apiKey, configObject.sign.apiKey);
    });

    (0, _mocha.it)('preserves CLI value over default and configured', function () {
      var cmdApiKey = 'api-key-cmd';
      var params = makeArgv({
        userCmd: ['sign', '--api-key', cmdApiKey],
        command: 'sign',
        commandOpt: {
          'api-key': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value'
          }
        }
      });
      var configObject = {
        sign: {
          apiKey: 'custom-configured-key'
        }
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.apiKey, cmdApiKey);
    });

    (0, _mocha.it)('preserves CLI value over configured', function () {
      var cmdApiKey = 'api-key-cmd';
      var params = makeArgv({
        userCmd: ['sign', '--api-key', cmdApiKey],
        command: 'sign',
        commandOpt: {
          'api-key': {
            requiresArg: true,
            type: 'string',
            demand: false
          }
        }
      });
      var configObject = {
        sign: {
          apiKey: 'custom-configured-key'
        }
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.apiKey, cmdApiKey);
    });

    (0, _mocha.it)('can load multiple configs for sub-command options', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'file-path': {
            demand: false,
            type: 'string'
          }
        }
      });

      // Make sure the second sub-command option overrides the first.
      var firstConfigObject = {
        sign: {
          filePath: 'first/path'
        }
      };
      var secondConfigObject = {
        sign: {
          filePath: 'second/path'
        }
      };

      var argv = applyConf((0, _extends3.default)({}, params, { configObject: firstConfigObject
      }));
      argv = applyConf((0, _extends3.default)({}, params, { argv: argv, configObject: secondConfigObject
      }));
      _chai.assert.strictEqual(argv.filePath, secondConfigObject.sign.filePath);
    });

    (0, _mocha.it)('preserves default value if not in config', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-key': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          },
          'api-url': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiUrl'
          }
        }
      });
      var configObject = {
        sign: {
          apiKey: 'custom-configured-key'
        }
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.apiUrl, 'pretend-default-value-of-apiUrl');
    });

    (0, _mocha.it)('preserves CLI value if not in config', function () {
      var cmdApiKey = 'api-key-cmd';
      var params = makeArgv({
        userCmd: ['sign', '--api-key', cmdApiKey],
        command: 'sign',
        commandOpt: {
          'api-key': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          },
          'api-url': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiUrl'
          }
        }
      });
      var configObject = {
        sign: {
          apiUrl: 'custom-configured-url'
        }
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.apiKey, cmdApiKey);
    });

    (0, _mocha.it)('preserves global option when sub-command options exist', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-key': {
            requiresArg: true,
            type: 'string',
            demand: false
          }
        },
        globalOpt: {
          'source-dir': {
            requiresArg: true,
            type: 'string',
            demand: false
          }
        }
      });
      var sourceDir = 'custom/source/dir';
      var configObject = {
        // This global option should not be affected by the
        // recursion code that processes the sub-command option.
        sourceDir: sourceDir,
        sign: {
          apiKey: 'custom-configured-key'
        }
      };
      var newArgv = applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      _chai.assert.strictEqual(newArgv.sourceDir, sourceDir);
    });

    (0, _mocha.it)('handles camel case sub-commands', function () {
      var params = makeArgv({
        userCmd: ['sign-extension'],
        command: 'sign-extension',
        commandOpt: {
          'api-url': {
            requiresArg: true,
            type: 'string',
            default: 'pretend-default-value-of-apiKey'
          }
        }
      });
      var configObject = {
        signExtension: {
          apiUrl: 2
        }
      };
      _chai.assert.throws(function () {
        return applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config file at some/path/to/config.js ' + 'specified the type of "apiUrl" incorrectly');
    });

    (0, _mocha.it)('throws an error when the option is not camel cased', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-url': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          }
        }
      });
      var configObject = {
        sign: {
          'api-url': 2
        }
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config option "api-url"' + ' must be specified in camel case: "apiUrl"');
    });

    (0, _mocha.it)('throws an error when the option is invalid', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-url': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          }
        }
      });
      var configObject = {
        sign: {
          randomOption: 'random-value'
        }
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config file at ' + 'some/path/to/config.js specified an unknown option: "randomOption"');
    });

    (0, _mocha.it)('throws an error when the type of option value is invalid', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-url': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          }
        }
      });
      var configObject = {
        sign: {
          apiUrl: 2
        }
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config file at some/path/to/config.js ' + 'specified the type of "apiUrl" incorrectly');
    });

    (0, _mocha.it)('throws an error when the type of one of option values' + ' is invalid', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-url': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          },
          'api-key': {
            requiresArg: true,
            type: 'string',
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          }
        }
      });
      var configObject = {
        sign: {
          apiUrl: 2,
          apiKey: 'fake-api-key'
        }
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.UsageError, 'The config file at some/path/to/config.js ' + 'specified the type of "apiUrl" incorrectly');
    });

    (0, _mocha.it)('throws an error when the type of option is missing', function () {
      var params = makeArgv({
        userCmd: ['sign'],
        command: 'sign',
        commandOpt: {
          'api-url': {
            requiresArg: true,
            demand: false,
            default: 'pretend-default-value-of-apiKey'
          }
        }
      });
      var configObject = {
        sign: {
          apiUrl: 2,
          apiKey: 'fake-api-key'
        }
      };
      _chai.assert.throws(function () {
        applyConf((0, _extends3.default)({}, params, { configObject: configObject }));
      }, _errors.WebExtError, 'Option: apiUrl was defined without a type.');
    });

    (0, _mocha.it)('throws an error when type of unrelated sub option is invalid', function () {
      var program = new _program.Program(['run']);

      program.command('run', 'this is a fake command', _sinon2.default.stub(), {
        'no-reload': {
          type: 'boolean',
          demand: false
        }
      });

      program.command('sign', 'this is a fake command', _sinon2.default.stub(), {
        'api-url': {
          requiresArg: true,
          type: 'string',
          demand: false,
          default: 'pretend-default-value-of-apiKey'
        }
      });

      var configObject = {
        sign: {
          apiUrl: 2
        }
      };

      _chai.assert.throws(function () {
        applyConf({
          argv: program.yargs.exitProcess(false).argv,
          options: program.options,
          configObject: configObject });
      }, _errors.UsageError, 'The config file at some/path/to/config.js ' + 'specified the type of "apiUrl" incorrectly as "number"' + ' (expected type "string")');
    });
  });

  (0, _mocha.describe)('loadJSConfigFile', function () {
    (0, _mocha.it)('throws an error if the config file does not exist', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        _chai.assert.throws(function () {
          (0, _config.loadJSConfigFile)(_path2.default.join(tmpDir.path(), 'non-existant-config.js'));
        }, _errors.UsageError, /Cannot read config file/);
      });
    });

    (0, _mocha.it)('throws an error if the config file has syntax errors', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var configFilePath = _path2.default.join(tmpDir.path(), 'config.js');
        _mz.fs.writeFileSync(configFilePath,
        // missing = in two places
        'module.exports {\n                sourceDir \'path/to/fake/source/dir\',\n              };');
        _chai.assert.throws(function () {
          (0, _config.loadJSConfigFile)(configFilePath);
        }, _errors.UsageError);
      });
    });

    (0, _mocha.it)('parses the configuration file correctly', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var configFilePath = _path2.default.join(tmpDir.path(), 'config.js');
        _mz.fs.writeFileSync(configFilePath, 'module.exports = {\n              sourceDir: \'path/to/fake/source/dir\',\n            };');
        var configObj = (0, _config.loadJSConfigFile)(configFilePath);
        _chai.assert.equal(configObj.sourceDir, 'path/to/fake/source/dir');
      });
    });

    (0, _mocha.it)('parses package.json file correctly', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var configFilePath = _path2.default.join(tmpDir.path(), 'package.json');
        _mz.fs.writeFileSync(configFilePath, '{\n                "name": "dummy-package-json",\n                "version": "1.0.0",\n                "webExt": {\n                  "sourceDir": "path/to/fake/source/dir"\n                }\n            }');
        var configObj = (0, _config.loadJSConfigFile)(configFilePath);
        _chai.assert.equal(configObj.sourceDir, 'path/to/fake/source/dir');
      });
    });

    (0, _mocha.it)('does not throw an error for an empty config', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var configFilePath = _path2.default.join(tmpDir.path(), 'config.js');
        _mz.fs.writeFileSync(configFilePath, 'module.exports = {};');
        (0, _config.loadJSConfigFile)(configFilePath);
      });
    });

    (0, _mocha.it)('returns an empty object when webExt key is not in package.json', function () {
      return (0, _tempDir.withTempDir)(function (tmpDir) {
        var configFilePath = _path2.default.join(tmpDir.path(), 'package.json');
        _mz.fs.writeFileSync(configFilePath, '{\n              "name": "dummy-package-json",\n              "version": "1.0.0"\n            }');
        var configObj = (0, _config.loadJSConfigFile)(configFilePath);
        _chai.assert.deepEqual(configObj, {});
      });
    });
  });

  (0, _mocha.describe)('discoverConfigFiles', function () {
    function _discoverConfigFiles() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _config.discoverConfigFiles)((0, _extends3.default)({
        // By default, do not look in the real home directory.
        getHomeDir: function getHomeDir() {
          return '/not-a-directory';
        }
      }, params));
    }

    (0, _mocha.it)('finds a config in your home directory', function () {
      return (0, _tempDir.withTempDir)(function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tmpDir) {
          var packageJSON, homeDirConfig;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // This is actually web-ext itself's package.json file, which
                  // will be discovered because it's inside current working
                  // directory
                  packageJSON = _path2.default.join(process.cwd(), 'package.json');
                  homeDirConfig = _path2.default.join(tmpDir.path(), '.web-ext-config.js');
                  _context.next = 4;
                  return _mz.fs.writeFile(homeDirConfig, 'module.exports = {}');

                case 4:
                  _context.t0 = _chai.assert;
                  _context.next = 7;
                  return _discoverConfigFiles({
                    getHomeDir: function getHomeDir() {
                      return tmpDir.path();
                    }
                  });

                case 7:
                  _context.t1 = _context.sent;
                  _context.t2 = [_path2.default.resolve(homeDirConfig), packageJSON];

                  _context.t0.deepEqual.call(_context.t0, _context.t1, _context.t2);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    });

    (0, _mocha.it)('finds a config in your working directory', function () {
      return (0, _tempDir.withTempDir)(function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(tmpDir) {
          var lastDir, expectedConfig;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  lastDir = process.cwd();

                  process.chdir(tmpDir.path());
                  _context2.prev = 2;
                  expectedConfig = _path2.default.resolve(_path2.default.join(process.cwd(), 'web-ext-config.js'));
                  _context2.next = 6;
                  return _mz.fs.writeFile(expectedConfig, 'module.exports = {}');

                case 6:
                  _context2.t0 = _chai.assert;
                  _context2.next = 9;
                  return _discoverConfigFiles();

                case 9:
                  _context2.t1 = _context2.sent;
                  _context2.t2 = [expectedConfig];

                  _context2.t0.deepEqual.call(_context2.t0, _context2.t1, _context2.t2);

                case 12:
                  _context2.prev = 12;

                  process.chdir(lastDir);
                  return _context2.finish(12);

                case 15:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined, [[2,, 12, 15]]);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    });

    (0, _mocha.it)('discovers all config files', function () {
      return (0, _tempDir.withTempDir)(function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(tmpDir) {
          var lastDir, fakeHomeDir, globalConfig, packageJSONConfig, projectConfig;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  lastDir = process.cwd();

                  process.chdir(tmpDir.path());
                  _context3.prev = 2;
                  fakeHomeDir = _path2.default.join(tmpDir.path(), 'home-dir');
                  _context3.next = 6;
                  return _mz.fs.mkdir(fakeHomeDir);

                case 6:
                  globalConfig = _path2.default.resolve(_path2.default.join(fakeHomeDir, '.web-ext-config.js'));
                  _context3.next = 9;
                  return _mz.fs.writeFile(globalConfig, 'module.exports = {}');

                case 9:
                  packageJSONConfig = _path2.default.resolve(_path2.default.join(process.cwd(), 'package.json'));
                  _context3.next = 12;
                  return _mz.fs.writeFile(packageJSONConfig, '{\n                "name": "dummy-package-json",\n                "version": "1.0.0",\n                "webExt": {}\n              }');

                case 12:
                  projectConfig = _path2.default.resolve(_path2.default.join(process.cwd(), 'web-ext-config.js'));
                  _context3.next = 15;
                  return _mz.fs.writeFile(projectConfig, 'module.exports = {}');

                case 15:
                  _context3.t0 = _chai.assert;
                  _context3.next = 18;
                  return _discoverConfigFiles({
                    getHomeDir: function getHomeDir() {
                      return fakeHomeDir;
                    }
                  });

                case 18:
                  _context3.t1 = _context3.sent;
                  _context3.t2 = [globalConfig, packageJSONConfig, projectConfig];

                  _context3.t0.deepEqual.call(_context3.t0, _context3.t1, _context3.t2);

                case 21:
                  _context3.prev = 21;

                  process.chdir(lastDir);
                  return _context3.finish(21);

                case 24:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined, [[2,, 21, 24]]);
        }));

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }());
    });
  });
});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(232);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(233), __esModule: true };

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(234);
module.exports = __webpack_require__(11).Array.from;


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(28);
var $export = __webpack_require__(19);
var toObject = __webpack_require__(70);
var call = __webpack_require__(94);
var isArrayIter = __webpack_require__(95);
var toLength = __webpack_require__(66);
var createProperty = __webpack_require__(235);
var getIterFn = __webpack_require__(72);

$export($export.S + $export.F * !__webpack_require__(100)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(21);
var createDesc = __webpack_require__(38);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 237 */
/***/ (function(module, exports) {

module.exports = require("require-uncached");

/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports = require("decamelize");

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(49);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(52);

var _inherits3 = _interopRequireDefault(_inherits2);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _errors = __webpack_require__(3);

var _helpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('errors', function () {

  (0, _mocha.describe)('onlyInstancesOf', function () {

    (0, _mocha.it)('lets you catch a certain error', function () {
      return Promise.reject(new SyntaxError('simulated error')).catch((0, _errors.onlyInstancesOf)(SyntaxError, function (error) {
        _chai.assert.instanceOf(error, SyntaxError);
      }));
    });

    (0, _mocha.it)('throws instances of other errors', function () {
      return Promise.reject(new SyntaxError('simulated error')).catch((0, _errors.onlyInstancesOf)(TypeError, function () {
        throw new Error('Unexpectedly caught the wrong error');
      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.match(error.message, /simulated error/);
      });
    });
  });

  (0, _mocha.describe)('onlyErrorsWithCode', function () {
    var ErrorWithErrno = function (_Error) {
      (0, _inherits3.default)(ErrorWithErrno, _Error);

      function ErrorWithErrno() {
        (0, _classCallCheck3.default)(this, ErrorWithErrno);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ErrorWithErrno.__proto__ || Object.getPrototypeOf(ErrorWithErrno)).call(this, 'pretend this is a system error'));

        _this.errno = 53;
        return _this;
      }

      return ErrorWithErrno;
    }(Error);

    (0, _mocha.it)('catches errors having a code', function () {
      return Promise.reject(new _helpers.ErrorWithCode()).catch((0, _errors.onlyErrorsWithCode)('SOME_CODE', function (error) {
        _chai.assert.equal(error.code, 'SOME_CODE');
      }));
    });

    (0, _mocha.it)('catches errors having a error no', function () {
      return Promise.reject(new ErrorWithErrno()).catch((0, _errors.onlyErrorsWithCode)(53, function (error) {
        _chai.assert.equal(error.errno, 53);
      }));
    });

    (0, _mocha.it)('throws errors that do not match the code', function () {
      return Promise.reject(new SyntaxError('simulated error')).catch((0, _errors.onlyErrorsWithCode)('SOME_CODE', function () {
        throw new Error('Unexpectedly caught the wrong error');
      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.match(error.message, /simulated error/);
      });
    });

    (0, _mocha.it)('catches errors having one of many codes', function () {
      return Promise.reject(new _helpers.ErrorWithCode()).catch((0, _errors.onlyErrorsWithCode)(['OTHER_CODE', 'SOME_CODE'], function (error) {
        _chai.assert.equal(error.code, 'SOME_CODE');
      }));
    });

    (0, _mocha.it)('catches errors having one of many errno', function () {
      return Promise.reject(new ErrorWithErrno()).catch((0, _errors.onlyErrorsWithCode)([34, 53], function (error) {
        _chai.assert.equal(error.errno, 53);
      }));
    });

    (0, _mocha.it)('throws errors that are not in an array of codes', function () {
      return Promise.reject(new _helpers.ErrorWithCode()).catch((0, _errors.onlyErrorsWithCode)(['OTHER_CODE', 'ANOTHER_CODE'], function () {
        throw new Error('Unexpectedly caught the wrong error');
      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
        _chai.assert.equal(error.code, 'SOME_CODE');
      });
    });
  });

  (0, _mocha.describe)('isErrorWithCode', function () {

    (0, _mocha.it)('returns true on errors that do match the code', function () {
      _chai.assert.equal((0, _errors.isErrorWithCode)('SOME_CODE', new _helpers.ErrorWithCode()), true);
      _chai.assert.equal((0, _errors.isErrorWithCode)(['SOME_CODE', 'OTHER_CODE'], new _helpers.ErrorWithCode()), true);
    });

    (0, _mocha.it)('returns false on errors that do not match the code', function () {
      _chai.assert.equal((0, _errors.isErrorWithCode)('OTHER_CODE', new _helpers.ErrorWithCode()), false);
      _chai.assert.equal((0, _errors.isErrorWithCode)(['OTHER_CODE', 'ANOTHER_CODE'], new _helpers.ErrorWithCode()), false);
      _chai.assert.equal((0, _errors.isErrorWithCode)('ANY_CODE', new Error()), false);
    });
  });
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _defineProperty2 = __webpack_require__(241);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = __webpack_require__(85);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mocha = __webpack_require__(4);

var _gitRevSync = __webpack_require__(120);

var _gitRevSync2 = _interopRequireDefault(_gitRevSync);

var _mz = __webpack_require__(9);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = __webpack_require__(5);

var _config = __webpack_require__(86);

var _program = __webpack_require__(60);

var _cmd = __webpack_require__(34);

var _cmd2 = _interopRequireDefault(_cmd);

var _errors = __webpack_require__(3);

var _helpers = __webpack_require__(10);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('program.Program', function () {

  function execProgram(program) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var fakeProcess = (0, _helpers.createFakeProcess)();
    var absolutePackageDir = _path2.default.join(__dirname, '..', '..');
    return program.execute(absolutePackageDir, (0, _extends3.default)({
      getVersion: function getVersion() {
        return 'not-a-real-version';
      },
      checkForUpdates: (0, _sinon.spy)(),
      systemProcess: fakeProcess,
      shouldExitProgram: false
    }, options));
  }

  (0, _mocha.it)('executes a command callback', function () {
    var thing = (0, _sinon.spy)(function () {
      return Promise.resolve();
    });
    var program = new _program.Program(['thing']).command('thing', 'does a thing', thing);
    return execProgram(program).then(function () {
      _sinon2.default.assert.called(thing);
    });
  });

  (0, _mocha.it)('reports unknown commands', function () {
    var program = new _program.Program(['thing']);
    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
      _chai.assert.match(error.message, /Unknown command: thing/);
    }));
  });

  (0, _mocha.it)('reports missing command', function () {
    var program = new _program.Program([]);
    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
      _chai.assert.match(error.message, /No sub-command was specified/);
    }));
  });

  (0, _mocha.it)('exits 1 on a thrown error', function () {
    var fakeProcess = (0, _helpers.createFakeProcess)();
    var program = new _program.Program(['cmd']).command('cmd', 'some command', function () {
      throw new Error('this is an error from a command handler');
    });
    return execProgram(program, {
      systemProcess: fakeProcess,
      shouldExitProgram: true
    }).then(function () {
      _sinon2.default.assert.calledOnce(fakeProcess.exit);
      _sinon2.default.assert.calledWith(fakeProcess.exit, 1);
    });
  });

  (0, _mocha.it)('throws an error if sub-command is given an argument', function () {
    var program = new _program.Program(['thing', 'nope']).command('thing', '', function () {});
    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      _chai.assert.match(error.message, /This command does not take any arguments/);
    });
  });

  (0, _mocha.it)('handles errors that have codes', function () {

    var program = new _program.Program(['cmd']).command('cmd', 'some command', function () {
      var error = new _helpers.ErrorWithCode();
      throw error;
    });
    // This is just a smoke test to make sure the error code doesn't
    // introduce an unexpected exception.
    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      _chai.assert.match(error.message, /pretend this is a system error/);
    });
  });

  (0, _mocha.it)('lets commands define options', function () {
    var handler = (0, _sinon.spy)(function () {
      return Promise.resolve();
    });
    var program = new _program.Program(['cmd']).command('cmd', 'some command', handler, {
      'some-option': {
        type: 'string',
        default: 'default value'
      }
    });
    return execProgram(program).then(function () {
      // This ensures that the default configuration for the option has
      // been applied.
      _sinon2.default.assert.calledWithMatch(handler, { someOption: 'default value' });
    });
  });

  (0, _mocha.it)('preserves global option configuration', function () {
    var handler = (0, _sinon.spy)(function () {
      return Promise.resolve();
    });
    var program = new _program.Program(['cmd']).setGlobalOptions({
      'global-option': {
        type: 'string',
        default: 'the default'
      }
    }).command('cmd', 'some command', handler, {
      'some-option': {
        type: 'string',
        default: 'default value'
      }
    });
    return execProgram(program).then(function () {
      // By checking the global default, it ensures that default configuration
      // will be applied to sub commands.
      _sinon2.default.assert.calledWithMatch(handler, {
        someOption: 'default value',
        globalOption: 'the default'
      });
    });
  });

  (0, _mocha.it)('reads option values from env vars in sub commands', function () {
    // Set an env var that mimics web-ext cmd --some-opt=value
    process.env.WEB_EXT_SOME_OPT = 'value';
    var valueReceived = void 0;
    var program = new _program.Program(['cmd']).command('cmd', 'some command', function (_ref) {
      var someOpt = _ref.someOpt;

      valueReceived = someOpt;
    }, {
      'some-opt': {
        type: 'string',
        describe: 'example option'
      }
    });
    return execProgram(program, { shouldExitProgram: true }).then(function () {
      _chai.assert.equal(valueReceived, 'value');
      delete process.env.WEB_EXT_SOME_OPT;
    });
  });

  (0, _mocha.it)('configures the logger when verbose', function () {
    var logStream = (0, _helpers.fake)(new _logger.ConsoleStream());

    var program = new _program.Program(['--verbose', 'thing']);
    program.setGlobalOptions({
      verbose: {
        type: 'boolean'
      }
    });
    program.command('thing', 'does a thing', function () {});

    return execProgram(program, {
      getVersion: (0, _sinon.spy)(),
      logStream: logStream
    }).then(function () {
      _sinon2.default.assert.called(logStream.makeVerbose);
    });
  });

  (0, _mocha.it)('checks the version when verbose', function () {
    var version = (0, _sinon.spy)();
    var program = new _program.Program(['--verbose', 'thing']);
    program.setGlobalOptions({
      verbose: {
        type: 'boolean'
      }
    });
    program.command('thing', 'does a thing', function () {});
    return execProgram(program, { getVersion: version }).then(function () {
      _sinon2.default.assert.calledWith(version, _path2.default.join(__dirname, '..', '..'));
    });
  });

  (0, _mocha.it)('does not configure the logger unless verbose', function () {
    var logStream = (0, _helpers.fake)(new _logger.ConsoleStream());
    var program = new _program.Program(['thing']).command('thing', '', function () {});
    program.setGlobalOptions({
      verbose: {
        type: 'boolean'
      }
    });
    return execProgram(program, { logStream: logStream }).then(function () {
      _sinon2.default.assert.notCalled(logStream.makeVerbose);
    });
  });

  (0, _mocha.it)('logs UsageErrors into console', function () {
    // Clear console stream from previous messages and start recording
    _logger.consoleStream.stopCapturing();
    _logger.consoleStream.flushCapturedLogs();
    _logger.consoleStream.startCapturing();

    var program = new _program.Program(['thing']).command('thing', '', function () {
      throw new _errors.UsageError('some error');
    });
    program.setGlobalOptions({
      verbose: {
        type: 'boolean'
      }
    });
    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
      var capturedMessages = _logger.consoleStream.capturedMessages;
      // Stop recording

      _logger.consoleStream.stopCapturing();
      _chai.assert.match(error.message, /some error/);
      _chai.assert.ok(capturedMessages.some(function (message) {
        return message.match(/some error/);
      }));
    }));
  });

  (0, _mocha.it)('throws an error about unknown commands', function () {
    return execProgram(new _program.Program(['nope'])).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      _chai.assert.match(error.message, /Unknown command: nope/);
    });
  });

  (0, _mocha.it)('throws an error about unknown options', function () {
    return execProgram(new _program.Program(['--nope'])).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      // Make sure that the option name is in the error message.
      // Be careful not to rely on any text from yargs since it's localized.
      _chai.assert.match(error.message, /nope/);
    });
  });

  (0, _mocha.it)('throws an error about unknown sub-command options', function () {
    var program = new _program.Program(['thing', '--nope']).command('thing', '', function () {});
    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      // Make sure that the option name is in the error message.
      // Be careful not to rely on any text from yargs since it's localized.
      _chai.assert.match(error.message, /nope/);
    });
  });

  (0, _mocha.it)('checks for updates automatically', function () {
    var handler = (0, _sinon.spy)();
    var getVersion = function getVersion() {
      return 'some-package-version';
    };
    var checkForUpdates = _sinon2.default.stub();
    var program = new _program.Program(['run']).command('run', 'some command', handler);
    return execProgram(program, {
      checkForUpdates: checkForUpdates,
      getVersion: getVersion,
      globalEnv: 'production'
    }).then(function () {
      _sinon2.default.assert.calledWith(checkForUpdates, { version: 'some-package-version' });
    });
  });

  (0, _mocha.it)('does not check for updates during development', function () {
    var handler = (0, _sinon.spy)();
    var getVersion = function getVersion() {
      return 'some-package-version';
    };
    var checkForUpdates = _sinon2.default.stub();
    var program = new _program.Program(['run']).command('run', 'some command', handler);
    return execProgram(program, {
      checkForUpdates: checkForUpdates,
      getVersion: getVersion,
      globalEnv: 'development'
    }).then(function () {
      _sinon2.default.assert.notCalled(checkForUpdates);
    });
  });
});

(0, _mocha.describe)('program.main', function () {

  function execProgram(argv) {
    var _this = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref2$projectRoot = _ref2.projectRoot,
        projectRoot = _ref2$projectRoot === undefined ? '' : _ref2$projectRoot,
        runOptions = _ref2.runOptions,
        mainOptions = (0, _objectWithoutProperties3.default)(_ref2, ['projectRoot', 'runOptions']);

    return (0, _program.main)(projectRoot, (0, _extends3.default)({
      argv: argv,
      runOptions: (0, _extends3.default)({
        discoverConfigFiles: function () {
          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt('return', []);

                  case 1:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function discoverConfigFiles() {
            return _ref3.apply(this, arguments);
          };
        }(),
        getVersion: function getVersion() {
          return 'not-a-real-version';
        },
        checkForUpdates: (0, _sinon.spy)(),
        shouldExitProgram: false,
        systemProcess: (0, _helpers.createFakeProcess)()
      }, runOptions)
    }, mainOptions));
  }

  function makeConfigLoader(_ref4) {
    var configObjects = _ref4.configObjects;

    return function (fileName) {
      var conf = configObjects[fileName];
      if (!conf) {
        throw new Error('Config file was not mapped: ' + fileName);
      }
      return conf;
    };
  }

  (0, _mocha.it)('executes a command handler', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      build: function build() {
        return Promise.resolve();
      }
    });
    return execProgram(['build'], { commands: fakeCommands }).then(function () {
      // This is a smoke test mainly to make sure main() configures
      // options with handlers. It does not extensively test the
      // configuration of all handlers.
      _sinon2.default.assert.called(fakeCommands.build);
    });
  });

  (0, _mocha.it)('throws an error if no command is given', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {});
    return execProgram([], { commands: fakeCommands }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
      _chai.assert.match(error.message, /You must specify a command/);
    });
  });

  (0, _mocha.it)('can get the program version', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var fakeVersionGetter, fakeCommands, projectRoot;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fakeVersionGetter = _sinon2.default.spy(function () {
              return '<version>';
            });
            fakeCommands = (0, _helpers.fake)(_cmd2.default, {
              build: function build() {
                return Promise.resolve();
              }
            });
            projectRoot = '/pretend/project/root';
            // For some reason, executing --version like this
            // requires a command. In the real CLI, it does not.

            _context2.next = 5;
            return execProgram(['--version', 'build'], {
              projectRoot: projectRoot,
              commands: fakeCommands,
              getVersion: fakeVersionGetter
            });

          case 5:

            _sinon2.default.assert.calledWith(fakeVersionGetter, projectRoot);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  (0, _mocha.it)('turns sourceDir into an absolute path', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      build: function build() {
        return Promise.resolve();
      }
    });
    return execProgram(['build', '--source-dir', '..'], { commands: fakeCommands }).then(function () {
      _sinon2.default.assert.calledWithMatch(fakeCommands.build, { sourceDir: _path2.default.resolve(_path2.default.join(process.cwd(), '..')) });
    });
  });

  (0, _mocha.it)('normalizes the artifactsDir path', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      build: function build() {
        return Promise.resolve();
      }
    });
    return execProgram(
    // Add a double slash to the path, which will be fixed by normalization.
    ['build', '--artifacts-dir', process.cwd() + _path2.default.sep + _path2.default.sep], { commands: fakeCommands }).then(function () {
      _sinon2.default.assert.calledWithMatch(fakeCommands.build, { artifactsDir: process.cwd() + _path2.default.sep });
    });
  });

  (0, _mocha.it)('passes the path of a firefox binary when specified', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      run: function run() {
        return Promise.resolve();
      }
    });
    return execProgram(['run', '--firefox-binary', '/path/to/firefox-binary'], { commands: fakeCommands }).then(function () {
      _sinon2.default.assert.calledWithMatch(fakeCommands.run, { firefox: '/path/to/firefox-binary' });
    });
  });

  (0, _mocha.it)('passes the url of a firefox binary when specified', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      run: function run() {
        return Promise.resolve();
      }
    });
    return execProgram(['run', '--start-url', 'www.example.com'], { commands: fakeCommands }).then(function () {
      _sinon2.default.assert.calledWithMatch(fakeCommands.run, { startUrl: ['www.example.com'] });
    });
  });

  (0, _mocha.it)('opens browser console when --browser-console is specified', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      run: function run() {
        return Promise.resolve();
      }
    });
    return execProgram(['run', '--browser-console'], { commands: fakeCommands }).then(function () {
      _sinon2.default.assert.calledWithMatch(fakeCommands.run, { browserConsole: true });
    });
  });

  (0, _mocha.it)('converts custom preferences into an object', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      run: function run() {
        return Promise.resolve();
      }
    });
    return execProgram(['run', '--pref', 'prop=true', '--pref', 'prop2=value2'], { commands: fakeCommands }).then(function () {
      var pref = fakeCommands.run.firstCall.args[0].pref;

      _chai.assert.isObject(pref);
      _chai.assert.equal(pref.prop, true);
      _chai.assert.equal(pref.prop2, 'value2');
    });
  });

  (0, _mocha.it)('passes shouldExitProgram option to commands', function () {
    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
      lint: function lint() {
        return Promise.resolve();
      }
    });
    return execProgram(['lint'], { commands: fakeCommands }).then(function () {
      var options = fakeCommands.lint.firstCall.args[1];
      _chai.assert.strictEqual(options.shouldExitProgram, false);
    });
  });

  (0, _mocha.it)('applies options from the specified config file', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var fakeCommands, configObject, fakeLoadJSConfigFile, options;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fakeCommands = (0, _helpers.fake)(_cmd2.default, {
              lint: function lint() {
                return Promise.resolve();
              }
            });
            configObject = {
              lint: {
                selfHosted: true
              }
            };
            // Instead of loading/parsing a real file, just return an object.

            fakeLoadJSConfigFile = _sinon2.default.spy(function () {
              return configObject;
            });
            _context3.next = 5;
            return execProgram(['lint', '--config', 'path/to/web-ext-config.js'], {
              commands: fakeCommands,
              runOptions: {
                loadJSConfigFile: fakeLoadJSConfigFile
              }
            });

          case 5:
            options = fakeCommands.lint.firstCall.args[0];
            // This makes sure that the config object was applied
            // to the lint command options.

            _chai.assert.equal(options.selfHosted, configObject.lint.selfHosted);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  (0, _mocha.it)('discovers config files', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var fakeCommands, configObject, fakeLoadJSConfigFile, discoveredFile, options;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            fakeCommands = (0, _helpers.fake)(_cmd2.default, {
              lint: function lint() {
                return Promise.resolve();
              }
            });
            configObject = {
              lint: {
                selfHosted: true
              }
            };
            // Instead of loading/parsing a real file, just return an object.

            fakeLoadJSConfigFile = _sinon2.default.spy(function () {
              return configObject;
            });
            discoveredFile = 'fake/config.js';
            _context5.next = 6;
            return execProgram(['lint'], {
              commands: fakeCommands,
              runOptions: {
                discoverConfigFiles: function () {
                  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.abrupt('return', [discoveredFile]);

                          case 1:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, undefined);
                  }));

                  return function discoverConfigFiles() {
                    return _ref8.apply(this, arguments);
                  };
                }(),
                loadJSConfigFile: fakeLoadJSConfigFile
              }
            });

          case 6:
            options = fakeCommands.lint.firstCall.args[0];
            // This makes sure that the config object was applied
            // to the lint command options.

            _chai.assert.equal(options.selfHosted, configObject.lint.selfHosted);

            _sinon2.default.assert.calledWith(fakeLoadJSConfigFile, discoveredFile);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  (0, _mocha.it)('lets you disable config discovery', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var fakeCommands, discoverConfigFiles;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            fakeCommands = (0, _helpers.fake)(_cmd2.default, {
              lint: function lint() {
                return Promise.resolve();
              }
            });
            discoverConfigFiles = _sinon2.default.spy(function () {
              return Promise.resolve([]);
            });
            _context6.next = 4;
            return execProgram(['--no-config-discovery', 'lint'], {
              commands: fakeCommands,
              runOptions: {
                discoverConfigFiles: discoverConfigFiles
              }
            });

          case 4:

            _sinon2.default.assert.notCalled(discoverConfigFiles);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  (0, _mocha.it)('applies config files in order', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var _configObjects;

    var fakeCommands, globalConfig, projectConfig, customConfig, loadJSConfigFile, fakeApplyConfigToArgv, options;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            fakeCommands = (0, _helpers.fake)(_cmd2.default, {
              lint: function lint() {
                return Promise.resolve();
              }
            });
            globalConfig = 'home/dir/.web-ext-config.js';
            projectConfig = 'project/dir/web-ext-config.js';
            customConfig = _path2.default.resolve('custom/web-ext-config.js');
            loadJSConfigFile = makeConfigLoader({
              configObjects: (_configObjects = {}, (0, _defineProperty3.default)(_configObjects, globalConfig, {
                noInput: true
              }), (0, _defineProperty3.default)(_configObjects, projectConfig, {
                verbose: true
              }), (0, _defineProperty3.default)(_configObjects, customConfig, {
                lint: {
                  selfHosted: true
                }
              }), _configObjects)
            });
            fakeApplyConfigToArgv = _sinon2.default.spy(_config.applyConfigToArgv);
            _context8.next = 8;
            return execProgram(['lint', '--config', customConfig], {
              commands: fakeCommands,
              runOptions: {
                applyConfigToArgv: fakeApplyConfigToArgv,
                discoverConfigFiles: function () {
                  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
                    return _regenerator2.default.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            return _context7.abrupt('return', [globalConfig, projectConfig]);

                          case 1:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, undefined);
                  }));

                  return function discoverConfigFiles() {
                    return _ref11.apply(this, arguments);
                  };
                }(),
                loadJSConfigFile: loadJSConfigFile
              }
            });

          case 8:

            // Check that the config files were all applied to argv.
            options = fakeCommands.lint.firstCall.args[0];

            _chai.assert.equal(options.noInput, true);
            _chai.assert.equal(options.verbose, true);
            _chai.assert.equal(options.selfHosted, true);

            // Make sure the config files were loaded in the right order.
            _chai.assert.include(fakeApplyConfigToArgv.firstCall.args[0], {
              configFileName: globalConfig
            });
            _chai.assert.include(fakeApplyConfigToArgv.secondCall.args[0], {
              configFileName: projectConfig
            });
            _chai.assert.include(fakeApplyConfigToArgv.thirdCall.args[0], {
              configFileName: customConfig
            });

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  (0, _mocha.it)('overwrites old config values', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
    var _configObjects2;

    var fakeCommands, globalConfig, customConfig, finalSourceDir, loadJSConfigFile, options;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            fakeCommands = (0, _helpers.fake)(_cmd2.default, {
              lint: function lint() {
                return Promise.resolve();
              }
            });
            globalConfig = _path2.default.resolve('home/dir/.web-ext-config.js');
            customConfig = _path2.default.resolve('custom/web-ext-config.js');
            finalSourceDir = _path2.default.resolve('final/source-dir');
            loadJSConfigFile = makeConfigLoader({
              configObjects: (_configObjects2 = {}, (0, _defineProperty3.default)(_configObjects2, globalConfig, {
                sourceDir: 'first/source-dir'
              }), (0, _defineProperty3.default)(_configObjects2, customConfig, {
                sourceDir: finalSourceDir
              }), _configObjects2)
            });
            _context10.next = 7;
            return execProgram(['lint', '--config', customConfig], {
              commands: fakeCommands,
              runOptions: {
                discoverConfigFiles: function () {
                  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
                    return _regenerator2.default.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            return _context9.abrupt('return', [globalConfig]);

                          case 1:
                          case 'end':
                            return _context9.stop();
                        }
                      }
                    }, _callee9, undefined);
                  }));

                  return function discoverConfigFiles() {
                    return _ref13.apply(this, arguments);
                  };
                }(),
                loadJSConfigFile: loadJSConfigFile
              }
            });

          case 7:
            options = fakeCommands.lint.firstCall.args[0];
            // This should equal the final configured value.

            _chai.assert.equal(options.sourceDir, finalSourceDir);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  (0, _mocha.it)('enables verbose more from config file', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
    var logStream, fakeCommands, customConfig, loadJSConfigFile;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            logStream = (0, _helpers.fake)(new _logger.ConsoleStream());
            fakeCommands = (0, _helpers.fake)(_cmd2.default, {
              lint: function lint() {
                return Promise.resolve();
              }
            });
            customConfig = _path2.default.resolve('custom/web-ext-config.js');
            loadJSConfigFile = makeConfigLoader({
              configObjects: (0, _defineProperty3.default)({}, customConfig, {
                verbose: true
              })
            });
            _context12.next = 6;
            return execProgram(['lint', '--config', customConfig], {
              commands: fakeCommands,
              runOptions: {
                discoverConfigFiles: function () {
                  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
                    return _regenerator2.default.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            return _context11.abrupt('return', []);

                          case 1:
                          case 'end':
                            return _context11.stop();
                        }
                      }
                    }, _callee11, undefined);
                  }));

                  return function discoverConfigFiles() {
                    return _ref15.apply(this, arguments);
                  };
                }(),
                loadJSConfigFile: loadJSConfigFile,
                logStream: logStream
              }
            });

          case 6:

            _sinon2.default.assert.called(logStream.makeVerbose);

          case 7:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));
});

(0, _mocha.describe)('program.defaultVersionGetter', function () {
  var projectRoot = _path2.default.join(__dirname, '..', '..');

  (0, _mocha.it)('returns the package version in production', function () {
    var pkgFile = _path2.default.join(projectRoot, 'package.json');
    return _mz.fs.readFile(pkgFile).then(function (pkgData) {
      var testBuildEnv = { globalEnv: 'production' };
      _chai.assert.equal((0, _program.defaultVersionGetter)(projectRoot, testBuildEnv), JSON.parse(pkgData).version);
    });
  });

  (0, _mocha.it)('returns git commit information in development', function () {
    if (process.env.APPVEYOR) {
      // Test skipped because of $APPVEYOR' issues with git-rev-sync (mozilla/web-ext#774)
      this.skip();
      return;
    }
    var commit = _gitRevSync2.default.branch() + '-' + _gitRevSync2.default.long();
    var testBuildEnv = { globalEnv: 'development' };
    _chai.assert.equal((0, _program.defaultVersionGetter)(projectRoot, testBuildEnv), commit);
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit"))

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(102);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mocha = __webpack_require__(4);

var _logger = __webpack_require__(0);

(0, _mocha.beforeEach)(function () {
  _logger.consoleStream.makeVerbose();
  _logger.consoleStream.startCapturing();
});

(0, _mocha.afterEach)(function () {
  if (this.currentTest.state !== 'passed') {
    _logger.consoleStream.flushCapturedLogs();
  }
  _logger.consoleStream.stopCapturing();
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(8);

var _extends3 = _interopRequireDefault(_extends2);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _mocha = __webpack_require__(4);

var _mz = __webpack_require__(9);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _watcher = __webpack_require__(75);

var _watcher2 = _interopRequireDefault(_watcher);

var _tempDir = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('watcher', function () {

  (0, _mocha.it)('watches for file changes', function () {
    return (0, _tempDir.withTempDir)(function (tmpDir) {
      var artifactsDir = _path2.default.join(tmpDir.path(), 'web-ext-artifacts');
      var someFile = _path2.default.join(tmpDir.path(), 'foo.txt');

      var resolveChange;
      var whenFilesChanged = new Promise(function (resolve) {
        resolveChange = resolve;
      });
      var onChange = _sinon2.default.spy(function () {
        resolveChange();
      });

      return _mz.fs.writeFile(someFile, '<contents>').then(function () {
        return (0, _watcher2.default)({
          sourceDir: tmpDir.path(),
          artifactsDir: artifactsDir,
          onChange: onChange,
          shouldWatchFile: function shouldWatchFile() {
            return true;
          }
        });
      }).then(function (watcher) {
        return _mz.fs.utimes(someFile, Date.now() / 1000, Date.now() / 1000).then(function () {
          return watcher;
        });
      }).then(function (watcher) {
        return whenFilesChanged.then(function () {
          watcher.close();
          _sinon2.default.assert.calledOnce(onChange);
          // This delay seems to avoid stat errors from the watcher
          // which can happen when the temp dir is deleted (presumably
          // before watcher.close() has removed all listeners).
          return new Promise(function (resolve) {
            return setTimeout(resolve, 2);
          });
        });
      });
    });
  });

  (0, _mocha.describe)('proxyFileChanges', function () {

    var defaults = {
      artifactsDir: '/some/artifacts/dir/',
      onChange: function onChange() {},
      shouldWatchFile: function shouldWatchFile() {
        return true;
      }
    };

    (0, _mocha.it)('proxies file changes', function () {
      var onChange = _sinon2.default.spy(function () {});
      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, defaults, {
        filePath: '/some/file.js',
        onChange: onChange
      }));
      _sinon2.default.assert.called(onChange);
    });

    (0, _mocha.it)('ignores changes to artifacts', function () {
      var onChange = _sinon2.default.spy(function () {});
      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, defaults, {
        filePath: '/some/artifacts/dir/build.xpi',
        artifactsDir: '/some/artifacts/dir/',
        onChange: onChange
      }));
      _sinon2.default.assert.notCalled(onChange);
    });

    (0, _mocha.it)('provides a callback for ignoring files', function () {

      function shouldWatchFile(filePath) {
        if (filePath === '/somewhere/freaky') {
          return false;
        } else {
          return true;
        }
      }

      var conf = (0, _extends3.default)({}, defaults, {
        shouldWatchFile: shouldWatchFile,
        onChange: _sinon2.default.spy(function () {})
      });

      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, conf, { filePath: '/somewhere/freaky' }));
      _sinon2.default.assert.notCalled(conf.onChange);
      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, conf, { filePath: '/any/file/' }));
      _sinon2.default.assert.called(conf.onChange);
    });
  });
});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mocha = __webpack_require__(4);

var _chai = __webpack_require__(5);

var _sinon = __webpack_require__(7);

var _sinon2 = _interopRequireDefault(_sinon);

var _main = __webpack_require__(245);

var _main2 = _interopRequireDefault(_main);

var _program = __webpack_require__(60);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('webExt', function () {
  (0, _mocha.it)('exposes main', function () {
    _chai.assert.equal(_main2.default.main, _program.main);
  });

  (0, _mocha.it)('gives you access to the log stream', function () {
    _chai.assert.equal(_main2.default.util.logger.consoleStream, _logger.consoleStream);
  });

  (0, _mocha.describe)('exposes commands', function () {
    var stub = void 0;
    (0, _mocha.afterEach)(function () {
      stub.restore();
      stub = undefined;
    });
    var _arr = ['run', 'lint', 'build', 'sign', 'docs'];

    var _loop = function _loop() {
      var cmd = _arr[_i];
      (0, _mocha.it)('lazily loads cmd/' + cmd, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var cmdModule, params, options, expectedResult, runCommand, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // TODO: use async import instead of require - https://github.com/mozilla/web-ext/issues/1306
                // $FLOW_IGNORE: non-literal require used only in tests.
                cmdModule = __webpack_require__(246)("./" + cmd);

                stub = _sinon2.default.stub(cmdModule, 'default');

                params = {};
                options = {};
                expectedResult = {};

                stub.returns(expectedResult);

                runCommand = _main2.default.cmd[cmd];
                _context.next = 9;
                return runCommand(params, options);

              case 9:
                result = _context.sent;


                // Check whether parameters and return values are forwarded as-is.
                _sinon2.default.assert.calledOnce(stub);
                _sinon2.default.assert.calledWithExactly(stub, params, options);
                _chai.assert.equal(expectedResult, result);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      })));
    };

    for (var _i = 0; _i < _arr.length; _i++) {
      _loop();
    }
  });
});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _program = __webpack_require__(60);

var _cmd = __webpack_require__(34);

var _cmd2 = _interopRequireDefault(_cmd);

var _logger = __webpack_require__(0);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This only exposes util/logger so far.
// Do we need anything else?
var util = { logger: logger };
exports.default = { main: _program.main, cmd: _cmd2.default, util: util };

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 34,
	"./build": 31,
	"./build.js": 31,
	"./docs": 55,
	"./docs.js": 55,
	"./index": 34,
	"./index.js": 34,
	"./lint": 56,
	"./lint.js": 56,
	"./run": 57,
	"./run.js": 57,
	"./sign": 59,
	"./sign.js": 59
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 246;

/***/ })
/******/ ]);
//# sourceMappingURL=unit-tests.js.map