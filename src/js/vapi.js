// Vaizbtgads API - Core functionality
(function() {
    'use strict';

    // Check if we're in extension context
    if (typeof chrome === 'undefined' && typeof browser === 'undefined') {
        return;
    }

    // Use browser API if available, fallback to chrome
    const browserAPI = (function() {
        if (typeof browser !== 'undefined') {
            return browser;
        }
        if (typeof chrome !== 'undefined') {
            return chrome;
        }
        return null;
    })();

    if (!browserAPI) {
        return;
    }

    // Vaizbtgads namespace
    window.vaizbtgads = {
        // Storage utilities
        storage: {
            get: function(keys, callback) {
                browserAPI.storage.local.get(keys, callback);
            },
            set: function(items, callback) {
                browserAPI.storage.local.set(items, callback || function() {});
            },
            remove: function(keys, callback) {
                browserAPI.storage.local.remove(keys, callback || function() {});
            }
        },

        // Tab utilities
        tabs: {
            query: function(queryInfo, callback) {
                browserAPI.tabs.query(queryInfo, callback);
            },
            get: function(tabId, callback) {
                browserAPI.tabs.get(tabId, callback);
            },
            create: function(createProperties, callback) {
                browserAPI.tabs.create(createProperties, callback);
            }
        },

        // Runtime utilities
        runtime: {
            sendMessage: function(message, callback) {
                browserAPI.runtime.sendMessage(message, callback);
            },
            onMessage: {
                addListener: function(listener) {
                    browserAPI.runtime.onMessage.addListener(listener);
                }
            }
        },

        // WebRequest utilities (for background script)
        webRequest: browserAPI.webRequest ? {
            onBeforeRequest: browserAPI.webRequest.onBeforeRequest,
            onHeadersReceived: browserAPI.webRequest.onHeadersReceived
        } : null,

        // Utility functions
        utils: {
            getDomain: function(url) {
                try {
                    return new URL(url).hostname;
                } catch (e) {
                    return '';
                }
            },
            
            isValidUrl: function(url) {
                try {
                    new URL(url);
                    return true;
                } catch (e) {
                    return false;
                }
            }
        }
    };

})();