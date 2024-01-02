"use client"
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { createNotes, readNotes, searchNotes } from '@/app/store/features/note-slices'
import ItemNotes from '@/app/ui/item-notes'
import { useDebouncedCallback } from 'use-debounce'


export default function Notes() {
  const dispatch = useAppDispatch();
  const selectReadNotes = useAppSelector(state => state.notes.readNotes)
  const selectCreateNotes = useAppSelector(state => state.notes.createNotes)
  const selectSearchNotes = useAppSelector(state => state.notes.searchNotes)
  const selectUpdateNotes = useAppSelector(state => state.notes.updateNotes)
  const selectDeleteNotes = useAppSelector(state => state.notes.deleteNotes)

  const onClickNew = async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true,
    });
    if (text) {
      const data = await dispatch(createNotes(text))
      Swal.fire(data.payload.message);
    }
  }

  const onClickSearch = useDebouncedCallback((text) => {
    dispatch(searchNotes(text))
  }, 1000)

  useEffect(() => {
    dispatch(readNotes())
  }, [selectCreateNotes, selectUpdateNotes, selectDeleteNotes])
  return (
    <div className="border-2 w-1/3 h-3/4 bg-white rounded-3xl max-lg:w-9/12">

      <div className="mx-5 flex items-center justify-between space-x-1 max-sm:flex max-sm:flex-col max-lg:flex max-lg:items-center max-lg:justify-center">
        <div className="flex border-2 border-black border-opacity-20 my-10 py-2 px-4 items-center rounded-lg grow focus-within:border-black max-lg:w-full">

          <svg className="h-5 w-5 opacity-40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <input
            type="text"
            onChange={e => onClickSearch(e.target.value)}
            placeholder='Search notes'
            className=" flex ml-2 font-mono text-sm w-full outline-none"
          >

          </input>
        </div>

        <div
          onClick={onClickNew}
          className="bg-blue-500 cursor-pointer h-10 px-6 flex items-center rounded-lg grow hover:bg-blue-600 active:bg-blue-700 max-lg:w-full max-sm:-mt-8"
        >
          <div className='flex items-center justify-between w-full text-sm font-mono text-white'>
            New
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H20M12 4V20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

        </div>
      </div>

      <div className="border-black h-[75%]">
        <ul className=" h-full overflow-y-auto">

          {selectSearchNotes.status === 'ok' ? selectSearchNotes.response.map((data, index) => (
            <ItemNotes
              key={index}
              {...data}
            />
          )) : selectReadNotes.status === 'ok' ? selectReadNotes.response.map((data, index) => (
            <ItemNotes
              key={index}
              {...data}
            />
          )) : null}

        </ul>
      </div>

    </div>
  )
}
