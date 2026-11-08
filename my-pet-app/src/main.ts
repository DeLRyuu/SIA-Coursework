import "./style.css";

const API = "https://dog.ceo/api";
const POOL_SIZE = 24;

// Timing (in milliseconds). Raise these to make the roll even longer.
const CHARGE_MS = 1500;
const SPIN_MS = 6000;

interface DogImageResponse {
  message: string;
  status: string;
}

interface DogImageListResponse {
  message: string[];
  status: string;
}

interface BreedListResponse {
  message: Record<string, string[]>;
  status: string;
}

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

const breedSelect = $<HTMLSelectElement>("breed");

const rollButton = $<HTMLButtonElement>("roll");
const reel = $<HTMLDivElement>("reel");
const empty = $<HTMLDivElement>("empty");
const pet = $<HTMLImageElement>("pet");
const caption = $<HTMLParagraphElement>("caption");
const errorBox = $<HTMLParagraphElement>("error");

// The frame reshapes itself to each photo, so the whole image always fits.
pet.style.objectFit = "contain";
reel.style.transition = "aspect-ratio 0.35s ease";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Preload an image and resolve with its width / height ratio (0 if it failed). */
function preload(url: string): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 0);
    img.onerror = () => resolve(0);
    img.src = url;
  });
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "hound", "afghan" -> "Afghan hound" */
function breedLabel(breed: string, sub?: string): string {
  return sub ? `${capitalize(sub)} ${breed}` : capitalize(breed);
}

/** Read the breed out of an image URL like .../breeds/hound-afghan/n02088094_1003.jpg */
function labelFromImageUrl(url: string): string {
  const slug = url.split("/breeds/")[1]?.split("/")[0] ?? "";
  const [breed, sub] = slug.split("-");
  return breed ? breedLabel(breed, sub) : "";
}

async function loadBreeds(): Promise<void> {
  try {
    const data = await getJSON<BreedListResponse>(`${API}/breeds/list/all`);
    const options: { value: string; label: string }[] = [];

    for (const [breed, subs] of Object.entries(data.message)) {
      if (subs.length === 0) {
        options.push({ value: breed, label: breedLabel(breed) });
      } else {
        for (const sub of subs) {
          options.push({ value: `${breed}/${sub}`, label: breedLabel(breed, sub) });
        }
      }
    }
    options.sort((a, b) => a.label.localeCompare(b.label));

    breedSelect.replaceChildren(new Option("Any breed (surprise me)", ""));
    for (const o of options) breedSelect.add(new Option(o.label, o.value));
    breedSelect.disabled = false;
  } catch {
    breedSelect.replaceChildren(new Option("Any breed (breed list unavailable)", ""));
    breedSelect.disabled = false;
  }
}

function endpoints(breed: string) {
  return breed
    ? {
        single: `${API}/breed/${breed}/images/random`,
        pool: `${API}/breed/${breed}/images/random/${POOL_SIZE}`,
      }
    : {
        single: `${API}/breeds/image/random`,
        pool: `${API}/breeds/image/random/${POOL_SIZE}`,
      };
}

function showError(message: string) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function setRolling(on: boolean) {
  rollButton.disabled = on;
  breedSelect.disabled = on;
  rollButton.textContent = on ? "Rolling…" : "Roll again";
}

function showFrame(url: string) {
  empty.classList.add("hidden");
  pet.classList.remove("hidden");
  pet.src = url;
}

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Make the frame the same shape as the photo (clamped so it never gets silly). */
function fitFrameTo(ratio: number) {
  const r = ratio > 0 ? Math.min(Math.max(ratio, 0.6), 2) : 4 / 3;
  reel.style.aspectRatio = String(r);
}

/** Gacha "charging" phase: the frame shakes and glows before the spin. */
async function charge(): Promise<void> {
  const dur = reduceMotion() ? 300 : CHARGE_MS;

  const shake = reel.animate(
    [
      { transform: "translate(0, 0) rotate(0deg)" },
      { transform: "translate(-3px, 2px) rotate(-0.8deg)" },
      { transform: "translate(3px, -2px) rotate(0.8deg)" },
      { transform: "translate(-2px, -2px) rotate(-0.4deg)" },
      { transform: "translate(0, 0) rotate(0deg)" },
    ],
    { duration: 120, iterations: Math.max(1, Math.round(dur / 120)) },
  );

  reel.animate(
    [
      { boxShadow: "0 0 0 0 rgba(255, 216, 77, 0)" },
      { boxShadow: "0 0 26px 8px rgba(255, 216, 77, 0.9)" },
    ],
    { duration: dur, easing: "ease-in", fill: "none" },
  );

  await shake.finished;
}

/**
 * The spin: a fast right-to-left reel that decelerates, slightly overshoots
 * the final frame, then settles back onto it (like a slot / gacha reveal).
 * Returns the strip so the caller can remove it after showing the result.
 */
async function spinReel(frames: string[], finalUrl: string): Promise<HTMLDivElement> {
  const urls = [...frames, finalUrl];
  const n = urls.length;

  const strip = document.createElement("div");
  Object.assign(strip.style, {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    width: `${n * 100}%`,
    willChange: "transform",
  });

  for (const url of urls) {
    const cell = document.createElement("div");
    Object.assign(cell.style, {
      width: `${100 / n}%`,
      height: "100%",
      flexShrink: "0",
      background: "#eef1ff",
    });

    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    Object.assign(img.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover", // frame already matches the final photo's shape
      display: "block",
    });

    cell.append(img);
    strip.append(cell);
  }

  empty.classList.add("hidden");
  pet.classList.add("hidden");
  reel.append(strip);

  const end = -((n - 1) / n) * 100;
  const overshoot = 14 / n; // ~14% of one frame past the target
  const short = reduceMotion();

  try {
    const spin = strip.animate(
      [
        {
          offset: 0,
          transform: "translateX(0%)",
          filter: "blur(6px)",
          easing: "cubic-bezier(0.2, 0.7, 0.1, 1)",
        },
        {
          offset: 0.88,
          transform: `translateX(${end - overshoot}%)`,
          filter: "blur(0px)",
          easing: "ease-in-out",
        },
        {
          offset: 1,
          transform: `translateX(${end}%)`,
          filter: "blur(0px)",
        },
      ],
      { duration: short ? 1000 : SPIN_MS, fill: "forwards" },
    );
    await spin.finished;
  } catch (err) {
    strip.remove();
    throw err;
  }

  return strip;
}

let rolling = false;

async function roll(): Promise<void> {
  if (rolling) return;
  rolling = true;
  errorBox.classList.add("hidden");
  caption.textContent = "";
  setRolling(true);

  try {
    const { single, pool } = endpoints(breedSelect.value);

    const [final, frames] = await Promise.all([
      getJSON<DogImageResponse>(single),
      getJSON<DogImageListResponse>(pool).then((r) => r.message).catch(() => [] as string[]),
    ]);

    const reelFrames = frames.filter((u) => u !== final.message);

    if (reelFrames.length === 0) {
      console.warn("Reel pool was empty, so no roll animation will play.");
    }

    // Preload so the reel doesn't flicker (but never wait long).
    let finalRatio = 0;
    await Promise.race([
      Promise.all([
        ...reelFrames.map(preload),
        preload(final.message).then((r) => {
          finalRatio = r;
        }),
      ]),
      sleep(2500),
    ]);

    // Reshape the frame to the final photo so the whole image fits.
    fitFrameTo(finalRatio);

    // 1) charge up, 2) spin
    let strip: HTMLDivElement | null = null;
    if (reelFrames.length > 0) {
      await charge();
      strip = await spinReel(reelFrames, final.message);
    }

    showFrame(final.message);
    strip?.remove();
    setRolling(false);

    const label = labelFromImageUrl(final.message);
    pet.alt = label ? `A ${label}` : "A random dog";
    caption.textContent = label;
  } catch (err) {
    setRolling(false);
    rollButton.textContent = "Try again";
    showError(
      err instanceof Error
        ? `Couldn't fetch a pet: ${err.message}. Check your connection and try again.`
        : "Couldn't fetch a pet. Try again.",
    );
  } finally {
    breedSelect.disabled = false;
    rolling = false;
  }
}

rollButton.addEventListener("click", roll);

void loadBreeds();