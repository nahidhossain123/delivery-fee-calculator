type UiButtonPropsType = {
  name: string;
  callback: () => void;
};
const Button = (props: UiButtonPropsType) => {
  return (
    <button onClick={props.callback}>
      <span>{props.name}</span>
    </button>
  );
};

export default Button;
