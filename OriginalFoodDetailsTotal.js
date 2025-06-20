// 粒子背景載入
particlesJS.load('Total-js', 'Total.json', function () {
    console.log('粒子背景載入完成');
});

// 音效元素
const SoundOfClick = document.getElementById("SoundOfClick");
const SoundOfHover = document.getElementById("SoundOfHover");
const BGM = document.getElementById("BGM");
let BgmPlayed = false;

// 點擊空白處加入背景透明效果
document.addEventListener('click', () => {
    /*if (!BgmPlayed) {
        BGM.play();
        BgmPlayed = true;
    }*/
    document.body.classList.add("Bg-Shown");
});

// 取得所有地圖按鈕
const Buttons = document.querySelectorAll('.Buttons a');
let ParticleInterval = null;

// 按鈕事件
Buttons.forEach(Btn => {
    Btn.addEventListener('mouseenter', () => {
        SoundOfHover.currentTime = 0;
        SoundOfHover.play();
        Btn.classList.add('glow');

        const Rect = Btn.getBoundingClientRect();
        ParticleInterval = setInterval(() => {
            BurstParticles(Rect, getComputedStyle(Btn).backgroundColor, 10);
        }, 100);
    });

    Btn.addEventListener('mouseleave', () => {
        Btn.classList.remove('glow');
        clearInterval(ParticleInterval);
        ParticleInterval = null;
    });

    Btn.addEventListener('click', (e) => {
        SoundOfClick.currentTime = 0;
        SoundOfClick.play();
        BurstParticlesAtPoint(e.clientX, e.clientY, getComputedStyle(Btn).backgroundColor, 25);
    });
});

// ✅ 修正後：持續爆粒子（不再用 CSS @keyframes）
function BurstParticles(BtnRect, Color, Count = 100) {
    for (let i = 0; i < Count; i++) {
        const Particle = document.createElement('span');
        const Size = Math.random() * 10 + 1.5;
        const Angle = Math.random() * 2 * Math.PI;
        const StartRadius = Math.random() * (BtnRect.width / 2);
        const ExplodeRadius = Math.random() * 180 + 60;

        const StartXOffset = Math.cos(Angle) * StartRadius;
        const StartYOffset = Math.sin(Angle) * StartRadius;
        const OffsetX = Math.cos(Angle) * ExplodeRadius;
        const OffsetY = Math.sin(Angle) * ExplodeRadius;

        const StartX = BtnRect.left + BtnRect.width / 2 + StartXOffset;
        const StartY = BtnRect.top + BtnRect.height / 2 + StartYOffset;

        Particle.style.cssText = `
            position: fixed;
            left: ${StartX}px;
            top: ${StartY}px;
            width: ${Size}px;
            height: ${Size}px;
            background: ${Color};
            border-radius: 50%;
            pointer-events: none;
            z-index: -10;
            opacity: 0.9;
        `;

        document.body.appendChild(Particle);

        Particle.animate([
            {
                transform: 'translate(0, 0)',
                opacity: 0.9
            },
            {
                transform: `translate(${OffsetX}px, ${OffsetY}px)`,
                opacity: 0
            }
        ], {
            duration: 400,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => Particle.remove();
    }
}

// ✅ 修正後：點擊時爆炸粒子（也用 JS 動畫）
function BurstParticlesAtPoint(X, Y, Color, Count = 100) {
    for (let i = 0; i < Count; i++) {
        const Particle = document.createElement('span');
        const Size = Math.random() * 4 + 2;
        const Angle = Math.random() * 2 * Math.PI;
        const Radius = Math.random() * 140 + 40;

        const OffsetX = Math.cos(Angle) * Radius;
        const OffsetY = Math.sin(Angle) * Radius;

        Particle.style.cssText = `
            position: fixed;
            left: ${X}px;
            top: ${Y}px;
            width: ${Size}px;
            height: ${Size}px;
            background: ${Color};
            border-radius: 50%;
            pointer-events: none;
            z-index: -10;
            opacity: 0.9;
        `;

        document.body.appendChild(Particle);

        Particle.animate([
            {
                transform: 'translate(0, 0)',
                opacity: 0.9
            },
            {
                transform: `translate(${OffsetX}px, ${OffsetY}px)`,
                opacity: 0
            }
        ], {
            duration: 400,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => Particle.remove();
    }
}
