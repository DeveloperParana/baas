const BUCKET_BASE =
  "https://pub-e7d551bfe635419791fb1d1bfc7f71dd.r2.dev/assets";

/**
 * Retorna a URL absoluta de um asset hospedado no Cloudflare R2.
 *
 * @param {string} path - Caminho relativo do arquivo dentro do bucket R2.
 *   Pode começar ou não com `/`. Exemplo:
 *   - `"backgrounds/stories.png"`
 *   - `"/devpr-logo.png"`
 *
 * @returns {string} URL absoluta do asset no bucket R2.
 *   Exemplo:
 *   ```ts
 *   asset("/devpr-logo.png");
 *   // → "https://pub-xxxxxxxxxxxxxxxxxxxx.r2.dev/devpr-logo.png"
 *   ```
 *
 * @example
 * // Exemplo de uso em um componente Satori:
 * <img
 *   src={asset("/backgrounds/stories.png")}
 *   width={1080}
 *   height={1920}
 *   alt="Background"
/>
 */
export function asset(path: string): string {
  return `${BUCKET_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}
