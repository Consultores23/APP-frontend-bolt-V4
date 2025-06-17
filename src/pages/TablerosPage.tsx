import React from 'react';
import SidebarMenu from '../components/ui/SidebarMenu';
import Header from '../components/ui/Header';

const TablerosPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-dark-900">
      <SidebarMenu />

      <div className="flex-1 flex flex-col">
        <Header title="Tableros" />

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
              <p className="text-gray-300">
                ¡Bienvenido a la página de Tableros! Aquí podrás ver tus tableros de control.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TablerosPage;
