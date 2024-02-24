import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getProductById } from "../../services/admin/productServices";
import SelectColors from "../../components/admin/SelectColor";
import { uploadFile } from "../../services/admin/storageServices";
import Cargando from "../../components/admin/Cargando";
import { updateProduct } from "../../services/admin/productServices";

let imagenProducto;

export default function DetailProduct() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    color: [],
    stock: 0,
    review: []
  });

  const { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then((respuesta) => {
        setForm({ ...respuesta });
      })
      .catch((error) => {
        console.log({ respuesta });
      });
  }, []);

  const [estaCargando, setEstaCargando] = useState(false);

  const navigate = useNavigate();

  const changeForm = (evento) => {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  };

  const handleCreate = () => {
    setEstaCargando(true);
    uploadFile(imagenProducto, "photos")
      .then(urlImagen => {
        if (!imagenProducto) {
          return updateProduct({ ...form });
        }
        return updateProduct({ ...form, imagen: urlImagen });
      })
      .then(() => {
        setEstaCargando(false);
        Swal.fire({
          icon: "success",
          title: "Producto Actualizado",
          text: `Se actualizó el producto ${form.nombre}`
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleImage = (evento) => {
    imagenProducto = evento.target.files[0];
  };

  const handleColor = (newColor) => {
    setForm({ ...form, color: [...form.color, newColor] });
  };

  if (estaCargando) {
    return <Cargando />;
  }

  return (
    <main className="container p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="inputNombre" className="block text-sm font-medium text-gray-700">
            Nombre producto:
          </label>
          <input
            type="text"
            id="inputNombre"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Camisa Negra"
            value={form.nombre}
            name="nombre"
            onChange={changeForm}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="inputDescripcion" className="block text-sm font-medium text-gray-700">
            Descripción producto:
          </label>
          <input
            type="text"
            id="inputDescripcion"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Camisa Negra texturizada"
            value={form.descripcion}
            name="descripcion"
            onChange={changeForm}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="inputImagen" className="block text-sm font-medium text-gray-700">
            Imagen a guardar:
          </label>
          <input
            id="inputImagen"
            type="file"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleImage}
          />
          <p className="text-sm text-gray-500">Actualmente la imagen de este producto es: {form.imagen}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="inputPrecio" className="block text-sm font-medium text-gray-700">
            Precio producto:
          </label>
          <input
            type="number"
            id="inputPrecio"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Precio"
            value={form.precio}
            name="precio"
            onChange={changeForm}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="inputStock" className="block text-sm font-medium text-gray-700">
            Stock producto:
          </label>
          <input
            type="number"
            id="inputStock"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="150"
            value={form.stock}
            name="stock"
            onChange={changeForm}
          />
        </div>

        <SelectColors colors={form.color} handleColor={handleColor} />
        <button
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleCreate}
        >
          Guardar
        </button>
      </form>
    </main>
  );
}