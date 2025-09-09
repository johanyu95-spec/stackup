// Function to generate the galaxy background for the main content
function generateMainGalaxyBackground() {
    const galaxy = document.querySelector("#mainContent .galaxy-bg");
    if (!galaxy) return;

    // Star colors for variety
    const starColors = ["color1", "color2", "color3", "color4", "color5"];

    // Create normal stars (more for a spectacular effect)
    for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.className =
            "star " + starColors[Math.floor(Math.random() * starColors.length)];
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
        const glowStar = document.createElement("div");
        glowStar.className =
            "star glow-star " +
            starColors[Math.floor(Math.random() * starColors.length)];
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
        "radial-gradient(circle at 30% 30%, #ffe066 0%, #ff6ec7 80%)",
        "radial-gradient(circle at 60% 40%, #b6b6ff 0%, #3a1c71 80%)",
    ];
    for (let i = 0; i < 4; i++) {
        const planet = document.createElement("div");
        planet.className = "planet";
        const size = Math.random() * 40 + 30;
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.top = `${Math.random() * 80 + 10}vh`;
        planet.style.left = `${Math.random() * 90}vw`;
        planet.style.background =
            planetColors[Math.floor(Math.random() * planetColors.length)];
        planet.style.animation = `planetMove ${
            25 + Math.random() * 15
        }s linear infinite alternate`;
        galaxy.appendChild(planet);
    }
    // Function to create a shooting star
    function createShootingStar() {
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";
        // 중앙에서 떨어지도록 위치 지정
        shootingStar.style.top = "0vh";
        shootingStar.style.left = "50vw";
        shootingStar.style.transform = "translateX(-50%) rotate(90deg)";
        galaxy.appendChild(shootingStar);
        setTimeout(() => shootingStar.remove(), 1200);
    }

    // Create shooting stars at a regular, more frequent interval
    setInterval(createShootingStar, 1500);
}

// Function to generate the background for the splash screen
function generateSplashGalaxyBackground() {
    const galaxy = document.querySelector("#splashScreen .galaxy-bg");
    if (!galaxy) return;

    const starColors = ["color1", "color2", "color3", "color4", "color5"];

    for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className =
            "star " + starColors[Math.floor(Math.random() * starColors.length)];
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${1.5 + Math.random()}s`;
        galaxy.appendChild(star);
    }
}

// 스플래시 화면 초기화 함수
function initializeSplashScreen() {
    const splashScreen = document.getElementById("splashScreen");
    const mainContent = document.getElementById("mainContent");
    const splashLogo = document.querySelector(".splash-logo");
    const shootingStarSplash = document.querySelector(".shooting-star-splash");

    // 별똥별 애니메이션
    const splashStarAnimation = (star) => {
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
    };

    if (shootingStarSplash) {
        splashStarAnimation(shootingStarSplash);
        setInterval(() => splashStarAnimation(shootingStarSplash), 3000);
    }

    // 로고 애니메이션이 끝난 후 메인 콘텐츠 표시
    const animationEndHandler = () => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
            splashScreen.remove();
            mainContent.classList.remove("d-none");
            generateMainGalaxyBackground();
        }, 500);
        splashLogo.removeEventListener("animationend", animationEndHandler);
    };

    if (splashLogo) {
        splashLogo.addEventListener("animationend", animationEndHandler);
    }

    generateSplashGalaxyBackground();
}

// 개별 캐러셀 초기화 함수
function initializeCarousel(carouselId, prevBtnId, nextBtnId, dotsId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsId);

    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = carousel.children;
    const totalSlides = slides.length;
    let currentIndex = 0;

    // 기존 dots 제거
    dotsContainer.innerHTML = "";

    // dots 생성
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    const updateCarousel = () => {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // dots 업데이트
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("active", i === currentIndex);
        }
    };

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // 초기 상태 업데이트
    updateCarousel();
}

// 모든 캐러셀 초기화
function initializeCarousels() {
    initializeCarousel("carousel-milkyway", "prevBtn-milkyway", "nextBtn-milkyway", "dots-milkyway");
    initializeCarousel("carousel-food", "prevBtn-food", "nextBtn-food", "dots-food");
    initializeCarousel("carousel-stay", "prevBtn-stay", "nextBtn-stay", "dots-stay");
}

// 햄버거 메뉴 기능
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }
}

// 개별 평점 시스템 설정
function setupIndividualRatingSystem(formId, ratingName, currentValueId) {
    const form = document.getElementById(formId);
    const currentValue = document.getElementById(currentValueId);
    const stars = document.querySelectorAll(`input[name="${ratingName}"]`);

    if (!form || !currentValue || stars.length === 0) return;

    stars.forEach(star => {
        star.addEventListener('change', () => {
            const selectedValue = document.querySelector(`input[name="${ratingName}"]:checked`)?.value;
            if (selectedValue) {
                currentValue.textContent = `선택된 평점: ${selectedValue}점`;
            }
        });
    });
}

// 최종 평점 및 소원 보내기 기능
function setupFinalRatingSystem() {
    const finalForm = document.getElementById("finalRatingForm");
    const finalCurrentValue = document.getElementById("finalCurrentValue");
    const finalErrorText = document.getElementById("finalErrorText");
    const finalStars = document.querySelectorAll('input[name="final-rating"]');
    
    if (!finalForm || !finalCurrentValue) return;

    // 평점 선택 시 표시 업데이트
    finalStars.forEach(star => {
        star.addEventListener('change', () => {
            const selectedValue = document.querySelector('input[name="final-rating"]:checked')?.value;
            if (selectedValue) {
                finalCurrentValue.textContent = `선택된 평점: ${selectedValue}점`;
                if (finalErrorText) {
                    finalErrorText.classList.add("d-none");
                }
            } else {
                finalCurrentValue.textContent = "선택된 평점: 없음";
            }
        });
    });

    // 폼 제출 처리
    finalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const selectedRating = document.querySelector('input[name="final-rating"]:checked')?.value;
        const reviewTextElem = document.getElementById("final-review-text");
        const reviewText = reviewTextElem ? reviewTextElem.value.trim() : "";

        if (!selectedRating) {
            if (finalErrorText) {
                finalErrorText.classList.remove("d-none");
            }
            finalCurrentValue.textContent = "선택된 평점: 없음";
            return;
        } else {
            if (finalErrorText) {
                finalErrorText.classList.add("d-none");
            }
        }

        if (!reviewText) {
            alert("소원을 작성해주세요!");
            if (reviewTextElem) reviewTextElem.focus();
            return;
        }

        // 성공 메시지 표시
        alert("태백에서 만나요! ✨");
        
        // 폼 리셋
        finalForm.reset();
        finalCurrentValue.textContent = "선택된 평점: 없음";
        if (finalErrorText) {
            finalErrorText.classList.add("d-none");
        }
    });
}

// Function for the typing effect
function typeWriterEffect(element, speed) {
    const text = element.innerHTML;
    let i = 0;
    element.innerHTML = ""; // Clear text
    element.classList.add("typing-text");

    function type() {
        if (i < text.length) {
            // Check for a line break tag
            if (text.substring(i, i + 4) === "<br>") {
                element.innerHTML += "<br>";
                i += 4;
            } else if (text.substring(i, i + 5) === "<br/>") {
                element.innerHTML += "<br/>";
                i += 5;
            } else if (text.substring(i, i + 6) === "<br />") {
                element.innerHTML += "<br />";
                i += 6;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        } else {
            element.classList.remove("typing-text"); // Remove cursor after typing is complete
        }
    }
    type();
}

// 스크롤 이벤트에 따른 타이핑 효과 적용
document.addEventListener("DOMContentLoaded", () => {
    const cardTexts = document.querySelectorAll(".card-text");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.6, // 60%가 보이면 실행
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            // no-typing-motion 클래스가 있으면 효과 적용하지 않음
            if (
                entry.isIntersecting &&
                !entry.target.classList.contains("typing-completed") &&
                !entry.target.classList.contains("no-typing-motion")
            ) {
                typeWriterEffect(entry.target, 30);
                entry.target.classList.add("typing-completed");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cardTexts.forEach((text) => {
        observer.observe(text);
    });

    // 모든 초기화 함수 호출
    initializeSplashScreen();
    initializeCarousels();
    setupHamburgerMenu();
    
    // 개별 평점 시스템 설정
    setupIndividualRatingSystem("ratingForm-milkyway", "rating-milkyway", "currentValue-milkyway");
    setupIndividualRatingSystem("ratingForm-food", "rating-food", "currentValue-food");
    setupIndividualRatingSystem("ratingForm-stay", "rating-stay", "currentValue-stay");
    
    // 최종 소원 보내기 기능 설정
    setupFinalRatingSystem();
});
