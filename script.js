const slider = document.querySelector(".slider");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const cards = document.querySelectorAll(".card");
const dotsContainer = document.querySelector(".dots-container");

let index = 0;
let totalSlides = cards.length;
let autoSlideInterval = 3000; // Auto sliding interval in milliseconds

// Create dots dynamically
function createDots() {
  dotsContainer.innerHTML = "";
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active-dot");
    dotsContainer.appendChild(dot);
  });
}

createDots();
const dots = document.querySelectorAll(".dot");

// Function to update slider position
function updateSlider() {
  const cardWidth = document.querySelector(".slider-wrapper").offsetWidth;
  slider.style.transform = `translateX(-${index * cardWidth}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active-dot", i === index);
  });
}

// Right button click
rightBtn.addEventListener("click", () => {
  if (index < totalSlides - 1) {
    index++;
    updateSlider();
  }
});

// Left button click
leftBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});

// Auto sliding function
function autoSlide() {
  index = (index + 1) % totalSlides;
  updateSlider();
}

// Start auto sliding
let slideInterval = setInterval(autoSlide, autoSlideInterval);

// Pause auto sliding on mouse enter
slider.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

// Resume auto sliding on mouse leave
slider.addEventListener("mouseleave", () => {
  slideInterval = setInterval(autoSlide, autoSlideInterval);
});

// Adjust slide width on window resize
window.addEventListener("resize", updateSlider);



const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.book-section');

// Function to hide all sections
function hideAllSections() {
  sections.forEach(section => {
    section.classList.remove('active');
  });
}

// Function to reset active navigation button
function resetActiveNavButtons() {
  navButtons.forEach(button => {
    button.classList.remove('active');
  });
}

// Add event listener to each navigation button
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const sectionId = button.getAttribute('data-section');

    // Hide all sections
    hideAllSections();
    resetActiveNavButtons();

    // Show the corresponding section
    const targetSection = document.getElementById(`sec-${sectionId}`);
    targetSection.classList.add('active');

    // Set active class to the clicked nav button
    button.classList.add('active');
  });
});

// By default, show the first section
document.getElementById('sec-a').classList.add('active');
document.querySelector('.nav-btn[data-section="a"]').classList.add('active');

// ---------------preview-----

// Zoom In function
function zoomIn() {
  var img = document.querySelector('.swiper-slide-active img');
  if (img) {
    var currentWidth = parseFloat(img.style.width) || 100;
    img.style.width = (currentWidth + 20) + '%';
    img.style.height = 'auto';
  }
}

// Zoom Out function
function zoomOut() {
  var img = document.querySelector('.swiper-slide-active img');
  if (img) {
    var currentWidth = parseFloat(img.style.width) || 100;
    var newWidth = currentWidth - 20;
    img.style.width = Math.max(newWidth, 60) + '%';
    img.style.height = 'auto';
  }
}

// Fit Width function
// Function to check if the user is on a mobile device
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// Fit Width function with different behavior for mobile
function fitWidth() {
  var img = document.querySelector('.swiper-slide-active img');
  if (img) {
    if (isMobileDevice()) {
      // For mobile, set height to 100% and width to auto
      img.style.width = '100%';
      img.style.height = '100%';
    } else {
      // For desktop, set width to 100% and height to auto
      img.style.width = '100%';
      img.style.height = 'auto';
    }
  }
}


// Close Slider function
function closeSlider() {
  document.getElementById('ebookSlider').style.display = 'none';
  document.getElementById('mainBody').style.display = 'block';
}

// Detect if the user is on a mobile device
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}
document.addEventListener('DOMContentLoaded', function () {
  var swiperInstance;

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('preview-button')) {
      var images = event.target.getAttribute('data-images').split(',');
      openSlider(images);
    }
  });

  function openSlider(images) {
    var swiperWrapper = document.getElementById('swiperWrapper');
    swiperWrapper.innerHTML = '';
    fitWidth();

    images.forEach(function (image) {
      var slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<div class="image-container"><img src="${image.trim()}" alt="Page"></div>`;
      swiperWrapper.appendChild(slide);
    });

    if (swiperInstance) {
      swiperInstance.update();
      swiperInstance.slideTo(0); // Start from the first slide
    } else {
      swiperInstance = new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        allowTouchMove: !isMobileDevice(),
        simulateTouch: false,
        on: {
          slideChange: function () {
            updateNavButtons(); // Check and update button visibility when the slide changes
          },
          reachEnd: function () {
            updateNavButtons(); // Disable "next" when the end is reached
          },
          reachBeginning: function () {
            updateNavButtons(); // Disable "prev" when the beginning is reached
          },
        },
      });
    }

    document.getElementById('ebookSlider').style.display = 'flex';
    document.getElementById('mainBody').style.display = 'none';
  }

  // Disable/Enable Navigation Buttons Based on Current Slide
  function updateNavButtons() {
    var prevButton = document.querySelector('.swiper-button-prev');
    var nextButton = document.querySelector('.swiper-button-next');

    // Disable "prev" button if at the first slide
    if (swiperInstance.isBeginning) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    // Disable "next" button if at the last slide
    if (swiperInstance.isEnd) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }

  // Fit width function for mobile and desktop
  function fitWidth() {
    var img = document.querySelector('.swiper-slide-active img');
    if (img) {
      if (window.innerWidth <= 767) { // Mobile view
        img.style.height = '100%';
        img.style.width = 'auto';
      } else { // Desktop view
        img.style.width = '100%';
        img.style.height = 'auto';
      }
    }
  }

  // Check if the user is on a mobile device
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  }
});


// -------------form-------------
function showLogin() {
  document.getElementById('loginContainer').classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

function hideLogin() {
  document.getElementById('loginContainer').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

function register() {
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  fetch('http://127.0.0.1:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').textContent = data.message;
      if (data.message === "User registered successfully!") {
        alert("Registration successful! Go to login.");
        switchToLogin();
      } else if (data.message === "Username already exists!") {
        alert("Username already exists! Please choose a different one.");
      }
    })
    .catch(error => console.error('Error:', error));
}

function login() {
  const username = document.getElementById('logUsername').value;
  const password = document.getElementById('logPassword').value;

  fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').textContent = data.message;
      if (data.message === "Login successful!") {
        hideLogin();
      }
    })
    .catch(error => console.error('Error:', error));
}

function switchToLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'flex';
  document.getElementById('formTitle').textContent = 'Login';
}

function switchToRegister() {
  document.getElementById('registerForm').style.display = 'flex';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('formTitle').textContent = 'Register';
}

function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = passwordInput.nextElementSibling;
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.textContent = '👁️';
  } else {
    passwordInput.type = 'password';
    eyeIcon.textContent = '👁️';
  }
}