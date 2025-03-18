import "@/css/alert.css";
import { MdClose } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Alert = ({ message, setSuccess, success, alertType }) => {
  const onClose = () => {
    setSuccess(false);
  };
  return (
    <div className={`alert-card flex ${success ? "show" : ""} ${alertType} `}>
      {success ? <FaCheckCircle size={80} /> : <FaTimesCircle size={80} />}
      <p>{message}</p>
      <span onClick={onClose}>
        <MdClose size={28} />
      </span>
    </div>
  );
};
export default Alert;
