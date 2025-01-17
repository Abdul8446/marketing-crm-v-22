import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ConnectedAccount {
  id: string
  platform: string
  accountName: string
  profileImage?: string
  accessToken: string
}

interface ConnectedAccountsState {
  accounts: ConnectedAccount[]
  addAccount: (account: ConnectedAccount) => void
  removeAccount: (platformId: string) => void
  getAccount: (platformId: string) => ConnectedAccount | undefined
}

export const useConnectedAccounts = create<ConnectedAccountsState>()(
  persist(
    (set, get) => ({
      accounts: [],
      addAccount: (account) => {
        set((state) => ({
          accounts: [
            ...state.accounts.filter((a) => a.platform !== account.platform),
            account,
          ],
        }))
      },
      removeAccount: (platformId) => {
        set((state) => ({
          accounts: state.accounts.filter((a) => a.platform !== platformId),
        }))
      },
      getAccount: (platformId) => {
        return get().accounts.find((a) => a.platform === platformId)
      },
    }),
    {
      name: 'connected-accounts',
    }
  )
)

