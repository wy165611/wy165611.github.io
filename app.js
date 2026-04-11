document.addEventListener('DOMContentLoaded', () => {
    // 1. 移动端汉堡菜单逻辑
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                menu.classList.add('flex');
                setTimeout(() => menu.style.opacity = '1', 10);
            } else {
                menu.style.opacity = '0';
                setTimeout(() => {
                    menu.classList.remove('flex');
                    menu.classList.add('hidden');
                }, 300);
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
    }

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

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // 导航背景变色/模糊 (非顶部区域加深玻璃感)
            if (currentScrollY > 50) {
                navbar.classList.replace('border-transparent', 'border-[#F2E3D5]');
                navbar.classList.add('dark:border-[#4A3326]');
                navbar.style.backgroundColor = htmlElement.classList.contains('dark') ? 'rgba(44, 30, 22, 0.85)' : 'rgba(255, 249, 242, 0.85)';
            } else {
                navbar.classList.replace('border-[#F2E3D5]', 'border-transparent');
                navbar.classList.remove('dark:border-[#4A3326]');
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
    }

    // 4. 滚动动画 Intersection Observer (极其顺滑的显现)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');

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