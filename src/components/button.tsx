interface Props {
  children: String;
}
function handleClick() {
  alert("So uma mensagem");
}
const button = ({ children }: Props) => {
  return (
    <div>
      <button onClick={() => handleClick}>{children}</button>
    </div>
  );
};

export default button;
