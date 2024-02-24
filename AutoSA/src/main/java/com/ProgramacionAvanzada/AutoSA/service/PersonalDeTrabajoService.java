package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.repository.PersonalDeTrabajoRepository;

@Service
@Transactional
public class PersonalDeTrabajoService {
    @Autowired
    PersonalDeTrabajoRepository personalDeTrabajoRepository;

    public List<PersonalDeTrabajo> findAll(){
        return personalDeTrabajoRepository.findAll();
    }

    public List<PersonalDeTrabajo> findByOrdenDeTrabajoId(int ordenDeTrabajoId){
        return personalDeTrabajoRepository.findByOrdenDeTrabajoId(ordenDeTrabajoId);
    }

    public void save(PersonalDeTrabajo personalDeTrabajo){
        personalDeTrabajoRepository.save(personalDeTrabajo);
    }

    public void deleteById(int id){
        personalDeTrabajoRepository.deleteById(id);
    }

    public Optional<PersonalDeTrabajo> findById(int id){
        return personalDeTrabajoRepository.findById(id);
    }
}
