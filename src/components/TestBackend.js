// import React, { useEffect, useState } from 'react';

// export const TestBackend = () => {
//     const [message, setMessage] = useState('');  // Estado para almacenar el mensaje del backend

//     useEffect(() => {
//         const fetchMessage = async () => {
//             try {
//                 console.log("Llamando al backend en:", process.env.REACT_APP_API_URL);
                
//                 // Hacemos la llamada al endpoint /test-backend
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/test-backend`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setMessage(data.message);  // Almacena el mensaje en el estado
//                 } else {
//                     console.error("Error al obtener respuesta del backend:", response.statusText);
//                 }
//             } catch (error) {
//                 console.error("Error en la conexión con el backend:", error);
//             }
//         };

//         fetchMessage();  // Ejecuta la función al montar el componente
//     }, []);

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//             <h1 className="text-2xl font-bold text-gray-700">Probar conexión con el backend</h1>
//             {message ? (
//                 <p className="mt-4 text-lg text-green-600">{message}</p>  // Muestra el mensaje cuando está disponible
//             ) : (
//                 <p className="mt-4 text-lg text-red-600">Cargando mensaje...</p>
//             )}
//         </div>
//     );
// };
