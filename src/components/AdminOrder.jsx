import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Space, Button, Select, Form, Modal, Descriptions } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { addAllOrders, updateOrderStatus } from "../redux/slices/orderSlice";
import { NavAdmin } from './navAdmin';

const { Option } = Select;

export const AdminOrder = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(addAllOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.AllOrders || []);

  const handleStatusChange = async (orderId, field, value) => {

    const body = {
      field : value,
    };

    console.log({ orderId, body })

    await dispatch(updateOrderStatus({ orderId, body }));
  };

  const showEditModal = (record) => {
    setEditingOrder(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      handleStatusChange(editingOrder.id, 'status', values.status);
      handleStatusChange(editingOrder.id, 'estadoEnvio', values.estadoEnvio);
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: 'Cliente',
      render: (_, record) => (
        <div>
          <div><strong>{record.buyer_email}</strong></div>
          <div>{record.buyer_name} {record.buyer_lastname}</div>
          <div>{record.buyer_phone || 'Sin teléfono'}</div>
          <div>
            {record.buyer_address 
              ? `${record.buyer_address.city || 'Sin ciudad'}, ${record.buyer_address.country || 'Sin país'}` 
              : 'Sin dirección'}
          </div>
        </div>
      ),
    },
    {
      title: 'Productos',
      render: (_, record) => (
        <div>
          {record.products.slice(0, 2).map((product, index) => (
            <div key={index}>
              {product.product_name} (x{product.product_amount})
            </div>
          ))}
          {record.products.length > 2 && <div>+{record.products.length - 2} más...</div>}
        </div>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total_order_price',
      render: (price) => `$${price.toLocaleString()}`,
      sorter: (a, b) => a.total_order_price - b.total_order_price,
    },
    {
      title: 'Estado Pago',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={
          status === "approved" ? "green" : 
          status === "rejected" ? "red" : "orange"
        }>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Tipo Pago',
      dataIndex: 'payment_type',
      render: (type) => type ? type.replace('_', ' ').toUpperCase() : 'N/A',
    },
    {
      title: 'Envío',
      dataIndex: 'estadoEnvio',
      render: (estado) => (
        <Tag color={
          estado === "enviado" ? "green" : 
          estado === "no enviado" ? "red" : "orange"
        }>
          {estado.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      render: (date) => date ? new Date(date).toLocaleString() : 'N/A',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Acciones',
      render: (_, record) => (
        <Button 
          icon={<AiFillEdit />} 
          onClick={() => showEditModal(record)}
        />
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Producto',
        dataIndex: 'product_name',
        key: 'name',
      },
      {
        title: 'Descripción',
        dataIndex: 'product_description',
        key: 'description',
      },
      {
        title: 'Cantidad',
        dataIndex: 'product_amount',
        key: 'amount',
      },
      {
        title: 'Precio Unitario',
        dataIndex: 'product_unit_price',
        render: (price) => `$${price.toLocaleString()}`,
        key: 'price',
      },
      {
        title: 'Total',
        render: (_, product) => `$${(product.product_amount * product.product_unit_price).toLocaleString()}`,
        key: 'total',
      },
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={record.products}
          pagination={false}
          rowKey="prodId"
        />
        <Descriptions bordered column={2} style={{ marginTop: 20 }}>
          <Descriptions.Item label="ID Orden">{record.id}</Descriptions.Item>
          <Descriptions.Item label="ID Pago">{record.payment_id}</Descriptions.Item>
          <Descriptions.Item label="ID Comercio">{record.merchant_order_id}</Descriptions.Item>
          <Descriptions.Item label="Preference ID">{record.preference_id}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  return (
    <div>
      <NavAdmin />
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Table
          style={{ backgroundColor: "rgb(245, 245, 235)" }}
          columns={columns}
          dataSource={orders}
          expandable={{ expandedRowRender }}
          rowKey="id"
        />

        <Modal
          title="Editar Estado de Orden"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form
            form={form}
            initialValues={{
              status: editingOrder?.status,
              estadoEnvio: editingOrder?.estadoEnvio
            }}
          >
            <Form.Item name="status" label="Estado de Pago">
              <Select>
                <Option value="approved">Approved</Option>
                <Option value="pending">Pending</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Form.Item>
            <Form.Item name="estadoEnvio" label="Estado de Envío">
              <Select>
                <Option value="pendiente">Pendiente</Option>
                <Option value="enviada">Enviada</Option>
                <Option value="cancelada">Cancelada</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};