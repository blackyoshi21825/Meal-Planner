// Page Loading Animation
(function() {
    // Create loader element
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);

    // Show loader on page navigation
    function showLoader() {
        loader.style.display = 'flex';
    }

    // Hide loader when page loads
    function hideLoader() {
        loader.style.display = 'none';
    }

    // Add click listeners to navigation links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (link && link.href && !link.href.startsWith('#') && !link.href.startsWith('javascript:')) {
            showLoader();
        }
    });

    // Override location.href to show loader
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
        get: () => originalLocation,
        set: (url) => {
            showLoader();
            originalLocation.href = url;
        }
    });

    // Override document.location.href
    Object.defineProperty(document, 'location', {
        get: () => originalLocation,
        set: (url) => {
            showLoader();
            originalLocation.href = url;
        }
    });

    // Hide loader when page is fully loaded
    window.addEventListener('load', hideLoader);
    
    // Hide loader if page is already loaded
    if (document.readyState === 'complete') {
        hideLoader();
    }
})();