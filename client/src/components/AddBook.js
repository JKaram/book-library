import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';


import { getAuthorsQuery, addBookMutation } from '../queries/queries'


function AddBook( props ) {
    const [form, setForm] = useState({
        name: '',
        genre: '',
        authorId: ''
    })
    console.log(props, 'Data')
    function displayAuthors() {
        if (props.getAuthorsQuery.loading) {
            return (<option disabled>Loading authors</option>);
        } else {
            return props.getAuthorsQuery.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    function submitForm(e) {
        e.preventDefault()
        props.addBookMutation({
            variables: {
                name: form.name,
                genre: form.genre,
                authorId: form.authorId
            }
        })
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={e => setForm({ ...form, genre: e.target.value })} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={e => setForm({ ...form, authorId: e.target.value })}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>

        </form>
    );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
