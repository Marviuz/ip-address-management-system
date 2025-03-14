/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as UnauthenticatedImport } from './routes/_unauthenticated';
import { Route as AuthenticatedImport } from './routes/_authenticated';
import { Route as UnauthenticatedIndexImport } from './routes/_unauthenticated/index';
import { Route as AuthGoogleImport } from './routes/auth/google';
import { Route as UnauthenticatedRegisterImport } from './routes/_unauthenticated/register';
import { Route as AuthenticatedDashboardIndexImport } from './routes/_authenticated/dashboard/index';
import { Route as AuthenticatedActivityLogsIndexImport } from './routes/_authenticated/activity-logs/index';

// Create/Update Routes

const UnauthenticatedRoute = UnauthenticatedImport.update({
  id: '/_unauthenticated',
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any);

const UnauthenticatedIndexRoute = UnauthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => UnauthenticatedRoute,
} as any);

const AuthGoogleRoute = AuthGoogleImport.update({
  id: '/auth/google',
  path: '/auth/google',
  getParentRoute: () => rootRoute,
} as any);

const UnauthenticatedRegisterRoute = UnauthenticatedRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => UnauthenticatedRoute,
} as any);

const AuthenticatedDashboardIndexRoute =
  AuthenticatedDashboardIndexImport.update({
    id: '/dashboard/',
    path: '/dashboard/',
    getParentRoute: () => AuthenticatedRoute,
  } as any);

const AuthenticatedActivityLogsIndexRoute =
  AuthenticatedActivityLogsIndexImport.update({
    id: '/activity-logs/',
    path: '/activity-logs/',
    getParentRoute: () => AuthenticatedRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AuthenticatedImport;
      parentRoute: typeof rootRoute;
    };
    '/_unauthenticated': {
      id: '/_unauthenticated';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof UnauthenticatedImport;
      parentRoute: typeof rootRoute;
    };
    '/_unauthenticated/register': {
      id: '/_unauthenticated/register';
      path: '/register';
      fullPath: '/register';
      preLoaderRoute: typeof UnauthenticatedRegisterImport;
      parentRoute: typeof UnauthenticatedImport;
    };
    '/auth/google': {
      id: '/auth/google';
      path: '/auth/google';
      fullPath: '/auth/google';
      preLoaderRoute: typeof AuthGoogleImport;
      parentRoute: typeof rootRoute;
    };
    '/_unauthenticated/': {
      id: '/_unauthenticated/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof UnauthenticatedIndexImport;
      parentRoute: typeof UnauthenticatedImport;
    };
    '/_authenticated/activity-logs/': {
      id: '/_authenticated/activity-logs/';
      path: '/activity-logs';
      fullPath: '/activity-logs';
      preLoaderRoute: typeof AuthenticatedActivityLogsIndexImport;
      parentRoute: typeof AuthenticatedImport;
    };
    '/_authenticated/dashboard/': {
      id: '/_authenticated/dashboard/';
      path: '/dashboard';
      fullPath: '/dashboard';
      preLoaderRoute: typeof AuthenticatedDashboardIndexImport;
      parentRoute: typeof AuthenticatedImport;
    };
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedActivityLogsIndexRoute: typeof AuthenticatedActivityLogsIndexRoute;
  AuthenticatedDashboardIndexRoute: typeof AuthenticatedDashboardIndexRoute;
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedActivityLogsIndexRoute: AuthenticatedActivityLogsIndexRoute,
  AuthenticatedDashboardIndexRoute: AuthenticatedDashboardIndexRoute,
};

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
);

interface UnauthenticatedRouteChildren {
  UnauthenticatedRegisterRoute: typeof UnauthenticatedRegisterRoute;
  UnauthenticatedIndexRoute: typeof UnauthenticatedIndexRoute;
}

const UnauthenticatedRouteChildren: UnauthenticatedRouteChildren = {
  UnauthenticatedRegisterRoute: UnauthenticatedRegisterRoute,
  UnauthenticatedIndexRoute: UnauthenticatedIndexRoute,
};

const UnauthenticatedRouteWithChildren = UnauthenticatedRoute._addFileChildren(
  UnauthenticatedRouteChildren,
);

export interface FileRoutesByFullPath {
  '': typeof UnauthenticatedRouteWithChildren;
  '/register': typeof UnauthenticatedRegisterRoute;
  '/auth/google': typeof AuthGoogleRoute;
  '/': typeof UnauthenticatedIndexRoute;
  '/activity-logs': typeof AuthenticatedActivityLogsIndexRoute;
  '/dashboard': typeof AuthenticatedDashboardIndexRoute;
}

export interface FileRoutesByTo {
  '': typeof AuthenticatedRouteWithChildren;
  '/register': typeof UnauthenticatedRegisterRoute;
  '/auth/google': typeof AuthGoogleRoute;
  '/': typeof UnauthenticatedIndexRoute;
  '/activity-logs': typeof AuthenticatedActivityLogsIndexRoute;
  '/dashboard': typeof AuthenticatedDashboardIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/_authenticated': typeof AuthenticatedRouteWithChildren;
  '/_unauthenticated': typeof UnauthenticatedRouteWithChildren;
  '/_unauthenticated/register': typeof UnauthenticatedRegisterRoute;
  '/auth/google': typeof AuthGoogleRoute;
  '/_unauthenticated/': typeof UnauthenticatedIndexRoute;
  '/_authenticated/activity-logs/': typeof AuthenticatedActivityLogsIndexRoute;
  '/_authenticated/dashboard/': typeof AuthenticatedDashboardIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | ''
    | '/register'
    | '/auth/google'
    | '/'
    | '/activity-logs'
    | '/dashboard';
  fileRoutesByTo: FileRoutesByTo;
  to: '' | '/register' | '/auth/google' | '/' | '/activity-logs' | '/dashboard';
  id:
    | '__root__'
    | '/_authenticated'
    | '/_unauthenticated'
    | '/_unauthenticated/register'
    | '/auth/google'
    | '/_unauthenticated/'
    | '/_authenticated/activity-logs/'
    | '/_authenticated/dashboard/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren;
  UnauthenticatedRoute: typeof UnauthenticatedRouteWithChildren;
  AuthGoogleRoute: typeof AuthGoogleRoute;
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  UnauthenticatedRoute: UnauthenticatedRouteWithChildren,
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
        "/_authenticated",
        "/_unauthenticated",
        "/auth/google"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/activity-logs/",
        "/_authenticated/dashboard/"
      ]
    },
    "/_unauthenticated": {
      "filePath": "_unauthenticated.tsx",
      "children": [
        "/_unauthenticated/register",
        "/_unauthenticated/"
      ]
    },
    "/_unauthenticated/register": {
      "filePath": "_unauthenticated/register.tsx",
      "parent": "/_unauthenticated"
    },
    "/auth/google": {
      "filePath": "auth/google.tsx"
    },
    "/_unauthenticated/": {
      "filePath": "_unauthenticated/index.tsx",
      "parent": "/_unauthenticated"
    },
    "/_authenticated/activity-logs/": {
      "filePath": "_authenticated/activity-logs/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/dashboard/": {
      "filePath": "_authenticated/dashboard/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
