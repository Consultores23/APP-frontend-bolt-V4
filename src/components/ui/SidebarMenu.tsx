import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Home, LogOut, ChevronLeft, ChevronRight, Users, ListTodo, Bell, Calendar, LayoutDashboard, Gavel, UserCog } from 'lucide-react'; // Added UserCog icon
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast.success('Sesión cerrada correctamente');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <div className={`h-screen bg-dark-800 border-r border-dark-700 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 border-b border-dark-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className={`text-lg font-semibold text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            COnsultores
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <NavLink
          to="/inicio"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <Home size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Inicio
          </span>
        </NavLink>
        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <Users size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Clientes
          </span>
        </NavLink>
        <NavLink
          to="/responsables"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <UserCog size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Responsables
          </span>
        </NavLink>
        <NavLink
          to="/procesos"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <ListTodo size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Procesos
          </span>
        </NavLink>
        <NavLink
          to="/daily"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <Calendar size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Daily
          </span>
        </NavLink>
        <NavLink
          to="/notificaciones"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <Bell size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Notificaciones
          </span>
        </NavLink>
        <NavLink
          to="/calendario"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <Calendar size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Calendario
          </span>
        </NavLink>
        <NavLink
          to="/tableros"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <LayoutDashboard size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Tableros
          </span>
        </NavLink>
        <NavLink
          to="/buscador-legal"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          <Gavel size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Buscador Legal
          </span>
        </NavLink>
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -right-3 w-6 h-6 bg-dark-700 border border-dark-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="p-4 border-t border-dark-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-400 hover:bg-dark-700 hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Cerrar sesión
          </span>
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
