
// returns a new string converted from snake_case to Title Case
export function titleize(name) {
  return name.split("_").map(
    (s) => s.charAt(0).toUpperCase() + s.slice(1)
  ).join(" ")
}
