// src/main.ts
import * as fs from "fs/promises";
import * as path from "path";
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
export {
  ext_changer
};
