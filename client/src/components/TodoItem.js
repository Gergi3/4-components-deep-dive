export const TodoItem = (props) => {
    let trClass = "todo" + (props.isCompleted ? ' is-completed' : '');

    return (
        <tr className={trClass}>
            <td>{props.text}</td>
            <td>{props.isCompleted ? 'Completed' : 'Uncompleted'}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => props.onClick(props)}>Change status</button>
            </td>
        </tr>
    );
}