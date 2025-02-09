import { createAsyncThunk } from '@reduxjs/toolkit'
import { addTickets } from '../store/ticketsSlice'
import { notificationError } from '../utils/notificationError'
import { AppDispatch } from '../store/store'

const URL = 'https://aviasales-test-api.kata.academy'

export interface Ticket {
  price: number
  carrier: string
  segments: Array<{
    origin: string
    destination: string
    date: string
    stops: string[]
    duration: number
  }>
}

interface TicketsResponse {
  tickets: Ticket[]
  stop: boolean
}

interface ApiError extends Error {
  response: Response
}

const fetchSearchId = async (): Promise<string> => {
  const response = await fetch(`${URL}/search`)
  if (!response.ok) {
    const error: ApiError = new Error('Ошибка при загрузке searchId') as ApiError
    error.response = response
    throw error
  }
  const data = await response.json()
  return data.searchId
}

const fetchTicketsBatch = async (searchId: string): Promise<TicketsResponse> => {
  const response = await fetch(`${URL}/tickets?searchId=${searchId}`)
  if (!response.ok) {
    const error: ApiError = new Error(`Ошибка при загрузке билетов: ${response.statusText}`) as ApiError
    error.response = response
    throw error
  }
  return await response.json()
}

export const fetchTickets = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'tickets/fetchTickets',
  async (_, { dispatch }) => {
    let searchId: string
    try {
      searchId = await fetchSearchId()
    } catch (error) {
      if ((error as ApiError).response?.status < 500) {
        notificationError('Произошла непредвиденная ошибка при получении searchId')
        return
      }
      throw error
    }
    let stop = false

    while (!stop) {
      try {
        const { tickets, stop: batchStop } = await fetchTicketsBatch(searchId)
        console.log('Полученные билеты:', tickets.length)
        console.log('Статус завершения поиска:', batchStop)
        if (tickets.length > 0) {
          dispatch(addTickets(tickets))
        }
        stop = batchStop
      } catch (error) {
        if ((error as ApiError).response.status >= 500) {
          continue
        } else {
          notificationError('Произошла непредвиденная ошибка')
          return
        }
      }
    }
    console.log('Поиск билетов завершен.')
  }
)

