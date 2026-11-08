import "./style.css";

const API = "https://dog.ceo/api";

interface DogImageResponse {
  message: string;
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
const empty = $<HTMLDivElement>("empty");
const pet = $<HTMLImageElement>("pet");

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "hound", "afghan" -> "Afghan hound" */
function breedLabel(breed: string, sub?: string): string {
  return sub ? `${capitalize(sub)} ${breed}` : capitalize(breed);
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
    ? { single: `${API}/breed/${breed}/images/random` }
    : { single: `${API}/breeds/image/random` };
}

async function roll(): Promise<void> {
  const { single } = endpoints(breedSelect.value);
  const data = await getJSON<DogImageResponse>(single);

  empty.classList.add("hidden");
  pet.classList.remove("hidden");
  pet.src = data.message;
}

rollButton.addEventListener("click", roll);

void loadBreeds();