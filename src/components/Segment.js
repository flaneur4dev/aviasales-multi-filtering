import { memo } from "react";
import { getFlightDate, minToHours } from "../utils/utils";

function Segment(props) {
  const arrivalCity = props.leg.segments.length === 2
    ? props.leg.segments[1].arrivalCity
    : props.leg.segments[0].arrivalCity

  const arrivalAirport = props.leg.segments.length === 2
    ? props.leg.segments[1].arrivalAirport
    : props.leg.segments[0].arrivalAirport

  const arrivalDate = props.leg.segments.length === 2
    ? props.leg.segments[1].arrivalDate
    : props.leg.segments[0].arrivalDate

  const transfer = props.leg.segments.length === 2 && `${props.leg.segments.length - 1} пересадка`

  return (
    <div className="card__segment">
      <div className="card__travel-places">
        <span>
          {`${props.leg.segments[0].departureCity.caption}, ${props.leg.segments[0].departureAirport.caption}`}
        </span>
        <span className="card_color">
          {`(${props.leg.segments[0].departureAirport.uid}) →`}
        </span>
        <span>
          {`${arrivalCity.caption}, ${arrivalAirport.caption}`}
        </span>
        <span className="card_color">
          {`(${arrivalAirport.uid})`}
        </span>
      </div>

      <div className="card__travel-time">
        <span className="card__time">{getFlightDate(props.leg.segments[0].departureDate, 'time')}</span>
        <span className="card_color">{getFlightDate(props.leg.segments[0].departureDate)}</span>
        <div className="card__wrapper">
          <span className="card__duration">{minToHours(props.leg.duration)}</span>
        </div>
        <span className="card_color">{getFlightDate(arrivalDate)}</span>
        <span className="card__time">{getFlightDate(arrivalDate, 'time')}</span>
      </div>
      <div className="card__container">
        <span className="card__transfer">{transfer}</span>
      </div>
      <footer className="card__footer">{`Рейс выполняет: ${props.leg.segments[0].airline.caption}`}</footer>
    </div>
  )
}

export default memo(Segment);
