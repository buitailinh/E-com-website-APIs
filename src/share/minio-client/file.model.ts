export interface BufferedFile {
    filedname: string;
    originalname: string;
    encoding: string;
    mimetype: AppMimeType;
    size: number;
    buffer: Buffer | string;
}

export interface StoredFile extends HasFile, StoredFileMetadata {
}

export interface HasFile {
    file: Buffer | string;
}

export interface StoredFileMetadata {
    id: number;
    name: string;
    encoding: string;
    mimetype: AppMimeType;
    size: number;
    updatedAt: Date;
    fileSrc?: string;
}

export type AppMimeType =
    | 'image/png'
    | 'image/jpeg'
    | 'image/gif'
    | 'image/x-jpeg'
    | 'image/x-png'
    | 'image/jpg';
