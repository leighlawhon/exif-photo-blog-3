
import React, { useState, useEffect, Suspense } from 'react';
import { createClient } from '@vercel/kv';
import { POST_BOOK } from '@/books';

interface FileUploaderAndReaderProps {
    editMode: boolean;
}

const postBookToKV = async (book: any) => {
    try {
        await POST_BOOK(book);
        alert('Book uploaded successfully!');
    } catch (error) {
        console.error('Error uploading book:', error);
        alert('Failed to upload book.');
    }
};

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
        console.timeLog('jsonObject', jsonObject)
        postBookToKV(jsonObject)
        // const kv = createClient({
        //     url: process.env.REACT_APP_KV_REST_API_URL as string,
        //     token: process.env.REACT_APP_KV_REST_API_TOKEN as string,
        // });

        // try {
        //     await kv.set('jsonFileKey', jsonObject);
        //     setUploadStatus('Upload successful');
        // } catch (error) {
        //     console.error('Error uploading JSON to KV:', error);
        //     setUploadStatus('Upload failed');
        // }
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