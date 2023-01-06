function toggleAccordion(e) {
  const accordion = e.currentTarget.parentNode.parentNode;
  const accHeader = e.currentTarget.parentNode;
  const accBody = e.currentTarget.parentNode.nextElementSibling;
  const accShowClass = 'accordion-body-show';
  // figure out if we are closing an open panel
  let closeAccordion = false;
  if (accHeader.classList.contains(accShowClass)) {
    closeAccordion = true;
  }
  for (let i = 0; i < accordion.childNodes.length; i++) {
    if (accordion.childNodes[i].classList) {
      // remove the max-height from any open accordion body
      if (accordion.childNodes[i].nodeName === 'DD') {
        accordion.childNodes[i].style.maxHeight = null;
      }
      // remove the open body class from anything in this accordion that might already be open
      // if there is an aria-expanded attribute, set to false
      if (accordion.childNodes[i].nodeName === 'DT') {
        accordion.childNodes[i].classList.remove(accShowClass);
        accordion.childNodes[i].firstChild.nextElementSibling.setAttribute('aria-expanded', 'false');
      }
    }
  }
  // add the open body class to the header
  // don't re-open this panel if we just closed it
  if (!closeAccordion) {
    accHeader.classList.add(accShowClass);
    e.currentTarget.setAttribute('aria-expanded', 'true');
    accBody.style.maxHeight = accBody.scrollHeight + 'px';
  }

  e.preventDefault();
}

// listen for panel clicks
const panels = document.querySelectorAll('.accordion dt a');
for (let i = 0; i < panels.length; i++) {
  panels[i].addEventListener('click', toggleAccordion);
}
