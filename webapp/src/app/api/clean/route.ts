export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  const checkURL = (urlStr: string) => {
    try {
      new URL(urlStr);
      return true;
    } catch {
      return false;
    }
  };

  if (url === null || !checkURL(url)) {
    return new Response("error", { status: 500 });
  }

  const res = await fetch(`https://r.jina.ai/${url}`);
  const data = await res.text();

  return new Response(`${data}`);
}
