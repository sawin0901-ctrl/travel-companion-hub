const MARKER = "372499";
const TRS = "544190";

function tp(p: string, url: string) {
  return `https://tp.media/r?marker=${MARKER}&trs=${TRS}&p=${p}&u=${encodeURIComponent(url)}`;
}

// date: YYYY-MM-DD → DDMM for Aviasales URL
function toAviasalesDate(iso: string) {
  if (!iso) return "";
  const [, m, d] = iso.split("-");
  return `${d}${m}`;
}

export function aviasalesUrl(origin: string, dest: string, date: string, adults = "1") {
  const dd = toAviasalesDate(date);
  return `https://www.aviasales.ru/search/${origin}${dd}${dest}${adults}?marker=${MARKER}`;
}

export function hotellookUrl(city: string, checkIn: string, checkOut: string, adults: string) {
  const q = new URLSearchParams({ destination: city, adults, marker: MARKER });
  if (checkIn) q.set("checkIn", checkIn);
  if (checkOut) q.set("checkOut", checkOut);
  return `https://hotellook.com/search/rooms?${q}`;
}

export function carsUrl(pickup: string, pickupDate: string, returnDate: string) {
  return tp("9498", `https://www.discovercars.com/?pickup=${encodeURIComponent(pickup)}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
}

export function transferUrl(from: string, to: string, date: string, passengers: string) {
  return tp("6395", `https://intui.travel/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&passengers=${passengers}`);
}

export function insuranceUrl(country: string, dateFrom: string, dateTo: string, tourists: string) {
  return tp("1740", `https://cherehapa.ru/?country=${encodeURIComponent(country)}&dateFrom=${dateFrom}&dateTo=${dateTo}&tourists=${tourists}`);
}
