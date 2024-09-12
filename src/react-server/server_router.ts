const importHelper = (path: string, Component: string) => {
  return import(path).then((_module) => _module[Component]);
};

export const router = {
  homepage: importHelper("./app/Homepage.js", "Homepage"),
};

export type Paths = keyof typeof router;

export const getRoute = (path: Paths) =>
  router[path] || importHelper("./app/Homepage.js", "Homepage");
