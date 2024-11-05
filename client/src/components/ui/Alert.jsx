import "@/css/alert.css";
import { MdClose } from "react-icons/md";

const Alert = ({ icon, message, setSuccess, success, alertType }) => {
  const onClose = () => {
    setSuccess(false);
  };
  return (
    <div className={`alert-card flex ${success ? "show" : ""} ${alertType} `}>
      {icon}
      <p>{message}</p>
      <span onClick={onClose}>
        <MdClose size={28} />
      </span>
    </div>
  );
};
export default Alert;
