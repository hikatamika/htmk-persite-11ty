// Open all Ext Links in new tab
let anchorLinks = document.querySelectorAll("a");

for (let i = 0; i < anchorLinks.length; i += 1) {
  if (anchorLinks[i].host !== window.location.hostname) {
    anchorLinks[i].setAttribute("target", "_blank");
  }
}

// Mobile Nav Button
{
  var mobileNavBtn = document.getElementById('mobileNavKnob');
  var mobileNav = document.getElementById('mobileNavDrawer');
  var mobileNavLst = document.getElementById('mobileNavList');

  mobileNavBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('mobile-nav-open');
    if (mobileNav.style.maxHeight){
      mobileNav.style.maxHeight = null;
    } else {
      mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    } 
  }, false);
}