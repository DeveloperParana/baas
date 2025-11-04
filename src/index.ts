// Este arquivo existe apenas para satisfazer a Vercel que precisa de um entrypoint
// Em produção, apenas as serverless functions em api/ são usadas
export default function handler() {
  return new Response('OK', { status: 200 });
}
