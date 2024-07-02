
import React, { useState, useEffect, Suspense } from 'react';
import { createClient } from '@vercel/kv';
import { getBooks } from '@/books/actions';
import { get } from 'http';

interface FileUploaderAndReaderProps {
    editMode: boolean;
}


const JsonFileUploader: React.FC<FileUploaderAndReaderProps> = ({ editMode }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("here")
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const uploadJsonToKV = async (jsonObject: object) => {
        console.log('jsonObject', jsonObject)
        getBooks().then((books) => {
            console.log('books', books)

        });
    };

    const handleUpload = async () => {
        console.log("here", file)
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                if (e.target?.result) {
                    try {
                        const jsonObject = JSON.parse(e.target.result as string);
                        await uploadJsonToKV(jsonObject);
                    } catch (error) {
                        console.error('Error parsing JSON file:', error);
                        setUploadStatus('Error parsing JSON file');
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {editMode && <input type="file" onChange={handleFileChange} />}
            {editMode && <button onClick={handleUpload}>Process File</button>}
            {selectedFile && <p>File name: {selectedFile.name}</p>}
        </Suspense>
    );
};

export default JsonFileUploader;