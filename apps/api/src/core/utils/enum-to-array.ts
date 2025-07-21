export function enumToArray<E extends Record<string, string>>(
  e: E
): E[keyof E][] {
  return Object.values(e) as E[keyof E][];
}
