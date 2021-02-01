import flights from './flights.json';

export const getFlights = () => Promise.resolve(flights.result.flights)
