import { useEffect, useId, useRef } from "react";

/**
 * The Fundación JD10 logo as a vector that follows currentColor.
 *
 * - "Fundación" fades in first, then JD10 is drawn the way it is written:
 *   J and D in one stroke, the flag, the 1, then the 0.
 * - intro="load": plays on the first page of a visit (the header).
 * - intro="view": plays the first time it scrolls into view (the footer).
 * - Hovering rewinds JD10 (0, 1, flag, D back into J) and draws it again;
 *   "Fundación" stays.
 * - With "reduce motion" on, or without JavaScript, the logo simply shows.
 *
 * Traced from the full-resolution logo. JD10 is monoline, so a thick round
 * stroke along each centerline (LINES), drawn on inside a mask, reveals the
 * exact shape as if it were being written.
 */
const SHAPE =
  "M 822.6 0.8 C 818.7 1.9 803.9 7.8 781.3 17.4 C 770.8 21.9 757.9 27.4 752.6 29.6 C 732.2 38.2 727.1 41.1 721.9 46.6 C 711.2 58.2 709.5 74.7 717.6 88.5 C 720.2 93 726.5 99.2 730.5 101.3 C 736.1 104.3 738.6 104.9 745.4 104.9 C 753.1 104.9 754.8 104.4 770.7 97.2 C 777.3 94.2 782.8 91.8 782.9 91.8 C 783 91.8 783.1 174.9 783.2 276.5 L 783.3 461.3 784.5 465.4 C 786.7 473.8 789.8 479.1 796 484.9 C 805.2 493.6 818.4 497 831.5 493.9 C 848.7 489.8 859.2 477.4 861.5 458.4 C 861.9 454.9 862.1 396.5 861.9 240.3 L 861.8 26.9 860.6 23.1 C 858.7 17 856.6 13.5 852.1 9 C 845.4 2.3 839.7 -0 830.4 0 C 827.7 0.1 824.1 0.4 822.6 0.8 M 1038.7 1.3 C 1003.8 3.6 976.4 13.1 952.8 31.2 C 950.4 33.1 945.5 37.5 941.9 41 C 916.8 65.5 901.8 96 897.2 132.1 C 895.8 142.6 895.4 159.3 895.4 204.6 C 895.4 235.8 895.2 248.7 894.8 249.1 C 894 249.9 894.5 341.5 895.3 349.7 C 898.9 385.5 908.7 412.4 927.4 437.1 C 945.1 460.7 969.9 477.5 999.1 485.9 C 1006.7 488.1 1017.9 490.4 1027.2 491.6 C 1035.9 492.8 1064 493 1072.1 491.9 C 1105.3 487.5 1131.1 475.2 1154 452.9 C 1172.4 434.9 1184 416.7 1191.6 393.6 C 1195.8 380.8 1198.1 368.9 1199.5 353.3 C 1200.3 345 1200.2 160.8 1199.5 149.2 C 1197.8 124.3 1193.8 105.3 1186.3 87.7 C 1175.8 63 1157.5 41.4 1133.4 25.4 C 1114.5 12.9 1093.4 5.3 1069.2 2.3 C 1062.9 1.5 1044.7 1 1038.7 1.3 M 450 3.6 C 430.6 4 423.2 4.6 410.3 7 C 374.1 13.6 341.2 30.1 311.2 56.4 C 283.7 80.5 264.2 109.5 253.1 142.8 C 247.5 159.6 244.2 175.5 242.2 195.6 C 241.6 202.4 241.4 216.2 241 274.1 C 240.6 349.6 240.7 347.7 237.9 358.6 C 235.5 367.9 230.7 378.1 224.8 385.8 C 221.2 390.6 212.6 398.8 207.5 402.4 C 192.6 413 174.5 417.8 156.4 415.9 C 124.4 412.7 101.7 398.2 89.3 373.1 C 84 362.5 82.1 355.9 79.3 338.9 C 76.6 323 74.5 317.9 68 310.9 C 62.3 304.8 55.8 301 47.7 298.9 C 42.1 297.5 33.5 297.7 27.9 299.5 C 14.7 303.7 4.7 314 1.3 327 C 0.1 331.8 0.2 347.4 1.6 356.7 C 8.6 404.7 31.7 441.6 71.1 467.8 C 94.4 483.4 119.7 492.3 148 494.9 C 157.1 495.8 176.7 495.3 185.4 493.9 C 214.2 489.5 239.4 478.7 261.2 461.4 C 267.7 456.3 278.8 445.4 284.1 439.1 C 301.1 418.8 312.1 394.6 317.2 366.4 C 320.1 349.9 320.1 350.3 320.5 272.6 C 320.9 195.5 320.8 197.6 323.6 184.9 C 332 146.4 357 114.3 392.1 97.1 C 415 85.9 437.6 82.6 486.9 83.3 C 499.1 83.4 512.3 83.8 516.4 84.1 C 551.6 86.7 580.7 98.7 605.1 120.7 C 620.9 134.9 637.4 158.5 646.7 180.2 C 655.6 200.9 659.7 220 660.4 242.6 C 660.9 261.3 659 277.3 654 296.4 C 642.1 342.6 619.4 374.1 583.4 394.6 C 571.2 401.6 553.8 408.3 541.2 411 C 527.3 413.9 518.9 414.4 486 414.5 L 461.6 414.6 461.4 286.4 C 461.3 163 461.2 158.1 460.3 154.9 C 456.5 141.6 447.4 131.5 435.4 127.4 C 429.8 125.5 424 124.9 418.6 125.6 C 399.2 128.2 386.5 141.1 383.6 161.3 C 382.9 166.1 382.9 452.1 383.6 457.4 C 384.4 463.7 385.6 467.7 388.3 473.2 C 390.5 477.8 391.4 479.1 395.1 482.8 C 398.8 486.5 400.2 487.5 404.7 489.7 C 415.1 494.7 412.9 494.5 459.2 494.8 C 500.5 494.9 518.7 494.5 532.6 493.1 C 602.5 485.7 658.7 450.9 698.1 390.5 C 731.4 339.4 744.8 275.7 735.6 212.1 C 729.7 171.1 713.1 130.5 689.1 98.2 C 648.1 43 594 11.6 528.2 4.9 C 510.9 3.2 491.6 2.8 450 3.6 M 180.5 5.4 C 178.7 5.8 175.6 6.6 173.7 7.3 C 161.3 11.9 151.5 23.6 149.2 36.6 C 148.4 41.5 148.9 50.5 150.2 55.4 C 154.3 69.5 164.9 80.3 178.2 83.8 C 183.5 85.2 196.9 85.8 219.1 85.5 C 238.8 85.2 240.2 85.1 242.2 84.1 C 245.3 82.7 247.7 80 260 64.6 C 280.7 38.7 285.4 34.2 310.7 15.7 C 324 5.9 324.1 5.9 324.1 5.6 C 324.1 5.4 323.4 5.1 322.5 4.9 C 321.6 4.8 290.1 4.6 252.4 4.7 C 198 4.7 183.2 4.9 180.5 5.4 M 1040 76.4 C 1020.6 79.1 1005.8 85.8 994.6 97.1 C 982.9 108.7 976.8 122.5 974.1 143.1 C 972.4 156.2 972.2 169.1 972.4 258.2 C 972.6 354.1 972.5 348.8 975.6 361.9 C 981.8 387.5 998.4 406 1022.1 413.8 C 1030.5 416.6 1036.2 417.5 1046.9 417.8 C 1055.3 418 1057.5 417.9 1062.8 417 C 1091.6 412.1 1111.2 393.4 1118.4 364.1 C 1122.2 348.5 1122.5 340.4 1122.5 243.3 C 1122.5 165.8 1122.2 147.9 1120.6 138.2 C 1117.1 117.2 1108.2 101.9 1092.8 90.3 C 1084 83.7 1075.9 79.9 1065.1 77.4 C 1060.1 76.2 1045.6 75.6 1040 76.4";

/** "FUNDACIÓN", in the same units as JD10 (it sits above it). */
const WORD =
  "M 1017.7 -241.2 C 1016 -239.6 1012 -235.8 1008.9 -232.7 L 1003.2 -227.2 1009.1 -227.2 L 1015.1 -227.2 1025.1 -234.9 C 1030.6 -239.1 1035.5 -242.9 1035.9 -243.4 C 1036.5 -244 1035.6 -244.1 1028.7 -244.1 L 1020.8 -244.1 1017.7 -241.2 M 774.1 -221.2 C 753.3 -219.2 737.5 -206.2 732.2 -186.9 C 730.6 -181 730.6 -169.2 732.2 -163.3 C 736.8 -146.3 750.2 -133.5 767.3 -130 C 772.5 -129 784.8 -129 789.7 -130 C 797.8 -131.7 806.3 -136.1 811.1 -141.1 L 813.2 -143.3 808.9 -147.3 L 804.7 -151.4 801.5 -148.7 C 795.1 -143.4 788.1 -141 779 -141 C 762.1 -141 749 -151 745.1 -166.7 C 743.9 -171.3 744.2 -180.6 745.6 -185.1 C 748.7 -195.2 754.3 -201.7 763.5 -206 C 768.4 -208.3 772.9 -209.2 779.3 -209.2 C 788.1 -209.2 796 -206.5 802 -201.2 L 804.7 -198.8 808.9 -203 L 813 -207.2 811 -209.3 C 806 -214.4 798.2 -218.5 789.7 -220.2 C 786.1 -221 777.4 -221.5 774.1 -221.2 M 1006.7 -221 C 993.8 -219.4 982.9 -213.6 975.1 -204.2 C 971.9 -200.3 967.6 -192 966.4 -187.4 C 964.5 -180.2 964.5 -170 966.4 -162.8 C 967.6 -158.2 971.9 -149.9 975.1 -146.1 C 981.2 -138.7 988.9 -133.7 999 -130.6 C 1003.3 -129.3 1017.4 -128.8 1022.8 -129.7 C 1041.4 -133.1 1055.6 -146.4 1059.8 -164.5 C 1061.1 -169.7 1061.1 -180.8 1059.8 -185.8 C 1055.4 -203.7 1042.2 -216.4 1024.1 -220.2 C 1019.7 -221.2 1010.9 -221.6 1006.7 -221 M -3.1 -175.1 L -3.1 -129.7 3.5 -129.9 L 10 -130 10.1 -148.1 L 10.3 -166.1 32.7 -166.3 L 55.1 -166.4 55.1 -172.1 L 55.1 -177.7 32.7 -177.8 L 10.3 -178 10.3 -193.3 L 10.3 -208.7 35.4 -208.7 L 60.5 -208.7 60.5 -214.6 L 60.5 -220.5 28.7 -220.5 L -3.1 -220.5 -3.1 -175.1 M 129.1 -220.2 C 128.9 -220 128.7 -207.5 128.7 -192.4 C 128.7 -163.2 129 -158.6 131.2 -152.2 C 134.8 -141.9 142.2 -134.5 152.3 -131 C 156.3 -129.7 157.5 -129.5 165.4 -129.3 C 173 -129.2 174.7 -129.3 178.6 -130.2 C 192.8 -133.6 202.1 -143.9 204.6 -159 C 204.9 -161 205.1 -173.5 205.1 -191.4 L 205.1 -220.5 198.8 -220.4 L 192.6 -220.3 192.3 -190.5 C 192 -164.3 191.9 -160.4 191.1 -157.7 C 187.8 -146.4 180.2 -141 167.6 -141 C 161.6 -141 158.1 -141.7 154.2 -143.7 C 148.7 -146.4 145.3 -150.9 143.3 -158.2 C 142.5 -160.9 142.3 -164.8 142.2 -190.9 L 142 -220.5 135.7 -220.5 C 132.2 -220.5 129.2 -220.4 129.1 -220.2 M 282.6 -175.1 L 282.6 -129.7 289.1 -129.9 L 295.6 -130 295.9 -163 L 296.2 -196.1 322.8 -163 L 349.4 -130 354.8 -130 L 360.3 -130 360.3 -175.1 L 360.3 -220.3 353.7 -220.4 L 347.2 -220.5 347.1 -187.1 L 346.9 -153.7 320 -187.1 L 293.1 -220.5 287.9 -220.5 L 282.6 -220.5 282.6 -175.1 M 438.2 -219.9 C 438.1 -219.5 438 -199.2 438.1 -174.6 L 438.2 -130 457.4 -129.8 C 483.8 -129.6 490.6 -130.4 499.9 -134.9 C 511.4 -140.4 518.7 -148.5 522.6 -159.9 C 524.7 -166.3 525.5 -173.5 524.7 -180.3 C 522.3 -202.5 506.3 -217.5 482.6 -220 C 475.1 -220.8 438.5 -220.7 438.2 -219.9 M 621.1 -219.6 C 620.6 -218.7 581.1 -131.5 580.7 -130.4 C 580.5 -129.9 582 -129.7 587.1 -129.7 C 591.9 -129.7 593.9 -129.9 594.2 -130.4 C 594.4 -130.7 596.7 -135.8 599.2 -141.5 L 603.9 -152.1 627.7 -152.2 L 651.6 -152.3 656.5 -141.2 L 661.4 -130 667.7 -129.9 C 671.2 -129.8 674.3 -129.8 674.7 -130 C 675.1 -130.1 668.4 -145.4 654.8 -175.2 L 634.4 -220.3 628 -220.4 C 622.3 -220.5 621.5 -220.4 621.1 -219.6 M 881.3 -219.9 C 881.1 -219.5 881.1 -199.2 881.1 -174.6 L 881.3 -130 887.8 -129.9 L 894.4 -129.7 894.4 -175.1 L 894.4 -220.5 887.9 -220.5 C 883.3 -220.5 881.4 -220.3 881.3 -219.9 M 1131.5 -219.9 C 1131.4 -219.5 1131.3 -199.2 1131.4 -174.6 L 1131.5 -130 1138.1 -129.9 L 1144.6 -129.7 1144.7 -163 L 1144.9 -196.3 1171.6 -163.2 L 1198.3 -130 1203.5 -129.9 L 1208.7 -129.7 1208.7 -175.1 L 1208.7 -220.5 1202.3 -220.5 L 1195.9 -220.5 1195.8 -187.2 L 1195.6 -154 1169 -187.1 L 1142.3 -220.3 1137 -220.4 C 1133.1 -220.5 1131.7 -220.4 1131.5 -219.9 M 1004.2 -208.5 C 994.9 -206.4 986.2 -199.6 982.1 -191.3 C 979.2 -185.4 978.5 -181.9 978.5 -175.1 C 978.5 -168.3 979.2 -164.9 982.1 -159 C 986.2 -150.5 994.8 -143.9 1004.4 -141.8 C 1010.6 -140.4 1020 -140.9 1025.4 -142.9 C 1038.4 -147.8 1046.5 -158.6 1047.5 -172.7 C 1048.6 -188.8 1039.7 -202.4 1024.7 -207.6 C 1021.4 -208.7 1019.7 -208.9 1014.1 -209.1 C 1009.6 -209.2 1006.4 -209 1004.2 -208.5 M 451.3 -175.1 L 451.3 -141.4 467.3 -141.7 C 485.4 -141.9 487 -142.2 494.3 -145.7 C 502.3 -149.6 508.2 -157 510.6 -166.2 C 511.6 -170.2 511.8 -179 510.8 -183.3 C 508.9 -192.4 502.6 -200.4 494.4 -204.5 C 486.9 -208.1 485.4 -208.3 467.3 -208.6 L 451.3 -208.8 451.3 -175.1 M 627 -204.6 C 626.6 -203.6 622.3 -193.9 617.5 -183.1 L 608.8 -163.3 627.6 -163.2 C 637.9 -163.1 646.4 -163.1 646.5 -163.3 C 646.6 -163.4 642.7 -172.4 637.9 -183.4 C 633.1 -194.4 628.8 -204 628.5 -204.9 L 627.8 -206.4 627 -204.6";

// Centerlines in writing order. Lines that start at a rounded end begin just
// outside the letter, so the first frame shows only the tip; the 0 starts where
// the 1 ends and sweeps into it from the bottom.
const LINES = [
  "M 43 230 L 43 322 C 43 400 95 452 163 452 C 235 452 284 405 284 330 L 284 250 A 206 206 0 1 1 490 456 L 423 456 L 423 162",
  "M 92 46 L 190 45 L 312 38",
  "M 679 108 L 742 78 L 800 50 C 815 43 821 52 821 80 L 821 455",
  "M 830 455 C 880 460 960 453 1045 453 C 1110 453 1159 410 1159 337 L 1159 155 C 1159 85 1110 39 1045 39 C 980 39 932 85 932 155 L 932 337 C 932 410 980 453 1045 453",
];

// When each line draws, as [start, length] fractions of the draw time.
const WINDOWS: Array<[number, number]> = [
  [0, 0.435],
  [0.4, 0.122],
  [0.504, 0.209],
  [0.696, 0.304],
];

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const TIMING = {
  intro: { delay: 0.4, draw: 2.4, rewind: 0, pause: 0 },
  hover: { delay: 0, draw: 2.4, rewind: 1.6, pause: 0.06 },
} as const;
const WORD_FADE = 1;

/** Set on <html> by LOGO_INTRO_SCRIPT before the first paint, so the header logo starts hidden. */
export const INTRO_CLASS = "jd10-intro";
const INTRO_SEEN = "jd10-intro-seen";

type Mode = keyof typeof TIMING;

function motionAllowed() {
  return (
    typeof Element.prototype.animate === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function keyframes(index: number, mode: Mode): Keyframe[] {
  const { draw, rewind, pause } = TIMING[mode];
  const total = rewind + pause + draw;
  const [start, length] = WINDOWS[index];
  const at = (seconds: number) => Math.min(1, Math.max(0, seconds / total));
  const eps = 0.0005;
  const frames: Keyframe[] = [];

  if (rewind > 0) {
    // Rewinding plays the drawing backwards: the last line goes first.
    const from = (1 - (start + length)) * rewind;
    frames.push(
      { offset: 0, strokeDashoffset: "0", opacity: 1 },
      { offset: at(from), strokeDashoffset: "0", opacity: 1, easing: EASE },
      { offset: at(from + length * rewind), strokeDashoffset: "1", opacity: 1 },
      { offset: at(from + length * rewind) + eps, strokeDashoffset: "1", opacity: 0 },
    );
  } else {
    frames.push({ offset: 0, strokeDashoffset: "1", opacity: 0 });
  }
  const drawFrom = rewind + pause + start * draw;
  frames.push(
    { offset: at(drawFrom), strokeDashoffset: "1", opacity: 0 },
    { offset: at(drawFrom) + eps, strokeDashoffset: "1", opacity: 1, easing: EASE },
    { offset: at(drawFrom + length * draw), strokeDashoffset: "0", opacity: 1 },
    { offset: 1, strokeDashoffset: "0", opacity: 1 },
  );
  let previous = 0;
  for (const frame of frames) {
    frame.offset = Math.min(1, Math.max(previous, frame.offset as number));
    previous = frame.offset;
  }
  return frames;
}

export function Logo({
  className = "",
  label = "Fundación JD10",
  intro,
}: {
  className?: string;
  label?: string;
  intro?: "load" | "view";
}) {
  const maskId = `jd10-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const busy = useRef(false);

  // Plays once at a time and always finishes, even if the pointer leaves.
  function play(mode: Mode) {
    const svg = svgRef.current;
    if (!svg || busy.current || !motionAllowed()) return;
    busy.current = true;
    const { delay, draw, rewind, pause } = TIMING[mode];
    const animations = [...svg.querySelectorAll<SVGPathElement>(".jd10-stroke")].map((path, i) =>
      path.animate(keyframes(i, mode), {
        duration: (rewind + pause + draw) * 1000,
        delay: delay * 1000,
        fill: "backwards",
      }),
    );
    if (mode === "intro") {
      const word = svg.querySelector(".jd10-word");
      if (word) animations.push(word.animate([{ opacity: 0 }, { opacity: 1 }], { duration: WORD_FADE * 1000, easing: "ease-out", fill: "backwards" }));
    }
    Promise.allSettled(animations.map((a) => a.finished)).then(() => {
      busy.current = false;
    });
  }

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.jd10Ready = "1";
    const svg = svgRef.current;
    if (!svg) return;

    if (intro === "load" && root.classList.contains(INTRO_CLASS)) {
      play("intro");
      try {
        sessionStorage.setItem(INTRO_SEEN, "1");
      } catch {}
      requestAnimationFrame(() => root.classList.remove(INTRO_CLASS));
    }

    if (intro === "view" && motionAllowed()) {
      const box = svg.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) return; // already on screen
      svg.classList.add("jd10-waiting");
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer.disconnect();
          play("intro");
          requestAnimationFrame(() => svg.classList.remove("jd10-waiting"));
        },
        { threshold: 0.6 },
      );
      observer.observe(svg);
      return () => observer.disconnect();
    }
  }, [intro]);

  return (
    <svg
      ref={svgRef}
      viewBox="-12 -252 1234 760"
      role="img"
      aria-label={label}
      data-intro={intro}
      onPointerEnter={() => play("hover")}
      className={`jd10-mark inline-block aspect-[1234/760] ${className}`}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="700">
          {LINES.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="jd10-stroke" />
          ))}
        </mask>
      </defs>
      <path className="jd10-word" d={WORD} fill="currentColor" fillRule="evenodd" />
      <path d={SHAPE} fill="currentColor" fillRule="evenodd" mask={`url(#${maskId})`} />
    </svg>
  );
}

/**
 * Inline script for <head>: on the first page of a visit, hides the header logo
 * before the first paint so it can draw in. Shows it anyway if the page's
 * JavaScript never starts.
 */
export const LOGO_INTRO_SCRIPT = `(function(){try{var r=document.documentElement;if(sessionStorage.getItem("${INTRO_SEEN}")||!r.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return;r.classList.add("${INTRO_CLASS}");setTimeout(function(){if(!r.dataset.jd10Ready)r.classList.remove("${INTRO_CLASS}")},4000)}catch(e){}})();`;
