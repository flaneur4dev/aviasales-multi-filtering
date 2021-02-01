import { memo } from "react";
import Card from "./Card";

function Main(props) {
  return (
    <>
      {props.flights.length
        ? (
          <section className="main">
            {props.flights.map((flight, ind) => <Card key={ind} flight={flight} />)}
            {props.children}
          </section>
        )
        : <div style={{ flex: 1, padding: 50, textAlign: 'center', fontSize: '20px' }}>
            Нет данных по заданным параметрам
          </div>
      }
    </>
  )
}

export default memo(Main);
