import path from 'path';
import { LoaderContext } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { WebpackOptions } from './types/types';

export const webpackLoaders = ({ isDev }: WebpackOptions): ModuleOptions['rules'] => {
	const cssLoader = {
		test: /\.css$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: true,
						getLocalIdent: (context: LoaderContext<{}>, _: string, localName: string) => {
							const filePath = context.resourcePath;
							const projectRoot = path.resolve(__dirname, 'src');
							const relativePath = path.relative(projectRoot, filePath);

							const className = relativePath
								.replace(/\\/g, '_')
								.replace(/\//g, '_')
								.replace(/\.module\.css$/, '')
								.replace(/\.tsx?$/, '');

							return `${className}_${localName}--[hash:base64:5]`;
						},
					},
					importLoaders: 1,
				},
			},
			'postcss-loader',
		],
	};

	const babelLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
		},
	};

	return [cssLoader, babelLoader];
};
