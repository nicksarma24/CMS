const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

const PROXY_URI = process.env.VSCODE_PROXY_URI;

const getWebSocketURL = (port) => {
  if (!PROXY_URI) return "ws://0.0.0.0:3000/ws";
  const proxyURL = PROXY_URI.replace("{{port}}", port);
  wsURL = proxyURL.replace("http", "ws");
  return wsURL + "ws";
};

const getBasePath = (port) => {
  if (PROXY_URI) {
    const proxyURL = PROXY_URI.replace("{{port}}", port);
    const intermediatePath = proxyURL.split("//")[1];
    const desiredPath = intermediatePath.substring(
      intermediatePath.indexOf("/")
    );
    return JSON.stringify(desiredPath);
  } else {
    return JSON.stringify("/");
  }
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "index.js"),
  },

  output: {
    filename: "js/[name].js",
    clean: true,
    path: path.resolve(__dirname, "build"),
  },

  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      BASE_PATH: getBasePath(3000),
      PROXY_URI: JSON.stringify(PROXY_URI)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true,
    allowedHosts: "all",
    client: {
      logging: "error",
      webSocketURL: getWebSocketURL(3000),
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
