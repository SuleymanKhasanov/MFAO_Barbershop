import path from 'path';
import { Configuration } from 'webpack';
import { webpackConfig } from './config/webpack/webpackConfig';
import { EnvVariables, WebpackPaths } from './config/webpack/webpackPaths';

const modes = {
	development: '.env.development',
	production: '.env.production',
};

export default (env: EnvVariables): Configuration => {
	const paths: WebpackPaths = {
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		initTheme: path.resolve(
			__dirname,
			'src',
			'features',
			'theme',
			'switch-theme',
			'utils',
			'initTheme.ts',
		),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
		env: path.resolve(__dirname, modes[env.mode]),
		locales: path.resolve(__dirname, 'public', 'locales'),
		buildLocales: path.resolve(__dirname, 'build', 'locales'),
		httpsKey: path.resolve(__dirname, 'cert', 'localhost.key'),
		httpsCert: path.resolve(__dirname, 'cert', 'localhost.crt'),
	};

	const options = {
		mode: env.mode,
		paths,
		isDev: env.mode === 'development',
		envs: {
			'process.env.NODE_ENV': JSON.stringify(env.mode),
		},
		port: 3000,
		context: paths.src,
	};

	return webpackConfig(options);
};
