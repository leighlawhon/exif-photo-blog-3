import React, { useState } from 'react';

interface FileUploaderAndReaderProps {
    editMode: boolean;
}

// const splitTextIntoChunks = (text: string, maxWords: number = 500): string[] => {
//     const words = text.split(/\s+/); // Split text into words based on whitespace
//     const chunks: string[] = [];

//     for (let i = 0; i < words.length; i += maxWords) {
//         const chunk = words.slice(i, i + maxWords).join(' ');
//         chunks.push(chunk);
//     }

//     return chunks;
// };

const FileUploaderAndReader: React.FC<FileUploaderAndReaderProps> = ({ editMode }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

            // Read the file into memory
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target?.result || null);
                // split into chunks if the file is too large
                // if (typeof e.target?.result === 'string') {
                //     splitTextIntoChunks(e.target.result);
                // }
                // send to ChatGPT API
            };
            reader.readAsText(file); // For text files. Use readAsDataURL for images.
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Example POST request to upload the file
            fetch('YOUR_ENDPOINT_HERE', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div>
            {editMode && <input type="file" onChange={handleFileChange} />}
            {editMode && <button onClick={handleUpload}>Upload File</button>}
            {selectedFile && <p>File name: {selectedFile.name}</p>}
            {typeof fileContent === 'string' ? <pre>{fileContent}</pre> : null}
        </div>
    );
};

export default FileUploaderAndReader;