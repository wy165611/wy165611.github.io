document.addEventListener('DOMContentLoaded', () => {
    // 1. 移动端汉堡菜单逻辑
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            // 简单淡入动画延迟
            setTimeout(() => menu.style.opacity = '1', 10);
        } else {
            menu.style.opacity = '0';
            setTimeout(() => {
                menu.classList.remove('flex');
                menu.classList.add('hidden');
            }, 300); // 等待过渡
        }
    });

    menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            menu.style.opacity = '0';
            setTimeout(() => {
                menu.classList.remove('flex');
                menu.classList.add('hidden');
            }, 300);
        }
    });

    // 2. 明暗主题切换逻辑
    const themeToggleBtns = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    const htmlElement = document.documentElement;

    const applyTheme = (isDark) => {
        if (isDark) {
            htmlElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            htmlElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    themeToggleBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                applyTheme(!htmlElement.classList.contains('dark'));
            });
        }
    });

    // 3. 导航栏滚动交互：变色与自动隐藏
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // 导航背景变色/模糊 (非顶部区域加深玻璃感)
        if (currentScrollY > 50) {
            navbar.classList.replace('border-transparent', 'border-slate-200');
            navbar.classList.add('dark:border-slate-800');
            navbar.style.backgroundColor = htmlElement.classList.contains('dark') ? 'rgba(11, 17, 32, 0.85)' : 'rgba(255, 255, 255, 0.85)';
        } else {
            navbar.classList.replace('border-slate-200', 'border-transparent');
            navbar.classList.remove('dark:border-slate-800');
            navbar.style.backgroundColor = 'transparent';
        }

        // 向上滚动显示，向下滚动隐藏
        if (currentScrollY > 200) {
            if (currentScrollY > lastScrollY) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
        }
        lastScrollY = currentScrollY;
    });

    // 4. 鼠标跟随光晕
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // 5. 首页视差背景效果
    const homeSection = document.getElementById('home');
    const parallaxBg = document.getElementById('parallax-bg');
    if (homeSection && parallaxBg) {
        homeSection.addEventListener('mousemove', (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            // 计算偏差，范围在 -1 到 1 之间
            const offsetX = (e.clientX / width - 0.5) * 2;
            const offsetY = (e.clientY / height - 0.5) * 2;

            // 视差移动系数
            parallaxBg.style.transform = `translate(${offsetX * -30}px, ${offsetY * -30}px)`;
        });

        homeSection.addEventListener('mouseleave', () => {
            parallaxBg.style.transform = 'translate(0px, 0px)';
        });
    }

    // 6. 滚动动画 Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');

                // 处理技能条动态加载
                const skillBar = entry.target.querySelector('.skill-bar-fill');
                if (skillBar) {
                    const widthLimit = skillBar.getAttribute('data-width');
                    skillBar.style.width = widthLimit;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => animateObserver.observe(el));
});