import React from "react";
import "../css/dropzone.css";

type DropzoneProps = {
    onFileSelected?: (file: File) => void;
    accept?: string;
    maxFile?: number;
};

type FilePreview = {
    fileName: string;
    imageData: string;
};

type DropzoneState = {
    files: FilePreview[];
};

class Dropzone extends React.Component<DropzoneProps, DropzoneState> {
    fileInputRef: React.RefObject<HTMLInputElement | null>;

    constructor(props: DropzoneProps) {
        super(props);
        this.state = {
            files: [],
        };
        this.fileInputRef = React.createRef();
    }

    get maxFile(): number {
        return this.props.maxFile ?? 1;
    }

    handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            this.addFile(file);
        }
    };

    handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            this.addFile(file);
        }
    };

    handleClick = () => {
        this.fileInputRef.current?.click();
    };

    addFile = (file: File) => {
        if (this.state.files.length >= this.maxFile) {
            this.clearFiles();
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
    
            const newFile: FilePreview = {
                fileName: file.name,
                imageData: base64,
            };
    
            this.setState((prevState) => ({
                files: [...prevState.files, newFile],
            }));
    
            this.props.onFileSelected?.(file);
        };
    
        reader.readAsDataURL(file); // <-- converte in base64
    };
    

    clearFiles = () => {
        this.setState({ files: [] });
    }
    renderPreviews = () => {
        const { files } = this.state;

        if (files.length === 0) {
            return <span>Trascina qui un'immagine o clicca per selezionarla</span>;
        }

        return (
            <div className="grid-container">
                {files.map((file, index) => (
                    <div key={index} className="grid-item-100">
                        <div className="card" style={{ margin: "16px auto" }}>
                            <div className="card-header">
                                <span>{file.fileName}</span>
                            </div>
                            <div className="card-body">
                                <img
                                    src={file.imageData}
                                    alt={`Anteprima ${file.fileName}`}
                                    style={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    render(): React.ReactNode {
        return (
            <div
                className="dropzone"
                onDrop={this.handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={this.handleClick}
            >
                {this.renderPreviews()}

                <input
                    type="file"
                    accept={this.props.accept ?? "*"}
                    style={{ display: "none" }}
                    ref={this.fileInputRef}
                    onChange={this.handleFileChange}
                />
            </div>
        );
    }
}

export default Dropzone;
