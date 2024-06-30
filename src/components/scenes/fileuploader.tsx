import React, { useState, useEffect, Suspense } from 'react';
import { createClient } from '@vercel/kv';
import { KV_REST_API_TOKEN, KV_REST_API_URL } from '@/site/config';

// const users = createClient({
//     url: process.env.USERS_REST_API_URL,
//     token: process.env.USERS_REST_API_TOKEN,
// });

// const kvRestApiUrl = process.env.KV_REST_API_URL || ''; // Set a default value if the environment variable is undefined
// fetch(`${kvRestApiUrl}`, {
//     headers: {
//         Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
//     },
// })
//     .then((response) => response)
//     .then((data) => console.log(data));

// const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
console.log(KV_REST_API_URL)

fetch(`${KV_REST_API_URL}?_token=${KV_REST_API_TOKEN}`)
    .then((response) => response.json())
    .then((data) => console.log(data));

interface FileUploaderAndReaderProps {
    editMode: boolean;
}

const splitTextIntoChunks = (text: string, maxWords: number = 500): string[] => {
    const words = text.split(/\s+/); // Split text into words based on whitespace
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += maxWords) {
        const chunk = words.slice(i, i + maxWords).join(' ');
        chunks.push(chunk);
    }

    return chunks;
};

const FileUploaderAndReader: React.FC<FileUploaderAndReaderProps> = ({ editMode }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
    const [storyChunks, setStoryChunks] = useState<string[]>([]);

    useEffect(() => {
    // Example of a fetch call inside useEffect, replace URL and headers as needed
    // const fetchData = async () => {
    //     try {
    //         const response = await fetch("https://evolved-walleye-37162.upstash.io/set/user_1_session/session_token_value", {
    //             headers: {
    //                 Authorization: "Bearer ********"
    //             }
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

        // fetchData();
    }, []); // Empty dependency array means this runs once on component mount

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = async (e) => {
                if (typeof e.target?.result === 'string') {
                    const chunks = splitTextIntoChunks(e.target.result);
                    setStoryChunks(chunks);
                    // Assuming you want to process chunks here or in another effect
                }
            };
            reader.readAsText(file);
        }
    };

    const handleUpload = async () => {
        setFileContent(storyChunks.join('\n\n________________________\n\n'));

    // if (selectedFile) {
    //     const formData = new FormData();
    //     formData.append('file', selectedFile);

        //     try {
        //         const response = await fetch('YOUR_ENDPOINT_HERE', {
        //             method: 'POST',
        //             body: formData,
        //         });
        //         const data = await response.text();
        //         console.log('Success:', data);
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }
    };


    return (
        <Suspense fallback={<div>Loading...</div>}>
            {editMode && <input type="file" onChange={handleFileChange} />}
            {editMode && <button onClick={handleUpload}>Process File</button>}
            {selectedFile && <p>File name: {selectedFile.name}</p>}
            {typeof fileContent === 'string' ? <pre>{fileContent}</pre> : null}
        </Suspense>
    );
};

export default FileUploaderAndReader;