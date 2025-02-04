import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Prueba3 = () => {
  const [locatarios, setLocatarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocatarios = async () => {
      const locatariosData = [];
      let id = 1; // Empezar desde el ID 1
      const maxAttempts = 3; // Límite máximo de IDs a verificar
      let attempts = 0;
      
      try {
        while (attempts < maxAttempts) {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/locatario/${id}`
            );
            locatariosData.push(response.data); // Agregar el locatario al array
            id++; // Incrementar el ID para la siguiente solicitud
          } catch (error) {
            // Si el servidor devuelve un 404, significa que no hay más locatarios
            if (error.response && error.response.status === 404) {
              break;
            } else {
              throw error; // Lanzar otros errores
            }
          }
          attempts++;
        }

        setLocatarios(locatariosData); // Actualizar el estado con los locatarios obtenidos
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocatarios();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Locatarios</h1>
      <div className="max-w-2xl mx-auto">
        {locatarios.map((locatario) => (
          <div
            key={locatario.LocatarioId}
            className="bg-white shadow-md rounded-lg p-6 mb-4"
          >
            <p className="text-gray-700">
              <strong className="text-gray-900">ID:</strong> {locatario.LocatarioId}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Nombre:</strong> {locatario.LocatarioNombre}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Email:</strong> {locatario.LocatarioEmail}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Teléfono:</strong> {locatario.LocatarioTelefono}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">RFC:</strong> {locatario.LocatarioRFC}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prueba3;