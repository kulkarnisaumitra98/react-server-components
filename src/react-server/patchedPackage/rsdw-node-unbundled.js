/* Original module :-
- node_modules/react-server-dom-webpack/react-server-dom-webpack-client.node.unbundled.development.js
- Modified preloadModule function
*/

/**
 * @license React
 * react-server-dom-webpack-client.node.unbundled.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    function _defineProperty(obj, key, value) {
      key in obj
        ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (obj[key] = value);
      return obj;
    }
    function warn(format) {
      for (
        var _len = arguments.length,
          args = Array(1 < _len ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      )
        args[_key - 1] = arguments[_key];
      printWarning("warn", format, args, Error("react-stack-top-frame"));
    }
    function error$jscomp$0(format) {
      for (
        var _len2 = arguments.length,
          args = Array(1 < _len2 ? _len2 - 1 : 0),
          _key2 = 1;
        _key2 < _len2;
        _key2++
      )
        args[_key2 - 1] = arguments[_key2];
      printWarning("error", format, args, Error("react-stack-top-frame"));
    }
    function printWarning(level, format, args, currentStack) {
      ReactSharedInternals.getCurrentStack &&
        ((currentStack = ReactSharedInternals.getCurrentStack(currentStack)),
        "" !== currentStack &&
          ((format += "%s"), (args = args.concat([currentStack]))));
      args.unshift(format);
      Function.prototype.apply.call(console[level], console, args);
    }
    function resolveClientReference(bundlerConfig, metadata) {
      var moduleExports = bundlerConfig[metadata[0]];
      if ((bundlerConfig = moduleExports[metadata[2]]))
        moduleExports = bundlerConfig.name;
      else {
        bundlerConfig = moduleExports["*"];
        if (!bundlerConfig)
          throw Error(
            'Could not find the module "' +
              metadata[0] +
              '" in the React SSR Manifest. This is probably a bug in the React Server Components bundler.',
          );
        moduleExports = metadata[2];
      }
      return {
        specifier: bundlerConfig.specifier,
        name: moduleExports,
        async: 4 === metadata.length,
      };
    }
    function preloadModule(metadata) {
      var existingPromise = asyncModuleCache.get(metadata.specifier);
      if (existingPromise)
        return "fulfilled" === existingPromise.status ? null : existingPromise;
      var modulePromise = import(metadata.specifier);
      metadata.async &&
        (modulePromise = modulePromise.then(function (value) {
          return value.default;
        }));
      modulePromise.then(
        function (value) {
          var fulfilledThenable = modulePromise;
          fulfilledThenable.status = "fulfilled";
          // Patch for node_modules, need to extract default attribute for dynamic import to work for commonjs turned esm modules
          fulfilledThenable.value = value.default;
        },
        function (reason) {
          var rejectedThenable = modulePromise;
          rejectedThenable.status = "rejected";
          rejectedThenable.reason = reason;
        },
      );
      asyncModuleCache.set(metadata.specifier, modulePromise);
      return modulePromise;
    }
    function prepareDestinationWithChunks(
      moduleLoading,
      chunks,
      nonce$jscomp$0,
    ) {
      if (null !== moduleLoading)
        for (var i = 1; i < chunks.length; i += 2) {
          var nonce = nonce$jscomp$0,
            JSCompiler_temp_const = ReactDOMSharedInternals.d,
            JSCompiler_temp_const$jscomp$0 = JSCompiler_temp_const.X,
            JSCompiler_temp_const$jscomp$1 = moduleLoading.prefix + chunks[i];
          var JSCompiler_inline_result = moduleLoading.crossOrigin;
          JSCompiler_inline_result =
            "string" === typeof JSCompiler_inline_result
              ? "use-credentials" === JSCompiler_inline_result
                ? JSCompiler_inline_result
                : ""
              : void 0;
          JSCompiler_temp_const$jscomp$0.call(
            JSCompiler_temp_const,
            JSCompiler_temp_const$jscomp$1,
            { crossOrigin: JSCompiler_inline_result, nonce: nonce },
          );
        }
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable =
        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
        maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function isObjectPrototype(object) {
      if (!object) return !1;
      var ObjectPrototype = Object.prototype;
      if (object === ObjectPrototype) return !0;
      if (getPrototypeOf(object)) return !1;
      object = Object.getOwnPropertyNames(object);
      for (var i = 0; i < object.length; i++)
        if (!(object[i] in ObjectPrototype)) return !1;
      return !0;
    }
    function isSimpleObject(object) {
      if (!isObjectPrototype(getPrototypeOf(object))) return !1;
      for (
        var names = Object.getOwnPropertyNames(object), i = 0;
        i < names.length;
        i++
      ) {
        var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
        if (
          !descriptor ||
          (!descriptor.enumerable &&
            (("key" !== names[i] && "ref" !== names[i]) ||
              "function" !== typeof descriptor.get))
        )
          return !1;
      }
      return !0;
    }
    function objectName(object) {
      return Object.prototype.toString
        .call(object)
        .replace(/^\[object (.*)\]$/, function (m, p0) {
          return p0;
        });
    }
    function describeKeyForErrorMessage(key) {
      var encodedKey = JSON.stringify(key);
      return '"' + key + '"' === encodedKey ? key : encodedKey;
    }
    function describeValueForErrorMessage(value) {
      switch (typeof value) {
        case "string":
          return JSON.stringify(
            10 >= value.length ? value : value.slice(0, 10) + "...",
          );
        case "object":
          if (isArrayImpl(value)) return "[...]";
          if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG)
            return "client";
          value = objectName(value);
          return "Object" === value ? "{...}" : value;
        case "function":
          return value.$$typeof === CLIENT_REFERENCE_TAG
            ? "client"
            : (value = value.displayName || value.name)
              ? "function " + value
              : "function";
        default:
          return String(value);
      }
    }
    function describeElementType(type) {
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeElementType(type.render);
          case REACT_MEMO_TYPE:
            return describeElementType(type.type);
          case REACT_LAZY_TYPE:
            var payload = type._payload;
            type = type._init;
            try {
              return describeElementType(type(payload));
            } catch (x) {}
        }
      return "";
    }
    function describeObjectForErrorMessage(objectOrArray, expandedName) {
      var objKind = objectName(objectOrArray);
      if ("Object" !== objKind && "Array" !== objKind) return objKind;
      var start = -1,
        length = 0;
      if (isArrayImpl(objectOrArray))
        if (jsxChildrenParents.has(objectOrArray)) {
          var type = jsxChildrenParents.get(objectOrArray);
          objKind = "<" + describeElementType(type) + ">";
          for (var i = 0; i < objectOrArray.length; i++) {
            var value = objectOrArray[i];
            value =
              "string" === typeof value
                ? value
                : "object" === typeof value && null !== value
                  ? "{" + describeObjectForErrorMessage(value) + "}"
                  : "{" + describeValueForErrorMessage(value) + "}";
            "" + i === expandedName
              ? ((start = objKind.length),
                (length = value.length),
                (objKind += value))
              : (objKind =
                  15 > value.length && 40 > objKind.length + value.length
                    ? objKind + value
                    : objKind + "{...}");
          }
          objKind += "</" + describeElementType(type) + ">";
        } else {
          objKind = "[";
          for (type = 0; type < objectOrArray.length; type++)
            0 < type && (objKind += ", "),
              (i = objectOrArray[type]),
              (i =
                "object" === typeof i && null !== i
                  ? describeObjectForErrorMessage(i)
                  : describeValueForErrorMessage(i)),
              "" + type === expandedName
                ? ((start = objKind.length),
                  (length = i.length),
                  (objKind += i))
                : (objKind =
                    10 > i.length && 40 > objKind.length + i.length
                      ? objKind + i
                      : objKind + "...");
          objKind += "]";
        }
      else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE)
        objKind = "<" + describeElementType(objectOrArray.type) + "/>";
      else {
        if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
        if (jsxPropsParents.has(objectOrArray)) {
          objKind = jsxPropsParents.get(objectOrArray);
          objKind = "<" + (describeElementType(objKind) || "...");
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++) {
            objKind += " ";
            value = type[i];
            objKind += describeKeyForErrorMessage(value) + "=";
            var _value2 = objectOrArray[value];
            var _substr2 =
              value === expandedName &&
              "object" === typeof _value2 &&
              null !== _value2
                ? describeObjectForErrorMessage(_value2)
                : describeValueForErrorMessage(_value2);
            "string" !== typeof _value2 && (_substr2 = "{" + _substr2 + "}");
            value === expandedName
              ? ((start = objKind.length),
                (length = _substr2.length),
                (objKind += _substr2))
              : (objKind =
                  10 > _substr2.length && 40 > objKind.length + _substr2.length
                    ? objKind + _substr2
                    : objKind + "...");
          }
          objKind += ">";
        } else {
          objKind = "{";
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++)
            0 < i && (objKind += ", "),
              (value = type[i]),
              (objKind += describeKeyForErrorMessage(value) + ": "),
              (_value2 = objectOrArray[value]),
              (_value2 =
                "object" === typeof _value2 && null !== _value2
                  ? describeObjectForErrorMessage(_value2)
                  : describeValueForErrorMessage(_value2)),
              value === expandedName
                ? ((start = objKind.length),
                  (length = _value2.length),
                  (objKind += _value2))
                : (objKind =
                    10 > _value2.length && 40 > objKind.length + _value2.length
                      ? objKind + _value2
                      : objKind + "...");
          objKind += "}";
        }
      }
      return void 0 === expandedName
        ? objKind
        : -1 < start && 0 < length
          ? ((objectOrArray = " ".repeat(start) + "^".repeat(length)),
            "\n  " + objKind + "\n  " + objectOrArray)
          : "\n  " + objKind;
    }
    function serializeNumber(number) {
      return Number.isFinite(number)
        ? 0 === number && -Infinity === 1 / number
          ? "$-0"
          : number
        : Infinity === number
          ? "$Infinity"
          : -Infinity === number
            ? "$-Infinity"
            : "$NaN";
    }
    function processReply(
      root,
      formFieldPrefix,
      temporaryReferences,
      resolve,
      reject,
    ) {
      function serializeTypedArray(tag, typedArray) {
        typedArray = new Blob([
          new Uint8Array(
            typedArray.buffer,
            typedArray.byteOffset,
            typedArray.byteLength,
          ),
        ]);
        var blobId = nextPartId++;
        null === formData && (formData = new FormData());
        formData.append(formFieldPrefix + blobId, typedArray);
        return "$" + tag + blobId.toString(16);
      }
      function serializeBinaryReader(reader) {
        function progress(entry) {
          entry.done
            ? ((entry = nextPartId++),
              data.append(formFieldPrefix + entry, new Blob(buffer)),
              data.append(
                formFieldPrefix + streamId,
                '"$o' + entry.toString(16) + '"',
              ),
              data.append(formFieldPrefix + streamId, "C"),
              pendingParts--,
              0 === pendingParts && resolve(data))
            : (buffer.push(entry.value),
              reader.read(new Uint8Array(1024)).then(progress, reject));
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++,
          buffer = [];
        reader.read(new Uint8Array(1024)).then(progress, reject);
        return "$r" + streamId.toString(16);
      }
      function serializeReader(reader) {
        function progress(entry) {
          if (entry.done)
            data.append(formFieldPrefix + streamId, "C"),
              pendingParts--,
              0 === pendingParts && resolve(data);
          else
            try {
              var partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, partJSON);
              reader.read().then(progress, reject);
            } catch (x) {
              reject(x);
            }
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++;
        reader.read().then(progress, reject);
        return "$R" + streamId.toString(16);
      }
      function serializeReadableStream(stream) {
        try {
          var binaryReader = stream.getReader({ mode: "byob" });
        } catch (x) {
          return serializeReader(stream.getReader());
        }
        return serializeBinaryReader(binaryReader);
      }
      function serializeAsyncIterable(iterable, iterator) {
        function progress(entry) {
          if (entry.done) {
            if (void 0 === entry.value)
              data.append(formFieldPrefix + streamId, "C");
            else
              try {
                var partJSON = JSON.stringify(entry.value, resolveToJSON);
                data.append(formFieldPrefix + streamId, "C" + partJSON);
              } catch (x) {
                reject(x);
                return;
              }
            pendingParts--;
            0 === pendingParts && resolve(data);
          } else
            try {
              var _partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, _partJSON);
              iterator.next().then(progress, reject);
            } catch (x$0) {
              reject(x$0);
            }
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++;
        iterable = iterable === iterator;
        iterator.next().then(progress, reject);
        return "$" + (iterable ? "x" : "X") + streamId.toString(16);
      }
      function resolveToJSON(key, value) {
        var originalValue = this[key];
        "object" !== typeof originalValue ||
          originalValue === value ||
          originalValue instanceof Date ||
          ("Object" !== objectName(originalValue)
            ? error$jscomp$0(
                "Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s",
                objectName(originalValue),
                describeObjectForErrorMessage(this, key),
              )
            : error$jscomp$0(
                "Only plain objects can be passed to Server Functions from the Client. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s",
                describeObjectForErrorMessage(this, key),
              ));
        if (null === value) return null;
        if ("object" === typeof value) {
          switch (value.$$typeof) {
            case REACT_ELEMENT_TYPE:
              if (void 0 !== temporaryReferences && -1 === key.indexOf(":")) {
                var parentReference = writtenObjects.get(this);
                if (void 0 !== parentReference)
                  return (
                    temporaryReferences.set(parentReference + ":" + key, value),
                    "$T"
                  );
              }
              throw Error(
                "React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options." +
                  describeObjectForErrorMessage(this, key),
              );
            case REACT_LAZY_TYPE:
              originalValue = value._payload;
              var init = value._init;
              null === formData && (formData = new FormData());
              pendingParts++;
              try {
                parentReference = init(originalValue);
                var lazyId = nextPartId++,
                  partJSON = serializeModel(parentReference, lazyId);
                formData.append(formFieldPrefix + lazyId, partJSON);
                return "$" + lazyId.toString(16);
              } catch (x) {
                if (
                  "object" === typeof x &&
                  null !== x &&
                  "function" === typeof x.then
                ) {
                  pendingParts++;
                  var _lazyId = nextPartId++;
                  parentReference = function () {
                    try {
                      var _partJSON2 = serializeModel(value, _lazyId),
                        _data = formData;
                      _data.append(formFieldPrefix + _lazyId, _partJSON2);
                      pendingParts--;
                      0 === pendingParts && resolve(_data);
                    } catch (reason) {
                      reject(reason);
                    }
                  };
                  x.then(parentReference, parentReference);
                  return "$" + _lazyId.toString(16);
                }
                reject(x);
                return null;
              } finally {
                pendingParts--;
              }
          }
          if ("function" === typeof value.then) {
            null === formData && (formData = new FormData());
            pendingParts++;
            var promiseId = nextPartId++;
            value.then(function (partValue) {
              try {
                var _partJSON3 = serializeModel(partValue, promiseId);
                partValue = formData;
                partValue.append(formFieldPrefix + promiseId, _partJSON3);
                pendingParts--;
                0 === pendingParts && resolve(partValue);
              } catch (reason) {
                reject(reason);
              }
            }, reject);
            return "$@" + promiseId.toString(16);
          }
          parentReference = writtenObjects.get(value);
          if (void 0 !== parentReference)
            if (modelRoot === value) modelRoot = null;
            else return parentReference;
          else
            -1 === key.indexOf(":") &&
              ((parentReference = writtenObjects.get(this)),
              void 0 !== parentReference &&
                ((parentReference = parentReference + ":" + key),
                writtenObjects.set(value, parentReference),
                void 0 !== temporaryReferences &&
                  temporaryReferences.set(parentReference, value)));
          if (isArrayImpl(value)) return value;
          if (value instanceof FormData) {
            null === formData && (formData = new FormData());
            var _data3 = formData;
            key = nextPartId++;
            var prefix = formFieldPrefix + key + "_";
            value.forEach(function (originalValue, originalKey) {
              _data3.append(prefix + originalKey, originalValue);
            });
            return "$K" + key.toString(16);
          }
          if (value instanceof Map)
            return (
              (key = nextPartId++),
              (parentReference = serializeModel(Array.from(value), key)),
              null === formData && (formData = new FormData()),
              formData.append(formFieldPrefix + key, parentReference),
              "$Q" + key.toString(16)
            );
          if (value instanceof Set)
            return (
              (key = nextPartId++),
              (parentReference = serializeModel(Array.from(value), key)),
              null === formData && (formData = new FormData()),
              formData.append(formFieldPrefix + key, parentReference),
              "$W" + key.toString(16)
            );
          if (value instanceof ArrayBuffer)
            return (
              (key = new Blob([value])),
              (parentReference = nextPartId++),
              null === formData && (formData = new FormData()),
              formData.append(formFieldPrefix + parentReference, key),
              "$A" + parentReference.toString(16)
            );
          if (value instanceof Int8Array)
            return serializeTypedArray("O", value);
          if (value instanceof Uint8Array)
            return serializeTypedArray("o", value);
          if (value instanceof Uint8ClampedArray)
            return serializeTypedArray("U", value);
          if (value instanceof Int16Array)
            return serializeTypedArray("S", value);
          if (value instanceof Uint16Array)
            return serializeTypedArray("s", value);
          if (value instanceof Int32Array)
            return serializeTypedArray("L", value);
          if (value instanceof Uint32Array)
            return serializeTypedArray("l", value);
          if (value instanceof Float32Array)
            return serializeTypedArray("G", value);
          if (value instanceof Float64Array)
            return serializeTypedArray("g", value);
          if (value instanceof BigInt64Array)
            return serializeTypedArray("M", value);
          if (value instanceof BigUint64Array)
            return serializeTypedArray("m", value);
          if (value instanceof DataView) return serializeTypedArray("V", value);
          if ("function" === typeof Blob && value instanceof Blob)
            return (
              null === formData && (formData = new FormData()),
              (key = nextPartId++),
              formData.append(formFieldPrefix + key, value),
              "$B" + key.toString(16)
            );
          if ((parentReference = getIteratorFn(value)))
            return (
              (parentReference = parentReference.call(value)),
              parentReference === value
                ? ((key = nextPartId++),
                  (parentReference = serializeModel(
                    Array.from(parentReference),
                    key,
                  )),
                  null === formData && (formData = new FormData()),
                  formData.append(formFieldPrefix + key, parentReference),
                  "$i" + key.toString(16))
                : Array.from(parentReference)
            );
          if (
            "function" === typeof ReadableStream &&
            value instanceof ReadableStream
          )
            return serializeReadableStream(value);
          parentReference = value[ASYNC_ITERATOR];
          if ("function" === typeof parentReference)
            return serializeAsyncIterable(value, parentReference.call(value));
          parentReference = getPrototypeOf(value);
          if (
            parentReference !== ObjectPrototype &&
            (null === parentReference ||
              null !== getPrototypeOf(parentReference))
          ) {
            if (void 0 === temporaryReferences)
              throw Error(
                "Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported." +
                  describeObjectForErrorMessage(this, key),
              );
            return "$T";
          }
          value.$$typeof === REACT_CONTEXT_TYPE
            ? error$jscomp$0(
                "React Context Providers cannot be passed to Server Functions from the Client.%s",
                describeObjectForErrorMessage(this, key),
              )
            : "Object" !== objectName(value)
              ? error$jscomp$0(
                  "Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s",
                  objectName(value),
                  describeObjectForErrorMessage(this, key),
                )
              : isSimpleObject(value)
                ? Object.getOwnPropertySymbols &&
                  ((parentReference = Object.getOwnPropertySymbols(value)),
                  0 < parentReference.length &&
                    error$jscomp$0(
                      "Only plain objects can be passed to Server Functions from the Client. Objects with symbol properties like %s are not supported.%s",
                      parentReference[0].description,
                      describeObjectForErrorMessage(this, key),
                    ))
                : error$jscomp$0(
                    "Only plain objects can be passed to Server Functions from the Client. Classes or other objects with methods are not supported.%s",
                    describeObjectForErrorMessage(this, key),
                  );
          return value;
        }
        if ("string" === typeof value) {
          if ("Z" === value[value.length - 1] && this[key] instanceof Date)
            return "$D" + value;
          key = "$" === value[0] ? "$" + value : value;
          return key;
        }
        if ("boolean" === typeof value) return value;
        if ("number" === typeof value) return serializeNumber(value);
        if ("undefined" === typeof value) return "$undefined";
        if ("function" === typeof value) {
          parentReference = knownServerReferences.get(value);
          if (void 0 !== parentReference)
            return (
              (key = JSON.stringify(parentReference, resolveToJSON)),
              null === formData && (formData = new FormData()),
              (parentReference = nextPartId++),
              formData.set(formFieldPrefix + parentReference, key),
              "$F" + parentReference.toString(16)
            );
          if (
            void 0 !== temporaryReferences &&
            -1 === key.indexOf(":") &&
            ((parentReference = writtenObjects.get(this)),
            void 0 !== parentReference)
          )
            return (
              temporaryReferences.set(parentReference + ":" + key, value), "$T"
            );
          throw Error(
            "Client Functions cannot be passed directly to Server Functions. Only Functions passed from the Server can be passed back again.",
          );
        }
        if ("symbol" === typeof value) {
          if (
            void 0 !== temporaryReferences &&
            -1 === key.indexOf(":") &&
            ((parentReference = writtenObjects.get(this)),
            void 0 !== parentReference)
          )
            return (
              temporaryReferences.set(parentReference + ":" + key, value), "$T"
            );
          throw Error(
            "Symbols cannot be passed to a Server Function without a temporary reference set. Pass a TemporaryReferenceSet to the options." +
              describeObjectForErrorMessage(this, key),
          );
        }
        if ("bigint" === typeof value) return "$n" + value.toString(10);
        throw Error(
          "Type " +
            typeof value +
            " is not supported as an argument to a Server Function.",
        );
      }
      function serializeModel(model, id) {
        "object" === typeof model &&
          null !== model &&
          ((id = "$" + id.toString(16)),
          writtenObjects.set(model, id),
          void 0 !== temporaryReferences && temporaryReferences.set(id, model));
        modelRoot = model;
        return JSON.stringify(model, resolveToJSON);
      }
      var nextPartId = 1,
        pendingParts = 0,
        formData = null,
        writtenObjects = new WeakMap(),
        modelRoot = root;
      root = serializeModel(root, 0);
      null === formData
        ? resolve(root)
        : (formData.set(formFieldPrefix + "0", root),
          0 === pendingParts && resolve(formData));
    }
    function encodeFormData(reference) {
      var resolve,
        reject,
        thenable = new Promise(function (res, rej) {
          resolve = res;
          reject = rej;
        });
      processReply(
        reference,
        "",
        void 0,
        function (body) {
          if ("string" === typeof body) {
            var data = new FormData();
            data.append("0", body);
            body = data;
          }
          thenable.status = "fulfilled";
          thenable.value = body;
          resolve(body);
        },
        function (e) {
          thenable.status = "rejected";
          thenable.reason = e;
          reject(e);
        },
      );
      return thenable;
    }
    function defaultEncodeFormAction(identifierPrefix) {
      var reference = knownServerReferences.get(this);
      if (!reference)
        throw Error(
          "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React.",
        );
      var data = null;
      if (null !== reference.bound) {
        data = boundCache.get(reference);
        data ||
          ((data = encodeFormData(reference)), boundCache.set(reference, data));
        if ("rejected" === data.status) throw data.reason;
        if ("fulfilled" !== data.status) throw data;
        reference = data.value;
        var prefixedData = new FormData();
        reference.forEach(function (value, key) {
          prefixedData.append("$ACTION_" + identifierPrefix + ":" + key, value);
        });
        data = prefixedData;
        reference = "$ACTION_REF_" + identifierPrefix;
      } else reference = "$ACTION_ID_" + reference.id;
      return {
        name: reference,
        method: "POST",
        encType: "multipart/form-data",
        data: data,
      };
    }
    function isSignatureEqual(referenceId, numberOfBoundArgs) {
      var reference = knownServerReferences.get(this);
      if (!reference)
        throw Error(
          "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React.",
        );
      if (reference.id !== referenceId) return !1;
      var boundPromise = reference.bound;
      if (null === boundPromise) return 0 === numberOfBoundArgs;
      switch (boundPromise.status) {
        case "fulfilled":
          return boundPromise.value.length === numberOfBoundArgs;
        case "pending":
          throw boundPromise;
        case "rejected":
          throw boundPromise.reason;
        default:
          throw (
            ("string" !== typeof boundPromise.status &&
              ((boundPromise.status = "pending"),
              boundPromise.then(
                function (boundArgs) {
                  boundPromise.status = "fulfilled";
                  boundPromise.value = boundArgs;
                },
                function (error) {
                  boundPromise.status = "rejected";
                  boundPromise.reason = error;
                },
              )),
            boundPromise)
          );
      }
    }
    function registerServerReference(
      proxy,
      reference$jscomp$0,
      encodeFormAction,
    ) {
      Object.defineProperties(proxy, {
        $$FORM_ACTION: {
          value:
            void 0 === encodeFormAction
              ? defaultEncodeFormAction
              : function () {
                  var reference = knownServerReferences.get(this);
                  if (!reference)
                    throw Error(
                      "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React.",
                    );
                  var boundPromise = reference.bound;
                  null === boundPromise && (boundPromise = Promise.resolve([]));
                  return encodeFormAction(reference.id, boundPromise);
                },
        },
        $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
        bind: { value: bind },
      });
      knownServerReferences.set(proxy, reference$jscomp$0);
    }
    function bind() {
      var newFn = FunctionBind.apply(this, arguments),
        reference = knownServerReferences.get(this);
      if (reference) {
        null != arguments[0] &&
          error$jscomp$0(
            'Cannot bind "this" of a Server Action. Pass null or undefined as the first argument to .bind().',
          );
        var args = ArraySlice.call(arguments, 1),
          boundPromise = null;
        boundPromise =
          null !== reference.bound
            ? Promise.resolve(reference.bound).then(function (boundArgs) {
                return boundArgs.concat(args);
              })
            : Promise.resolve(args);
        Object.defineProperties(newFn, {
          $$FORM_ACTION: { value: this.$$FORM_ACTION },
          $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
          bind: { value: bind },
        });
        knownServerReferences.set(newFn, {
          id: reference.id,
          bound: boundPromise,
        });
      }
      return newFn;
    }
    function createServerReference$1(id, callServer, encodeFormAction) {
      function proxy() {
        var args = Array.prototype.slice.call(arguments);
        return callServer(id, args);
      }
      registerServerReference(proxy, { id: id, bound: null }, encodeFormAction);
      return proxy;
    }
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE
          ? null
          : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (
          ("number" === typeof type.tag &&
            error$jscomp$0(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
            ),
          type.$$typeof)
        ) {
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type ||
              ((type = innerType.displayName || innerType.name || ""),
              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
            return type;
          case REACT_MEMO_TYPE:
            return (
              (innerType = type.displayName || null),
              null !== innerType
                ? innerType
                : getComponentNameFromType(type.type) || "Memo"
            );
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function Chunk(status, value, reason, response) {
      this.status = status;
      this.value = value;
      this.reason = reason;
      this._response = response;
      this._debugInfo = null;
    }
    function readChunk(chunk) {
      switch (chunk.status) {
        case "resolved_model":
          initializeModelChunk(chunk);
          break;
        case "resolved_module":
          initializeModuleChunk(chunk);
      }
      switch (chunk.status) {
        case "fulfilled":
          return chunk.value;
        case "pending":
        case "blocked":
          throw chunk;
        default:
          throw chunk.reason;
      }
    }
    function createPendingChunk(response) {
      return new Chunk("pending", null, null, response);
    }
    function wakeChunk(listeners, value) {
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])(value);
    }
    function wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners) {
      switch (chunk.status) {
        case "fulfilled":
          wakeChunk(resolveListeners, chunk.value);
          break;
        case "pending":
        case "blocked":
          if (chunk.value)
            for (var i = 0; i < resolveListeners.length; i++)
              chunk.value.push(resolveListeners[i]);
          else chunk.value = resolveListeners;
          if (chunk.reason) {
            if (rejectListeners)
              for (
                resolveListeners = 0;
                resolveListeners < rejectListeners.length;
                resolveListeners++
              )
                chunk.reason.push(rejectListeners[resolveListeners]);
          } else chunk.reason = rejectListeners;
          break;
        case "rejected":
          rejectListeners && wakeChunk(rejectListeners, chunk.reason);
      }
    }
    function triggerErrorOnChunk(chunk, error) {
      if ("pending" !== chunk.status && "blocked" !== chunk.status)
        chunk.reason.error(error);
      else {
        var listeners = chunk.reason;
        chunk.status = "rejected";
        chunk.reason = error;
        null !== listeners && wakeChunk(listeners, error);
      }
    }
    function createResolvedIteratorResultChunk(response, value, done) {
      return new Chunk(
        "resolved_model",
        (done ? '{"done":true,"value":' : '{"done":false,"value":') +
          value +
          "}",
        null,
        response,
      );
    }
    function resolveIteratorResultChunk(chunk, value, done) {
      resolveModelChunk(
        chunk,
        (done ? '{"done":true,"value":' : '{"done":false,"value":') +
          value +
          "}",
      );
    }
    function resolveModelChunk(chunk, value) {
      if ("pending" !== chunk.status) chunk.reason.enqueueModel(value);
      else {
        var resolveListeners = chunk.value,
          rejectListeners = chunk.reason;
        chunk.status = "resolved_model";
        chunk.value = value;
        null !== resolveListeners &&
          (initializeModelChunk(chunk),
          wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners));
      }
    }
    function resolveModuleChunk(chunk, value) {
      if ("pending" === chunk.status || "blocked" === chunk.status) {
        var resolveListeners = chunk.value,
          rejectListeners = chunk.reason;
        chunk.status = "resolved_module";
        chunk.value = value;
        null !== resolveListeners &&
          (initializeModuleChunk(chunk),
          wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners));
      }
    }
    function initializeModelChunk(chunk) {
      var prevHandler = initializingHandler;
      initializingHandler = null;
      var resolvedModel = chunk.value;
      chunk.status = "blocked";
      chunk.value = null;
      chunk.reason = null;
      try {
        var value = JSON.parse(resolvedModel, chunk._response._fromJSON),
          resolveListeners = chunk.value;
        null !== resolveListeners &&
          ((chunk.value = null),
          (chunk.reason = null),
          wakeChunk(resolveListeners, value));
        if (null !== initializingHandler) {
          if (initializingHandler.errored) throw initializingHandler.value;
          if (0 < initializingHandler.deps) {
            initializingHandler.value = value;
            initializingHandler.chunk = chunk;
            return;
          }
        }
        chunk.status = "fulfilled";
        chunk.value = value;
      } catch (error$1) {
        (chunk.status = "rejected"), (chunk.reason = error$1);
      } finally {
        initializingHandler = prevHandler;
      }
    }
    function initializeModuleChunk(chunk) {
      try {
        var metadata = chunk.value,
          promise = asyncModuleCache.get(metadata.specifier);
        if ("fulfilled" === promise.status) var moduleExports = promise.value;
        else throw promise.reason;
        var value =
          "*" === metadata.name
            ? moduleExports
            : "" === metadata.name
              ? moduleExports.default
              : moduleExports[metadata.name];
        chunk.status = "fulfilled";
        chunk.value = value;
      } catch (error$2) {
        (chunk.status = "rejected"), (chunk.reason = error$2);
      }
    }
    function reportGlobalError(response, error) {
      response._chunks.forEach(function (chunk) {
        "pending" === chunk.status && triggerErrorOnChunk(chunk, error);
      });
    }
    function nullRefGetter() {
      return null;
    }
    function createLazyChunkWrapper(chunk) {
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: chunk,
        _init: readChunk,
      };
      chunk = chunk._debugInfo || (chunk._debugInfo = []);
      lazyType._debugInfo = chunk;
      return lazyType;
    }
    function getChunk(response, id) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      chunk || ((chunk = createPendingChunk(response)), chunks.set(id, chunk));
      return chunk;
    }
    function waitForReference(
      referencedChunk,
      parentObject,
      key,
      response,
      map,
      path,
    ) {
      function fulfill(value) {
        for (var i = 1; i < path.length; i++) {
          for (; value.$$typeof === REACT_LAZY_TYPE; )
            if (((value = value._payload), value === handler.chunk))
              value = handler.value;
            else if ("fulfilled" === value.status) value = value.value;
            else {
              path.splice(0, i - 1);
              value.then(fulfill, reject);
              return;
            }
          value = value[path[i]];
        }
        parentObject[key] = map(response, value);
        "" === key &&
          null === handler.value &&
          (handler.value = parentObject[key]);
        handler.deps--;
        0 === handler.deps &&
          ((i = handler.chunk),
          null !== i &&
            "blocked" === i.status &&
            ((value = i.value),
            (i.status = "fulfilled"),
            (i.value = handler.value),
            null !== value && wakeChunk(value, handler.value)));
      }
      function reject(error) {
        if (!handler.errored) {
          var blockedValue = handler.value;
          handler.errored = !0;
          handler.value = error;
          var chunk = handler.chunk;
          null !== chunk &&
            "blocked" === chunk.status &&
            ("object" === typeof blockedValue &&
              null !== blockedValue &&
              blockedValue.$$typeof === REACT_ELEMENT_TYPE &&
              ((blockedValue = {
                name: getComponentNameFromType(blockedValue.type) || "",
                owner: blockedValue._owner,
              }),
              (chunk._debugInfo || (chunk._debugInfo = [])).push(blockedValue)),
            triggerErrorOnChunk(chunk, error));
        }
      }
      if (initializingHandler) {
        var handler = initializingHandler;
        handler.deps++;
      } else
        handler = initializingHandler = {
          parent: null,
          chunk: null,
          value: null,
          deps: 1,
          errored: !1,
        };
      referencedChunk.then(fulfill, reject);
      return null;
    }
    function createServerReferenceProxy(response, metaData) {
      function proxy() {
        var args = Array.prototype.slice.call(arguments),
          p = metaData.bound;
        return p
          ? "fulfilled" === p.status
            ? callServer(metaData.id, p.value.concat(args))
            : Promise.resolve(p).then(function (bound) {
                return callServer(metaData.id, bound.concat(args));
              })
          : callServer(metaData.id, args);
      }
      var callServer = response._callServer;
      registerServerReference(proxy, metaData, response._encodeFormAction);
      return proxy;
    }
    function getOutlinedModel(response, reference, parentObject, key, map) {
      reference = reference.split(":");
      var id = parseInt(reference[0], 16);
      id = getChunk(response, id);
      switch (id.status) {
        case "resolved_model":
          initializeModelChunk(id);
          break;
        case "resolved_module":
          initializeModuleChunk(id);
      }
      switch (id.status) {
        case "fulfilled":
          parentObject = id.value;
          for (key = 1; key < reference.length; key++)
            parentObject = parentObject[reference[key]];
          response = map(response, parentObject);
          id._debugInfo &&
            ("object" !== typeof response ||
              null === response ||
              (!isArrayImpl(response) &&
                "function" !== typeof response[ASYNC_ITERATOR] &&
                response.$$typeof !== REACT_ELEMENT_TYPE) ||
              response._debugInfo ||
              Object.defineProperty(response, "_debugInfo", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: id._debugInfo,
              }));
          return response;
        case "pending":
        case "blocked":
          return waitForReference(
            id,
            parentObject,
            key,
            response,
            map,
            reference,
          );
        default:
          return (
            initializingHandler
              ? ((initializingHandler.errored = !0),
                (initializingHandler.value = id.reason))
              : (initializingHandler = {
                  parent: null,
                  chunk: null,
                  value: id.reason,
                  deps: 0,
                  errored: !0,
                }),
            null
          );
      }
    }
    function createMap(response, model) {
      return new Map(model);
    }
    function createSet(response, model) {
      return new Set(model);
    }
    function createBlob(response, model) {
      return new Blob(model.slice(1), { type: model[0] });
    }
    function createFormData(response, model) {
      response = new FormData();
      for (var i = 0; i < model.length; i++)
        response.append(model[i][0], model[i][1]);
      return response;
    }
    function extractIterator(response, model) {
      return model[Symbol.iterator]();
    }
    function createModel(response, model) {
      return model;
    }
    function parseModelString(response, parentObject, key, value) {
      if ("$" === value[0]) {
        if ("$" === value)
          return (
            null !== initializingHandler &&
              "0" === key &&
              (initializingHandler = {
                parent: initializingHandler,
                chunk: null,
                value: null,
                deps: 0,
                errored: !1,
              }),
            REACT_ELEMENT_TYPE
          );
        switch (value[1]) {
          case "$":
            return value.slice(1);
          case "L":
            return (
              (parentObject = parseInt(value.slice(2), 16)),
              (response = getChunk(response, parentObject)),
              createLazyChunkWrapper(response)
            );
          case "@":
            if (2 === value.length) return new Promise(function () {});
            parentObject = parseInt(value.slice(2), 16);
            return getChunk(response, parentObject);
          case "S":
            return Symbol.for(value.slice(2));
          case "F":
            return (
              (value = value.slice(2)),
              getOutlinedModel(
                response,
                value,
                parentObject,
                key,
                createServerReferenceProxy,
              )
            );
          case "T":
            parentObject = "$" + value.slice(2);
            response = response._tempRefs;
            if (null == response)
              throw Error(
                "Missing a temporary reference set but the RSC response returned a temporary reference. Pass a temporaryReference option with the set that was used with the reply.",
              );
            return response.get(parentObject);
          case "Q":
            return (
              (value = value.slice(2)),
              getOutlinedModel(response, value, parentObject, key, createMap)
            );
          case "W":
            return (
              (value = value.slice(2)),
              getOutlinedModel(response, value, parentObject, key, createSet)
            );
          case "B":
            return (
              (value = value.slice(2)),
              getOutlinedModel(response, value, parentObject, key, createBlob)
            );
          case "K":
            return (
              (value = value.slice(2)),
              getOutlinedModel(
                response,
                value,
                parentObject,
                key,
                createFormData,
              )
            );
          case "i":
            return (
              (value = value.slice(2)),
              getOutlinedModel(
                response,
                value,
                parentObject,
                key,
                extractIterator,
              )
            );
          case "I":
            return Infinity;
          case "-":
            return "$-0" === value ? -0 : -Infinity;
          case "N":
            return NaN;
          case "u":
            return;
          case "D":
            return new Date(Date.parse(value.slice(2)));
          case "n":
            return BigInt(value.slice(2));
          case "E":
            try {
              return (0, eval)(value.slice(2));
            } catch (x) {
              return function () {};
            }
          default:
            return (
              (value = value.slice(1)),
              getOutlinedModel(response, value, parentObject, key, createModel)
            );
        }
      }
      return value;
    }
    function missingCall() {
      throw Error(
        'Trying to call a function from "use server" but the callServer option was not implemented in your router runtime.',
      );
    }
    function ResponseInstance(
      bundlerConfig,
      moduleLoading,
      callServer,
      encodeFormAction,
      nonce,
      temporaryReferences,
      findSourceMapURL,
      replayConsole,
    ) {
      var chunks = new Map();
      this._bundlerConfig = bundlerConfig;
      this._moduleLoading = moduleLoading;
      this._callServer = void 0 !== callServer ? callServer : missingCall;
      this._encodeFormAction = encodeFormAction;
      this._nonce = nonce;
      this._chunks = chunks;
      this._stringDecoder = new util.TextDecoder();
      this._fromJSON = null;
      this._rowLength = this._rowTag = this._rowID = this._rowState = 0;
      this._buffer = [];
      this._tempRefs = temporaryReferences;
      this._debugFindSourceMapURL = findSourceMapURL;
      this._replayConsole = replayConsole;
      this._fromJSON = createFromJSONCallback(this);
    }
    function resolveBuffer(response, id, buffer) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      chunk && "pending" !== chunk.status
        ? chunk.reason.enqueueValue(buffer)
        : chunks.set(id, new Chunk("fulfilled", buffer, null, response));
    }
    function resolveModule(response, id, model) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      model = JSON.parse(model, response._fromJSON);
      var clientReference = resolveClientReference(
        response._bundlerConfig,
        model,
      );
      prepareDestinationWithChunks(
        response._moduleLoading,
        model[1],
        response._nonce,
      );
      if ((model = preloadModule(clientReference))) {
        if (chunk) {
          var blockedChunk = chunk;
          blockedChunk.status = "blocked";
        } else
          (blockedChunk = new Chunk("blocked", null, null, response)),
            chunks.set(id, blockedChunk);
        model.then(
          function () {
            return resolveModuleChunk(blockedChunk, clientReference);
          },
          function (error) {
            return triggerErrorOnChunk(blockedChunk, error);
          },
        );
      } else
        chunk
          ? resolveModuleChunk(chunk, clientReference)
          : chunks.set(
              id,
              new Chunk("resolved_module", clientReference, null, response),
            );
    }
    function resolveStream(response, id, stream, controller) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      chunk
        ? "pending" === chunk.status &&
          ((response = chunk.value),
          (chunk.status = "fulfilled"),
          (chunk.value = stream),
          (chunk.reason = controller),
          null !== response && wakeChunk(response, chunk.value))
        : chunks.set(id, new Chunk("fulfilled", stream, controller, response));
    }
    function startReadableStream(response, id, type) {
      var controller = null;
      type = new ReadableStream({
        type: type,
        start: function (c) {
          controller = c;
        },
      });
      var previousBlockedChunk = null;
      resolveStream(response, id, type, {
        enqueueValue: function (value) {
          null === previousBlockedChunk
            ? controller.enqueue(value)
            : previousBlockedChunk.then(function () {
                controller.enqueue(value);
              });
        },
        enqueueModel: function (json) {
          if (null === previousBlockedChunk) {
            var chunk = new Chunk("resolved_model", json, null, response);
            initializeModelChunk(chunk);
            "fulfilled" === chunk.status
              ? controller.enqueue(chunk.value)
              : (chunk.then(
                  function (v) {
                    return controller.enqueue(v);
                  },
                  function (e) {
                    return controller.error(e);
                  },
                ),
                (previousBlockedChunk = chunk));
          } else {
            chunk = previousBlockedChunk;
            var _chunk3 = createPendingChunk(response);
            _chunk3.then(
              function (v) {
                return controller.enqueue(v);
              },
              function (e) {
                return controller.error(e);
              },
            );
            previousBlockedChunk = _chunk3;
            chunk.then(function () {
              previousBlockedChunk === _chunk3 && (previousBlockedChunk = null);
              resolveModelChunk(_chunk3, json);
            });
          }
        },
        close: function () {
          if (null === previousBlockedChunk) controller.close();
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function () {
              return controller.close();
            });
          }
        },
        error: function (error) {
          if (null === previousBlockedChunk) controller.error(error);
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function () {
              return controller.error(error);
            });
          }
        },
      });
    }
    function asyncIterator() {
      return this;
    }
    function createIterator(next) {
      next = { next: next };
      next[ASYNC_ITERATOR] = asyncIterator;
      return next;
    }
    function startAsyncIterable(response, id, iterator) {
      var buffer = [],
        closed = !1,
        nextWriteIndex = 0,
        iterable = _defineProperty({}, ASYNC_ITERATOR, function () {
          var nextReadIndex = 0;
          return createIterator(function (arg) {
            if (void 0 !== arg)
              throw Error(
                "Values cannot be passed to next() of AsyncIterables passed to Client Components.",
              );
            if (nextReadIndex === buffer.length) {
              if (closed)
                return new Chunk(
                  "fulfilled",
                  { done: !0, value: void 0 },
                  null,
                  response,
                );
              buffer[nextReadIndex] = createPendingChunk(response);
            }
            return buffer[nextReadIndex++];
          });
        });
      resolveStream(
        response,
        id,
        iterator ? iterable[ASYNC_ITERATOR]() : iterable,
        {
          enqueueValue: function (value) {
            if (nextWriteIndex === buffer.length)
              buffer[nextWriteIndex] = new Chunk(
                "fulfilled",
                { done: !1, value: value },
                null,
                response,
              );
            else {
              var chunk = buffer[nextWriteIndex],
                resolveListeners = chunk.value,
                rejectListeners = chunk.reason;
              chunk.status = "fulfilled";
              chunk.value = { done: !1, value: value };
              null !== resolveListeners &&
                wakeChunkIfInitialized(
                  chunk,
                  resolveListeners,
                  rejectListeners,
                );
            }
            nextWriteIndex++;
          },
          enqueueModel: function (value) {
            nextWriteIndex === buffer.length
              ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
                  response,
                  value,
                  !1,
                ))
              : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !1);
            nextWriteIndex++;
          },
          close: function (value) {
            closed = !0;
            nextWriteIndex === buffer.length
              ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
                  response,
                  value,
                  !0,
                ))
              : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !0);
            for (nextWriteIndex++; nextWriteIndex < buffer.length; )
              resolveIteratorResultChunk(
                buffer[nextWriteIndex++],
                '"$undefined"',
                !0,
              );
          },
          error: function (error) {
            closed = !0;
            for (
              nextWriteIndex === buffer.length &&
              (buffer[nextWriteIndex] = createPendingChunk(response));
              nextWriteIndex < buffer.length;

            )
              triggerErrorOnChunk(buffer[nextWriteIndex++], error);
          },
        },
      );
    }
    function mergeBuffer(buffer, lastChunk) {
      for (
        var l = buffer.length, byteLength = lastChunk.length, i = 0;
        i < l;
        i++
      )
        byteLength += buffer[i].byteLength;
      byteLength = new Uint8Array(byteLength);
      for (var _i2 = (i = 0); _i2 < l; _i2++) {
        var chunk = buffer[_i2];
        byteLength.set(chunk, i);
        i += chunk.byteLength;
      }
      byteLength.set(lastChunk, i);
      return byteLength;
    }
    function resolveTypedArray(
      response,
      id,
      buffer,
      lastChunk,
      constructor,
      bytesPerElement,
    ) {
      buffer =
        0 === buffer.length && 0 === lastChunk.byteOffset % bytesPerElement
          ? lastChunk
          : mergeBuffer(buffer, lastChunk);
      constructor = new constructor(
        buffer.buffer,
        buffer.byteOffset,
        buffer.byteLength / bytesPerElement,
      );
      resolveBuffer(response, id, constructor);
    }
    function processFullBinaryRow(response, id, tag, buffer, chunk) {
      switch (tag) {
        case 65:
          resolveBuffer(response, id, mergeBuffer(buffer, chunk).buffer);
          return;
        case 79:
          resolveTypedArray(response, id, buffer, chunk, Int8Array, 1);
          return;
        case 111:
          resolveBuffer(
            response,
            id,
            0 === buffer.length ? chunk : mergeBuffer(buffer, chunk),
          );
          return;
        case 85:
          resolveTypedArray(response, id, buffer, chunk, Uint8ClampedArray, 1);
          return;
        case 83:
          resolveTypedArray(response, id, buffer, chunk, Int16Array, 2);
          return;
        case 115:
          resolveTypedArray(response, id, buffer, chunk, Uint16Array, 2);
          return;
        case 76:
          resolveTypedArray(response, id, buffer, chunk, Int32Array, 4);
          return;
        case 108:
          resolveTypedArray(response, id, buffer, chunk, Uint32Array, 4);
          return;
        case 71:
          resolveTypedArray(response, id, buffer, chunk, Float32Array, 4);
          return;
        case 103:
          resolveTypedArray(response, id, buffer, chunk, Float64Array, 8);
          return;
        case 77:
          resolveTypedArray(response, id, buffer, chunk, BigInt64Array, 8);
          return;
        case 109:
          resolveTypedArray(response, id, buffer, chunk, BigUint64Array, 8);
          return;
        case 86:
          resolveTypedArray(response, id, buffer, chunk, DataView, 1);
          return;
      }
      for (
        var stringDecoder = response._stringDecoder, row = "", i = 0;
        i < buffer.length;
        i++
      )
        row += stringDecoder.decode(buffer[i], decoderOptions);
      row += stringDecoder.decode(chunk);
      processFullStringRow(response, id, tag, row);
    }
    function processFullStringRow(response, id, tag, row) {
      switch (tag) {
        case 73:
          resolveModule(response, id, row);
          break;
        case 72:
          id = row[0];
          row = row.slice(1);
          response = JSON.parse(row, response._fromJSON);
          row = ReactDOMSharedInternals.d;
          switch (id) {
            case "D":
              row.D(response);
              break;
            case "C":
              "string" === typeof response
                ? row.C(response)
                : row.C(response[0], response[1]);
              break;
            case "L":
              id = response[0];
              tag = response[1];
              3 === response.length
                ? row.L(id, tag, response[2])
                : row.L(id, tag);
              break;
            case "m":
              "string" === typeof response
                ? row.m(response)
                : row.m(response[0], response[1]);
              break;
            case "X":
              "string" === typeof response
                ? row.X(response)
                : row.X(response[0], response[1]);
              break;
            case "S":
              "string" === typeof response
                ? row.S(response)
                : row.S(
                    response[0],
                    0 === response[1] ? void 0 : response[1],
                    3 === response.length ? response[2] : void 0,
                  );
              break;
            case "M":
              "string" === typeof response
                ? row.M(response)
                : row.M(response[0], response[1]);
          }
          break;
        case 69:
          tag = JSON.parse(row);
          var digest = tag.digest,
            env = tag.env;
          row = Error(
            tag.message ||
              "An error occurred in the Server Components render but no message was provided",
          );
          row.stack = tag.stack;
          row.digest = digest;
          row.environmentName = env;
          tag = response._chunks;
          (digest = tag.get(id))
            ? triggerErrorOnChunk(digest, row)
            : tag.set(id, new Chunk("rejected", null, row, response));
          break;
        case 84:
          tag = response._chunks;
          (digest = tag.get(id)) && "pending" !== digest.status
            ? digest.reason.enqueueValue(row)
            : tag.set(id, new Chunk("fulfilled", row, null, response));
          break;
        case 68:
          row = JSON.parse(row, response._fromJSON);
          response = getChunk(response, id);
          (response._debugInfo || (response._debugInfo = [])).push(row);
          break;
        case 87:
          if (response._replayConsole)
            b: {
              (row = JSON.parse(row, response._fromJSON)),
                (response = row[0]),
                (id = row[3]),
                (tag = row.slice(4)),
                (row = 0);
              switch (response) {
                case "dir":
                case "dirxml":
                case "groupEnd":
                case "table":
                  console[response].apply(console, tag);
                  break b;
                case "assert":
                  row = 1;
              }
              tag = tag.slice(0);
              "string" === typeof tag[row]
                ? tag.splice(
                    row,
                    1,
                    "\u001b[0m\u001b[7m%c%s\u001b[0m%c " + tag[row],
                    "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
                    " " + id + " ",
                    "",
                  )
                : tag.splice(
                    row,
                    0,
                    "\u001b[0m\u001b[7m%c%s\u001b[0m%c ",
                    "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
                    " " + id + " ",
                    "",
                  );
              "error" === response
                ? error$jscomp$0.apply(console, tag)
                : "warn" === response
                  ? warn.apply(console, tag)
                  : console[response].apply(console, tag);
            }
          break;
        case 82:
          startReadableStream(response, id, void 0);
          break;
        case 114:
          startReadableStream(response, id, "bytes");
          break;
        case 88:
          startAsyncIterable(response, id, !1);
          break;
        case 120:
          startAsyncIterable(response, id, !0);
          break;
        case 67:
          (response = response._chunks.get(id)) &&
            "fulfilled" === response.status &&
            response.reason.close("" === row ? '"$undefined"' : row);
          break;
        default:
          (tag = response._chunks),
            (digest = tag.get(id))
              ? resolveModelChunk(digest, row)
              : tag.set(id, new Chunk("resolved_model", row, null, response));
      }
    }
    function createFromJSONCallback(response) {
      return function (key, value) {
        if ("string" === typeof value)
          return parseModelString(response, this, key, value);
        if ("object" === typeof value && null !== value) {
          if (value[0] === REACT_ELEMENT_TYPE)
            if (
              ((key = {
                $$typeof: REACT_ELEMENT_TYPE,
                type: value[1],
                key: value[2],
                props: value[3],
                _owner: value[4],
              }),
              Object.defineProperty(key, "ref", {
                enumerable: !1,
                get: nullRefGetter,
              }),
              (key._store = {}),
              Object.defineProperty(key._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: 1,
              }),
              Object.defineProperty(key, "_debugInfo", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: null,
              }),
              null !== initializingHandler)
            ) {
              var handler = initializingHandler;
              initializingHandler = handler.parent;
              handler.errored
                ? ((value = new Chunk(
                    "rejected",
                    null,
                    handler.value,
                    response,
                  )),
                  (key = {
                    name: getComponentNameFromType(key.type) || "",
                    owner: key._owner,
                  }),
                  (value._debugInfo = [key]),
                  (key = createLazyChunkWrapper(value)))
                : 0 < handler.deps &&
                  ((value = new Chunk("blocked", null, null, response)),
                  (handler.value = key),
                  (handler.chunk = value),
                  (key = Object.freeze.bind(Object, key.props)),
                  value.then(key, key),
                  (key = createLazyChunkWrapper(value)));
            } else Object.freeze(key.props);
          else key = value;
          return key;
        }
        return value;
      };
    }
    function noServerCall() {
      throw Error(
        "Server Functions cannot be called during initial render. This would create a fetch waterfall. Try to use a Server Component to pass data to Client Components instead.",
      );
    }
    var util = require("util"),
      React = require("react"),
      ReactDOM = require("react-dom"),
      decoderOptions = { stream: !0 },
      ReactSharedInternals =
        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      asyncModuleCache = new Map(),
      ReactDOMSharedInternals =
        ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
      REACT_MEMO_TYPE = Symbol.for("react.memo"),
      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
      ASYNC_ITERATOR = Symbol.asyncIterator,
      isArrayImpl = Array.isArray,
      getPrototypeOf = Object.getPrototypeOf,
      jsxPropsParents = new WeakMap(),
      jsxChildrenParents = new WeakMap(),
      CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference"),
      ObjectPrototype = Object.prototype,
      knownServerReferences = new WeakMap(),
      boundCache = new WeakMap(),
      FunctionBind = Function.prototype.bind,
      ArraySlice = Array.prototype.slice,
      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
    Chunk.prototype = Object.create(Promise.prototype);
    Chunk.prototype.then = function (resolve, reject) {
      switch (this.status) {
        case "resolved_model":
          initializeModelChunk(this);
          break;
        case "resolved_module":
          initializeModuleChunk(this);
      }
      switch (this.status) {
        case "fulfilled":
          resolve(this.value);
          break;
        case "pending":
        case "blocked":
          resolve &&
            (null === this.value && (this.value = []),
            this.value.push(resolve));
          reject &&
            (null === this.reason && (this.reason = []),
            this.reason.push(reject));
          break;
        default:
          reject && reject(this.reason);
      }
    };
    var initializingHandler = null;
    exports.createFromNodeStream = function (stream, ssrManifest, options) {
      var response = new ResponseInstance(
        ssrManifest.moduleMap,
        ssrManifest.moduleLoading,
        noServerCall,
        options ? options.encodeFormAction : void 0,
        options && "string" === typeof options.nonce ? options.nonce : void 0,
        void 0,
        options && options.findSourceMapURL ? options.findSourceMapURL : void 0,
        options ? !0 === options.replayConsoleLogs : !1,
      );
      stream.on("data", function (chunk) {
        if ("string" === typeof chunk) {
          for (
            var i = 0,
              rowState = response._rowState,
              rowID = response._rowID,
              rowTag = response._rowTag,
              rowLength = response._rowLength,
              buffer = response._buffer,
              chunkLength = chunk.length;
            i < chunkLength;

          ) {
            var lastIdx = -1;
            switch (rowState) {
              case 0:
                lastIdx = chunk.charCodeAt(i++);
                58 === lastIdx
                  ? (rowState = 1)
                  : (rowID =
                      (rowID << 4) |
                      (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
                continue;
              case 1:
                rowState = chunk.charCodeAt(i);
                84 === rowState ||
                65 === rowState ||
                79 === rowState ||
                111 === rowState ||
                85 === rowState ||
                83 === rowState ||
                115 === rowState ||
                76 === rowState ||
                108 === rowState ||
                71 === rowState ||
                103 === rowState ||
                77 === rowState ||
                109 === rowState ||
                86 === rowState
                  ? ((rowTag = rowState), (rowState = 2), i++)
                  : (64 < rowState && 91 > rowState) ||
                      114 === rowState ||
                      120 === rowState
                    ? ((rowTag = rowState), (rowState = 3), i++)
                    : ((rowTag = 0), (rowState = 3));
                continue;
              case 2:
                lastIdx = chunk.charCodeAt(i++);
                44 === lastIdx
                  ? (rowState = 4)
                  : (rowLength =
                      (rowLength << 4) |
                      (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
                continue;
              case 3:
                lastIdx = chunk.indexOf("\n", i);
                break;
              case 4:
                if (84 !== rowTag)
                  throw Error(
                    "Binary RSC chunks cannot be encoded as strings. This is a bug in the wiring of the React streams.",
                  );
                if (rowLength < chunk.length || chunk.length > 3 * rowLength)
                  throw Error(
                    "String chunks need to be passed in their original shape. Not split into smaller string chunks. This is a bug in the wiring of the React streams.",
                  );
                lastIdx = chunk.length;
            }
            if (-1 < lastIdx) {
              if (0 < buffer.length)
                throw Error(
                  "String chunks need to be passed in their original shape. Not split into smaller string chunks. This is a bug in the wiring of the React streams.",
                );
              i = chunk.slice(i, lastIdx);
              processFullStringRow(response, rowID, rowTag, i);
              i = lastIdx;
              3 === rowState && i++;
              rowLength = rowID = rowTag = rowState = 0;
              buffer.length = 0;
            } else if (chunk.length !== i)
              throw Error(
                "String chunks need to be passed in their original shape. Not split into smaller string chunks. This is a bug in the wiring of the React streams.",
              );
          }
          response._rowState = rowState;
          response._rowID = rowID;
          response._rowTag = rowTag;
          response._rowLength = rowLength;
        } else {
          rowLength = 0;
          chunkLength = response._rowState;
          rowID = response._rowID;
          i = response._rowTag;
          rowState = response._rowLength;
          buffer = response._buffer;
          for (rowTag = chunk.length; rowLength < rowTag; ) {
            lastIdx = -1;
            switch (chunkLength) {
              case 0:
                lastIdx = chunk[rowLength++];
                58 === lastIdx
                  ? (chunkLength = 1)
                  : (rowID =
                      (rowID << 4) |
                      (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
                continue;
              case 1:
                chunkLength = chunk[rowLength];
                84 === chunkLength ||
                65 === chunkLength ||
                79 === chunkLength ||
                111 === chunkLength ||
                85 === chunkLength ||
                83 === chunkLength ||
                115 === chunkLength ||
                76 === chunkLength ||
                108 === chunkLength ||
                71 === chunkLength ||
                103 === chunkLength ||
                77 === chunkLength ||
                109 === chunkLength ||
                86 === chunkLength
                  ? ((i = chunkLength), (chunkLength = 2), rowLength++)
                  : (64 < chunkLength && 91 > chunkLength) ||
                      114 === chunkLength ||
                      120 === chunkLength
                    ? ((i = chunkLength), (chunkLength = 3), rowLength++)
                    : ((i = 0), (chunkLength = 3));
                continue;
              case 2:
                lastIdx = chunk[rowLength++];
                44 === lastIdx
                  ? (chunkLength = 4)
                  : (rowState =
                      (rowState << 4) |
                      (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
                continue;
              case 3:
                lastIdx = chunk.indexOf(10, rowLength);
                break;
              case 4:
                (lastIdx = rowLength + rowState),
                  lastIdx > chunk.length && (lastIdx = -1);
            }
            var offset = chunk.byteOffset + rowLength;
            if (-1 < lastIdx)
              (rowState = new Uint8Array(
                chunk.buffer,
                offset,
                lastIdx - rowLength,
              )),
                processFullBinaryRow(response, rowID, i, buffer, rowState),
                (rowLength = lastIdx),
                3 === chunkLength && rowLength++,
                (rowState = rowID = i = chunkLength = 0),
                (buffer.length = 0);
            else {
              chunk = new Uint8Array(
                chunk.buffer,
                offset,
                chunk.byteLength - rowLength,
              );
              buffer.push(chunk);
              rowState -= chunk.byteLength;
              break;
            }
          }
          response._rowState = chunkLength;
          response._rowID = rowID;
          response._rowTag = i;
          response._rowLength = rowState;
        }
      });
      stream.on("error", function (error) {
        reportGlobalError(response, error);
      });
      stream.on("end", function () {
        reportGlobalError(response, Error("Connection closed."));
      });
      return getChunk(response, 0);
    };
    exports.createServerReference = function (id) {
      return createServerReference$1(id, noServerCall);
    };
  })();
