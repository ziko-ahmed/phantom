'use strict';

// Enhanced element toggle function with animation support
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
  
  // Add entrance animation if element becomes active
  if (elem.classList.contains('active')) {
    elem.style.animation = 'slideInFromBottom 0.5s ease-out';
  }
};

// Scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      // Add different animations based on element type
      if (element.classList.contains('service-item')) {
        element.style.animation = 'slideInFromBottom 0.6s ease-out';
      } else if (element.classList.contains('project-item')) {
        element.style.animation = 'rotateIn 0.8s ease-out';
      } else if (element.classList.contains('timeline-item')) {
        element.style.animation = 'slideInFromLeft 0.6s ease-out';
      }
      
      observer.unobserve(element);
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.service-item, .project-item, .timeline-item, .testimonials-item');
  animatedElements.forEach(el => observer.observe(el));
});



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Success modal functionality
const successModalContainer = document.querySelector("[data-success-modal-container]");
const successOverlay = document.querySelector("[data-success-overlay]");
const successModalCloseBtns = document.querySelectorAll("[data-success-modal-close-btn]");

// Show success modal
function showSuccessModal() {
  successModalContainer.classList.add("active");
  successOverlay.classList.add("active");
}

// Hide success modal
function hideSuccessModal() {
  successModalContainer.classList.remove("active");
  successOverlay.classList.remove("active");
}

// Add event listeners for success modal close buttons
successModalCloseBtns.forEach(btn => {
  btn.addEventListener("click", hideSuccessModal);
});

// Close modal when clicking overlay
successOverlay.addEventListener("click", hideSuccessModal);

// Form submission handling
form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Show loading state
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
  formBtn.setAttribute("disabled", "");
  
  // Create FormData object
  const formData = new FormData(form);
  
  // Submit form to Netlify
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(response => {
    // Check if response is ok or if it's a redirect (which Netlify does)
    if (response.ok || response.status === 200 || response.redirected) {
// Show success modal
      showSuccessModal();
      // Reset form
      form.reset();
      // Reset button
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
      formBtn.setAttribute("disabled", "");
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    // For Netlify forms, sometimes the "error" is actually success due to redirects
    // Let's check if it's a network error vs form submission
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      // This might be a CORS issue or network problem
      alert('There was a network error. Please check your connection and try again.');
    } else {
// Try to show success anyway as Netlify forms often "fail" due to redirects
      showSuccessModal();
      form.reset();
    }
    // Reset button
    formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    formBtn.removeAttribute("disabled");
  });
});



// project modal variables
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectBtns = document.querySelectorAll("[data-project-btn]");

// project modal elements to populate
const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalBody = document.querySelector("[data-project-modal-body]");
const projectModalLink = document.querySelector("[data-project-modal-link]");

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
  
  if (projectModalContainer.classList.contains("active")) {
    document.body.style.overflow = "hidden"; // Prevent scrolling
  } else {
    document.body.style.overflow = ""; // Restore scrolling
  }
}

// add click event to all project items
for (let i = 0; i < projectBtns.length; i++) {
  projectBtns[i].addEventListener("click", function (e) {
    if (this.hasAttribute("data-project-btn")) {
      e.preventDefault(); // Prevent navigating to href immediately
      
      const parentLi = this.closest(".project-item");
      
      // Extract data
      const imgSrc = this.querySelector("img").src;
      const imgAlt = this.querySelector("img").alt;
      const title = this.querySelector(".project-title").innerHTML;
      const category = this.querySelector(".project-category").innerHTML;
      const link = this.href;
      
      // Get hidden content
      const hiddenContent = this.querySelector(".project-content");
      
      let bodyHtml = "";
      if (hiddenContent) {
        const desc = hiddenContent.querySelector(".project-desc")?.innerHTML || "";
        const techStackText = hiddenContent.querySelector(".project-tech-stack")?.innerText || "";
        const featuresHtml = hiddenContent.querySelector(".project-features")?.outerHTML || "";
        
        // Format tech stack into tags
        let techTagsHtml = "";
        if (techStackText.trim() !== "") {
          const techs = techStackText.split(',').map(t => t.trim()).filter(t => t);
          techTagsHtml = `<div class="project-tech-stack">`;
          techs.forEach(tech => {
            techTagsHtml += `<span class="project-tech-stack-item">${tech}</span>`;
          });
          techTagsHtml += `</div>`;
        }
        
        bodyHtml = `<p>${desc}</p>${techTagsHtml}${featuresHtml}`;
      }
      
      // Populate modal
      projectModalImg.src = imgSrc;
      projectModalImg.alt = imgAlt;
      projectModalTitle.innerHTML = title;
      projectModalCategory.innerHTML = category;
      projectModalLink.href = link;
      projectModalBody.innerHTML = bodyHtml;
      
      // Show modal
      projectModalFunc();
    }
  });
}

// add click event to modal close button and overlay
if (projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", projectModalFunc);
if (projectOverlay) projectOverlay.addEventListener("click", projectModalFunc);

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

});
}

// Service items are now handled by CSS only for smooth transitions

// Enhanced project item animations
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
  
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05) translateY(-5px)';
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Tech stack item animations
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.05}s`;
  
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    const img = this.querySelector('img');
    if (img) {
      img.style.filter = 'brightness(1.2) saturate(1.3)';
    }
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = '';
    const img = this.querySelector('img');
    if (img) {
      img.style.filter = '';
    }
  });
});

// Navbar link enhanced animations
const navbarLinks = document.querySelectorAll('.navbar-link');
navbarLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    this.style.position = 'relative';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation to CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add loading animation for page elements
  const elementsToAnimate = document.querySelectorAll('.sidebar, .main-content');
  elementsToAnimate.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Enhanced form interactions
const formInputsEnhanced = document.querySelectorAll('.form-input');
formInputsEnhanced.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
    this.style.boxShadow = '0 0 20px hsla(180, 100%, 50%, 0.3)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = '';
    this.style.boxShadow = '';
  });
});

// Tech stack enhanced animations
const techStackItems = document.querySelectorAll('.tech-item');
techStackItems.forEach((item, index) => {
  // Staggered animation delay
  item.style.animationDelay = `${index * 0.08}s`;
  
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.05)';
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const img = this.querySelector('img');
    const span = this.querySelector('span');
    
    if (img) {
      img.style.filter = 'brightness(1.3) saturate(1.2)';
      img.style.transform = 'scale(1.15) rotate(5deg)';
    }
    
    if (span) {
      span.style.color = 'var(--cyan-electric)';
      span.style.transform = 'translateY(-2px)';
      span.style.fontWeight = '500';
    }
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const img = this.querySelector('img');
    const span = this.querySelector('span');
    
    if (img) {
      img.style.filter = '';
      img.style.transform = '';
    }
    
    if (span) {
      span.style.color = '';
      span.style.transform = '';
      span.style.fontWeight = '';
    }
  });
});

// Parallax effect for avatar
const avatar = document.querySelector('.avatar-box');
if (avatar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.1;
    avatar.style.transform = `translateY(${rate}px) scale(1.05)`;
  });
}

// Add a subtle cursor trail effect for interactive elements
const interactiveElements = document.querySelectorAll('button, a, .service-item, .project-item');
interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', function() {
    document.body.style.cursor = 'pointer';
  });
  
  element.addEventListener('mouseleave', function() {
    document.body.style.cursor = 'default';
  });
});
