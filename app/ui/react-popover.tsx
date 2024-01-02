"use client"
import { ReactElement, useEffect, useRef, useState } from "react";

function ReactPopover({ children, content }: {
  children: React.ReactNode;
  content: ReactElement<any, any>;
}) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<any>(null);


  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className="w-fit h-fit relative flex justify-center">
      <div
        onClick={() => setShow(!show)}
      >
        {children}
      </div>
      <div
        hidden={!show}
        className="min-w-fit w-[100px] h-fit top-6 absolute bottom-[100%] z-50 transition-all">
        <div className="bg-white rounded-md px-2 py-4 shadow-[10px_30px_150px_rgba(46,38,92,0.25)] mb-[10px]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ReactPopover;