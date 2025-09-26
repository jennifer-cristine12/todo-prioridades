
package com.example.todo.control;

import com.example.todo.model.TodoModel;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.Optional;

@RestController
public class TodoControl {
    @Autowired
    private TodoRepository repositorio;

    @GetMapping("/")
    public String boasVindas() {
        return "api todo:prioridades funcionando";
    }

    @GetMapping("/listar")
    public @ResponseBody Iterable<TodoModel> listar() {
        return repositorio.findAll();
    }

    @PostMapping("/cadastrar")
    public TodoModel cadastrar(@RequestBody TodoModel atividade) {
        return repositorio.save(atividade);
    }

    @GetMapping("/tarefa/{id}")
    public @ResponseBody Optional<TodoModel> filtrarTarefa(@PathVariable long id) {
        return repositorio.findById(id);
    }

    @DeleteMapping("/remover")
    public @ResponseBody void remover() {
        this.repositorio.deleteAll();
    }
    /*
    @DeleteMapping("/remover/{id}")
    public @ResponseBody void remover(@PathVariable Long id){
        TodoModel aem = filtrarTarefa(id);
        this.repositorio.delete(aem);
    }*/
    @PutMapping("/alterar")
    public  TodoModel Alterar(@RequestBody TodoModel tarefa){
        return repositorio.save(tarefa);

    }
}