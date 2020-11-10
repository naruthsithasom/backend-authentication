const db = require("../models");

const getTodoList = async(req, res) => {
    const todoList = await db.TodoList.findAll({ where: { user_id: req.user.id}})
    res.status(200).send(todoList);
};

const addTodoList = async(req, res) => {
    /*const newTodo = {
        id: Number(uniqueId()),
        task: req.body.task
    };

    todoList.push(newTodo);
    */
    const newTodo = await db.TodoList.create({
        task: req.body.task,
        user_id: req.user.id
    })
    res.status(201).send(newTodo);
};

const deleteTodoList = async (req, res) => {
    /*const targetId = Number(req.params.id);
    todoList = todoList.filter(todo => todo.id !== targetId);*/
    const targetId = Number(req.params.id)
    const targetTodo = await db.TodoList.findOne({ where: { id: targetId, user_id: req.user.id }})
    if(targetTodo){
        await targetTodo.destroy()
        res.status(204).send({ message: 'Delete Success.'})
    }else {
        res.status(404).send({ message: 'Permission Access!!!' })
    }

};

const updateTodoList = async(req, res) => {
    /*const targetId = Number(req.params.id);
    const newTask = req.body.task;
    const targetIndex = todoList.findIndex(todo => todo.id === targetId);
    todoList[targetIndex] = {
        id: targetId,
        task: newTask
    };
    */
    const targetId = +(req.params.id)
    const newTask = req.body.task
    const targetTodo = await db.TodoList.findOne({ where: { id: targetId, user_id: req.user.id }})

    /*await db.TodoList.update({
        task: newTask
    },{
        where: { id: targetId}
    })*/
    if(targetTodo){
        await targetTodo.update({
            task: newTask
        })
        res.status(200).send({ message: "updating is success" });
    }else{
        res.status(404).send({ message: 'not update'})
    }
};

module.exports = {
    getTodoList,
    addTodoList,
    deleteTodoList,
    updateTodoList
};