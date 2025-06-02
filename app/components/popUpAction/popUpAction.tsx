//import styling
import './popUpAction.css'

const PopUpAction = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
      <div className="popUp backdrop-blur-md rounded-lg shadow-xl px-6 py-4 w-[40vw] h-[30vh]">
        <p className="text-[var(--color-text)]  text-lg font-medium">
            Certeza?
        </p>
      </div>
    </div>
  );
};

export default PopUpAction;
