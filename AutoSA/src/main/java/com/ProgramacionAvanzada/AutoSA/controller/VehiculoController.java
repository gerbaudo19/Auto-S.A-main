package com.ProgramacionAvanzada.AutoSA.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.dto.VehiculoDto;
import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import com.ProgramacionAvanzada.AutoSA.service.ClienteService;
import com.ProgramacionAvanzada.AutoSA.service.VehiculoService;

//@RestController se utiliza para marcar una clase como un controlador REST en una aplicación Spring. Un controlador REST se encarga de gestionar las solicitudes HTTP y proporcionar respuestas en formato JSON u otros formatos que representen recursos web.
//@RequestMapping se utiliza para asociar una ruta (URL) específica con un controlador o método. En este caso, se configura para que el controlador maneje las solicitudes que comiencen con "/vehiculo".
//@CrossOrigin se utiliza para habilitar el acceso cruzado en solicitudes a este controlador desde cualquier origen ("*"). Esto permite que los navegadores web realicen solicitudes a este controlador desde diferentes dominios
@RestController
@RequestMapping("/vehiculo")
@CrossOrigin("*")
public class VehiculoController {
    //Se utiliza @Autowired para inyectar una instancia de VehiculoService en una clase o componente de Spring. Esto permite que la clase tenga acceso a los métodos definidos en VehiculoService para interactuar con la base de datos de manera sencilla.
    @Autowired
    VehiculoService vehiculoService;
    //Lo mismo que arriba pero para acceder a los metodos de ClienteService
    @Autowired
    ClienteService clienteService;

    //@GetMapping("/list"): Esta anotación se utiliza para especificar que este método debe manejar las solicitudes HTTP GET dirigidas a la ruta "/list".
    //public ResponseEntity<List<Vehiculo>> findAll() Es un metodo publico que devuelve un ResponseEntity que contiene una lista de objetos de tipo Vehiculo.
    @GetMapping("/list")
    public ResponseEntity<List<Vehiculo>> findAll(){
        //Llama al metodo findAll de la clase VehiculoService que realiza la recuperacion de datos de la base de datos.
        List<Vehiculo> list = vehiculoService.findAll();
        //El método crea un objeto ResponseEntity que envuelve la lista list y un código de estado HTTP HttpStatus.OK (que indica una respuesta exitosa)
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //@PostMapping se utiliza para indicar que este método maneja solicitudes HTTP POST a la ruta "/create".
    //Este método tiene como parámetro un objeto VehiculoDto que se obtiene del cuerpo de la solicitud HTTP. La anotación @RequestBody indica que el objeto vehiculoDto se debe deserializar automáticamente a partir de los datos JSON enviados en el cuerpo de la solicitud.
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody VehiculoDto vehiculoDto){
        String patenteVehiculoNuevo = vehiculoDto.getPatente();
        if(vehiculoDto.getPatente().isBlank() ||
        vehiculoService.existsByPatente(patenteVehiculoNuevo)
        ){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            try {
            //Se crea una variable clienteId que alamacena el id del cliente, este se obtiene a traves del parametro vehiculoDto, que a su ves tiene un objeto cliente con el metodo getId
            int clienteId = vehiculoDto.getCliente().getId();
            //Se crea un objeto de cliente llamado clieVehiculo con los datos del cliente obtenidos por el metodo findById(clienteId).get() de la clase clienteService
            Cliente clieVehiculo = clienteService.findById(clienteId).get();  
            //Si el cliente es distinto de nullo es decir que existe un cliente entonces
            if(clieVehiculo != null){
                //Se crea un nuevo objeto Vehiculo
                Vehiculo vehiculoNuevo = new Vehiculo(
                    clieVehiculo,
                    vehiculoDto.getModelo(),
                    vehiculoDto.getAño(),
                    vehiculoDto.getKilometraje(),
                    vehiculoDto.getPatente()
                );
                //Se llama al metodo save en VehiculoService para guardar el nuevo vehiculo
                vehiculoService.save(vehiculoNuevo);
            }
            //Si todo se ejecuta correctamente, se devuelve una respuesta HTTP con el estado 200 OK 
            return new ResponseEntity<>(HttpStatus.OK);
            //Si ocurre alguna excepción durante el proceso, se captura la excepción en el bloque catch, y se devuelve una respuesta HTTP con el estado 400 Bad Request
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        
    }

    // se utiliza para indicar que este método maneja solicitudes HTTP PUT a la ruta "/update/{id}". 
    //Este método tiene dos parámetros. El primero, @PathVariable("id") int id, captura el valor del ID del vehículo desde la URL. El segundo, @RequestBody VehiculoDto vehiculoDto, obtiene los datos del vehículo que se deserializan automáticamente desde el cuerpo de la solicitud HTTP (en formato JSON).
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody VehiculoDto vehiculoDto){
        //Se verifica si un vehículo con el ID proporcionado (id) existe en la base de datos utilizando el método existsById del servicio de vehículos (vehiculoService).
        if(!vehiculoService.existsById(id)){
            // Si no existe, se devuelve una respuesta HTTP con el estado 400 Bad Request
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        //Si el vehículo con el ID proporcionado existe, se recupera utilizando el método findById del servicio de vehículos (vehiculoService). Luego, se actualizan los campos del vehículo con los valores proporcionados en vehiculoDto mediante métodos setter.
        Vehiculo vehiculo = vehiculoService.findById(id).get();
        vehiculo.setPatente(vehiculoDto.getPatente());
        vehiculo.setAño(vehiculoDto.getAño());
        vehiculo.setKilometraje(vehiculoDto.getKilometraje());
        vehiculo.setModelo(vehiculoDto.getModelo());
        vehiculo.setCliente(vehiculoDto.getCliente());
        //se llama al método save del servicio de vehículos (vehiculoService) para guardar los cambios en el vehículo en la base de datos
        vehiculoService.save(vehiculo);
        // se devuelve una respuesta HTTP con el estado 200 OK (HttpStatus.OK) para indicar que la operación se realizó con éxito.
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // se utiliza para indicar que este método maneja solicitudes HTTP DELETE a la ruta "/delete/{id}"
    // Este método tiene un parámetro, @PathVariable("id") int id, que captura el valor del ID del vehículo desde la URL.
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        //Se verifica si un vehículo con el ID proporcionado (id) existe en la base de datos utilizando el método existsById del servicio de vehículos (vehiculoService)
        if(!vehiculoService.existsById(id)){
            // Si no existe, se devuelve una respuesta HTTP con el estado 400 Bad Request (HttpStatus.BAD_REQUEST)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        //Si el vehículo con el ID proporcionado existe, se llama al método deleteById del servicio de vehículos (vehiculoService) para eliminar el vehículo de la base de datos.
        vehiculoService.deleteById(id);
        //Finalmente, se devuelve una respuesta HTTP con el estado 200 OK (HttpStatus.OK) para indicar que la eliminación se realizó con éxito.
        return new ResponseEntity<>(HttpStatus.OK);
    }

 /*    @GetMapping("/listByMarcaNombre/{nombre}")
    public ResponseEntity<List<Vehiculo>> findByMarcaNombre(@PathVariable String nombre){
        try {

            //Se utiliza el objeto cliente para llamar al servicio de vehículos (vehiculoService) y recuperar una lista de vehículos asociados a ese cliente utilizando el método findByCliente.
            List<Vehiculo> list = vehiculoService.findByMarcaNombre(nombre);
            //Finalmente, se devuelve una respuesta HTTP con el estado 200 OK (HttpStatus.OK) que incluye la lista de vehículos en formato JSON en el cuerpo de la respuesta.
        return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
*/
    //se utiliza para indicar que este método maneja solicitudes HTTP GET a la ruta "/listbyclie/{id}
    // Este método tiene un parámetro, @PathVariable("id") int id, que captura el valor del ID del cliente desde la URL.
    @GetMapping("/listByClienteId/{id}")
    public ResponseEntity<List<Vehiculo>> findByClienteId(@PathVariable("id") int id){
        try {
            List<Vehiculo> list = vehiculoService.findByClienteId(id);
            //Finalmente, se devuelve una respuesta HTTP con el estado 200 OK (HttpStatus.OK) que incluye la lista de vehículos en formato JSON en el cuerpo de la respuesta.
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/listByPatente/{patente}")
    public ResponseEntity<Optional<Vehiculo>> findByClienteId(@PathVariable String patente){
        try {
            Optional<Vehiculo> vehiculo = vehiculoService.findByPatente(patente);
            //Finalmente, se devuelve una respuesta HTTP con el estado 200 OK (HttpStatus.OK) que incluye la lista de vehículos en formato JSON en el cuerpo de la respuesta.
            return new ResponseEntity<>(vehiculo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
