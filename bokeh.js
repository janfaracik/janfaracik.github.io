const MONTHS = {
    1: [hsla(200, 80, 60, 0.15), hsla(0, 50, 40, 0.075), hsla(200, 80, 60, 0.15)],
    2: [hsla(40, 80, 30, 0.15), hsla(60, 50, 50, 0.075), hsla(100, 80, 60, 0.15)],
    3: [hsla(70, 50, 50, 0.15), hsla(30, 70, 40, 0.075)],
    4: [hsla(100, 50, 80, 0.1), hsla(20, 70, 40, 0.075)],
    5: [hsla(160, 50, 30, 0.15), hsla(20, 70, 50, 0.15), hsla(100, 70, 40, 0.1)],
    6: [hsla(200, 50, 20, 0.2), hsla(50, 60, 50, 0.075), hsla(0, 90, 80, 0.075)],
    7: [hsla(200, 50, 50, 0.15), hsla(40, 70, 40, 0.1)],
    8: [hsla(230, 50, 50, 0.15), hsla(110, 70, 40, 0.075)],
    9: [hsla(40, 50, 50, 0.15), hsla(0, 70, 40, 0.075)],
    10: [hsla(50, 30, 50, 0.15), hsla(0, 60, 40, 0.075)],
    11: [hsla(50, 70, 20, 0.15), hsla(0, 90, 80, 0.075), hsla(0, 70, 40, 0.075)],
    12: [hsla(200, 80, 60, 0.15), hsla(0, 50, 40, 0.075), hsla(200, 80, 60, 0.15)],
}

let c2 = document.querySelector('canvas'),
    ctx2 = c2.getContext('2d'),
    twoPi = Math.PI * 2,
    parts = [],
    sizeBase,
    cw,
    hue,
    count;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function hsla(h, s, l, a) {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
}

function create() {
    sizeBase = cw + ch;
    count = 6;
    hue = rand(0, 360);
    parts.length = 0;
    for (let i = 0; i < count; i++) {
        parts.push({
            radius: rand(1, sizeBase * 0.25),
            x: rand(0, cw),
            y: rand(0, ch),
            angle: rand(0, twoPi),
            vel: rand(0.1, 0.5),
            tick: rand(0, 1000)
        });
    }
}

function init() {
    resize();
    create();
    loop();
}

function loop() {
    requestAnimationFrame(loop);

    ctx2.clearRect(0, 0, cw, ch);

    let i = parts.length;
    while (i--) {
        const part = parts[i];

        part.x += Math.cos(part.angle) * part.vel;
        part.y += Math.sin(part.angle) * part.vel;
        part.angle += rand(-0.05, 0.05);

        var grd = ctx2.createLinearGradient(0, 0, cw, ch);

        const colors = Object.values(MONTHS[new Date().getMonth() + 1])
        const step = 1 / colors.length
        colors.forEach((value, index) => {
            grd.addColorStop(index == 0 ? 0 : step * (index + 1), value);
        })

        ctx2.fillStyle = grd;
        ctx2.fill()

        ctx2.beginPath();
        ctx2.arc(part.x, part.y, part.radius, 0, twoPi);

        if (part.x - part.radius > cw) {
            part.x = -part.radius
        }
        if (part.x + part.radius < 0) {
            part.x = cw + part.radius
        }
        if (part.y - part.radius > ch) {
            part.y = -part.radius
        }
        if (part.y + part.radius < 0) {
            part.y = ch + part.radius
        }
    }
}

function resize() {
    cw = c2.width = window.innerWidth;
    ch = c2.height = window.innerHeight;
    create();
}

init();
