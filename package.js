Package.describe({
    name: 'jorisroling:app-info',
    version: '0.0.3',
    summary: 'Generates aplication info based on git',
    git: 'https://github.com/jorisroling/meteor-app-info.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: "app-info",
    use: ["meteor"],
    sources: ['generate-info.js']
});