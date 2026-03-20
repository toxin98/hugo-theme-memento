(function () {
  function initInfiniteScroll() {
    var list = document.querySelector('[data-infinite-scroll-list]');
    var sentinel = document.querySelector('[data-infinite-scroll-next]');

    if (!list || !sentinel) return;

    var loading = false;
    var observer = null;
    var scrollHandler = null;

    function getNextUrl() {
      return sentinel.getAttribute('data-next-url');
    }

    function setNextUrl(url) {
      if (url) {
        sentinel.setAttribute('data-next-url', url);
      } else {
        sentinel.removeAttribute('data-next-url');
      }
    }

    function setStatus(text) {
      var status = sentinel.querySelector('[data-infinite-scroll-status]');
      if (status) {
        status.textContent = text;
      }
    }

    function stop() {
      if (observer) {
        observer.disconnect();
      }
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
      sentinel.remove();
    }

    function appendCards(doc) {
      var newCards = doc.querySelectorAll('[data-infinite-scroll-item]');

      Array.prototype.forEach.call(newCards, function (card) {
        list.appendChild(card);
      });
    }

    function loadMore() {
      if (loading) return;

      var nextUrl = getNextUrl();
      if (!nextUrl) {
        stop();
        return;
      }

      loading = true;
      setStatus('正在加载...');

      fetch(nextUrl)
        .then(function (res) {
          if (!res.ok) {
            throw new Error('Failed to load next page: ' + res.status);
          }
          return res.text();
        })
        .then(function (html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');

          appendCards(doc);

          var newNext = doc.querySelector('[data-infinite-scroll-next]');
          if (newNext) {
            setNextUrl(newNext.getAttribute('data-next-url'));
            setStatus('加载更多');
          } else {
            stop();
          }
        })
        .catch(function (err) {
          console.error(err);
          setStatus('加载失败，稍后重试');
        })
        .then(function () {
          loading = false;
        });
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          loadMore();
        }
      }, {
        rootMargin: '0px',
        threshold: 0.5,
      });

      observer.observe(sentinel);
      return;
    }

    scrollHandler = function onScroll() {
      var rect = sentinel.getBoundingClientRect();
      if (rect.top < window.innerHeight - 48) {
        loadMore();
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInfiniteScroll);
  } else {
    initInfiniteScroll();
  }
})();
