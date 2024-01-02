import { Poppins } from 'next/font/google'
import React from 'react'
import moment from 'moment';
import ReactPopover from '@/app/ui/react-popover';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/app/store/hooks';
import { updateNotes, deleteNotes } from '@/app/store/features/note-slices';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function ItemNotes({ id, notes, createdAt, updatedAt }: {
  id: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  const dispatch = useAppDispatch();
  const onClickUpdate = async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Update Notes",
      inputPlaceholder: "Type your notes here...",
      inputValue: notes,
      inputAttributes: {
        "aria-label": "Type your notes here"
      },
      showCancelButton: true
    });
    if (text) {
      const data = await dispatch(updateNotes({ id, notes: text }))
      Swal.fire(data.payload.message);
    }
  }
  const onClickDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { payload } = await dispatch(deleteNotes(id))
        if (payload.message === "Successfully Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: "Your notes has been deleted.",
            icon: "success"
          });
        }
      }
    });
  }
  return (
    <li className="even:bg-pink-200 odd:bg-purple-200 mx-5 rounded-lg p-8 my-2  bg-white">
      <div className=" flex justify-between ">
        <div className="">
          <p className="text-[0.8rem] font-medium max-lg:text-sm" style={poppins.style}>{id}</p>
          <p className="text-xs text-gray-400 font-medium" style={poppins.style}>{moment(createdAt).startOf('minute').fromNow()}</p>
        </div>

        <ReactPopover
          content={
            <div className="flex flex-col items-start justify-start">
              <button
                onClick={onClickUpdate}
                className="text-[0.82rem] font-semibold text-black text-opacity-60 hover:bg-blue-50 w-full text-start py-2 px-2 rounded-lg hover:text-blue-500 hover:duration-300">Edit</button>
              <button
                onClick={onClickDelete}
                className="text-[0.82rem] font-semibold text-black text-opacity-60 hover:bg-blue-50 w-full text-start py-2 px-2 rounded-lg hover:text-blue-500 hover:duration-300">Delete</button>
            </div>
          }
        >
          <button className="rounded-md hover:bg-gray-100 flex items-center justify-center w-8 cursor-pointer h-8">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" fill="#1C274C" />
              <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#1C274C" />
              <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="#1C274C" />
            </svg>
          </button>
        </ReactPopover>


      </div>
      <p className="opacity-70 text-[0.8rem] text-gray-700 font-normal max-lg:text-xs mt-5" style={poppins.style}>{notes}</p>
    </li>
  )
}
