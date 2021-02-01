import { memo } from "react";
import Input from "./Input";

function FilterPanel(props) {
  const transferLabel = item => (
    `${+item ? ` - ${item} пересадка` : ' - без пересадок'}`
  )

  const vendorLabel = item => (
    <>
      <span className="form__caption">{`- ${props.filters.vendors[item].caption}`}</span>
      <span className="form__price">{`от ${props.filters.vendors[item].minPrice.toLocaleString('ru')} р.`}</span>
    </>
  )

  return (
    <section className="panel">
      <form className="form">
        <h2 className="form__title">Сортировать</h2>
        <fieldset className="form__input-container">
          <Input
            type="radio"
            id="up"
            value={props.sort}
            name="sort"
            labelRight=" - по возрастанию цены"
            // checked={true}
            onChange={props.handleSort}
          />
          <Input
            type="radio"
            id="down"
            value={props.sort}
            name="sort"
            labelRight=" - по убыванию цены"
            onChange={props.handleSort}
          />
          <Input
            type="radio"
            id="duration"
            value={props.sort}
            name="sort"
            labelRight=" - по времени в пути"
            onChange={props.handleSort}
            disabled={true}
          />
        </fieldset>

        <h2 className="form__title form__title_last">Фильтровать</h2>
        <fieldset className="form__input-container">
          <h3 className="form__subtitle">Количество пересадок</h3>
          {props.filters.transfer &&
            Object.keys(props.filters.transfer).map((item, ind) => (
              <Input
                key={ind}
                type="checkbox"
                labelRight={transferLabel(item)}
                value={item}
                checked={props.filters.transfer[item]}
                onChange={props.handleTransferChange}
              />
            ))
          }

          <h3 className="form__subtitle">Цена</h3>
          <Input
            type="number"
            name="minPrice"
            labelLeft={<span style={{ marginRight: 7 }}>От</span>}
            value={props.filters.minPrice}
            onChange={props.handlePrice}
          />
          <Input
            type="number"
            name="maxPrice"
            labelLeft={<span style={{ marginRight: 7 }}>До</span>}
            value={props.filters.maxPrice}
            onChange={props.handlePrice}
          />

          <h3 className="form__subtitle">Авиакомпании</h3>
          {props.filters.vendors &&
            Object.keys(props.filters.vendors).map((item, ind) => (
              <Input
                key={ind}
                type="checkbox"
                labelRight={vendorLabel(item)}
                value={item}
                checked={props.filters.vendors[item].isSelected}
                onChange={props.handleVendorChange}
              />
            ))
          }
        </fieldset>
      </form>
    </section>
  )
}

export default memo(FilterPanel)
