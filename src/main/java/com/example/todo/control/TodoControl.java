
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



    @GetMapping("/tarefa/{id}")
    public @ResponseBody Optional<TodoModel> filtrarTarefa(@PathVariable long id) {
        return repositorio.findById(id);
    }
    @GetMapping("/tarefa/prioridade/{id}")
    public @ResponseBody String filtrarPrioridade(@PathVariable String prioridade) {
        return repositorio.findByPrioridade(prioridade);
    }

    @GetMapping("/itens/listar")
    public @ResponseBody Iterable<TodoModel> listar() {
        return repositorio.findAll();
    }

    @PostMapping("/itens/cadastrar")
    public TodoModel cadastrar(@RequestBody TodoModel atividade) {
        return repositorio.save(atividade);
    }

    @DeleteMapping("/tarefa/remover")
    public @ResponseBody void removerTudo() {
        this.repositorio.deleteAll();
    }

    @DeleteMapping("/tarefa/remover/{id}")
    public @ResponseBody void remover(@RequestBody TodoModel tarefa){
        this.repositorio.delete(tarefa);
    }
    @PutMapping("/tarefa/alterar")
    public  TodoModel Alterar(@RequestBody TodoModel tarefa){
        return repositorio.save(tarefa);

    }
}