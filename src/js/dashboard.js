// Vaizbtgads Dashboard Script
(function() {
    'use strict';

    let stats = {};
    let settings = {};
    let whitelist = [];

    // Initialize dashboard
    function init() {
        loadData();
        setupNavigation();
        setupEventListeners();
    }

    // Load data from background script
    function loadData() {
        // Get statistics
        vaizbtgads.runtime.sendMessage({ type: 'getStats' }, function(response) {
            stats = response;
            updateOverview();
        });

        // Get settings
        vaizbtgads.runtime.sendMessage({ type: 'getSettings' }, function(response) {
            settings = response;
            updateSettings();
        });

        // Get whitelist
        vaizbtgads.runtime.sendMessage({ type: 'getWhitelist' }, function(response) {
            whitelist = response;
            updateWhitelist();
        });
    }

    // Setup navigation
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.dashboard-section');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Show corresponding section
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter list checkboxes
        const filterCheckboxes = document.querySelectorAll('.filter-item input[type="checkbox"]');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // In a real implementation, you would update filter lists
                console.log('Filter toggled:', this.parentElement.textContent.trim());
            });
        });

        // Add to whitelist
        document.getElementById('add-whitelist').addEventListener('click', function() {
            const input = document.getElementById('whitelist-input');
            const domain = input.value.trim();
            
            if (domain && isValidDomain(domain)) {
                vaizbtgads.runtime.sendMessage({ 
                    type: 'addToWhitelist', 
                    domain: domain 
                }, function(response) {
                    if (response.success) {
                        whitelist.push(domain);
                        updateWhitelist();
                        input.value = '';
                        showNotification('Domain ditambahkan ke whitelist');
                    }
                });
            } else {
                showNotification('Domain tidak valid');
            }
        });

        // Settings checkboxes
        document.getElementById('block-popups').addEventListener('change', function() {
            updateSetting('blockPopups', this.checked);
        });

        document.getElementById('block-trackers').addEventListener('change', function() {
            updateSetting('blockTrackers', this.checked);
        });

        document.getElementById('show-notifications').addEventListener('change', function() {
            updateSetting('showNotifications', this.checked);
        });

        // Enter key for whitelist input
        document.getElementById('whitelist-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('add-whitelist').click();
            }
        });
    }

    // Update overview section
    function updateOverview() {
        document.getElementById('total-blocked').textContent = 
            formatNumber(stats.totalBlocked || 0);
        document.getElementById('requests-today').textContent = 
            formatNumber(stats.requestsToday || 0);
        document.getElementById('active-filters').textContent = '2'; // Simplified
    }

    // Update settings checkboxes
    function updateSettings() {
        document.getElementById('block-popups').checked = settings.blockPopups;
        document.getElementById('block-trackers').checked = settings.blockTrackers;
        document.getElementById('show-notifications').checked = settings.showNotifications;
    }

    // Update whitelist display
    function updateWhitelist() {
        const list = document.getElementById('whitelist-list');
        list.innerHTML = '';

        if (whitelist.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Tidak ada domain yang di-whitelist';
            li.style.color = '#666';
            li.style.fontStyle = 'italic';
            list.appendChild(li);
            return;
        }

        whitelist.forEach(domain => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.padding = '10px 0';
            li.style.borderBottom = '1px solid #eee';

            const span = document.createElement('span');
            span.textContent = domain;
            
            const button = document.createElement('button');
            button.textContent = 'Hapus';
            button.style.padding = '4px 8px';
            button.style.border = '1px solid #ddd';
            button.style.background = 'white';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';
            button.style.fontSize = '12px';
            
            button.addEventListener('click', function() {
                removeFromWhitelist(domain);
            });

            li.appendChild(span);
            li.appendChild(button);
            list.appendChild(li);
        });
    }

    // Update a setting
    function updateSetting(key, value) {
        const newSettings = { ...settings };
        newSettings[key] = value;
        
        vaizbtgads.runtime.sendMessage({ 
            type: 'updateSettings', 
            settings: newSettings 
        }, function(response) {
            if (response.success) {
                settings = newSettings;
                showNotification('Pengaturan disimpan');
            }
        });
    }

    // Remove domain from whitelist
    function removeFromWhitelist(domain) {
        vaizbtgads.runtime.sendMessage({ 
            type: 'removeFromWhitelist', 
            domain: domain 
        }, function(response) {
            if (response.success) {
                whitelist = whitelist.filter(d => d !== domain);
                updateWhitelist();
                showNotification('Domain dihapus dari whitelist');
            }
        });
    }

    // Validate domain
    function isValidDomain(domain) {
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
        return domainRegex.test(domain);
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

    // Show notification
    function showNotification(message) {
        // Simple notification implementation
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = '#667eea';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '10000';
        notification.style.fontSize = '14px';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();