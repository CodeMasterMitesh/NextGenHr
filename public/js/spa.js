/**
 * Minimal SPA Router
 * - Intercepts in-app navigation
 * - Fetches partial HTML (?partial=1) via fetch
 * - Replaces #app content without full reload
 * - Falls back to full navigation on error or non-HTML partial
 */

(function () {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const isSameOrigin = (url) => {
    try {
      const u = new URL(url, window.location.origin);
      return u.origin === window.location.origin;
    } catch (_) {
      return false;
    }
  };

  const shouldSkip = (anchor) => {
    const href = anchor.getAttribute('href') || '';
    if (anchor.hasAttribute('data-no-spa')) return true;
    if (href.startsWith('#') || href.startsWith('javascript:')) return true;
    if (anchor.target && anchor.target !== '_self') return true;
    if (anchor.hasAttribute('download')) return true;
    return !isSameOrigin(href);
  };

  const reexecuteScripts = (container) => {
    const scripts = Array.from(container.querySelectorAll('script'));
    scripts.forEach((oldScript) => {
      const script = document.createElement('script');
      if (oldScript.src) {
        script.src = oldScript.src;
      } else {
        // Wrap inline scripts in an IIFE to avoid variable redeclaration errors
        const wrappedCode = `(function() {\n${oldScript.textContent}\n})();`;
        script.textContent = wrappedCode;
      }
      // Copy attrs
      Array.from(oldScript.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });
      oldScript.replaceWith(script);
    });
  };

  const fetchPartial = async (url) => {
    const targetUrl = url.includes('?') ? `${url}&partial=1` : `${url}?partial=1`;
    const res = await fetch(targetUrl, {
      headers: {
        'X-Requested-With': 'spa-fetch'
      }
    });
    if (!res.ok) throw new Error(`Load failed (${res.status})`);
    return res.text();
  };

  const navigate = async (url, { replace = false } = {}) => {
    try {
      const html = await fetchPartial(url);
      if (html.includes('<html')) {
        // Probably full page; fallback to hard navigation
        window.location.href = url;
        return;
      }
      appEl.innerHTML = html;
      reexecuteScripts(appEl);
      if (replace) {
        history.replaceState({ url }, '', url);
      } else {
        history.pushState({ url }, '', url);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('SPA navigation failed:', err);
      if (window.Toast && typeof Toast.error === 'function') {
        Toast.error('Unable to load page. Redirecting...');
      }
      setTimeout(() => (window.location.href = url), 400);
    }
  };

  const clickHandler = (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    let anchor = event.target;
    while (anchor && anchor.tagName !== 'A') {
      anchor = anchor.parentElement;
    }
    if (!anchor) return;
    if (shouldSkip(anchor)) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    event.preventDefault();
    navigate(href);
  };

  window.addEventListener('click', clickHandler);
  window.addEventListener('popstate', (e) => {
    const url = (e.state && e.state.url) || window.location.pathname;
    navigate(url, { replace: true });
  });

  // Expose navigate for manual calls (e.g., after login)
  window.spaNavigate = navigate;
})();
