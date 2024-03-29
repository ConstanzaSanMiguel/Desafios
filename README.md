# Primer pre-entrega del curso de BACKEND de CoderHouse

- En este proyecto de JavaScript, se crearon tres clases, UserManager, ProductManager y OrderManager, para gestionar usuarios y productos respectivamente y las órdenes de productos de dichos usuarios.

- Todas las clases tienen métodos y variables privadas para crear y almacenar sus datos.

- En memory se ejemplificaron las tres clases creando instancias (order, user y product) y utilizando los distintos métodos (por ejemplo create y update) para crear, leer, modificar (etc) los datos.

- Se incorporó el módulo fs de Node.js para gestionar la lectura y escritura de datos desde y hacia un archivo JSON, para crear, guarda y modificar los usuarios/productos/órdenes, permitiendo la persistencia de datos entre sesiones.

- Se agregó un servidor web y routers usando Express, y se implementaron endpoints (POST GET DELETE PUT) para manejar solicitudes HTTP.

- Se agregaron middlewares para el manejo de errores y para la validación de datos.


# Cuarto y quinto desafíos entregables del curso de BACKEND de CoderHouse

- Se incorporaron Websockets y Handlebars para una correcta comunicación entre el servidor y el cliente. 

- Para ello se agregaron nuevos métodos (on y emit) y se agregaron nuevas vistas (/real, /form y /register), desde donde se pueden observar los productos y agregar nuevos productos y usuarios, respectivamente; instanciando los métodos de las clases ya mencionadas previamente.

- Se incorporó Mongo y Mongoose y se enrutaron los managers de mongo de products, users y orders. 

- Se agregó una nueva clase y modelos para cada una de las colecciones y un nuevo método para buscar por email a los usuarios.


# Segunda pre-entrega del curso de BACKEND de CoderHouse

- Se modificó el método read y el endpoint GET correspondiente para poder filtrar y paginar según las queries dadas o, en su ausencia, por valores puestos por defecto

- Se agregó el método report(uid) y un endpoint GET para poder calcular el total a pagar por usuario en relación a las órdenes que este tiene. 
 
- Se modificaron las vistas con handlebars para mostrar los productos desde la database de Mongo, mostrando todos los productos que se venden en la página principal.

# Sexto desafío entregable del curso de BACKEND de CoderHouse

- Se agregó la página para el inicio de sesión del usuario y su ruta a la navbar.

- Se implementaron sesiones agregándose el enrutador correspondiente con endpoints para la creación de usuario, su inicio de sesión y cierre de sesión.

- Se agregaron los middlewares para validar la contraseña.
 
# Séptimo desafío entregable del curso de BACKEND de CoderHouse

- Se agregaron las vistas de orders para ver las órdenes según el usuario con la sesión activa.

- Se agregó el correcto fetcheado desde register, login y signout desde el frontend, con respuestas de alertas.

- Se agregó paginado y búsqueda en los productos

- Se agregó vista dinámica en la navbar

# Octavo desafío entregable del curso de BACKEND de CoderHouse

- Se agregó el CustomRouter con la modificación de los enrutadores de las vistas y API.

- Se implementaron respuestas y políticas.

# Noveno desafío entregable del curso de BACKEND de CoderHouse

- Se agregaron capas de routers, controladores y servicios.

- Se agregaron variables para los entornos dev, test y prod.

- Se implementó axios con react para renderizar la página de inicio, utilizando vercel como host de la app.