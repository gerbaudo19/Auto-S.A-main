package com.ProgramacionAvanzada.AutoSA.service;

//import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.repository.ClienteRepository;

@Service
@Transactional
public class ClienteService {
    @Autowired
    ClienteRepository clienteRepository;

    public List<Cliente> findAll(){
        return clienteRepository.findAll();
    }

    public void save(Cliente cliente){
        clienteRepository.save(cliente);
    }

    public void deleteById(int id){
        clienteRepository.deleteById(id);
    }

    public Optional<Cliente> findById(int id){
        return clienteRepository.findById(id);
    }

    public Optional<Cliente> findByDni(String dni){
        return clienteRepository.findByDni(dni);
    }

    public List<Cliente> findByNombre(String nombre){
        return clienteRepository.findByNombre(nombre);
    }
/*
    public List<Cliente> findByFecha(LocalDate fecha){
        return clienteRepository.findByFecha(fecha);
    }
*/
    public boolean existsById(int id) {
        return clienteRepository.existsById(id);
    }

    public boolean existsByDni(String dni){
        return clienteRepository.existsByDni(dni);
    }
}
