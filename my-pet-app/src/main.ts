import "./style.css";

const API = "https://dog.ceo/api";

interface DogImageResponse {
  message: string;
  status: string;
}

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

const rollButton = $<HTMLButtonElement>("roll");
const empty = $<HTMLDivElement>("empty");
const pet = $<HTMLImageElement>("pet");

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

async function roll(): Promise<void> {
  const data = await getJSON<DogImageResponse>(`${API}/breeds/image/random`);

  empty.classList.add("hidden");
  pet.classList.remove("hidden");
  pet.src = data.message;
}

rollButton.addEventListener("click", roll);