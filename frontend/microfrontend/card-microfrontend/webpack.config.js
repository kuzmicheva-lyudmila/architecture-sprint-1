module.exports = {
    name: "card",
    filename: "index.js",
    exposes: {
        './CardModel': './src/components/Card',
    },
    shared: ["react", "react-dom", "react-redux"]
};