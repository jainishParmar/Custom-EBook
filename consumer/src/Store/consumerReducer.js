import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, api, setAuthHeader } from "../Api/api";

export const getBookById = createAsyncThunk(
  "getBookById",
  async ({ bookId }) => {
    try {
      const response = await api.get(`${BASE_URL}/api/consumer/book/${bookId}`);
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const getBookChunks = createAsyncThunk(
  "getBookChunks",
  async ({ jwt, bookId }) => {
    setAuthHeader(jwt, api);
    try {
      const response = await api.get(
        `${BASE_URL}/api/consumer/chunk/${bookId}`
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const getMyBooks = createAsyncThunk(
  "getMyBooks",
  async ({ jwt, email }) => {
    setAuthHeader(jwt, api);
    try {
      const response = await api.get(
        `${BASE_URL}/api/consumer/bookBy/${email}`
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const getBooks = createAsyncThunk("getBooks", async () => {
  // setAuthHeader(api);
  try {
    const response = await api.get(`${BASE_URL}/api/consumer/books`);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error);
  }
});

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ jwt, email, chunkId }) => {
    setAuthHeader(jwt, api);
    try {
      const response = await api.post(
        `${BASE_URL}/api/consumer/add-to-cart`,
        {},
        {
          params: {
            chunkId: chunkId,
            email: email,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const viewCart = createAsyncThunk("viewCart", async ({ jwt, email }) => {
  setAuthHeader(jwt, api);
  try {
    const response = await api.get(`${BASE_URL}/api/consumer/view-cart`, {
      params: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error);
  }
});

export const deleteFromCart = createAsyncThunk(
  "deletefromcart",
  async ({ jwt, email, chunkId }) => {
    setAuthHeader(jwt, api);
    try {
      const response = await api.delete(
        `${BASE_URL}/api/consumer/remove-from-cart`,
        {
          params: {
            chunkId: chunkId,
            email: email,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const generateBook = createAsyncThunk(
  "generateBook",
  async ({ jwt, newBookDTO }) => {
    setAuthHeader(jwt, api);
    try {
      const response = await api.post(
        `${BASE_URL}/api/consumer/generate-book`,
        newBookDTO
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const viewOrders = createAsyncThunk(
  "viewOrders",
  async ({ jwt, email }) => {
    setAuthHeader(jwt, api);
    try {
      const response = await api.get(`${BASE_URL}/api/consumer/orders`, {
        params: {
          email: email,
        },
      });
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

const consumerSlice = createSlice({
  name: "consumer",
  initialState: {
    MyBooks: [],
    ChunksOfBook: [],
    BookById: [],
    Books: [],
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.MyBooks = action.payload;
        state.error = null;
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.BookById = action.payload;
        state.error = null;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getBookChunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookChunks.fulfilled, (state, action) => {
        state.loading = false;
        state.ChunksOfBook = action.payload;
        state.error = null;
      })
      .addCase(getBookChunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.Books = action.payload;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = [...state.cartItems, action.payload];
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(viewCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.error = null;
      })
      .addCase(viewCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        const deletedChunkId = action.meta.arg.chunkId;
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (chunk) => chunk.chId !== deletedChunkId
        );
        state.error = null;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(generateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateBook.fulfilled, (state, action) => {
        state.loading = false;
        state.MyBooks=[...state.MyBooks,action.payload]
        state.cartItems = [];
        state.error = null;
      })
      .addCase(generateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(viewOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.MyBooks = action.payload;
        state.error = null;
      })
      .addCase(viewOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default consumerSlice.reducer;
