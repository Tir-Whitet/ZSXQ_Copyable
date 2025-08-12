function forceVideoPlayback() {
    // 用一个假的实现替换掉浏览器原生的IntersectionObserver
    window.IntersectionObserver = function(callback) {
      console.log('ZSXQ Helper: IntersectionObserver has been overridden to keep video playing.');
      // 立即用一个“可见”的状态调用回调函数，以触发视频播放
      const entries = [{ isIntersecting: true, intersectionRatio: 1.0 }];
      callback(entries, this);
  
      // 返回一个功能为空的观察者实例，使其后续的observe/unobserve调用失效
      return {
        observe: () => {},
        unobserve: () => {},
        disconnect: () => {},
        takeRecords: () => []
      };
    };
  }

function unlockCopy() {
  const targetClass = 'js-disable-copy';

  // ▶ 方案A：精准定位关键元素
  const criticalElements = document.querySelectorAll(`
    body.${targetClass},
    div.${targetClass}
  `);
  
  // ▶ 方案B：全量清除（推荐）
  const allElements = document.querySelectorAll(`.${targetClass}`);

  // 执行移除操作
  [allElements, criticalElements].forEach(collection => {
    collection.forEach(element => {
      element.classList.remove(targetClass);
    });
  });
}
function init() {
  unlockCopy();
  new MutationObserver(unlockCopy).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

// 安全启动
forceVideoPlayback();

document.readyState === 'complete' ? init() : window.addEventListener('load', init);

 