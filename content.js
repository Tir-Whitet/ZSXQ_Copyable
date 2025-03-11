function removeCopyLock() {
    const targetClass = 'js-disable-copy';
    if (document.body.classList.contains(targetClass)) {
      document.body.classList.remove(targetClass);
      console.log('[Copy Unlocker] Successfully removed copy restriction');
    }
  }
  
  // 初始执行
  removeCopyLock();
  
  // 防御SPA动态加载（可选）
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => removeCopyLock());
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });