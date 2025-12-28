"use client";

import { useState } from "react";
import { Users, UserPlus, Shield, Activity, MessageSquare, Trash2, Mail, Phone, Calendar, CheckCircle, HelpCircle } from "lucide-react";
import * as Tooltip from '@radix-ui/react-tooltip';

type Role = 'admin' | 'manager' | 'staff';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
  joinedDate: Date;
  lastActive: Date;
  status: 'active' | 'away' | 'offline';
}

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning';
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<'members' | 'activity' | 'permissions'>('members');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@candlecraft.com',
      phone: '+1 (555) 001-0001',
      role: 'admin',
      joinedDate: new Date(2024, 0, 1),
      lastActive: new Date(),
      status: 'active'
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      email: 'emily@candlecraft.com',
      phone: '+1 (555) 002-0002',
      role: 'manager',
      joinedDate: new Date(2024, 2, 15),
      lastActive: new Date(Date.now() - 3600000),
      status: 'active'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@candlecraft.com',
      phone: '+1 (555) 003-0003',
      role: 'staff',
      joinedDate: new Date(2024, 5, 1),
      lastActive: new Date(Date.now() - 86400000),
      status: 'offline'
    }
  ];

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      user: 'Emily Rodriguez',
      action: 'Created production batch #PB-147',
      timestamp: new Date(Date.now() - 1800000),
      type: 'success'
    },
    {
      id: '2',
      user: 'Michael Chen',
      action: 'Updated inventory for Lavender Essential Oil',
      timestamp: new Date(Date.now() - 3600000),
      type: 'info'
    },
    {
      id: '3',
      user: 'John Smith',
      action: 'Approved quality control check for Batch #147',
      timestamp: new Date(Date.now() - 7200000),
      type: 'success'
    },
    {
      id: '4',
      user: 'Emily Rodriguez',
      action: 'Low stock alert triggered for Soy Wax',
      timestamp: new Date(Date.now() - 10800000),
      type: 'warning'
    }
  ];

  const permissions = {
    admin: [
      'Full system access',
      'User management',
      'Financial data access',
      'Settings configuration',
      'Delete operations',
      'Export data'
    ],
    manager: [
      'Production management',
      'Inventory management',
      'Order processing',
      'Customer management',
      'View reports',
      'Quality control'
    ],
    staff: [
      'View inventory',
      'Create production batches',
      'Update order status',
      'View customer info',
      'Add notes'
    ]
  };

  const getRoleBadgeColor = (role: Role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-700 border-purple-200',
      manager: 'bg-blue-100 text-blue-700 border-blue-200',
      staff: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[role];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-400';
  };

  const getActivityTypeColor = (type: string) => {
    const colors = {
      success: 'bg-green-100 text-green-700 border-green-200',
      info: 'bg-blue-100 text-blue-700 border-blue-200',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return colors[type as keyof typeof colors];
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              Team Collaboration
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <HelpCircle className="w-6 h-6 text-purple-500 hover:text-purple-600 cursor-help" />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content 
                    side="right" 
                    className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                    sideOffset={5}
                  >
                    Manage team members, assign roles, and track activity. Invite collaborators, set permissions, and monitor team performance across your candle business.
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </h1>
            <p className="text-gray-600 mt-2">Manage team members, roles, and activity</p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg font-medium"
          >
            <UserPlus className="w-5 h-5" />
            Invite Team Member
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{teamMembers.length}</p>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Now</p>
                <p className="text-3xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
              </div>
              <Activity className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Admins</p>
                <p className="text-3xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.role === 'admin').length}
                </p>
              </div>
              <Shield className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Recent Activities</p>
                <p className="text-3xl font-bold text-gray-900">{activityLogs.length}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 px-6 py-4 font-medium text-sm transition ${
              activeTab === 'members'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4 inline-block mr-2" />
            Team Members
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 px-6 py-4 font-medium text-sm transition ${
              activeTab === 'activity'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Activity className="w-4 h-4 inline-block mr-2" />
            Activity Log
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex-1 px-6 py-4 font-medium text-sm transition ${
              activeTab === 'permissions'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Shield className="w-4 h-4 inline-block mr-2" />
            Permissions
          </button>
        </div>

        {/* Team Members Tab */}
        {activeTab === 'members' && (
          <div className="p-6">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(member.role)}`}>
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {member.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Joined {member.joinedDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition text-sm font-medium">
                        Edit Role
                      </button>
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Last active: {member.lastActive.toLocaleString()}
                    </span>
                    <button className="text-purple-600 hover:text-purple-700 font-medium">
                      View Activity →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Log Tab */}
        {activeTab === 'activity' && (
          <div className="p-6">
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition">
                  <div className="flex items-start gap-4">
                    <div className={`px-3 py-1 text-xs font-medium rounded-full border ${getActivityTypeColor(log.type)}`}>
                      {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{log.action}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span>{log.user}</span>
                        <span>•</span>
                        <span>{log.timestamp.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(permissions).map(([role, perms]) => (
                <div key={role} className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">{role}</h3>
                  </div>
                  <ul className="space-y-2">
                    {perms.map((perm, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {perm}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowInviteModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Invite Team Member</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="colleague@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none">
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Message (Optional)</label>
                <textarea
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  rows={3}
                  placeholder="Join our team!"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Tooltip.Provider>
  );
}
