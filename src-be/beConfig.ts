require('dotenv').config({ path: '../.env' });
const beServerHostUrl = (process.env.BE_SERVER_URL || '').replace(' ', '');
const beServerHostPort = process.env.BE_PORT;


const beConfig = {
    beBuild: process.env.BUILD_VERSION || 'version',
    isFeDevMode: process.env.FE_DEVELOPMENT_MODE,
    isFeDevModeHostUrl: process.env.FE_DEVELOPMENT_SERVER_URL,
    hostUrl: beServerHostUrl,
    hostPort: beServerHostPort,
    appName: process.env.BE_APP_NAME,


    rootURL: process.env.BE_ROOT_URL,
    noAccess: process.env.BE_NO_ACCESS,

    server: {
        port: beServerHostPort,
        checkToken: false,
    },

    passportSecret: process.env.BE_PASSPORT_SECRET,

    jwtConfig: {
        headerName: process.env.BE_HEADER_NAME,
        secretOrKey: process.env.BE_JWT_SECRET_KEY,
        tokenExpires: process.env.BE_JWT_TOKEN_EXPIRES,
    },

    requestCtx: 'ctx',

    restrictedAccessToApp: process.env.BE_RESTRICTED_ACCESS_TO_APP,
    beAuthOn: process.env.BE_AUTH_ON,
    permissionAccessUse: process.env.BE_PERMISSION_ACCESS_USE,

    connectionsName: {
        toMongo: 'to_mongo'
    },

    endPoints: {
        login: process.env.BE_LOGIN,
        loginOAuth2CallBack: process.env.BE_OAUTH2_CALLBACK,

        logout: process.env.BE_LOGOUT,

        public: process.env.BE_PUBLIC_ENDPOINTS,

        restBasePath: process.env.BE_REST_BASE_PATH,
    },

    logger: {
        type: 'combined' // 'combined', 'common', 'default', 'short', 'dev', 'tiny'
    },

    routes: {
        buildVersion: '/build-version',
        login: '/login',
        basket: '/basket',
        order: '/order',
        products: '/products',
        chat: '/chat'
    },

    publicRoutes: [
        '/login-page',
        '/logout',
        '/auth/oauth2/callback',
        '/api/v1/auth',
        '/api/v1/oauth',
        '/api/v1/build-version',
        '/api-ws/v1',
    ],

    mongoCollections: {
        users: 'users',
        baskets: 'baskets',
        orders: 'orders',
        products: 'products'
    },

    findingFields: {
        fieldName: process.env.BE_FIND_PARAMETR_NAME,
        fieldValue: process.env.BE_FIND_PARAMETR_VALUE,
    },

    ProductOperationType: {
        add: 'add',
        delete: 'delete'
    },

    serverMessages: {
        tryAgain: 'Error! Please, try again!',
        pageNotFound: "Page not found. Sorry, we couldn't find the page you are looking for.",
        noPermissions: 'Not enough permissions!',
        wrongMessage: 'Something went wrong!',
        email: {
            isNotUnique: 'Email should be unique. Please check it.',
        },
        product: {
            created: 'The Product was successfully added!',
            updated: 'The Product was successfully updated!',
            deleted: 'The Product was successfully deleted!',
        },
        basket: {
            added: 'The Product was successfully added to basket!',
            deleted: 'The Product was successfully deleted from basket!',
        },
        order: {
            created: 'The order was successfully created!',
            updated: 'The order was successfully updated!',
            deleted: 'The order was successfully deleted!',
        },
    }
};


export default beConfig;
