import path from 'path';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';

import { WebpackOptions } from './types/types';

export const webpackPlugins = ({
	isDev,
	paths,
	envs,
}: WebpackOptions): Configuration['plugins'] => {
	const plugins: Configuration['plugins'] = [new DefinePlugin(envs)];

	if (isDev) {
		plugins.push(new ProgressPlugin());
		plugins.push(
			new CircularDependencyPlugin({
				failOnError: true,
			}),
		);
		// plugins.push(new BundleAnalyzerPlugin());
	} else {
		plugins.push(
			new CopyPlugin({
				patterns: [{ from: paths.locales, to: paths.buildLocales }],
			}),
		);
		// plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
};
