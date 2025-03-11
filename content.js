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
document.readyState === 'complete' ? init() : window.addEventListener('load', init);

// function removeCopyLock() {
//     const targetClass = 'js-disable-copy';
//     if (document.body.classList.contains(targetClass)) {
//       document.body.classList.remove(targetClass);
//       console.log('[Copy Unlocker] Successfully removed copy restriction');
//     }
//   }
  
//   // 初始执行
//   removeCopyLock();
  
//   // 防御SPA动态加载（可选）
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach(() => removeCopyLock());
//   });
//   observer.observe(document.documentElement, {
//     childList: true,
//     subtree: true
//   });
