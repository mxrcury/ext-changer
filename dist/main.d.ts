interface IExtensions {
    ext: string;
    ext_replace_to: string;
    ext_replace_from: string;
}
declare const ext_changer: (project_path: string, ext_replace_from: string, ext_replace_to: string) => Promise<void>;

export { IExtensions, ext_changer };
