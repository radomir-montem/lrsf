function initCountdownAnnouncementbar() {
  const countDownBar = document.querySelector('.essential_countdown_annoucement_bar_wrapper');
  const stickyHeader = document.querySelector('.site-header--stuck');
  console.log('here', countDownBar, stickyHeader)

  if (!countDownBar || !stickyHeader) return;

  // Use offsetHeight to get actual height
  const barHeight = countDownBar.offsetHeight;

  stickyHeader.style.top = `${barHeight}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  initCountdownAnnouncementbar();
  window.addEventListener('resize', initCountdownAnnouncementbar);
});