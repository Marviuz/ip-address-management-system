/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as DashboardImport } from './routes/dashboard';
import { Route as IndexImport } from './routes/index';
import { Route as AuthGoogleImport } from './routes/auth/google';

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const AuthGoogleRoute = AuthGoogleImport.update({
  id: '/auth/google',
  path: '/auth/google',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard': {
      id: '/dashboard';
      path: '/dashboard';
      fullPath: '/dashboard';
      preLoaderRoute: typeof DashboardImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/google': {
      id: '/auth/google';
      path: '/auth/google';
      fullPath: '/auth/google';
      preLoaderRoute: typeof AuthGoogleImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/dashboard': typeof DashboardRoute;
  '/auth/google': typeof AuthGoogleRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/dashboard': typeof DashboardRoute;
  '/auth/google': typeof AuthGoogleRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/dashboard': typeof DashboardRoute;
  '/auth/google': typeof AuthGoogleRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '/dashboard' | '/auth/google';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '/dashboard' | '/auth/google';
  id: '__root__' | '/' | '/dashboard' | '/auth/google';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  DashboardRoute: typeof DashboardRoute;
  AuthGoogleRoute: typeof AuthGoogleRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  AuthGoogleRoute: AuthGoogleRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/auth/google"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/auth/google": {
      "filePath": "auth/google.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
