import { memo } from "react";
import Segment from "./Segment";

function Card(props) {
  return (
    <article className="card">
      <header className="card__header">
        <img src="" alt={props.flight.flight.carrier.uid} className="card__logo" />
        <div>
          <p className="card__price">{`${props.flight.flight.price.total.amount} ₽`}</p>
          <p className="card__description">Стоимость для одного взрослого пассажира</p>
        </div>
      </header>

      <Segment leg={props.flight.flight.legs[0]} />
      <hr style={{ margin: 0, height: 1, background: '#0087c9' }} />
      <Segment leg={props.flight.flight.legs[1]} />

      <button type="submit" className="card__submit-button">Выбрать</button>
    </article>
  )
}

export default memo(Card)
