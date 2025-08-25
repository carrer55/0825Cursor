import { useState, useEffect } from 'react'
import { supabase, approveApplication, syncToAccounting, generateDocument } from '../lib/supabase'
import { useAuth } from './useAuth'

interface Application {
  id: string
  user_id: string
  organization_id: string | null
  type: 'business_trip' | 'expense'
  title: string
  description: string | null
  data: any
  total_amount: number
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'returned'
  submitted_at: string | null
  approved_at: string | null
  approved_by: string | null
  rejection_reason: string | null
  created_at: string
  updated_at: string
  
  // リレーション
  user_profiles?: {
    full_name: string
    department: string
    position: string
  }
  organizations?: {
    name: string
  }
  expense_items?: Array<{
    id: string
    category_id: string | null
    date: string
    amount: number
    description: string | null
    receipt_url: string | null
  }>
  business_trip_details?: Array<{
    id: string
    start_date: string
    end_date: string
    purpose: string
    estimated_daily_allowance: number
    estimated_transportation: number
    estimated_accommodation: number
  }>
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, profile } = useAuth()

  useEffect(() => {
    if (user && profile) {
      fetchApplications()
    }
  }, [user, profile])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)

      // デモモードの場合はサンプルデータを返す
      if (localStorage.getItem('demoMode') === 'true') {
        const sampleApplications: Application[] = [
          {
            id: 'BT-2024-001',
            user_id: 'demo-user-id',
            organization_id: 'demo-org-id',
            type: 'business_trip',
            title: '東京出張申請',
            description: 'クライアント訪問および新規開拓営業',
            data: {},
            total_amount: 52500,
            status: 'approved',
            submitted_at: '2024-07-20T09:30:00Z',
            approved_at: '2024-07-21T16:00:00Z',
            approved_by: 'demo-approver-id',
            rejection_reason: null,
            created_at: '2024-07-20T09:00:00Z',
            updated_at: '2024-07-21T16:00:00Z',
            user_profiles: {
              full_name: 'デモユーザー',
              department: '営業部',
              position: '代表取締役'
            },
            organizations: {
              name: '株式会社デモ'
            },
            business_trip_details: [{
              id: 'bt-detail-1',
              start_date: '2024-07-25',
              end_date: '2024-07-27',
              purpose: 'クライアント訪問および新規開拓営業',
              estimated_daily_allowance: 15000,
              estimated_transportation: 22500,
              estimated_accommodation: 15000
            }]
          },
          {
            id: 'EX-2024-001',
            user_id: 'demo-user-id',
            organization_id: 'demo-org-id',
            type: 'expense',
            title: '交通費・宿泊費精算',
            description: '7月度の経費精算',
            data: {},
            total_amount: 12800,
            status: 'pending',
            submitted_at: '2024-07-18T11:30:00Z',
            approved_at: null,
            approved_by: null,
            rejection_reason: null,
            created_at: '2024-07-18T11:00:00Z',
            updated_at: '2024-07-18T11:30:00Z',
            user_profiles: {
              full_name: 'デモユーザー',
              department: '総務部',
              position: '代表取締役'
            },
            organizations: {
              name: '株式会社デモ'
            },
            expense_items: [
              {
                id: 'exp-item-1',
                category_id: null,
                date: '2024-07-15',
                amount: 5800,
                description: '新幹線代（往復）',
                receipt_url: null
              },
              {
                id: 'exp-item-2',
                category_id: null,
                date: '2024-07-15',
                amount: 7000,
                description: 'ホテル宿泊費',
                receipt_url: null
              }
            ]
          }
        ];
        
        setApplications(sampleApplications)
        setLoading(false)
        return
      }

      // 実際のデータベースクエリ
      const { data, error: fetchError } = await supabase
        .from('applications') 
        .select(`
          *,
          user_profiles!applications_user_id_fkey(full_name, department, position),
          organizations(name),
          expense_items(*),
          business_trip_details(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setApplications(data || [])
    } catch (err) {
      console.error('Applications fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  const createApplication = async (
    type: 'business_trip' | 'expense',
    title: string,
    data: any
  ) => {
    try {
      if (!user || !profile?.default_organization_id) {
        throw new Error('User not authenticated or no organization')
      }

      const { data: newApp, error: createError } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          organization_id: profile.default_organization_id,
          type,
          title,
          description: data.description || null,
          data,
          status: 'draft'
        })
        .select()
        .single()

      if (createError) {
        throw createError
      }

      // 出張申請の場合、詳細データを作成
      if (type === 'business_trip' && data.tripDetails) {
        const { error: tripError } = await supabase
          .from('business_trip_details')
          .insert({
            application_id: newApp.id,
            start_date: data.tripDetails.startDate,
            end_date: data.tripDetails.endDate,
            purpose: data.tripDetails.purpose,
            participants: data.tripDetails.participants,
            estimated_daily_allowance: data.tripDetails.estimatedDailyAllowance || 0,
            estimated_transportation: data.tripDetails.estimatedTransportation || 0,
            estimated_accommodation: data.tripDetails.estimatedAccommodation || 0
          })

        if (tripError) {
          console.error('Trip details creation error:', tripError)
        }
      }

      // 経費申請の場合、経費項目を作成
      if (type === 'expense' && data.expenseItems) {
        const expenseItems = data.expenseItems.map((item: any) => ({
          application_id: newApp.id,
          date: item.date,
          amount: item.amount,
          description: item.description,
          category_id: item.categoryId || null
        }))

        const { error: expenseError } = await supabase
          .from('expense_items')
          .insert(expenseItems)

        if (expenseError) {
          console.error('Expense items creation error:', expenseError)
        }
      }

      await fetchApplications()
      return { success: true, application: newApp }
    } catch (err) {
      console.error('Application creation error:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to create application' 
      }
    }
  }

  const updateApplication = async (id: string, updates: Partial<Application>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      await fetchApplications()
      return { success: true, application: data }
    } catch (err) {
      console.error('Application update error:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update application' 
      }
    }
  }

  const submitApplication = async (id: string) => {
    try {
      const { data, error: submitError } = await supabase
        .from('applications')
        .update({ 
          status: 'pending', 
          submitted_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single()

      if (submitError) {
        throw submitError
      }

      await fetchApplications()
      return { success: true, application: data }
    } catch (err) {
      console.error('Application submission error:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to submit application' 
      }
    }
  }

  const deleteApplication = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)

      if (deleteError) {
        throw deleteError
      }

      await fetchApplications()
      return { success: true }
    } catch (err) {
      console.error('Application deletion error:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to delete application' 
      }
    }
  }

  const handleApproval = async (
    applicationId: string,
    action: 'approved' | 'rejected' | 'returned',
    comment?: string
  ) => {
    try {
      const result = await approveApplication(applicationId, action, comment)
      
      // 承認後に会計システムと同期（承認の場合のみ）
      if (action === 'approved') {
        try {
          await syncToAccounting(applicationId)
        } catch (syncError) {
          console.warn('Accounting sync failed:', syncError)
          // 会計同期の失敗は承認処理を止めない
        }
      }

      await fetchApplications()
      return { success: true, result }
    } catch (err) {
      console.error('Approval error:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to process approval' 
      }
    }
  }

  return {
    applications,
    loading,
    error,
    createApplication,
    updateApplication,
    submitApplication,
    deleteApplication,
    handleApproval,
    refreshApplications: fetchApplications
  }
}