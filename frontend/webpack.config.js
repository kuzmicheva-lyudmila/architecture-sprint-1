module.exports = {
    name: "mainApp",
    remotes: {
        "auth": "auth@http://example.com/auth/remoteEntry.js",
        "profile": "profile@http://example.com/profile/remoteEntry.js",
        "card": "card@http://example.com/card/remoteEntry.js"
    },
    shared: ["react", "react-dom", "react-redux"]
    };