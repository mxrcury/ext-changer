"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/main.ts
var main_exports = {};
__export(main_exports, {
  ext_changer: () => ext_changer
});
module.exports = __toCommonJS(main_exports);
var fs = __toESM(require("fs/promises"), 1);
var path = __toESM(require("path"), 1);
var ext_changer = async (project_path, ext_replace_from, ext_replace_to) => {
  const current_files = await fs.readdir(project_path);
  current_files.forEach(async (f) => {
    const ext = path.extname(f);
    const is_dir = !ext;
    if (is_dir) {
      ext_changer(
        path.resolve(project_path, f),
        ext_replace_from,
        ext_replace_to
      );
    }
    const is_valid_ext = ext_replace_from === ext;
    if (!is_dir && is_valid_ext) {
      await update_file(project_path, f, {
        ext,
        ext_replace_from,
        ext_replace_to
      });
    }
  });
  return;
};
var update_file = async (base_path, f, { ext, ext_replace_to, ext_replace_from }) => {
  const old_path = path.resolve(base_path, f);
  const file = await fs.readFile(old_path);
  const base_name = f.slice(0, -ext.length);
  const new_file_path = path.resolve(
    base_path,
    base_name + ext.replace(ext_replace_from, ext_replace_to)
  );
  await fs.writeFile(new_file_path, file);
  await fs.rm(old_path);
  return;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ext_changer
});
