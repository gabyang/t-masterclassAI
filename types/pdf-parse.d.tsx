declare module "pdf-parse" {
  export interface PDFInfo {
    numPages: number;
    pdfVersion: string;
  }

  export interface PDFMetadata {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
    producer?: string;
    creator?: string;
    creationDate?: string;
    modDate?: string;
  }

  export interface PDFText {
    text: string;
  }

  export interface PDFData {
    numpages: number;
    numrender: number;
    info: PDFInfo;
    metadata?: PDFMetadata;
    version: string;
    text: string;
  }

  export default function pdfParse(
    buffer: Buffer | Uint8Array,
    options?: Record<string, unknown>
  ): Promise<PDFData>;
}
