export const InjectionScript  = () => {
  let highlightDiv: any;
  function createHighlighter() {
    highlightDiv = document.createElement('div');
    highlightDiv.style.position = 'absolute';
    highlightDiv.style.zIndex = '9999';
    highlightDiv.style.pointerEvents = 'none';
    highlightDiv.style.border = '2px solid red';
    highlightDiv.style.background = 'rgba(255, 0, 0, 0.1)';
    document.body.appendChild(highlightDiv);
  }
  function moveHighlighter(target: any) {
    const rect = target.getBoundingClientRect();
    highlightDiv.style.width = rect.width + 'px';
    highlightDiv.style.height = rect.height + 'px';
    highlightDiv.style.top = (window.scrollY + rect.top) + 'px';
    highlightDiv.style.left = (window.scrollX + rect.left) + 'px';
    highlightDiv.style.display = 'block';
  }
  function hideHighlighter() {
    highlightDiv.style.display = 'none';
  }
  document.addEventListener('mouseover', (e) => {
    if (e.target !== highlightDiv && e.target !== document.body && e.target !== document.documentElement) {
      moveHighlighter(e.target);
    }
  });
  document.addEventListener('mouseout', (e) => {
    hideHighlighter();
  });
  createHighlighter();
}

