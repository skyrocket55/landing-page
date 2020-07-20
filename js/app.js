/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const mainElement = document.querySelector('main');
const navbarMenu = document.querySelector('#navbar__list');

// Dynamically build navbar
function addNavBar(index) {
  const sectionElement = document.createElement('section');
  const landingElement = document.createElement('div');
  sectionElement.appendChild(landingElement);

  landingElement.setAttribute('class', 'landing__container');
  sectionElement.setAttribute('id', `section${index}`);
  sectionElement.setAttribute('data-nav', `Section ${index}`);

  landingElement.insertAdjacentHTML('beforeend', `<h2>Section ${index}</h2>`);
  landingElement.insertAdjacentHTML('beforeend', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>');
  landingElement.insertAdjacentHTML('beforeend', '<p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>');

  mainElement.appendChild(sectionElement);
}

for (let i = 4; i <= 5; i++) {
  addNavBar(i);
}

const sectionElements = document.querySelectorAll('section');

sectionElements.forEach(section => {
  navbarMenu.insertAdjacentHTML('beforeend', `<li><a href="${section.id}">${section.dataset.nav}</a></li>`)
});

const navbarList = document.querySelectorAll('li');

navbarList.forEach(navbarLink => {
  navbarLink.setAttribute('class', 'menu__link');
});

// Add class 'active' to section when near top of viewport
// Add and Remove active className
const addActiveClass = (inView, section, activeLink) => {
  if (inView) {
    section.classList.add('your-active-class');
    activeLink.classList.add('link__active');
  }
}
const removeActiveClass = (section, activeLink) => {
  section.classList.remove('your-active-class');
  activeLink.classList.remove('link__active');
}

//Apply Add & Remove Active sections to NavBar & Sections
function activeSection() {
  for (navbarElement of navbarList) {
    const section = navbarElement.firstChild.getAttribute('href') != '#' ? document.getElementById(navbarElement.firstChild.getAttribute('href')) : null;
    if (!Object.is(section, null)) {
      const sectionOffset = (Math.round(section.getBoundingClientRect().top));
      removeActiveClass(section, navbarElement);
      addActiveClass((sectionOffset < 250 && sectionOffset >= -250), section, navbarElement);
    }
  }
}
window.addEventListener('scroll', activeSection);

// Scroll to anchor ID using scrollTO event
document.querySelectorAll('li').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.getElementById(a.firstChild.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

//Scroll to Top button
function scrollToTop() {
  document.documentElement.scrollTop = 0;
}

//when user scrolls below the fold of the page
const scrollTopButton = document.getElementById('scrollTopButton');
window.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop >= 1000) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
});