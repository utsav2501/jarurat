const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('document', file);

        axios.post('/upload/', formData)
            .then((response) => {
                console.log('File uploaded successfully', response.data);
            })
            .catch((error) => {
                console.error('File upload error', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
};
