import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag } from "antd";
import { getAllUsers, PutUser, getAllUsersName } from "../redux/actions/UsersActions";
import { FaBan, FaUserCheck } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineVerifiedUser } from "react-icons/md";
import swal from "sweetalert";
import styles from "../styles/AdminUsers.module.css";
import { NavAdmin } from "./navAdmin";

const InfoUser = ({ email, name, image, lastname, status, country }) => {
  return (
    <div className={styles.Contenedor}>
      <div className={styles.ContenedorImg}>
        <img src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"} alt={name} />
      </div>
      <div className={styles.ContenedorData}>
        <h4>
          {name} {lastname} {status ? <span className={styles.verde}>User Active</span> : <span className={styles.rojo}>User Banned</span>}
        </h4>
        <div className={styles.centrado}>
          <h5>Ordenes</h5>
          {/* {country?.map((e, index) => {
            if (e.buyer_email === email) {
              return (
                <h6 key={index}>
                  {e.product_name} {e.product_unit_price} $ <span style={{ color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px" }}>{e.statusId}</span>
                </h6>
              );
            }
          })} */}

{country?.map((e, index) => {
  if (e.buyer_email === email) {
    return (
      <h6 key={index}>
        {e.product_name} {e.product_unit_price} $ <span style={{ color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px" }}>{e.statusId}</span>
      </h6>
    );
  }
  // Agrega un valor predeterminado para evitar la advertencia
  return null;
})}



        </div>
      </div>
    </div>
  );
};

export const AdminUsers = () => {
  const [country, setCountrie] = useState({});
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK}/order`)
      .then((res) => res.json())
      .then((data) => {
        setCountrie(data);
      })
      .catch((error) => console.log(error));
    return () => setCountrie({});
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, reload]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllUsers());
  };

  const users = useSelector((state) => state.users || []);
  const newUsers = users.map((user) => ({ ...user, key: user.id }));

  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsersName(name));
    setName("");
  };

  const setAdmin = (value) => {
    const { password, ...values } = value;

    const action = value.admin ? "Quitar ADMIN" : "Sera ADMIN";

    swal({
      title: `Estas seguro que deseas ${action} a ${value.name}`,
      text: value.admin ? "Quitar ADMIN" : "Sera ADMIN",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        dispatch(PutUser({ ...values, admin: !value.admin }));
        setReload(!reload);
      }
    });
  };

  const setStatus = (value) => {
    const action = value.status ? "Bann" : "Desbanear";

    swal({
      title: `Estas seguro que deseas ${action} a ${value.name}`,
      text: value.status ? "Bann" : "Desbanear",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        dispatch(PutUser({ ...value, status: !value.status }));
      }
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Admin",
      dataIndex: "admin",
      render: (value) => (
        <Tag color={value === true ? "green" : "red"}>
          {value === true ? "admin" : "No Admin"}
        </Tag>
      ),
      filters: [
        {
          text: "admin",
          value: true,
        },
        {
          text: "noAdmin",
          value: false,
        },
      ],
      onFilter: (value, record) => record.admin === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={value === true ? "green" : "red"}>
          {value === true ? "Active" : "Banned"}
        </Tag>
      ),
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Banned",
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (value) => (
        <div>

        {value.status ? <button className={styles.btnIcons}  onClick={() => setStatus(value)} >
            <FaBan className={styles.banned}/>
          </button>
          : <button  button  className={styles.btnIcons} onClick={() => setStatus(value)} >
          <FaUserCheck className={styles.Desbanned}/>
        </button>
          }
    
          {value.admin ? <button  className={styles.btnIcons} onClick={() => setAdmin(value)}>
            <GrUserAdmin className={styles.DesAdmin}/>
          </button>
        : <button button  className={styles.btnIcons} onClick={() => setAdmin(value)}>
         <MdOutlineVerifiedUser className={styles.Setadmin} /> 
      </button>}
        </div>
      ),
    },
    Table.EXPAND_COLUMN,
  ];

  return (
    <div>
      <NavAdmin name={name} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleClick={handleClick} />
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Table style={{ backgroundColor: "rgb(245, 245, 235)" }} columns={columns} dataSource={newUsers} expandable={{ expandedRowRender: (record) => <InfoUser email={record.email} country={country} name={record.name} lastname={record.lastname} image={record.image} status={record.status} /> }} />
      </div>
    </div>
  
  );
};