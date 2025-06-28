// Open all Ext Links in new tab
let anchorLinks = document.querySelectorAll("a");

for (let i = 0; i < anchorLinks.length; i += 1) {
  if (anchorLinks[i].host !== window.location.hostname) {
    anchorLinks[i].setAttribute("target", "_blank");
  }
}

// Modal Stuff
{
  // Modal Popups
  {
    // open modal by id
    function openModal(id, id2) {
      document.getElementById(id).classList.add('open');
      // document.body.classList.add('nav-modal-open');
      window.setTimeout(function() {
        document.getElementById(id2).classList.add('fade-in');
      }, 50)
      // document.getElementById(id2).classList.remove('fade-out');
    }

    // close currently open modal (id2)
    function closeModal(id, id2) {
      // document.body.classList.remove('nav-modal-open');
      // document.getElementById(id2).classList.add('fade-out');
      document.getElementById(id2).classList.remove('fade-in');
      window.setTimeout(function() {
        document.querySelector('.nav-modal.open').classList.remove('open');
      }, 350);
    }

    window.addEventListener('load', function() {
      // close modals on background click
      document.addEventListener('click', event => {
          if (event.target.classList.contains('nav-modal')) {
              closeModal();
          }
      });
    });
  }

  // Show Button
  {
    // show button by id
    function toggleButton(id, id2) {
      document.getElementById(id).classList.add('button-show');
      document.getElementById(id).classList.remove('button-hide');
      document.getElementById(id2).classList.add('button-hide');
      document.getElementById(id2).classList.remove('button-show');
    }
  }

  // Click Events
  let mobileCloseButton = document.querySelector('button#mobileNavClose');
  let mobileOpenButton = document.querySelector('button#mobileNavButton');

  mobileCloseButton.onclick = function() { closeModal('navModal', 'navModalBody');toggleButton('sidebarMobileButton', 'mobileNavClose');};
  mobileOpenButton.onclick = function() { openModal('navModal', 'navModalBody');toggleButton('mobileNavClose', 'sidebarMobileButton');};
}