import "./style.css";

const API = "https://dog.ceo/api";
const POOL_SIZE = 12;

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

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function preload(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
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
  reel.classList.toggle("animate-shake", on);
  pet.classList.toggle("blur-[2px]", on);
  pet.classList.toggle("scale-110", on);
}

function showFrame(url: string) {
  empty.classList.add("hidden");
  pet.classList.remove("hidden");
  pet.src = url;
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

    // Preload so the reel doesn't flicker (but never wait long).
    await Promise.race([
      Promise.all([...reelFrames, final.message].map(preload)),
      sleep(1500),
    ]);

    // The roll: frames flip fast, then slow down before landing.
    if (reelFrames.length > 0) {
      let delay = 60;
      for (let i = 0; i < 14; i++) {
        showFrame(reelFrames[i % reelFrames.length]);
        await sleep(delay);
        delay *= 1.14;
      }
    }

    showFrame(final.message);
    setRolling(false);

    // Restart the landing pop each time.
    pet.classList.remove("animate-land");
    void pet.offsetWidth;
    pet.classList.add("animate-land");

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