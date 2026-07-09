import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiCheck } from 'react-icons/fi';

export default function PlansCRUD() {
  const { agentConfig, addPlan, updatePlan, deletePlan } = useConfig();
  const plans = agentConfig?.plans || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activePlanId, setActivePlanId] = useState(null);
  
  // Custom states for dynamic arrays
  const [benefitsList, setBenefitsList] = useState([]);
  const [newBenefit, setNewBenefit] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleCreate = () => {
    reset({
      title: '',
      provider: 'LIC',
      tagline: '',
      icon: 'Shield',
      description: '',
      eligibility: {
        minAge: '18 years',
        maxAge: '65 years',
        term: '10 to 40 years',
        minSumAssured: '₹25,00,000'
      }
    });
    setBenefitsList([]);
    setView('create');
  };

  const handleEdit = (plan) => {
    setActivePlanId(plan.id);
    reset({
      title: plan.title,
      provider: plan.provider,
      tagline: plan.tagline,
      icon: plan.icon,
      description: plan.description,
      eligibility: {
        minAge: plan.eligibility?.minAge || '',
        maxAge: plan.eligibility?.maxAge || '',
        term: plan.eligibility?.term || '',
        minSumAssured: plan.eligibility?.minSumAssured || ''
      }
    });
    setBenefitsList(plan.benefits || []);
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this insurance plan?')) {
      deletePlan(id);
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefitsList([...benefitsList, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index) => {
    setBenefitsList(benefitsList.filter((_, idx) => idx !== index));
  };

  const onSubmit = (data) => {
    const planObject = {
      ...data,
      benefits: benefitsList
    };

    if (view === 'create') {
      addPlan(planObject);
      alert('Insurance plan created successfully!');
    } else {
      updatePlan({
        ...planObject,
        id: activePlanId
      });
      alert('Insurance plan updated successfully!');
    }
    setView('list');
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: '4px', borderBottom: 'none', paddingBottom: 0 }}>
            LIC & Allied Insurance Plans CRUD
          </h2>
          {view === 'list' && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Add, edit, or remove the core life cover, asset protection, and health insurance packages.
            </p>
          )}
        </div>
        {view === 'list' && (
          <button onClick={handleCreate} className="admin-btn admin-btn-primary">
            <FiPlus /> Add New Plan
          </button>
        )}
      </div>

      {view === 'list' ? (
        /* List View */
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Plan Title</th>
                <th>Provider</th>
                <th>Tagline</th>
                <th>Term Options</th>
                <th>Min Sum Assured</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td><strong>{plan.title}</strong></td>
                  <td>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      background: 'rgba(207, 168, 68, 0.1)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '4px',
                      color: 'var(--primary-gold)',
                      fontWeight: 700
                    }}>
                      {plan.provider}
                    </span>
                  </td>
                  <td>{plan.tagline}</td>
                  <td>{plan.eligibility?.term}</td>
                  <td>{plan.eligibility?.minSumAssured}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleEdit(plan)} 
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '8px 12px' }}
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(plan.id)} 
                        className="admin-btn admin-btn-danger"
                        style={{ padding: '8px 12px' }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Create/Edit View */
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Plan Title</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. LIC Child Future Endowment"
                {...register('title', { required: 'Plan Title is required' })}
              />
              {errors.title && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.title.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Insurance Provider</label>
              <select className="admin-select" {...register('provider', { required: true })}>
                <option value="LIC">LIC (Life Insurance Corp)</option>
                <option value="Tata AIG">Tata AIG</option>
                <option value="Care Health">Care Health Insurance</option>
                <option value="Star Health">Star Health Insurance</option>
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Plan Tagline / Subtitle</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Secure your child's educational milestones with sovereign trust"
                {...register('tagline', { required: 'Tagline is required' })}
              />
              {errors.tagline && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.tagline.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Icon Identifier</label>
              <select className="admin-select" {...register('icon')}>
                <option value="Shield">Shield (Life Cover)</option>
                <option value="TrendingUp">Trending Up (Asset Protection)</option>
                <option value="Heart">Heart (Mediclaim)</option>
                <option value="Coins">Coins (Wealth Creation)</option>
                <option value="Wallet">Wallet (Retirement Savings)</option>
                <option value="GraduationCap">Graduation Cap (Child Future)</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Description Text</label>
            <textarea
              className="admin-input"
              placeholder="Provide a detailed description of the policy's purpose..."
              style={{ minHeight: '100px' }}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.description.message}</span>}
          </div>

          {/* Eligibility subform */}
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '16px', letterSpacing: '0.05em' }}>
              Eligibility Guidelines
            </h3>
            
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Min Entry Age</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. 90 days or 18 years"
                  {...register('eligibility.minAge')}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Max Entry Age</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. 65 years or No Limit"
                  {...register('eligibility.maxAge')}
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Policy Term Duration</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. 10 to 40 years or Lifetime Renewable"
                  {...register('eligibility.term')}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Minimum Sum Assured</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. ₹5,00,000 or ₹25,00,000"
                  {...register('eligibility.minSumAssured')}
                />
              </div>
            </div>
          </div>

          {/* Benefits bullets */}
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginBottom: '30px' }}>
            <label className="admin-label">Key Policy Benefits Checklist</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                className="admin-input"
                style={{ flex: 1 }}
                placeholder="e.g. Tax benefits under Section 80C on premium payments"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '12px' }}
              >
                <FiPlus /> Add
              </button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {benefitsList.map((item, index) => (
                <li 
                  key={index} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(5, 10, 23, 0.4)',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      marginLeft: 'auto'
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <FiSave />
              <span>{view === 'create' ? 'Create Policy' : 'Update Policy'}</span>
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
