export const AddTodoForm = (props) => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // form.reset();
        const formData = new FormData(e.target);

        fetch('http://localhost:3030/jsonstore/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                text: formData.get('text'),
                isCompleted: !!formData.get('isCompleted')
            })
        })
            .then(res => res.json())
            .then(created => {
                e.target.reset();
                props.passCreatedUp(created)
            })
            .catch(err => console.log(err))

    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <div className="add-btn-container">
                <label htmlFor="text">
                    Text:
                    <input type="text" name="text" />
                </label>
                <label htmlFor="isCompleted">
                    Completed:
                    <input type="checkbox" name="isCompleted" />
                </label>

                <button type="submit" className="btn">+ Add new Todo</button>
            </div>
        </form>
    );
}