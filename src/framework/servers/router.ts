const importHelper = (path: string, Component: string) => {
  return import(path).then((_module) => _module[Component]);
};

export const router = {
  ["/"]: importHelper("../../app/Homepage/Homepage.js", "Homepage"),
  homepage: importHelper("../../app/Homepage/Homepage.js", "Homepage"),
  ["add-note"]: importHelper(
    "../../app/AddEditNote/AddEditNote.js",
    "AddEditNote",
  ),
  ["my-notes"]: importHelper(
    "../../app/NotesListing/NotesListing.js",
    "NotesListing",
  ),
};

export type Paths = keyof typeof router;

export const getRoute = (path: Paths) => {
  return router[path];
};
