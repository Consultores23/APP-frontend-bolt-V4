import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/auth/LoginPage';
import HomePage from './pages/HomePage';
import ClientesPage from './pages/ClientesPage';
import ProcesosPage from './pages/ProcesosPage';
import DailyPage from './pages/DailyPage';
import NotificacionesPage from './pages/NotificacionesPage';
import CalendarioPage from './pages/CalendarioPage';
import TablerosPage from './pages/TablerosPage';
import BuscadorLegalPage from './pages/BuscadorLegalPage';
import ClientDetailPage from './pages/ClientDetailPage';
import ClientProcessesPage from './pages/ClientProcessesPage';
import ProcessDetailPage from './pages/ProcessDetailPage';
import CodigosPage from './pages/CodigosPage';
import DecretosPage from './pages/DecretosPage';
import LeyesPage from './pages/LeyesPage';
import ResponsablesPage from './pages/ResponsablesPage'; // Import ResponsablesPage

// Process Detail Pages
import ProcessDetailOverviewPage from './pages/process_details/ProcessDetailOverviewPage';
import ActuacionesPage from './pages/process_details/ActuacionesPage';
import ConsultaProcesoPage from './pages/process_details/ConsultaProcesoPage';
import ArchivosPage from './pages/process_details/ArchivosPage';
import CalendarioProcesoPage from './pages/process_details/CalendarioProcesoPage';
import TablerosProcesoPage from './pages/process_details/TablerosProcesoPage'; // Refactored
import LineaJurisprudencialPage from './pages/process_details/LineaJurisprudencialPage';
import ConversacionesPage from './pages/process_details/ConversacionesPage';
import MetricasPage from './pages/process_details/MetricasPage';
import ConfiguracionProcesoPage from './pages/process_details/ConfiguracionProcesoPage';
import HistorialPage from './pages/process_details/HistorialPage'; // Import HistorialPage

// New Tablero Sub-pages
import MetricasTableroPage from './pages/process_details/tableros/MetricasTableroPage';
import ActividadesTableroPage from './pages/process_details/tableros/ActividadesTableroPage';
import AudienciasTableroPage from './pages/process_details/tableros/AudienciasTableroPage';
import TerminosTableroPage from './pages/process_details/tableros/TerminosTableroPage';
import ReunionesTableroPage from './pages/process_details/tableros/ReunionesTableroPage';


import { supabase } from './lib/supabase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/inicio" /> : <LoginPage />}
        />
        <Route
          path="/inicio"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/clientes"
          element={isAuthenticated ? <ClientesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/responsables" // New route for ResponsablesPage
          element={isAuthenticated ? <ResponsablesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/clientes/:id"
          element={isAuthenticated ? <ClientDetailPage /> : <Navigate to="/" />}
        />
        <Route
          path="/clientes/:id/procesos"
          element={isAuthenticated ? <ClientProcessesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/procesos"
          element={isAuthenticated ? <ProcesosPage /> : <Navigate to="/" />}
        />
        {/* Moved ArchivosPage to a top-level route */}
        <Route
          path="/procesos/:id/archivos"
          element={isAuthenticated ? <ArchivosPage /> : <Navigate to="/" />}
        />
        {/* New top-level route for TablerosProcesoPage and its sub-pages */}
        <Route
          path="/procesos/:id/tableros"
          element={isAuthenticated ? <TablerosProcesoPage /> : <Navigate to="/" />}
        >
          <Route index element={<Navigate to="metricas" replace />} />
          <Route path="metricas" element={<MetricasTableroPage />} />
          <Route path="actividades" element={<ActividadesTableroPage />} />
          <Route path="audiencias" element={<AudienciasTableroPage />} />
          <Route path="terminos" element={<TerminosTableroPage />} />
          <Route path="reuniones" element={<ReunionesTableroPage />} />
        </Route>
        <Route
          path="/procesos/:id/*"
          element={isAuthenticated ? <ProcessDetailPage /> : <Navigate to="/" />}
        >
          <Route index element={<Navigate to="detalle" replace />} />
          <Route path="detalle" element={<ProcessDetailOverviewPage />} />
          <Route path="actuaciones" element={<ActuacionesPage />} />
          <Route path="consulta" element={<ConsultaProcesoPage />} />
          {/* Removed the nested archivos route */}
          <Route path="calendario" element={<CalendarioProcesoPage />} />
          {/* Tableros route is now top-level, so remove it from here */}
          <Route path="linea-jurisprudencial" element={<LineaJurisprudencialPage />} />
          <Route path="conversaciones" element={<ConversacionesPage />} />
          <Route path="metricas" element={<MetricasPage />} />
          <Route path="configuracion" element={<ConfiguracionProcesoPage />} />
          <Route path="historial" element={<HistorialPage />} /> {/* New HistorialPage route */}
        </Route>
        <Route
          path="/daily"
          element={isAuthenticated ? <DailyPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notificaciones"
          element={isAuthenticated ? <NotificacionesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/calendario"
          element={isAuthenticated ? <CalendarioPage /> : <Navigate to="/" />}
        />
        <Route
          path="/tableros"
          element={isAuthenticated ? <TablerosPage /> : <Navigate to="/" />}
        />
        <Route
          path="/buscador-legal"
          element={isAuthenticated ? <BuscadorLegalPage /> : <Navigate to="/" />}
        >
          <Route index element={<Navigate to="codigos" replace />} />
          <Route path="codigos" element={<CodigosPage />} />
          <Route path="decretos" element={<DecretosPage />} />
          <Route path="leyes" element={<LeyesPage />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-dark-800 text-white border border-dark-700',
          style: {
            background: '#111111',
            color: '#fff',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
