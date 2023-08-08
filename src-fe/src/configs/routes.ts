const API_URL = 'api/v1';
const API_WS_URL = 'api-ws/v1';

export const PathConfig = {
  bePort: ':8080',
  wsPort: ':8000',
  baseUrl: '/',

  login: '/login',
  logout: '/logout',

  apiEndpoint: API_URL,
  apiWSEndpoint: API_WS_URL,

  buildVersion: '/build-version',
  products: '/products',
  basket: '/basket',
  order: '/order',
  users: '/users',
  chat: '/chat',
};

export const RoutesConfig = {
  home: 'home',
  login: 'login',
  showcase: 'showcase',
  basket: 'basket',
  order: 'order',
  admin: 'admin',
  chat: 'chat',
  error: 'error',
};

export const ErrorRoutes = {
  accessDenied: '401',
  notEnoughPermissions: '403',
  notFound: '404',
  serverInternalError: '500',
};
