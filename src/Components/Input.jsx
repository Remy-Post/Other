import { useRef } from "react";

export default function Input({ label, isTextArea = false, ref, ...props }) {
    const classes = "w-full p-1 boder-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none"

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {isTextArea ? <textarea ref={ref} className={classes} {...props} /> : <input ref={ref} className={classes} {...props} />}
        </p>
    )
}