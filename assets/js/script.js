// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle')
const themeToggleMobile = document.getElementById('theme-toggle-mobile')
const body = document.body
const heroBg = document.getElementById('hero-bg')
const sidebarImg = document.getElementById('sidebar-img')

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light'
if (currentTheme === 'dark') {
  body.classList.remove('light-mode')
  body.classList.add('dark-mode')
  if (heroBg) heroBg.src = 'assets/img/night-bg.png'
}

// Theme toggle function
function toggleTheme() {
  const isDark = body.classList.contains('dark-mode')

  if (isDark) {
    body.classList.remove('dark-mode')
    body.classList.add('light-mode')
    if (heroBg) heroBg.src = 'assets/img/day-bg.png'
    localStorage.setItem('theme', 'light')
  } else {
    body.classList.remove('light-mode')
    body.classList.add('dark-mode')
    if (heroBg) heroBg.src = 'assets/img/night-bg.png'
    localStorage.setItem('theme', 'dark')
  }
}

// Theme toggle event listeners
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme)
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', toggleTheme)
}

// Sidebar Toggle for Mobile
const sidebarToggle = document.getElementById('sidebar-toggle')
const sidebar = document.getElementById('sidebar')
const sidebarClose = document.getElementById('sidebar-close')
const sidebarOverlay = document.getElementById('sidebar-overlay')

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active')
    sidebarToggle.classList.toggle('active')
    if (sidebarOverlay) {
      sidebarOverlay.classList.toggle('active')
    }

    // Animate hamburger menu
    const spans = sidebarToggle.querySelectorAll('span')
    if (sidebar.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)'
      spans[1].style.opacity = '0'
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)'
    } else {
      spans[0].style.transform = ''
      spans[1].style.opacity = ''
      spans[2].style.transform = ''
    }
  })
}

// Close sidebar function
function closeSidebar() {
  if (sidebar && sidebarToggle) {
    sidebar.classList.remove('active')
    sidebarToggle.classList.remove('active')
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove('active')
    }

    // Reset hamburger menu animation
    const spans = sidebarToggle.querySelectorAll('span')
    spans[0].style.transform = ''
    spans[1].style.opacity = ''
    spans[2].style.transform = ''
  }
}

// Close sidebar when clicking close button
if (sidebarClose) {
  sidebarClose.addEventListener('click', closeSidebar)
}

// Close sidebar when clicking overlay
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeSidebar)
} // Close sidebar when clicking on a link (mobile)
document.querySelectorAll('.sidebar-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
      closeSidebar()
    }
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      const offset = window.innerWidth <= 1024 ? 80 : 40
      const targetPosition = target.offsetTop - offset

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    }
  })
})

// Add active state to sidebar navigation on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section, article[id]')
  const sidebarLinks = document.querySelectorAll('.sidebar-link')

  let current = 'dashboard'

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    const offset = window.innerWidth <= 1024 ? 100 : 60

    if (window.pageYOffset >= sectionTop - offset) {
      const id = section.getAttribute('id')
      if (id) current = id
    }
  })

  sidebarLinks.forEach((link) => {
    link.classList.remove('active')
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active')
    }
  })
})

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
    }
  })
}, observerOptions)

// Observe all cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.magazine-card, .timeline-card, .experience-card, .project-magazine-card, .contact-info-card, .contact-social-card'
  )

  animatedElements.forEach((element, index) => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(element)
  })
})

// Handle window resize
let resizeTimer
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    // Close sidebar on desktop view
    if (window.innerWidth > 1024 && sidebar) {
      closeSidebar()
    }
  }, 250)
})

// Project card hover effects
document.querySelectorAll('.project-magazine-card').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-8px)'
  })

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)'
  })
})

// Stat counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target + '+'
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start) + '+'
    }
  }, 16)
}

// Animate stat counters when they come into view
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const h4 = entry.target.querySelector('h4')
        if (h4) {
          const value = parseInt(h4.textContent)
          if (!isNaN(value)) {
            h4.textContent = '0+'
            animateCounter(h4, value)
            entry.target.dataset.animated = 'true'
          }
        }
      }
    })
  },
  { threshold: 0.5 }
)

document.querySelectorAll('.stat-card').forEach((card) => {
  statObserver.observe(card)
})

// Tech tag hover effects
document.querySelectorAll('.tech-tag').forEach((tag) => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px) scale(1.05)'
  })

  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)'
  })
})

// Add parallax effect to hero card
const heroCard = document.querySelector('.hero-card')
if (heroCard) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * 0.3

    if (heroCard.querySelector('.card-bg-image')) {
      heroCard.querySelector(
        '.card-bg-image'
      ).style.transform = `translateY(${rate}px)`
    }
  })
}

// Timeline card entrance animation
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateX(0)'
      }
    })
  },
  { threshold: 0.2 }
)

document.querySelectorAll('.timeline-card').forEach((card, index) => {
  card.style.opacity = '0'
  card.style.transform = 'translateX(-30px)'
  card.style.transition = `opacity 0.6s ease ${
    index * 0.2
  }s, transform 0.6s ease ${index * 0.2}s`
  timelineObserver.observe(card)
})

// Experience card entrance animation
const experienceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  },
  { threshold: 0.2 }
)

document.querySelectorAll('.experience-card').forEach((card, index) => {
  card.style.opacity = '0'
  card.style.transform = 'translateY(30px)'
  card.style.transition = `opacity 0.6s ease ${
    index * 0.2
  }s, transform 0.6s ease ${index * 0.2}s`
  experienceObserver.observe(card)
})

// Add loading state
window.addEventListener('load', () => {
  document.body.classList.add('loaded')
  console.log('Dashboard Portfolio loaded successfully! 🚀')
})

// Handle image loading errors
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', function () {
    console.warn('Failed to load image:', this.src)
    this.style.opacity = '0.3'
  })
})

// Add smooth reveal for section headings
const headingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateX(0)'
      }
    })
  },
  { threshold: 0.5 }
)

document.querySelectorAll('.section-heading').forEach((heading) => {
  heading.style.opacity = '0'
  heading.style.transform = 'translateX(-20px)'
  heading.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
  headingObserver.observe(heading)
})

// Add click effect to buttons
document
  .querySelectorAll('.btn-primary, .btn-secondary, .btn-link, .social-link-btn')
  .forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span')
      ripple.style.position = 'absolute'
      ripple.style.borderRadius = '50%'
      ripple.style.background = 'rgba(255, 255, 255, 0.6)'
      ripple.style.width = '20px'
      ripple.style.height = '20px'
      ripple.style.animation = 'ripple 0.6s ease-out'

      const rect = this.getBoundingClientRect()
      ripple.style.left = e.clientX - rect.left - 10 + 'px'
      ripple.style.top = e.clientY - rect.top - 10 + 'px'

      this.style.position = 'relative'
      this.style.overflow = 'hidden'
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    })
  })

// Add CSS for ripple animation
const style = document.createElement('style')
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Console welcome message
console.log(
  "%c Welcome to Vince Balce's Portfolio! ",
  'background: linear-gradient(135deg, #e63946, #f72735); color: white; font-size: 16px; padding: 10px 20px; border-radius: 8px; font-weight: bold;'
)
console.log(
  '%c Dashboard-style magazine layout with modern design 🎨',
  'color: #e63946; font-size: 14px; font-weight: 600;'
)
