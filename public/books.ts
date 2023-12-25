
type book = {
    author: string;
    country: string;
    imageLink: string;
    language: string;
    link: string;
    pages: number;
    title: string;
    year: number;
}

export async function getBooks(): Promise<book[]> {
  const res = await fetch("/api/book")
  return res.json(); 
}
