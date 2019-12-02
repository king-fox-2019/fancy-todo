// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
$(document).ready(function () {
  var token = localStorage.getItem('token');

  if (token) {
    $('#zero-todo').hide();
    $('#todo').show();
    $('#register').hide();
    $('#login').hide();
    $('#action-btn').show();
    todo();
    $('#logout-btn').on('click', function () {
      $('#action-btn').hide();
      $('#login').show();
      signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('_id');
    });
  } else {
    $('#zero-todo').hide();
    $('#login').show();
    $('#todo').hide();
    $('#register').hide();
    $('#action-btn').hide();
  }

  $('#back-btn').on('click', function () {
    $('#register').hide();
    $('#login').show();
  });
  $('#register-btn').on('click', function () {
    $('#login').hide();
    $('#register').show();
  });
});

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.

  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  $.ajax({
    method: 'POST',
    url: 'http://34.87.87.140/users/googlesignin',
    data: {
      id_token: id_token
    }
  }).done(function (response) {
    $('#login').hide();
    $('#action-btn').show();
    console.log(response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('_id', response.userDetails._id);
    todo();
  }).fail(function (err) {
    console.log(err.responseJSON);
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('#login').show();
  $('#action-btn').hide();
  $('#todo').hide();
  $('#zero-todo').hide();
}

function signIn() {
  event.preventDefault();
  $.ajax({
    method: 'POST',
    url: 'http://34.87.87.140/users/signin',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    }
  }).done(function (response) {
    $('#login').hide();
    $('#action-btn').show();
    $('#todo').show();
    console.log(response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('_id', response.userDetails._id);
    todo();
  }).fail(function (err) {
    console.log(err.responseJSON);
  });
}

function register() {
  event.preventDefault();
  var firstName = $('#first_name').val();
  var lastName = $('#last_name').val();
  var email = $('#new-email').val();
  var password = $('#new-password').val();
  $.ajax({
    url: 'http://34.87.87.140/users/register',
    method: 'POST',
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
  }).done(function (response) {
    console.log(response);
    $('#register').hide();
    $('#login').show();
  }).fail(function (err) {
    console.log(err.responseJSON);
  });
}

function todo() {
  $('#todo-content').empty();
  $('#description').empty();
  var id = localStorage.getItem('_id');
  $.ajax({
    url: "http://34.87.87.140/todos/".concat(id),
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  }).done(function (response) {
    if (response.length == 0) {
      $('#todo').hide();
      $('#zero-todo').show();
    } else {
      $('#todo').show();
      $('#zero-todo').hide();
      response.forEach(function (list) {
        var label;
        var completeDate;

        if (list.status == false) {
          label = "<label>\n                                <input type=\"checkbox\" class=\"custom-control-input\" onclick=\"update('".concat(list._id, "')\"/>\n                                <span>Uncompleted</span>\n                              </label>");
        } else {
          label = "<label>\n                                <input type=\"checkbox\" class=\"custom-control-input\" onclick=\"update('".concat(list._id, "') checked\"/>\n                                <span>Completed</span>\n                            </label>");
        }

        if (list.completedAt !== null) {
          completeDate = new Date(list.completedAt).toDateString();
        } else {
          completeDate = null;
        }

        $('#todo-content').append("<tr>\n                        <td>".concat(label, "</td>\n                        <td>").concat(list.title, "</td>\n                        <td>").concat(new Date(list.createdAt).toDateString(), "</td>\n                        <td>").concat(completeDate, "</td>\n                        <td>").concat(list.description, "</td>\n                        <td>").concat(new Date(list.dueDate).toDateString(), "</td>\n                        <td>").concat(list.dueTime, "</td>\n                        <td> <a class=\"btn-floating btn-small waves-effect waves-light red\" onclick=\"deleteTodo('").concat(list._id, "')\"><i class=\"material-icons\">X</i></a></td>\n                    </tr>"));
      });
      $('#todo-content').show();
      $('#description').show();
    }

    console.log(response);
  }).fail(function (err) {
    console.log(err.responseJSON);
  });
}

function addTodo() {
  $.ajax({
    url: 'http://34.87.87.140/todos',
    method: 'POST',
    data: {
      title: $('#title').val(),
      description: $('textarea#description').val(),
      status: false,
      dueDate: new Date($('#dueDate').val()),
      dueTime: $('#dueTime').val(),
      createdAt: new Date(),
      completedAt: null,
      userId: localStorage.getItem('_id')
    },
    headers: {
      token: localStorage.getItem('token')
    }
  }).done(function (response) {
    var _response$todoDetails = response.todoDetails,
        status = _response$todoDetails.status,
        title = _response$todoDetails.title,
        createdAt = _response$todoDetails.createdAt,
        description = _response$todoDetails.description,
        completedAt = _response$todoDetails.completedAt,
        dueDate = _response$todoDetails.dueDate;

    if (status == true) {
      status = "<label>\n                            <input type=\"checkbox\" class=\"filled-in\" checked=\"checked\" />\n                            <span>Completed</span>\n                       </label>";
    } else {
      status = " <label>\n                            <input type=\"checkbox\" class=\"filled-in\"/>\n                            <span>Uncompleted</span>\n                       </label>";
    }

    console.log(completedAt);
    $('#todo-content').append("<tr>\n                <td>".concat(status, "</td>\n                <td>").concat(title, "</td>\n                <td>").concat(new Date(createdAt).toDateString(), "</td>\n                <td>").concat(completedAt, "</td>\n                <td>").concat(description, "</td>\n                <td>").concat(new Date(dueDate).toDateString(), "</td>\n                <td><a class=\"btn-floating btn-small waves-effect waves-light red\")><i class=\"material-icons\">delete</i></a></td>\n            </tr>"));
    todo();
    console.log(response);
  }).fail(function (err) {
    console.log(err.responseJSON);
  });
}

function update(idTodo) {
  $.ajax({
    url: "http://34.87.87.140/todos/".concat(idTodo),
    method: 'PUT',
    headers: {
      token: localStorage.getItem('token')
    }
  }).done(function (response) {
    todo();
    console.log(response);
  }).fail(function (err) {
    console.log(err.responseJSON);
  });
}

function deleteTodo(idTodo) {
  $.ajax({
    url: "http://34.87.87.140/todos/".concat(idTodo),
    method: 'DELETE',
    headers: {
      token: localStorage.getItem('token')
    }
  }).done(function (response) {
    todo();
    console.log(response);
  }).fail(function (err) {
    console.log(err.responseJSON);
  });
}
},{}],"../../../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40343" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map