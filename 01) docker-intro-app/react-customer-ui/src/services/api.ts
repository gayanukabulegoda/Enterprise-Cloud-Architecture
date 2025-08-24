import axios from 'axios'

export interface Customer {
  id: string
  name: string
  address: string
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// Spring Data REST returns HAL by default; we will simplify by projecting to plain array
export async function getCustomers(): Promise<Customer[]> {
  const res = await api.get('/customers')
  const data = res.data
  // If Spring Data REST HAL format
  if (data && data._embedded && data._embedded.customers) {
    return data._embedded.customers as Customer[]
  }
  // If customized controller returns array
  if (Array.isArray(data)) return data as Customer[]
  return []
}

export async function addCustomer(payload: Customer): Promise<Customer> {
  const res = await api.post('/customers', payload)
  return res.data as Customer
}

export async function deleteCustomer(id: string): Promise<void> {
  await api.delete(`/customers/${id}`)
}
