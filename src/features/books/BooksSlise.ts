// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createEntityAdapter, createSlice, configureStore } from '@reduxjs/toolkit';

type Book = { bookId: string; title: string };

export const booksAdapter = createEntityAdapter<Book>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (book) => book.bookId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: booksAdapter.addOne,
    upsertOne: booksAdapter.upsertOne,
    upsertMany: booksAdapter.upsertMany,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    booksLoadingStarted(state, action) {
      // Can update the additional state field
      state.loading = 'pending';
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    booksLoading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    booksReceived(state, action) {
      if (state.loading === 'pending') {
        // Or, call them as "mutating" helpers in a case reducer
        console.log('booksReceived action.payload', action.payload);
        booksAdapter.setAll(state, action.payload);
        state.loading = 'idle';
      }
    },
    bookUpdated: booksAdapter.updateOne,
  },
});

/*
const store = configureStore({
    reducer: {
        books: booksSlice.reducer,
    },
})*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type BooksRootState = Array<Book>;

export const { bookAdded, booksLoading, booksReceived, bookUpdated, upsertOne, upsertMany } =
  booksSlice.actions;

export default booksSlice.reducer;
