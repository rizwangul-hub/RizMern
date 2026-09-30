import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/useAdminAuth';
import {
  fetchAdminCourseConfig,
  updateAdminCourseConfig,
  DEFAULT_COURSE_CONFIG,
} from '../../services/courseConfigService';
import Button from '../common/Button';
import './CourseSettingsForm.css';

export function CourseSettingsForm() {
  const { authFetch } = useAdminAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    courseName: DEFAULT_COURSE_CONFIG.courseName,
    duration: DEFAULT_COURSE_CONFIG.duration,
    format: DEFAULT_COURSE_CONFIG.format,
    focus: DEFAULT_COURSE_CONFIG.focus,
    isFeeComingSoon: true,
    fee: '',
    currency: 'PKR',
    feeIncludes: [...DEFAULT_COURSE_CONFIG.feeIncludes],
    classSchedule: [...DEFAULT_COURSE_CONFIG.classSchedule],
    demoClass: { ...DEFAULT_COURSE_CONFIG.demoClass },
    admissionStatus: 'open',
    admissionNotice: DEFAULT_COURSE_CONFIG.admissionNotice,
    whatsapp: { ...DEFAULT_COURSE_CONFIG.whatsapp },
  });

  // Load config on mount
  useEffect(() => {
    let active = true;

    fetchAdminCourseConfig(authFetch)
      .then((data) => {
        if (!active || !data?.config) return;
        const cfg = data.config;
        setFormData({
          courseName: cfg.courseName || DEFAULT_COURSE_CONFIG.courseName,
          duration: cfg.duration || DEFAULT_COURSE_CONFIG.duration,
          format: cfg.format || DEFAULT_COURSE_CONFIG.format,
          focus: cfg.focus || DEFAULT_COURSE_CONFIG.focus,
          isFeeComingSoon: cfg.fee === null || cfg.fee === undefined || cfg.fee === '',
          fee: cfg.fee !== null && cfg.fee !== undefined ? String(cfg.fee) : '',
          currency: cfg.currency || 'PKR',
          feeIncludes: Array.isArray(cfg.feeIncludes) && cfg.feeIncludes.length > 0
            ? [...cfg.feeIncludes]
            : [...DEFAULT_COURSE_CONFIG.feeIncludes],
          classSchedule: Array.isArray(cfg.classSchedule) && cfg.classSchedule.length > 0
            ? cfg.classSchedule.map((s) => ({
                day: s.day || '',
                startTime: s.startTime || '',
                endTime: s.endTime || '',
                timezone: s.timezone || 'PKT',
              }))
            : [...DEFAULT_COURSE_CONFIG.classSchedule],
          demoClass: {
            enabled: cfg.demoClass?.enabled ?? true,
            date: cfg.demoClass?.date || '',
            startTime: cfg.demoClass?.startTime || '',
            endTime: cfg.demoClass?.endTime || '',
            timezone: cfg.demoClass?.timezone || 'PKT',
            meetingPlatform: cfg.demoClass?.meetingPlatform || 'Google Meet',
            meetingLink: cfg.demoClass?.meetingLink || '',
            isMeetingLinkPublic: Boolean(cfg.demoClass?.isMeetingLinkPublic),
            instructions: cfg.demoClass?.instructions || '',
          },
          admissionStatus: cfg.admissionStatus || 'open',
          admissionNotice: cfg.admissionNotice || '',
          whatsapp: {
            enabled: Boolean(cfg.whatsapp?.enabled),
            phone: cfg.whatsapp?.phone || '',
            groupLink: cfg.whatsapp?.groupLink || '',
            directChatEnabled: Boolean(cfg.whatsapp?.directChatEnabled),
            message: cfg.whatsapp?.message || '',
          },
        });
      })
      .catch((err) => {
        console.error('Failed to load admin course config:', err);
        setSaveError('Could not load current settings from backend. Showing defaults.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authFetch]);

  // Fee includes management
  const handleAddFeeInclude = () => {
    setFormData((prev) => ({
      ...prev,
      feeIncludes: [...prev.feeIncludes, ''],
    }));
  };

  const handleUpdateFeeInclude = (index, value) => {
    setFormData((prev) => {
      const next = [...prev.feeIncludes];
      next[index] = value;
      return { ...prev, feeIncludes: next };
    });
  };

  const handleRemoveFeeInclude = (index) => {
    setFormData((prev) => ({
      ...prev,
      feeIncludes: prev.feeIncludes.filter((_, i) => i !== index),
    }));
  };

  // Class schedule slots management
  const handleAddScheduleSlot = () => {
    setFormData((prev) => ({
      ...prev,
      classSchedule: [
        ...prev.classSchedule,
        { day: 'Saturday & Sunday', startTime: '8:00 PM', endTime: '9:30 PM', timezone: 'PKT' },
      ],
    }));
  };

  const handleUpdateScheduleSlot = (index, field, value) => {
    setFormData((prev) => {
      const next = [...prev.classSchedule];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, classSchedule: next };
    });
  };

  const handleRemoveScheduleSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      classSchedule: prev.classSchedule.filter((_, i) => i !== index),
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess('');
    setSaveError('');

    try {
      // Validate fee
      let parsedFee = null;
      if (!formData.isFeeComingSoon) {
        if (formData.fee.trim() === '') {
          throw new Error('Please enter a course fee amount, or check "Coming Soon / Contact for Fee".');
        }
        parsedFee = Number(formData.fee);
        if (isNaN(parsedFee) || parsedFee < 0) {
          throw new Error('Course fee must be a non-negative number.');
        }
      }

      // Filter empty items
      const cleanedFeeIncludes = formData.feeIncludes
        .map((item) => item.trim())
        .filter(Boolean);

      const cleanedSchedule = formData.classSchedule
        .filter((s) => s.day.trim() && s.startTime.trim() && s.endTime.trim())
        .map((s) => ({
          day: s.day.trim(),
          startTime: s.startTime.trim(),
          endTime: s.endTime.trim(),
          timezone: s.timezone.trim() || 'PKT',
        }));

      const payload = {
        courseName: formData.courseName.trim(),
        duration: formData.duration.trim(),
        format: formData.format.trim(),
        focus: formData.focus.trim(),
        fee: parsedFee,
        currency: formData.currency.trim().toUpperCase() || 'PKR',
        feeIncludes: cleanedFeeIncludes,
        classSchedule: cleanedSchedule,
        demoClass: {
          enabled: Boolean(formData.demoClass.enabled),
          date: formData.demoClass.date.trim(),
          startTime: formData.demoClass.startTime.trim(),
          endTime: formData.demoClass.endTime.trim(),
          timezone: formData.demoClass.timezone.trim() || 'PKT',
          meetingPlatform: formData.demoClass.meetingPlatform.trim(),
          meetingLink: formData.demoClass.meetingLink.trim(),
          isMeetingLinkPublic: Boolean(formData.demoClass.isMeetingLinkPublic),
          instructions: formData.demoClass.instructions.trim(),
        },
        admissionStatus: formData.admissionStatus,
        admissionNotice: formData.admissionNotice.trim(),
        whatsapp: {
          enabled: Boolean(formData.whatsapp.enabled),
          phone: formData.whatsapp.phone.trim(),
          groupLink: formData.whatsapp.groupLink.trim(),
          directChatEnabled: Boolean(formData.whatsapp.directChatEnabled),
          message: formData.whatsapp.message.trim(),
        },
      };

      const res = await updateAdminCourseConfig(authFetch, payload);
      setSaveSuccess(res.message || 'Course settings updated successfully.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Update error:', err);
      setSaveError(err.message || 'Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="course-settings-loading">
        <div className="admin-spinner" />
        <p>Loading course and admission settings...</p>
      </div>
    );
  }

  return (
    <form className="course-settings-container" onSubmit={handleSubmit}>
      <div className="settings-header">
        <div>
          <h2 className="settings-title">Course &amp; Admission Configuration</h2>
          <p className="settings-subtitle">
            Configure pricing, batch schedule, demo sessions, and WhatsApp communication shown across RizMern.
          </p>
        </div>
        <Button type="submit" variant="primary" isLoading={isSaving}>
          {isSaving ? 'Saving Changes...' : 'Save Settings'}
        </Button>
      </div>

      {saveSuccess && (
        <div className="settings-alert alert-success" role="alert">
          <span>✓</span> {saveSuccess}
        </div>
      )}

      {saveError && (
        <div className="settings-alert alert-error" role="alert">
          <span>⚠️</span> {saveError}
        </div>
      )}

      {/* 1. Admission Status & Banner */}
      <section className="settings-card">
        <h3 className="card-title">1. Admission Cohort Status</h3>
        <p className="card-desc">Control whether new admissions are currently open, coming soon, or closed.</p>
        
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="admissionStatus" className="form-label">Admission Status</label>
            <select
              id="admissionStatus"
              className="form-select"
              value={formData.admissionStatus}
              onChange={(e) => setFormData({ ...formData, admissionStatus: e.target.value })}
            >
              <option value="open">🟢 Admissions Open</option>
              <option value="coming_soon">🟡 Admissions Coming Soon</option>
              <option value="closed">🔴 Admissions Closed</option>
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="admissionNotice" className="form-label">Admission Notice / Banner Message</label>
            <input
              id="admissionNotice"
              type="text"
              className="form-input"
              value={formData.admissionNotice}
              placeholder="e.g. Next batch starts next month. Free demo class registration is active."
              onChange={(e) => setFormData({ ...formData, admissionNotice: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* 2. Course Fee & Inclusions */}
      <section className="settings-card">
        <h3 className="card-title">2. Course Pricing &amp; Inclusions</h3>
        <p className="card-desc">Transparent pricing information with zero misleading claims or fake countdowns.</p>

        <div className="form-grid">
          <div className="form-group fee-mode-toggle">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isFeeComingSoon}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isFeeComingSoon: e.target.checked,
                    fee: e.target.checked ? '' : formData.fee,
                  })
                }
              />
              <span>Set fee as <strong>Coming Soon / Inquire Directly</strong></span>
            </label>
          </div>

          {!formData.isFeeComingSoon && (
            <>
              <div className="form-group">
                <label htmlFor="courseFee" className="form-label">Course Fee Amount</label>
                <input
                  id="courseFee"
                  type="number"
                  min="0"
                  step="500"
                  className="form-input"
                  placeholder="e.g. 25000"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  required={!formData.isFeeComingSoon}
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency" className="form-label">Currency</label>
                <select
                  id="currency"
                  className="form-select"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option value="PKR">PKR (Pakistani Rupee)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="inclusions-section">
          <div className="inclusions-header">
            <label className="form-label">What the Course Fee Includes</label>
            <button type="button" className="btn-add-item" onClick={handleAddFeeInclude}>
              + Add Item
            </button>
          </div>

          <div className="items-list">
            {formData.feeIncludes.map((item, idx) => (
              <div key={idx} className="item-row">
                <span className="item-bullet">✓</span>
                <input
                  type="text"
                  className="form-input"
                  value={item}
                  placeholder={`Feature or benefit #${idx + 1}`}
                  onChange={(e) => handleUpdateFeeInclude(idx, e.target.value)}
                />
                <button
                  type="button"
                  className="btn-remove-item"
                  title="Remove item"
                  onClick={() => handleRemoveFeeInclude(idx)}
                  disabled={formData.feeIncludes.length <= 1}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Class Schedule */}
      <section className="settings-card">
        <div className="inclusions-header">
          <div>
            <h3 className="card-title">3. Live Class Schedule</h3>
            <p className="card-desc">Weekly live class slots and time commitments.</p>
          </div>
          <button type="button" className="btn-add-item" onClick={handleAddScheduleSlot}>
            + Add Schedule Slot
          </button>
        </div>

        {formData.classSchedule.length === 0 ? (
          <p className="empty-hint">No schedule slots configured yet. Click "+ Add Schedule Slot" to add one.</p>
        ) : (
          <div className="schedule-slots-list">
            {formData.classSchedule.map((slot, idx) => (
              <div key={idx} className="schedule-slot-item">
                <div className="slot-grid">
                  <div className="form-group">
                    <label className="form-label">Class Day(s)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Mon, Wed, Fri"
                      value={slot.day}
                      onChange={(e) => handleUpdateScheduleSlot(idx, 'day', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 8:30 PM"
                      value={slot.startTime}
                      onChange={(e) => handleUpdateScheduleSlot(idx, 'startTime', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Time</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 10:00 PM"
                      value={slot.endTime}
                      onChange={(e) => handleUpdateScheduleSlot(idx, 'endTime', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Timezone</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. PKT"
                      value={slot.timezone}
                      onChange={(e) => handleUpdateScheduleSlot(idx, 'timezone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="slot-footer">
                  <button
                    type="button"
                    className="btn-remove-slot"
                    onClick={() => handleRemoveScheduleSlot(idx)}
                  >
                    Remove Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Free Demo Class Configuration */}
      <section className="settings-card">
        <h3 className="card-title">4. Free Demo Class Session</h3>
        <p className="card-desc">Information for the upcoming complimentary introductory session.</p>

        <div className="form-grid">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.demoClass.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    demoClass: { ...formData.demoClass, enabled: e.target.checked },
                  })
                }
              />
              <span>Demo Class Active &amp; Accepting Registrations</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="demoDate" className="form-label">Demo Date</label>
            <input
              id="demoDate"
              type="text"
              className="form-input"
              placeholder="e.g. Saturday, Oct 12"
              value={formData.demoClass.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  demoClass: { ...formData.demoClass, date: e.target.value },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="demoStartTime" className="form-label">Demo Start Time</label>
            <input
              id="demoStartTime"
              type="text"
              className="form-input"
              placeholder="e.g. 8:00 PM"
              value={formData.demoClass.startTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  demoClass: { ...formData.demoClass, startTime: e.target.value },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="demoEndTime" className="form-label">Demo End Time</label>
            <input
              id="demoEndTime"
              type="text"
              className="form-input"
              placeholder="e.g. 9:15 PM"
              value={formData.demoClass.endTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  demoClass: { ...formData.demoClass, endTime: e.target.value },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="demoPlatform" className="form-label">Meeting Platform</label>
            <input
              id="demoPlatform"
              type="text"
              className="form-input"
              placeholder="e.g. Google Meet / Zoom"
              value={formData.demoClass.meetingPlatform}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  demoClass: { ...formData.demoClass, meetingPlatform: e.target.value },
                })
              }
            />
          </div>

          <div className="form-group span-2">
            <label htmlFor="demoMeetingLink" className="form-label">Session Meeting Link (Stored Privately)</label>
            <input
              id="demoMeetingLink"
              type="url"
              className="form-input"
              placeholder="https://meet.google.com/xxx-yyyy-zzz"
              value={formData.demoClass.meetingLink}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  demoClass: { ...formData.demoClass, meetingLink: e.target.value },
                })
              }
            />
            <p className="field-hint">
              Security note: This link remains private by default and will NOT appear on the public website.
            </p>
          </div>

          <div className="form-group span-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.demoClass.isMeetingLinkPublic}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    demoClass: { ...formData.demoClass, isMeetingLinkPublic: e.target.checked },
                  })
                }
              />
              <span>
                Make meeting link visible on public website (Unchecked = private; sent only via WhatsApp/Email)
              </span>
            </label>
          </div>

          <div className="form-group span-2">
            <label htmlFor="demoInstructions" className="form-label">Attendee Instructions</label>
            <textarea
              id="demoInstructions"
              rows={2}
              className="form-textarea"
              placeholder="e.g. Please join 5 minutes early with a laptop ready to view code demonstrations."
              value={formData.demoClass.instructions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  demoClass: { ...formData.demoClass, instructions: e.target.value },
                })
              }
            />
          </div>
        </div>
      </section>

      {/* 5. WhatsApp & Direct Communication */}
      <section className="settings-card">
        <h3 className="card-title">5. WhatsApp &amp; Direct Support</h3>
        <p className="card-desc">
          Official contact buttons appear on the public website ONLY if enabled with valid phone or group URL.
        </p>

        <div className="form-grid">
          <div className="form-group span-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.whatsapp.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whatsapp: { ...formData.whatsapp, enabled: e.target.checked },
                  })
                }
              />
              <span>Enable WhatsApp integrations on public website</span>
            </label>
          </div>

          {formData.whatsapp.enabled && (
            <>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.whatsapp.directChatEnabled}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whatsapp: { ...formData.whatsapp, directChatEnabled: e.target.checked },
                      })
                    }
                  />
                  <span>Show "Direct WhatsApp Chat" button</span>
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="waPhone" className="form-label">Instructor WhatsApp Number (International format)</label>
                <input
                  id="waPhone"
                  type="text"
                  className="form-input"
                  placeholder="+923001234567"
                  value={formData.whatsapp.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp: { ...formData.whatsapp, phone: e.target.value },
                    })
                  }
                />
              </div>

              <div className="form-group span-2">
                <label htmlFor="waGroup" className="form-label">Official WhatsApp Group / Community Link</label>
                <input
                  id="waGroup"
                  type="url"
                  className="form-input"
                  placeholder="https://chat.whatsapp.com/..."
                  value={formData.whatsapp.groupLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp: { ...formData.whatsapp, groupLink: e.target.value },
                    })
                  }
                />
              </div>

              <div className="form-group span-2">
                <label htmlFor="waMsg" className="form-label">Default Pre-filled Chat Message</label>
                <input
                  id="waMsg"
                  type="text"
                  className="form-input"
                  placeholder="Hello Rizwan! I would like to inquire about the RizMern course."
                  value={formData.whatsapp.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp: { ...formData.whatsapp, message: e.target.value },
                    })
                  }
                />
              </div>
            </>
          )}
        </div>
      </section>

      <div className="settings-footer">
        <Button type="submit" variant="primary" size="lg" isLoading={isSaving}>
          {isSaving ? 'Saving Changes...' : 'Save All Changes'}
        </Button>
      </div>
    </form>
  );
}

export default CourseSettingsForm;
