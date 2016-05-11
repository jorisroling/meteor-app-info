Package.describe({
    name: 'jorisroling:app-info',
    version: '0.0.10',
    summary: 'Generates aplication info based on git',
    git: 'https://github.com/jorisroling/meteor-app-info.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: "app-info",
    use: [
		"meteor",
		// 'jorisroling:eyes@0.0.15'
	],
    sources: ['generate-info.js']
});

Package.onUse(function(api) {
	api.addFiles('AppInfo.js');
	api.export('AppInfo');
})
