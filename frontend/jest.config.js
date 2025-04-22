const getBasePath = (port) => {
    const PROXY_URI = process.env.VSCODE_PROXY_URI
    if (!PROXY_URI)
        return "/"
    const proxyURL = PROXY_URI.replace("{{port}}", port)
    const intermediatePath = proxyURL.split('//')[1]
    const desiredPath = intermediatePath.substring(intermediatePath.indexOf('/'))
    return desiredPath
}

module.exports = {
    // transform: {
    //     '^.+\\.js?$': 'babel-jest'
    // },
    testEnvironment: "jsdom",
    reporters: [
        "default",
        "jest-junit"
    ],
    ci: true,
    globals: {
        // define all globals for test here
        BASE_PATH: getBasePath(3000),
        PROXY_URI: process.env.VSCODE_PROXY_URI
    },
    transformIgnorePatterns: [
        "node_modules/(?!(@testing-library)/)"
      ],
      setupFilesAfterEnv : [
        '<rootDir>/src/setupTests.js'
      ]
}