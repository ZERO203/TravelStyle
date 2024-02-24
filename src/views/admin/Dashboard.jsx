import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowColors from "../../components/admin/ShowColors";
import { deleteProduct, getProducts } from "../../services/admin/productServices";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [productos, setProductos] = useState([]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el producto?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        return deleteProduct(id)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Producto Eliminado",
            });
            return getProducts();
          })
          .then((response) => {
            setProductos(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProductos(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link to="/crearproducto">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear Producto
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Descripción</th>
              <th className="py-2 px-4">Colores</th>
              <th className="py-2 px-4">Precio</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{prod.nombre}</td>
                <td className="py-2 px-4">{prod.descripcion}</td>
                <td className="py-2 px-4">
                  <ShowColors colors={prod.color} />
                </td>
                <td className="py-2 px-4">{prod.precio}</td>
                <td className="py-2 px-4">{prod.stock}</td>
                <td className="py-2 px-4">
                  <div className="flex">
                    <Link
                      to={`/producto/${prod.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(prod.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}