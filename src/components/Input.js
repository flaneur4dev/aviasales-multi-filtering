import { memo } from "react"

function Input(props) {
  return (
    <label className="form__label">
      {props.labelLeft}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        className="form__input"
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {props.labelRight}
    </label>
  )
}

export default memo(Input)
