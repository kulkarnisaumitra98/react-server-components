const importHelper = (path: string, Component: string) => {
  return import(path).then((_module) => _module[Component]);
};

export const router = {
  ["/"]: importHelper("./app/Homepage.js", "Homepage"),
  homepage: importHelper("./app/Homepage.js", "Homepage"),
  ["add-note"]: importHelper("./app/AddEditNote.js", "AddEditNote"),
  ["edit-note"]: importHelper("./app/AddEditNote.js", "AddEditNote"),
  ["my-notes"]: importHelper("./app/MyNotes.js", "MyNotes"),
};

export type Paths = keyof typeof router;

export const getRoute = (path: Paths) => {
  return router[path];
};
