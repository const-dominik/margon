const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomTime = () =>
  Math.floor((Math.random() * 7000).toFixed(3)) + 5000;

const _old = window.parseInput;
window.parseInput = async (data, b, c) => {
  if (data.captcha && data.captcha.content && !data.captcha.done) {
    resolveCaptcha(data.captcha.content);
  } else if (data.captcha && data.captcha.autostart_time_left) {
    await sleep(getRandomTime());
    window._g("captcha&start=1");
    const cap = document.querySelector("#pre-captcha");
    if (cap) cap.style.display = "none";
  }
  return _old(data, b, c);
};

const resolveCaptcha = async (captcha) => {
  let answer = null;
  const url = captcha.image.data;
  const answers = captcha.question.options;
  const question = captcha.question.text;
  if (!Array.isArray(answers)) {
    return;
  }
  if (question === "Jaki kolor ma tło środkowej części obrazka?") {
    answer = await new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      const canvas = document.createElement("canvas").getContext("2d");
      img.addEventListener("load", () => {
        canvas.drawImage(img, 0, 0, img.width, img.height);
        const points = [
          [25, 25],
          [75, 25],
          [50, 50],
          [25, 75],
          [75, 75],
        ].map(([x, y]) => canvas.getImageData(x, y, 1, 1).data);
        const colors = points.map((rgba) => getColorName(rgba));
        return resolve(getMostFrequentElement(colors));
      });
    });
  }
  if (/Zaznacz odpowiedź '(.*)' aby grać dalej/.test(question)) {
    answer = question.match(/Zaznacz odpowiedź '(.*)' aby grać dalej/)[1];
  }
  if (answer) {
    const urlAnswer = `captcha&answerId=${answers.findIndex(
      (el) => el === answer
    )}`;
    await sleep(getRandomTime());
    if (window.g.init <= 4) {
      window.sendFirstInit(`&${urlAnswer}`);
    } else {
      odp(urlAnswer);
    }
  }
};

const odp = (url) => {
  window._g(url, (res) => {
    if (!res || res.e !== "ok" || res.w || (res.captcha && !res.captcha.done)) {
      setTimeout(odp, 300, url);
    }
  });
};

const getMostFrequentElement = (arr) => {
  const modeMap = {};
  let maxEl;
  let maxCount = 1;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (el === null) {
      continue;
    }
    modeMap[el] ? modeMap[el]++ : (modeMap[el] = 1);
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};

const getColorName = (rgb) => {
  const [r, g, b] = rgb;
  const color = [
    "Czerwony",
    "Zielony",
    "Niebieski",
    "Żółty",
    "Biały",
    "Czarny",
  ];
  if (r > 200 && [g, b].every((col) => col < 100)) return color[0];
  if (g > 200 && [r, b].every((col) => col < 100)) return color[1];
  if (b > 200 && [r, g].every((col) => col < 100)) return color[2];
  if ([r, g].every((col) => col > 200) && b < 100) return color[3];
  if ([r, g, b].every((col) => col > 200)) return color[4];
  if ([r, g, b].every((col) => col < 100)) return color[5];
  return null;
};
