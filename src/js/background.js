// Vaizbtgads Background Script
(function() {
    'use strict';

    // Statistics
    let stats = {
        totalBlocked: 0,
        requestsToday: 0,
        blockedToday: 0
    };

    // Settings
    let settings = {
        enabled: true,
        blockPopups: true,
        blockTrackers: true,
        showNotifications: false
    };

    // Whitelist
    let whitelist = new Set();

    // Filter lists (simplified)
    const filterLists = {
        ads: [
            '||doubleclick.net^',
            '||googleadservices.com^',
            '||googlesyndication.com^',
            '||facebook.com/tr^',
            '||google-analytics.com^'
        ],
        trackers: [
            '||google-analytics.com^',
            '||googletagmanager.com^',
            '||facebook.com/tr^',
            '||hotjar.com^'
        ]
    };

    // Initialize extension
    function init() {
        loadSettings();
        setupWebRequestListeners();
        setupMessageListeners();
        resetDailyStats();
    }

    // Load settings from storage
    function loadSettings() {
        vaizbtgads.storage.get(['settings', 'whitelist', 'stats'], function(result) {
            if (result.settings) {
                settings = { ...settings, ...result.settings };
            }
            if (result.whitelist) {
                whitelist = new Set(result.whitelist);
            }
            if (result.stats) {
                stats = { ...stats, ...result.stats };
            }
        });
    }

    // Save settings to storage
    function saveSettings() {
        vaizbtgads.storage.set({
            settings: settings,
            whitelist: Array.from(whitelist),
            stats: stats
        });
    }

    // Setup web request listeners
    function setupWebRequestListeners() {
        if (!vaizbtgads.webRequest) return;

        vaizbtgads.webRequest.onBeforeRequest.addListener(
            function(details) {
                stats.requestsToday++;
                
                if (!settings.enabled) {
                    return {};
                }

                const url = details.url;
                const domain = vaizbtgads.utils.getDomain(url);
                const initiatorDomain = details.initiator ? 
                    vaizbtgads.utils.getDomain(details.initiator) : '';

                // Check whitelist
                if (whitelist.has(initiatorDomain)) {
                    return {};
                }

                // Check against filter lists
                if (shouldBlock(url)) {
                    stats.totalBlocked++;
                    stats.blockedToday++;
                    saveSettings();
                    
                    console.log('Vaizbtgads blocked:', url);
                    return { cancel: true };
                }

                return {};
            },
            { urls: ['<all_urls>'] },
            ['blocking']
        );
    }

    // Check if URL should be blocked
    function shouldBlock(url) {
        const allFilters = [
            ...filterLists.ads,
            ...(settings.blockTrackers ? filterLists.trackers : [])
        ];

        return allFilters.some(filter => {
            // Simple filter matching (in real implementation, use proper filter engine)
            if (filter.startsWith('||') && filter.endsWith('^')) {
                const domain = filter.slice(2, -1);
                return url.includes(domain);
            }
            return url.includes(filter);
        });
    }

    // Setup message listeners
    function setupMessageListeners() {
        vaizbtgads.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            switch (message.type) {
                case 'getStats':
                    sendResponse(stats);
                    break;
                    
                case 'getSettings':
                    sendResponse(settings);
                    break;
                    
                case 'updateSettings':
                    settings = { ...settings, ...message.settings };
                    saveSettings();
                    sendResponse({ success: true });
                    break;
                    
                case 'toggleBlocking':
                    settings.enabled = !settings.enabled;
                    saveSettings();
                    sendResponse({ enabled: settings.enabled });
                    break;
                    
                case 'addToWhitelist':
                    whitelist.add(message.domain);
                    saveSettings();
                    sendResponse({ success: true });
                    break;
                    
                case 'removeFromWhitelist':
                    whitelist.delete(message.domain);
                    saveSettings();
                    sendResponse({ success: true });
                    break;
                    
                case 'getWhitelist':
                    sendResponse(Array.from(whitelist));
                    break;
                    
                default:
                    sendResponse({ error: 'Unknown message type' });
            }
        });
    }

    // Reset daily statistics at midnight
    function resetDailyStats() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(function() {
            stats.requestsToday = 0;
            stats.blockedToday = 0;
            saveSettings();
            
            // Set up daily reset
            setInterval(function() {
                stats.requestsToday = 0;
                stats.blockedToday = 0;
                saveSettings();
            }, 24 * 60 * 60 * 1000); // 24 hours
        }, msUntilMidnight);
    }

    // Initialize when script loads
    init();

})();