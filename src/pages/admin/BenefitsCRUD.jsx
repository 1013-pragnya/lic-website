import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import * as LucideIcons from 'lucide-react';

export default function BenefitsCRUD() {
  const { agentConfig, addBenefit, updateBenefit, deleteBenefit } = useConfig();
  const benefits = agentConfig?.benefits || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activeBenefitId, setActiveBenefitId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleCreate = () => {
    reset({
      title: '',
      description: '',
      icon: 'Shield'
    });
    setView('create');
  };

  const handleEdit = (benefit) => {
    setActiveBenefitId(benefit.id);
    reset({
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon
    });
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this benefit?')) {
      deleteBenefit(id);
    }
  };

  const onSubmit = (data) => {
    if (view === 'create') {
      addBenefit(data);
      alert('Benefit created successfully!');
    } else {
      updateBenefit({
        ...data,
        id: activeBenefitId
      });
      alert('Benefit updated successfully!');
    }
    setView('list');
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: '4px', borderBottom: 'none', paddingBottom: 0 }}>
            Core Service Benefits Management
          </h2>
          {view === 'list' && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Configure the value-added benefits and guarantees presented on the live site homepage.
            </p>
          )}
        </div>
        {view === 'list' && (
          <button onClick={handleCreate} className="admin-btn admin-btn-primary">
            <FiPlus /> Add New Benefit
          </button>
        )}
      </div>

      {view === 'list' ? (
        /* List View */
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Benefit Title</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit) => {
                const IconComponent = LucideIcons[benefit.icon] || LucideIcons.Shield;
                return (
                  <tr key={benefit.id}>
                    <td>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        background: 'rgba(207, 168, 68, 0.05)',
                        border: '1px solid var(--border-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary-gold)'
                      }}>
                        <IconComponent size={18} />
                      </div>
                    </td>
                    <td><strong>{benefit.title}</strong></td>
                    <td style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {benefit.description}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleEdit(benefit)} 
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '8px 12px' }}
                        >
                          <FiEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(benefit.id)} 
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '8px 12px' }}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Create/Edit View */
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Benefit Title</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Sovereign Government Guarantee"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.title.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Icon Representation</label>
              <select className="admin-select" {...register('icon')}>
                <option value="Shield">Shield (Security/Guarantee)</option>
                <option value="Award">Award (Experience/MDRT)</option>
                <option value="Heart">Heart (Care/Mediclaim)</option>
                <option value="TrendingUp">Trending Up (Real Estate Growth)</option>
                <option value="Users">Users (Protected Families)</option>
                <option value="Clock">Clock (24/7 Helpline Support)</option>
                <option value="Coins">Coins (Wealth Savings)</option>
                <option value="Wallet">Wallet (Pension/Income)</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Detailed Benefit Description</label>
            <textarea
              className="admin-input"
              placeholder="Explain the value proposition clearly to prospects..."
              style={{ minHeight: '100px' }}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.description.message}</span>}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <FiSave />
              <span>{view === 'create' ? 'Create Benefit' : 'Update Benefit'}</span>
            </button>
            <button type="button" onClick={() => setView('list')} className="admin-btn admin-btn-secondary">
              <FiX />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
