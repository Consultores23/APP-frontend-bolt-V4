export interface Process {
  id: string;
  client_id: string;
  nombre: string;
  radicado: string;
  estado: 'Activo' | 'Inactivo';
  fecha_creacion: string;
  bucket_path?: string; // Added new property
}
