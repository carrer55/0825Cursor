import React from 'react';
import { MoreHorizontal, Bell } from 'lucide-react';

import { useApplications } from '../hooks/useApplications';

interface RecentApplicationsProps {
  onShowDetail: (type: 'business-trip' | 'expense', id: string) => void;
  onNavigate: (view: string) => void;
  onShowNotifications: () => void;
}

function RecentApplications({ onShowDetail, onNavigate, onShowNotifications }: RecentApplicationsProps) {
  const { applications, loading } = useApplications();
  
  // 最新の3件を取得
  const recentApps = applications.slice(0, 3).map(app => ({
    id: app.id,
    date: new Date(app.created_at).toLocaleDateString('ja-JP'),
    type: app.type === 'business_trip' ? '出張申請' : '経費申請',
    applicant: app.user_profiles?.full_name || 'デモユーザー',
    amount: `¥${app.total_amount.toLocaleString()}`,
    status: app.status === 'approved' ? '承認済み' : 
            app.status === 'pending' ? '待機中' : 
            app.status === 'rejected' ? '否認' : 
            app.status === 'returned' ? '差戻し' : '下書き',
    statusColor: app.status === 'approved' ? 'text-emerald-700 bg-emerald-100' :
                 app.status === 'pending' ? 'text-amber-700 bg-amber-100' :
                 app.status === 'rejected' ? 'text-red-700 bg-red-100' :
                 app.status === 'returned' ? 'text-orange-700 bg-orange-100' :
                 'text-slate-700 bg-slate-100',
    originalType: app.type
  }));

  if (loading) {
    return (
      <div className="backdrop-blur-xl bg-white/20 rounded-xl p-4 lg:p-6 border border-white/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
          <span className="ml-3 text-slate-600">読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/20 rounded-xl p-4 lg:p-6 border border-white/30 shadow-xl relative overflow-hidden">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-white/20 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/10"></div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg lg:text-xl font-semibold text-slate-800 relative z-10">最近の申請</h2>
        <div className="flex items-center space-x-2 relative z-10">
          <button 
            onClick={onShowNotifications}
            className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-colors"
            title="通知センター"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onNavigate('application-status')}
            className="text-slate-400 hover:text-slate-600"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2 lg:gap-4 text-xs font-medium text-slate-600 pb-2 border-b border-white/30 min-w-max">
              <span>日付</span>
              <span>種別</span>
              <span>申請者</span>
              <span>金額</span>
              <span>ステータス</span>
            </div>
            {recentApps.map((app, index) => (
              <div 
                key={index} 
                className="grid grid-cols-5 gap-2 lg:gap-4 items-center py-3 hover:bg-white/20 rounded-lg px-2 transition-colors min-w-max cursor-pointer"
                onClick={() => onShowDetail(app.originalType, app.id)}
              >
                <span className="text-slate-700 text-sm">{app.date}</span>
                <span className="text-slate-700 text-sm">{app.type}</span>
                <span className="text-slate-700 text-sm">{app.applicant}</span>
                <span className="text-slate-900 font-medium text-sm">{app.amount}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentApplications;