(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

  const tabs = document.querySelectorAll('[role="tab"]');

  const codeKeys = {
    enter: 13,
    space: 32,
    end: 35,
    home: 36,
    left: 37,
    right: 39
  };

  let tabFocus = 0;

  function focusFirstTab() {
    tabs[tabFocus].focus();
  }

  function focusLastTab() {
    tabs[tabs.length - 1].focus();
  }

  function activateTab(tab) {
    tab.setAttribute('aria-selected', 'true');
    tab.focus();
  }

  for (let i = 0; i < tabs.length; i++) {
    addListeners(i);
  }

  function addListeners(index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);
    tabs[index].index = index;
  }

  function clickEventListener(event) {
    const tab = event.target.closest('[aria-controls]');
    activateTab(tab);
  }

  function keydownEventListener(event) {
    switch (event.keyCode) {
      case codeKeys.end:
        event.preventDefault();
        focusLastTab();
        break;
      case codeKeys.home:
        event.preventDefault();
        focusFirstTab();
        break;
    }
  }

  function keyupEventListener(event) {
    switch (event.keyCode) {
      case codeKeys.left:
      case codeKeys.right:
        changeSelectedTab(event);
        break;
      case codeKeys.enter:
      case codeKeys.space:
        activateTab(event.target);
        break;
    }
  }

  const tabDirection = {
    37: -1,
    39: 1
  };

  function changeSelectedTab(event) {
    if (tabDirection[event.keyCode]) {
      const target = event.target;
      if (tabs[target.index + tabDirection[event.keyCode]]) {
        tabs[target.index + tabDirection[event.keyCode]].focus();
      } else if (event.keyCode === codeKeys.left) {
        focusLastTab();
      } else if (event.keyCode === codeKeys.right) {
        focusFirstTab();
      }
    }
  }

