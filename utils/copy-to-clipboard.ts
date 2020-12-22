// https://stackoverflow.com/a/30810322/14307097
const fallbackCopyTextToClipboard = (text: string) => {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (error) {
    console.error('(Fallback) Error copying text: ', error);
  }

  document.body.removeChild(textArea);
};

const copyToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).catch(reason => {
    console.error('Error copying text: ', reason);
  });
};

export default copyToClipboard;
