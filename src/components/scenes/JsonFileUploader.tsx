
'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { createClient } from '@vercel/kv';
import { getBooks, updateBook, createBook, deleteBook } from '@/books/actions';
import { get } from 'http';
import { Book } from '@/books/types';

import { isJsonFile } from '@/books/utils';

interface JsonFileUploaderProps {
    editMode: boolean;
    bookID?: string;
    mode: string;
}


const JsonFileUploader: React.FC<JsonFileUploaderProps> = ({ editMode, bookID, mode }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [bookIDVal, setBookIDVal] = useState<string>('');



    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("here")
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const uploadJsonToKV = async (formObject: FormData) => {
        console.log('formObject', formObject)
        if (mode == 'create') {
            createBook(formObject).then((response) => {
                console.log('response', response)
            });
        }
        if (mode == 'update' && bookID) {
            formObject.append("_id", bookID);
            updateBook(formObject).then((response) => {
                console.log('response', response)
            });
        }
        if (mode == 'delete' && bookIDVal) {
            console.log("delete");
            deleteBook(bookIDVal).then((response) => {
                console.log('response', response)
            });
        }

    };
    const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value != null) {
            setBookIDVal(event.target.value);
            const form_data = new FormData();
            form_data.append("_id", bookIDVal);
        }
    };

    const handleUpload = async () => {
        console.log("here", file)
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                if (e.target?.result) {
                    try {
                        const form_data = new FormData();
                        form_data.append("book", file);
                        console.log(isJsonFile(file))

                        await uploadJsonToKV(form_data);
                    } catch (error) {
                        console.error('Error parsing JSON file:', error);
                        setUploadStatus('Error parsing JSON file');
                    }
                }
            };
            reader.readAsText(file);

        } else {
            ;
            const form_data = new FormData();
            form_data.append("_id", bookIDVal);
            await uploadJsonToKV(form_data);

        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {editMode && <div>
                <h2>{mode}</h2>
                {mode === "delete" && <label htmlFor="bookID">Book ID <input onChange={handleInput} id="bookID" /></label>}
                {mode !== "delete" && <input type="file" onChange={handleFileChange} />}
                <button onClick={handleUpload}>Process File</button>
                {selectedFile && <p>File name: {selectedFile.name}</p>}
            </div>}
        </Suspense>
    );
};

export default JsonFileUploader;