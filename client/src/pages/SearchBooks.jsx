import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  const [formData, setFormData] = useState({
    authors: '',
    title: '',
  });
  const navigate = useNavigate();

  // Use Apollo Client for GraphQL interactions
  const { loading, data, refetch } = useQuery(GET_ME, {
    variables: {
      ...formData, // Pass search criteria as query variables
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await saveBook({
        variables: {...formData },
      })
      
      navigate(`/book/${data.saveBook.book._id}`);
      refetch(); //refetch books after saving
    } catch (err) {
      console.error(err);
    }

    setFormData({
      authors: '',
      title: '',
    });
  };

  const [saveBook ] = useMutation(SAVE_BOOK);
  // create function to handle saving a book to our database
  const handleSaveBook = async (data) => {
    // find the book in `searchedBooks` state by the matching id

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook(data, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      data([...data, data.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='booklist'
                  value={saveBook}
                  onChange={handleInputChange}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        )}
      </div>

      <Container>
        <h2 className='pt-5'>
          {data.length
            ? `Viewing ${data.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {data.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={data?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {data?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
