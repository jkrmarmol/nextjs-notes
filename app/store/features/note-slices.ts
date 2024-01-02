import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


export const createNotes = createAsyncThunk(
  'notes/create',
  async (text: string) => {
    try {
      const data = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: text })
      })
      if (data.ok) {
        const jsonData = await data.json();
        return jsonData
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
      }
    }
  }
)

export const readNotes = createAsyncThunk(
  'notes/read',
  async () => {
    try {
      const data = await fetch('/api')
      if (data.ok) {
        const jsonData = await data.json();
        return jsonData
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
      }
    }
  }
)

export const searchNotes = createAsyncThunk(
  'notes/search',
  async (text: string) => {
    try {
      const data = await fetch(`/api/search?notes=${text}`)
      if (data.ok) {
        const jsonData = await data.json();
        return jsonData
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
      }
    }
  }
)

export const updateNotes = createAsyncThunk(
  'notes/update',
  async ({ id, notes }: { id: string; notes: string }) => {
    try {
      const data = await fetch(`/api`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, notes })
      })
      if (data.ok) {
        const jsonData = await data.json();
        return jsonData
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
      }
    }
  }
)

export const deleteNotes = createAsyncThunk(
  'notes/delete',
  async (id: string) => {
    try {
      const data = await fetch(`/api`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      if (data.ok) {
        const jsonData = await data.json();
        return jsonData
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
      }
    }
  }
)



let initialState: {
  createNotes: {
    response: {
      message: string
    } | undefined;
    status: null | 'loading' | 'ok' | 'failed'
  },
  readNotes: {
    response: Array<{
      id: string;
      notes: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
    status: null | 'loading' | 'ok' | 'failed'
  };
  searchNotes: {
    response: Array<{
      id: string;
      notes: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
    status: null | 'loading' | 'ok' | 'failed'
  },
  updateNotes: {
    response: {
      message: string
    } | { error: string } | undefined;
    status: null | 'loading' | 'ok' | 'failed'
  },
  deleteNotes: {
    response: {
      message: string
    } | { error: string } | undefined;
    status: null | 'loading' | 'ok' | 'failed'
  },
} = {
  createNotes: {
    response: { message: '' },
    status: null
  },
  readNotes: {
    response: [],
    status: null
  },
  searchNotes: {
    response: [],
    status: null
  },
  updateNotes: {
    response: { message: '' },
    status: null
  },
  deleteNotes: {
    response: { message: '' },
    status: null
  },
}

const noteSlices = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNotes.pending, (state, action) => {
        state.createNotes.status = 'loading';
      })
      .addCase(createNotes.fulfilled, (state, { payload }) => {
        state.createNotes.status = 'ok';
        state.createNotes.response = payload
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.createNotes.status = 'failed'
      })
      .addCase(readNotes.pending, (state, action) => {
        state.readNotes.status = 'loading';
      })
      .addCase(readNotes.fulfilled, (state, { payload }) => {
        state.readNotes.status = 'ok';
        state.readNotes.response = payload
      })
      .addCase(readNotes.rejected, (state, action) => {
        state.readNotes.status = 'failed'
      })
      .addCase(searchNotes.pending, (state, action) => {
        state.searchNotes.status = 'loading';
      })
      .addCase(searchNotes.fulfilled, (state, { payload }) => {
        state.searchNotes.status = 'ok';
        state.searchNotes.response = payload
      })
      .addCase(searchNotes.rejected, (state, action) => {
        state.searchNotes.status = 'failed'
      })
      .addCase(updateNotes.pending, (state) => {
        state.updateNotes.status = 'loading';
      })
      .addCase(updateNotes.fulfilled, (state, { payload }) => {
        state.updateNotes.status = 'ok';
        state.updateNotes.response = payload
      })
      .addCase(updateNotes.rejected, (state) => {
        state.updateNotes.status = 'failed'
      })
      .addCase(deleteNotes.pending, (state) => {
        state.deleteNotes.status = 'loading';
      })
      .addCase(deleteNotes.fulfilled, (state, { payload }) => {
        state.deleteNotes.status = 'ok';
        state.deleteNotes.response = payload
      })
      .addCase(deleteNotes.rejected, (state) => {
        state.deleteNotes.status = 'failed'
      })
  }
})

export default noteSlices.reducer