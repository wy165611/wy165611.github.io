document.addEventListener('DOMContentLoaded', () => {
    // 1. 移动端汉堡菜单切换逻辑
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // 点击菜单项后自动收起菜单
    menu.addEventListener('click', () => {
        menu.classList.add('hidden');
    });

    // 2. 明暗主题切换逻辑
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // 检查本地存储中是否有用户偏好，或者系统偏好
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    // 点击切换按钮
    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        // 保存用户偏好到本地存储
        if (htmlElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });

    // 3. 滚动动画逻辑 (使用 Intersection Observer API)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 当元素有 10% 进入视口时触发
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素进入视口，添加 show 类触发 CSS 动画
                entry.target.classList.add('show');
                // 触发后停止观察该元素，确保动画只播放一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 获取所有带有 animate-on-scroll 类的元素并开始观察
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
});