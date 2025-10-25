const GITHUB_BASE =
  "https://raw.githubusercontent.com/DeveloperParana/baas/main/src/assets";

/**
 * Retorna a URL absoluta de um asset hospedado no repositório.
 * Exemplo:
 *   asset('/backgrounds/stories.png')
 * -> https://raw.githubusercontent.com/DeveloperParana/baas/main/src/assets/backgrounds/stories.png
 */
export function asset(path: string): string {
  return `${GITHUB_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}
