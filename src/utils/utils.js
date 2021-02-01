export function selectedFilters(filt) {
  const { minPrice, maxPrice, transfer, vendors } = filt;
  const selected = { minPrice, maxPrice, transfer: [], vendors: [] };

  Object.keys(transfer).forEach(item => transfer[item] && selected.transfer.push(item));
  Object.keys(vendors).forEach(item => vendors[item].isSelected && selected.vendors.push(item));

  return selected
}

export function filteredFlights(flights, filters) {
  return flights.filter(item => {
    if (item.flight.price.total.amount < filters.minPrice
      || item.flight.price.total.amount > filters.maxPrice) return false;

    return Object.keys(filters).every(key => {
      if (!filters[key].length) return true;

      if (key === 'vendors') {
        return filters[key].some(keyElem => item.flight.carrier.uid == keyElem);
      }
      if (key === 'transfer') {
        return filters[key].some(keyElem => item.flight.legs[0].segments.length - 1 == keyElem)
      }
    })
  })
}

export function getFlightDate(string, mode) {
  const date = new Date(string);
  return mode === 'time'
    ? `${date.toLocaleTimeString().match(/\d{2}:\d{2}/).join()}`
    : `${date.getDate()} ${date.toLocaleString('ru', {month: 'short'})} ${date.toLocaleString('ru', {weekday: 'short'})}`
}

export const minToHours = min => min < 1440 ? `${Math.floor(min / 60)} ч ${min % 60} мин` : 'Очень долго';

export const initialFilters = {
  minPrice: 1e6,
  maxPrice: 0,
  vendors: {},
  transfer: {}
}

export const visibleStep = 4;
