import { useEffect, useState } from "react";
import { getFlights } from "../api/api";
import { selectedFilters, filteredFlights, initialFilters, visibleStep } from "../utils/utils";
import FilterPanel from "./FilterPanel";
import Main from "./Main";

function App() {
  const [visibleFlights, setVisibleFlights] = useState(new Array(visibleStep));
  const [visibleCount, setVisibleCount] = useState(visibleStep);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('up');

  useEffect(() => {
    getFlights()
      .then(flights => {
        setVisibleFlights(
          flights.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount).slice(0, visibleCount)
        )

        flights.reduce((res, curr) => {
          res.minPrice = Math.min(res.minPrice, curr.flight.price.total.amount);
          res.maxPrice = Math.max(res.maxPrice, curr.flight.price.total.amount);

          res.transfer[curr.flight.legs[0].segments.length - 1] = false;

          res.vendors[curr.flight.carrier.uid] = {
            isSelected: false,
            caption: curr.flight.carrier.caption,
            minPrice: Math.min(
              (res.vendors[curr.flight.carrier.uid] ? res.vendors[curr.flight.carrier.uid].minPrice : 1e6),
              curr.flight.price.total.amount
            ),
            maxPrice: Math.max(
              (res.vendors[curr.flight.carrier.uid] ? res.vendors[curr.flight.carrier.uid].maxPrice : 0),
              curr.flight.price.total.amount
            )
          };
          return res
        }, initialFilters)

        setFilters(initialFilters);
      })
      .catch(err => alert(err))
  }, [])

  useEffect(() => {
    if (Object.keys(filters).length) {
      getFlights()
        .then(flights => {
          switch (sort) {
            case 'up':
              setVisibleFlights(filteredFlights(flights, selectedFilters(filters))
                .sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount)
                .slice(0, visibleCount))
              break;
            case 'down':
              setVisibleFlights(filteredFlights(flights, selectedFilters(filters))
                .sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount)
                .slice(0, visibleCount))
              break;
            // case 'duration':
            //   break;
          }
        })
        .catch(err => alert(err))
    }
  }, [filters, visibleCount, sort])

  function handleTransferChange({ target }) {
    setFilters(prevState => (
      {
        ...prevState,
        transfer: {
          ...prevState.transfer,
          [target.value]: !prevState.transfer[target.value]
        }
      }
    ))
  }

  function handleVendorChange({ target }) {
    setFilters(prevState => (
      {
        ...prevState,
        vendors: {
          ...prevState.vendors,
          [target.value]: {
            ...prevState.vendors[target.value],
            isSelected: !prevState.vendors[target.value].isSelected
          }
        }
      }
    ))
  }

  const handlePrice = event => setFilters(prevState => ({ ...prevState, [event.target.name]: +event.target.value }))
  const handleSort = event => setSort(event.target.id)

  return (
    <div className="page">
      <FilterPanel
        filters={filters}
        handleTransferChange={handleTransferChange}
        handleVendorChange={handleVendorChange}
        handlePrice={handlePrice}
        handleSort={handleSort}
        sort={sort}
      />
      <Main flights={visibleFlights}>
        <button
          type="button"
          className="main__button"
          onClick={() => setVisibleCount(prevState => prevState + visibleStep)}
        >
          Показать еще
        </button>
      </Main>
    </div>
  )
}

export default App;
