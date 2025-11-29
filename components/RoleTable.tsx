import React from 'react';
import { RoleDefinition } from '../types';

interface RoleTableProps {
  roles: RoleDefinition[];
}

const RoleTable: React.FC<RoleTableProps> = ({ roles }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 bg-white">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Pattern Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Mapped Class/Interface
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {roles.map((role, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-700">
                {role.name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 font-mono bg-slate-50 w-1/4">
                {role.mappedClass}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {role.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;