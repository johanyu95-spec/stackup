// Function to generate the galaxy background for the main content
function generateMainGalaxyBackground() {
  const galaxy = document.querySelector('#mainContent .galaxy-bg');
  if (!galaxy) return;

  // Star colors for variety
  const starColors = ['color1', 'color2', 'color3', 'color4', 'color5'];

  // Create normal stars (more for a spectacular effect)
  for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    star.className = 'star ' + starColors[Math.floor(Math.random() * starColors.length)];
    const size = Math.random() * 2.5 + 1.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${1.5 + Math.random()}s`;
    galaxy.appendChild(star);
  }

  // Create glowing stars (more and more intense)
  for (let i = 0; i < 15; i++) {
    const glowStar = document.createElement('div');
    glowStar.className = 'star glow-star ' + starColors[Math.floor(Math.random() * starColors.length)];
    const size = Math.random() * 12 + 8;
    glowStar.style.width = `${size}px`;
    glowStar.style.height = `${size}px`;
    glowStar.style.top = `${Math.random() * 100}vh`;
    glowStar.style.left = `${Math.random() * 100}vw`;
    glowStar.style.boxShadow = `0 0 25px 15px #fff, 0 0 50px 25px #ffb6ff`;
    glowStar.style.opacity = 0.8;
    glowStar.style.animation = `pulse 4s infinite alternate`;
    galaxy.appendChild(glowStar);
  }

  // Create planets (more)
  const planetColors = [
    'radial-gradient(circle at 30% 30%, #ffe066 0%, #ff6ec7 80%)',
    'radial-gradient(circle at 60% 40%, #b6b6ff 0%, #3a1c71 80%)'
  ];
  for (let i = 0; i < 4; i++) {
    const planet = document.createElement('div');
    planet.className = 'planet';
    const size = Math.random() * 40 + 30;
    planet.style.width = `${size}px`;
    planet.style.height = `${size}px`;
    planet.style.top = `${Math.random() * 80 + 10}vh`;
    planet.style.left = `${Math.random() * 90}vw`;
    planet.style.background = planetColors[Math.floor(Math.random() * planetColors.length)];
    planet.style.animation = `planetMove ${25 + Math.random() * 15}s linear infinite alternate`;
    galaxy.appendChild(planet);
  }

  // Function to create a shooting star
  function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.top = `${Math.random() * 80}vh`;
    shootingStar.style.left = `${Math.random() * 100}vw`;
    shootingStar.style.transform = `rotate(-${15 + Math.random()*30}deg)`;
    galaxy.appendChild(shootingStar);
    setTimeout(() => shootingStar.remove(), 1200);
  }

  // Create shooting stars at a regular, more frequent interval
  setInterval(createShootingStar, 1500);
}

// Function to generate the background for the splash screen
function generateSplashGalaxyBackground() {
  const galaxy = document.querySelector('#splashScreen .galaxy-bg');
  if (!galaxy) return;

  const starColors = ['color1', 'color2', 'color3', 'color4', 'color5'];

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star ' + starColors[Math.floor(Math.random() * starColors.length)];
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${1.5 + Math.random()}s`;
    galaxy.appendChild(star);
  }
}

// 캐러셀 초기화 함수
function initializeCarousel() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dots');

    if (carousel && prevBtn && nextBtn && dotsContainer) {
        const slides = carousel.children;
        let totalSlides = slides.length;
        let currentIndex = 0;

        // Create dots for carousel
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dotsContainer.appendChild(dot);
        }
        const dots = Array.from(dotsContainer.children);

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
        }

        prevBtn.addEventListener("click", prevSlide);
        nextBtn.addEventListener("click", nextSlide);

        // Auto-slide
        setInterval(nextSlide, 5000);

        // Initial setup for carousel
        updateCarousel();
    }
}


// 로딩 커버 페이지 관련 JavaScript
window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splashScreen');
  const mainContent = document.getElementById('mainContent');

  // 커버 페이지의 은하수 배경을 먼저 생성
  generateSplashGalaxyBackground();

  // 3.5초 후에 실행
  setTimeout(() => {
    // 커버 페이지를 서서히 사라지게 함
    splashScreen.style.opacity = '0';
    
    // 메인 콘텐츠를 서서히 나타나게 함
    mainContent.classList.remove('d-none');
    
    // 메인 콘텐츠 은하수 배경 생성 시작 및 캐러셀 초기화
    generateMainGalaxyBackground();
    initializeCarousel(); // 캐러셀 기능 초기화
    
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 500); // fadeOut 효과 시간과 일치시킴
  }, 3500); 
});


// 메뉴 토글 기능
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
  });
}

// Rating system functionality
const form = document.getElementById('ratingForm');
const currentValue = document.getElementById('currentValue');
const errorText = document.getElementById('errorText');
const reviewText = document.getElementById('review-text');

if (form) {
  form.addEventListener('change', () => {
    const value = new FormData(form).get('rating');
    if (value) {
      currentValue.textContent = `선택된 평점: ${value}점`;
      errorText.classList.add('d-none');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const value = data.get('rating');
    const review = reviewText.value.trim();

    if (!value) {
      errorText.classList.remove('d-none');
      return;
    }

    if (!review) {
      alert('후기를 작성해주세요!');
      return;
    }

    alert(`감사합니다! ${value}점 평점과 후기가 제출되었습니다.`);
    form.reset();
    currentValue.textContent = '선택된 평점: 없음';
  });
}

// Function for the typing effect
function typeWriterEffect(element, speed) {
  const text = element.textContent;
  let i = 0;
  element.textContent = ''; // Clear text
  element.classList.add('typing-text');

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing-text'); // Remove cursor after typing is complete
    }
  }
  type();
}

// 스크롤 이벤트에 따른 타이핑 효과 적용
document.addEventListener('DOMContentLoaded', () => {
  const cardTexts = document.querySelectorAll('.card-text');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8 // 80%가 보이면 실행
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 요소가 화면에 보이면 타이핑 효과 실행
        typeWriterEffect(entry.target, 30);
        // 한 번 실행된 후에는 관찰 중단
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  cardTexts.forEach(cardText => {
    observer.observe(cardText);
  });
});