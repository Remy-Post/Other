import Input from "./Input";
import Modal from "./Modal";
import { useRef } from "react";

export default function NewProject({ onAddProject, onCancel }) { 

    const modalRef = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if (enteredTitle.trim() === "" 
        || enteredDescription.trim() === "" 
        || enteredDueDate.trim() === "") {
            modalRef.current.open();
            return;
        }

        onAddProject({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        })
    }

    return (
        <>
        <Modal ref={modalRef} buttonCaption="Close">
            <h2 className="text-xl font-bold text-stone-900 my-4">Invalid Input</h2>
            <p className="text-stone-700 mb-4">Opps ... looks like you forgot to enter a value.</p>
            <p className="text-stone-700 mb-4">Please make sure you provide a valid value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button className="text-stone-800 hover:text-stone-900" onClick={onCancel}>Cancel</button></li>
                <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button></li>
            </menu>
            <div >
                <Input ref={title} label="Title" type="text" />
                <Input ref={description} label="Description" isTextArea={true} />
                <Input ref={dueDate} label="Due Date" type="date" />
            </div>
        </div>
        </>
    )
}