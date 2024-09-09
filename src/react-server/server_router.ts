export const router = {
  homepage: import("./app/App.js"),
};

export type Paths = keyof typeof router;

export const getRoute = (path: Paths) => router[path] || import("./app/App.js");
