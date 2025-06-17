import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, History } from 'lucide-react'; // Import History icon

interface MenuItem {
  name: string;
  path: string;
}

interface ProcessDetailHorizontalMenuProps {
  processId: string;
}

const ProcessDetailHorizontalMenu: React.FC<ProcessDetailHorizontalMenuProps> = ({ processId }) => {
  const baseUrl = `/procesos/${processId}`;
  
  const mainMenuItems: MenuItem[] = [
    { name: 'Detalle Proceso', path: `${baseUrl}/detalle` },
    { name: 'Actuaciones', path: `${baseUrl}/actuaciones` },
    { name: 'Consulta Proceso', path: `${baseUrl}/consulta` },
  ];

  const toolsMenuItems: MenuItem[] = [
    { name: 'Archivos', path: `/procesos/${processId}/archivos` }, // Updated path to be top-level
    { name: 'Calendario', path: `${baseUrl}/calendario` },
    { name: 'Tableros', path: `${baseUrl}/tableros` },
    { name: 'Linea Jurisprudencial', path: `${baseUrl}/linea-jurisprudencial` },
    { name: 'Conversaciones', path: `${baseUrl}/conversaciones` },
    { name: 'Metricas', path: `${baseUrl}/metricas` },
  ];

  return (
    <nav className="w-full bg-dark-800 border border-dark-700 rounded-xl p-2 flex flex-wrap gap-2">
      {mainMenuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-300 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}

      <Menu as="div" className="relative">
        <Menu.Button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-dark-700 hover:text-white transition-colors flex items-center">
          Herramientas
          <ChevronDown className="ml-2 h-4 w-4" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-dark-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1">
              {toolsMenuItems.map((item) => (
                <Menu.Item key={item.path}>
                  {({ active }) => (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm rounded-lg ${
                          isActive || active
                            ? 'bg-secondary-500 text-white'
                            : 'text-gray-300 hover:bg-dark-600'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <NavLink
        to={`${baseUrl}/configuracion`}
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? 'bg-secondary-500 text-white'
              : 'text-gray-300 hover:bg-dark-700 hover:text-white'
          }`
        }
      >
        Configuración
      </NavLink>
      
      <NavLink
        to={`${baseUrl}/historial`}
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
            isActive
              ? 'bg-secondary-500 text-white'
              : 'text-gray-300 hover:bg-dark-700 hover:text-white'
          }`
        }
      >
        <History size={16} className="mr-1" /> Historial
      </NavLink>
    </nav>
  );
};

export default ProcessDetailHorizontalMenu;
