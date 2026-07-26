"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// pkg/navojit_auth.js
var require_navojit_auth = __commonJS({
  "pkg/navojit_auth.js"(exports, module) {
    "use strict";
    var WorkerPool = class _WorkerPool {
      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(_WorkerPool.prototype);
        obj.__wbg_ptr = ptr;
        WorkerPoolFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WorkerPoolFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_workerpool_free(ptr, 0);
      }
      /**
       * @param {number | null} [initial]
       * @param {string | null} [script_src]
       * @param {string | null} [worker_js_preamble]
       * @param {string | null} [wasm_bindgen_name]
       * @returns {WorkerPool}
       */
      static new(initial, script_src, worker_js_preamble, wasm_bindgen_name) {
        var ptr0 = isLikeNone(script_src) ? 0 : passStringToWasm0(script_src, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(worker_js_preamble) ? 0 : passStringToWasm0(worker_js_preamble, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(wasm_bindgen_name) ? 0 : passStringToWasm0(wasm_bindgen_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret2 = wasm.workerpool_new(isLikeNone(initial) ? 4294967297 : initial >>> 0, ptr0, len0, ptr1, len1, ptr2, len2);
        if (ret2[2]) {
          throw takeFromExternrefTable0(ret2[1]);
        }
        return _WorkerPool.__wrap(ret2[0]);
      }
      /**
       * Creates a new `WorkerPool` which immediately creates `initial` workers.
       *
       * The pool created here can be used over a long period of time, and it
       * will be initially primed with `initial` workers. Currently workers are
       * never released or gc'd until the whole pool is destroyed.
       *
       * # Errors
       *
       * Returns any error that may happen while a JS web worker is created and a
       * message is sent to it.
       * @param {number} initial
       * @param {string} script_src
       * @param {string} worker_js_preamble
       * @param {string} wasm_bindgen_name
       */
      constructor(initial, script_src, worker_js_preamble, wasm_bindgen_name) {
        const ptr0 = passStringToWasm0(script_src, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(worker_js_preamble, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(wasm_bindgen_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret2 = wasm.workerpool_new_raw(initial, ptr0, len0, ptr1, len1, ptr2, len2);
        if (ret2[2]) {
          throw takeFromExternrefTable0(ret2[1]);
        }
        this.__wbg_ptr = ret2[0] >>> 0;
        WorkerPoolFinalization.register(this, this.__wbg_ptr, this);
        return this;
      }
    };
    if (Symbol.dispose) WorkerPool.prototype[Symbol.dispose] = WorkerPool.prototype.free;
    exports.WorkerPool = WorkerPool;
    function frb_dart_fn_deliver_output(call_id, ptr_, rust_vec_len_, data_len_) {
      wasm.frb_dart_fn_deliver_output(call_id, ptr_, rust_vec_len_, data_len_);
    }
    exports.frb_dart_fn_deliver_output = frb_dart_fn_deliver_output;
    function frb_dart_opaque_dart2rust_encode(handle, dart_handler_port) {
      const ret2 = wasm.frb_dart_opaque_dart2rust_encode(handle, dart_handler_port);
      return ret2 >>> 0;
    }
    exports.frb_dart_opaque_dart2rust_encode = frb_dart_opaque_dart2rust_encode;
    function frb_dart_opaque_drop_thread_box_persistent_handle(ptr) {
      wasm.frb_dart_opaque_drop_thread_box_persistent_handle(ptr);
    }
    exports.frb_dart_opaque_drop_thread_box_persistent_handle = frb_dart_opaque_drop_thread_box_persistent_handle;
    function frb_dart_opaque_rust2dart_decode(ptr) {
      const ret2 = wasm.frb_dart_opaque_rust2dart_decode(ptr);
      return ret2;
    }
    exports.frb_dart_opaque_rust2dart_decode = frb_dart_opaque_rust2dart_decode;
    function frb_get_rust_content_hash() {
      const ret2 = wasm.frb_get_rust_content_hash();
      return ret2;
    }
    exports.frb_get_rust_content_hash = frb_get_rust_content_hash;
    function frb_pde_ffi_dispatcher_primary(func_id, port_, ptr_, rust_vec_len_, data_len_) {
      wasm.frb_pde_ffi_dispatcher_primary(func_id, port_, ptr_, rust_vec_len_, data_len_);
    }
    exports.frb_pde_ffi_dispatcher_primary = frb_pde_ffi_dispatcher_primary;
    function frb_pde_ffi_dispatcher_sync(func_id, ptr_, rust_vec_len_, data_len_) {
      const ret2 = wasm.frb_pde_ffi_dispatcher_sync(func_id, ptr_, rust_vec_len_, data_len_);
      return ret2;
    }
    exports.frb_pde_ffi_dispatcher_sync = frb_pde_ffi_dispatcher_sync;
    function receive_transfer_closure(payload, transfer) {
      const ptr0 = passArrayJsValueToWasm0(transfer, wasm.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN;
      const ret2 = wasm.receive_transfer_closure(payload, ptr0, len0);
      if (ret2[1]) {
        throw takeFromExternrefTable0(ret2[0]);
      }
    }
    exports.receive_transfer_closure = receive_transfer_closure;
    function wasm_start_callback() {
      wasm.wasm_start_callback();
    }
    exports.wasm_start_callback = wasm_start_callback;
    function __wbg_get_imports() {
      const import0 = {
        __proto__: null,
        __wbg___wbindgen_debug_string_ab4b34d23d6778bd: function(arg02, arg12) {
          const ret2 = debugString(arg12);
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_is_falsy_c07bb72123e65555: function(arg02) {
          const ret2 = !arg02;
          return ret2;
        },
        __wbg___wbindgen_is_function_3baa9db1a987f47d: function(arg02) {
          const ret2 = typeof arg02 === "function";
          return ret2;
        },
        __wbg___wbindgen_is_object_63322ec0cd6ea4ef: function(arg02) {
          const val = arg02;
          const ret2 = typeof val === "object" && val !== null;
          return ret2;
        },
        __wbg___wbindgen_is_string_6df3bf7ef1164ed3: function(arg02) {
          const ret2 = typeof arg02 === "string";
          return ret2;
        },
        __wbg___wbindgen_is_undefined_29a43b4d42920abd: function(arg02) {
          const ret2 = arg02 === void 0;
          return ret2;
        },
        __wbg___wbindgen_jsval_eq_d3465d8a07697228: function(arg02, arg12) {
          const ret2 = arg02 === arg12;
          return ret2;
        },
        __wbg___wbindgen_memory_dfa12096f400c9bd: function() {
          const ret2 = wasm.memory;
          return ret2;
        },
        __wbg___wbindgen_module_b5e6fb95dbdb7d7e: function() {
          const ret2 = wasmModule;
          return ret2;
        },
        __wbg___wbindgen_number_get_c7f42aed0525c451: function(arg02, arg12) {
          const obj = arg12;
          const ret2 = typeof obj === "number" ? obj : void 0;
          getDataViewMemory0().setFloat64(arg02 + 8 * 1, isLikeNone(ret2) ? 0 : ret2, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, !isLikeNone(ret2), true);
        },
        __wbg___wbindgen_string_get_7ed5322991caaec5: function(arg02, arg12) {
          const obj = arg12;
          const ret2 = typeof obj === "string" ? obj : void 0;
          var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_6b64449b9b9ed33c: function(arg02, arg12) {
          throw new Error(getStringFromWasm0(arg02, arg12));
        },
        __wbg__wbg_cb_unref_b46c9b5a9f08ec37: function(arg02) {
          arg02._wbg_cb_unref();
        },
        __wbg_call_a24592a6f349a97e: function() {
          return handleError(function(arg02, arg12, arg2) {
            const ret2 = arg02.call(arg12, arg2);
            return ret2;
          }, arguments);
        },
        __wbg_createObjectURL_46e1b0c55389893b: function() {
          return handleError(function(arg02, arg12) {
            const ret2 = URL.createObjectURL(arg12);
            const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
          }, arguments);
        },
        __wbg_crypto_38df2bab126b63dc: function(arg02) {
          const ret2 = arg02.crypto;
          return ret2;
        },
        __wbg_data_bb9dffdd1e99cf2d: function(arg02) {
          const ret2 = arg02.data;
          return ret2;
        },
        __wbg_error_7bfe3b7ebaaa5936: function(arg02, arg12) {
          console.error(getStringFromWasm0(arg02, arg12));
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg02, arg12) {
          let deferred0_0;
          let deferred0_1;
          try {
            deferred0_0 = arg02;
            deferred0_1 = arg12;
            console.error(getStringFromWasm0(arg02, arg12));
          } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
          }
        },
        __wbg_eval_0f5002e126d86aff: function() {
          return handleError(function(arg0, arg1) {
            const ret = eval(getStringFromWasm0(arg0, arg1));
            return ret;
          }, arguments);
        },
        __wbg_getRandomValues_c44a50d8cfdaebeb: function() {
          return handleError(function(arg02, arg12) {
            arg02.getRandomValues(arg12);
          }, arguments);
        },
        __wbg_getRandomValues_d49329ff89a07af1: function() {
          return handleError(function(arg02, arg12) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg02, arg12));
          }, arguments);
        },
        __wbg_getTime_da7c55f52b71e8c6: function(arg02) {
          const ret2 = arg02.getTime();
          return ret2;
        },
        __wbg_get_6011fa3a58f61074: function() {
          return handleError(function(arg02, arg12) {
            const ret2 = Reflect.get(arg02, arg12);
            return ret2;
          }, arguments);
        },
        __wbg_instanceof_BroadcastChannel_5df9429897d85c56: function(arg02) {
          let result;
          try {
            result = arg02 instanceof BroadcastChannel;
          } catch (_) {
            result = false;
          }
          const ret2 = result;
          return ret2;
        },
        __wbg_instanceof_ErrorEvent_2875f0fa957e8d48: function(arg02) {
          let result;
          try {
            result = arg02 instanceof ErrorEvent;
          } catch (_) {
            result = false;
          }
          const ret2 = result;
          return ret2;
        },
        __wbg_instanceof_MessageEvent_551f81fec2cc0225: function(arg02) {
          let result;
          try {
            result = arg02 instanceof MessageEvent;
          } catch (_) {
            result = false;
          }
          const ret2 = result;
          return ret2;
        },
        __wbg_instanceof_MessagePort_01f71fc6be292c9d: function(arg02) {
          let result;
          try {
            result = arg02 instanceof MessagePort;
          } catch (_) {
            result = false;
          }
          const ret2 = result;
          return ret2;
        },
        __wbg_length_9f1775224cf1d815: function(arg02) {
          const ret2 = arg02.length;
          return ret2;
        },
        __wbg_message_aa7e2704b8b86e2a: function(arg02, arg12) {
          const ret2 = arg12.message;
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        },
        __wbg_msCrypto_bd5a034af96bcba6: function(arg02) {
          const ret2 = arg02.msCrypto;
          return ret2;
        },
        __wbg_name_4fa65b35fc398da1: function(arg02, arg12) {
          const ret2 = arg12.name;
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        },
        __wbg_new_0_4d657201ced14de3: function() {
          const ret2 = /* @__PURE__ */ new Date();
          return ret2;
        },
        __wbg_new_0c7403db6e782f19: function(arg02) {
          const ret2 = new Uint8Array(arg02);
          return ret2;
        },
        __wbg_new_227d7c05414eb861: function() {
          const ret2 = new Error();
          return ret2;
        },
        __wbg_new_682678e2f47e32bc: function() {
          const ret2 = new Array();
          return ret2;
        },
        __wbg_new_aa8d0fa9762c29bd: function() {
          const ret2 = new Object();
          return ret2;
        },
        __wbg_new_aadb2b3f13e701cf: function() {
          return handleError(function(arg02, arg12) {
            const ret2 = new BroadcastChannel(getStringFromWasm0(arg02, arg12));
            return ret2;
          }, arguments);
        },
        __wbg_new_d9e8ade8a7fba252: function() {
          return handleError(function(arg02, arg12) {
            const ret2 = new Worker(getStringFromWasm0(arg02, arg12));
            return ret2;
          }, arguments);
        },
        __wbg_new_from_slice_b5ea43e23f6008c0: function(arg02, arg12) {
          const ret2 = new Uint8Array(getArrayU8FromWasm0(arg02, arg12));
          return ret2;
        },
        __wbg_new_with_blob_sequence_and_options_c1581ddb17deb8ba: function() {
          return handleError(function(arg02, arg12) {
            const ret2 = new Blob(arg02, arg12);
            return ret2;
          }, arguments);
        },
        __wbg_new_with_length_8c854e41ea4dae9b: function(arg02) {
          const ret2 = new Uint8Array(arg02 >>> 0);
          return ret2;
        },
        __wbg_node_84ea875411254db1: function(arg02) {
          const ret2 = arg02.node;
          return ret2;
        },
        __wbg_postMessage_05c4f5b252fddf64: function() {
          return handleError(function(arg02, arg12) {
            arg02.postMessage(arg12);
          }, arguments);
        },
        __wbg_postMessage_2e8ce5e10ce05091: function() {
          return handleError(function(arg02, arg12, arg2) {
            arg02.postMessage(arg12, arg2);
          }, arguments);
        },
        __wbg_postMessage_59736484efc322cf: function() {
          return handleError(function(arg02, arg12) {
            arg02.postMessage(arg12);
          }, arguments);
        },
        __wbg_postMessage_fd3e922532e00928: function() {
          return handleError(function(arg02, arg12) {
            arg02.postMessage(arg12);
          }, arguments);
        },
        __wbg_process_44c7a14e11e9f69e: function(arg02) {
          const ret2 = arg02.process;
          return ret2;
        },
        __wbg_prototypesetcall_a6b02eb00b0f4ce2: function(arg02, arg12, arg2) {
          Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg02, arg12), arg2);
        },
        __wbg_push_471a5b068a5295f6: function(arg02, arg12) {
          const ret2 = arg02.push(arg12);
          return ret2;
        },
        __wbg_queueMicrotask_5d15a957e6aa920e: function(arg02) {
          queueMicrotask(arg02);
        },
        __wbg_queueMicrotask_f8819e5ffc402f36: function(arg02) {
          const ret2 = arg02.queueMicrotask;
          return ret2;
        },
        __wbg_randomFillSync_6c25eac9869eb53c: function() {
          return handleError(function(arg02, arg12) {
            arg02.randomFillSync(arg12);
          }, arguments);
        },
        __wbg_require_b4edbdcf3e2a1ef0: function() {
          return handleError(function() {
            const ret2 = module.require;
            return ret2;
          }, arguments);
        },
        __wbg_resolve_e6c466bc1052f16c: function(arg02) {
          const ret2 = Promise.resolve(arg02);
          return ret2;
        },
        __wbg_set_022bee52d0b05b19: function() {
          return handleError(function(arg02, arg12, arg2) {
            const ret2 = Reflect.set(arg02, arg12, arg2);
            return ret2;
          }, arguments);
        },
        __wbg_set_onerror_b785ebcd32c1528e: function(arg02, arg12) {
          arg02.onerror = arg12;
        },
        __wbg_set_onmessage_9d59339e7810516a: function(arg02, arg12) {
          arg02.onmessage = arg12;
        },
        __wbg_set_type_8b2743f6b4de4035: function(arg02, arg12, arg2) {
          arg02.type = getStringFromWasm0(arg12, arg2);
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg02, arg12) {
          const ret2 = arg12.stack;
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_8cfadc87a297ca02: function() {
          const ret2 = typeof global === "undefined" ? null : global;
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        },
        __wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf: function() {
          const ret2 = typeof globalThis === "undefined" ? null : globalThis;
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        },
        __wbg_static_accessor_SELF_e445c1c7484aecc3: function() {
          const ret2 = typeof self === "undefined" ? null : self;
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        },
        __wbg_static_accessor_WINDOW_f20e8576ef1e0f17: function() {
          const ret2 = typeof window === "undefined" ? null : window;
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        },
        __wbg_subarray_f8ca46a25b1f5e0d: function(arg02, arg12, arg2) {
          const ret2 = arg02.subarray(arg12 >>> 0, arg2 >>> 0);
          return ret2;
        },
        __wbg_then_8e16ee11f05e4827: function(arg02, arg12) {
          const ret2 = arg02.then(arg12);
          return ret2;
        },
        __wbg_unshift_951ea71d9d2dc660: function(arg02, arg12) {
          const ret2 = arg02.unshift(arg12);
          return ret2;
        },
        __wbg_versions_276b2795b1c6a219: function(arg02) {
          const ret2 = arg02.versions;
          return ret2;
        },
        __wbindgen_cast_0000000000000001: function(arg02, arg12) {
          const ret2 = makeMutClosure(arg02, arg12, wasm_bindgen__convert__closures_____invoke__hd9e334b3a77ed3bd);
          return ret2;
        },
        __wbindgen_cast_0000000000000002: function(arg02, arg12) {
          const ret2 = makeMutClosure(arg02, arg12, wasm_bindgen__convert__closures_____invoke__h3c63334ed800e3f6);
          return ret2;
        },
        __wbindgen_cast_0000000000000003: function(arg02, arg12) {
          const ret2 = makeMutClosure(arg02, arg12, wasm_bindgen__convert__closures_____invoke__h3c63334ed800e3f6_2);
          return ret2;
        },
        __wbindgen_cast_0000000000000004: function(arg02) {
          const ret2 = arg02;
          return ret2;
        },
        __wbindgen_cast_0000000000000005: function(arg02, arg12) {
          const ret2 = getArrayU8FromWasm0(arg02, arg12);
          return ret2;
        },
        __wbindgen_cast_0000000000000006: function(arg02, arg12) {
          const ret2 = getStringFromWasm0(arg02, arg12);
          return ret2;
        },
        __wbindgen_init_externref_table: function() {
          const table = wasm.__wbindgen_externrefs;
          const offset = table.grow(4);
          table.set(0, void 0);
          table.set(offset + 0, void 0);
          table.set(offset + 1, null);
          table.set(offset + 2, true);
          table.set(offset + 3, false);
        }
      };
      return {
        __proto__: null,
        "./navojit_auth_bg.js": import0
      };
    }
    function wasm_bindgen__convert__closures_____invoke__h3c63334ed800e3f6(arg02, arg12, arg2) {
      wasm.wasm_bindgen__convert__closures_____invoke__h3c63334ed800e3f6(arg02, arg12, arg2);
    }
    function wasm_bindgen__convert__closures_____invoke__h3c63334ed800e3f6_2(arg02, arg12, arg2) {
      wasm.wasm_bindgen__convert__closures_____invoke__h3c63334ed800e3f6_2(arg02, arg12, arg2);
    }
    function wasm_bindgen__convert__closures_____invoke__hd9e334b3a77ed3bd(arg02, arg12, arg2) {
      const ret2 = wasm.wasm_bindgen__convert__closures_____invoke__hd9e334b3a77ed3bd(arg02, arg12, arg2);
      if (ret2[1]) {
        throw takeFromExternrefTable0(ret2[0]);
      }
    }
    var WorkerPoolFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_workerpool_free(ptr >>> 0, 1));
    function addToExternrefTable0(obj) {
      const idx = wasm.__externref_table_alloc();
      wasm.__wbindgen_externrefs.set(idx, obj);
      return idx;
    }
    var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((state) => wasm.__wbindgen_destroy_closure(state.a, state.b));
    function debugString(val) {
      const type = typeof val;
      if (type == "number" || type == "boolean" || val == null) {
        return `${val}`;
      }
      if (type == "string") {
        return `"${val}"`;
      }
      if (type == "symbol") {
        const description = val.description;
        if (description == null) {
          return "Symbol";
        } else {
          return `Symbol(${description})`;
        }
      }
      if (type == "function") {
        const name = val.name;
        if (typeof name == "string" && name.length > 0) {
          return `Function(${name})`;
        } else {
          return "Function";
        }
      }
      if (Array.isArray(val)) {
        const length = val.length;
        let debug = "[";
        if (length > 0) {
          debug += debugString(val[0]);
        }
        for (let i = 1; i < length; i++) {
          debug += ", " + debugString(val[i]);
        }
        debug += "]";
        return debug;
      }
      const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
      let className;
      if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
      } else {
        return toString.call(val);
      }
      if (className == "Object") {
        try {
          return "Object(" + JSON.stringify(val) + ")";
        } catch (_) {
          return "Object";
        }
      }
      if (val instanceof Error) {
        return `${val.name}: ${val.message}
${val.stack}`;
      }
      return className;
    }
    function getArrayU8FromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
    }
    var cachedDataViewMemory0 = null;
    function getDataViewMemory0() {
      if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
      }
      return cachedDataViewMemory0;
    }
    function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return decodeText(ptr, len);
    }
    var cachedUint8ArrayMemory0 = null;
    function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
    }
    function handleError(f, args) {
      try {
        return f.apply(this, args);
      } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
      }
    }
    function isLikeNone(x) {
      return x === void 0 || x === null;
    }
    function makeMutClosure(arg02, arg12, f) {
      const state = { a: arg02, b: arg12, cnt: 1 };
      const real = (...args) => {
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
          return f(a, state.b, ...args);
        } finally {
          state.a = a;
          real._wbg_cb_unref();
        }
      };
      real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
          wasm.__wbindgen_destroy_closure(state.a, state.b);
          state.a = 0;
          CLOSURE_DTORS.unregister(state);
        }
      };
      CLOSURE_DTORS.register(real, state, state);
      return real;
    }
    function passArrayJsValueToWasm0(array, malloc) {
      const ptr = malloc(array.length * 4, 4) >>> 0;
      for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
      }
      WASM_VECTOR_LEN = array.length;
      return ptr;
    }
    function passStringToWasm0(arg, malloc, realloc) {
      if (realloc === void 0) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr2 = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr2;
      }
      let len = arg.length;
      let ptr = malloc(len, 1) >>> 0;
      const mem = getUint8ArrayMemory0();
      let offset = 0;
      for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 127) break;
        mem[ptr + offset] = code;
      }
      if (offset !== len) {
        if (offset !== 0) {
          arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret2 = cachedTextEncoder.encodeInto(arg, view);
        offset += ret2.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
      }
      WASM_VECTOR_LEN = offset;
      return ptr;
    }
    function takeFromExternrefTable0(idx) {
      const value = wasm.__wbindgen_externrefs.get(idx);
      wasm.__externref_table_dealloc(idx);
      return value;
    }
    var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    function decodeText(ptr, len) {
      return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }
    var cachedTextEncoder = new TextEncoder();
    if (!("encodeInto" in cachedTextEncoder)) {
      cachedTextEncoder.encodeInto = function(arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length
        };
      };
    }
    var WASM_VECTOR_LEN = 0;
    var wasmPath = `${__dirname}/navojit_auth_bg.wasm`;
    var wasmBytes = require("fs").readFileSync(wasmPath);
    var wasmModule = new WebAssembly.Module(wasmBytes);
    var wasm = new WebAssembly.Instance(wasmModule, __wbg_get_imports()).exports;
    wasm.__wbindgen_start();
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CredentialsProvider: () => CredentialsProvider,
  DrizzleAdapter: () => DrizzleAdapter,
  GoogleProvider: () => GoogleProvider,
  MongooseAdapter: () => MongooseAdapter,
  NavojitAuth: () => NavojitAuth,
  OTPProvider: () => OTPProvider,
  attachFastifyAuth: () => attachFastifyAuth,
  createExpressAuthRouter: () => createExpressAuthRouter,
  createNextAuthHandler: () => createNextAuthHandler
});
module.exports = __toCommonJS(index_exports);

// src/core/auth.ts
var import_uuid = require("uuid");
var import_server = require("@simplewebauthn/server");
var argon2 = __toESM(require("argon2"));
var wasm2 = require_navojit_auth();
var NavojitAuth = class {
  config;
  enclave;
  constructor(config2) {
    this.config = {
      prefix: "/auth",
      ...config2
    };
    this.enclave = new wasm2.SovereignEnclave(this.config.secret);
  }
  getConfig() {
    return this.config;
  }
  generateOmniTokens(user, options = {}) {
    const userId = (user.id || user._id || "").toString();
    const email = user.email || "";
    const role = user.role || "member";
    const mfa_v = options.mfa_v || false;
    const am = options.am || ["pwd"];
    return this.enclave.generate_omni_tokens(userId, email, role, mfa_v, am);
  }
  verifyToken(token) {
    const claims = this.enclave.verify_token(token);
    if (!claims) {
      return {
        error: "expired_or_invalid",
        message: "Sovereign verification failed"
      };
    }
    return claims;
  }
  async generatePasskeyOptions(userId, userEmail, rpID = "navojit.com") {
    return (0, import_server.generateRegistrationOptions)({
      rpName: "Navojit Ecosystem",
      rpID,
      userID: Buffer.from(userId),
      userName: userEmail,
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred"
      }
    });
  }
  async verifyPasskey(challenge, response, origin, rpID = "navojit.com") {
    try {
      return await (0, import_server.verifyRegistrationResponse)({
        response,
        expectedChallenge: challenge,
        expectedOrigin: origin,
        expectedRPID: rpID
      });
    } catch (error) {
      return { verified: false, error: error.message };
    }
  }
  async hashPassword(password) {
    return await argon2.hash(password);
  }
  async verifyPassword(hash2, password) {
    return await argon2.verify(hash2, password);
  }
  async verifyAndFetchUser(email, otp) {
    if (!otp || otp.length < 4) throw new Error("Invalid OTP");
    let user = await this.config.adapter.findUserByEmail(email);
    if (!user) {
      user = await this.config.adapter.createUser({
        email,
        password: await this.hashPassword("NAV_SECURE_" + (0, import_uuid.v4)()),
        role: "member",
        isVerified: true
      });
    }
    return user;
  }
  async verifyOtpCore(email, otp) {
    const user = await this.verifyAndFetchUser(email, otp);
    const tokens = this.generateOmniTokens(user, {
      mfa_v: true,
      am: ["otp"]
    });
    return { success: true, ...tokens };
  }
};

// src/core/providers.ts
var import_argon2 = __toESM(require("argon2"));
var import_google_auth_library = require("google-auth-library");
var import_resend = require("resend");
var resend = new import_resend.Resend(process.env.RESEND_API_KEY);
var CredentialsProvider = class {
  constructor(adapter) {
    this.adapter = adapter;
  }
  adapter;
  id = "credentials";
  name = "Email/Password";
  async handle(body) {
    const { email, password, orgId } = body;
    const user = await this.adapter.getUserByEmail(email, orgId);
    if (user && await import_argon2.default.verify(user.passwordHash, password)) {
      return user;
    }
    return null;
  }
};
var GoogleProvider = class {
  constructor(adapter) {
    this.adapter = adapter;
  }
  adapter;
  id = "google";
  name = "Google";
  client = new import_google_auth_library.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  async handle(body) {
    const { idToken, orgId } = body;
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) return null;
      let user = await this.adapter.getUserByEmail(payload.email, orgId);
      if (!user) {
        user = await this.adapter.createUser({
          email: payload.email,
          passwordHash: "SOCIAL_AUTH_EXTERNAL",
          // Placeholder for social users
          orgId,
          role: "member"
        });
      }
      return user;
    } catch (error) {
      console.error("[AUTH] Google Verification Failed:", error);
      return null;
    }
  }
};
var OTPProvider = class {
  constructor(adapter) {
    this.adapter = adapter;
  }
  adapter;
  id = "otp";
  name = "OTP";
  otpStore = /* @__PURE__ */ new Map();
  async handleAction(action, body) {
    if (action === "send") {
      const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
      this.otpStore.set(body.email, { otp, expires: Date.now() + 3e5 });
      if (process.env.RESEND_API_KEY) {
        try {
          await resend.emails.send({
            from: "Navojit Auth <no-reply@navojit.io>",
            // Apne verified domain se replace karein
            to: body.email,
            subject: "Your Security Code",
            html: `<div style="font-family: sans-serif; padding: 20px;">
                    <h2>Verification Code</h2>
                    <p>Use the following code to sign in to your account:</p>
                    <h1 style="color: #4F46E5;">${otp}</h1>
                    <p>This code expires in 5 minutes.</p>
                   </div>`
          });
        } catch (error) {
          console.error("[AUTH] Email Delivery Failed:", error);
        }
      }
      console.log(`[AUTH] OTP for ${body.email}: ${otp}`);
      return { success: true, message: "OTP sent successfully" };
    }
    return { success: false, message: "Invalid action" };
  }
  async handle(body) {
    const { email, otp, orgId } = body;
    const record = this.otpStore.get(email);
    if (record && record.otp === otp && record.expires > Date.now()) {
      this.otpStore.delete(email);
      return await this.adapter.getUserByEmail(email, orgId);
    }
    return null;
  }
};

// src/adapters/express.ts
function createExpressAuthRouter(authEngine) {
  const { Router } = require("express");
  const router = Router();
  const { prefix } = authEngine.getConfig();
  router.post(`${prefix}/otp/verify`, async (req, res) => {
    try {
      const result = await authEngine.verifyOtpCore(req.body.email, req.body.otp);
      res.json({
        ...result,
        gateway: "navojit-v4-rust-express"
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
  return router;
}

// src/adapters/nextjs.ts
function createNextAuthHandler(authEngine) {
  return {
    async POST(req) {
      const { NextResponse } = require("next/server");
      try {
        const body = await req.json();
        if (!body.email || !body.otp) {
          return NextResponse.json({ error: "Missing email or otp" }, { status: 400 });
        }
        const result = await authEngine.verifyOtpCore(body.email, body.otp);
        return NextResponse.json({
          ...result,
          gateway: "navojit-v4-rust-nextjs"
        });
      } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
      }
    }
  };
}

// src/adapters/fastify.ts
function attachFastifyAuth(authEngine, server) {
  const { prefix } = authEngine.getConfig();
  server.post(`${prefix}/otp/verify`, async (req, reply) => {
    try {
      const result = await authEngine.verifyOtpCore(req.body.email, req.body.otp);
      return { ...result, gateway: "navojit-v4-rust-fastify" };
    } catch (e) {
      return reply.code(400).send({ error: e.message });
    }
  });
  server.addHook("preHandler", async (req, reply) => {
    if (req.url?.startsWith(`${prefix}/profile`)) {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return reply.code(401).send({ error: "Missing Token" });
      const decoded = authEngine.verifyToken(token);
      if (decoded.error) return reply.code(401).send({ error: decoded.error });
      req.user = decoded;
    }
  });
}

// src/db/index.ts
var import_postgres_js = require("drizzle-orm/postgres-js");
var import_postgres = __toESM(require("postgres"));

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  organizations: () => organizations,
  refreshTokens: () => refreshTokens,
  roleEnum: () => roleEnum,
  users: () => users
});
var import_pg_core = require("drizzle-orm/pg-core");
var roleEnum = (0, import_pg_core.pgEnum)("role", ["owner", "admin", "member", "guest"]);
var organizations = (0, import_pg_core.pgTable)("organizations", {
  id: (0, import_pg_core.uuid)("id").primaryKey().defaultRandom(),
  name: (0, import_pg_core.varchar)("name", { length: 255 }).notNull(),
  slug: (0, import_pg_core.varchar)("slug", { length: 255 }).unique().notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var users = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.uuid)("id").primaryKey().defaultRandom(),
  orgId: (0, import_pg_core.uuid)("org_id").references(() => organizations.id).notNull(),
  email: (0, import_pg_core.varchar)("email", { length: 255 }).unique().notNull(),
  passwordHash: (0, import_pg_core.varchar)("password_hash", { length: 255 }).notNull(),
  role: roleEnum("role").default("member").notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var refreshTokens = (0, import_pg_core.pgTable)("refresh_tokens", {
  id: (0, import_pg_core.uuid)("id").primaryKey().defaultRandom(),
  userId: (0, import_pg_core.uuid)("user_id").references(() => users.id).notNull(),
  token: (0, import_pg_core.varchar)("token", { length: 500 }).unique().notNull(),
  revoked: (0, import_pg_core.boolean)("revoked").default(false).notNull(),
  expiresAt: (0, import_pg_core.timestamp)("expires_at").notNull()
});

// src/db/index.ts
var dotenv = __toESM(require("dotenv"));
dotenv.config();
var client = (0, import_postgres.default)(process.env.DATABASE_URL, { max: 1 });
var db = (0, import_postgres_js.drizzle)(client, { schema: schema_exports });

// src/adapters/drizzle.ts
var import_drizzle_orm = require("drizzle-orm");
var DrizzleAdapter = class {
  async getUserByEmail(email, orgId) {
    const result = await db.select().from(users).where((0, import_drizzle_orm.and)((0, import_drizzle_orm.eq)(users.email, email), (0, import_drizzle_orm.eq)(users.orgId, orgId))).limit(1);
    return result[0] || null;
  }
  async createUser(data) {
    const [newUser] = await db.insert(users).values({
      email: data.email,
      passwordHash: data.passwordHash,
      orgId: data.orgId,
      role: data.role
    }).returning();
    return newUser;
  }
};

// src/index.ts
var MongooseAdapter = class {
  constructor(model) {
    this.model = model;
  }
  model;
  async findUserByEmail(email) {
    return await this.model.findOne({ email });
  }
  async findUserById(id) {
    return await this.model.findById(id);
  }
  async createUser(data) {
    return await new this.model(data).save();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CredentialsProvider,
  DrizzleAdapter,
  GoogleProvider,
  MongooseAdapter,
  NavojitAuth,
  OTPProvider,
  attachFastifyAuth,
  createExpressAuthRouter,
  createNextAuthHandler
});
