const menuContainer = document.getElementById("menuContainer");

function renderMenu(items){
  menuContainer.style.opacity = 0;

  setTimeout(() => {
    menuContainer.innerHTML = "";

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.animationDelay = `${index * 0.05}s`;

      card.innerHTML = `
        <img src="${item.image}" loading="lazy">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <p class="price">₹${item.price}</p>
      `;

      menuContainer.appendChild(card);
    });

    menuContainer.style.opacity = 1;
  }, 200);
}

renderMenu(menuItems);

/* CATEGORY FILTER WITH ACTIVE BUTTON */
function filterMenu(type){

  // PREVENT DOUBLE CLICK FLICKER
  if(menuContainer.style.opacity == 0) return;

  // REMOVE ACTIVE FROM ALL BUTTONS
  document.querySelectorAll('.filters button')
    .forEach(btn => btn.classList.remove('active'));

  // ADD ACTIVE TO CLICKED BUTTON
  event.target.classList.add('active');

  // FILTER LOGIC
  if(type === "all"){
    renderMenu(menuItems);
  } else {
    renderMenu(menuItems.filter(i => 
      i.type === type || i.category === type
    ));
  }
}

/* DEFAULT ACTIVE CATEGORY */
window.addEventListener("load", ()=>{
  const firstBtn = document.querySelector('.filters button');
  if(firstBtn) firstBtn.classList.add('active');

  // DEFAULT NAV ACTIVE
  const defaultNav = document.querySelector('.nav-links a[href="#menu"]');
  if(defaultNav) defaultNav.classList.add('active');
});


/* NAVBAR ACTIVE ON SCROLL */
const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});
