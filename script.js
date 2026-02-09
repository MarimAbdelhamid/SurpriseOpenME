// ====== QUICK CUSTOMIZE ======
const CONFIG = {
  hisName: "Ya Helw",
  yourName: "Marim",
  musicEnabled: false,
};

const terminalLines = [
  "Initializing birthday protocol...",
  "Checking: اجمل و اطعم حبيب في الدنيا... ✅ FOUND",
  "Loading: hugs(∞), kisses(∞), love(∞)...",
  "Running: love.exe --force --no-regrets",
  "Result: You are extremely loved.",
  "",
  "Happy Birthday ❤️",
];

// ====== ELEMENTS ======
const hisNameEl = document.getElementById("hisName");
const hisNameEl2 = document.getElementById("hisName2");
const yourNameEl = document.getElementById("yourName");
const terminalEl = document.getElementById("terminalText");

const btnStart = document.getElementById("btnStart");
const btnScroll = document.getElementById("btnScroll");
const btnLetter = document.getElementById("btnLetter");
const btnFireworks = document.getElementById("btnFireworks");
const btnConfetti = document.getElementById("btnConfetti");
const btnMusic = document.getElementById("btnMusic");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const resultEl = document.getElementById("result");

const letter = document.getElementById("letter");

const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas ? confettiCanvas.getContext("2d") : null;

// ====== INIT (safe) ======
if (hisNameEl) hisNameEl.textContent = CONFIG.hisName;
if (hisNameEl2) hisNameEl2.textContent = CONFIG.hisName;
if (yourNameEl) yourNameEl.textContent = CONFIG.yourName;

if (confettiCanvas && ctx) {
  fitCanvas();
  window.addEventListener("resize", fitCanvas);
}

if (noBtn) placeNoButtonRandomly();

// ====== TERMINAL TYPEWRITER ======
let typing = false;

function typeTerminal(lines, speed = 26) {
  if (typing || !terminalEl) return;
  typing = true;
  terminalEl.textContent = "";
  let i = 0;
  let j = 0;

  const tick = () => {
    if (i >= lines.length) {
      typing = false;
      return;
    }
    const line = lines[i];
    if (j < line.length) {
      terminalEl.textContent += line[j];
      j++;
      setTimeout(tick, speed);
    } else {
      terminalEl.textContent += "\n";
      i++;
      j = 0;
      setTimeout(tick, speed * 10);
    }
  };

  tick();
}

// ====== BUTTON GAME (NO ESCAPES) ======
let noAttempts = 0;

function placeNoButtonRandomly() {
  const arena = document.querySelector(".arena");
  if (!arena || !noBtn) return;

  const rect = arena.getBoundingClientRect();
  const padding = 14;

  const maxX = rect.width - noBtn.offsetWidth - padding;
  const maxY = rect.height - noBtn.offsetHeight - padding;

  const x = padding + Math.random() * Math.max(20, maxX);
  const y = padding + Math.random() * Math.max(20, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function teaseText() {
  const lines = [
    "HEHEEHHE 😌",
    "مفيش الكلام ده 😏",
    "بطل استهبال",
    "ما هو لا تحبني لا اكرهك في النسوان",
    "بس انا بحبك 🥲",
    "اخر محاولة 😤",
    "خلاص بقا",
    "ههههه عند ام ترتر",
    "كدا زودها -- اخلص بقا 😂",
  ];
  return lines[Math.min(noAttempts, lines.length - 1)];
}

if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    noAttempts++;
    placeNoButtonRandomly();
    if (resultEl) resultEl.textContent = teaseText();
    tinyConfetti(24);
  });

  noBtn.addEventListener("click", () => {
    noAttempts++;
    placeNoButtonRandomly();
    if (resultEl) resultEl.textContent = teaseText();
    tinyConfetti(30);
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    if (resultEl) {
      resultEl.textContent = "Wooohoooo 🎉 كنت عارفه انه في عقلك الباطني بتحبني 😊";
    }
    megaConfetti(220);
    const finalSection = document.querySelector(".final");
    if (finalSection) finalSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ====== LETTER ======
if (btnLetter && letter) {
  btnLetter.addEventListener("click", () => {
    letter.hidden = !letter.hidden;
    if (!letter.hidden) tinyConfetti(60);
  });
}

// ====== PAGE ACTIONS ======
if (btnStart) {
  btnStart.addEventListener("click", () => {
    typeTerminal(terminalLines);
    megaConfetti(160);
  });
}

if (btnScroll) {
  btnScroll.addEventListener("click", () => {
    const game = document.getElementById("game");
    if (game) game.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (btnFireworks) btnFireworks.addEventListener("click", () => megaConfetti(260));
if (btnConfetti) btnConfetti.addEventListener("click", () => megaConfetti(220));

if (btnMusic) {
  btnMusic.addEventListener("click", () => {
    CONFIG.musicEnabled = !CONFIG.musicEnabled;
    btnMusic.textContent = CONFIG.musicEnabled ? "🔈 Music" : "🔊 Music";
  });
}

// ====== CONFETTI ENGINE (simple + cute) ======
let confetti = [];
let anim = null;

function fitCanvas() {
  if (!confettiCanvas || !ctx) return;
  confettiCanvas.width = window.innerWidth * devicePixelRatio;
  confettiCanvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function spawnConfetti(count, power = 1) {
  if (!ctx) return;
  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < count; i++) {
    confetti.push({
      x: w / 2 + (Math.random() - 0.5) * 120,
      y: h / 2 + (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 10 * power,
      vy: (Math.random() - 1.1) * 12 * power,
      g: 0.35 + Math.random() * 0.12,
      r: 3 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      life: 110 + Math.random() * 40,
      kind: Math.random() < 0.35 ? "heart" : "rect",
    });
  }

  if (!anim) animate();
}

function drawHeart(x, y, s, rot) {
  if (!ctx) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  const t = s;
  ctx.moveTo(0, -t / 2);
  ctx.bezierCurveTo(t / 2, -t, t, -t / 4, 0, t);
  ctx.bezierCurveTo(-t, -t / 4, -t / 2, -t, 0, -t / 2);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,.92)";
  ctx.fill();
  ctx.restore();
}

function animate() {
  if (!ctx) return;
  anim = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confetti = confetti.filter((p) => p.life > 0);

  for (const p of confetti) {
    p.life--;
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;

    if (p.kind === "heart") {
      drawHeart(p.x, p.y, p.r * 3.2, p.rot);
    } else {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = "rgba(255,255,255,.75)";
      ctx.fillRect(-p.r, -p.r, p.r * 2.2, p.r * 1.6);
      ctx.restore();
    }
  }

  if (confetti.length === 0) {
    cancelAnimationFrame(anim);
    anim = null;
  }
}

function tinyConfetti(n = 24) {
  spawnConfetti(n, 0.8);
}
function megaConfetti(n = 220) {
  spawnConfetti(n, 1.3);
}

// Start with a small celebration
setTimeout(() => tinyConfetti(50), 500);

// 2) UNCOMMENT/ADD this in script.js (near the top with elements)
const bgm = document.getElementById("bgm");

// 3) REPLACE your btnMusic listener with this
if (btnMusic && bgm) {
  btnMusic.addEventListener("click", async () => {
    try {
      if (bgm.paused) {
        bgm.volume = 0.8;
        await bgm.play();                 // must be started by user click
        btnMusic.textContent = "🔈 Music";
      } else {
        bgm.pause();
        btnMusic.textContent = "🔊 Music";
      }
    } catch (e) {
      // if browser blocks it, this will still fail until a user gesture happens
      console.log("Audio play blocked:", e);
    }
  });
}
