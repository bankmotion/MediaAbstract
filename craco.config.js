module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add watchOptions to ignore system files
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/C:/pagefile.sys',
          '**/pagefile.sys',
          '**/hiberfil.sys',
          '**/swapfile.sys',
          '**/System Volume Information/**',
          '**/Windows/**',
          '**/Program Files/**',
          '**/Program Files (x86)/**',
          '**/Users/**/AppData/**',
          '**/Users/**/Library/**',
          '**/tmp/**',
          '**/temp/**'
        ]
      };
      
      return webpackConfig;
    }
  }
}; 