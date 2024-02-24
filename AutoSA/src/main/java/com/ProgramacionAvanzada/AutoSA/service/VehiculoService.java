package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import com.ProgramacionAvanzada.AutoSA.repository.VehiculoRepository;


//@Service se utiliza para marcar una clase como un componente de servicio. Los servicios en Spring se utilizan para encapsular la lógica de negocio y proporcionar una capa de abstracción entre los controladores (endpoints de la API) y la capa de acceso a datos (como los repositorios de Hibernate o JPA).
//@Transactional se utiliza para garantizar que todas las operaciones de base de datos realizadas dentro de un método o clase se ejecuten de forma atómica. Esto significa que todas las operaciones se realizarán o no se realizarán, y que no se producirán datos inconsistentes en la base de datos.
// Si se produce una excepción durante la ejecución de uno de estos métodos, la transacción se revertirá y los datos de la base de datos se mantendrán intactos.
@Service
@Transactional
public class VehiculoService {
    //Se utiliza @Autowired para inyectar una instancia de VehiculoRepository en una clase o componente de Spring. Esto permite que la clase tenga acceso a los métodos definidos en VehiculoRepository para interactuar con la base de datos de manera sencilla.    
    @Autowired
    VehiculoRepository vehiculoRepository;

    //Lista todos los vehiculos
    public List<Vehiculo> findAll(){
        return vehiculoRepository.findAll();
    }

    //Guarda vehiculo, instanciando uno mediante los parametros
    public void save(Vehiculo vehiculo){
        vehiculoRepository.save(vehiculo);
    }

    //Borra un vehiculo teniendo en cuenta el id ingresado en los parametros
    public void deleteById(int id){
        vehiculoRepository.deleteById(id);
    }

    //Devuelve un vehiculo segun el Id que conisidan con el ingresado por el parametro
    public Optional<Vehiculo> findById(int id){
        return vehiculoRepository.findById(id);
    }

    //Devuelve un vehiculo segun su patente que conisidan con el ingresado por el parametro
    public Optional<Vehiculo> findByPatente(String patente) {
        return vehiculoRepository.findByPatente(patente);
    }

    //Lista los vehiculos segun los cliente que conisidan con el ingresado por el parametro
    public List<Vehiculo> findByClienteId(int id){
        return vehiculoRepository.findByClienteId(id);
    }

    //Lista los vehiculos segun el nombre de la marca
    //public List<Vehiculo> findByMarcaNombre(String nombre) {
    //    return vehiculoRepository.findByMarcaNombre(nombre);
    //}
/*
    public List<Vehiculo> findByCliente(Cliente cliente){
        return vehiculoRepository.findByCliente(cliente);
    }
*/
    //Se fija si ya existe un vehiculo segun su id
    public boolean existsById(int id) {
        return vehiculoRepository.existsById(id);
    }

    public boolean existsByPatente(String patente){
        return vehiculoRepository.existsByPatente(patente);
    }
}
