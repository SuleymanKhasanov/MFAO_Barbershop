export interface WebpackPaths {
	html: string;
	output: string;
	entry: string;
	initTheme: string;
	src: string;
	public: string;
	env: string;
	locales: string;
	buildLocales: string;
	httpsKey: string;
	httpsCert: string;
}

export interface EnvVariables {
	mode: 'development' | 'production';
}

export interface WebpackOptions {
	mode: 'development' | 'production';
	paths: WebpackPaths;
	isDev: boolean;
	envs: Record<string, string>;
	port?: number;
}
