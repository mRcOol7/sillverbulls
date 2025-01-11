import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Algo.css';

const Algo = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [isValidOffer, setIsValidOffer] = useState(false);
  const [isValidReferral, setIsValidReferral] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState({
    original: 0,
    offerDiscount: 0,
    referralDiscount: 0,
    final: 0
  });

  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const basePlans = {
    quarterly: {
      id: 'quarterly',
      name: 'Quarterly',
      basePrice: 3000,
      duration: '3 months',
      perMonthPrice: {
        monthly: 1200, 
        annual: 1000,  
      },
      features: [
        'Real-time Trading Signals',
        'Basic Market Analysis',
        'Email Support',
        'Mobile App Access',
        'Up to 5 Trading Pairs'
      ],
      savings: '0',
      recommended: false
    },
    halfYearly: {
      id: 'halfYearly',
      name: '6 Months',
      basePrice: 5500,
      duration: '6 months',
      perMonthPrice: {
        monthly: 1100, 
        annual: 917,   
      },
      features: [
        'All Quarterly Features',
        'Advanced Market Analysis',
        'Priority Support 24/7',
        'Desktop + Mobile Access',
        'Up to 15 Trading Pairs',
        'Custom Alerts',
        'Portfolio Tracking'
      ],
      savings: '500',
      recommended: true
    },
    yearly: {
      id: 'yearly',
      name: 'Yearly',
      basePrice: 10000,
      duration: '12 months',
      perMonthPrice: {
        monthly: 1000, 
        annual: 834,   
      },
      features: [
        'All 6-Month Features',
        'Premium Market Analysis',
        'VIP Support',
        'Unlimited Trading Pairs',
        'Custom Strategy Builder',
        'Risk Management Tools',
        'Priority Updates'
      ],
      savings: '2000',
      recommended: false
    }
  };

  const calculatePrice = (basePrice) => {
    return billingCycle === 'monthly' ? Math.round(basePrice * 1.2) : basePrice;
  };

  const plans = Object.values(basePlans).map(plan => ({
    ...plan,
    price: calculatePrice(plan.basePrice)
  }));

  const validateOfferCode = (code) => {
    const validOfferCodes = ['FIRST50', 'SPECIAL20', 'NEW100'];
    return validOfferCodes.includes(code.toUpperCase());
  };

  const validateReferralCode = (code) => {
    const validReferralPattern = /^REF[A-Z0-9]{6}$/;
    return validReferralPattern.test(code.toUpperCase());
  };

  const calculateDiscount = () => {
    if (!selectedPlan) return 0;
    
    const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
    let discount = 0;
    
    if (isValidOffer) {
      discount += selectedPlanData.price * 0.1;
    }
    
    if (isValidReferral) {
      discount += selectedPlanData.price * 0.05;
    }
    
    return Math.round(discount);
  };

  const calculateDiscountedPrice = (price, code) => {
    if (code === 'FIRST50') {
      return price - (price * 0.1);
    } else if (code === 'SPECIAL20') {
      return price - (price * 0.2);
    } else if (code === 'NEW100') {
      return price - 100;
    } else {
      return price;
    }
  };

  const calculatePriceBreakdown = () => {
    if (!selectedPlan) return;

    const selectedPlanPrice = plans.find(p => p.id === selectedPlan)?.price || 0;
    let currentPrice = selectedPlanPrice;
    let offerDiscount = 0;
    let referralDiscount = 0;

    // Calculate offer code discount
    if (offerCode && validateOfferCode(offerCode)) {
      if (offerCode === 'FIRST50') {
        offerDiscount = currentPrice * 0.1;
      } else if (offerCode === 'SPECIAL20') {
        offerDiscount = currentPrice * 0.2;
      } else if (offerCode === 'NEW100') {
        offerDiscount = 100;
      }
      currentPrice -= offerDiscount;
    }

    // Calculate referral code discount
    if (referralCode && validateReferralCode(referralCode)) {
      referralDiscount = currentPrice * 0.05; // 5% discount for referrals
      currentPrice -= referralDiscount;
    }

    setPriceBreakdown({
      original: selectedPlanPrice,
      offerDiscount,
      referralDiscount,
      final: currentPrice
    });

    setFinalPrice(currentPrice);
    setSavings(selectedPlanPrice - currentPrice);
  };

  const getOfferMessage = (code) => {
    if (!code) return '';
    if (code === 'FIRST50') return {
      icon: '🎉',
      message: 'Success! 10% discount applied to your subscription',
      type: 'success'
    };
    if (code === 'SPECIAL20') return {
      icon: '🎯',
      message: 'Amazing! 20% discount unlocked for you',
      type: 'success'
    };
    if (code === 'NEW100') return {
      icon: '💫',
      message: 'Congratulations! ₹100 off on your subscription',
      type: 'success'
    };
    return {
      icon: '💡',
      message: 'Try FIRST50, SPECIAL20, or NEW100 for discounts',
      type: 'info'
    };
  };

  const getReferralMessage = (code) => {
    if (!code) return '';
    if (validateReferralCode(code)) return {
      icon: '🌟',
      message: 'Referral code applied! Enjoy 5% extra savings',
      type: 'success'
    };
    return {
      icon: '💡',
      message: 'Please enter a valid referral code',
      type: 'info'
    };
  };

  useEffect(() => {
    calculatePriceBreakdown();
  }, [selectedPlan, offerCode, referralCode, billingCycle]);

  useEffect(() => {
    if (selectedPlan) {
      const discount = calculateDiscount();
      const plan = plans.find(p => p.id === selectedPlan);
      setDiscountedPrice(plan.price - discount);
    }
  }, [selectedPlan, isValidOffer, isValidReferral, billingCycle]);

  const handleOfferCodeChange = (e) => {
    const code = e.target.value;
    setOfferCode(code);
    setIsValidOffer(validateOfferCode(code));
  };

  const handleReferralCodeChange = (e) => {
    const code = e.target.value;
    setReferralCode(code);
    setIsValidReferral(validateReferralCode(code));
  };

  const handlePlanSelect = (planId) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    setSelectedPlan(planId);
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let message = '';
      let finalPrice = plans.find(p => p.id === selectedPlan)?.price || 0;

      // Validate and apply offer code if present
      if (offerCode) {
        if (validateOfferCode(offerCode)) {
          setIsValidOffer(true);
          message += 'Offer code applied successfully! ';
          finalPrice = calculateDiscountedPrice(finalPrice, offerCode);
        } else {
          setIsValidOffer(false);
          message += 'Invalid offer code. ';
        }
      }

      // Validate and apply referral code if present
      if (referralCode) {
        if (validateReferralCode(referralCode)) {
          setIsValidReferral(true);
          message += 'Referral code applied successfully! ';
          finalPrice = calculateDiscountedPrice(finalPrice, referralCode);
        } else {
          setIsValidReferral(false);
          message += 'Invalid referral code. ';
        }
      }

      // Set success message
      const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || '';
      const successMessage = `🎉 Congratulations! Your ${selectedPlanName} plan has been activated.${message ? ' ' + message : ''} Final price: ₹${finalPrice}`;

      setNotification({
        show: true,
        type: 'success',
        message: successMessage
      });

      // Clear form after successful submission
      setTimeout(() => {
        setOfferCode('');
        setReferralCode('');
        setIsValidOffer(false);
        setIsValidReferral(false);
        setIsSubmitting(false);
      }, 1000);

    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
      setIsSubmitting(false);
    }

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  return (
    <div className="algo-container">
      {showAuthDialog && (
        <div className="auth-dialog-overlay" onClick={() => setShowAuthDialog(false)}>
          <div className="auth-dialog" onClick={e => e.stopPropagation()}>
            <div className="auth-dialog-content">
              <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <h2>Authentication Required</h2>
              <p>To select a subscription plan and access premium features, please log in to your account or create a new one.</p>
              <div className="auth-dialog-actions">
                <button 
                  className="login-btn"
                  onClick={() => {
                    setShowAuthDialog(false);
                    navigate('/signin');
                  }}
                >
                  Log In
                </button>
                <button 
                  className="signup-btn"
                  onClick={() => {
                    setShowAuthDialog(false);
                    navigate('/signin');
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <button 
              className="close-dialog"
              onClick={() => setShowAuthDialog(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="algo-subscription-header">
        <h1>Choose Your Trading Journey</h1>
        <p>Select the plan that best fits your trading needs and goals</p>
        
        <div className="algo-billing-toggle">
          <div className="toggle-wrapper">
            <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={billingCycle === 'annual'}
                onChange={() => handleBillingCycleChange(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              />
              <span className="toggle-slider">
                <span className="toggle-circle">
                  <svg className="moon-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg className="sun-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </span>
            </label>
            <span className={billingCycle === 'annual' ? 'active' : ''}>
              Annual
              <span className="algo-save-badge">Save 20%</span>
            </span>
          </div>
        </div>
      </div>

      <div className="algo-subscription-plans">
        <div className="algo-plans-container">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`algo-plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.recommended && (
                <div className="algo-recommended-badge">
                  <span>★ Most Popular</span>
                </div>
              )}
              <div className="algo-plan-header">
                <h3>{plan.name}</h3>
                <div className="algo-price">
                  <span className="algo-currency">₹</span>
                  {plan.price}
                  <span className="algo-price-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <div className="algo-per-month">
                  ₹{plan.perMonthPrice[billingCycle]}/month
                </div>
                <div className="algo-duration">{plan.duration}</div>
                {plan.savings !== '0' && (
                  <div className="algo-savings-badge">Save ₹{plan.savings}</div>
                )}
              </div>
              <div className="algo-plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="algo-feature">
                    <span className="algo-feature-icon">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              <div className="algo-plan-actions">
                <button 
                  className={`algo-select-plan-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className="algo-subscription-form" onSubmit={handleSubmit}>
        <div className="algo-form-section">
          <h3>Apply Discounts</h3>
          <div className="algo-form-group">
            <label>
              Offer Code
              <span className="label-optional">(Optional)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                value={offerCode}
                onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                placeholder="Enter offer code (e.g., FIRST50)"
                disabled={isSubmitting}
                className={offerCode ? (isValidOffer ? 'valid' : '') : ''}
              />
              {offerCode && (
                <span className={`validation-icon ${isValidOffer ? 'valid' : ''}`}>
                  {isValidOffer ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              )}
            </div>
            {offerCode && (
              <div className={`validation-message ${isValidOffer ? 'success-message' : 'info-message'}`}>
                <span className="message-icon">
                  {isValidOffer ? (
                    <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <div className="message-content">
                  <span className="message-emoji">{getOfferMessage(offerCode).icon}</span>
                  <span className="message-text">{getOfferMessage(offerCode).message}</span>
                </div>
              </div>
            )}
          </div>

          <div className="algo-form-group">
            <label>
              Referral Code
              <span className="label-optional">(Optional)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Enter referral code"
                disabled={isSubmitting}
                className={referralCode ? (isValidReferral ? 'valid' : '') : ''}
              />
              {referralCode && (
                <span className={`validation-icon ${isValidReferral ? 'valid' : ''}`}>
                  {isValidReferral ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              )}
            </div>
            {referralCode && (
              <div className={`validation-message ${isValidReferral ? 'success-message' : 'info-message'}`}>
                <span className="message-icon">
                  {isValidReferral ? (
                    <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <div className="message-content">
                  <span className="message-emoji">{getReferralMessage(referralCode).icon}</span>
                  <span className="message-text">{getReferralMessage(referralCode).message}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedPlan && (
          <div className="algo-price-preview">
            <div className="price-preview-header">
              <h3>Price Preview</h3>
              {savings > 0 && (
                <div className="total-savings">
                  <span>Total Savings</span>
                  <span className="savings-amount">₹{savings}</span>
                </div>
              )}
            </div>
            
            <div className="price-breakdown">
              <div className="breakdown-item">
                <span>Original Price</span>
                <span className="amount">₹{priceBreakdown.original}</span>
              </div>
              
              {priceBreakdown.offerDiscount > 0 && (
                <div className="breakdown-item discount">
                  <span>
                    <svg viewBox="0 0 24 24" className="discount-icon">
                      <path d="M21,12.5v-1c0-0.28-0.22-0.5-0.5-0.5H19l1.2-1.2c0.2-0.2,0.2-0.51,0-0.71l-0.71-0.71c-0.2-0.2-0.51-0.2-0.71,0L17.5,9.5V8 c0-0.28-0.22-0.5-0.5-0.5h-1c-0.28,0-0.5,0.22-0.5,0.5v2.5c0,0.28,0.22,0.5,0.5,0.5h2.5c0.28,0,0.5-0.22,0.5-0.5v-1L20.3,11.3 c0.2-0.2,0.2-0.51,0-0.71L19.5,10.5L21,12.5z M12.5,21h-1c-0.28,0-0.5-0.22-0.5-0.5V19l-1.2,1.2c-0.2,0.2-0.51,0.2-0.71,0 l-0.71-0.71c-0.2-0.2-0.2-0.51,0-0.71l1.2-1.2H8c-0.28,0-0.5-0.22-0.5-0.5v-1c0-0.28,0.22-0.5,0.5-0.5h2.5c0.28,0,0.5,0.22,0.5,0.5 v2.5C11.5,20.78,11.28,21,12.5,21z" fill="currentColor"/>
                    </svg>
                    Offer Discount
                  </span>
                  <span className="amount">-₹{priceBreakdown.offerDiscount}</span>
                </div>
              )}
              
              {priceBreakdown.referralDiscount > 0 && (
                <div className="breakdown-item discount">
                  <span>
                    <svg viewBox="0 0 24 24" className="discount-icon">
                      <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,15c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,15,12,15z" fill="currentColor"/>
                    </svg>
                    Referral Discount
                  </span>
                  <span className="amount">-₹{priceBreakdown.referralDiscount}</span>
                </div>
              )}
              
              <div className="breakdown-item final">
                <span>Final Price</span>
                <span className="amount">₹{priceBreakdown.final}</span>
              </div>

              <div className="per-month-price">
                <span>Per Month</span>
                <span className="amount">₹{Math.round(priceBreakdown.final / (selectedPlan === 'quarterly' ? 3 : selectedPlan === 'halfYearly' ? 6 : 12))}</span>
              </div>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className={`algo-submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={!selectedPlan || isSubmitting}
        >
          {isSubmitting ? (
            <span className="submit-loader">
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
            </span>
          ) : (
            selectedPlan ? `Activate Plan • ₹${priceBreakdown.final}` : 'Select a Plan'
          )}
        </button>
      </form>

      {notification.show && (
        <div className={`algo-notification ${notification.type}`}>
          <div className="notification-content">
            {notification.type === 'success' && (
              <svg className="notification-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {notification.type === 'error' && (
              <svg className="notification-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            <p>{notification.message}</p>
          </div>
          <button 
            className="notification-close"
            onClick={() => setNotification({ show: false, type: '', message: '' })}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Algo;