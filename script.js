const copyButton = document.getElementById('copy-citation');
const citation = document.getElementById('bibtex');
const copyStatus = document.getElementById('copy-status');

copyButton?.addEventListener('click', async () => {
  const text = citation?.textContent?.trim();
  if (!text) return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      if (!copied) throw new Error('Copy unavailable');
    }
    copyButton.textContent = 'Copied';
    copyStatus.textContent = 'BibTeX citation copied to clipboard.';
    window.setTimeout(() => {
      copyButton.textContent = 'Copy citation';
      copyStatus.textContent = '';
    }, 3000);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection?.removeAllRanges();
    selection?.addRange(range);
    copyStatus.textContent = 'Citation selected. Press Ctrl+C (or ⌘+C) to copy it.';
  }
});
