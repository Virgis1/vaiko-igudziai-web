export const formatLtTime = (value) => {
  if (!value) return "—";

  let s = String(value);

  if (s.includes(" ") && !s.includes("T")) {
    s = s.replace(" ", "T");
  }

  const hasTz = /Z$|[+-]\d{2}:\d{2}$/.test(s);
  if (!hasTz) s = s + "Z";

  return new Date(s).toLocaleString("lt-LT", {
    timeZone: "Europe/Vilnius",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
