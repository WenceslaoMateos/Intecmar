'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProgramasPage() {
  // Datos precargados según el documento de la Red Intecmar
  const [programas, setProgramas] = useState([
    {
      id: 1,
      name: "Gestión del Talento",
      desc: "Formación de Formadores, Taller para Promotores, Curso de Posgrado, etc.",
      destinatarios: "Docentes, Facilitadores, Estudiantes avanzados",
      estado: "ACTIVO",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: "fa-graduation-cap",
      actividades: 5
    },
    {
      id: 2,
      name: "Programa de Mentorías",
      desc: "Sesiones de mentoría individual y grupal para potenciar proyectos.",
      destinatarios: "Emprendedores, Mentores-Empresarios",
      estado: "ACTIVO",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: "fa-comments",
      actividades: 2
    },
    {
      id: 3,
      name: "Desarrollo de Capital Emprendedor",
      desc: "Foro de Capital Emprendedor, Ronda de Vinculación, Demo Day.",
      destinatarios: "Todos los roles",
      estado: "PLANIFICADO",
      color: "bg-blue-100 text-brand-teal border-blue-200",
      icon: "fa-seedling",
      actividades: 4
    }
  ]);

  return (
    <div className="fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-gray-600 max-w-2xl">
          Administra los programas macro de la Red. Un Programa agrupa actividades relacionadas y define el marco institucional y los destinatarios principales.
        </p>
        <Link 
            href="/admin/programas/nuevo"
            className="bg-brand-magenta text-white px-5 py-2.5 rounded-lg hover:bg-purple-800 transition shadow-md flex items-center gap-2 font-bold text-sm shrink-0"
        >
          <i className="fas fa-plus"></i> Nuevo Programa
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programas.map(prog => (
          <div key={prog.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col h-full hover:shadow-md transition duration-300 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-brand-magenta group-hover:bg-purple-50 transition">
                <i className={`fas ${prog.icon} text-2xl`}></i>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border font-medium ${prog.color}`}>
                {prog.estado}
              </span>
            </div>
            
            <h3 className="font-bold text-gray-800 text-xl mb-2 leading-tight group-hover:text-brand-teal transition">{prog.name}</h3>
            <p className="text-sm text-gray-500 mb-4 flex-grow">{prog.desc}</p>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Destinatarios</p>
              <p className="text-sm text-gray-700">{prog.destinatarios}</p>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
              <span className="text-gray-500"><i className="fas fa-layer-group mr-1.5 text-gray-400"></i> {prog.actividades} actividades</span>
              <span className="text-brand-teal font-bold hover:underline">Gestionar <i className="fas fa-chevron-right text-xs ml-1"></i></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}