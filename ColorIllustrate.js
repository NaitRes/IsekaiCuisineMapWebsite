// 粒子背景載入
particlesJS.load('Total-js', 'Total.json', function () {
    console.log('粒子背景載入完成');
});

// 音效元素
const SoundOfClick = document.getElementById("SoundOfClick");
const SoundOfHover = document.getElementById("SoundOfHover");
const ColorBlock = document.querySelectorAll('.ColorBlock');
const BGM = document.getElementById("BGM");
let BgmPlayed = false;

// 點擊背景播放音樂與背景淡出
document.addEventListener('click', () => {
    /*
    if (!BgmPlayed) {
        BGM.play();
        BgmPlayed = true;
    }
    */
    document.body.classList.add("Bg-Shown");
});

// Hover 色塊音效
ColorBlock.forEach(ClrBlk => {
    ClrBlk.addEventListener('mouseenter', () => {
        SoundOfHover.currentTime = 0;
        SoundOfHover.play();

        /*const Rect = ClrBlk.getBoundingClientRect();
        ParticleInterval = setInterval(() => {
            BurstParticles(Rect, getComputedStyle(ClrBlk).backgroundColor, 10);
        }, 100);*/
    });
});

// 按鈕 hover、點擊粒子 & 音效
const Buttons = document.querySelectorAll('.Buttons a');
let ParticleInterval = null;

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

// 粒子擴散函數
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
            opacity: 0.85;
            transform: translate(0,0);
            animation: Particle-explode 400ms ease-out forwards;
        `;

        Particle.style.setProperty('--offset-x', `${OffsetX}px`);
        Particle.style.setProperty('--offset-y', `${OffsetY}px`);

        document.body.appendChild(Particle);
        Particle.addEventListener('animationend', () => Particle.remove());
    }
}

// 點擊爆炸粒子
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
            opacity: 0.85;
            transform: translate(0,0);
            animation: Particle-explode 400ms ease-out forwards;
        `;

        Particle.style.setProperty('--offset-x', `${OffsetX}px`);
        Particle.style.setProperty('--offset-y', `${OffsetY}px`);

        document.body.appendChild(Particle);
        Particle.addEventListener('animationend', () => Particle.remove());
    }
}

// 動態加入動畫 CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes Particle-explode {
    to {
        transform: translate(var(--offset-x), var(--offset-y));
        opacity: 0;
    }
}
.glow {
    box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.7);
    transition: box-shadow 0.3s ease;
}
`;
document.head.appendChild(style);
