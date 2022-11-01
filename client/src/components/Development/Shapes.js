import "../../stylesheets/Main.css";
import "../Development/Shapes";
import DefaultImg from "../../Resources/trellis_border_white.svg";

const Shapes = ({Shape}) => {
  if (!Shape) {
    Shape = DefaultImg;
  }
  return (
      <div className="shape">
        <img className="shape1" src={Shape} alt="" />
        <img className="shape2" src={Shape} alt="" />
        <img className="shape3" src={Shape} alt="" />
        <img className="shape4" src={Shape} alt="" />
        <img className="shape5" src={Shape} alt="" />
      </div>
  );
};


export default Shapes;
