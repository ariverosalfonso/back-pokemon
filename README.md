# back-pokemon
Api restful sobre pokemón
El proyecto fue realizado con la libreria express.
Se divide en el index y routes, que en este caso aplica para pokemon.
Las rutas contienen dos gets, el primer get trae todos los pokemons. El segundo get trae 2 pokemons por id, por medio de un promise all
La ruta del post es con /fight, en el body recibe primero y segundoigualmente con un promise all. Dentro del post se realizan unas validaciones para determinar el daño.
Tiene instalado nodemon, el proyecto se corre con el comando : npm run dev
La libreria de cors es para que en angular acepta la petición.
