type Address = {
  format: string
  postcode: string
  buildingName: string
  street: string
  town: string
}

type Search = {
  name: string
  dob: string
  contextKey: string
  searchDate: string
  purpose: { code: string }
  address: Address
  organisationName: string
}

type SearchType = 'hard' | 'soft'

type Balance = { amount: number; currency: string }

type CAccount = {
  count: number
  currentBalance: Balance
  debtType: string
}

type CurrentAccount = {
  name: string
  lastUpdated: string
  supplierImage: string
  contextKey: string
  supplierFriendlyName: string
  currentBalance: Balance
  paymentYears: number[]
  yearStartBalance: Balance
  supplierName: string
  address: Address
  accountNumber: string
  available?: Balance
  openBalance: Balance
  frequency: { code: string }
  paymentHistory: {
    [_: string]: {
      accountStatusCode: { code: string }
      balance: Balance
      monthInt: number
      isLatePayment: boolean
      payment: Balance
      isNoSpend?: boolean
      statementBalance?: Balance
      limit?: Balance
      spending?: Balance
      isMissedPayment: boolean
    }[]
  }[]
  origAccountCategory: string
  accountOpened: string
}

type UserReport = {
  report_data: string
  updated_date: number
  score: number
  report: {
    searches: {
      hard: Search[]
      soft: Search[]
    }
    personal: {
      employers: []
      telephones: []
      fraudWarnings: []
      personalInfo: {
        name: string
        dob: string
        idDocuments: []
        addresses: [
          {
            address: Address
            contextKey: string
            current: boolean
            supplied: boolean
          }
        ]
      }
      publicInfo: { courtAndInsolvencies: any[] }
      electoralRoll: any[]
      connections: { financialConnections: any[]; otherNames: any[] }
    }
    overview: {
      name: string
      factorsToImprove: { key: string }[]
      history: {
        minScoreEver: number
        maxScoreEver: number
        years: number[]
        history: {
          [_: string]: {
            score: number
            direction: number
            changes: {
              name: string
              code: string
              details: {
                accountNo?: string
                accountType?: string
                searchDate?: string
                companyType?: string
                clientName?: string
                searchType?: SearchType
              }
            }[]
            monthInt: number
            scoreBand: number
          }[]
        }[]
      }
      dob: string
      score: {
        averageAreaScore: number
        averageMarketScore: number
        score: number
        scoreNormalized: number
        averageAreaScoreBand: number
        averageMarketScoreBand: number
        scoreBand: number
        scoreProvider: string
        scoreMinValue: number
        scoreMaxValue: number
      }
      currentAddress: Address
      clientRef: string
      daysUntilNextReport: number
      factorsDoingWell: { key: string }[]
      reportDate: string
      accounts: {
        currentAccounts: CAccount
        creditCards: CAccount
        telecoms: CAccount
        utilities: CAccount
        [_: string]: CAccount
      }
      upcoming: { monthInt: number; changes: any[] }
    }
    notices: any[]
    accounts: {
      currentAccounts: CurrentAccount[]
      creditCards: CurrentAccount[]
      telecoms: CurrentAccount[]
      utilities: CurrentAccount[]
    }
  }
}

type ClearScoreOutput = {
  report_date: string
  updated_date: string
  score: number
  report: UserReport
}

declare function getClearScore(creds: {
  login: string
  pass: string
}): Promise<ClearScoreOutput>
