// Vaizbtgads Content Script
(function() {
    'use strict';

    // Prevent multiple injections
    if (window.vaizbtgadsContentScript) {
        return;
    }
    window.vaizbtgadsContentScript = true;

    // Content script functionality
    const contentBlocker = {
        // Block elements by CSS selectors
        blockElements: function() {
            const adSelectors = [
                '[id*="ad"]',
                '[class*="ad"]',
                '[id*="banner"]',
                '[class*="banner"]',
                '.advertisement',
                '.ads',
                '.popup',
                '.modal-ad'
            ];

            adSelectors.forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        // Check if it's likely an ad
                        if (this.isLikelyAd(element)) {
                            element.style.display = 'none';
                            element.setAttribute('data-vaizbtgads-blocked', 'true');
                        }
                    });
                } catch (e) {
                    // Ignore invalid selectors
                }
            });
        },

        // Check if element is likely an ad
        isLikelyAd: function(element) {
            const text = element.textContent.toLowerCase();
            const adKeywords = ['advertisement', 'sponsored', 'ads by', 'promoted'];
            
            // Check text content
            if (adKeywords.some(keyword => text.includes(keyword))) {
                return true;
            }

            // Check dimensions (common ad sizes)
            const rect = element.getBoundingClientRect();
            const commonAdSizes = [
                [728, 90],   // Leaderboard
                [300, 250],  // Medium Rectangle
                [336, 280],  // Large Rectangle
                [320, 50],   // Mobile Banner
                [468, 60],   // Banner
                [234, 60],   // Half Banner
                [120, 600],  // Skyscraper
                [160, 600],  // Wide Skyscraper
                [300, 600],  // Half Page Ad
                [970, 90],   // Large Leaderboard
                [970, 250]   // Billboard
            ];

            return commonAdSizes.some(([width, height]) => {
                return Math.abs(rect.width - width) < 10 && 
                       Math.abs(rect.height - height) < 10;
            });
        },

        // Block popup windows
        blockPopups: function() {
            // Override window.open
            const originalOpen = window.open;
            window.open = function(url, name, features) {
                // Allow user-initiated opens
                if (event && event.isTrusted) {
                    return originalOpen.call(this, url, name, features);
                }
                
                console.log('Vaizbtgads blocked popup:', url);
                return null;
            };

            // Block some common popup triggers
            document.addEventListener('click', function(e) {
                const target = e.target;
                if (target.tagName === 'A' && target.target === '_blank') {
                    const href = target.href;
                    if (href && this.isLikelyAdUrl(href)) {
                        e.preventDefault();
                        console.log('Vaizbtgads blocked popup link:', href);
                    }
                }
            }.bind(this), true);
        },

        // Check if URL is likely an ad
        isLikelyAdUrl: function(url) {
            const adDomains = [
                'doubleclick.net',
                'googleadservices.com',
                'googlesyndication.com',
                'facebook.com/tr',
                'outbrain.com',
                'taboola.com'
            ];

            return adDomains.some(domain => url.includes(domain));
        },

        // Initialize content blocking
        init: function() {
            // Block elements on page load
            this.blockElements();
            this.blockPopups();

            // Watch for dynamically added content
            const observer = new MutationObserver(() => {
                this.blockElements();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Periodic cleanup
            setInterval(() => {
                this.blockElements();
            }, 2000);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            contentBlocker.init();
        });
    } else {
        contentBlocker.init();
    }

    // Listen for messages from popup/background
    vaizbtgads.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        switch (message.type) {
            case 'getPageInfo':
                sendResponse({
                    url: window.location.href,
                    title: document.title,
                    domain: window.location.hostname
                });
                break;
                
            case 'blockElement':
                // Manual element blocking (for future features)
                if (message.selector) {
                    const elements = document.querySelectorAll(message.selector);
                    elements.forEach(el => {
                        el.style.display = 'none';
                        el.setAttribute('data-vaizbtgads-blocked', 'true');
                    });
                    sendResponse({ blocked: elements.length });
                }
                break;
                
            default:
                sendResponse({ error: 'Unknown message type' });
        }
    });

})();