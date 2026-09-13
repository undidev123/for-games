import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const apiKey = process.env.RAWG_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "RAWG_API_KEY não configurada",
      });
    }

    const search = req.query.search;

    const url = new URL("https://api.rawg.io/api/games");

    url.searchParams.set("key", apiKey);
    url.searchParams.set("page_size", search ? "20" : "100");

    if (search) {
      url.searchParams.set("search", String(search));
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erro ao consultar a RAWG",
      });
    }

    const data = await response.json();

    const games = await Promise.all(
      data.results.map(async (game: any) => {
        const detailResponse = await fetch(
          `https://api.rawg.io/api/games/${game.id}?key=${apiKey}`,
        );

        const details = await detailResponse.json();

        return {
          ...game,
          description: details.description,
          developers: details.developers,
          platforms: details.platforms,
        };
      }),
    );

    return res.status(200).json({
      results: games,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}