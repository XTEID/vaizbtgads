// Vaizbtgads Popup Script
(function() {
    'use strict';

    let currentTab = null;
    let stats = {};
    let settings = {};

    // Initialize popup
    function init() {
        getCurrentTab();
        loadData();
        setupEventListeners();
    }

    // Get current active tab
    function getCurrentTab() {
        vaizbtgads.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length > 0) {
                currentTab = tabs[0];
                updateSiteInfo();
            }
        });
    }

    // Load data from background script
    function loadData() {
        // Get statistics
        vaizbtgads.runtime.sendMessage({ type: 'getStats' }, function(response) {
            stats = response;
            updateStats();
        });

        // Get settings
        vaizbtgads.runtime.sendMessage({ type: 'getSettings' }, function(response) {
            settings = response;
            updateToggleButton();
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Toggle blocking button
        document.getElementById('toggle-blocking').addEventListener('click', function() {
            vaizbtgads.runtime.sendMessage({ type: 'toggleBlocking' }, function(response) {
                settings.enabled = response.enabled;
                updateToggleButton();
            });
        });

        // Open dashboard button
        document.getElementById('open-dashboard').addEventListener('click', function() {
            vaizbtgads.tabs.create({ url: 'dashboard.html' });
            window.close();
        });

        // Whitelist site button
        document.getElementById('whitelist-site').addEventListener('click', function() {
            if (currentTab) {
                const domain = vaizbtgads.utils.getDomain(currentTab.url);
                if (domain) {
                    vaizbtgads.runtime.sendMessage({ 
                        type: 'addToWhitelist', 
                        domain: domain 
                    }, function(response) {
                        if (response.success) {
                            showNotification('Site ditambahkan ke whitelist');
                            updateWhitelistButton(true);
                        }
                    });
                }
            }
        });
    }

    // Update statistics display
    function updateStats() {
        document.getElementById('blocked-count').textContent = 
            formatNumber(stats.blockedToday || 0);
        document.getElementById('requests-count').textContent = 
            formatNumber(stats.requestsToday || 0);
    }

    // Update toggle button
    function updateToggleButton() {
        const button = document.getElementById('toggle-blocking');
        const text = document.getElementById('toggle-text');
        
        if (settings.enabled) {
            button.classList.remove('disabled');
            text.textContent = 'Aktif';
        } else {
            button.classList.add('disabled');
            text.textContent = 'Nonaktif';
        }
    }

    // Update site information
    function updateSiteInfo() {
        if (currentTab) {
            const domain = vaizbtgads.utils.getDomain(currentTab.url);
            document.getElementById('site-url').textContent = domain || 'Unknown';
            
            // Check if site is whitelisted
            vaizbtgads.runtime.sendMessage({ type: 'getWhitelist' }, function(whitelist) {
                const isWhitelisted = whitelist.includes(domain);
                updateWhitelistButton(isWhitelisted);
            });
        }
    }

    // Update whitelist button
    function updateWhitelistButton(isWhitelisted) {
        const button = document.getElementById('whitelist-site');
        if (isWhitelisted) {
            button.textContent = 'Whitelisted';
            button.disabled = true;
            button.style.opacity = '0.6';
        } else {
            button.textContent = 'Whitelist';
            button.disabled = false;
            button.style.opacity = '1';
        }
    }

    // Format numbers for display
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Show notification (simple implementation)
    function showNotification(message) {
        // In a real implementation, you might want to show a toast or similar
        console.log('Notification:', message);
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();