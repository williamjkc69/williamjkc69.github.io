// Initialize Lucide icons
lucide.createIcons();
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Header background opacity on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrolled = window.pageYOffset;
  const opacity = Math.min(scrolled / 100, 1);
  header.style.background = `rgba(10, 10, 10, ${0.9 + opacity * 0.1})`;
});

// Particle animation enhancement
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.width = Math.random() * 10 + 5 + "px";
  particle.style.height = particle.style.width;
  particle.style.animationDelay = Math.random() * 6 + "s";
  particle.style.animationDuration = Math.random() * 4 + 4 + "s";

  document.querySelector(".hero").appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 10000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Contact form handling
// document
//   .querySelector(".contact-form")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Get form data
//     const formData = new FormData(this);
//     const name = formData.get("name");
//     const email = formData.get("email");
//     const subject = formData.get("subject");
//     const message = formData.get("message");

//     // Simple validation
//     if (!name || !email || !subject || !message) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     // Simulate form submission
//     const submitBtn = this.querySelector('button[type="submit"]');
//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = "Sending...";
//     submitBtn.disabled = true;

//     // Simulate API call delay
//     setTimeout(() => {
//       alert("Thank you for your message! I'll get back to you soon.");
//       this.reset();
//       submitBtn.textContent = originalText;
//       submitBtn.disabled = false;
//     }, 2000);
//   });

// Dynamic typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Start typing effect when page loads
window.addEventListener("load", () => {
  const subtitle = document.querySelector(".hero-subtitle");
  const originalText = subtitle.textContent;
  setTimeout(() => {
    typeWriter(subtitle, originalText, 100);
  }, 1000);
});

// Add scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

createScrollProgress();

// Skill tags hover effect enhancement
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) rotate(2deg)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
  });
});

// Project cards tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Add floating icons animation
function createFloatingIcon(icon, duration) {
  const floatingIcon = document.createElement("div");
  floatingIcon.innerHTML = icon;
  floatingIcon.style.cssText = `
                position: absolute;
                font-size: 20px;
                color: rgba(102, 126, 234, 0.3);
                pointer-events: none;
                animation: floatUp ${duration}s linear forwards;
                left: ${Math.random() * 100}%;
                bottom: 0;
            `;

  const style = document.createElement("style");
  style.textContent = `
                @keyframes floatUp {
                    to {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;

  if (!document.querySelector("style[data-float-animation]")) {
    style.setAttribute("data-float-animation", "true");
    document.head.appendChild(style);
  }

  document.querySelector(".hero").appendChild(floatingIcon);

  setTimeout(() => {
    if (floatingIcon.parentNode) {
      floatingIcon.parentNode.removeChild(floatingIcon);
    }
  }, duration * 1000);
}

// Create floating tech icons periodically
const techIcons = ["⚛️", "🌐", "⚡", "🚀", "💻", "🔧", "📱", "⚙️"];
setInterval(() => {
  const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
  createFloatingIcon(randomIcon, 8);
}, 4000);

// Enhanced mobile menu
function createMobileMenu() {
  const nav = document.querySelector("nav");
  const navLinks = document.querySelector(".nav-links");

  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.innerHTML = "☰";
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.setAttribute("aria-label", "Toggle mobile menu");

  nav.appendChild(mobileMenuBtn);

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");

    // Change hamburger icon to X when open
    if (navLinks.classList.contains("mobile-open")) {
      mobileMenuBtn.innerHTML = "✕";
    } else {
      mobileMenuBtn.innerHTML = "☰";
    }
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
      mobileMenuBtn.innerHTML = "☰";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains("mobile-open")) {
      navLinks.classList.remove("mobile-open");
      mobileMenuBtn.innerHTML = "☰";
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("mobile-open");
      mobileMenuBtn.innerHTML = "☰";
    }
  });
}

createMobileMenu();

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const thumbs = document.querySelectorAll(".thumb");
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeModal");

thumbs.forEach((img) => {
  img.onclick = function () {
    modal.classList.add("active");
    modalImg.src = this.src;
    modalImg.alt = this.alt;
  };
});

closeBtn.onclick = function () {
  modal.classList.remove("active");
  modalImg.src = "";
};
modal.onclick = function (e) {
  if (e.target === modal) {
    modal.classList.remove("active");
    modalImg.src = "";
  }
};

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const header = document.querySelector("header");
  const scrolled = window.pageYOffset;
  const opacity = Math.min(scrolled / 100, 1);
  header.style.background = `rgba(10, 10, 10, ${0.9 + opacity * 0.1})`;
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);
