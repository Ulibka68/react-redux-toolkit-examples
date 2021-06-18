import store, { RootState } from './store';
import {
  booksAdapter,
  bookAdded,
  bookUpdated,
  booksLoading,
  booksReceived,
  upsertOne,
  upsertMany,
} from '../features/books/BooksSlise';

console.log('***************************************************');
// Check the initial state:
console.log(store.getState().books);
console.log(booksAdapter.getInitialState());
// {ids: [], entities: {}, loading: 'idle' }

const booksSelectors = booksAdapter.getSelectors((state: RootState) => state.books);

store.dispatch(bookAdded({ bookId: 'a', title: 'First' }));
console.log('store.dispatch( bookAdded({ bookId: a, title: First }))');
console.log(' upsertOne');
console.log(store.dispatch(upsertOne({ bookId: 'b', title: 'bTitle' })));
console.log(
  store.dispatch(
    upsertMany([
      { bookId: 'c', title: 'cTitle' },
      { bookId: 'd', title: 'dTitle' },
    ])
  )
);
console.log(store.getState().books);

// {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }

console.log(" store.dispatch(bookUpdated({ id: 'a', changes: { title: 'First (altered)' } }))");
store.dispatch(bookUpdated({ id: 'a', changes: { title: 'First (altered)' } }));
console.log(store.getState().books);
console.log('store.dispatch(booksLoading({}))');
store.dispatch(booksLoading({}));
console.log('booksLoading END');
console.log(store.getState().books);
// {ids: ["a"], entities: {a: {id: "a", title: "First (altered)"}}, loading: 'pending' }

console.log('--booksReceived');

store.dispatch(
  booksReceived([
    { bookId: 'b', title: 'Book 3' },
    { bookId: 'c', title: 'Book 2' },
  ])
);
console.log('--booksReceived END');

console.log(booksSelectors.selectIds(store.getState()));
console.log(store.getState().books);
console.log('----------------------------------');
