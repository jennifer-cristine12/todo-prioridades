<<<<<<< HEAD
package com.example.todo.control;

import com.example.todo.model.TodoModel;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class TodoControl {
    @Autowired
    private TodoRepository repositorio;

    @GetMapping("/")
    public String boasVindas(){
        return "api todo:prioridades funcionando";
    }

    @GetMapping("/listar")
    public @ResponseBody Iterable<TodoModel> listar(){
        return repositorio.findAll();
    }
    @PostMapping("/cadastrar")
    public TodoModel cadastrar(@RequestBody TodoModel atividade){
        return repositorio.save(atividade);
    }
    @GetMapping("/tarefa/{id}")
    public @ResponseBody Optional<TodoModel> filtrarTarefa(@PathVariable long id){
        return repositorio.findById(id);
    }
    /*
    @DeleteMapping("/remover/{id}")
    public @ResponseBody void remover(@PathVariable Long id){
        Optional<TodoModel> tarefa = filtrarTarefa(id);
       repositorio.delete(tarefa);
    }
*/
}
=======
package com.example.todo.control;

import com.example.todo.model.TodoModel;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class TodoControl {
    @Autowired
    private TodoRepository repositorio;

    @GetMapping("/")
    public String boasVindas(){
        return "api todo:prioridades funcionando";
    }
 @GetMapping("/diferenca")
    public String teste(){
        return "api todo:prioridades funcionando no git";
    }

    @GetMapping("/listar")
    public @ResponseBody Iterable<TodoModel> listar(){
        return repositorio.findAll();
    }
    @PostMapping("/cadastrar")
    public TodoModel cadastrar(@RequestBody TodoModel atividade){
        return repositorio.save(atividade);
    }
    @GetMapping("/tarefa/{id}")
    public @ResponseBody Optional<TodoModel> filtrarTarefa(@PathVariable long id){
        return repositorio.findById(id);
    }
    /*
    @DeleteMapping("/remover/{id}")
    public @ResponseBody void remover(@PathVariable Long id){
        Optional<TodoModel> tarefa = filtrarTarefa(id);
       repositorio.delete(tarefa);
    }
*/
}
>>>>>>> 7201919 (primeiro commit)
