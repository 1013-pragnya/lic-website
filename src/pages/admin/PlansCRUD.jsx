import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';
import { validateImageFile, cropAndResizeImage } from '../../utils/imageProcessor';

export default function PlansCRUD() {
  const { agentConfig, addPlan, updatePlan, deletePlan } = useConfig();
  const plans = agentConfig?.plans || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activePlanId, setActivePlanId] = useState(null);
  
  // Custom states for dynamic arrays
  const [benefitsList, setBenefitsList] = useState([]);
  const [newBenefit, setNewBenefit] = useState('');

  const handleToggleHide = (plan) => {
    updatePlan({
      ...plan,
      hidden: !plan.hidden
    });
  };

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Image cropping and optimization states
  const [rawImage, setRawImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0.5);
  const [offsetY, setOffsetY] = useState(0.5);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageError, setImageError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
      },
      hidden: false
    });
    setBenefitsList([]);
    setRawImage(null);
    setProcessedImage(null);
    setZoom(1);
    setOffsetX(0.5);
    setOffsetY(0.5);
    setUploadProgress(0);
    setImageError('');
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
      },
      hidden: plan.hidden || false
    });
    setBenefitsList(plan.benefits || []);
    setRawImage(plan.image || null);
    setProcessedImage(plan.image || null);
    setZoom(1);
    setOffsetX(0.5);
    setOffsetY(0.5);
    setUploadProgress(0);
    setImageError('');
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError(validation.error);
      setRawImage(null);
      setProcessedImage(null);
      return;
    }

    setImageError('');
    setUploadProgress(10);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      setRawImage(event.target.result);
      setZoom(1);
      setOffsetX(0.5);
      setOffsetY(0.5);
      
      let progress = 10;
      const interval = setInterval(() => {
        progress += 30;
        if (progress >= 100) {
          clearInterval(interval);
          setUploadProgress(100);
          
          cropAndResizeImage(event.target.result, { zoom: 1, offsetX: 0.5, offsetY: 0.5 })
            .then(processed => {
              setProcessedImage(processed);
              setIsProcessing(false);
            })
            .catch(() => {
              setImageError('Failed to process image.');
              setIsProcessing(false);
            });
        } else {
          setUploadProgress(progress);
        }
      }, 80);
    };
    reader.readAsDataURL(file);
  };

  const handleRecalculateCrop = (newZoom, newX, newY) => {
    if (!rawImage) return;
    setIsProcessing(true);
    cropAndResizeImage(rawImage, { zoom: newZoom, offsetX: newX, offsetY: newY })
      .then(processed => {
        setProcessedImage(processed);
        setIsProcessing(false);
      })
      .catch(() => {
        setIsProcessing(false);
      });
  };

  const onSubmit = (data) => {
    const planObject = {
      ...data,
      image: processedImage,
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
                <th>Status</th>
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
                  <td>
                    <button
                      onClick={() => handleToggleHide(plan)}
                      className={`admin-btn ${plan.hidden ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {plan.hidden ? (
                        <>
                          <FiEyeOff /> <span>Hidden</span>
                        </>
                      ) : (
                        <>
                          <FiEye /> <span>Active</span>
                        </>
                      )}
                    </button>
                  </td>
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

          {/* Image Upload & Repositioning System */}
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '16px', letterSpacing: '0.05em' }}>
              Product Banner Image
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <input
                  type="file"
                  id="plan-banner-file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('plan-banner-file').click()}
                  className="admin-btn admin-btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Choose Banner File
                </button>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Accepts JPG, PNG, WebP (Max 5MB). Resized to 1200x675 px (16:9).
                </span>
              </div>

              {imageError && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500' }}>
                  {imageError}
                </div>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div style={{ width: '100%', maxWidth: '400px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>Processing & optimizing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--primary-gold)', transition: 'width 0.1s ease' }}></div>
                  </div>
                </div>
              )}

              {rawImage && (
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {/* Cropper controls */}
                  <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--white)', margin: 0 }}>Reposition & Zoom</h4>
                    
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Zoom</span>
                        <span>{zoom.toFixed(1)}x</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setZoom(val);
                          handleRecalculateCrop(val, offsetX, offsetY);
                        }}
                        style={{ width: '100%', accentColor: 'var(--primary-gold)' }}
                      />
                    </div>

                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Horizontal Position (X)</span>
                        <span>{Math.round(offsetX * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={offsetX}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setOffsetX(val);
                          handleRecalculateCrop(zoom, val, offsetY);
                        }}
                        style={{ width: '100%', accentColor: 'var(--primary-gold)' }}
                      />
                    </div>

                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Vertical Position (Y)</span>
                        <span>{Math.round(offsetY * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={offsetY}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setOffsetY(val);
                          handleRecalculateCrop(zoom, offsetX, val);
                        }}
                        style={{ width: '100%', accentColor: 'var(--primary-gold)' }}
                      />
                    </div>
                  </div>

                  {/* 16:9 Banner Preview */}
                  <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span className="admin-label" style={{ margin: 0 }}>Live 16:9 Cropped Preview</span>
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      background: '#090f1d',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-glass)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {processedImage ? (
                        <img
                          src={processedImage}
                          alt="Optimized Banner"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Processing crop...
                        </span>
                      )}
                      {isProcessing && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(9,15,29,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary-gold)',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          Optimizing...
                        </div>
                      )}
                    </div>
                    {processedImage && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                        Ready to Save (~1200x675 px, WebP compressed)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', marginBottom: '24px' }}>
            <input
              type="checkbox"
              id="hidden-check"
              {...register('hidden')}
              style={{ cursor: 'pointer', width: '18px', height: '18px' }}
            />
            <label htmlFor="hidden-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
              Hide this insurance plan (Draft status)
            </label>
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
