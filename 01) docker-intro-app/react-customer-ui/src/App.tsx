import React, {useEffect, useRef, useState} from 'react'
import {addCustomer, type Customer, deleteCustomer, getCustomers} from './services/api.ts'

type FormState = {
    id: string,
    name: string,
    address: string
}

function App(): React.ReactElement {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [form, setForm] = useState<FormState>({id: '', name: '', address: ''})
    const [error, setError] = useState<string>('')
    const txtId = useRef<HTMLInputElement>(null);

    const load = async (): Promise<void> => {
        setLoading(true)
        setError('')
        try {
            const data = await getCustomers()
            setCustomers(data)
        } catch (e) {
            setError('Failed to load customers')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void load()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setError('')
        if (!form.id.trim() || !form.name.trim() || !form.address.trim()) {
            setError('Id, Name and Address are required')
            return
        }
        try {
            const created = await addCustomer({id: form.id.trim(), name: form.name.trim(), address: form.address.trim()})
            setCustomers(prev => [...prev, created])
            setForm({id: '', name: '', address: ''})
            txtId.current?.focus();
        } catch (e) {
            setError('Failed to add customer')
        }
    }

    const handleDelete = async (id: string): Promise<void> => {
        setError('')
        try {
            await deleteCustomer(id)
            setCustomers(prev => prev.filter(c => c.id !== id))
        } catch (e) {
            setError('Failed to delete customer')
        }
    }

    return (
        <div className="container my-4">
            <h1 className="mb-4">Customer Management</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card mb-4">
                <div className="card-header">Add New Customer</div>
                <div className="card-body">
                    <form className="row g-3" onSubmit={handleAdd}>
                        <div className="col-md-3">
                            <label className="form-label">ID:</label>
                            <input className="form-control" name="id" pattern="^C\d{3}$" value={form.id} onChange={handleChange}
                                   ref={txtId} autoFocus
                                   required/>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Name</label>
                            <input className="form-control" name="name" value={form.name} onChange={handleChange}
                                   required/>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Address</label>
                            <input className="form-control" name="address" value={form.address} onChange={handleChange}
                                   required/>
                        </div>
                        <div className="col-md-3 d-flex align-items-end">
                            <button className="btn btn-primary w-100" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Current Customers</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => void load()} disabled={loading}>
                        Refresh
                    </button>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <div className="p-3">Loading...</div>
                    ) : customers.length === 0 ? (
                        <div className="p-3">No customers found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped mb-0 table-hover">
                                <thead>
                                <tr>
                                    <th style={{width: '120px'}}>ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th style={{width: '120px'}}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {customers.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.address}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger"
                                                    onClick={() => void handleDelete(c.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default App
