// TODO: Need to fix entities. Need to delete 'src/...' lines. There is build issue.
module.exports = {
	name: "to_mongo",
	type: "mongodb",
	host: process.env.MONGO_INITDB_HOST,
	port: process.env.MONGO_INITDB_PORT,
	username: process.env.MONGO_INITDB_ROOT_USERNAME,
	password: process.env.MONGO_INITDB_ROOT_PASSWORD,
	database: process.env.MONGO_INITDB_DATABASE,
	authenticationMechanism: "SCRAM-SHA-1",
	useUnifiedTopology: true,
	logging: ["error"],
	migrationsRun: false,
	synchronize: false,
	compilerOptions: {
		target: "ES2017",
		module: "commonjs"
	},
	entities: [
		"dist/src/entity/*.js",
		"dist/src/entity/**/**/*.js",
		"src/entity/*.ts",
		"src/entity/**/**/*.ts"
	],
	subscribers: [
		"dist/src/subscriber/*.js",
		"src/subscriber/*.ts",
	],
	migrations: [
		"dist/src/migration/*.js",
		"src/migration/*.ts"
	],
	cli: {
		"entitiesDir": "dist/src/entity",
		"migrationsDir": "dist/src/migration",
		"subscribersDir": "dist/src/subscriber"
	}
}