import fileDefault from '../assets/images/upload/file-blank-solid-240.png';
import fileCss from '../assets/images/upload/file-css-solid-240.png';
import filePdf from '../assets/images/upload/file-pdf-solid-240.png';
import filePng from '../assets/images/upload/file-png-solid-240.png';

export const itemSettings = [
  { title: 'Trang cá nhân', icon: 'fa-solid fa-user', link: 'user' },
  { title: 'Nhắn tin', icon: 'fa-solid fa-message', link: 'message' },
];

export const imageConfig = {
  default: fileDefault,
  pdf: filePdf,
  css: fileCss,
  png: filePng,
};
