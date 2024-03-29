import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiUserPlus } from "react-icons/bi";
import { BsFillHandbagFill } from "react-icons/bs";
import { RiUserShared2Line } from "react-icons/ri";
import { SlWrench } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCart, getUpdate } from "../redux/actions/CartActions";
import { update } from "../redux/actions/CartActions";

export const NavBar = () => {
  let Nav = useSelector((state) => state.ChangeNav);

  const dispatch = useDispatch();
  const up = useSelector((state) => state.update);

  const carts = useSelector((state) => state.cart);
  const itemQuantity = carts.reduce((acc, item) => acc + item.amount, 0);
  // console.log(itemQuantity);
  // let Nav = useSelector((state) => state.ChangeNav);
  // let Nav = useSelector((state) => state.UserActive);
  // let usuario = JSON.parse(localStorage.getItem("USUARIO"))
  // console.log(Nav);
  // let Nav
  useEffect(() => {
    dispatch(getUpdate());
    dispatch(getCart());
    dispatch(update(false));
  }, [up]);

  return (
    <div className="NavDiv">
      <div className="NotResponsive">
        <div className="BuildAndProducts">
          <Link to="/">
            <button>
              <ion-icon className="iconHome" name="home-outline"></ion-icon>{" "}
              Inicio
            </button>
          </Link>
          <Link to="/Products">
            <button>Tienda</button>
          </Link>
          <a className="botonwhatsapp" title="El Gato" href="https://wa.me/5493764331313">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" alt="WhatsApp El Gato" width="40" height="40" />
</a>


        </div>
        {/* <div className="ContainerSearch">
            <Search />
        </div> */}
        <div className="ContainerInfo">
          {Nav ? (
            <div className="LogAndSign">
              <Link to="/Login">
                <button className="BtnLogSing">Log in</button>
              </Link>
              <Link to="/Register">
                <button className="BtnLogSing">Sign up</button>
              </Link>
            </div>
          ) : (
            <Link to="/Profile">
              <button className="BtnUser">
                <FaUserCircle className="UserLogo" />
              </button>
            </Link>
          )}
          <Link to="/Cart">
            <button className="CartContainer">
              {" "}
              <AiOutlineShoppingCart className="Cart" />
              {itemQuantity}
            </button>
          </Link>
        </div>
      </div>

      <div className="Responsive">
        <div className="HomeButton">
          <Link to="/">
            <AiOutlineHome
              color="white"
              size="25px"
              style={{
                top: "15px",
                right: "0px",
                cursor: "pointer",
              }}
            ></AiOutlineHome>
          </Link>
          <Link to="/Products">
            <BsFillHandbagFill
              color="white"
              size="25px"
              style={{
                marginLeft: "15px",
                top: "10px",
                right: "0px",
                cursor: "pointer",
              }}
            ></BsFillHandbagFill>
          </Link>
        </div>

        <div className="ContainerInfo">
          {!Nav ? (
            <div className="LogAndSign">
              <Link to="/Login">
                <RiUserShared2Line
                  color="white"
                  size="25px"
                  style={{
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                />
              </Link>
              {/* <Link to="/Register">
                <BiUserPlus
                  color="white"
                  size="30px"
                  style={{
                    marginLeft: "15px",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                />
              </Link> */}
            </div>
          ) : (
            <Link to="/Profile">
              <FaUserCircle
                color="white"
                size="25px"
                style={{
                  marginLeft: "15px",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
              />
            </Link>
          )}
          <Link to="/Cart">
            <button className="CartContainer">
              {" "}
              <AiOutlineShoppingCart size="25px" className="Cart" />
              {itemQuantity}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
