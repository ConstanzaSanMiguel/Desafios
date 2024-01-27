# Primer pre-entrega del curso de BACKEND de CoderHouse

- En este proyecto de JavaScript, se crearon tres clases, UserManager, ProductManager y OrderManager, para gestionar usuarios y productos respectivamente y las órdenes de productos de dichos usuarios.

- Todas las clases tienen métodos y variables privadas para crear y almacenar sus datos.

- En memory se ejemplificaron las tres clases creando instancias (order, user y product) y utilizando los distintos métodos (por ejemplo create y update) para crear, leer, modificar (etc) los datos.

- Se incorporó el módulo fs de Node.js para gestionar la lectura y escritura de datos desde y hacia un archivo JSON, para crear, guarda y modificar los usuarios/productos/órdenes, permitiendo la persistencia de datos entre sesiones.

- Se agregó un servidor web y routers usando Express, y se implementaron endpoints (POST GET DELETE PUT) para manejar solicitudes HTTP.

- Se agregaron middlewares para el manejo de errores y para la validación de datos.


# Cuarto desafío entregable del curso de BACKEND de CoderHouse

- Se incorporaron Websockets y Handlebars para una correcta comunicación entre el servidor y el cliente. 

- Para ello se agregaron nuevos métodos (on y emit) y se agregaron nuevas vistas (/real, /form y /register), desde donde se pueden observar los productos y agregar nuevos productos y usuarios, respectivamente; instanciando los métodos de las clases ya mencionadas previamente.