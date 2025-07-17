export async function onRequest(context) {
  // Get the static HTML page
  const response = await context.next();
  let html = await response.text();

  // Find and replace placeholders for Firebase config
  html = html.replace('apiKey: "YOUR_API_KEY"', `apiKey: "${context.env.API_KEY}"`);
  html = html.replace('authDomain: "YOUR_AUTH_DOMAIN"', `authDomain: "${context.env.AUTH_DOMAIN}"`);
  html = html.replace('projectId: "YOUR_PROJECT_ID"', `projectId: "${context.env.PROJECT_ID}"`);
  html = html.replace('storageBucket: "YOUR_STORAGE_BUCKET"', `storageBucket: "${context.env.STORAGE_BUCKET}"`);
  html = html.replace('messagingSenderId: "YOUR_MESSAGING_SENDER_ID"', `messagingSenderId: "${context.env.MESSAGING_SENDER_ID}"`);
  html = html.replace('appId: "YOUR_APP_ID"', `appId: "${context.env.APP_ID}"`);

  // Return the modified HTML
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}