import { useState } from "react"
import Todo from "./todo"
import './todoApp.css'

export default function TodoApp () {
    const [title, setTitle] = useState("Hola")
    const [toDos, setToDos] = useState([])

    function handleChange(e){
        const value = e.target.value
        setTitle(value)
    }

    function handleSubmit(e){
        e.preventDefault()

        const newToDo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }

        const temp = [...toDos]
        temp.unshift(newToDo)

        setToDos(temp)
        setTitle('')

        // setToDos([...toDos, newToDo])
    }

    function handleUpdate(id, value) {
        const temp = [...toDos]
        const item = temp.find( item => item.id === id )
        item.title = value
        setToDos(temp)
    }

    function handleDelete(id) {
        const temp = toDos.filter(item => item.id !== id)
        setToDos(temp)
    }

    return (
        <div className="todoContainer">
            <form className="todoCreateForm" onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange}
                    className="todoInput" 
                    value={title} 
                />
                <input
                    onClick={handleSubmit}
                    className="buttonCreate"
                    type="submit"
                    value="Create ToDo"
                />
            </form>

            <div className="toDosContainter">
                {
                    toDos.map((item) => (
                        <Todo 
                            key={item.id} 
                            item={item} 
                            onUpdate={handleUpdate} 
                            onDelete={handleDelete}
                        />
                    ))
                }
            </div>
        </div>
    )
}