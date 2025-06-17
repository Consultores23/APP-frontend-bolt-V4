import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/ui/SidebarMenu';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import ClientTable from '../components/clients/ClientTable';
import ClientForm from '../components/clients/ClientForm';
import Modal from '../components/ui/Modal';
import { supabase } from '../lib/supabase';
import { Client } from '../types/client';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const ClientesPage: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchClients = useCallback(async (page: number) => {
    setIsLoading(true);
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    try {
      const { data, error, count } = await supabase
        .from('clientes')
        .select('*', { count: 'exact' })
        .order('fecha_creacion', { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      setClients(data || []);
      setTotalClients(count || 0);
    } catch (err: any) {
      console.error('Error fetching clients:', err.message);
      toast.error('Error al cargar los clientes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage, fetchClients]);

  const totalPages = Math.ceil(totalClients / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateClient = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDeleteClient = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('clientes')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast.success('Cliente eliminado correctamente.');
        // Re-fetch clients, staying on the same page if possible
        fetchClients(currentPage);
      } catch (err: any) {
        console.error('Error deleting client:', err.message);
        toast.error('Error al eliminar el cliente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (formData: Omit<Client, 'id' | 'fecha_creacion'>) => {
    setIsSubmitting(true);
    try {
      if (editingClient) {
        // Update client
        const { error } = await supabase
          .from('clientes')
          .update(formData)
          .eq('id', editingClient.id);

        if (error) {
          throw error;
        }
        toast.success('Cliente actualizado correctamente.');
      } else {
        // Create new client
        const { error } = await supabase
          .from('clientes')
          .insert(formData);

        if (error) {
          throw error;
        }
        toast.success('Cliente creado correctamente.');
      }
      setIsModalOpen(false);
      setEditingClient(null);
      fetchClients(currentPage); // Re-fetch clients to update the table
    } catch (err: any) {
      console.error('Error saving client:', err.message);
      toast.error(`Error al guardar el cliente: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/clientes/${id}`);
  };

  return (
    <div className="flex h-screen bg-dark-900">
      <SidebarMenu />

      <div className="flex-1 flex flex-col">
        <Header title="Clientes" />

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end mb-6">
              <Button onClick={handleCreateClient}>
                <Plus size={18} className="mr-2" /> Crear Cliente
              </Button>
            </div>

            <ClientTable
              clients={clients}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
              onViewDetails={handleViewDetails}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClient ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
      >
        <ClientForm
          initialData={editingClient}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default ClientesPage;
