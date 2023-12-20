import { httpClient } from ".";

export const searchFlights = async ({ departure, arrival, date }) => {
  const response = await httpClient.get(
    `flights/search?departure=${departure}&arrival=${arrival}&date=${date}`
  );
  /** @type {{message: string, status: number, data: any[]}} */
  const response_json = JSON.parse(response.data);

  return response_json;
};

export const bookFlight = async (flightToBook) => {
  const response = await httpClient.post(
    `flights/book`,
    JSON.stringify(flightToBook),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  /** @type {{message: string, status: number, data: any}} */
  const response_json = JSON.parse(response.data);
  return response_json;
};
